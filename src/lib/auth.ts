import { NextAuthOptions, getServerSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schema/login";
import { BASE_URL } from "@/config";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        try {
          if (validatedFields.success) {
            const { username, password } = validatedFields.data;
            const res = await fetch(`${BASE_URL}/auth/login`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                password,
              }),
            });

            const user = await res.json();

            if (user.token) {
              return user;
            } else {
              return null;
            }
          }

          throw new Error("Failed");
        } catch (error) {
          throw new Error("Failed");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.name = token.username;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.gender = token.gender;
        session.user.image = token.image;
        session.user.email = token.email;
        session.user.token = token.token;
      }

      return session;
    },
    async jwt({ token, user }) {
      if (!token || !user) {
        return token;
      }
      return { ...user, ...token };
    },
  },
};

export const currentUser = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
