
export function userToken() {
  
  const { token: localStorageToken } = JSON.parse(localStorage.getItem('persist:authUser')) || {};
  const { token: sessionStorageToken } = JSON.parse(sessionStorage.getItem('persist:authUser')) || {};

  return localStorageToken || sessionStorageToken || null;
}