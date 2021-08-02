import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../repositories/dtos/ICreateUserDTO";
import { IUserRepository } from "../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({
        name,
        username,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        await this.userRepository.create({
            name,
            username,
            password,
            email,
            driver_license,
        });
    }

}

export { CreateUserUseCase }