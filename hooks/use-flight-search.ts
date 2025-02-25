"use client";

import { useState, useCallback } from "react";
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
    data: {
        bundles: Array<{
            bundlePrice: Array<{
                price: {
                    usd: {
                        charges: Array<{
                            total: {
                                inc: number;
                                exc: number;
                            }
                        }>
                    }
                }
            }>;
            itineraries: Array<{
                id: string;
                token: string;
                duration: number;
                segments: Array<{
                    flightNumber: string;
                    departure: { 
                        time: string; 
                        airport: string; 
                        city?: string;
                        airportName?: string;
                    };
                    arrival: { 
                        time: string; 
                        airport: string; 
                        city?: string;
                        airportName?: string;
                    };
                    carrierContent: {
                        carrierCode: string;
                        carrierName: string;
                        carrierIcon: string;
                    };
                    operatingCarrierContent?: {
                        carrierCode: string;
                        carrierName: string;
                    };
                }>;
            }>;
            key: string;
            outboundSlice: any;
            inboundFilters: any;
        }>;
        totalBundles: number;
    };
    status: boolean;
    message: string;
}


export interface Itinerary {
    id: string;
    token: string;
    duration: number;
    segments: Array<{
        flightNumber: string;
        departure: { 
            time: string; 
            airport: string; 
            city?: string;
            airportName?: string;
        };
        arrival: { 
            time: string; 
            airport: string; 
            city?: string;
            airportName?: string;
        };
        carrierContent: {
            carrierCode: string;
            carrierName: string;
            carrierIcon: string;
        };
        operatingCarrierContent?: {
            carrierCode: string;
            carrierName: string;
        };
    }>;
    bundlePrice?: {
        price: {
            usd: {
                charges: Array<{
                    total: {
                        inc: number;
                        exc: number;
                    }
                }>
            }
        }
    };
    price?: {
        total: {
            inc: number;
            exc: number;
        }
    };
}

// For search flights
export const useFlightSearch = () => {
    const [result, setResult] = useState<FlightSearchResult>({
        data: {
            bundles: [],
            totalBundles: 0
        },
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
            const response = await axios.get(`/flights/api/search?query=${query}`);
            setResult(response.data);
        } catch (error) {
            setError("Error fetching flight data");
            console.log("Flight data not found", error);
        } finally {
            setLoading(false);
        }
    };

    const searchRoundTrip = useCallback(async (params) => {
        const { origin, destination, departureDate, returnDate, adults, children, cabinType, page = 1, size = 5 } = params;

        if (!origin || !destination || !departureDate || !returnDate || !adults || !cabinType) {
            console.error('Missing required parameters');
            return;
        }

        console.log('API Request Parameters:', {
            origin,
            destination,
            departureDate: new Date(departureDate).toISOString().split('T')[0],
            returnDate: new Date(returnDate).toISOString().split('T')[0],
            adults,
            children,
            cabinType,
            page,
            size
        });

        setLoading(true);
        setError("");

        try {
            const response = await axios.get(`/flights/api/roundtrip`, {
                params: {
                    origin,
                    destination,
                    departureDate: new Date(departureDate).toISOString().split('T')[0],
                    returnDate: new Date(returnDate).toISOString().split('T')[0],
                    adults,
                    children,
                    cabinType,
                    page,
                    size
                }
            });

            console.log('Roundtrip API Response:', response.data);
            setResult(response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching flight data:', error);
            setError("Error fetching flight data");
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    const getFlightDetails = async (itineraryId: string, token: string) => {
        try {
            const url = `/api/flights/${itineraryId}`;
            console.log('Fetching flight details from URL:', url, 'with token:', token); // Log the URL and token
            
            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data; // Ensure this matches { data: { itinerary: ... } }
        } catch (error) {
            console.error('Error fetching flight details:', error);
            return null;
        }
    };

    return {
        result,
        loading,
        error,
        searchFlight,
        searchRoundTrip,
        getFlightDetails
    }
}