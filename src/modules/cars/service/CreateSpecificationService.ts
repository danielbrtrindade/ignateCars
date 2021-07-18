import { ISpecificationsRepository } from "../repositories/ISpecificationsRepository";

interface IRequest {
    name: string;
    description: string;
}

class CreateSpecificationService {
    constructor(private SpecificationsRepository: ISpecificationsRepository) {

    }
    execute({ name, description }: IRequest): void {
        const specificationAlreadyExists = this.SpecificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new Error("Specification Already exists!");
        }

        this.SpecificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationService }