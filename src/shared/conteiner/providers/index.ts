import { container } from "tsyringe";
import { IDateProvider } from "./dateProvider/Idate-provider";
import { DayjsDateProvider } from "./dateProvider/implementations/dayjs-date-provider";
import { IMailProvider } from "./mailProvider/Imail-provider";
import { EtherealMailProvider } from "./mailProvider/implementations/ethereal-mail-provider";
import { LocalStorageProvider } from "./storageProvider/implementations/local-storage-provider";
import { S3StorageProvider } from "./storageProvider/implementations/s3-storage-provider";
import { IStorageProvider } from "./storageProvider/Istorage-provider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  diskStorage[process.env.disk as keyof typeof diskStorage]
);
