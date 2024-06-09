import React from "react";

interface RibbonProps {
  text: string;
  color?: string;
}

const Ribbon: React.FC<RibbonProps> = ({ text, color = "bg-red-500" }) => (
  <div
    className={`flex absolute px-2 py-[2px] rounded-l-md rounded-tr-md top-3 right-0 pointer-events-none z-10 ${color} translate-x-[6px] before:absolute before:w-[6px] before:h-[5px] before:right-0 before:top-6 before:rounded-br-md before:bg-red-700`}
  >
    <span className="text-white break-all text-ellipsis text-[14px]">
      {text}
    </span>
  </div>
);

export default Ribbon;
