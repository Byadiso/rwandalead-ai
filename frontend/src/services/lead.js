import api from "./api";

export const getLeads = async () => {
  const response =
    await api.get("/leads");

  return response.data;
};

export const updateLeadStage =
  async (
    leadId,
    stage
  ) => {

    const response =
      await api.put(
        `/leads/${leadId}/stage`,
        null,
        {
          params: { stage }
        }
      );

    return response.data;
};