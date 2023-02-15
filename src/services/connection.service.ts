import axios from "axios";
import { IConnection } from "src/shared/types/connection.type";

const fetchConnections = async ({
  from = "",
  to = "",
}: {
  from: string;
  to: string;
}): Promise<{ data: { connections: Array<IConnection> } }> => {
  try {
    return await axios.get(`/api/connections?from=${from}&to=${to}`);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default {
  fetchConnections,
};
