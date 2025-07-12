import api  from "./axiosInstanceProvider";

export const exchangeGoogleTokenForJwtToken = async (
  googleCredential: string | undefined
) => {
  const response = await api.post("http://localhost:8080/api/auth/google", {
    token: googleCredential,
  });

  return response.data["token"];
};

export const saveToken = (token: string) => {
  localStorage.setItem('jwtToken', token);
};

export const getToken = (): string | null => {
  return localStorage.getItem('jwtToken');
};

export const removeToken = () => {
  localStorage.removeItem('jwtToken');
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};
