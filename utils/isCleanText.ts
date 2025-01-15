import { Filter } from "bad-words";

const filter = new Filter();

export function isCleanText(text: string): boolean {
  return !filter.isProfane(text); // Returns false if text contains bad words
}

export function removeEmojis(text: string) {
  return text.replace(/[\p{Emoji}\u200d]+/gu, "");
}