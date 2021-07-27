import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";


export default (): ListCategoriesController => {
    const categoriesRepository = new CategoriesRepository();
    const categoriesUseCate = new ListCategoriesUseCase(categoriesRepository);
    const listCategoriesController = new ListCategoriesController(categoriesUseCate);

    return listCategoriesController;
}
