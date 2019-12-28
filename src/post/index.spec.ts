import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#hrefToID', () => {
  test('Working', async () => {
    expect(api.hrefToID('http://thatpervert.org/post/4057795')).toBe(null);

    expect(api.hrefToID('http://thatpervert.com/post/4057795')).toBe(4057795);
    expect(api.hrefToID('/post/4057795/')).toBe(4057795);
  }, 20000000);
});

describe('#isValidHref', () => {
  test('Working', async () => {
    expect(api.isValidHref('http://thatpervert.org/post/4057795')).toBe(false);

    expect(api.isValidHref('http://thatpervert.com/post/4057795')).toBe(true);
    expect(api.isValidHref('/post/4057795/')).toBe(true);
  }, 20000000);
});
