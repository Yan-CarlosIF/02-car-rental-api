import { app } from "@shared/infra/http/app";
import request from "supertest";
import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 } from "uuid";

describe("Create Category Controller", () => {
  let connection: Connection;

  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("admin", 8);
    const id = v4();

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

  it("should be able to create a new category", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category description supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(201);
  });

  it("should not be able to create a new category with an existing name", async () => {
    const responseToken = await request(app).post("/sessions").send({
      email: "admin@email.com",
      password: "admin",
    });

    const { refresh_token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name: "Category Supertest",
        description: "Category description supertest",
      })
      .set({
        Authorization: `Bearer ${refresh_token}`,
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Category already exists!");
  });
});
