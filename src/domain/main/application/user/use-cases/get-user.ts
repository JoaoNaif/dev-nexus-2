import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { UserAlreadyExistError } from '../../_errors/user-already-exist-error'
import { ResponseGetUser } from '../dtos/response/response-get-user'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'

interface GetUserUseCaseRequest {
  userId: string
}

type GetUserUseCaseResponse = Either<
  UserAlreadyExistError,
  {
    user: ResponseGetUser
  }
>

export class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
  }: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const response: ResponseGetUser = {
      id: user.id.toString(),
      email: user.email,
      username: user.username,
      attachment: user.attachment,
      followers: user.followers,
      followings: user.followings,
      createdAt: user.createdAt,
    }

    return right({
      user: response,
    })
  }
}
