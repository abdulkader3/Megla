import React, { useEffect, useRef } from "react";
import CLOUDS from "vanta/dist/vanta.clouds.min";
import * as THREE from "three"; // Ensure three.js is installed

const VantaBackground = () => {
  const vantaRef = useRef(null);

  useEffect(() => {
    const vantaEffect = CLOUDS({
      el: vantaRef.current, // Attach effect to the element
      THREE,
      skyColor: 0x87ceeb, // Light blue sky
      cloudColor: 0xffffff, // White clouds
      cloudSpeed: 0.10, // Speed of cloud movement
      zoom: 0.8, // Zoom level
    });

    // Cleanup effect on component unmount
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default VantaBackground;
