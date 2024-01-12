import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: User & {
      id: string;
      username: string;
      firstName: string;
      lastName: string;
      gender: string;
      token: string;
      image: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    gender: string;
    token: string;
    image: string;
  }
}
