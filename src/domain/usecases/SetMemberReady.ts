import { GroupRepository } from '../repositories/GroupRepository';

export class SetMemberReady {
  constructor(private groupRepository: GroupRepository) {}

  async execute(groupId: string, userId: string, ready: boolean): Promise<void> {
    return this.groupRepository.setMemberReady(groupId, userId, ready);
  }
}
