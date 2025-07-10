import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  ManyToMany,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { Category } from "./Category";
import { Specification } from "./Specification";

@Entity("cars")
export class Car {
  @PrimaryColumn("uuid")
  id: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @Column("numeric")
  daily_rate: number;

  @Column("boolean", { default: true })
  available: boolean;

  @Column("varchar")
  license_plate: string;

  @Column("numeric")
  fine_amount: number;

  @Column("varchar")
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @Column("uuid")
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: "specifications_cars",
    joinColumns: [{ name: "car_id" }],
    inverseJoinColumns: [{ name: "specification_id" }],
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
