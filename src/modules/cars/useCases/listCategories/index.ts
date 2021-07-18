import { CategoriesRepository } from "../../repositories/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance();
const categoriesUseCate = new ListCategoriesUseCase(categoriesRepository);
const listCategoriesController = new ListCategoriesController(categoriesUseCate);

export { listCategoriesController };