"use client";
//Home page to be loaded!
import { useCouncilContext } from "./providers";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import React from "react";
import Card from "../components/Card";

const LandingPage: React.FC = () => {
  const homeCouncil = useCouncilContext();
  const parentRef = useRef<HTMLImageElement>(null);
  const [parentHeight, setParentHeight] = useState(0);
  useEffect(() => {
    if (parentRef.current) {
      // Setting height of the slider to be right below the image's bottom (still having some rsizing issue)
      const position = parentRef.current.getBoundingClientRect();
      setParentHeight(window.innerHeight - position.bottom);
    }
  }, []);

  return (
    <div className="flex flex-col">
      {/* Introdutive infromation */}
      <Card>
        <div className="flex flex-col items-start">
          <h2 className="font-semibold mb-1" >Welcome to binfluence! </h2>
          <p><span className="mr-1">⚝</span> We have created a space to make it easier for you to divert waste from landfill and find options to rehome/reuse/repair and recycle your items.</p>
        </div>
      </Card>

      <div ref={parentRef}></div>

      {/*Display navigation options*/}
      {homeCouncil.councilValue && (
        <div className="flex flex-col items-center w-full mt-6 space-y-2 text-[2.8vw]">
          <div className="flex flex-row items-center">
            <img src="/images/logo.png" alt="logo" className="h-12 w-12 mr-2" />
            <p className="font-semibold text-[4vw]">What are you looking for today?</p>
          </div>
          <Link
            href="./homerecycling"
            className="flex items-center rounded-full border-2 px-4 py-1 text-white w-[75%] font-semibold home-navi-button"
          >
            <span className="flex-grow text-center">My council bins and item Search</span>
            <span>➤</span>
          </Link>

          <Link
            href="./scan"
            className="flex items-center rounded-full border-2 px-4 py-1 text-white w-[75%] font-semibold home-navi-button"
          >
            <span className="flex-grow text-center">Scan bin QR code</span>
            <span>➤</span>
          </Link>

          <Link
            href="./community"
            className="flex items-center rounded-full border-2 px-4 py-1 text-white w-[75%] font-semibold home-navi-button"
          >
            <span className="flex-grow text-center">My community</span>
            <span>➤</span>
          </Link>

          <Link
            href="./map"
            className="flex items-center rounded-full border-2 px-4 py-1 text-white w-[75%] font-semibold home-navi-button"
          >
            <span className="flex-grow text-center">Map</span>
            <span>➤</span>
          </Link>
          <button
            onClick={()=>{homeCouncil.councilUpdate(null)}}
            className="flex items-center rounded-full border-2 px-4 py-1 text-white w-[75%] font-semibold home-navi-button"
          >
            <span className="flex-grow text-center">Reset my council</span>
            <span className="text-[2.2vh]"> ↻ </span>
          </button>
        </div>
      )}
      <Footer parentHeight={parentHeight} />
    </div>
  );
};

export default LandingPage;
