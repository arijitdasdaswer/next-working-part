
// bin expander that takes the spaces when user clicks that particular bin, showing the

import React, { useEffect, useRef, useState } from "react";

// the rules of can and can't:
interface ExpanderProps {
    can: string;
    cannot: string;
    isOpen: boolean;
    toggler: () => void;
}

const BinExpander: React.FC<ExpanderProps> = ({ can, cannot, isOpen, toggler }) => {
    // format the can and cannt list before rendering:
    const canList: string[] = JSON.parse(can);
    const cannotList: string[] = JSON.parse(cannot);
    const [displayCol, setDisplayCol] = useState('left');
    const displayRight = () => {
        setDisplayCol('right');
    }
    const displayLeft = () => {
        setDisplayCol('left');
    }

    // Prevent clicks on any part of the expander will not propagrate to binIcon (no unexpected closures):
    const handleExpanderClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };
    
    // Manage scrolling to the top of the container
    const headRef = useRef<HTMLDivElement | null>(null);
    function scrollToTop(){
        if (headRef.current){
            headRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(()=>{
        if(isOpen){
            console.log("Scrolling to the top");
            scrollToTop();
        }
    },[isOpen])

    return (
        <React.Fragment>
            {isOpen && (
                <div className={`absolute top-0 right-0 left-0 w-full min-h-full max-h-full flex flex-col rounded-lg border-solid border-4 border-[rgb(var(--pickle-green))] light-white-bg`}
                onClick={handleExpanderClick} ref={headRef}>
                    <div className="sticky top-[-4] z-60 flex flex-row">
                        <button
                            className={`h-14 w-1/2 rounded-b-lg p-2 font-semibold border-solid border-r-1 
                            ${(displayCol=='left')? "clickedList pickle-green-text border-b-4": "unclickedList border-b-2"}`}
                            onClick={(e) => {
                                if (displayCol == "right") { //only clickable when current displaying cannot go in list
                                    displayLeft();
                                }
                            }}>
                            What can go in
                        </button>

                        <button
                            className={`h-14 w-1/2 rounded-b-lg p-2 font-semibold border-solid border-l-1
                            ${(displayCol=='right')? "clickedList custom-red-text border-b-4": "unclickedList border-b-2"}`}
                            onClick={(e) => {
                                if (displayCol == "left") { //only clickable when current displaying can go in list
                                    displayRight();
                                }
                            }}>
                            What cannot go in
                        </button>
                    </div>

                    {/* display accoridngly */}
                    <ul className="flex flex-col items-start overflow-y-auto light-white-bg mb-14 rule-scroll">
                        {displayCol == "left" ?
                            canList.map((item) => (
                                <li className="py-2 px-4 flex flex-row w-full hover:bg-[rgb(var(--creamy-green))] duration-300">
                                    <span className="checkmark text-lg mr-2 ml-2">✓</span> {item}
                                </li>
                            ))
                            :
                            cannotList.map((item) => (
                                <li className="py-2 px-4 flex flex-row items-center w-full hover:bg-[rgb(var(--custom-red))] hover:text-[rgb(var(--light-white))] duration-300">
                                    <span className="crossmark text-lg mr-2 ml-2">x</span> {item}
                                </li>
                            ))
                        }
                    </ul>

                    {/*close button*/}
                    <div className="absolute bottom-4 right-4 flex justify-end items-center" onClick={toggler}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#0b6623" className="w-8 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                        <p className="pickle-green-text font-semibold text-lg back-text">go back</p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
}

export default BinExpander;