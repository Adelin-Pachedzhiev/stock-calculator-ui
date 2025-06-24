import api from "./axiosInstanceProvider";

export const postTrading212Token = async (secret: string): Promise<void> => {
  await api.post("/integration/trading212", { secret });
}; 