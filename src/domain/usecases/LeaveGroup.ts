import { GroupRepository } from '../repositories/GroupRepository';

export class LeaveGroup {
  constructor(private groupRepository: GroupRepository) {}

  async execute(groupId: string, userId: string): Promise<void> {
    return this.groupRepository.leaveGroup(groupId, userId);
  }
}
