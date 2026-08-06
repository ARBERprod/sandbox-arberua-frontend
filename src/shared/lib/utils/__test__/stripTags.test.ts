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
});
