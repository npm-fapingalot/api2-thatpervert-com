import * as SELECTOR from './selectors';
import { regexExtract, isEmpty, getRootText } from '../parse.utils';
import { IPost } from '.';
import { IContent, ITagged, ITag, IStdTaging } from '../schema.base';

// SELECTOR
export const getPages = ($: CheerioStatic): IContent[] =>
  $(SELECTOR.DATA_CONTAINER).map((i, elRaw) => {
    const el = $(elRaw);

    return {
      conetntURL: [
        el.find(SELECTOR.LINK_PHOTO).attr('href'),
        el.find(SELECTOR.GIF).attr('href'),

        ...el.find(SELECTOR.VIDEO).map((i2, el2) => $(el2).attr('src')).get(),
        el.find(SELECTOR.IMG).attr('src'),
      ].filter((v) => !isEmpty(v))
    } as IContent;
  }).get().filter((v) => v.conetntURL.length !== 0);

export const getTags = ($: CheerioStatic): ITagged => ({
  tags: $(SELECTOR.TAG)
    .map((i, elRaw) => {
      const el = $(elRaw);

      return {
        name: el.attr('title'),
        href: el.attr('href')
      } as ITag;
    }).get().filter((v) => !isEmpty(v.name) || !isEmpty(v.href)) as ITag[],
});

export default ($: CheerioStatic, id: number): IPost => {
  const content = getPages($);
  if (!content.length) { throw new Error('There is no content'); }

  return {
    id,

    tags: getTags($),
    content,
  };
};
