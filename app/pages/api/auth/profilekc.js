export default async function profilekc(req,res){
    res.redirect(`${process.env.KEYCLOAK_ISSUER}/account`);
}
