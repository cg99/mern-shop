import { useState } from 'react';

export default function useToken() {
  const getToken = (): string | null => {
    const tokenString = localStorage.getItem('ecomAccessToken');
    const userToken = tokenString ? JSON.parse(tokenString) : null;

    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: string | null): void => {
    localStorage.setItem('ecomAccessToken', JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token
  }
}