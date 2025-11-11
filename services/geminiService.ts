import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
// FIX: Corrected import path for types
import { GroundingSource } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

// For conversational chat with search grounding. This object maintains chat history for the session.
const conversationalChat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    tools: [{googleSearch: {}}],
  },
});

// For complex, analytical tasks
const analyticalModel = 'gemini-2.5-pro';

// Custom async generator to handle the stream and extract sources
async function* processStream(
    stream: AsyncGenerator<GenerateContentResponse, any, unknown>
): AsyncGenerator<{ text: string; sources?: GroundingSource[] }, void, unknown> {
    for await (const chunk of stream) {
        const text = chunk.text;
        let sources: GroundingSource[] | undefined = undefined;

        if (chunk.candidates?.[0]?.groundingMetadata?.groundingChunks) {
            sources = chunk.candidates[0].groundingMetadata.groundingChunks
                .filter(c => c.web?.uri && c.web?.title)
                .map(c => ({
                    uri: c.web.uri!,
                    title: c.web.title!,
                }));
        }
        
        if (text || (sources && sources.length > 0)) {
             yield { text: text || '', sources };
        }
    }
}

export const sendMessageToGemini = async (
    message: string,
): Promise<AsyncGenerator<{ text: string; sources?: GroundingSource[] }>> => {
    const responseStream = await conversationalChat.sendMessageStream({ message });
    return processStream(responseStream);
};

export const sendComplexQueryToGemini = async (
    prompt: string
): Promise<string> => {
    try {
        const response = await ai.models.generateContent({
            model: analyticalModel,
            contents: prompt,
            config: {
                systemInstruction: "You are an expert University Analyst. Your role is to provide deep, insightful analysis on academic content, generate structured reports from data, and offer suggestions for improvement based on best practices in academia.",
                thinkingConfig: { thinkingBudget: 32768 },
            }
        });
        return response.text;
    } catch (error) {
        console.error("Error calling Gemini Pro model:", error);
        return "Sorry, I encountered an error while processing your complex request. Please try again.";
    }
};
