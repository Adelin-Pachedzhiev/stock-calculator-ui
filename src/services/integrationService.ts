import api from "./axiosInstanceProvider";

export interface Integration {
  id: string;
  platform: string;
  lastChangedAt: string;
}

export const getIntegrations = async (): Promise<Integration[]> => {
  const response = await api.get("/integration");
  return response.data;
};

export const deleteIntegration = async (id: string): Promise<void> => {
  await api.delete(`/integration/${id}`);
};

export const syncIntegration = async (id: string): Promise<void> => {
  await api.post(`/integration/${id}/sync`);
}; 