import NextAuth from "next-auth"
import KeyCloakProvider from "next-auth/providers/keycloak";

export default async function handleAuth(req,res){
    return await NextAuth({
        providers: [
            KeyCloakProvider({
                clientId: process.env.KEYCLOAK_ID,
                clientSecret: process.env.KEYCLOAK_SECRET,
                issuer: process.env.KEYCLOAK_ISSUER,
                profile(profile){
                    // profile -> returned from keycloak server.
                    return {
                        id: profile.sub,
                        name: profile.name ?? profile.preferred_username,
                        email: profile.email,
                        image: profile.picture
                    }
                }
            }),
        ],
        callbacks: {
            async jwt({ token, account, profile }) {
                // Called when generating our custom token
                // Persist the OAuth access_token to the token right after signin
                if (account) {
                    token.accessToken = account.access_token;
                }
                return token
            },
            async session({session,token}){
                session.user.id = token.sub;
                session.user.sub = token.sub;
                session.user.image = token.picture;
                return session;
            }
        }
    })(req,res);
}
