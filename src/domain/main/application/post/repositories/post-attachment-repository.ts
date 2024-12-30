import { PostAttachment } from '@/domain/main/enterprise/entities/post/post-attachment'

export abstract class PostAttachmentRepository {
  abstract createMany(attachments: PostAttachment[]): Promise<void>
  abstract deleteMany(attachments: PostAttachment[]): Promise<void>
}
