import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


// To get flight details
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const itineraryId = searchParams.get("itineraryId");
    const token = searchParams.get("token");

    if(!itineraryId && !token) {
        return NextResponse.json({ error: "itinerary id & token are required" }, { status: 400 });
    }

    const apiKey = process.env.RAPID_API_KEY;

    try {
        const response = await axios.get('https://agoda-com.p.rapidapi.com/flights/details', {
            params: {
                itineraryId,
                token
            },
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
        console.log("Error fetching flight data", error);
        return NextResponse.json({ error: "Failed to fetch flight data" }, { status: 500 });
    }
}