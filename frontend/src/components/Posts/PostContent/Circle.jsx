import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

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
      2 * Math.PI
    );
    context.lineWidth = 6;
    context.strokeStyle = borderColor || "white";
    context.stroke();

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

Circle.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  borderColor: PropTypes.string,
};
