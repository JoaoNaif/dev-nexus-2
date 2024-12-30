import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { GetAllUserUseCase } from './get-all-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetAllUserUseCase

describe('Get all user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetAllUserUseCase(inMemoryUserRepository)
  })

  it('should be able to fetch all a user', async () => {
    await inMemoryUserRepository.create(
      makeUser({
        username: 'johndoe',
      }),
    )

    await inMemoryUserRepository.create(
      makeUser({
        username: 'fulano',
      }),
    )

    await inMemoryUserRepository.create(
      makeUser({
        username: 'jake',
      }),
    )

    const result = await sut.execute({
      filter: '',
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value.users).toHaveLength(3)
    }
  })

  it('must be able to filter users', async () => {
    await inMemoryUserRepository.create(
      makeUser({
        username: 'johndoe',
      }),
    )

    await inMemoryUserRepository.create(
      makeUser({
        username: 'fulano',
      }),
    )

    await inMemoryUserRepository.create(
      makeUser({
        username: 'jake',
      }),
    )

    const result = await sut.execute({
      filter: 'john',
      page: 1,
    })

    if (result.isRight()) {
      expect(result.value.users).toHaveLength(1)
    }
  })

  it('should be able to fetch paginated users', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryUserRepository.create(
        makeUser({
          username: `user-${i}`,
        }),
      )
    }

    const result = await sut.execute({
      filter: 'user',
      page: 2,
    })

    expect(result.isRight())

    if (result.isRight()) {
      expect(result.value.users).toHaveLength(2)
      expect(result.value.users).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            username: 'user-21',
          }),
          expect.objectContaining({
            username: 'user-22',
          }),
        ]),
      )
    }
  })
})
