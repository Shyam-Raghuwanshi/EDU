import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";
import requestIp from "request-ip";
const rateLimitMap = new Map<
  string,
  { minute: number[]; hour: number[]; day: number[] }
>();

const RATE_LIMITS = {
  minute: 15, // 15 requests per minute
  hour: 250, // 250 requests per hour
  day: 500, // 500 requests per day
};
function getClientIp(req: NextRequest): string {
    const forwardedFor = req.headers.get("x-forwarded-for");
  
    if (forwardedFor) {
        console.log(forwardedFor)
      return forwardedFor.split(",")[0].trim(); // First IP in the list
    }
  
    return "unknown"; // Fallback if no IP is found
  }

export async function rateLimit(req: NextRequest) {
  const ip = await getClientIp(req)
  const now = Date.now();

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { minute: [], hour: [], day: [] });
  }

  const requestTimestamps = rateLimitMap.get(ip)!;

  // Remove old timestamps
  requestTimestamps.minute = requestTimestamps.minute.filter(
    (t) => now - t < 60 * 1000
  );
  requestTimestamps.hour = requestTimestamps.hour.filter(
    (t) => now - t < 60 * 60 * 1000
  );
  requestTimestamps.day = requestTimestamps.day.filter(
    (t) => now - t < 24 * 60 * 60 * 1000
  );

  // Check if user exceeded limits
  if (requestTimestamps.minute.length >= RATE_LIMITS.minute) {
    return NextResponse.json(
      { error: "Too many requests (15/min limit)" },
      { status: 429 }
    );
  }
  if (requestTimestamps.hour.length >= RATE_LIMITS.hour) {
    return NextResponse.json(
      { error: "Too many requests (250/hour limit)" },
      { status: 429 }
    );
  }
  if (requestTimestamps.day.length >= RATE_LIMITS.day) {
    return NextResponse.json(
      { error: "Too many requests (500/day limit)" },
      { status: 429 }
    );
  }

  // Add current timestamp to request history
  requestTimestamps.minute.push(now);
  requestTimestamps.hour.push(now);
  requestTimestamps.day.push(now);

  return null; // No rate limit exceeded
}
