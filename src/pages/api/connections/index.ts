import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { IResponse } from "src/shared/types/common.interface";

export default async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  if (req.method === "GET") {
    try {
      const {
        query: { from, to },
      } = req || {};
      const { data } = await axios.get(
        `http://transport.opendata.ch/v1/connections?from=${from}&to=${to}`
      );
      return res.status(200).json(data);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: true,
        message: "Something went wrong",
      });
    }
  }
}
