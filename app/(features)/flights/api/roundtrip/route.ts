import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


// For flight roundtrip
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const origin = searchParams.get("origin");
    const destination = searchParams.get("destination");
    const departureDate = searchParams.get("departureDate");
    const returnDate = searchParams.get("returnDate");
    const adults = searchParams.get("adults");
    const children = searchParams.get("children");
    const cabinType = searchParams.get("cabinType");

    if(!origin || !destination || !departureDate || !returnDate || !adults || !children || !cabinType) {
        return NextResponse.json({ error: "Fill all required options" }, { status: 400 });
    }

    const apiKey = process.env.RAPID_API_KEY;

    try {
        const response = await axios.get('https://agoda-com.p.rapidapi.com/flights/search-roundtrip', {
            params: { origin, destination, departureDate, returnDate, adults, children, cabinType },
            headers: {
                'x-rapidapi-host': 'agoda-com.p.rapidapi.com',
                'x-rapidapi-key': apiKey
            },
        });

        if(response.status !== 200) {
            return NextResponse.json({ error: "Failed to load flight data" }, { status: response.status })
        };

        const data = response.data;

        return NextResponse.json(data);
    } catch (error) {
        console.log("Error fetching roundtrip flight data", error);
        return NextResponse.json({ error: "Failed to fetch roundtrip flight data" }, { status: 500 });
    }
}