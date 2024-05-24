import jwt from "jsonwebtoken";
import env from "./validateEnv";
import { UserRole } from "./constraint";

export const generateAccessToken = (id: string, role: string) => {
  return jwt.sign({ id: id, role: role }, env.JWT_SECRET, {
    expiresIn: env.EXPIRE_JWT,
    algorithm: "HS256",
    allowInsecureKeySizes: true // allow weak key
  });
};

export const generateRefreshToken = (id: string, role: string) => {
  return jwt.sign({ id: id, role: role }, env.REFRESH_SECRET, {
    expiresIn: env.EXPIRE_REFRESH,
    algorithm: "HS256",
    allowInsecureKeySizes: true // allow weak key
  });
};
