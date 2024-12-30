import { FollowerList } from '@/domain/main/enterprise/entities/user/follower-list'
import { FollowingList } from '@/domain/main/enterprise/entities/user/following-list'
import { UserAttachment } from '@/domain/main/enterprise/entities/user/user-attachment'

export interface ResponseGetUser {
  id: string
  username: string
  email: string
  attachment?: UserAttachment | null
  followers: FollowerList
  followings: FollowingList
  createdAt: Date
}
