// types.d.ts or a similar file where you declare module augmentations
import "next-auth";

declare module "next-auth" {
  interface User {
    id: string; // Ensure `id` exists for the User object
    name: string;
    email: string;
  }

  interface Session {
    user: User;
    accessToken: JWT;
  }

  interface JWT {
    id: string; // Ensure `id` exists on JWT
    sub?: string; // Optional: Matches the standard JWT `sub` property
    email?: string; // Optional: Include if email is part of the token
    iat?: number; // Issued at timestamp
    exp?: number; // Expiration timestamp
  }
}
