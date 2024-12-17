import { Group } from '../entities/Group';
import { GroupRepository } from '../repositories/GroupRepository';

export class CreateGroup {
  constructor(private groupRepository: GroupRepository) {}

  async execute(name: string, adminUserId: string): Promise<Group> {
    //TO DO:  Podemos validar se name é vazio, etc.
    return this.groupRepository.createGroup(name, adminUserId);
  }
}
