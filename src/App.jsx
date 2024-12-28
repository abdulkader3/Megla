import { useState } from 'react';
import './App.css';
import VantaBackground from './component/VantaBackground';

function App() {
  return (
    <>
      <div>
        <VantaBackground />
        <div
          className="flex flex-col gap-5"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            textAlign: "center",
            zIndex: 1, // Ensure content is above the background
          }}
        >
          <img className="w-[100px]" src="photos/logo.png" alt="logo" />
          <h1 className="text-black font-black text-4xl">
            Ask anything about your plans 🪴
          </h1>

          <div className="w-[700px] h-[60px] z-10">
            <input
              className="w-full h-full rounded-full border-blue-500 border-[1px] text-black pl-10 pr-10"
              type="text"
              placeholder='Ask . . .'
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
