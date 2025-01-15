import { encoding_for_model, TiktokenModel } from "tiktoken";

export function countTokens(
  text: string,
  model: TiktokenModel = "gpt-3.5-turbo"
) {
  if (!text) return 0;

  try {
    if (!text) return 0;
    const encoder = encoding_for_model(model); // Load the encoding for the specific model
    const tokens = encoder.encode(text); // Convert text into tokens
    const tokenCount = tokens.length;
    encoder.free(); // Free memory to avoid leaks

    return tokenCount;
  } catch (error) {
    console.error("Tokenization error:", error);
    return 0;
  }
}
