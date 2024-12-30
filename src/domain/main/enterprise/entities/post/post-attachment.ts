import { Entity } from '@/core/entities/entity'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

export interface PostAttachmentProps {
  postId: UniqueEntityId
  attachmentId: UniqueEntityId
}

export class PostAttachment extends Entity<PostAttachmentProps> {
  get postId() {
    return this.props.postId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: PostAttachmentProps, id?: UniqueEntityId) {
    const postAttachment = new PostAttachment(props, id)

    return postAttachment
  }
}
