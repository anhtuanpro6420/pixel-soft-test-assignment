import axios from "axios";

export const fetchConnections = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}): Promise<Record<string, any>> => {
  try {
    return axios.get(`/api/connections?from=${from}&to=${to}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
