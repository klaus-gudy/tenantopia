import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./prisma";
import { validatePassword } from "./hash";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) return null;

        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) return null;

        return {
          id: user.id,
          email: user.email,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async signIn({ user, account }: any) {
      if (account?.provider === "google" || account?.provider === "github") {
        const emailValue = user.email || "";

        let userInDb = await prisma.user.findUnique({
          where: { email: emailValue },
        });

        if (!userInDb) {
          throw new Error("Invalid credentials");
        }

        user.id = userInDb.id;
      }
      return true;
    },
    jwt: ({ token, user }: any) => {
      if (user) {
        token.userId = user.id;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.userId;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};