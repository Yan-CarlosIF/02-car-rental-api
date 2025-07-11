import "reflect-metadata";
import express, { Response, Request, NextFunction } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import createConnection from "@shared/infra/typeorm";

import "@shared/conteiner";

import { AppError } from "@shared/errors/app-error";
import { router } from "@shared/infra/http/routes";
import swaggerFile from "../../../swagger.json";

createConnection();

export const app = express();

app.use(express.json());

// @ts-ignore
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({ message: err.message });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);
