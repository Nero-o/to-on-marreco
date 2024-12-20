import { GroupRepository } from '../../domain/repositories/GroupRepository';
import { Group, GroupMember } from '../../domain/entities/Group';
import { firestore } from '../sources/firebase/firebaseConfig';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export class GroupRepositoryImpl implements GroupRepository {
  private generateInviteLink(groupId: string): string {
    // Gera um link simples; futuramente pode usar Firebase Dynamic Links:
    return `https://to-on-marreco.page.link/join?groupId=${groupId}`;
  }

  async createGroup(name: string, adminUserId: string): Promise<Group> {
    const groupId = uuidv4();
    const inviteLink = this.generateInviteLink(groupId);

    const group: Group = {
      id: groupId,
      name,
      inviteLink,
      members: [{
        userId: adminUserId,
        role: 'Admin',
        ready: false
      }]
    };

    await setDoc(doc(firestore, 'groups', groupId), group);

    return group;
  }

  async joinGroup(groupId: string, userId: string): Promise<void> {
    const groupDocRef = doc(firestore, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    if (!groupDoc.exists()) {
      throw new Error('Grupo não encontrado');
    }

    const group: Group = groupDoc.data() as Group;
    const isMember = group.members.some(m => m.userId === userId);
    if (isMember) {
      throw new Error('Você já está nesse grupo');
    }

    const newMember: GroupMember = {
      userId,
      role: 'Member',
      ready: false
    };

    await updateDoc(groupDocRef, {
      members: arrayUnion(newMember)
    });
  }

  async leaveGroup(groupId: string, userId: string): Promise<void> {
    const groupDocRef = doc(firestore, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    if (!groupDoc.exists()) {
      throw new Error('Grupo não encontrado');
    }

    const group: Group = groupDoc.data() as Group;
    const member = group.members.find(m => m.userId === userId);
    if (!member) {
      throw new Error('Você não faz parte deste grupo');
    }

    if (member.role === 'Admin') {
      // Admin saindo: deleta o grupo
      await deleteDoc(groupDocRef);
    } else {
      // Apenas remove o membro
      await updateDoc(groupDocRef, {
        members: arrayRemove(member)
      });
    }
  }

  async removeMember(groupId: string, adminUserId: string, memberId: string): Promise<void> {
    const groupDocRef = doc(firestore, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    if (!groupDoc.exists()) {
      throw new Error('Grupo não encontrado');
    }

    const group: Group = groupDoc.data() as Group;
    const admin = group.members.find(m => m.userId === adminUserId && m.role === 'Admin');
    if (!admin) {
      throw new Error('Usuário não tem permissão para remover membros');
    }

    const member = group.members.find(m => m.userId === memberId);
    if (!member) {
      throw new Error('Membro não encontrado no grupo');
    }

    await updateDoc(groupDocRef, {
      members: arrayRemove(member)
    });
  }

  async getGroup(groupId: string): Promise<Group> {
    const groupDocRef = doc(firestore, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    if (!groupDoc.exists()) {
      throw new Error('Grupo não encontrado');
    }

    return groupDoc.data() as Group;
  }

  async setMemberReady(groupId: string, userId: string, ready: boolean): Promise<void> {
    const groupDocRef = doc(firestore, 'groups', groupId);
    const groupDoc = await getDoc(groupDocRef);
    if (!groupDoc.exists()) {
      throw new Error('Grupo não encontrado');
    }

    const group: Group = groupDoc.data() as Group;
    const memberIndex = group.members.findIndex(m => m.userId === userId);
    if (memberIndex === -1) {
      throw new Error('Usuário não encontrado no grupo');
    }

    group.members[memberIndex].ready = ready;

    // Atualiza o documento com o array modificado
    await setDoc(groupDocRef, group);
  }
}
