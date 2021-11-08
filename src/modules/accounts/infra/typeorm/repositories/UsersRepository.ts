import { ICreateUserDTO } from "../../../../accounts/repositories/dtos/ICreateUserDTO";
import { IUserRepository } from "../../../../accounts/repositories/IUsersRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";


class UsersRepository implements IUserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }

    async create({ name, password, email, driver_license, id, avatar }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            password,
            email,
            driver_license,
            id,
            avatar,
        });

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.repository.findOne({ email });

        return user;
    }

    async findById(id: string): Promise<User | undefined> {
        const user = await this.repository.findOne(id);

        return user;
    }
}

export { UsersRepository }