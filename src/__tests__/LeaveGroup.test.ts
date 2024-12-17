import { GroupRepository } from "../domain/repositories/GroupRepository";
import { LeaveGroup } from "../domain/usecases/LeaveGroup";

describe('LeaveGroup', () => {
  let leaveGroupUseCase: LeaveGroup;
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
    leaveGroupUseCase = new LeaveGroup(mockGroupRepository);
  });

  it('deve permitir que um membro saia do grupo', async () => {
    mockGroupRepository.leaveGroup.mockResolvedValueOnce();

    await expect(leaveGroupUseCase.execute('group123', 'user123')).resolves.toBeUndefined();
    expect(mockGroupRepository.leaveGroup).toHaveBeenCalledWith('group123', 'user123');
  });

  it('deve lançar erro se a saída falhar', async () => {
    mockGroupRepository.leaveGroup.mockRejectedValueOnce(new Error('Falha ao sair do grupo'));

    await expect(leaveGroupUseCase.execute('group123', 'user123'))
      .rejects
      .toThrow('Falha ao sair do grupo');
  });
});
