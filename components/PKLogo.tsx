import React from "react";

interface PKLogoProps {
  colorMode?: "original" | "white";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
}

export function PKBookIcon({
  className = "h-8 w-8",
  colorMode = "original"
}: {
  className?: string;
  colorMode?: "original" | "white";
}) {
  const isWhite = colorMode === "white";
  return (
    <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
      <svg viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="44" height="44" rx="12" fill={isWhite ? "rgba(255,255,255,0.15)" : "#0057B8"} />
        <path
          d="M12 16C12 13.7909 13.7909 12 16 12H29C30.6569 12 32 13.3431 32 15V28C32 29.6569 30.6569 31 29 31H16C13.7909 31 12 29.2091 12 27V16Z"
          fill="white"
          fillOpacity={isWhite ? "0.95" : "0.2"}
        />
        <path
          d="M12 21C12 18.7909 13.7909 17 16 17H29C30.6569 17 32 18.3431 32 20V30C32 31.1046 31.1046 32 30 32H16C13.7909 32 12 30.2091 12 28V21Z"
          fill={isWhite ? "white" : "#ED1C24"}
        />
        <path
          d="M16 15H28M16 23H28M16 27H24"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default function PKLogo({
  colorMode = "original",
  className = "",
  size = "md",
  showTagline = true
}: PKLogoProps) {
  const isWhite = colorMode === "white";

  const sizeClasses = {
    xs: { icon: "h-6 w-6", text: "text-base", sub: "text-[9px]" },
    sm: { icon: "h-7 w-7", text: "text-lg", sub: "text-[10px]" },
    md: { icon: "h-8 w-8 sm:h-9 sm:w-9", text: "text-lg sm:text-xl", sub: "text-[10px] sm:text-[11px]" },
    lg: { icon: "h-10 w-10", text: "text-2xl", sub: "text-xs" },
    xl: { icon: "h-12 w-12", text: "text-3xl", sub: "text-xs" }
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <PKBookIcon className={sizeClasses.icon} colorMode={colorMode} />
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1">
          <span className={`font-black tracking-tight ${sizeClasses.text} ${isWhite ? "text-white" : "text-[#0057B8]"}`}>
            PK
          </span>
          <span className={`font-black tracking-tight ${sizeClasses.text} ${isWhite ? "text-white/95" : "text-[#ED1C24]"}`}>
            BOOKS
          </span>
        </div>
        {showTagline && (
          <span className={`font-bold tracking-widest uppercase mt-0.5 ${sizeClasses.sub} ${isWhite ? "text-slate-300" : "text-slate-500"}`}>
            Valanchery
          </span>
        )}
      </div>
    </div>
  );
}

