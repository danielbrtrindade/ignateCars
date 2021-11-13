import { RentalsRepositoryInMemory } from "@modules/rentals/infra/typeorm/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./createRentalUseCase"


let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
    });

    it("should be able to create a new rental", async () => {
        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: "121212",
            expected_return_date: new Date(),
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("should not be able to create a new rental if there is another open to the same user", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "111111",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "12345",
                car_id: "22222",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a new rental if there is another open to the same car", async () => {
        expect(async () => {
            await createRentalUseCase.execute({
                user_id: "11111",
                car_id: "121212",
                expected_return_date: new Date(),
            });

            await createRentalUseCase.execute({
                user_id: "22222",
                car_id: "121212",
                expected_return_date: new Date(),
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});