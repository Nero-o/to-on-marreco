import { GroupRepository } from '../repositories/GroupRepository';

export class JoinGroup {
  constructor(private groupRepository: GroupRepository) {}

  async execute(groupId: string, userId: string): Promise<void> {
    //TO DO:  Aqui poderíamos conferir regras extras, se necessário.
    return this.groupRepository.joinGroup(groupId, userId);
  }
}
