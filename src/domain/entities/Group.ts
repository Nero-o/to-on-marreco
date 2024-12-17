export interface GroupMember {
  userId: string;
  role: 'Admin' | 'Member';
  ready: boolean;
}

export interface Group {
  id: string;
  name: string;
  inviteLink: string;
  members: GroupMember[];
}