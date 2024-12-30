import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { GetUserUseCase } from './get-user'
import { makeUser } from 'test/factories/make-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetUserUseCase

describe('Get user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetUserUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch a user', async () => {
    const user = makeUser()

    inMemoryUserRepository.create(user)

    const result = await sut.execute({
      userId: user.id.toString(),
    })

    expect(result.value).toMatchObject({
      user: {
        id: expect.any(String),
        username: expect.any(String),
        email: expect.any(String),
        createdAt: expect.any(Date),
      },
    })
  })
})
