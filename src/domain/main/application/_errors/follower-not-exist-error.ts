import { UseCaseError } from '@/core/errors/use-case-error'

export class FollowerNotExistError extends Error implements UseCaseError {
  constructor() {
    super(`You are not following this user`)
  }
}
