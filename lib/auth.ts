import NextAuth from "next-auth"
import  Credentials from "next-auth/providers/credentials"
import { prisma } from "./prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter"
import { validatePassword } from "./hash";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "Password" },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials as { email: string; password: string };

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = await validatePassword(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
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
        token.email = user.email;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
    session: ({ session, token }: any) => {
      if (session.user) {
        session.user.id = token.userId;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  }
});