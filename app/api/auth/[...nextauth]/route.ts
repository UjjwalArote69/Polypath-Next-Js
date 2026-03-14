import { prisma } from '@/lib/db'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import NextAuth, {NextAuthOptions} from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        CredentialsProvider({
            name: 'credentails',
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"}
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter an email and password');
                }

                const user = await prisma.user.findUnique({
                    where: {email: credentials.email}
                });

                if (!user || !user?.hashedPassword) {
                    throw new Error("No user found with this email");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                );

                if (!isCorrectPassword) {
                    throw new Error("Incorrect password");
                }

                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/signin'
    },
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};