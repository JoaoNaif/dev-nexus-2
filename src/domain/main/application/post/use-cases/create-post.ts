import { Either, left, right } from '@/core/either'
import { PostRepository } from '../repositories/post-repository'
import { Post } from '@/domain/main/enterprise/entities/post/post'
import { UserRepository } from '../../user/repositories/user-repository'
import { ResourceNotFoundError } from '@/core/errors/err/resource-not-found-error'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PostAttachment } from '@/domain/main/enterprise/entities/post/post-attachment'
import { PostAttachmentList } from '@/domain/main/enterprise/entities/post/post-attachment-list'

interface CreatePostUseCaseRequest {
  authorId: string
  content: string
  markings: string[]
  attachmentsIds: string[]
}

type CreatePostUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    post: Post
  }
>

export class CreatePostUseCase {
  constructor(
    private postRepository: PostRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    attachmentsIds,
    authorId,
    content,
    markings,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    const user = await this.userRepository.findById(authorId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const post = Post.create({
      authorId: user.id,
      content,
      markings,
    })

    const postAttachments = attachmentsIds.map((attachmentId) => {
      return PostAttachment.create({
        attachmentId: new UniqueEntityId(attachmentId),
        postId: post.id,
      })
    })

    post.attachments = new PostAttachmentList(postAttachments)

    await this.postRepository.create(post)

    return right({
      post,
    })
  }
}
