import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDataProvider } from "./DateProvider/implementations/DayjsDataProvider";


container.registerSingleton<IDateProvider>(
    "DayjsDataProvider",
    DayjsDataProvider
);