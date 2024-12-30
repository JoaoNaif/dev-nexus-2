import { Either, left, right } from '@/core/either'
import { User } from '@/domain/main/enterprise/entities/user/user'
import { UserRepository } from '../repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { UserAttachment } from '@/domain/main/enterprise/entities/user/user-attachment'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

interface AddAvatarUseCaseRequest {
  userId: string
  attachmentId: string
}

type AddAvatarUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    user: User
  }
>

export class AddAvatarUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    userId,
    attachmentId,
  }: AddAvatarUseCaseRequest): Promise<AddAvatarUseCaseResponse> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const userAttachment = UserAttachment.create({
      attachmentId: new UniqueEntityId(attachmentId),
      userId: user.id,
    })

    user.attachment = userAttachment

    await this.userRepository.save(user)

    return right({
      user,
    })
  }
}
