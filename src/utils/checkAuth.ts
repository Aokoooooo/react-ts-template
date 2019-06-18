export type IAuthAsked = string[] | string;

export const check = (authAsked: IAuthAsked, authHad: string[] | string) => {
  if (!authAsked) {
    return true;
  }
  if (Array.isArray(authAsked)) {
    if (Array.isArray(authHad)) {
      if (authHad.some(i => authAsked.includes(i))) {
        return true;
      }
    } else if (authAsked.includes(authHad)) {
      return true;
    }
  }

  if (typeof authAsked === "string") {
    if (Array.isArray(authHad)) {
      if (authHad.some(i => i === authAsked)) {
        return true;
      }
    } else if (authHad === authAsked) {
      return true;
    }
  }

  return false;
};

const checkAuth = (authority: IAuthAsked) => {
  const authHad = ["user"];
  return check(authority, authHad);
};

export default checkAuth;
