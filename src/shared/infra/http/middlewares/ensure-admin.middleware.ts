import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/user.repository";
import { AppError } from "@shared/errors/app-error";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { id } = request.user;

  const usersRepository = new UsersRepository();

  const user = await usersRepository.findById(id);

  if (!user || !user.isAdmin) {
    throw new AppError("User is not admin");
  }

  next();
}
