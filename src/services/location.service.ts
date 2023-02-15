import axios from "axios";

const fetchLocations = async (
  query = ""
): Promise<{ data: { stations: Array<{ name: string; id: string }> } }> => {
  try {
    return await axios.get(`/api/locations?query=${query}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  fetchLocations,
};
