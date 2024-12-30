import { Entity } from '@/core/entities/entity'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface FollowingProps {
  userId: UniqueEntityId
  createdAt: Date
}

export class Following extends Entity<FollowingProps> {
  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<FollowingProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const following = new Following(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return following
  }
}
