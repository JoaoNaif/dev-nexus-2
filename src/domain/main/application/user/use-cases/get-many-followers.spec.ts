import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { GetManyFollowersUseCase } from './get-many-followers'
import { Follower } from '@/domain/main/enterprise/entities/user/follower'
import { FollowerList } from '@/domain/main/enterprise/entities/user/follower-list'

let inMemoryUserRepository: InMemoryUserRepository
let sut: GetManyFollowersUseCase

describe('Get many followers', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    sut = new GetManyFollowersUseCase(inMemoryUserRepository)
  })

  it('should be able to search all your followers', async () => {
    const following = makeUser({
      username: 'johndoe',
    })

    await inMemoryUserRepository.create(following)

    const followerItem = Follower.create({
      user: following,
    })

    const followerList: Follower[] = [followerItem]

    const followed = makeUser({
      username: 'followed',
      followers: new FollowerList(followerList),
    })

    await inMemoryUserRepository.create(followed)

    const result = await sut.execute({
      userId: followed.id.toString(),
      page: 1,
      filter: '',
    })

    if (result.isRight()) {
      expect(result.value.followers).toHaveLength(1)
      expect(result.value.followers[0].username).toEqual('johndoe')
    }
  })

  it('should be able to fetch paginated followers', async () => {
    const follower = makeUser()

    inMemoryUserRepository.create(follower)

    for (let i = 1; i <= 22; i++) {
      const followerItem = Follower.create({
        user: makeUser({
          username: `user-${i}`,
        }),
      })

      follower.followers.add(followerItem)
    }

    const result = await sut.execute({
      userId: follower.id.toString(),
      filter: 'user',
      page: 2,
    })

    expect(result.isRight()).toBe(true)

    if (result.isRight()) {
      expect(result.value.followers).toHaveLength(2)
      expect(result.value.followers).toEqual(
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
