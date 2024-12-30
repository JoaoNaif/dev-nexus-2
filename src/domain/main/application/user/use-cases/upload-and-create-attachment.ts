import { Either, left, right } from '@/core/either'
import { InvalidAttachmentTypeError } from '../../_errors/invalid-attachment-type-error'
import { AttachmentRepository } from '../../_repositories/attachment-repository'
import { Uploader } from '../../_storage/uploader'
import { Attachment } from '@/domain/main/enterprise/entities/attachment'

interface UploadAndCreateAttachmentRequest {
  fileName: string
  fileType: string
  body: Buffer
}

type UploadAndCreateAttachmentResponse = Either<
  InvalidAttachmentTypeError,
  { attachment: Attachment }
>

export class UploadAndCreateAttachmentUseCase {
  constructor(
    private attachmentsRepository: AttachmentRepository,
    private uploader: Uploader,
  ) {}

  async execute({
    fileName,
    fileType,
    body,
  }: UploadAndCreateAttachmentRequest): Promise<UploadAndCreateAttachmentResponse> {
    if (!/^(image\/(jpeg|png))$|^application\/pdf$/.test(fileType)) {
      return left(new InvalidAttachmentTypeError(fileType))
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body })

    const attachment = Attachment.create({
      title: fileName,
      url,
    })

    await this.attachmentsRepository.create(attachment)

    return right({
      attachment,
    })
  }
}
