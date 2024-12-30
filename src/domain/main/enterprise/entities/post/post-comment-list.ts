import { WatchedList } from '@/core/entities/watched-list'
import { PostComment } from './post-comment'

export class PostCommentList extends WatchedList<PostComment> {
  compareItems(a: PostComment, b: PostComment): boolean {
    return a.authorId.equals(b.authorId)
  }
}
