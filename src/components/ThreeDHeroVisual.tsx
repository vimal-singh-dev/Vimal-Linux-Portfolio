import React, { useEffect, useRef } from 'react';

export function ThreeDHeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = (canvas.width = (canvas.offsetWidth || 340) * dpr);
    let height = (canvas.height = (canvas.offsetHeight || 340) * dpr);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = (canvas.offsetWidth || 340) * dpr;
      height = canvas.height = (canvas.offsetHeight || 340) * dpr;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Pause rendering when element is offscreen
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            cancelAnimationFrame(animationFrameId);
            render();
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else if (isVisible) {
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // 3D Nodes Setup
    interface Point3D {
      x: number;
      y: number;
      z: number;
      origX: number;
      origY: number;
      origZ: number;
      radius: number;
      color: string;
      glowColor: string;
    }

    const points: Point3D[] = [];
    const numPoints = 65;
    const sphereRadius = Math.min(width, height) * 0.32;

    // Generate points on a sphere (Fibonacci sphere distribution)
    const phi = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < numPoints; i++) {
      const y = 1 - (i / (numPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      const isAccent = i % 5 === 0;
      points.push({
        x: x * sphereRadius,
        y: y * sphereRadius,
        z: z * sphereRadius,
        origX: x * sphereRadius,
        origY: y * sphereRadius,
        origZ: z * sphereRadius,
        radius: (isAccent ? 3.2 : 2) * dpr,
        color: isAccent ? '#f0b4c4' : '#50FA7B',
        glowColor: isAccent ? 'rgba(240,180,196,0.3)' : 'rgba(80,250,123,0.25)',
      });
    }

    // Add inner core floating nodes
    for (let i = 0; i < 15; i++) {
      const r = sphereRadius * (0.3 + Math.random() * 0.4);
      const theta = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const x = Math.sqrt(1 - u * u) * Math.cos(theta) * r;
      const y = Math.sqrt(1 - u * u) * Math.sin(theta) * r;
      const z = u * r;

      points.push({
        x,
        y,
        z,
        origX: x,
        origY: y,
        origZ: z,
        radius: 1.6 * dpr,
        color: '#8be9fd',
        glowColor: 'rgba(139,233,253,0.25)',
      });
    }

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0.003;
    let targetRotY = 0.005;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotY = (x / rect.width) * 0.025;
      targetRotX = -(y / rect.height) * 0.025;
    };

    const onMouseLeave = () => {
      targetRotX = 0.003;
      targetRotY = 0.005;
    };

    canvas.addEventListener('mousemove', onMouseMove, { passive: true });
    canvas.addEventListener('mouseleave', onMouseLeave, { passive: true });

    // Render loop
    const fov = 450 * dpr;
    const render = () => {
      if (!isVisible || document.hidden) return;

      ctx.clearRect(0, 0, width, height);

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;

      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      const centerX = width / 2;
      const centerY = height / 2;

      // Rotate points and calculate 2D projection
      const projected = points.map((p) => {
        // Rotate around Y
        let x1 = p.x * cosY + p.z * sinY;
        let z1 = -p.x * sinY + p.z * cosY;

        // Rotate around X
        let y1 = p.y * cosX - z1 * sinX;
        let z2 = p.y * sinX + z1 * cosX;

        // Update current rotated coordinates for next frame
        p.x = x1;
        p.y = y1;
        p.z = z2;

        // Perspective projection
        const scale = fov / (fov + z2 + sphereRadius);
        const projX = centerX + x1 * scale;
        const projY = centerY + y1 * scale;
        const alpha = Math.max(0.15, Math.min(1, (z2 + sphereRadius) / (sphereRadius * 2)));

        return {
          x: projX,
          y: projY,
          z: z2,
          scale,
          alpha,
          radius: p.radius * scale,
          color: p.color,
          glowColor: p.glowColor,
        };
      });

      // Sort points by Z (depth sorting)
      projected.sort((a, b) => a.z - b.z);

      // Draw connecting lines between nearby points in 3D
      ctx.lineWidth = 0.8 * dpr;
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const distSq = dx * dx + dy * dy;
          const maxDist = 60 * dpr;

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.28 * projected[i].alpha;
            ctx.strokeStyle = `rgba(80, 250, 123, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw 3D nodes with high-performance direct arc drawing
      for (const p of projected) {
        ctx.globalAlpha = p.alpha;

        // Soft outer glow halo
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, p.radius * 2), 0, Math.PI * 2);
        ctx.fillStyle = p.glowColor;
        ctx.fill();

        // Sharp core node
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(1, p.radius), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[340px] h-[340px] flex items-center justify-center pointer-events-auto"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ width: '100%', height: '100%' }}
      />
      {/* 3D floating info chip */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[rgba(14,22,17,0.85)] border border-[rgba(255,255,255,0.14)] backdrop-blur-md text-[11px] font-mono text-emerald-300 flex items-center gap-1.5 shadow-lg pointer-events-none whitespace-nowrap">
        <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] animate-ping" />
        <span>3D Cloud Topology · Real-time</span>
      </div>
    </div>
  );
}
