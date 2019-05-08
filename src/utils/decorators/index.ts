// tslint:disable-next-line:ban-types
export const bind = <T extends Function>(
  target: object,
  key: string,
  descriptor: TypedPropertyDescriptor<T>
): TypedPropertyDescriptor<T> | void => {
  if (!descriptor || typeof descriptor.value !== "function") {
    throw new Error(
      `Only function could be decorated with @bind.(${key} is ${typeof descriptor.value})`
    );
  }

  return {
    configurable: true,
    get(this: T): T {
      const bound: T = descriptor.value!.bind(this);
      Object.defineProperty(this, key, {
        value: bound,
        configurable: true,
        writable: true
      });
      return bound;
    }
  };
};
