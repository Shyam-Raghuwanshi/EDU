import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { rateLimit } from "@/middleware/rateLimit";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  // Apply rate limiting
  const limitResponse = await rateLimit(req);
  if (limitResponse) return limitResponse;

  try {
    const { systemPrompt, userPrompt, maxTokens = 2000 } = await req.json();

    if (!systemPrompt || !userPrompt) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `${systemPrompt} Provide your response in JSON format.` },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
      response_format: { type: "json_object" },
    });

    return NextResponse.json(response.choices[0].message?.content || "");
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
