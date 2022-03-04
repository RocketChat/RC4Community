import { createHash } from 'crypto';
export default function signoutkc(req,res){
    const [cookieCsrfToken,cookieCsrfTokenHash] =  req.cookies['next-auth.csrf-token'].split('|');
    const expectedCsrfTokenHash = createHash("sha256")
      .update(`${cookieCsrfToken}${process.env.NEXTAUTH_SECRET}`)
      .digest("hex");
    if(cookieCsrfTokenHash === expectedCsrfTokenHash && cookieCsrfToken === req.query.token){
        res.redirect(`${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/logout?redirect_uri=${encodeURIComponent(
            process.env.NEXTAUTH_URL
            )}`
        );
    } else {
        res.statusCode = 401;
        res.end();
    }
}