import { FakeHasher } from 'test/cryptography/fake-hasher'
import { InMemoryUserRepository } from 'test/repositories/in-memory-user-repository'
import { RegisterUserUseCase } from './register-user'

let inMemoryUserRepository: InMemoryUserRepository
let fakeHasher: FakeHasher
let sut: RegisterUserUseCase

describe('Create user', () => {
  beforeEach(() => {
    inMemoryUserRepository = new InMemoryUserRepository()
    fakeHasher = new FakeHasher()
    sut = new RegisterUserUseCase(inMemoryUserRepository, fakeHasher)
  })

  it('should be able to register a new user', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      username: 'johndoe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({
      user: inMemoryUserRepository.items[0],
    })
  })

  it('should hash user password upon registration', async () => {
    const result = await sut.execute({
      email: 'johndoe@email.com',
      username: 'johndoe',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(result.isRight()).toBe(true)
    expect(inMemoryUserRepository.items[0].password).toEqual(hashedPassword)
  })
})
