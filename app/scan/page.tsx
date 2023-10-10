"use client";
import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import Footer from "../../components/Footer";
import { useSearchParams } from "next/navigation";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";

const Scan = () => {
  const [isScanned, setIsScanned] = useState(false);
  const [indication, setIndication] = useState("");

  function ScanValidation(councilParam: string, binParam: string) {
    // only proceed if valid parameters are passed
    if (councilParam != "" && binParam !== ""){
      setIsScanned(true)
      fetch(`/api/validation/validateScan?council=${councilParam}&bin=${binParam}`)
      .then((res) => res.json())
      .then((isValidated) =>{
        if (isValidated) { // if the validation is true, then redirect
          setIndication("Redirecting...")
          window.location.replace(`/explore?council=${councilParam}&bin=${binParam}`);
        }
        else { // else re-do scanning
          setIsScanned(false);
          setIndication("Invalid Scan, please refer to the QR-code example above!")
        } 
      })
      .catch((error) => {
        console.log(error)
        console.log("failed to fetch bins information based on the home council");
        setIsScanned(false);
        setIndication("Invalid Scan, please refer to the QR-code example above!")
      });

    }
  }

  return (
    <div className="flex flex-col w-full items-center scan-border-colour mt-2 p-4">
      {/* Show minimum content */}
      <div className="flex flex-row items-center justify-between">
        <img src="/images/demo-qr-code.png" className="ml-4 mr-2 w-[20vw]" />
        <div className="flex flex-col ml-5 text-[2.8vw]">
          <p> <span className="mr-2">⚝</span> Please scan any <b className="pickle-green-text italic">binfluence QR code</b> looking like this, to quickly check out a bin rule.</p>
          <button className="councilSearchButton rounded-lg font-semibold px-2 py-1 mt-2"
            onClick={() => { window.location.replace('/explore') }}>
            or explore by yourself <span>➤</span>
          </button>
        </div>
      </div>

      {/* Only present scanner when validatio is not in progress */}
      {!isScanned && (
        <QrReader
        onResult={(result: any, error: any) => {
          if (!!result) {
            try {
              const url = new URL(result?.text);
              ScanValidation(url.searchParams.get('council') || '', url.searchParams.get('bin') || "");
            }
            catch (e) {
              console.info(e);
            }
          }
          if (!!error) {
            console.info(error);
          }
        }}
        className="w-3/4 rounded-lg" />
      )}
      <p className={`text-[3vw] font-semibold text-center italitic mt-2`}>{indication}</p>
      <Footer parentHeight={0} />
    </div>
  );
};

export default Scan;
