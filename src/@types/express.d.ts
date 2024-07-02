import { JwtPayload } from 'jsonwebtoken';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload | string; // Adjust the type based on your JWT payload
  }
}
