import api from "./api";

export const getAnalysis =
  async (leadId) => {

    const response =
      await api.get(
        `/analysis/${leadId}`
      );

    return response.data;
};