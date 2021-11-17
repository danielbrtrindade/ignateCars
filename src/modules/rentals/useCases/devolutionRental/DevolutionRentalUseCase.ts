import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IRentalsRepository } from "../repositories/IRentalsRepository";


interface IRequest {
    id: string;
    user_id: string;
}

@injectable()
class DevolutionRentalUseCase {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DayjsDataProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ id, user_id }: IRequest): Promise<Rental> {
        const rental = await this.rentalsRepository.findById(id);
        const minimum_daily = 1;
        let total = 0;

        if (!rental) {
            throw new AppError("Rental does not exists!");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        if (!car) {
            throw new AppError("Car does not exists!");
        }

        const dateNow = this.dateProvider.dateNow();
        let daily = this.dateProvider.compareInDays(rental.start_date, dateNow);
        const delay = this.dateProvider.compareInDays(dateNow, rental.expected_return_date);

        if (daily <= 0) {
            daily = minimum_daily;
        }

        if (delay > 0) {
            const calculate_fine = delay + car.fine_amount;
            total = calculate_fine;
        }

        total += daily * car.daily_rate;

        rental.end_date = this.dateProvider.dateNow();
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailable(rental.car_id, true);

        return rental;
    }
}

export { DevolutionRentalUseCase };