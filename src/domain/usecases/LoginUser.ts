import { User } from "../entities/User";
import { UserRepository } from "../repositories/UserRepository";

export class LoginUser {
    constructor(private userRepository: UserRepository) {}

    async execute(email: string, password: string): Promise<User> {
        return this.userRepository.login(email, password)
    }
}