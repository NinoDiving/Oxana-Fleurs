import type { JwtPayload } from "jsonwebtoken";

export type CustomJwtPayload = {
  id: string;
  isAdmin: boolean;
  lastname: string;
  firstname: string;
  email: string;
};

declare global {
  namespace Express {
    export interface Request {
      user?: CustomJwtPayload;
    }
  }
}
