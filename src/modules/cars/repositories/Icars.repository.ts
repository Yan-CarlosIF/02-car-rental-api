import { ICreateCarDTO } from "../dtos/Icreate-car.dto";
import { IFindCarDTO } from "../dtos/Ifind-car.dto";
import { Car } from "../infra/typeorm/entities/Car";

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | undefined>;
  findAvailable(data: IFindCarDTO): Promise<Car[]>;
  findById(id: string): Promise<Car | undefined>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}
