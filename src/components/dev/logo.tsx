import { useState } from "react";
import { cn } from "@/lib/utils";

export const ZENDEV_LOGO_URL = "https://i.postimg.cc/T1wB2rHf/(2)-Photoroom.png";

export const ZenDevIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={cn("h-full w-full", className)}
    fill="currentColor"
    aria-hidden="true"
  >
    {/* Top-Right L-bracket / Corner Block */}
    <path
      d="M40 18 h42 a4 4 0 0 1 4 4 v42 a4 4 0 0 1 -4 4 h-18 a4 4 0 0 1 -4 -4 v-20 a4 4 0 0 0 -4 -4 h-16 a4 4 0 0 1 -4 -4 v-14 a4 4 0 0 1 4 -4 z"
    />
    {/* Left Pixel Node */}
    <rect x="14" y="36" width="20" height="20" rx="3.5" />
    {/* Bottom-Left Pixel Node */}
    <rect x="14" y="62" width="20" height="20" rx="3.5" />
    {/* Inner Center Pixel Node */}
    <rect x="36" y="48" width="20" height="20" rx="3.5" />
    {/* Bottom-Right Pixel Node */}
    <rect x="50" y="62" width="20" height="20" rx="3.5" />
  </svg>
);

const DevLogo = ({
  className,
  showText = true,
  size = "md",
}: {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}) => {
  const [imgError, setImgError] = useState(false);

  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  const textSizes = {
    sm: "text-[15px]",
    md: "text-[17px]",
    lg: "text-[20px]",
  };

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative grid place-items-center transition-transform duration-300 group-hover:scale-105",
          iconSizes[size]
        )}
      >
        {!imgError ? (
          <img
            src={ZENDEV_LOGO_URL}
            alt="ZENDEV Logo"
            className="h-full w-full object-contain"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
          />
        ) : (
          <ZenDevIcon className="h-full w-full text-dev-ink" />
        )}
      </span>
      {showText && (
        <span
          className={cn(
            "font-bold tracking-[-0.03em] text-dev-ink",
            textSizes[size]
          )}
        >
          ZENDEV
        </span>
      )}
    </span>
  );
};

export default DevLogo;

