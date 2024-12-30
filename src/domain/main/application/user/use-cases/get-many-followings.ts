import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { ResponseGetFollowing } from '../dtos/response/response-get-following'

interface GetManyFollowingsUseCaseRequest {
  userId: string
  filter: string
  page: number
}

type GetManyFollowingsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    followings: ResponseGetFollowing[]
  }
>

export class GetManyFollowingsUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    page,
    filter,
    userId,
  }: GetManyFollowingsUseCaseRequest): Promise<GetManyFollowingsUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const followings = user.followings.currentItems

    const paginationFollowing = followings
      .filter((item) => item.user.username.includes(filter))
      .slice((page - 1) * 20, page * 20)

    const response: ResponseGetFollowing[] = paginationFollowing.map((raw) => {
      return {
        id: raw.id.toString(),
        userId: raw.user.id.toString(),
        username: raw.user.username,
        attachment: raw.user.attachment,
      }
    })

    return right({
      followings: response,
    })
  }
}
