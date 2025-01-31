import React from "react";

interface StyledContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StyledContainer: React.FC<StyledContainerProps> = ({
  children,
  className,
}) => (
  <div
    className={`flex flex-col items-center gap-2 m-auto rounded-md transition-all duration-300 ease-in-out hover:-translate-y-2 p-6 ${className}`}
  >
    {children}
  </div>
);

export default StyledContainer;
