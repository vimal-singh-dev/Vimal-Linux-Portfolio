import React, { useEffect, useRef } from 'react';

export function ThreeDBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let width = (canvas.width = window.innerWidth * dpr);
    let height = (canvas.height = window.innerHeight * dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth * dpr;
      height = canvas.height = window.innerHeight * dpr;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Particle pool for ambient forest fireflies/motes
    const isMobile = window.innerWidth < 768;
    const numParticles = isMobile ? 24 : 40;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      baseAlpha: number;
      alpha: number;
      alphaSpeed: number;
      color: string;
      glowColor: string;
      depth: number;
    }[] = [];

    const colors = [
      { color: '#50FA7B', glow: 'rgba(80,250,123,0.3)' },
      { color: '#8BE9FD', glow: 'rgba(139,233,253,0.3)' },
      { color: '#F0B4C4', glow: 'rgba(240,180,196,0.3)' },
      { color: '#F1FA8C', glow: 'rgba(241,250,140,0.3)' },
      { color: '#BD93F9', glow: 'rgba(189,147,249,0.3)' },
    ];

    for (let i = 0; i < numParticles; i++) {
      const col = colors[i % colors.length];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: (Math.random() * 2 + 0.8) * dpr,
        speedX: (Math.random() - 0.5) * 0.35 * dpr,
        speedY: -(Math.random() * 0.45 + 0.15) * dpr,
        baseAlpha: Math.random() * 0.35 + 0.15,
        alpha: Math.random() * 0.4,
        alphaSpeed: Math.random() * 0.012 + 0.004,
        color: col.color,
        glowColor: col.glow,
        depth: Math.random() * 0.6 + 0.4,
      });
    }

    let mouseX = width / 2;
    let mouseY = height / 2;
    let scrollY = window.scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX * dpr;
      mouseY = e.clientY * dpr;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const render = () => {
      if (document.hidden) return;

      ctx.clearRect(0, 0, width, height);

      const targetParallaxX = ((mouseX - width / 2) / (width / 2)) * 20 * dpr;
      const targetParallaxY = ((mouseY - height / 2) / (height / 2)) * 20 * dpr;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaSpeed;

        if (p.alpha > p.baseAlpha || p.alpha < 0.04) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Loop boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Parallax offset
        const drawX = (p.x + targetParallaxX * p.depth + width) % width;
        const drawY = (p.y + targetParallaxY * p.depth - (scrollY * 0.06 * p.depth * dpr) % height + height) % height;

        const currentAlpha = Math.max(0, Math.min(1, p.alpha));

        // Soft outer glow halo
        ctx.globalAlpha = currentAlpha * 0.5;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Core light mote
        ctx.globalAlpha = currentAlpha;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-60"
        style={{ width: '100vw', height: '100vh' }}
      />
    </div>
  );
}
