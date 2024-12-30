import { UserAttachment } from '@/domain/main/enterprise/entities/user/user-attachment'

export interface ResponseGetFollowing {
  id: string
  userId: string
  username: string
  attachment?: UserAttachment | null
}
