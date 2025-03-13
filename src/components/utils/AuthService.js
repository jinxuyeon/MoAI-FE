import axiosInstance from "./axiosinstance";


export const loginUser = async (formData) => {
    try {
      const response = await axiosInstance.post("/member/login", formData);
      return response
    } catch (error) {
      throw error;
    }
  };