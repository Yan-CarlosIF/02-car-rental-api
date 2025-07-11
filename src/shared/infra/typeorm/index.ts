import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();

  const connection = await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database: process.env.NODE_ENV === "test" ? "rent_test" : "rent-car",
    })
  ).catch((error) => {
    console.log(error);
    return error;
  });

  return connection;
};
