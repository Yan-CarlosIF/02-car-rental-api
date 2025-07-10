import { hash } from "bcryptjs";
import createConnection from "@shared/infra/typeorm";
import { v4 } from "uuid";

async function create() {
  const connection = await createConnection();
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

  await connection.close();
}

create().then(() => console.log("User admin created"));
