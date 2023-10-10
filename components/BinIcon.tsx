import React, { useState, useEffect } from 'react';
import { useCouncilContext } from '../app/providers';
import BinExpander from './BinExpander';

// Component that used to show the bin's type and its image:
interface IconProps {
    iconType: string;
    can: string;
    cannot: string;
    explorebin: string | null;
}

const BinIcon: React.FC<IconProps> = ({ iconType, can, cannot, explorebin}) => {

    // Setting up an state for managing the opening and close of the bins detail:
    const [openRules, setOpenRules] = useState(false);
    const toggleOpenRules = () => {
        setOpenRules(!openRules);
    }

    // determine the image source needed & initialise the state of opnening given explore situations
    const [imagePath, setImagePath] = useState<string>(''); // State to hold the image path
    const homeCouncil = useCouncilContext();
    useEffect(() => {
        // setting the expnder being opened or not:
        if (explorebin && explorebin === iconType){
            setOpenRules(!openRules);
        }

        // Define the image being used
        let image = 'undefined';
        if (iconType === 'General-Waste-Bin') {
            image = 'rubbish.png';
        } else if (iconType === 'Recycling-Bin') {
            image = 'recycling.png';
        } else if (iconType === 'Green-Waste-Bin') {
            image = 'green.png';
        } else if (iconType === 'Food-Waste-Bin') {
            image = 'fogo.png';
        } else if (iconType === 'Glass-Recycling-Bin') {
            image = 'glass.png';
        }

        if (homeCouncil.councilValue) {
            // Create paths for both general and specialized images
            const generalImagePath = `/images/bins/general-${image}`;
            const specializedImagePath = homeCouncil.councilValue
                ? `/images/bins/${homeCouncil.councilValue.split(',')[0].trim()}-${image}`
                : '';

            // Try loading the specialized image, if it fails, use the general image
            const img = new Image();
            img.src = specializedImagePath;
            img.onload = () => {
                setImagePath(specializedImagePath);
            };
            img.onerror = () => {
                setImagePath(generalImagePath);
            };
        }
    }, []);



    if (imagePath == "") {
        return <p>Await for council selection...</p>;
    }
    else{
        return (
            <div className="flex flex-col p-4 rounded-lg items-center bin-display" onClick={toggleOpenRules}>
                <p className='font-semibold text-sm md:text-lg lg:text-xl xl:text-2xl'>{iconType.replaceAll('-', ' ')}</p>
                <img src={imagePath}/>
                <BinExpander can={can} cannot={cannot} isOpen={openRules} toggler={toggleOpenRules}/>
            </div>
        );
    }
};

export default BinIcon;
