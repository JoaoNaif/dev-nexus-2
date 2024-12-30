import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { Following } from '@/domain/main/enterprise/entities/user/following'
import { Follower } from '@/domain/main/enterprise/entities/user/follower'

interface FollowUserUseCaseRequest {
  followingId: string
  followedId: string
}

type FollowUserUseCaseResponse = Either<ResourceNotFoundError, null>

export class FollowUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    followingId,
    followedId,
  }: FollowUserUseCaseRequest): Promise<FollowUserUseCaseResponse> {
    const userFollowing = await this.userRepository.findById(followingId)

    if (!userFollowing) {
      return left(new ResourceNotFoundError())
    }

    const userFollowed = await this.userRepository.findById(followedId)

    if (!userFollowed) {
      return left(new ResourceNotFoundError())
    }

    // quem está seguindo

    const following = Following.create({
      userId: userFollowed.id,
    })

    userFollowing.followings.add(following)

    await this.userRepository.save(userFollowing)

    // Quem está sendo seguido

    const followed = Follower.create({
      userId: userFollowing.id,
    })

    userFollowed.followers.add(followed)

    await this.userRepository.save(userFollowed)

    return right(null)
  }
}
