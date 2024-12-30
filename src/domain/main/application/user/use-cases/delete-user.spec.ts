import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { DeleteUserUseCase } from './delete-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: DeleteUserUseCase

describe('Delete user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new DeleteUserUseCase(inMemoryUserRepository)
  })

  it('should be able to delete a user', async () => {
    const user = makeUser({
      username: 'johndoe',
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items).toHaveLength(0)
  })
})
