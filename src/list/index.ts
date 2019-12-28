import API from '..';
import parse from './parser';

export default class ListAPI {
  constructor(private api: API) { }

  async home(page = 0) { return parse(await this.api.cheerio(`/${page + 1}`)); }
  async tag(tags: string, page = 0) { return parse(await this.api.cheerio(`/tag/${tags}/${page + 1}`)); }
}

export * from './schema';
