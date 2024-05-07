import connectDB from '@/db/connectDb'
import User from '@/models/User'
import NextAuth from 'next-auth'
import bcrypt from 'bcryptjs'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
// import GitHubProvider from 'next-auth/providers/github'

const authOptions = NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {},
      async authorize(credentials, req) {
        try {
          connectDB()

          // Find user by email
          const user = await User.findOne({ email: credentials.email, provider: 'credentials' });
          if (!user) {
            return null
          }
          // Verify password
          const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
          if (!isPasswordValid) {
            return null
          }
          return user

        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET
    // }),
  ],
  // pages: {
  //   signIn: '/login',
  // },
  database: process.env.DATABASE_URL,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'google') {
        await connectDB()
        // Check if user already exists
        const existingUser = await User.findOne({ email: profile.email, provider: account.provider });
        if (!existingUser) {
          // Create new user
          const username = profile.email.split('@')[0];
          const newUser = new User({ email: profile.email, provider: account.provider, username: username, image: profile.picture });
          await newUser.save();
        }
      }
      return true
    },
    async session({ session, user, token }) {
      connectDB()
      const userData = await User.findOne({ email: session.user.email });
      session.user.id = userData._id.toString();
      return session
    },
  }
})

export { authOptions as GET, authOptions as POST }