import { container } from "tsyringe";
import { IDateProvider } from "./dateProvider/Idate-provider";
import { DayjsDateProvider } from "./dateProvider/implementations/dayjs-date-provider";
import { IMailProvider } from "./mailProvider/Imail-provider";
import { EtherealMailProvider } from "./mailProvider/implementations/ethereal-mail-provider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
