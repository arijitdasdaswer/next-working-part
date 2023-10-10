'use client'
import Footer from "../../components/Footer";
import { SpecificBinsStructure, SpecificItemsStructure } from "../../components/DataStructure";
import { useEffect, useState } from "react";
import { useCouncilContext } from "../providers";
import BinIcon from "../../components/BinIcon";
import React from "react";
import ItemLookUpInterface from "../../components/ItemLookUpInterface";

interface displayedItems extends SpecificItemsStructure {
    display: boolean; // whether the filtered list contains this item
}

// Page for displaying the fetched BIns info wrt to homecouncil
function Bins() {
    // referencing the current homecouncil context
    const homeCouncil = useCouncilContext();

    // Extracting bins data
    const [binsData, setBinsData] = useState<SpecificBinsStructure[]>([])
    const [isLoadingBins, setLoadingBins] = useState(true)
    useEffect(() => {
        // initialising based on the current 
        if (homeCouncil.councilValue != null) {
            const paramValue = homeCouncil.councilValue.split(",")[0].trim();
            fetch(`/api/bins/fetchSpecificBins?specificCouncil=${paramValue}`)
                .then((res) => res.json())
                .then((data) => {
                    setBinsData(data);
                    setLoadingBins(false);
                })
                .catch((error) => {
                    console.log(error)
                    console.log("failed to fetch bins information based on the home council");
                });
        }
        else {
            console.log('no longer preparing bins info given no homecouncil has been selected.');
        }
    }, [homeCouncil.councilValue]) // should re-run everytime the homecouncil selection has changed

    // Extracting items data
    const [itemsData, setItemsData] = useState<displayedItems[]>([]);
    const [isLoadingItems, setLoadingItems] = useState(true);
    useEffect(() => {
        if (homeCouncil.councilValue != null) {
            const paramValue = homeCouncil.councilValue.split(",")[0].trim();
            fetch(`/api/items/fetchItems?specificCouncil=${paramValue}`)
                .then((res) => res.json())
                .then((data) => {

                    // Initialize the display property to be true for all items
                    const displayedData: displayedItems[] = data.map((item: SpecificItemsStructure) => ({
                        name: item.name,
                        methods: item.methods,
                        display: true,
                    }));
                    setItemsData(displayedData);
                    setLoadingItems(false);
                })
                .catch((error) => {
                    console.log(error)
                    console.log("failed to fetch bins information based on the home council");
                })
        }
    }, [homeCouncil.councilValue]);

    if (isLoadingBins || isLoadingItems) {
        return <div className="flex flex-row item-center text-lg font-semibold">Loading...</div>;
    }

    return (
        <div className="">
            <ItemLookUpInterface itemsData = {itemsData} setItemsData = {setItemsData}/>
            <p className="pt-4 pb-4 text-center font-semibold text-lg ">Bin Rules for my Home council</p>
            {binsData && (
                // giving a layout of 2x3 at most to equally divide the spaces
                <div className="grid grid-cols-2 gap-4">
                    {binsData.map((bin: SpecificBinsStructure, index: number) => (
                        <div key={index}>
                            <BinIcon iconType={bin.type} can={bin.can} cannot={bin.cannot} explorebin={null}/>
                        </div>
                    ))}
                </div>
            )}
            <Footer parentHeight={0} />
        </div>
    );

}
export default Bins;