import { WatchedList } from '@/core/entities/watched-list'
import { PostLike } from './post-like'

export class PostLikeList extends WatchedList<PostLike> {
  compareItems(a: PostLike, b: PostLike): boolean {
    return a.authorId.equals(b.authorId)
  }
}
