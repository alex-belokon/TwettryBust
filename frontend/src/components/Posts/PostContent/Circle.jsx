import React, { useState, useEffect, useRef } from "react";

export default function Circle({ text, onChange, borderColor }) {
  const canvasRef = useRef(null);
  const [circleRadius] = useState(90);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const maxCharacters = 3000;
    const currentCharacters = Math.min(text.length, maxCharacters);

    const arcLength = (currentCharacters / maxCharacters) * 360;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(
      canvas.width / 2,
      canvas.height / 2,
      circleRadius,
      0,
      (arcLength * Math.PI) / 180
    );
    context.lineTo(canvas.width / 2, canvas.height / 2);
    context.fillStyle = "#68d1d4";
    context.fill();

    context.lineWidth = 4;
    context.strokeStyle = borderColor || "white";
    context.stroke();
  }, [text, circleRadius, borderColor]);

  useEffect(() => {
    if (onChange) {
      onChange(text);
    }
  }, [text, onChange]);

  return (
    <div>
      <div className="canvas-container">
        <canvas className="canvas" ref={canvasRef} width={200} height={200} />
      </div>
    </div>
  );
}
