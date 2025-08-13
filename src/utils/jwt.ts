import { jwtDecode } from 'jwt-decode';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
  exp: number;
  iat: number;
}

export const decodeJWT = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Error decoding JWT:', error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) return true;
  
  const currentTime = Date.now() / 1000;
  return payload.exp < currentTime;
};

export const getUserRole = (token: string): string | null => {
  const payload = decodeJWT(token);
  return payload?.role || null;
};

export const getUserEmail = (token: string): string | null => {
  const payload = decodeJWT(token);
  return payload?.email || null;
};
