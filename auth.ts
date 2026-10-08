import NextAuth from "next-auth";
import NeonAdapter from "@auth/neon-adapter";
import { Pool } from "@neondatabase/serverless";
import Google from "next-auth/providers/google";
import { getUser, checkInvites } from "@/app/lib/data";
 
// *DO NOT* create a `Pool` here, outside the request handler.
 
export const { handlers, auth, signIn, signOut } = NextAuth(() => {
  // Create a `Pool` inside the request handler.
  const pool = new Pool({ connectionString: process.env.DATABASE_URL })
  return {
    adapter: NeonAdapter(pool),
    providers: [
        Google(
            {
                profile(profile) {
                    return {
                        id: profile.sub,
                        email: profile.email,
                        name: profile.name,
                        image: profile.picture,
                        role: "member",
                    };
                }
            }
        )
    ],
    callbacks: {
        async signIn({ user, profile }) {
            const email = profile?.email || user?.email;

            if (!email) {
                return false; // 🚫 stop sign-in if no email (vibe coded asl)
            }
            
            const userbong = await getUser(email)
            const invite = await checkInvites(email)
            console.log(userbong)
            console.log(invite)
            if (userbong || invite) {
                return true
            } else { return false }
        },
        session({ session, user }) {
            session.user.role = user.role; // Add role to session
            return session;
        },
        async redirect({ url, baseUrl }) {
            // Allows relative origin redirects
            if (url.startsWith("/")) return `${baseUrl}${url}`
            // Allows callback URLs on the same origin
            else if (new URL(url).origin === baseUrl) return url
            return baseUrl
        }
    },
    pages: {
        error: "/error",
    }
  }
})