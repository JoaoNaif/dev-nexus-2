import { Either, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResponseGetUser } from '../dtos/response/response-get-user'

interface GetAllUserUseCaseRequest {
  filter: string
  page: number
}

type GetAllUserUseCaseResponse = Either<
  null,
  {
    users: ResponseGetUser[]
  }
>

export class GetAllUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    filter,
    page,
  }: GetAllUserUseCaseRequest): Promise<GetAllUserUseCaseResponse> {
    const users = await this.userRepository.findManyUser(filter, { page })

    const response: ResponseGetUser[] = users.map((user) => {
      return {
        id: user.id.toString(),
        email: user.email,
        username: user.username,
        attachment: user.attachment,
        followers: user.followers,
        followings: user.followings,
        createdAt: user.createdAt,
      }
    })

    return right({
      users: response,
    })
  }
}
