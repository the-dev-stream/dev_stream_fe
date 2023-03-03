/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { DefaultSession, TokenSet } from 'next-auth';
import LinkedInProvider from 'next-auth/providers/linkedin';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

interface User {
  session: DefaultSession,
  token: TokenSet
}

export const authOptions = {
  providers: [
    LinkedInProvider({
      clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_SECRET!
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET!
    }),
    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_CLIENT_SECRET!
    })
  ],
  baseUrl: process.env.NEXTAUTH_URL,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({session, token}: User){
      return {
        ...session,
        id: token.sub
      };
    },

    async signIn() {
      try {
        return true;
      } catch (erro) {
        console.log('Falha na autenticação:', erro);
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);
