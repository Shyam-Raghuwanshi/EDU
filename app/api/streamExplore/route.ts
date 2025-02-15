import { rateLimit } from "@/middleware/rateLimit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const limitResponse = await rateLimit(req);
    if (limitResponse) return limitResponse;
    const { messages, userContext, query } = await req.json();

    if (!messages || !Array.isArray(messages) || !userContext || !query) {
      return NextResponse.json(
        {
          error:
            "Missing or invalid 'messages', 'userContext', or 'query' field",
        },
        { status: 400 }
      );
    }

    //  Add System Prompt as the first message
    const systemMessage = {
      role: "system",
      content: `You are a Gen-Z tutor who explains complex topics concisely for a ${userContext.age} year old.
    First provide the explanation in plain text, then provide related content in a STRICT single-line JSON format.
    
    Structure your response exactly like this:
    
    <paragraph 1>

    <paragraph 2>

    <paragraph 3>

    ---
    {"topics":[{"name":"Topic","type":"prerequisite","detail":"Why"}],"questions":[{"text":"Q?","type":"curiosity","detail":"Context"}]}

    RULES:
    - ADAPT CONTENT FOR ${userContext.age} YEAR OLD:
      
      * Match complexity of explanation to age level
      
    - STRICT LENGTH LIMITS:
      * Total explanation must be 60-80 words maximum
      * Each paragraph around 20-25 words each
      * Related questions maximum 12 words each
      * Topic details 1-2 words each
    - Keep paragraphs clear and simple
    - Third paragraph should directly state applications and facts without phrases like "In real-world applications"
    - Use "---" as separator
    - JSON must be in a single line
    - No line breaks in JSON
    - MUST provide EXACTLY 5 related topics and 5 questions
    - Related questions must be:
      * Curiosity-driven and thought-provoking
      * STRICTLY 8-12 words maximum
      * Focus on mind-blowing facts or surprising connections
      * Make users think "Wow, I never thought about that!"
    - Related topics must be:
      * Directly relevant to understanding the main topic
      * Mix of prerequisites and advanced concepts
      * Brief, clear explanation of importance
    - Topic types: prerequisite, extension, application, parallel, deeper
    - Question types: curiosity, mechanism, causality, innovation, insight`,
    };

    //  Add User Prompt as the latest user message
    const userMessage = {
      role: "user",
      content: `Explain "${query}" in three very concise paragraphs for a ${userContext.age} year old in genz style:
    1. Basic definition (15-20 words)
    2. Key details (15-20 words)
    3. Direct applications and facts (15-20 words)

    Then provide EXACTLY:
    - 5 related topics that help understand ${query} better (age-appropriate)
    - 5 mind-blowing questions (8-12 words each) that spark curiosity
    
    Follow the format and length limits strictly.`,
    };

    const updatedMessages = [systemMessage, ...messages, userMessage];
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: updatedMessages,
        temperature: 0.7,
        max_tokens: 1000,
        stream: true,
      }),
    });

    return new NextResponse(response.body, {
      status: response.status,
      headers: { "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Streaming API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
