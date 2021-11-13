import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "../entities/Rental";


interface IRentalsRepository {
    findOpenRentalByCar(car_id: string): Promise<Rental | undefined>;
    findOpenRentalByUser(user_id: string): Promise<Rental | undefined>;
    create(data: ICreateRentalDTO): Promise<Rental>;
}

export { IRentalsRepository };