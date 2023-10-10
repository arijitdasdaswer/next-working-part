//EXAMPLE OF STRING TO PASS THROUGH

//http://localhost:3000/qr_redirect?council=ExampleCouncil&bin=12345

"use client";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function QR_page() {
  const searchParams = useSearchParams();
  const [validity, setValidity] = useState(false);

  // Get the "council" and "bin" query parameters
  const council = searchParams.get("council");
  const bin = searchParams.get("bin");

  useEffect(() => {
    if (council && bin) {
      //DO VALIDATION CHECK HERE, this only checks if the council and bin are not null

      // Redirect to the next page with the "council" and "bin" query parameters
      //

      const redirectUrl = `/valid-page?council=${council}&bin=${bin}`;
      window.location.replace(redirectUrl);
    } else {
      // Display a message for invalid parameters
      console.log("Invalid link");
    }
  }, [council, bin]);

  return (
    <div>
      <h1>Search Parameters</h1>
      <p>Council: {council}</p>
      <p>Bin: {bin}</p>
      <p>Validity of URL: {validity ? "good url" : "bad url"}</p>
    </div>
  );
}
