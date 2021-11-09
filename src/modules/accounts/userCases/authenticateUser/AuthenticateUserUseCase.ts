import { IUserRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";



interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private userRepository: IUserRepository
    ) { }
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect!");
        }

        const token = sign({}, "7b7c49a0ac2b3ad3e0f221edbdbaa503", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            }
        }

        return tokenReturn;

    }
}

export { AuthenticateUserUseCase }