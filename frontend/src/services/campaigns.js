import api from "./api";

export const getCampaigns = async () => {
  const response = await api.get("/campaigns");
  return response.data;
};

export const createCampaign = async (data) => {
  const response = await api.post(
    "/campaigns",
    data
  );

  return response.data;
};

export const runCampaign = async (
  campaignId
) => {
  const response = await api.post(
    `/campaigns/${campaignId}/run`
  );

  return response.data;
};