// import api from "./api";

// export const registerUser = async (data) => {
//   const response = await api.post("/auth/register", data);
//   return response.data;
// };

// export const loginUser = async (data) => {
//   const response = await api.post("/auth/login", data);
//   return response.data;
// };


import api from "./api";

export const registerUser = async (data) => {
  try {
    const response = await api.post("/auth/register", data);
    return response.data;
  } catch (error) {
    // Extract the exact error message sent by FastAPI's HTTPException
    const serverError = error.response?.data?.detail;
    
    // If it's a complex object (like our debug object), pass it through, otherwise wrap it
    throw new Error(
      typeof serverError === "object" 
        ? JSON.stringify(serverError) 
        : serverError || "Registration failed. Server error."
    );
  }
};

export const loginUser = async (data) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;
  } catch (error) {
    const serverError = error.response?.data?.detail;
    throw new Error(serverError || "Login failed. Invalid credentials.");
  }
};