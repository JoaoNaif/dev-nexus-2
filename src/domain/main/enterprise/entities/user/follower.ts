import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface FollowerProps {
  userId: UniqueEntityId
  createdAt: Date
}

export class Follower extends Entity<FollowerProps> {
  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<FollowerProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const follower = new Follower(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return follower
  }
}
