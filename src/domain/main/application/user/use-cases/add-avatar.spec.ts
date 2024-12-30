import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { AddAvatarUseCase } from './add-avatar'
import { makeUser } from 'test/factories/make-user'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryUserRepository: InMemoryUserRepository
let sut: AddAvatarUseCase

describe('Add avatar', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new AddAvatarUseCase(inMemoryUserRepository)
  })

  it('should be able to add a avatar', async () => {
    const user = makeUser()

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      attachmentId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].attachment?.attachmentId).toEqual(
      new UniqueEntityId('1'),
    )
  })
})
