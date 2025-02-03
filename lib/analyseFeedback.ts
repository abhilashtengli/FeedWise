import openai from "@/lib/openai";
// Modified lib function
export async function analyseFeedback(prompt: string, cleanedReviews: string) {
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

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error("OpenAI API Error:", error);
    return null;
  }
}

