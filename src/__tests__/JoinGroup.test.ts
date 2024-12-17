import { GroupRepository } from "../domain/repositories/GroupRepository";
import { JoinGroup } from "../domain/usecases/JoinGroup";

describe('JoinGroup', () => {
  let joinGroupUseCase: JoinGroup;
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

    joinGroupUseCase = new JoinGroup(mockGroupRepository);
  });

  it('deve permitir entrar no grupo se não estiver lá', async () => {
    // Caso normal: joinGroup funciona sem erro
    mockGroupRepository.joinGroup.mockResolvedValueOnce();

    await expect(joinGroupUseCase.execute('group123', 'user123')).resolves.toBeUndefined();
    expect(mockGroupRepository.joinGroup).toHaveBeenCalledWith('group123', 'user123');
  });

  it('deve lançar erro se o usuário já está no grupo', async () => {
    mockGroupRepository.joinGroup.mockRejectedValueOnce(new Error('Usuário já está no grupo'));

    await expect(joinGroupUseCase.execute('group123', 'user123'))
      .rejects
      .toThrow('Usuário já está no grupo');
  });
});
