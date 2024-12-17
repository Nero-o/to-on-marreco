import { Group } from "../entities/Group";

export interface GroupRepository {
    createGroup(name: string, adminUserId: string): Promise<Group>;
    joinGroup(groupId: string, userId: string): Promise<void>;
    leaveGroup(groupId: string, userId: string): Promise<void>;
    removeMember(groupId: string, adminUserId: string, memberId: string): Promise<void>;
    getGroup(groupId: string): Promise<Group>;
    setMemberReady(groupId: string, userId: string, ready: boolean): Promise<void>;
}