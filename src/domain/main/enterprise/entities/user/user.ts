import { UserAttachment } from './user-attachment'
import { Optional } from '@/core/types/optional'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { FollowerList } from './follower-list'
import { Entity } from '@/core/entities/entity'
import { FollowingList } from './following-list'

export interface UserProps {
  email: string
  username: string
  password: string
  attachment?: UserAttachment | null
  followers: FollowerList
  followings: FollowingList
  createdAt: Date
}

export class User extends Entity<UserProps> {
  get email() {
    return this.props.email
  }

  get username() {
    return this.props.username
  }

  set username(username: string) {
    this.props.username = username
  }

  get password() {
    return this.props.password
  }

  get attachment() {
    return this.props.attachment
  }

  set attachment(attachment: UserAttachment | undefined | null) {
    this.props.attachment = attachment
  }

  get followers() {
    return this.props.followers
  }

  set followers(followers: FollowerList) {
    this.props.followers = followers
  }

  get followings() {
    return this.props.followings
  }

  set followings(followings: FollowerList) {
    this.props.followings = followings
  }

  get createdAt() {
    return this.props.createdAt
  }

  static create(
    props: Optional<UserProps, 'createdAt' | 'followers' | 'followings'>,
    id?: UniqueEntityId,
  ) {
    const user = new User(
      {
        ...props,
        followings: props.followings ?? new FollowingList(),
        followers: props.followers ?? new FollowerList(),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return user
  }
}
