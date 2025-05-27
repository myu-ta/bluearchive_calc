import React from "react";

interface CharaDeleteButtonProps {
  onDelete: () => void;
  className?: string;
}

export const CharaDeleteButton: React.FC<CharaDeleteButtonProps> = ({ onDelete, className }) => {
  return (
    <button
      onClick={onDelete}
      className={` text-black hover:text-black hover:opacity-30 hover:bg-slate-50 rounded-full p-1 transition-all ${className || ""}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
};
