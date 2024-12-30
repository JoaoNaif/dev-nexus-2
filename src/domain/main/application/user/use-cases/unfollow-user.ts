import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { FollowerNotExistError } from '../../_errors/follower-not-exist-error'

interface UnfollowUserUseCaseRequest {
  followingId: string
  followedId: string
}

type UnfollowUserUseCaseResponse = Either<
  ResourceNotFoundError | FollowerNotExistError,
  null
>

export class UnfollowUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    followingId,
    followedId,
  }: UnfollowUserUseCaseRequest): Promise<UnfollowUserUseCaseResponse> {
    const userFollowing = await this.userRepository.findById(followingId)

    if (!userFollowing) {
      return left(new ResourceNotFoundError())
    }

    const userFollowed = await this.userRepository.findById(followedId)

    if (!userFollowed) {
      return left(new ResourceNotFoundError())
    }

    const unfollowed = userFollowed.followers.currentItems.find(
      (item) => item.user.id === userFollowing.id,
    )

    if (!unfollowed) {
      return left(new FollowerNotExistError())
    }

    userFollowed.followers.remove(unfollowed)

    const unfollowing = userFollowing.followings.currentItems.find(
      (item) => item.user.id === userFollowed.id,
    )

    if (!unfollowing) {
      return left(new FollowerNotExistError())
    }

    userFollowing.followings.remove(unfollowing)

    return right(null)
  }
}
