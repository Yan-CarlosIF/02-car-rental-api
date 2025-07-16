import { v4 as uuidv4 } from "uuid";
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { Expose } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  id: string;

  @Column("text")
  name: string;

  @Column("text")
  email: string;

  @Column("text")
  password: string;

  @Column("text")
  driver_license: string;

  @Column("boolean", { default: false })
  isAdmin: boolean;

  @Column("text", { nullable: true, default: null })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string | null {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) this.id = uuidv4();
  }
}
