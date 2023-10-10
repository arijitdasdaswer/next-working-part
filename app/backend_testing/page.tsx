"use client";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Home() {
  //here we are using the SWR library to simply fetch the data, please follow the below examples
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // Define a function for fetching data
  const fetchData = async (url, data) => {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/council/getCouncil?id=12&name=City%20of%20Port%20Phillip",
    fetcher
  );

  return (
    <div>
      <div>
        {isLoading
          ? "loading..."
          : data.map((item) => <div key={item.id}>{item.name}</div>)}
      </div>
    </div>
  );
}
