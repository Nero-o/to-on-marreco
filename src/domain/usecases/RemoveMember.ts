import { GroupRepository } from '../repositories/GroupRepository';

export class RemoveMember {
  constructor(private groupRepository: GroupRepository) {}

  async execute(groupId: string, adminUserId: string, memberId: string): Promise<void> {
    return this.groupRepository.removeMember(groupId, adminUserId, memberId);
  }
}
