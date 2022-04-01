import urlJoin from 'url-join';
export function RocketChatOAuthProvider(options = {}) {
  return {
    id: "rocket.chat",
    name: "Rocket.Chat",
    type: "oauth",
    authorization: urlJoin(options.rocketChatUrl,'/oauth/authorize'),
    scope: "openid email profile",
    token: urlJoin(process.env.NEXTAUTH_URL,'/api/auth/rocketchat-token-legacy'),
    userinfo: urlJoin(options.rocketChatUrl,'/oauth/userinfo'),

    async profile(profile) {
      return {
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture
      };
    },
    options
  };
}
