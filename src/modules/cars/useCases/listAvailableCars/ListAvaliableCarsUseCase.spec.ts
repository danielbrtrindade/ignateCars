import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            "brand": "Audi",
            "category_id": "category_id",
            "daily_rate": 110.00,
            "description": "Car description",
            "fine_amount": 100,
            "name": "Audi TEST",
            "license_plate": "DEF-4444"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            "brand": "Audi",
            "category_id": "category_id",
            "daily_rate": 110.00,
            "description": "Car description 1",
            "fine_amount": 100,
            "name": "Audi TEST 1",
            "license_plate": "DEF-1111"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Audi"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            "brand": "Audi",
            "category_id": "category_id",
            "daily_rate": 110.00,
            "description": "Car description 2",
            "fine_amount": 100,
            "name": "Audi TEST 2",
            "license_plate": "DEF-2222"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Audi TEST 2"
        });

        expect(cars).toEqual([car]);
    });

    it("should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            "brand": "Audi",
            "category_id": "12345",
            "daily_rate": 110.00,
            "description": "Car description 3",
            "fine_amount": 100,
            "name": "Audi TEST 3",
            "license_plate": "DEF-3333"
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "12345"
        });

        expect(cars).toEqual([car]);
    });
});