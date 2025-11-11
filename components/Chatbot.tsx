import React, { useState, useRef, useEffect } from 'react';
// FIX: Corrected import path for types
import { ChatMessage, GroundingSource } from '../types';
import { sendMessageToGemini, sendComplexQueryToGemini } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDeepAnalysis, setIsDeepAnalysis] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        setMessages([
            { sender: 'bot', text: "Hello! I'm your AI Assistant. I can answer quick questions using Google Search. For complex tasks like content analysis or report generation, enable 'Deep Analysis' mode." }
        ]);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;
    const userInput: ChatMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userInput]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    if (isDeepAnalysis) {
        const thinkingMessage: ChatMessage = { sender: 'bot', text: '🤔 Thinking...' };
        setMessages((prev) => [...prev, thinkingMessage]);
        
        try {
            const responseText = await sendComplexQueryToGemini(currentInput);
            setMessages((prev) =>
              prev.map((msg, index) =>
                index === prev.length - 1
                  ? { ...msg, text: responseText }
                  : msg
              )
            );
        } catch (error) {
            console.error('Gemini Pro API error:', error);
            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1
                        ? { ...msg, text: 'Sorry, I encountered an error during deep analysis. Please try again.' }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    } else {
        let fullBotResponse = '';
        let sources: GroundingSource[] = [];
        const botMessage: ChatMessage = { sender: 'bot', text: '' };
        setMessages((prev) => [...prev, botMessage]);

        try {
            const stream = await sendMessageToGemini(currentInput);
            for await (const chunk of stream) {
                fullBotResponse += chunk.text;
                if (chunk.sources) {
                    sources = [...sources, ...chunk.sources];
                }
                const uniqueSources = [...new Map(sources.map(item => [item.uri, item])).values()];
                setMessages((prev) =>
                  prev.map((msg, index) =>
                    index === prev.length - 1
                      ? { ...msg, text: fullBotResponse, sources: uniqueSources.length > 0 ? uniqueSources : undefined }
                      : msg
                  )
                );
            }
        } catch (error) {
            console.error('Gemini API error:', error);
            setMessages((prev) =>
                prev.map((msg, index) =>
                    index === prev.length - 1
                        ? { ...msg, text: 'Sorry, I encountered an error. Please try again.' }
                        : msg
                )
            );
        } finally {
            setIsLoading(false);
        }
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-blue-900 text-white rounded-full p-4 shadow-lg hover:bg-blue-800 transition-colors z-50"
        aria-label="Toggle Chatbot"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm h-[60vh] bg-white rounded-lg shadow-2xl flex flex-col z-50">
          <header className="bg-blue-900 text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">AI Assistant</h3>
          </header>
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    {msg.sources && msg.sources.length > 0 && (
                        <div className="mt-2 border-t border-gray-300 pt-2">
                            <h4 className="text-xs font-bold mb-1">Sources:</h4>
                            <ul className="list-disc list-inside text-xs">
                                {msg.sources.map((source, i) => (
                                    <li key={i}>
                                        <a href={source.uri} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            {source.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
              </div>
            ))}
             {isLoading && !isDeepAnalysis && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.1s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t bg-white rounded-b-lg">
             <div className="flex items-center justify-end mb-2 px-1">
                <label htmlFor="deep-analysis-toggle" className="flex items-center cursor-pointer select-none">
                    <span className="mr-3 text-sm text-gray-700 font-medium">Deep Analysis</span>
                    <div className="relative">
                        <input 
                            type="checkbox" 
                            id="deep-analysis-toggle" 
                            className="sr-only peer" 
                            checked={isDeepAnalysis} 
                            onChange={() => setIsDeepAnalysis(!isDeepAnalysis)}
                            disabled={isLoading}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-800 peer-disabled:opacity-50"></div>
                    </div>
                </label>
            </div>
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isDeepAnalysis ? "Enter a complex query for analysis..." : "Ask a quick question..."}
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading || input.trim() === ''}
                className="ml-3 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:bg-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
