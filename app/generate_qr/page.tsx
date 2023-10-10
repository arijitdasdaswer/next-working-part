"use client";
import React, { useState, ChangeEvent } from "react";
import { QRCode } from "react-qrcode-logo";

export default function QRgen() {
  const [binValue, setBinValue] = useState("");
  const [councilValue, setCouncilValue] = useState("");
  const [baseURL, setBaseURL] = useState("http://localhost:3000/");

  // Create the overall URL by combining baseURL, councilValue, and binValue
  const overallURL = `${baseURL}qr_redirect?council=${councilValue}&bin=${binValue}`;

  return (
    <div className="flex flex-row w-full h-full">
      <div className="flex flex-col h-full w-full items-center">
        <h1 className="text-2xl">QR Code Generator App</h1>

        <textarea
          className="w-72 m-2 rounded-md shadow-md p-1"
          placeholder="Enter Council"
          onChange={(e) => setCouncilValue(e.target.value)}
        />

        <textarea
          className="w-72 m-2 rounded-md shadow-md p-1"
          placeholder="Enter Bin"
          onChange={(e) => setBinValue(e.target.value)}
        />

        <textarea
          className="w-72 m-2 rounded-md shadow-md p-1"
          placeholder="Enter base url"
          defaultValue={baseURL}
          onChange={(e) => setBaseURL(e.target.value)}
        />

        <div>QR URL: {overallURL}</div>

        <QRCode
          value={overallURL} // Use overallURL as the QR code value
          logoImage="images/binfluencelogo.png"
          logoWidth={80}
          logoHeight={80}
          size={300}
        />
      </div>
    </div>
  );
}
