import React, { useEffect, useState } from "react";
import { Method } from "./DataStructure";

interface itemExpanderProps {
    name: string;
    methods: Method[];
}

// Component used to control the displays of each individual item:
const ItemExpander: React.FC<itemExpanderProps> = ({ name, methods }) => {
    // intialise the state that determine the expander structure:
    const [collectionPoints, setCollectionPoints] = useState<Method[]>([]);
    const [dropOffPoints, setDropOffPoints] = useState<Method[]>([]);

    useEffect(() => {
        const cPoints: Method[] = [];
        const dPoints: Method[] = [];

        methods.map((method) => {
            if (method.bin === null) {
                dPoints.push(method);
            }
            else {
                cPoints.push(method);
            }
        })
        setCollectionPoints(cPoints);
        setDropOffPoints(dPoints);
    }, [methods])

    // Manage the toggling of this expander:
    const [isOpen, setIsOpen] = useState(false);
    const toggleExapnder = () => {
        setIsOpen(!isOpen);
    }

    // Manage the item images:
    const [imagePath, setImagePath] = useState<string>('');
    useEffect(()=>{
        const imageName: string = name.trim().replaceAll("/",":");
        console.log(`imageName:${imageName}`);
        const img = new Image();
        img.src = `/images/items/${imageName}.png`;
        img.onload = () => {
            setImagePath(`/images/items/${imageName}.png`);
        };
        img.onerror = () => {
            setImagePath("/images/logo.png");
        };
    },[]);


    return (
        <div className="flex flex-col item-display p-2 rounded-lg text-base md:text-lg lg:text-xl xl:text-2xl" >
            {/*show minimum content when the item is not being opened*/}
            <div className={`flex flex-row items-center ${isOpen ? "mb-2" : ""}`} onClick={toggleExapnder}>
                {}
                <img src={imagePath} className={`${isOpen ? "w-12 h-12 rounded-full": "w-6 h-6 rounded-lg"} mr-2`} />
                <p className={`flex items-center max-w-xs ${isOpen ? "pickle-green-text text-center font-bold text-lg" : "truncate font-semibold"}`}>{name}</p>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ml-auto flex-shrink-0"
                    style={{ transform: isOpen ? 'rotate(-90deg)' : '' }}>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </div>

            {/*show  content when the item is opened*/}
            {isOpen && (
                <React.Fragment>
                    {collectionPoints.length ? ( // assuming at least on collection bin note
                        <div>
                            <ul className="ml-2">
                                <li className="flex flex-row">
                                    <span className="checkmark mr-2">✓</span>
                                    <p>Please place it in <b>{collectionPoints[0].bin?.type}</b></p>
                                </li>
                            </ul>

                            <ul className="list-disc">
                                {collectionPoints.map((cPoint: Method) => { // Check map for each note of collection bin
                                    if (cPoint.note && !cPoint.note.includes("http")) {
                                        return (
                                            <li className="ml-8 whitespace-normal" key={cPoint.note}>
                                                <p><b>Note: </b>{cPoint.note}</p>
                                            </li>
                                        );
                                    }
                                    return null;
                                })}
                            </ul>
                            <ul className="list-disc break-all">
                                {collectionPoints.map((cPoint: Method) => { // Check map for each link of collection bin
                                    // Check if the note is link
                                    if (cPoint.note && cPoint.note.includes("http")) {
                                        return (
                                            <li className="ml-8 whitespace-normal italic">
                                                <div className="flex flex-row">
                                                    <a className="text-sm" href={cPoint.note} target="_blank" rel="noopener noreferrer">
                                                        <u>{cPoint.note}</u>
                                                    </a>
                                                    <svg className="w-2 h-2 dark:creamy-grey-text" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                        <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                                                        <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                                                    </svg>
                                                </div>
                                            </li>
                                        );
                                    }
                                    return null;  // Return null when the condition is not met
                                })}
                            </ul>
                        </div>
                    ) : ( // else just remind users they canot recycle this at collection point
                        <ul className="ml-2">
                            <li>
                                <span className="crossmark mr-2">x</span>
                                You <b>cannot</b> Throw it in the collection bins, please drop-off as follow:
                            </li>
                        </ul>
                    )}

                    {Boolean(dropOffPoints.length) && ( // only provide a separator between collection points and drop off points if drop off points exists
                        <p className="drop-off-separater font-semibold text-center mt-1">Available Drop-off options</p>
                    )}

                    {/* drop off points if they exists on this item */}
                    {Boolean(dropOffPoints.length) && (
                        <div className="mt-1 space-y-4 max-h-40 overflow-y-auto rule-scroll">
                            {dropOffPoints.map((dpoint) => (

                                // Display the name of facility
                                <div className="ml-2 mt-1">
                                    <div className="flex flex-row font-semibold items-center text-base md:text-lg lg:text-xl xl:text-2xl">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-4 flex-shrink-0">
                                            <path d="M19.006 3.705a.75.75 0 00-.512-1.41L6 6.838V3a.75.75 0 00-.75-.75h-1.5A.75.75 0 003 3v4.93l-1.006.365a.75.75 0 00.512 1.41l16.5-6z" />
                                            <path fill-rule="evenodd" d="M3.019 11.115L18 5.667V9.09l4.006 1.456a.75.75 0 11-.512 1.41l-.494-.18v8.475h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3v-9.129l.019-.006zM18 20.25v-9.565l1.5.545v9.02H18zm-9-6a.75.75 0 00-.75.75v4.5c0 .414.336.75.75.75h3a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75H9z" clip-rule="evenodd" />
                                        </svg>
                                        {dpoint.method?.split("\nDrop off\n")[0]}
                                    </div>

                                    
                                    <ul className="ml-8 list-disc break-all light-white-text text-sm md:text-lg lg:text-xl xl:text-2xl">
                                        {dpoint.method?.includes("Location:") && (
                                            <li className="">
                                                <b>Location:</b> {dpoint.method?.split("Location:")[1].trim()}
                                            </li>
                                        )}
                                        {dpoint.note && dpoint.note.includes("http") && (
                                            <li className="italic">
                                                <div className="flex flex-row">
                                                    <a className="text-sm" href={dpoint.note} target="_blank" rel="noopener noreferrer">
                                                        <u>{dpoint.note}</u>
                                                    </a>
                                                    <svg className="w-2 h-2 dark:creamy-grey-text" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                                                        <path d="M17 0h-5.768a1 1 0 1 0 0 2h3.354L8.4 8.182A1.003 1.003 0 1 0 9.818 9.6L16 3.414v3.354a1 1 0 0 0 2 0V1a1 1 0 0 0-1-1Z" />
                                                        <path d="m14.258 7.985-3.025 3.025A3 3 0 1 1 6.99 6.768l3.026-3.026A3.01 3.01 0 0 1 8.411 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V9.589a3.011 3.011 0 0 1-1.742-1.604Z" />
                                                    </svg>
                                                </div>
                                            </li>
                                        )}
                                        {dpoint.note && !dpoint.note.includes("http") && (
                                            <li>
                                                <b>Note:</b> {dpoint.note}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                </React.Fragment>
            )
            }
        </div >
    );
}

export default ItemExpander;