export function stripMarkdown(text: string): string {
  return text
    .replace(/^#{1,6}\s+/gm, "")        // headings
    .replace(/\*\*(.+?)\*\*/g, "$1")     // bold
    .replace(/\*(.+?)\*/g, "$1")         // italic
    .replace(/__(.+?)__/g, "$1")         // bold alt
    .replace(/_(.+?)_/g, "$1")           // italic alt
    .replace(/~~(.+?)~~/g, "$1")         // strikethrough
    .replace(/`{3}[\s\S]*?`{3}/g, "")    // code blocks
    .replace(/`(.+?)`/g, "$1")           // inline code
    .replace(/!\[.*?\]\(.*?\)/g, "")     // images
    .replace(/\[(.+?)\]\(.*?\)/g, "$1")  // links (keep text)
    .replace(/^>\s+/gm, "")             // blockquotes
    .replace(/^[-*+]\s+/gm, "")         // unordered lists
    .replace(/^\d+\.\s+/gm, "")         // ordered lists
    .replace(/^---+$/gm, "")            // horizontal rules
    .replace(/\n{2,}/g, " ")            // collapse multiple newlines
    .replace(/\n/g, " ")                // remaining newlines to spaces
    .trim();
}
