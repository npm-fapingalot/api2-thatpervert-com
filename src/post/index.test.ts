import NHentaiAPI from '..';

const api = (new NHentaiAPI()).post;

describe('#id', () => {
  test('Compatibility', async () => {
    const post = await api.id(4172390);

    expect(post).toBeDefined();
    expect(post).toHaveProperty('id', 4172390);
  }, 20000000);
});
