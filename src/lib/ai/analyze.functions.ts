import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ResumeSchema = z.object({
  personal: z.object({
    fullName: z.string(),
    jobTitle: z.string(),
    email: z.string(),
    phone: z.string(),
    address: z.string(),
    linkedin: z.string(),
    github: z.string(),
    website: z.string(),
    summary: z.string(),
  }),
  education: z.array(z.any()),
  experience: z.array(z.any()),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
    languages: z.array(z.string()),
    tools: z.array(z.string()),
  }),
  projects: z.array(z.any()),
});

export const analyzeResume = createServerFn({ method: "POST" })
  .inputValidator((data: { resume: unknown }) => ({
    resume: ResumeSchema.parse(data.resume),
  }))
  .handler(async ({ data }) => {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
    if (!apiKey) {
      return {
        error: "AI is not configured. Add GROQ_API_KEY to enable analysis.",
        result: null,
      };
    }

    const systemPrompt = `You are an elite resume optimization expert with deep ATS knowledge and current job market trends (2026).
Your job: analyze the candidate's resume JSON and return an improved version plus an ATS scorecard.

Rules:
- Rewrite the professional summary into a punchy, achievement-led 2-3 sentence statement.
- Rewrite each experience description into 2-4 strong, metric-driven bullet points separated by '\\n'. Use powerful action verbs and quantify impact where reasonable.
- Suggest 5-10 ATS-friendly keywords this resume is missing for its target role.
- Suggest up to 6 high-value skills to add to technical skills.
- Keep arrays the SAME length and order as input (improve in place).
- Do not invent fake employers, dates, or credentials.
- Return ONLY the tool call.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Resume JSON:\n${JSON.stringify(data.resume, null, 2)}` },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "return_improved_resume",
              description: "Return the improved resume and ATS analysis.",
              parameters: {
                type: "object",
                properties: {
                  improvedSummary: { type: "string" },
                  improvedExperience: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        position: { type: "string" },
                        description: { type: "string" },
                      },
                      required: ["position", "description"],
                      additionalProperties: false,
                    },
                  },
                  missingKeywords: { type: "array", items: { type: "string" } },
                  suggestedSkills: { type: "array", items: { type: "string" } },
                  atsScore: { type: "number" },
                  suggestions: { type: "array", items: { type: "string" } },
                },
                required: [
                  "improvedSummary",
                  "improvedExperience",
                  "missingKeywords",
                  "suggestedSkills",
                  "atsScore",
                  "suggestions",
                ],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "return_improved_resume" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429)
        return { error: "Rate limit reached. Try again in a moment.", result: null };
      if (response.status === 402)
        return {
          error: "AI credits exhausted. Add funds in Workspace Settings → Usage.",
          result: null,
        };
      return { error: `AI gateway error (${response.status})`, result: null };
    }

    const payload = await response.json();
    const call = payload?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!call) return { error: "No AI response received.", result: null };

    try {
      const parsed = JSON.parse(call);
      return { error: null, result: parsed };
    } catch {
      return { error: "Failed to parse AI response.", result: null };
    }
  });

export type AnalyzeResult = {
  improvedSummary: string;
  improvedExperience: { position: string; description: string }[];
  missingKeywords: string[];
  suggestedSkills: string[];
  atsScore: number;
  suggestions: string[];
};
