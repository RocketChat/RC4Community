import fs from 'fs';
export const getGoogleCredsFromFile = (path) => {
  if(typeof window === 'undefined'){
    const cert = fs.readFileSync(path);
    return JSON.parse(cert);
  }
  throw new Error("This function can only be called from client side");
}