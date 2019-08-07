export type CheckAuthFunctionType = (authHad: AuthAskedType) => boolean;
export type AuthAskedType =
  | string[]
  | string
  | null
  | undefined
  | boolean
  | CheckAuthFunctionType;

export type AuthHadType = null | undefined | string | string[];

export let authHad: AuthHadType = null;
export const updateAuthHad = (newAuth: AuthHadType) => {
  authHad = newAuth;
};

export const check = (authAsked: AuthAskedType) => {
  if (!authAsked) {
    return true;
  }
  if (!authHad) {
    return false;
  }

  const checkHelper = (
    authAsked: AuthAskedType,
    authHad: AuthHadType
  ): boolean => {
    if (Array.isArray(authAsked)) {
      return authAsked.some(i => checkHelper(i, authHad));
    }

    if (typeof authAsked === "function") {
      return authAsked(authHad);
    }

    if (typeof authAsked === "string") {
      return authAsked === authHad;
    }
    throw new Error(
      "the type of the authAsked should be a array/string/function"
    );
  };
  if (Array.isArray(authHad)) {
    return authHad.some(i => checkHelper(authAsked, i));
  }
  return checkHelper(authAsked, authHad);
};

const checkAuth = (authority: AuthAskedType) => {
  return check(authority);
};

export default checkAuth;
