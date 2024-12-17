import { User } from "../domain/entities/User";
import { UserRepository } from "../domain/repositories/UserRepository";
import { SignUpUser } from "../domain/usecases/SignUpUser";

describe('SignUpUser', () => {
  let signUpUserUseCase: SignUpUser;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      signUp: jest.fn(),
      login: jest.fn(),
      getCurrentUser: jest.fn(),
      updatePushToken: jest.fn()
    };

    signUpUserUseCase = new SignUpUser(mockUserRepository);
  });

  it('deve criar um novo usuário com email e senha válidos', async () => {
    const fakeUser: User = { id: 'user123', email: 'test@example.com' };
    
    // Configura o mock para retornar um usuário ao chamar signUp
    mockUserRepository.signUp.mockResolvedValueOnce(fakeUser);

    const result = await signUpUserUseCase.execute('test@example.com', 'password123');
    expect(result).toEqual(fakeUser);
    expect(mockUserRepository.signUp).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  it('deve propagar erros do repositório', async () => {
    mockUserRepository.signUp.mockRejectedValueOnce(new Error('Email já utilizado'));

    await expect(signUpUserUseCase.execute('test@example.com', 'password123'))
      .rejects
      .toThrow('Email já utilizado');
  });
});
