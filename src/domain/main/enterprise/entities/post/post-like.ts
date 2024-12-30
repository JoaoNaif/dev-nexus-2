import { Optional } from '@/core/types/optional'
import { Like, LikeProps } from '../like'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PostLikeProps extends LikeProps {
  postId: string
}

export class PostLike extends Like<PostLikeProps> {
  get postId() {
    return this.props.postId
  }

  static create(
    props: Optional<PostLikeProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const postLike = new PostLike(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return postLike
  }
}
