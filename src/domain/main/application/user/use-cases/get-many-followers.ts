import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { ResponseGetFollower } from '../dtos/response/response-get-follower'

interface GetManyFollowersUseCaseRequest {
  userId: string
  filter: string
  page: number
}

type GetManyFollowersUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    followers: ResponseGetFollower[]
  }
>

export class GetManyFollowersUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    page,
    filter,
    userId,
  }: GetManyFollowersUseCaseRequest): Promise<GetManyFollowersUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const followers = user.followers.currentItems

    const paginationFollowing = followers
      .filter((item) => item.user.username.includes(filter))
      .slice((page - 1) * 20, page * 20)

    const response: ResponseGetFollower[] = paginationFollowing.map((raw) => {
      return {
        id: raw.id.toString(),
        userId: raw.user.id.toString(),
        username: raw.user.username,
        attachment: raw.user.attachment,
      }
    })

    return right({
      followers: response,
    })
  }
}
