export type CheckAuthFunctionType = (authHad: AuthHadType) => boolean;
type BaseAuthAskedType =
  | string[]
  | string
  | null
  | undefined
  | CheckAuthFunctionType;

interface IBaseAuthAskedObject {
  onCheck: BaseAuthAskedType;
  onFail?: () => void;
}

export type AuthAskedType =
  | BaseAuthAskedType
  | IBaseAuthAskedObject
  | IBaseAuthAskedObject[];

export type AuthHadType = null | undefined | string | string[];

export let authHad: AuthHadType = null;
export const updateAuthHad = (newAuth: AuthHadType) => {
  authHad = newAuth;
};

/**
 *
 * @param authAsked
 * @param useCallback call `onFail` when check failed
 */
export function checkAuth(
  authAsked: AuthAskedType,
  useCallback?: boolean
): boolean;
/**
 *
 * @param authAsked
 * @param defaultCallback default `onFail` function
 * @param useCallback call `onFail` when check failed
 */
export function checkAuth(
  authAsked: AuthAskedType,
  defaultCallback: () => void,
  useCallback?: boolean
): boolean;
export function checkAuth(
  authAsked: AuthAskedType,
  defaultCallback?: boolean | (() => void),
  useCallback?: boolean
) {
  const useCb =
    typeof defaultCallback === "boolean" ? defaultCallback : useCallback;

  const onFail = (passed: boolean, callback?: () => void) => {
    if (!passed && useCb) {
      if (typeof callback === "function") {
        callback();
      } else if (typeof defaultCallback === "function") {
        defaultCallback();
      }
    }
  };

  if (!authAsked) {
    return true;
  }

  const checkHelper = (
    authAsked: AuthAskedType,
    authHad: AuthHadType,
    callback?: () => void
  ): boolean => {
    if (!authAsked) {
      return true;
    }

    if (typeof authAsked === "function") {
      const passed = authAsked(authHad);
      onFail(passed, callback);
      return passed;
    }

    if (typeof authAsked === "string") {
      const passed = authAsked === authHad;
      onFail(passed, callback);
      return passed;
    }

    if (Array.isArray(authAsked)) {
      return authAsked.some((i: string | IBaseAuthAskedObject) =>
        checkHelper(i, authHad, callback)
      );
    }

    return checkHelper(authAsked.onCheck, authHad, authAsked.onFail);
  };

  if (Array.isArray(authHad)) {
    return authHad.some(i => checkHelper(authAsked, i));
  }
  return checkHelper(authAsked, authHad);
}

export default checkAuth;
