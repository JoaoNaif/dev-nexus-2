import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { UsernameAlreadyExistError } from '../../_errors/username-already-exist-error'

interface UpdateUserUseCaseRequest {
  userId: string
  username: string
}

type UpdateUserUseCaseResponse = Either<
  ResourceNotFoundError | UsernameAlreadyExistError,
  null
>

export class UpdateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    username,
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const userWithSameUsername =
      await this.userRepository.findByUsername(username)

    if (userWithSameUsername) {
      return left(new UsernameAlreadyExistError())
    }

    user.username = username

    await this.userRepository.save(user)

    return right(null)
  }
}
