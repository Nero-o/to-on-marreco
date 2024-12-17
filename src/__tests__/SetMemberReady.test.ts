import { GroupRepository } from "../domain/repositories/GroupRepository";
import { SetMemberReady } from "../domain/usecases/SetMemberReady";

describe('SetMemberReady - cenários adicionais', () => {
  let setMemberReadyUseCase: SetMemberReady;
  let mockGroupRepository: jest.Mocked<GroupRepository>;

  beforeEach(() => {
    mockGroupRepository = {
      createGroup: jest.fn(),
      joinGroup: jest.fn(),
      leaveGroup: jest.fn(),
      removeMember: jest.fn(),
      getGroup: jest.fn(),
      setMemberReady: jest.fn()
    };
    setMemberReadyUseCase = new SetMemberReady(mockGroupRepository);
  });

  it('deve lançar erro se o usuário não faz parte do grupo', async () => {
    mockGroupRepository.setMemberReady.mockRejectedValueOnce(new Error('Usuário não encontrado no grupo'));

    await expect(setMemberReadyUseCase.execute('group123', 'nonExistentUserId', true))
      .rejects
      .toThrow('Usuário não encontrado no grupo');
  });

  it('deve lançar erro se o grupo não existe', async () => {
    mockGroupRepository.setMemberReady.mockRejectedValueOnce(new Error('Grupo não encontrado'));

    await expect(setMemberReadyUseCase.execute('nonExistentGroupId', 'user123', true))
      .rejects
      .toThrow('Grupo não encontrado');
  });

  it('deve permitir desfazer prontidão (ready = false) sem erro', async () => {
    // Caso feliz: voltar o usuário para não pronto
    mockGroupRepository.setMemberReady.mockResolvedValueOnce();

    await expect(setMemberReadyUseCase.execute('group123', 'user123', false))
      .resolves
      .toBeUndefined();
    expect(mockGroupRepository.setMemberReady).toHaveBeenCalledWith('group123', 'user123', false);
  });
});