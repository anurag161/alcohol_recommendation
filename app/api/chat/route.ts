import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, conversationHistory = [] } = body;

    // Initialize the LLM
    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    // Fetch sample brands from database for context
    const sampleBrands = await prisma.brand.findMany({
      take: 8,
      select: {
        name: true,
        category: true,
        quality: true,
        rating: true,
        region: true
      }
    });

    // Convert conversation history to LangChain format
    const messages = [
      new AIMessage(`You are a sophisticated AI bartender named "Bart" working at Daru GPT, a premium alcohol recommendation service.

Your personality: Friendly, knowledgeable, responsible, and witty. You have extensive knowledge about spirits, cocktails, and responsible drinking.

IMPORTANT RULES:
- Always promote responsible drinking
- Never encourage underage drinking or excessive consumption
- Be conversational and engaging
- Include safe drinking guidelines in your recommendations
- If users ask about availability, mention that final stock depends on the retail outlet

You have access to our comprehensive liquor database with premium brands like: ${sampleBrands.map((b: { name: string; category: string; quality: string; rating: number }) => `${b.name} (${b.category}, ${b.quality} quality, Rating: ${b.rating}/5)`).join(", ")}...

Our brands are available across various regions in India including ${[...new Set(sampleBrands.map((b: { region: string }) => b.region))].join(", ")}.

Always end recommendations with responsible drinking reminders.`),
      ...conversationHistory.map((msg: any) => {
        if (msg.role === 'user') {
          return new HumanMessage(msg.content);
        } else if (msg.role === 'assistant') {
          return new AIMessage(msg.content);
        }
        return null;
      }).filter(Boolean),
      new HumanMessage(message)
    ];

    // Get response from LLM
    const response = await llm.invoke(messages);
    const aiResponse = response.content as string;

    // For now, we'll use a simpler approach - the AI will respond conversationally
    // In a production app, you'd implement proper tool calling
    // For this demo, the AI will use its training knowledge plus our context

    return NextResponse.json({
      response: aiResponse,
      conversationHistory: [
        ...conversationHistory,
        { role: 'user', content: message },
        { role: 'assistant', content: aiResponse }
      ]
    });

  } catch (error: any) {
    console.error("Bartender Agent Error:", error);
    return NextResponse.json(
      { error: "I'm having trouble processing your request. Please try again." },
      { status: 500 }
    );
  }
}
