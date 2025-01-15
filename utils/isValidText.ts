import { franc } from "franc-min";

export  function isValidText(text: string): boolean {
  text = text.trim();
  if (!text || text.length < 50) return false;
  // Use `franc` to detect the language
  const detectedLang = franc(text, { minLength: 3 }); // Detect language
  // Only return true if the language is English ('en')
  return detectedLang === "eng"; //
}
