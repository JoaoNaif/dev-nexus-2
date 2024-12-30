import { PaginationParams } from '@/core/repositories/pagination-params'
import { User } from '@/domain/main/enterprise/entities/user/user'

export abstract class UserRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null>

  abstract findByUsername(username: string): Promise<User | null>
  abstract findManyUser(
    filter: string,
    params: PaginationParams,
  ): Promise<User[]>

  abstract save(user: User): Promise<void>
  abstract create(user: User): Promise<void>
  abstract delete(user: User): Promise<void>
}
