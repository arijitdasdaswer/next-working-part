import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRef } from 'react';
import { useCouncilContext } from '../app/providers';

interface OverlayMenuProps {
    isOpen: boolean;
    toggler: () => void;
}

const OverlayMenu: React.FC<OverlayMenuProps> = ({ isOpen, toggler }) => {

    // Handling the menu toggle on  the current dom level:
    const handleMenuItemClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        event.stopPropagation();
        toggler();
    };

    // Attach the event listener on the page level to close menu if clicked elsewhere on the page
    const menuRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handlePageClick = (event: MouseEvent): void => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                toggler();
            }
        };
        document.addEventListener("click", handlePageClick);
        return () => {
            // considering the initial attachment of isOpen is always false, handlePage needs to be
            // re-defined and reattached each time it changes!!!!!
            document.removeEventListener("click", handlePageClick);
        };
    }, [isOpen]);

    // manage menue navigations without home council:
    const homeCouncil = useCouncilContext();

    return (
        <div>
            {
                isOpen && (
                    <div>
                        {/* overlaying the rest of the screen to better focus users*/}
                        <div className={`fixed top-0 right-0 h-full w-full creamy-grey-bg ${isOpen ? 'opacity-60 visible' : 'opacity-0 invisible'}`}></div>

                        {/* navigation menue */}
                        <div className='fixed top-0 right-0 h-full w-2/5 bg-[rgb(var(--light-white))] flex flex-col items-center opacity-100'
                            ref={menuRef}>
                            <div style={{ paddingTop: '20%' }} className='flex flex-between items-center'>
                                <img src="/images/logo.png" alt="logo" className="h-12 w-12" />
                                <p className='pickle-green-text text-xl font-semibold italic'>binfluence</p>
                            </div>
                            <div style={{ paddingTop: '10%' }} className='flex flex-col font-semibold'>
                                <Link
                                    href="../"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                    onClick={handleMenuItemClick}>
                                    Homepage
                                </Link>

                                {homeCouncil.councilValue && (
                                    <Link
                                        href="../homerecycling"
                                        className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                        onClick={handleMenuItemClick}>
                                        My Council
                                    </Link>
                                )}

                                <Link
                                    href="../scan"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                    onClick={handleMenuItemClick}>
                                    Scan QR code
                                </Link>

                                <Link
                                    href="../explore"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                    onClick={handleMenuItemClick}>
                                    Explore recycling councils
                                </Link>
                                
                                {homeCouncil.councilValue && (
                                <Link
                                    href="../community"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                    onClick={handleMenuItemClick}>
                                    Community schemes
                                </Link>
                                )}

                                <Link
                                    href="../Map"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                    onClick={handleMenuItemClick}>
                                    Map
                                </Link>

                                <Link
                                    href="../about"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-300"
                                    onClick={handleMenuItemClick}>
                                    About us
                                </Link>

                                <Link
                                    href="../contact"
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-300"
                                    onClick={handleMenuItemClick}>
                                    Contact us
                                </Link>

                                <Link
                                    href={homeCouncil.councilValue ? ("../terms") : ("#")}
                                    className="fading-border text-[2.2vw] active:text-[rgb(var(--pickle-green))] active:scale-125 duration-500"
                                    onClick={handleMenuItemClick}>
                                    Terms of use of app
                                </Link>
    
                                <div className="absolute text-[4vh] top-4 right-4 cursor-pointer" onClick={toggler}>
                                    &times;
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default OverlayMenu;
