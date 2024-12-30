import { Either, left, right } from '@/core/either'
import { UserRepository } from '../repositories/user-repository'
import { HashCompare } from '../../_cryptography/hash-compare'
import { Encrypter } from '../../_cryptography/encrypter'
import { WrongCredentialsError } from '../../_errors/wrong-credentials-error'

interface AuthenticateUserUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  {
    accessToken: string
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private hashCompare: HashCompare,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = await this.hashCompare.compare(
      password,
      user.password,
    )

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id.toString(),
    })

    return right({
      accessToken,
    })
  }
}
