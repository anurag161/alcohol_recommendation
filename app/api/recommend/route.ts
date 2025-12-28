import Groq from "groq-sdk";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    // Verify API key exists
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not set");
      return NextResponse.json({ 
        error: "API configuration error. Please contact support.",
        recommendations: []
      }, { status: 500 });
    }

    // Initialize Groq client inside the function
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const body = await req.json();
    const { state, budget, tasteProfile, occasion } = body;

    // RAG STEP: Query Prisma database for matching brands
    const matchingBrands = await prisma.brand.findMany({
      where: {
        region: state || undefined, // Filter by state/region if provided
        // You can add more filters based on quality, category, etc.
      },
      take: 15, // Get top 15 brands to give AI context
      orderBy: {
        rating: 'desc' // Order by highest rated first
      }
    });

    // If no brands found, return empty result
    if (matchingBrands.length === 0) {
      return NextResponse.json({ 
        recommendations: [],
        message: "No brands found matching your criteria. Try adjusting your filters."
      });
    }

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert sommelier at Daru GPT. You MUST ONLY recommend drinks from the database provided.
          
          CRITICAL RULES:
          - ONLY use brands from the database context provided
          - DO NOT make up brand names, prices, or details
          - Match the user's taste profile (${tasteProfile?.join(", ") || "any"})
          - Consider the occasion: ${occasion || "general"}
          - Recommend 3 drinks maximum
          - Include responsible drinking advice
          
          Return response in this EXACT JSON format:
          {
            "recommendations": [
              {
                "name": "Brand Name from database and web",
                "category": "Category from database and web",
                "price": "Estimated ₹X,XXX based on quality",
                "description": "Tasting notes matching user's taste profile",
                "serving": "Safe serving advice (e.g., 'Recommended: 2 servings of 60ml over 2 hours')",
                "abv": "X%",
                "matchScore": "XX%"
              }
            ]
          }`
        },
        {
          role: "user",
          content: `User preferences:
          - State/Region: ${state || "Any"}
          - Budget Range: ₹${budget?.[0] || 500} - ₹${budget?.[1] || 10000}
          - Taste Profile: ${tasteProfile?.join(", ") || "Any"}
          - Occasion: ${occasion || "General"}
          
          Available brands from our database:
          ${JSON.stringify(matchingBrands.map((b: any) => ({
            name: b.name,
            category: b.category,
            abv: b.abv,
            rating: b.rating,
            quality: b.quality,
            region: b.region
          })), null, 2)}
          
          Please recommend the 3 best matches with tasting notes and safe serving advice.`
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
      response_format: { type: "json_object" }
    });

    const response = chatCompletion.choices[0].message.content;
    const parsedResponse = JSON.parse(response || "{}");
    
    return NextResponse.json(parsedResponse);

  } catch (error: any) {
    console.error("RECOMMEND API ERROR:", error);
    return NextResponse.json({ 
      error: error.message || "Failed to get recommendations",
      recommendations: []
    }, { status: 500 });
  }
}