import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { makeUser } from 'test/factories/make-user'
import { CreatePostUseCase } from './create-post'
import { InMemoryPostRepository } from 'test/repositories/in-memory-post-repository'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { InMemoryPostAttachmentsRepository } from 'test/repositories/in-memory-post-attachments-repository'

let inMemoryUserRepository: InMemoryUserRepository
let inMemoryPostRepository: InMemoryPostRepository
let inMemoryPostAttachmentsRepository: InMemoryPostAttachmentsRepository
let sut: CreatePostUseCase

describe('Create Post', () => {
  beforeEach(() => {
    inMemoryPostAttachmentsRepository = new InMemoryPostAttachmentsRepository()
    inMemoryUserRepository = new InMemoryUserRepository()
    inMemoryPostRepository = new InMemoryPostRepository(
      inMemoryPostAttachmentsRepository,
    )
    sut = new CreatePostUseCase(inMemoryPostRepository, inMemoryUserRepository)
  })

  it('should be able to create a post', async () => {
    const user = makeUser()

    inMemoryUserRepository.create(user)

    const result = await sut.execute({
      authorId: user.id.toString(),
      content: 'Testing',
      markings: ['test', 'javascript'],
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    if (result.isRight()) {
      expect(inMemoryPostRepository.items[0]).toEqual(result.value.post)
      expect(
        inMemoryPostRepository.items[0].attachments.currentItems,
      ).toHaveLength(2)
      expect(inMemoryPostRepository.items[0].attachments.currentItems).toEqual([
        expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
        expect.objectContaining({ attachmentId: new UniqueEntityId('2') }),
      ])
    }
  })

  it('should persist attachment when creating a new post', async () => {
    const user = makeUser()

    inMemoryUserRepository.create(user)

    const result = await sut.execute({
      authorId: user.id.toString(),
      content: 'Testing',
      markings: ['test', 'javascript'],
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryPostAttachmentsRepository.items).toHaveLength(2)
    expect(inMemoryPostAttachmentsRepository.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
        expect.objectContaining({
          attachmentId: new UniqueEntityId('1'),
        }),
      ]),
    )
  })
})
