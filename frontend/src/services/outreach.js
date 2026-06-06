import api from "./api";

export const generateOutreach =
  async (leadId) => {

    const response =
      await api.get(
        `/outreach/${leadId}`
      );

    return response.data;
};