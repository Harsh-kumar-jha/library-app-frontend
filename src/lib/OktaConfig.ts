export const OktaConfig = {
  clientId: process.env.CLIENT_ID,
  issuer: `https://${process.env.ISSUER}/oauth2/default`,
  redirectUri: "http://localhost:3000/login/callback",
  scopes: ["openid", "profile", "email"],
  pkce: true,
  disableHttpsChecks: true,
};
