export const store = localStorage;
const TOKEN_EXPIRATION = "token_expiration";
const TOKEN = "unendlich_token";
function storeUser(exp: string, token: string) {
  store.setItem(TOKEN_EXPIRATION, exp);
  store.setItem(TOKEN, token);
}

export function setCredentials(data: {
  expiry: string;
  token: string;
  user: { username: string };
}) {}

export function getCredentials(data: {
  expiry: string;
  token: string;
  user: { username: string };
}) {}
