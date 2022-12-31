import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import IAccount from 'types/next_auth/account';
import iToken from 'types/next_auth/token';
import IUser from 'types/next_auth/user';
import ISession from 'types/next_auth/session';

const options = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET, //PUT YOUR OWN SECRET (command: openssl rand -base64 32)
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  session: {
    strategy: 'jwt',
  },
  debug: true,
  callbacks: {
    async session({ session, token, user }: { session: ISession; token: iToken; user: IUser }) {
      session.jwt = token.jwt;
      session.id = token.id;
      return session;
    },
    async jwt({ token, user, account }: { token: iToken; user: IUser; account: IAccount }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/${account.provider}/callback?access_token=${account?.access_token}`,
        );
        const data = await response.json();
        if (data.jwt) {
          await updateUser(data.user.id, data.user.username, user.image);
        }
        token.jwt = data.jwt;
        token.id = data.user.id;
      }
      return token;
    },
  },
};

const Auth = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, options);
};

export default Auth;

const updateUser = async (userid: number, username: string, avatar_url: string) => {
  const data = await fetch(`http://localhost:1337/api/users/updateLoggedInUser`, {
    method: 'POST',
    body: JSON.stringify({ data: { username: username, avatar_url: avatar_url, userid: userid } }),
    headers: {
      Authorization: 'Bearer ' + process.env.USERS_API_TOKEN,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const json = await data.json();
  return json;
};
