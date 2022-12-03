import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import IAccount from "types/next_auth/account";
import iToken from "types/next_auth/token";
import IUser from "types/next_auth/user";
import ISession from "types/next_auth/session";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret:"5xT45s7AKNuQREg7gF9LoQSXwW/dL62hAEKKfk/rk8k=", //PUT YOUR OWN SECRET (command: openssl rand -base64 32)
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    strategy: "jwt",
  },
  debug: true,
  callbacks: {
    async session({ session, token, user }: {session: ISession, token: iToken, user: IUser }) {
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },
    async jwt({ token, user, account }: {token: iToken, user: IUser, account: IAccount, }) {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`
        );
        const data = await response.json();
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return token;
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);

export default Auth;
