import React, { useState, useEffect } from 'react'
import { ref, push, onValue } from 'firebase/database'
import { database } from '../firebase' // Make sure you have firebase config
import OpenAI from 'openai';

// Initialize OpenAI with explicit API key
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, // React environment variables must start with REACT_APP_
  dangerouslyAllowBrowser: true
});

// Add console log to debug
console.log('API Key:', process.env.REACT_APP_OPENAI_API_KEY ? 'Key exists' : 'Key missing');

const Home = () => {
  const [input, setInput] = useState('')
  const [chats, setChats] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch chats from Firebase
  useEffect(() => {
    const chatsRef = ref(database, 'chats')
    onValue(chatsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        setChats(Object.values(data))
      }
    })
  }, [])

  useEffect(() => {
    if (!process.env.REACT_APP_OPENAI_API_KEY) {
      console.error('OpenAI API key is not set in environment variables');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    setIsLoading(true)
    const question = input
    setInput('')

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Store in Firebase
      const chatsRef = ref(database, 'chats')
      await push(chatsRef, {
        question,
        answer: data.answer,
        timestamp: Date.now(),
      })
    } catch (error) {
      console.error('Error details:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 flex flex-col items-center justify-start pt-10 gap-5 text-center text-white z-[1]">
        <img className="w-[100px]" src="photos/logo.png" alt="logo" />
        <h1 className="text-black font-black text-4xl">
          Ask anything about your plans 🪴
        </h1>

        {/* Chat Messages */}
        <div className="w-[700px] max-h-[400px] overflow-y-auto mb-5">
          {chats.map((chat, index) => (
            <div key={index} className="mb-4">
              <div className="bg-blue-100 p-3 rounded-lg mb-2">
                <p className="text-black font-medium">You: {chat.question}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-black">Assistant: {chat.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="w-[700px] h-[60px] z-10">
          <input
            className="w-full h-full rounded-full border-blue-500 border text-black px-10"
            type="text"
            placeholder="Ask . . ."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
        </form>
        
        {isLoading && (
          <p className="text-black">Thinking...</p>
        )}
      </div>
    </div>
  )
}

export default Home
