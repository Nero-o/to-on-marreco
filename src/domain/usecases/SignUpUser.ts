import { User } from '../entities/User';
import { UserRepository } from '../repositories/UserRepository';
export class SignUpUser {
    constructor(private userRepository: UserRepository) {}


    async execute(email: string, password: string): Promise<User> {
        
        //TO DO: Adicionar validacoes para o cadastro (email, senha)
        return this.userRepository.signUp(email, password)
    }
}