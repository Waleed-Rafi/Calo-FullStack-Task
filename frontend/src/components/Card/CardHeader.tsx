import React from "react";

const CardHeader: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => (
  <div
    className={`flex flex-row items-center justify-between p-6 ${className}`}
  >
    {children}
  </div>
);

export default CardHeader;
