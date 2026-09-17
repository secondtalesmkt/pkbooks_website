import React from "react";

interface PKLogoProps {
  colorMode?: "original" | "white";
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  alt?: string;
}

export function PKBookIcon({
  className = "h-8 w-auto",
  colorMode = "original"
}: {
  className?: string;
  colorMode?: "original" | "white";
}) {
  return (
    <img
      src="/pk-books-icon.png?v=2"
      alt="PK Books Icon"
      className={`inline-block object-contain ${className} ${colorMode === "white" ? "brightness-0 invert" : ""}`}
    />
  );
}

export default function PKLogo({
  colorMode = "original",
  className = "",
  size = "md",
  alt = "PK Books - Books, Stationery, Printing"
}: PKLogoProps) {
  const isWhite = colorMode === "white";
  const logoSrc = isWhite ? "/brand-logo-white.png?v=2" : "/brand-logo.png?v=2";

  const heightClasses = {
    xs: "h-5 sm:h-6 max-w-[140px]",
    sm: "h-6 sm:h-7 max-w-[180px]",
    md: "h-7 sm:h-8 max-w-[210px]",
    lg: "h-9 sm:h-10 max-w-[250px]",
    xl: "h-12 sm:h-14"
  }[size];

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt={alt}
        className={`${heightClasses} w-auto object-contain transition-all`}
        style={{ imageRendering: "auto" }}
      />
    </div>
  );
}
