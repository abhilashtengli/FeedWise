"use client";

import { useRef, useEffect } from "react";

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Replace the entire Particle class with this updated version that handles null checks
  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    alpha: number;

    constructor(canvasWidth: number, canvasHeight: number) {
      this.x = Math.random() * canvasWidth;
      this.y = Math.random() * canvasHeight;
      this.size = Math.random() * 3 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.color = this.getRandomColor();
      this.alpha = Math.random() * 0.5 + 0.1;
    }

    getRandomColor() {
      const colors = [
        "rgba(255, 255, 255, ", // White
        "rgba(138, 43, 226, ", // Purple
        "rgba(0, 191, 255, " // Cyan
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    update(canvasWidth: number, canvasHeight: number) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Wrap around edges
      if (this.x < 0) this.x = canvasWidth;
      if (this.x > canvasWidth) this.x = 0;
      if (this.y < 0) this.y = canvasHeight;
      if (this.y > canvasHeight) this.y = 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.alpha})`;
      ctx.fill();
    }
  }

  // Replace the entire LightBeam class with this updated version
  class LightBeam {
    x: number;
    y: number;
    width: number;
    height: number;
    angle: number;
    rotationSpeed: number;
    color: string;
    alpha: number;

    constructor(x: number, y: number, color: string, canvasWidth: number) {
      this.x = x;
      this.y = y;
      this.width = canvasWidth * 0.8;
      this.height = 200;
      this.angle = Math.random() * Math.PI * 2;
      this.rotationSpeed = Math.random() * 0.0005 + 0.0002;
      this.color = color;
      this.alpha = 0.05;
    }

    update() {
      this.angle += this.rotationSpeed;
    }

    draw(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.angle);

      // Create gradient
      const gradient = ctx.createLinearGradient(
        -this.width / 2,
        0,
        this.width / 2,
        0
      );
      gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
      gradient.addColorStop(0.5, `${this.color}${this.alpha})`);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);
      ctx.restore();
    }
  }

  // Update the main useEffect code to handle null checks properly
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particles: Particle[] = [];
    const particleCount = 150;

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(canvas.width, canvas.height));
    }

    // Create light beams
    const beams = [
      new LightBeam(
        canvas.width * 0.3,
        canvas.height * 0.3,
        "rgba(138, 43, 226, ",
        canvas.width
      ),
      new LightBeam(
        canvas.width * 0.7,
        canvas.height * 0.7,
        "rgba(0, 191, 255, ",
        canvas.width
      )
    ];

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    const mouseRadius = 100;

    canvas.addEventListener("mousemove", e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      if (!canvas || !ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw beams
      beams.forEach(beam => {
        beam.update();
        beam.draw(ctx);
      });

      // Draw particles
      particles.forEach(particle => {
        // Mouse interaction
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
          const angle = Math.atan2(dy, dx);
          const force = (mouseRadius - distance) / mouseRadius;

          particle.x -= Math.cos(angle) * force * 2;
          particle.y -= Math.sin(angle) * force * 2;
        }

        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw glow effects
      drawGlowEffect(
        canvas.width * 0.2,
        canvas.height * 0.3,
        150,
        "rgba(138, 43, 226, 0.05)"
      );
      drawGlowEffect(
        canvas.width * 0.8,
        canvas.height * 0.7,
        200,
        "rgba(0, 191, 255, 0.05)"
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    const drawGlowEffect = (
      x: number,
      y: number,
      radius: number,
      color: string
    ) => {
      if (!ctx) return;

      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: "none" }}
    />
  );
}
