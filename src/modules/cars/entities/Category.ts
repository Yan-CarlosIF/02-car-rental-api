import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("categories")
export class Category {
  @PrimaryColumn("uuid")
  id?: string;

  @Column("text")
  name: string;

  @Column("text")
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor(name: string, description: string) {
    if (!this.id) this.id = uuidv4();

    this.name = name;
    this.description = description;
    this.created_at = new Date();
  }
}
