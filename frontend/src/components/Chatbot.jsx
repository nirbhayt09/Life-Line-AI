import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Hi! I am the Lifeline Health Assistant. Ask me about symptoms or general health tips.' }
    ]);
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInput('');
        setTyping(true);

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMsg })
            });
            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
        } catch (err) {
            console.error(err);
        } finally {
            setTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-medical-blue hover:bg-blue-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
                >
                    <MessageCircle className="h-6 w-6" />
                </button>
            )}

            {isOpen && (
                <div className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 flex flex-col overflow-hidden border border-gray-200 h-[500px]">
                    <div className="bg-medical-blue p-4 flex justify-between items-center text-white">
                        <h3 className="font-semibold flex items-center">
                            <MessageCircle className="h-4 w-4 mr-2" />
                            Health Assistant
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 rounded p-1">
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${msg.role === 'user'
                                        ? 'bg-medical-blue text-white rounded-tr-none'
                                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none shadow-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {typing && (
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-2xl px-4 py-2 text-xs text-gray-500 animate-pulse">
                                    Typing...
                                </div>
                            </div>
                        )}
                    </div>

                    <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-200 flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Describe your symptoms..."
                            className="flex-grow border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-medical-blue focus:ring-1 focus:ring-medical-blue"
                        />
                        <button type="submit" className="bg-medical-blue text-white p-2.5 rounded-full hover:bg-blue-700 transition-colors">
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
