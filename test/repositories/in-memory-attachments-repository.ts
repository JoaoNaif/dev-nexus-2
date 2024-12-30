import { AttachmentRepository } from '@/domain/main/application/_repositories/attachment-repository'
import { Attachment } from '@/domain/main/enterprise/entities/attachment'

export class InMemoryAttachmentRespository implements AttachmentRepository {
  public items: Attachment[] = []

  async create(attachment: Attachment) {
    this.items.push(attachment)
  }
}
