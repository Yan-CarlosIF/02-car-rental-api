import "reflect-metadata";

import express from "express";
import { router } from "./routes";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import "./database";

const app = express();

app.use(express.json());

app.use(router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.listen(3333, () => {
  console.log(
    `Server is running at http://localhost:3333
docs at http://localhost:3333/api-docs`
  );
});
