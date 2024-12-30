import { Either, left, right } from '@/core/either'
import { User } from '@/domain/main/enterprise/entities/user/user'
import { UserRepository } from '../repositories/user-repository'
import { HashGenerator } from '../../_cryptography/hash-generator'
import { UserAlreadyExistError } from '../../_errors/user-already-exist-error'

interface RegisterUserUseCaseRequest {
  username: string
  email: string
  password: string
}

type RegisterUserUseCaseResponse = Either<
  UserAlreadyExistError,
  {
    user: User
  }
>

export class RegisterUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    username,
    email,
    password,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmailOrUsername =
      await this.userRepository.findByEmailOrUsername(email, username)

    if (userWithSameEmailOrUsername) {
      return left(new UserAlreadyExistError(username))
    }

    const hashPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      username,
      email,
      password: hashPassword,
    })

    await this.userRepository.create(user)

    return right({
      user,
    })
  }
}
