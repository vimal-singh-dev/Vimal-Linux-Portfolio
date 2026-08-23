import React from 'react';

interface LaptopMockupProps {
  children: React.ReactNode;
  isFullscreen: boolean;
}

export const LaptopMockup: React.FC<LaptopMockupProps> = ({
  children,
  isFullscreen,
}) => {
  if (isFullscreen) {
    return <div className="w-full h-full">{children}</div>;
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4 py-2">
      {/* Outer Laptop Display Unit */}
      <div className="relative rounded-[22px] p-2.5 sm:p-3.5 bg-gradient-to-b from-[#222736] via-[#141724] to-[#0A0B10] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),0_0_0_1px_rgba(255,255,255,0.06)] border border-[#1e2337]">
        {/* Subtle top bezel with Camera & Ambient Sensor */}
        <div className="flex items-center justify-center gap-1.5 pb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#08090d] border border-[#1e2337]"></div>
          <div className="w-2 h-2 rounded-full bg-[#050608] border border-[#252c42] flex items-center justify-center">
            <div className="w-0.5 h-0.5 rounded-full bg-[#8BE9FD]/90"></div>
          </div>
          <div className="w-1.5 h-1.5 rounded-full bg-[#08090d] border border-[#1e2337]"></div>
        </div>

        {/* Screen Frame with Inner Shadow */}
        <div className="relative rounded-xl overflow-hidden shadow-inner bg-[#0A0B10]">
          {children}
        </div>
      </div>

      {/* Laptop Hinge & Base / Deck Perspective */}
      <div className="relative w-full max-w-[96%] mx-auto">
        {/* Hinge */}
        <div className="h-2.5 sm:h-3 mx-auto w-40 bg-gradient-to-r from-[#1c2236] via-[#2d3652] to-[#1c2236] rounded-b-md shadow-md border-t border-black/50"></div>

        {/* Lower Chassis / Base */}
        <div className="h-3.5 sm:h-4 w-full bg-gradient-to-b from-[#1a1f30] to-[#0d0f17] rounded-b-[18px] shadow-[0_20px_40px_rgba(0,0,0,0.85)] border-t border-[#252c42] flex items-center justify-center relative">
          {/* Thumb Notch */}
          <div className="w-20 sm:w-24 h-1.5 bg-[#090b10] rounded-b-md mx-auto border-t border-black/80"></div>
          {/* Status LED */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-[#50FA7B] animate-ping"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#50FA7B] shadow-[0_0_6px_#50FA7B]"></span>
          </div>
        </div>

        {/* Laptop Shadow / Surface Glow */}
        <div className="w-[90%] mx-auto h-3 bg-[#50FA7B]/5 blur-xl rounded-full"></div>
      </div>
    </div>
  );
};

