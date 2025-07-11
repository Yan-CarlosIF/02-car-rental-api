import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("rentals")
export class Rental {
  @PrimaryColumn("uuid")
  id: string;

  @Column("uuid")
  car_id: string;

  @Column("uuid")
  user_id: string;

  @Column("date")
  start_date: Date;

  @Column("date")
  end_date: Date;

  @Column("date")
  expected_return_date: Date;

  @Column("numeric")
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
