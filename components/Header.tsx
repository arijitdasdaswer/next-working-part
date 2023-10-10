"use client";
import React, { useState } from "react";
import { useCouncilContext } from "../app/providers";
import OverlayMenu from "./overlayMenu";
import { usePathname } from "next/navigation";

function Header(): React.JSX.Element {
  // Constant extract the councilContext:
  const homeCouncil = useCouncilContext();

  // Setting up state management tools for the menu
  const [isOpen, setIsOpen] = useState(false);

  // simple toggles for the menu button
  const handleToggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="sticky top-0 z-50">

      {/* Logo and council displays*/}
      <div className={`flex flex-row items-center w-[100vw]`}>
        <img src="/images/binfluence-logo-removebg.png" alt="logo" className="h-[15vh]" />

        {(!usePathname().includes("/explore")) ? ( // normal display of home council
          <p className="navy-black-text text-[2.7vw] mt-2 -ml-2 border-t border-r border-b py-1 px-2 header-border-colour">
            {homeCouncil.councilValue ? (<span> My Council is <span className="font-semibold">{homeCouncil.councilValue.split(",")[0].trim()}</span></span>
            ) : (
              "Please select your Home Council"
            )}
          </p>
        ) : ( // ignore home council on exploring pages to avoid confusions
          <p className="navy-black-text text-[2.7vw] mt-2 -ml-2 border-t border-r border-b py-1 px-2 header-border-colour">Explore Recycling Councils</p>
        )}

        {/* Setting up Menu Icon on the right corner*/}
        <button
          onClick={handleToggleMenu}
          className={`navy-black-text focus:outline-none absolute right-8 mt-2`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#383e48" className="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
          </svg>

        </button>
        <OverlayMenu isOpen={isOpen} toggler={handleToggleMenu} />
      </div>
    </header>
  );
}
export default Header;
