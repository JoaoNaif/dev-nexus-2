import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { UnfollowUserUseCase } from './unfollow-user'
import { Follower } from '@/domain/main/enterprise/entities/user/follower'
import { Following } from '@/domain/main/enterprise/entities/user/following'

let inMemoryUserRepository: InMemoryUserRepository
let sut: UnfollowUserUseCase

describe('Follow user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new UnfollowUserUseCase(inMemoryUserRepository)
  })

  it('should be able to follow a user', async () => {
    const following = makeUser()

    await inMemoryUserRepository.create(following)

    const followed = makeUser()

    await inMemoryUserRepository.create(followed)

    // adding user to followers list

    const followerItem = Follower.create({
      user: following,
    })

    followed.followers.add(followerItem)

    // adding user to followings list

    const followingItem = Following.create({
      user: followed,
    })

    following.followings.add(followingItem)

    const result = await sut.execute({
      followingId: following.id.toString(),
      followedId: followed.id.toString(),
    })

    if (result.isRight()) {
      expect(following.followings.currentItems).toHaveLength(0)
      expect(followed.followers.currentItems).toHaveLength(0)
    }
  })
})
