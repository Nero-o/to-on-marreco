import { GroupRepositoryImpl } from "./data/repositories/GroupRepositoryImpl";
import { UserRepositoryImpl } from "./data/repositories/UserRepositoryImpl";

import { CreateGroup } from "./domain/usecases/CreateGroup";
import { JoinGroup } from "./domain/usecases/JoinGroup";
import { LeaveGroup } from "./domain/usecases/LeaveGroup";
import { LoginUser } from "./domain/usecases/LoginUser";
import { RemoveMember } from "./domain/usecases/RemoveMember";
import { SetMemberReady } from "./domain/usecases/SetMemberReady";
import { SignUpUser } from "./domain/usecases/SignUpUser";

const userRepository = new UserRepositoryImpl();
const groupRepository = new GroupRepositoryImpl();

export const signUpUserUseCase = new SignUpUser(userRepository);
export const loginUserUseCase = new LoginUser(userRepository);
export const createGroupUseCase = new CreateGroup(groupRepository);
export const joinGroupUseCase = new JoinGroup(groupRepository);
export const leaveGroupUseCase = new LeaveGroup(groupRepository);
export const removeMemberUseCase = new RemoveMember(groupRepository)
export const setMemberReadyUseCase = new SetMemberReady(groupRepository);