import { useState } from 'react'

import './App.css'
import VantaBackground from './component/VantaBackground'

function App() {

  return (
    <>
       <div>
      <VantaBackground />
      <div
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
          pointerEvents: "none", // Make the background non-interactive
        }}
      >
        <h1>Welcome to My Cloudy Sky</h1>
      </div>
    </div>
    </>
  )
}

export default App
