// uses localhost:3000 for development and the domain provided in .env in prod
let url = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.NEXT_PUBLIC_ROCKET_CHAT_HOST;

export const rcURL = new URL(url);

// Use useSsl: false only if server url starts with http://
export const useSsl = () => !/http:\/\//.test(url);
