
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, GroundingSource } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
        setMessages([
            { sender: 'bot', text: 'Hello! How can I help you today? I can answer questions about recent academic news and trends.' }
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
    setInput('');
    setIsLoading(true);

    let fullBotResponse = '';
    let sources: GroundingSource[] = [];
    const botMessage: ChatMessage = { sender: 'bot', text: '' };
    setMessages((prev) => [...prev, botMessage]);

    try {
        const stream = await sendMessageToGemini(input, messages.slice(0, -1)); // Pass previous history
        for await (const chunk of stream) {
            fullBotResponse += chunk.text;
            if (chunk.sources) {
                sources = [...sources, ...chunk.sources];
            }
            setMessages((prev) =>
              prev.map((msg, index) =>
                index === prev.length - 1
                  ? { ...msg, text: fullBotResponse, sources: sources.length > 0 ? sources : undefined }
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
             {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150"></div>
                    </div>
                  </div>
                </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="p-4 border-t bg-white rounded-b-lg">
            <div className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="ml-3 bg-blue-500 text-white rounded-full p-2 hover:bg-blue-600 disabled:bg-blue-300 transition-colors"
                aria-label="Send message"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
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
