import axios from "axios";

export const fetchLocations = async (query: string = ""): Promise<Record<string, any>> => {
  try {
    return axios.get(`/api/locations?query=${query}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
