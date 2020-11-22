import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { userId, cardId },
  } = req;

  await axios.get(`http://176.119.157.171:3000/use/${userId}/${cardId}`);

  res.statusCode = 200;
  res.end();
}
