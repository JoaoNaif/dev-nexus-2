import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { PostAttachmentList } from './post-attachment-list'
import { PostLikeList } from './post-like-list'
import { PostCommentList } from './post-comment-list'
import { AggregateRoot } from '@/core/entities/aggregate-root'
import { Optional } from '@/core/types/optional'

export interface PostProps {
  authorId: UniqueEntityId
  content: string
  attachments: PostAttachmentList
  markings: string[]
  likes: PostLikeList
  comments: PostCommentList
  createdAt: Date
}

export class Post extends AggregateRoot<PostProps> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  set content(content: string) {
    this.props.content = content
  }

  get attachments() {
    return this.props.attachments
  }

  set attachments(attachments: PostAttachmentList) {
    this.props.attachments = attachments
  }

  get markings() {
    return this.props.markings
  }

  get likes() {
    return this.props.likes
  }

  set likes(likes: PostLikeList) {
    this.props.likes = likes
  }

  get comments() {
    return this.props.comments
  }

  set comments(comments: PostCommentList) {
    this.props.comments = comments
  }

  static create(
    props: Optional<
      PostProps,
      'createdAt' | 'attachments' | 'likes' | 'comments'
    >,
    id?: UniqueEntityId,
  ) {
    const post = new Post(
      {
        ...props,
        attachments: props.attachments ?? new PostAttachmentList(),
        likes: props.likes ?? new PostLikeList(),
        comments: props.comments ?? new PostCommentList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return post
  }
}
