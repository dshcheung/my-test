export const SET_SECRET = "SET_SECRET"

export function setSecret(secret) {
  return {
    type: SET_SECRET,
    secret
  }
}
