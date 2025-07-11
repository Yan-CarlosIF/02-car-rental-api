import { container } from "tsyringe";
import { IDateProvider } from "./dateProvider/Idate-provider";
import { DayjsDateProvider } from "./dateProvider/implementations/dayjs-date-provider";

container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);
