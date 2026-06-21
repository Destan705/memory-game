export function emojiUrl(emoji) {
  const codePoints = [...emoji]
    .map((char) => char.codePointAt(0).toString(16))
    .filter((cp) => cp !== "fe0f")
    .join("-");
  return `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/${codePoints}.png`;
}
