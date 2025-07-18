import { Connection } from "typeorm";
import createConnection from "@shared/infra/typeorm";
import request from "supertest";
import { v4 } from "uuid";
import { hash } from "bcryptjs";
import { app } from "@shared/infra/http/app";

describe("List Categories", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = v4();
    const password = await hash("admin", 8);

    await connection.query(
      `
    insert into users
    (id, name, email, password, "isAdmin", created_at, driver_license) 
    values 
    ('${id}', 'admin', 'admin@email.com', '${password}', true, 'now()', 'XXXXXX');
    `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category description supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toBe("Category Supertest");
  });
});
