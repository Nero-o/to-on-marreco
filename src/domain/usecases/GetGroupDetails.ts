import { Group } from '../entities/Group';
import { GroupRepository } from '../repositories/GroupRepository';

export class GetGroupDetails {
  constructor(private groupRepository: GroupRepository) {}

  async execute(groupId: string): Promise<Group> {
    return this.groupRepository.getGroup(groupId);
  }
}
