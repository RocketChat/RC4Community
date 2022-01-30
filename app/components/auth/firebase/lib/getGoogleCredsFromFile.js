import fs from 'fs';
export const getGoogleCredsFromFile = (path) => {
  if(typeof window === 'undefined'){
    const cert = fs.readFileSync(path);
    const dataFromFile = JSON.parse(cert);
    const returnData = {
      type: dataFromFile.type,
      projectId: dataFromFile.project_id,
      privateKeyId: dataFromFile.private_key_id,
      privateKey: dataFromFile.private_key,
      clientEmail: dataFromFile.client_email,
      clientId: dataFromFile.client_id,
      authUri: dataFromFile.auth_uri,
      tokenUri: dataFromFile.token_uri,
      authProviderX509CertUrl: dataFromFile.auth_provider_x509_cert_url,
      clientX509CertUrl: dataFromFile.client_x509_cert_url
    }
    return returnData;
  }
  throw new Error("This function can only be called from client side");
}
