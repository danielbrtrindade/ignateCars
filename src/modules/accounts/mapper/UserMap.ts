import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {

    static toDTO({
        email,
        name,
        id,
        avatar,
        driver_license,
        avatar_url
    }: User): IUserResponseDTO {
        return {
            email,
            name,
            id,
            avatar,
            driver_license,
            avatar_url
        };
    }
}

export { UserMap }