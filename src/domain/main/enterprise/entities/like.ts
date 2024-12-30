import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { Entity } from '@/core/entities/entity'

export interface LikeProps {
  authorId: UniqueEntityId
  username: string
  createdAt: Date
}

export abstract class Like<Props extends LikeProps> extends Entity<Props> {
  get authorId() {
    return this.props.authorId
  }

  get username() {
    return this.props.username
  }

  get createdAt() {
    return this.props.createdAt
  }
}
