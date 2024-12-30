import { PaginationParams } from '@/core/repositories/pagination-params'
import { Post } from '@/domain/main/enterprise/entities/post/post'

export abstract class PostRepository {
  abstract findById(id: string): Promise<Post | null>
  abstract findManyMarkings(
    filter: string,
    params: PaginationParams,
  ): Promise<Post[]>

  abstract save(post: Post): Promise<void>
  abstract create(post: Post): Promise<void>
  abstract delete(post: Post): Promise<void>
}
