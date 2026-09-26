export const getCurrentFullPath = () => {
  return window.location.pathname + window.location.search;
};

export const saveRedirectPath = (path: string) => {
  sessionStorage.setItem("redirectAfterLogin", path);
};

export const getRedirectPath = () => {
  const stored = sessionStorage.getItem("redirectAfterLogin");
  sessionStorage.removeItem("redirectAfterLogin");

  const params = new URLSearchParams(window.location.search);
  const queryRedirect = params.get("redirect");

  return queryRedirect || stored || "/";
};
