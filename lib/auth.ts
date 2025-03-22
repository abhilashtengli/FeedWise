import { JWT, NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "./database";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Username", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials) => {
        await connectDB();
        if (!credentials || !credentials.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const { email, password } = credentials;
        const user = await User.findOne({ email: email }).select("+password");

        if (!user) {
          throw new Error("Invalid credentials");
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
        console.log("Login successfull" + user.name, user.email);
        return { id: user._id.toString(), name: user.name, email: user.email };
      }
    })
  ],
  session: { strategy: "jwt" },
  jwt: { secret: process.env.NEXTAUTH_SECRET, maxAge: 30 * 24 * 60 * 60 },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // console.log("Session callback triggered");
      if (token) {
        session.user = {
          id: token.id as string,
          name: session.user.name,
          email: session.user.email
        };
      }
      session.accessToken = token as unknown as JWT;

      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default authOptions;
