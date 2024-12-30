import { PaginationParams } from '@/core/repositories/pagination-params'
import { PostRepository } from '@/domain/main/application/post/repositories/post-repository'
import { Post } from '@/domain/main/enterprise/entities/post/post'
import { InMemoryPostAttachmentsRepository } from './in-memory-post-attachments-repository'

export class InMemoryPostRepository implements PostRepository {
  public items: Post[] = []

  constructor(
    private postAttachmentsRepository: InMemoryPostAttachmentsRepository,
  ) {}

  async findById(id: string) {
    const post = this.items.find((item) => item.id.toString() === id)

    if (!post) {
      return null
    }

    return post
  }

  async findManyMarkings(filter: string, { page }: PaginationParams) {
    const posts = this.items
      .filter((item) => item.markings.includes(filter))
      .slice((page - 1) * 20, page * 20)

    return posts
  }

  async create(post: Post) {
    this.items.push(post)

    await this.postAttachmentsRepository.createMany(post.attachments.getItems())
  }

  async save(post: Post) {
    const itemIndex = this.items.findIndex((item) => item.id === post.id)

    this.items[itemIndex] = post

    await this.postAttachmentsRepository.createMany(
      post.attachments.getNewItems(),
    )

    await this.postAttachmentsRepository.deleteMany(
      post.attachments.getRemovedItems(),
    )
  }

  async delete(post: Post) {
    const itemIndex = this.items.findIndex((item) => item.id === post.id)

    this.items.splice(itemIndex, 1)

    this.postAttachmentsRepository.deleteManyByPostId(post.id.toString())
  }
}
