import openai from "@/lib/openai";
import { AnalysisResponse } from "@/types/AnalysisReport";
// Modified lib function
export async function analyseFeedback(
  prompt: string,
  cleanedReviews: string
): Promise<AnalysisResponse | null> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: cleanedReviews }
      ],
      temperature: 0.7,
      max_tokens: 1300,
      frequency_penalty: 0.5
    });

    if (!response.choices[0]?.message?.content) {
      throw new Error("Invalid OpenAI response structure");
    }

    const analysisContent = response.choices[0].message.content.trim();
        let parsed;
    try {
      parsed = JSON.parse(analysisContent);
    } catch (error) {
      console.error("Failed to parse response content:", analysisContent,error);
      return null; // Return null if parsing fails
    }

    return parsed; 
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return null;
  }
}
