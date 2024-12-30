import { UniqueEntityId } from '@/core/entities/unique-entity-id'
import { User, UserProps } from '@/domain/main/enterprise/entities/user/user'
import { faker } from '@faker-js/faker'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityId,
) {
  const user = User.create(
    {
      email: faker.internet.email(),
      username: faker.person.fullName(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )

  return user
}
