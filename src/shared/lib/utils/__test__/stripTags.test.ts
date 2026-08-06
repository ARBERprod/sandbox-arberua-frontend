import { stripTags } from '@/shared/lib/utils/stripTags';

describe('stripTags', () => {
  it('Should drop the markup and keep the text', () => {
    expect(stripTags('<p>Колаборація ARBER</p>')).toBe('Колаборація ARBER');
  });

  it('Should drop tags with attributes', () => {
    expect(stripTags('<a href="/collaboration/1" class="link">Partner</a>')).toBe('Partner');
  });

  it('Should keep a word boundary between blocks', () => {
    expect(stripTags('<p>Перший</p><p>Другий</p>')).toBe('Перший Другий');
    expect(stripTags('Перший<br/>Другий')).toBe('Перший Другий');
  });

  it('Should not insert a space where the markup was inline', () => {
    expect(stripTags('<b>ARBER</b>×Partner')).toBe('ARBER×Partner');
  });

  it('Should drop the content of script and style, not only their tags', () => {
    expect(stripTags('<style>.a{color:red}</style><p>Текст</p><script>alert(1)</script>')).toBe('Текст');
  });

  it('Should collapse whitespace and trim', () => {
    expect(stripTags('  <p>Текст\n  з    переносами</p>  ')).toBe('Текст з переносами');
  });

  it('Should return an empty string for empty input', () => {
    expect(stripTags('')).toBe('');
    expect(stripTags('<p></p>')).toBe('');
  });

  it('Should leave plain text as it is', () => {
    expect(stripTags('ARBER × Partner')).toBe('ARBER × Partner');
  });

  describe('entities', () => {
    it('Should decode the named entities a WYSIWYG produces', () => {
      expect(stripTags('<p>ARBER &amp; Partner</p>')).toBe('ARBER & Partner');
      expect(stripTags('<p>&quot;Колаборація&quot;</p>')).toBe('"Колаборація"');
      expect(stripTags('<p>&laquo;Партнер&raquo; &mdash; 2026</p>')).toBe('«Партнер» — 2026');
    });

    // &nbsp; is what a WYSIWYG leaves between words; a meta description wants an ordinary space.
    it('Should turn a non-breaking space into a plain one', () => {
      expect(stripTags('<p>ARBER&nbsp;&times;&nbsp;Partner</p>')).toBe('ARBER × Partner');
    });

    it('Should decode numeric entities in both notations', () => {
      expect(stripTags('<p>it&#39;s</p>')).toBe("it's");
      expect(stripTags('<p>it&#x27;s</p>')).toBe("it's");
    });

    // Decoding runs after the tags are gone, so an escaped tag stays text instead of turning into
    // markup that the next pass would eat.
    it('Should keep an escaped tag as text', () => {
      expect(stripTags('<p>&lt;b&gt;bold&lt;/b&gt;</p>')).toBe('<b>bold</b>');
    });

    it('Should not decode twice', () => {
      expect(stripTags('&amp;nbsp;')).toBe('&nbsp;');
    });

    it('Should leave an unknown or malformed entity alone', () => {
      expect(stripTags('<p>&unknown; &amp</p>')).toBe('&unknown; &amp');
    });
  });
});
