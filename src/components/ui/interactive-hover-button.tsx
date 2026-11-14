import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  icon?: React.ReactNode;
}

export const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = "Button", children, className, icon, ...props }, ref) => {
  const content = children || text;

  return (
    <button
      ref={ref}
      className={cn(
        "group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full cursor-pointer overflow-hidden font-semibold text-sm transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0859D4]/60",
        "bg-[#1D1D1F] text-white border border-[#1D1D1F] hover:border-[#0859D4]",
        "hover:shadow-[0_10px_28px_rgba(8,89,212,0.28)] active:scale-[0.98]",
        className
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-[#0859D4] to-[#1A59F9] opacity-0 scale-95 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-100 pointer-events-none"
      />

      <span className="relative z-10 inline-flex items-center justify-center gap-2 transition-transform duration-300 ease-out group-hover:translate-x-[-2px]">
        <span className="transition-colors duration-300 text-white font-medium">
          {content}
        </span>
        <span className="inline-flex items-center text-white/80 group-hover:text-white transition-all duration-300 ease-out group-hover:translate-x-1">
          {icon || <ArrowRight className="w-3.5 h-3.5" />}
        </span>
      </span>
    </button>
  );
});

InteractiveHoverButton.displayName = "InteractiveHoverButton";

export default InteractiveHoverButton;
