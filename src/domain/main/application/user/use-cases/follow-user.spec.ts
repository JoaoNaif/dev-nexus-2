import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { FollowUserUseCase } from './follow-user'

let inMemoryUserRepository: InMemoryUserRepository
let sut: FollowUserUseCase

describe('Follow user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new FollowUserUseCase(inMemoryUserRepository)
  })

  it('should be able to follow a user', async () => {
    const following = makeUser()

    inMemoryUserRepository.create(following)

    const followed = makeUser()

    inMemoryUserRepository.create(followed)

    const result = await sut.execute({
      followingId: following.id.toString(),
      followedId: followed.id.toString(),
    })

    if (result.isRight()) {
      expect(
        inMemoryUserRepository.items[0].followings.currentItems,
      ).toHaveLength(1)

      expect(
        inMemoryUserRepository.items[0].followers.currentItems,
      ).toHaveLength(0)

      expect(
        inMemoryUserRepository.items[1].followers.currentItems,
      ).toHaveLength(1)

      expect(
        inMemoryUserRepository.items[1].followings.currentItems,
      ).toHaveLength(0)
    }
  })
})
