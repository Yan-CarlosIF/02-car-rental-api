import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryColumn,
} from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryColumn("uuid")
  @Generated("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
