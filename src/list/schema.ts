import { ID } from '../post';
import { IContent, ITag } from '../schema.base';

/**
 * The object used to describe post list elements. Ie the home screen, ...
 */
export interface IPrevPost {
  /**
   * The id of the post
   */
  id: ID;

  /**
   * The tags
   */
  tags: ITag[];

  /**
   * The image conetnt
   */
  content: IContent[] | IContent;
}
