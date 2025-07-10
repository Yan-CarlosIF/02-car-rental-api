import { Connection, createConnection } from "typeorm";

export default async (): Promise<Connection> => {
  const connection = await createConnection()
    .then((connection) => {
      console.log("Connected to DB");
      return connection;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });

  return connection;
};
