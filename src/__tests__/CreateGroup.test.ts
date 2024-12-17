import { Group } from "../domain/entities/Group";
import { GroupRepository } from "../domain/repositories/GroupRepository";
import { CreateGroup } from "../domain/usecases/CreateGroup";

describe('CreateGroup', () => {
  let createGroupUseCase: CreateGroup;
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
    createGroupUseCase = new CreateGroup(mockGroupRepository);
  });

  it('deve criar um grupo e retornar seus dados', async () => {
    const fakeGroup: Group = {
      id: 'group123',
      name: 'Meu Grupo',
      inviteLink: 'http://invite.link',
      members: [{ userId: 'adminUserId', role: 'Admin', ready: false }]
    };
    mockGroupRepository.createGroup.mockResolvedValueOnce(fakeGroup);

    const result = await createGroupUseCase.execute('Meu Grupo', 'adminUserId');
    expect(result).toEqual(fakeGroup);
    expect(mockGroupRepository.createGroup).toHaveBeenCalledWith('Meu Grupo', 'adminUserId');
  });

  it('deve lançar erro se a criação falhar no repositório', async () => {
    mockGroupRepository.createGroup.mockRejectedValueOnce(new Error('Falha ao criar grupo'));

    await expect(createGroupUseCase.execute('Meu Grupo', 'adminUserId'))
      .rejects
      .toThrow('Falha ao criar grupo');
  });
});
