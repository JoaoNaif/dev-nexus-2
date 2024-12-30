import { PaginationParams } from '@/core/repositories/pagination-params'
import { UserRepository } from '@/domain/main/application/user/repositories/user-repository'
import { User } from '@/domain/main/enterprise/entities/user/user'

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = []

  async findById(id: string) {
    const user = this.items.find((item) => item.id.toString() === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmailOrUsername(
    email: string,
    username: string,
  ): Promise<User | null> {
    const userEmail = this.items.find((item) => item.email === email)

    if (!userEmail) {
      return null
    }

    const user = this.items.find((item) => item.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async findByUsername(username: string) {
    const user = this.items.find((item) => item.username === username)

    if (!user) {
      return null
    }

    return user
  }

  async findManyUser(filter: string, { page }: PaginationParams) {
    const users = this.items
      .filter((item) => item.username.includes(filter))
      .slice((page - 1) * 20, page * 20)

    return users
  }

  async save(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items[itemIndex] = user
  }

  async create(user: User) {
    this.items.push(user)
  }

  async delete(user: User) {
    const itemIndex = this.items.findIndex((item) => item.id === user.id)

    this.items.splice(itemIndex, 1)
  }
}
