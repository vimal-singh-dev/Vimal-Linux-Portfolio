import React, { useRef, useState, MouseEvent, useEffect } from 'react';

interface ThreeDCardProps extends React.HTMLAttributes<HTMLDivElement> {
  key?: React.Key;
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glareColor?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  id?: string;
}

export function ThreeDCard({
  children,
  className = '',
  depth = 15,
  glareColor = 'rgba(80, 250, 123, 0.15)',
  style = {},
  onClick,
  id,
  ...props
}: ThreeDCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotX = -((y - centerY) / centerY) * depth;
      const rotY = ((x - centerX) / centerX) * depth;

      setRotateX(rotX);
      setRotateY(rotY);

      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      setGlarePos({ x: glareX, y: glareY, opacity: 0.85 });
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...props}
      className={`relative rounded-[var(--radius)] transition-transform duration-200 ease-out will-change-transform group/threed ${className}`}
      style={{
        perspective: 1200,
        transformStyle: 'preserve-3d',
        transform: isHovered
          ? `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        ...style,
      }}
    >
      {/* Dynamic Cursor Gradient Border Highlight */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-[var(--radius)] transition-opacity duration-300 z-10"
        style={{
          opacity: glarePos.opacity * 0.9,
          background: `radial-gradient(circle 260px at ${glarePos.x}% ${glarePos.y}%, rgba(80, 250, 123, 0.45), rgba(240, 180, 196, 0.25), transparent 75%)`,
        }}
      />

      {/* Specular Glare Glow Surface */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--radius)] transition-opacity duration-300 z-20 overflow-hidden mix-blend-screen"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle 280px at ${glarePos.x}% ${glarePos.y}%, ${glareColor}, transparent 70%)`,
        }}
      />

      {/* Ambient Glass Highlight Rim */}
      <div
        className="pointer-events-none absolute inset-0 rounded-[var(--radius)] z-10 opacity-0 group-hover/threed:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), inset 0 0 12px rgba(80, 250, 123, 0.08)',
        }}
      />

      {/* Card Content with 3D Pop */}
      <div
        className="relative h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'translateZ(14px)' : 'translateZ(0px)',
          transition: 'transform 0.2s ease-out',
        }}
      >
        {children}
      </div>
    </div>
  );
}
