import { User } from "../infra/typeorm/entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";


interface IUserRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User | undefined>;
    findById(id: string): Promise<User | undefined>;
}

export { IUserRepository }