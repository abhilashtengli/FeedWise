"use client";

import { useEffect, useRef } from "react";

export default function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawGrid();
    };

    const drawGrid = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid settings
      const cellSize = 80;
      const lineWidth = 0.5;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
      ctx.lineWidth = lineWidth;

      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw accent boxes
      const numBoxes = 8;
      const boxPositions = Array.from({ length: numBoxes }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 40 + Math.random() * 80,
        opacity: 0.05 + Math.random() * 0.1
      }));

      boxPositions.forEach(box => {
        ctx.fillStyle = `rgba(255, 255, 255, ${box.opacity})`;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.rect(box.x, box.y, box.size, box.size);
        ctx.fill();
        ctx.stroke();

        // Inner shadow effect
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        ctx.beginPath();
        ctx.rect(box.x + 5, box.y + 5, box.size - 10, box.size - 10);
        ctx.fill();
      });

      // Draw accent circles
      const numCircles = 5;
      const circleColors = [
        "rgba(138, 43, 226, 0.2)",
        "rgba(0, 191, 255, 0.2)",
        "rgba(255, 0, 255, 0.2)"
      ];

      for (let i = 0; i < numCircles; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = 15 + Math.random() * 25;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle =
          circleColors[Math.floor(Math.random() * circleColors.length)];
        ctx.fill();
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 opacity-70"
      style={{ pointerEvents: "none" }}
    />
  );
}
