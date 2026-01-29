import { ChatGroq } from "@langchain/groq";
import { HumanMessage, AIMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { prisma } from "../../../lib/db";

// Allow longer runs in production (Vercel: 10s Hobby, 60s Pro)
export const maxDuration = 30;

const SYSTEM_PROMPT_BASE = `You are a sophisticated AI bartender named "Bart" working at 5 Spirits, a premium alcohol recommendation service.

Your personality: Friendly, knowledgeable, responsible, and witty. You have extensive knowledge about spirits, cocktails, and responsible drinking.

IMPORTANT RULES:
- Always promote responsible drinking
- Never encourage underage drinking or excessive consumption
- Be conversational and engaging
- Include safe drinking guidelines in your recommendations
- If users ask about availability, mention that final stock depends on the retail outlet`;

function systemPromptWithBrands(sampleBrands: { name: string; category: string; quality: string; rating: number; region: string }[]): string {
  if (sampleBrands.length === 0) {
    return `${SYSTEM_PROMPT_BASE}

You have broad knowledge of spirits and cocktails. Always end recommendations with responsible drinking reminders.`;
  }
  const brandList = sampleBrands.map((b) => `${b.name} (${b.category}, ${b.quality} quality, Rating: ${b.rating}/5)`).join(", ");
  const regions = [...new Set(sampleBrands.map((b) => b.region))].join(", ");
  return `${SYSTEM_PROMPT_BASE}

You have access to our comprehensive liquor database with premium brands like: ${brandList}...

Our brands are available across various regions in India including ${regions}.

Always end recommendations with responsible drinking reminders.`;
}

export async function POST(req: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      console.error("Chat API: GROQ_API_KEY is not set");
      return NextResponse.json(
        { error: "Chat service is not configured. Please try again later." },
        { status: 503 }
      );
    }

    const body = await req.json();
    const { message, conversationHistory = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    let sampleBrands: { name: string; category: string; quality: string; rating: number; region: string }[] = [];
    try {
      sampleBrands = await prisma.brand.findMany({
        take: 8,
        select: {
          name: true,
          category: true,
          quality: true,
          rating: true,
          region: true
        }
      });
    } catch (dbError) {
      console.error("Chat API: Database context failed, using fallback:", dbError);
      // Continue without brand context so chat still works
    }

    const systemContent = systemPromptWithBrands(sampleBrands);

    // Convert conversation history to LangChain format
    const messages = [
      new AIMessage(systemContent),
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
