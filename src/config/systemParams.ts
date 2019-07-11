const { REACT_APP_PUBLIC_URL } = process.env;
export const basePath =
  !REACT_APP_PUBLIC_URL || REACT_APP_PUBLIC_URL === "/"
    ? ""
    : REACT_APP_PUBLIC_URL;
