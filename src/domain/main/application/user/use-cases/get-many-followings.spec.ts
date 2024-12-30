import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { GetManyFollowingsUseCase } from './get-many-followings'
import { Following } from '@/domain/main/enterprise/entities/user/following'
import { FollowingList } from '@/domain/main/enterprise/entities/user/following-list'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetManyFollowingsUseCase

describe('Get many followings', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetManyFollowingsUseCase(inMemoryUserRepository)
  })

  it('should be able to search all users you are following', async () => {
    const followed = makeUser({
      username: 'followed',
    })

    await inMemoryUserRepository.create(followed)

    const followingItem = Following.create({
      user: followed,
    })

    const followingList: Following[] = [followingItem]

    const following = makeUser({
      username: 'johndoe',
      followings: new FollowingList(followingList),
    })

    await inMemoryUserRepository.create(following)

    const result = await sut.execute({
      userId: following.id.toString(),
      page: 1,
      filter: '',
    })

    if (result.isRight()) {
      expect(result.value.followings).toHaveLength(1)
      expect(result.value.followings[0].username).toEqual('followed')
    }
  })

  it('should be able to fetch paginated followings', async () => {
    const following = makeUser()

    inMemoryUserRepository.create(following)

    for (let i = 1; i <= 22; i++) {
      const followingItem = Following.create({
        user: makeUser({
          username: `user-${i}`,
        }),
      })

      following.followings.add(followingItem)
    }

    const result = await sut.execute({
      userId: following.id.toString(),
      filter: 'user',
      page: 2,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.followings).toHaveLength(2)
      expect(result.value.followings).toEqual(
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
