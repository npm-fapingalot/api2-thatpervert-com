import { getID } from './parser';

describe('#getID', () => {
  test('Working', () => {
    const $ = { find: ((selector: string) => ({ attr: (attr: string) => '/post/4057795/' })) } as Cheerio;
    expect(getID($)).toBe(4057795);
  });
});
