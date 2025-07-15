import { SignOptions } from "jsonwebtoken";
import "dotenv/config";

export default {
  secret_refresh_token: process.env.SECRET_REFRESH_TOKEN as string,
  secret_token: process.env.SECRET_TOKEN as string,
  expires_in_token: "15m" as SignOptions["expiresIn"],
  expires_in_refresh_token: "30d" as SignOptions["expiresIn"],
  expires_refresh_token_days: 30,
};
