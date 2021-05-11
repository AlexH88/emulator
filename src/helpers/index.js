export function getNameFile(data) {
  return data.split("=")[1];
}

export function isAuth() {
  if (
    localStorage.getItem("login") !== null &&
    localStorage.getItem("password") !== null
  ) {
    return true;
  }
  return false;
}

export function getBasicAuth() {
  if (
    localStorage.getItem("login") !== null &&
    localStorage.getItem("password") !== null
  ) {
    let login = localStorage.getItem("login");
    let password = localStorage.getItem("password");
    return {
      username: login,
      password: password,
    };
  }
  return null;
}
