import urlJoin from 'url-join';
export function RocketChatOAuthProvider(options = {}) {
  return {
    id: "rocket.chat",
    name: "Rocket.Chat",
    type: "oauth",
    authorization:options.rocketChatUrl && urlJoin(options.rocketChatUrl,'/oauth/authorize'),
    scope: "openid email profile",
    token:process.env.NEXTAUTH_URL &&  urlJoin(process.env.NEXTAUTH_URL,'/api/auth/rocketchat-token-legacy'),
    userinfo:options.rocketChatUrl && urlJoin(options.rocketChatUrl,'/oauth/userinfo'),

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
