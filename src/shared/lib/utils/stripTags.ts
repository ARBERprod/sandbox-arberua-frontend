// `<script>`/`<style>` bodies are code, not text: dropping only their tags would leak the code
// into the meta description.
const SCRIPT_OR_STYLE = /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi;
// Block ends and line breaks are the only markup that carries a word boundary; every other tag
// disappears without a trace, otherwise inline markup splits a word in two.
const BLOCK_BOUNDARY = /<\/(p|div|li|ul|ol|h[1-6]|tr|table|blockquote)>|<br\s*\/?>/gi;
const TAG = /<[^>]*>/g;
const ENTITY = /&(#\d+|#x[\da-f]+|[a-z][\da-z]*);/gi;
const WHITESPACE = /\s+/g;

// Only what a WYSIWYG actually emits. An entity outside this list keeps its source form rather
// than being guessed at — a literal `&laquo;` in the description is a smaller sin than a wrong glyph.
const NAMED_ENTITIES: Record<string, string> = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  laquo: '«',
  raquo: '»',
  mdash: '—',
  ndash: '–',
  hellip: '…',
  times: '×',
  deg: '°',
};

const MAX_CODE_POINT = 0x10ffff;

const decodeEntity = (entity: string, body: string): string => {
  if (!body.startsWith('#')) return NAMED_ENTITIES[body.toLowerCase()] ?? entity;

  const code = body[1].toLowerCase() === 'x'
    ? parseInt(body.slice(2), 16)
    : Number(body.slice(1));

  return code > 0 && code <= MAX_CODE_POINT ? String.fromCodePoint(code) : entity;
};

/** HTML from the admin panel → plain single-line text for meta tags. Not a sanitizer. */
export const stripTags = (html: string): string => html
  .replace(SCRIPT_OR_STYLE, ' ')
  .replace(BLOCK_BOUNDARY, ' ')
  .replace(TAG, '')
  // After the tags are gone, so that an escaped `&lt;b&gt;` stays text instead of becoming markup
  // — and before the whitespace pass, which is what turns a decoded `&nbsp;` into a plain space.
  .replace(ENTITY, decodeEntity)
  .replace(WHITESPACE, ' ')
  .trim();
