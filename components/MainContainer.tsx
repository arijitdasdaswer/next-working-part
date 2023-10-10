import React from "react";
import { ReactNode } from "react";

interface CustomCardProps {
  children: ReactNode;
}

// This relative transparent container will hold most of the content, for expanders (e.g., search interfaces that takes absolute potistions)
const MainContainer: React.FC<CustomCardProps> = ({ children }) => {
  return (
    <div className="p-4 mt-4 ml-12 mr-12 bg-transparent overflow-y-auto h-[10rem] relative hide-scroll" style={{ minHeight: "calc(100vh - 13rem)", maxHeight: "calc(100vh - 13rem)"}}>
       {children}
    </div>
  );
};

export default MainContainer;
