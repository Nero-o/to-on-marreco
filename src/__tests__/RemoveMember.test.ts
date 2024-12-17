import { GroupRepository } from "../domain/repositories/GroupRepository";
import { RemoveMember } from "../domain/usecases/RemoveMember";


describe('RemoveMember - cenários adicionais', () => {
  let removeMemberUseCase: RemoveMember;
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
    removeMemberUseCase = new RemoveMember(mockGroupRepository);
  });

  it('deve lançar erro se o usuário que tenta remover não é admin', async () => {
    mockGroupRepository.removeMember.mockRejectedValueOnce(new Error('Usuário não tem permissão para remover membros'));

    await expect(removeMemberUseCase.execute('group123', 'notAdminUserId', 'memberUserId'))
      .rejects
      .toThrow('Usuário não tem permissão para remover membros');
  });

  it('deve lançar erro se o membro não existe no grupo', async () => {
    mockGroupRepository.removeMember.mockRejectedValueOnce(new Error('Membro não encontrado no grupo'));

    await expect(removeMemberUseCase.execute('group123', 'adminUserId', 'nonExistentMemberId'))
      .rejects
      .toThrow('Membro não encontrado no grupo');
  });

  it('deve lançar erro se o grupo não existe', async () => {
    mockGroupRepository.removeMember.mockRejectedValueOnce(new Error('Grupo não encontrado'));

    await expect(removeMemberUseCase.execute('nonExistentGroupId', 'adminUserId', 'memberUserId'))
      .rejects
      .toThrow('Grupo não encontrado');
  });
});
