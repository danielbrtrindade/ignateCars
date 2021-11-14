import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/infra/typeorm/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/AppError";
import dayjs from "dayjs";
import { inject, injectable } from "tsyringe";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

interface IRequest {
    user_id: string;
    car_id: string,
    expected_return_date: Date;
}

//@injectable()
class CreateRentalUseCase {

    constructor(
        //@inject("rental")
        private rentalRepository: IRentalsRepository
    ) { }
    async execute({ user_id, car_id, expected_return_date }: IRequest): Promise<Rental> {
        const carUnavailable = await this.rentalRepository.findOpenRentalByCar(car_id);
        const minimumHour = 24;

        if (carUnavailable) {
            throw new AppError("Car is unavailable");
        }

        const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(user_id);

        if (rentalOpenToUser) {
            throw new AppError("There is a rental in progress for user!");
        }

        const expectedReturnDateFormat = dayjs(expected_return_date)
            .utc()
            .local()
            .format();

        const dateNow = dayjs().utc().local().format();
        const compare = dayjs(expectedReturnDateFormat).diff(dateNow, "hours");

        if (compare < minimumHour) {
            throw new AppError("Invalid return time!");
        }

        const rental = this.rentalRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        return rental;
    }
}

export { CreateRentalUseCase };