import { User } from "../entities/User"

export interface UserRepository {
    signUp(email: string, password: string): Promise<User>
    login(email: string, password: string): Promise<User>
    getCurrentUser(): Promise<User | null>
    updatePushToken(userId: string, token: string): Promise<void>
}
