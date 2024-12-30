import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import {
  Following,
  FollowingProps,
} from '@/domain/main/enterprise/entities/user/following'
import { makeUser } from './make-user'

export function makeFollowing(
  override: Partial<FollowingProps> = {},
  id?: UniqueEntityId,
) {
  const following = Following.create(
    {
      user: makeUser(),
      ...override,
    },
    id,
  )

  return following
}
