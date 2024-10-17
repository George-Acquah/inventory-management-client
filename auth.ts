/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { credentials } from "./utils/constants";
import { authConfig } from "./auth.config";
import { API } from "./lib/dataFetching";

export const { auth, signIn, signOut, handlers, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials,
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;

        try {
          const response = await fetch(`${API}/auth/users/login`, {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: { "Content-Type": "application/json" },
          });

          const data = await response.json();
          const user = data.data.user;
          const tokens = data.data.tokens;

          if (response.ok && data && data.statusCode === 200 && user) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              accessToken: tokens.access_token,
              refreshToken: tokens.refresh_token,
            };
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      if (trigger === "update" && session) {
        token = { ...token, user: session };
        return token;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.refreshToken = token.refreshToken as string;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
