// `<script>`/`<style>` bodies are code, not text: dropping only their tags would leak the code
// into the meta description.
const SCRIPT_OR_STYLE = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
// Block ends and line breaks are the only markup that carries a word boundary; every other tag
// disappears without a trace, otherwise inline markup splits a word in two.
const BLOCK_BOUNDARY = /<\/(p|div|li|ul|ol|h[1-6]|tr|table|blockquote)>|<br\s*\/?>/gi;
const TAG = /<[^>]*>/g;
const WHITESPACE = /\s+/g;

/** HTML from the admin panel → plain single-line text for meta tags. Not a sanitizer. */
export const stripTags = (html: string): string => html
  .replace(SCRIPT_OR_STYLE, ' ')
  .replace(BLOCK_BOUNDARY, ' ')
  .replace(TAG, '')
  .replace(WHITESPACE, ' ')
  .trim();
