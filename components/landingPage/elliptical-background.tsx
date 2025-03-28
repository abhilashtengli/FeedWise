"use client";

import { useEffect, useRef } from "react";

export default function EllipticalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawEllipticalGlow();
    };

    const drawEllipticalGlow = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Save the current context state
      ctx.save();

      // Apply transformations similar to the SVG
      const centerX = canvas.width * 0.7;
      const centerY = canvas.height * 0.3;

      ctx.translate(centerX, centerY);
      ctx.rotate(-Math.PI / 4); // Approximately -45 degrees
      ctx.scale(0.8, 0.8);

      // Create gradient for the ellipse
      const gradient = ctx.createRadialGradient(
        0,
        0,
        0,
        0,
        0,
        canvas.width * 0.8
      );
      gradient.addColorStop(0, "rgba(255, 255, 255, 0.25)");
      gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.15)");
      gradient.addColorStop(0.6, "rgba(255, 255, 255, 0.08)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      // Draw the ellipse
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.ellipse(
        0,
        0,
        canvas.width * 0.6,
        canvas.height * 0.4,
        0,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Restore the context
      ctx.restore();

      // Add some subtle stars/dots
      const numDots = 70;

      for (let i = 0; i < numDots; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
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
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
