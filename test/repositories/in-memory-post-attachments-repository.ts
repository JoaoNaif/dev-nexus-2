import { PostAttachmentRepository } from '@/domain/main/application/post/repositories/post-attachment-repository'
import { PostAttachment } from '@/domain/main/enterprise/entities/post/post-attachment'

export class InMemoryPostAttachmentsRepository
  implements PostAttachmentRepository
{
  public items: PostAttachment[] = []

  async createMany(attachments: PostAttachment[]): Promise<void> {
    this.items.push(...attachments)
  }

  async deleteMany(attachments: PostAttachment[]): Promise<void> {
    const postAttachments = this.items.filter((item) => {
      return !attachments.some((attachment) => attachment.equals(item))
    })

    this.items = postAttachments
  }

  async deleteManyByPostId(postId: string) {
    const postAttachments = this.items.filter(
      (item) => item.postId.toString() !== postId,
    )

    this.items = postAttachments
  }
}
