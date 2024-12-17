import { Group } from "../domain/entities/Group";
import { GroupRepository } from "../domain/repositories/GroupRepository";
import { GetGroupDetails } from "../domain/usecases/GetGroupDetails";

describe('GetGroupDetails', () => {
  let getGroupDetailsUseCase: GetGroupDetails;
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
    getGroupDetailsUseCase = new GetGroupDetails(mockGroupRepository);
  });

  it('deve retornar os detalhes do grupo', async () => {
    const fakeGroup: Group = {
      id: 'group123',
      name: 'Grupo Teste',
      inviteLink: 'http://invite.link',
      members: [
        { userId: 'adminUserId', role: 'Admin', ready: false },
        { userId: 'memberUserId', role: 'Member', ready: true }
      ]
    };
    mockGroupRepository.getGroup.mockResolvedValueOnce(fakeGroup);

    const result = await getGroupDetailsUseCase.execute('group123');
    expect(result).toEqual(fakeGroup);
    expect(mockGroupRepository.getGroup).toHaveBeenCalledWith('group123');
  });

  it('deve lançar erro se o grupo não for encontrado ou se ocorrer um erro no repositório', async () => {
    mockGroupRepository.getGroup.mockRejectedValueOnce(new Error('Grupo não encontrado'));

    await expect(getGroupDetailsUseCase.execute('group123'))
      .rejects
      .toThrow('Grupo não encontrado');
  });
});
