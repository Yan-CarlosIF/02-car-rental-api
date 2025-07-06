import { v4 as uuidv4 } from "uuid";

export class Specification {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor(name: string, description: string) {
    if (!this.id) this.id = uuidv4();

    this.name = name;
    this.description = description;
    this.created_at = new Date();
  }
}
