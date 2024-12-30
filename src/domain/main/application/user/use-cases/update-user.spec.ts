import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { UpdateUserUseCase } from './update-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: UpdateUserUseCase

describe('Update user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new UpdateUserUseCase(inMemoryUserRepository)
  })

  it('should be able to update a user', async () => {
    const user = makeUser({
      username: 'johndoe',
    })

    await inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
      username: 'fulano',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].username).toEqual('fulano')
  })
})
