import { convertToModelMessages, streamText, tool, type UIMessage } from "ai"
import { z } from "zod"
// 1. Install this package: npm install @ai-sdk/google
import { google } from "@ai-sdk/google"

export const maxDuration = 30

// Tools to control the UI/map; model can call these to request client actions
const tools = {
  scrollToSection: tool({
    description: "Scroll to a section by its element id (e.g., 'map', 'numbers', 'hero', 'sar').",
    inputSchema: z.object({ sectionId: z.string() }),
    outputSchema: z.string(),
  }),
  focusMapOn: tool({
    description: "Focus the map on a lat/lng and optional zoom level.",
    inputSchema: z.object({ lat: z.number(), lng: z.number(), zoom: z.number().optional() }),
    outputSchema: z.string(),
  }),
  toggleLayer: tool({
    description: "Toggle a map layer on or off.",
    inputSchema: z.object({
      layer: z.enum(["risk", "population", "slope", "rainfall"]),
      visible: z.boolean(),
    }),
    outputSchema: z.string(),
  }),
  setHeatmap: tool({
    description: "Change active heatmap aspect.",
    inputSchema: z.object({ aspect: z.enum(["population", "slope", "rainfall", "risk"]) }),
    outputSchema: z.string(),
  }),
  provideRecommendation: tool({
    description:
      "Provide safety recommendations and guidance for landslide risk mitigation. Use this when users ask for advice, safety tips, evacuation guidance, or what to do in specific risk scenarios.",
    inputSchema: z.object({
      category: z
        .enum(["evacuation", "preparation", "monitoring", "emergency", "general"])
        .describe("Type of recommendation being provided"),
      location: z.string().optional().describe("Specific location if the recommendation is location-based"),
    }),
    outputSchema: z.string(),
  }),
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const sysText =
    "You are the SAR Assistant for Haldwani landslide risk monitoring. Explain clearly and accessibly. " +
    "When users ask about the map, specific locations, risk zones, rainfall patterns, or want to visualize data, " +
    "Ask them to scroll to the map section and check the relevant layer. " +
    "Haldwani coordinates: Center at 29.3°N, 79.525°E. High-risk areas include Ranibagh (29.23°N, 79.51°E), " +
    "Amritpur Paniyali (29.28°N, 79.55°E), and Nainital-Bhimtal corridor (29.33°N, 79.61°E). " +
    "Prefer concise, actionable answers with context from SAR and rainfall patterns. " +
    "If data is not available, use your knowledge but mention it's general guidance. " +
    "When asked who developed you, say TEAM KAIZEN. " +
    "Be proactive: if someone asks about risks in an area."

  const result = streamText({
    // FIX: Use the 'google' provider function with a stable model ID.
    model: google("gemini-2.0-flash"),

    messages: [
      // FIX: System prompt content must be a string.
      { role: "system", content: sysText },
      ...convertToModelMessages(messages),
    ],
    tools,
    maxSteps: 5,
    abortSignal: req.signal,
  })

  return result.toUIMessageStreamResponse()
}