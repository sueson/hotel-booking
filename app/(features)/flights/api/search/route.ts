import { NextRequest, NextResponse } from "next/server";
import axios from "axios";


// To search flight
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if(!query) {
        return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const apiKey = process.env.RAPID_API_KEY;

    try {
        const response = await axios.get('https://agoda-com.p.rapidapi.com/flights/auto-complete', {
            params: { query },
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