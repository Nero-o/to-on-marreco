// src/domain/usecases/__tests__/LoginUser.test.ts

import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";
import { LoginUser } from "../domain/usecases/LoginUser";

describe('LoginUser', () => {
  let loginUserUseCase: LoginUser;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      signUp: jest.fn(),
      login: jest.fn(),
      getCurrentUser: jest.fn(),
      updatePushToken: jest.fn()
    };
    loginUserUseCase = new LoginUser(mockUserRepository);
  });

  it('deve logar o usuário com email e senha válidos', async () => {
    const fakeUser: User = { id: 'user123', email: 'login@example.com' };
    mockUserRepository.login.mockResolvedValueOnce(fakeUser);

    const result = await loginUserUseCase.execute('login@example.com', 'password');
    expect(result).toEqual(fakeUser);
    expect(mockUserRepository.login).toHaveBeenCalledWith('login@example.com', 'password');
  });

  it('deve lançar erro se o login falhar', async () => {
    mockUserRepository.login.mockRejectedValueOnce(new Error('Credenciais inválidas'));

    await expect(loginUserUseCase.execute('login@example.com', 'wrongpass'))
      .rejects
      .toThrow('Credenciais inválidas');
  });
});
