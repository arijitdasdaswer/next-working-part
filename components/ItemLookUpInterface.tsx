'use client'
import { SpecificItemsStructure } from "./DataStructure";
import { useState } from "react";
import ItemExpander from "./ItemExpander";

interface displayedItems extends SpecificItemsStructure {
    display: boolean; // whether the filtered list contains this item
}

interface ItemLookUpInterfaceProps {
    itemsData: displayedItems[];
    setItemsData: (data: displayedItems[]) => void;
}
const ItemLookUpInterface: React.FC<ItemLookUpInterfaceProps> = ({ itemsData, setItemsData }) => {
    // Setting up the states for search list:
    const [searchValue, setSearchValue] = useState("");
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchValue(value);

        // corresponding set the siltered Items, must create a new object that represents the most-up-to-date filter
        const filtered = itemsData.map((item: displayedItems) => ({
            ...item,
            display: item.name.toLowerCase().includes(value.toLocaleLowerCase())
        }));
        setItemsData(filtered);
    }

    // handle search input placeholder, when user clicks to serach, the full list of itemsData slide out:
    const [isClearingPlaceholder, setIsClearingPlaceholder] = useState(false);
    const [slideOut, setSlideOut] = useState(false);
    const handleSearchClick = () => {
        setIsClearingPlaceholder(true);
        setSlideOut(true);
    }
    const closeSearchInterface = () => {
        setSlideOut(false);
        setIsClearingPlaceholder(false);
    }
    return (
        <div className={`flex flex-col items-center 
            ${slideOut ? "absolute top-0 left-0 right-0 w-full min-h-full max-h-full rounded-lg border-solid border-4 border-[rgb(var(--navy-black))] light-white-bg"
                : "min-h-min"}`}>
            <div className={`absolute flex items-center sticky top-[-3] w-full interface-display p-3 mb-2 ${slideOut ? "rounded-b-lg flex-col text-lg" : "rounded-lg flex-row"}`}>
                <h4 className="text-center font-semibold text-[3.2vw]">Don't know which bin? Search by items </h4>
                <input
                    type="text"
                    placeholder={`${isClearingPlaceholder ? "" : "Search Here ..."}`}
                    value={slideOut? searchValue : ""}
                    onClick={handleSearchClick}
                    onChange={handleSearchChange}
                    className={`px-1 py-1 ${slideOut ? "black-search-border w-[88%] mt-2" : "ml-2 mr-1 grey-search-border w-[50%] flex-grow"}`}
                />
            </div>

            {(itemsData && slideOut) && (
                <div className="hide-scroll grid grid-cols-1 w-11/12 gap-[0.5rem] overflow-y-auto mb-4 rounded-lg">
                    {itemsData.map((item: displayedItems, index: number) => {
                        if (item.display) {
                            return (<ItemExpander name={item.name} methods={item.methods} />);
                        }
                    })}
                </div>
            )}
            {slideOut && ( // close Button to go back to the recycling page
                <div className="flex flex-row justify-end items-center w-full mb-2 mr-6" onClick={closeSearchInterface}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#383e48" className="w-8 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                    </svg>
                    <p className="navy-black-text font-semibold text-lg back-text">go back</p>
                </div>
            )}
        </div>
    )
}
export default ItemLookUpInterface;