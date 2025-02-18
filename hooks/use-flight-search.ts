"use client";

import { useState } from "react";
import axios from "axios";

export interface Location {
    id: number;
    code: string;
    name: string;
    country: {
        name: string;
        code: string;
    };
}

interface FlightSearchResult {
    data: Location[];
    status: boolean;
    message: string;
}

// For search flights
export const useFlightSearch = () => {
    const [result, setResult] = useState<FlightSearchResult>({
        data: [],
        status: false,
        message: ''
    });
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

    const searchRoundTrip = async(params: {
        origin: string;
        destination: string;
        departureDate: string;
        returnDate: string;
        adults: number;
        children: number;
        cabinType: string;
    }) => {
        const { 
            origin, 
            destination,
            departureDate,
            returnDate,
            adults,
            children,
            cabinType
        } = params;

        if(!origin || !destination || !departureDate || !returnDate || !adults || !children || !cabinType) return;

        setLoading(true);
        setError("");

        try {
            const response = await axios.get("/flights/api/roundtrip", {
                params: {
                    origin,
                    destination,
                    departureDate,
                    returnDate,
                    adults,
                    children,
                    cabinType
                }
            });

            setResult(response.data);
        } catch (error) {
            setError("Error fetching flight data");
            console.log("Roundtrip flight data not found", error)
        } finally {
            setLoading(false) 
        }
    };

    const getFlightDetails = async(itineraryId: string, token: string) => {
        setLoading(true);
        setError("");

        try {
            const response = await axios.get("/flights/api/flight-details", {
                params: {
                    itineraryId,
                    token
                }
            });

            setResult(response.data);
        } catch (error) {
            setError("Error fetching flight details");
            console.log("Error fetching flight details", error);
        }
    }

    return {
        result,
        loading,
        error,
        searchFlight,
        searchRoundTrip,
        getFlightDetails
    }
}