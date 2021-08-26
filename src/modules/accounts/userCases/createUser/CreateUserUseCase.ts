import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { IUserRepository } from "../../repositories/IUsersRepository";
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) { }

    async execute({
        name,
        password,
        email,
        driver_license,
    }: ICreateUserDTO): Promise<void> {

        const userAlreadyExists = await this.userRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        await this.userRepository.create({
            name,
            password: passwordHash,
            email,
            driver_license,
        });
    }

}

export { CreateUserUseCase }