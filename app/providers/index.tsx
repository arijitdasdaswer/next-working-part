'use client'
import React, { createContext, useState, ReactNode, useContext, useEffect} from "react";

// setting interface for the council context properties
interface CouncilContextType {
    councilValue: string | null;
    councilUpdate: (newCouncil: string | null) => void;
}

// Exporting the councilContext that is to be managed when 
// an user chose a council based on region / post code (undefined till initilised by councilProvider)
const CouncilContext = createContext<CouncilContextType | undefined>(undefined);

// Export the useCouncilContext function to account for undefined situations
export function useCouncilContext() {
    // On the client-side, call outs the local storage to update respectfully:
    const homeCouncil = useContext(CouncilContext);
    if (homeCouncil === undefined) {
        throw new Error('Home council is still undefined')
    }
    // Then proceed to extract the current state:
    return homeCouncil;
}

// setting interface for the children of the Context provider:
interface CouncilProviderProps {
    children: ReactNode; // ReactNode type is used for any valid JSX
}

// context manager
export const CouncilProvider: React.FC<CouncilProviderProps> = ({ children }) => {
    // Initialise the properties of this Council Context:
    const [councilValue, setCouncilValue] = useState<string | null>(localStorage.getItem('councilValue') ||null);
    const IntialContext = {
        councilValue,
        councilUpdate: (newCouncil: React.SetStateAction<string | null>) => {
            // if there is a string to be updated, then do so:
            if (typeof newCouncil === 'string') {
                setCouncilValue(newCouncil);
                localStorage.setItem('councilValue', newCouncil);
            }
            // else remove the council
            else if (newCouncil === null) {
                setCouncilValue(null);
                localStorage.removeItem('councilValue');
            }
        },
    }
    return (
        // provide the councilContext using the Provider (initialisation)
        <CouncilContext.Provider value={IntialContext}>
            {children}
        </CouncilContext.Provider>
    );
} 
