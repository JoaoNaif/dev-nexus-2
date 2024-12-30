import { UserAttachment } from '@/domain/main/enterprise/entities/user/user-attachment'

export abstract class UserAttachmentRepository {
  abstract create(attachment: UserAttachment): Promise<void>
  abstract delete(attachment: UserAttachment): Promise<void>
}
