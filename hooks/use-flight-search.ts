"use client";

import { useState } from "react";
import axios from "axios";


export const useFlightSearch = () => {
    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchFlight = async (query: string) => {
        if(!query) return;
        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`/flights/api?query=${query}`);
            setResult(response.data);
        } catch (error) {
            setError("Error fetching flight data");
            console.log("Flight data not found", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        result,
        loading,
        error,
        searchFlight
    }
}