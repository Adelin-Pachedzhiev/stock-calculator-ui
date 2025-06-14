import api  from "./axiosInstanceProvider";

export const exchangeGoogleTokenForJwtToken = async (
  googleCredential: string | undefined
) => {
  const response = await api.post("http://localhost:8080/api/auth/google", {
    token: googleCredential,
  });

  return response.data["token"];
};
