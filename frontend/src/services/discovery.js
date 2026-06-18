import api from "./api";

export const runDiscovery =
  async (campaignId) => {

    const response =
      await api.post(
        `/discovery/${campaignId}/run`
      );

    return response.data;
};