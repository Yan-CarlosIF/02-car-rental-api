import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/user.repository";
import { AppError } from "@shared/errors/app-error";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(
      token,
      "2b2f186637649910d90f0873eed6b52f"
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User does not exists", 401);
    }

    request.user.id = user_id;

    next();
  } catch {
    throw new AppError("Token invalid", 401);
  }
}
