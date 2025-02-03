export function normalizeAIResponse(rawResponse: string) {
  try {
    // Step 1: Remove markdown formatting if present
    let cleaned = rawResponse
      .replace(/```json/g, "") // Remove JSON code block markers
      .replace(/```/g, "")
      .replace(/'/g, '"'); // Convert single to double quotes
    // Step 2: Fix common JSON formatting issues
    cleaned = cleaned
      .replace(/(\d+)%/g, '"$1%"') // Ensure percentage values are properly quoted
      .replace(/,\s*([}\]])/g, "$1") // Remove trailing commas before closing brackets
      .replace(/"\s*:\s*/g, '":') // Fix improperly formatted key-value pairs
      .trim(); // Remove unnecessary spaces

    // Step 3: Extract valid JSON content
    const jsonMatch = cleaned.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response.");
    }

    const jsonString = jsonMatch[0];

    // Step 4: Parse safely
    return JSON.parse(jsonString);
  } catch (error) {
    // console.error("JSON Parse Error:", error);
    return {
      reportStatus: "error",
      reportMessage: "Failed to parse AI response",
      reports: null,
      error: error
    };
  }
}
