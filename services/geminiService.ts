
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage, GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

let chat: Chat | null = null;

function initializeChat(): Chat {
    return ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        tools: [{googleSearch: {}}],
      },
    });
}

// Custom async generator to handle the stream and extract sources
async function* processStream(
    stream: AsyncGenerator<GenerateContentResponse, any, unknown>
): AsyncGenerator<{ text: string; sources?: GroundingSource[] }, void, unknown> {
    for await (const chunk of stream) {
        const text = chunk.text;
        let sources: GroundingSource[] | undefined = undefined;

        if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            sources = chunk.candidates[0].groundingMetadata.groundingChunks
                .filter(c => c.web)
                .map(c => ({
                    uri: c.web.uri,
                    title: c.web.title,
                }));
        }
        
        yield { text, sources };
    }
}

export const sendMessageToGemini = async (
    message: string,
    history: ChatMessage[]
): Promise<AsyncGenerator<{ text: string; sources?: GroundingSource[] }>> => {

    // If chat is not initialized or history is empty, start a new chat
    if (!chat || history.length === 0) {
        chat = initializeChat();
    }
    
    // Note: The current SDK doesn't directly support injecting history from a previous session
    // into a new `chat` object in this manner. For a true multi-session chat,
    // you'd need to manage chat history state more explicitly.
    // For this app, we will re-initialize on page load, which is sufficient.
    
    const responseStream = await chat.sendMessageStream({ message });
    return processStream(responseStream);
};
