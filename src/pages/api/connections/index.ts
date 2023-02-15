import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { IResponse } from "src/shared/types/common.interface";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<IResponse>
) {
  if (request.method === "GET") {
    try {
      const {
        query: { from = "", to = "" },
      } = request || {};
      const { data }: { data: IResponse } = await axios.get(
        `http://transport.opendata.ch/v1/connections?from=${from as string}&to=${to as string}`
      );
      return response.status(200).json(data);
    } catch (error) {
      console.log(error);
      return response.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }
  }
  return response.status(404).json({
    error: true,
    message: "Not found error",
  });
}
