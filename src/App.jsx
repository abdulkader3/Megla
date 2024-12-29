import { useState } from 'react';
import './App.css';
import VantaBackground from './component/VantaBackground';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config/firebase';
import openai from './config/openai';

function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    try {
      console.log('Sending request to OpenAI...'); // Debug log
      
      // Get response from OpenAI
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: input }],
        model: "gpt-3.5-turbo",
      });

      console.log('OpenAI response:', completion); // Debug log

      const response = completion.choices[0].message.content;

      // Store the conversation in Firebase
      await addDoc(collection(db, "conversations"), {
        question: input,
        answer: response,
        timestamp: serverTimestamp(),
      });

      setInput('');
    } catch (error) {
      console.error("Detailed Error:", error); // More detailed error logging
      alert(`Error: ${error.message}`); // More specific error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden">
      <VantaBackground />
      <div
        className="flex flex-col gap-5 absolute inset-0"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <img className="w-[100px]" src="photos/logo.png" alt="logo" />
        <h1 className="text-black font-black text-4xl">
          Ask anything about your plans 🪴
        </h1>

        <form onSubmit={handleSubmit} className="w-[700px] h-[60px] z-10">
          <input
            className="w-full h-full rounded-full border-blue-500 border-[1px] text-black pl-10 pr-10"
            type="text"
            placeholder='Ask . . .'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
        </form>
        {loading && <p className="text-black">Processing your request...</p>}
      </div>
    </div>
  );
}

export default App;
