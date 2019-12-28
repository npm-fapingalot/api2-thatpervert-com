import * as SELECTOR from './selectors';
import * as P_SELECTOR from '../post/selectors';
import { getText, toInt, regexExtract, isEmpty } from '../parse.utils';
import { IPrevPost } from '.';
import { HREF_REGEX } from '../post';
import { ITag, IContent } from '../schema.base';

// Parsers
export const getID = (el: Cheerio): number | null =>
  toInt(regexExtract(el.find(SELECTOR.POST_LINK).attr('href'), HREF_REGEX));

export const getTags = ($: CheerioStatic, el: Cheerio): ITag[] =>
  el.find(SELECTOR.POST_TAG).map((i, tagRaw) => {
    const tag = $(tagRaw);

    return {
      name: tag.attr('title'),
      href: tag.attr('href'),
    } as ITag;
  }).get();
export const getConetnt = ($: CheerioStatic, el: Cheerio): IContent[] =>
  el.find(SELECTOR.POST_CONTENT).map((i, elRaw) => {
    const el = $(elRaw);

    return {
      conetntURL: [
        el.find(P_SELECTOR.LINK_PHOTO).attr('href'),
        el.find(P_SELECTOR.GIF).attr('href'),

        ...el.find(P_SELECTOR.VIDEO).map((i2, el2) => $(el2).attr('src')).get(),
        el.find(P_SELECTOR.IMG).attr('src'),
      ].filter((v) => !isEmpty(v))
    } as IContent;
  }).get().filter((v) => v.conetntURL.length !== 0);

// Main parsers
export default ($: CheerioStatic): IPrevPost[] => {
  return $(SELECTOR.POST).map((ignore, elRaw) => {
    const el = $(elRaw);

    const id = getID(el);
    if (!id) { throw new Error('Invalid id: ' + id); }

    const content = getConetnt($, el);
    if (!content.length) { throw new Error('There is no content'); }

    return {
      id,
      tags: getTags($, el),
      content,
    } as IPrevPost;
  }).get();
};
