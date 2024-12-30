import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Comment, CommentProps } from '../comment'
import { Optional } from '@/core/types/optional'

export interface PostCommentProps extends CommentProps {
  postId: UniqueEntityId
}

export class PostComment extends Comment<PostCommentProps> {
  get postId() {
    return this.props.postId
  }

  static create(
    props: Optional<PostCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const postComment = new PostComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return postComment
  }
}
