import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

import { Card } from "../../services/cards.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Card[]>
) {
  const { data } = await axios.get<Card[]>("http://176.119.157.171:3000/cards");

  const sortedCards = data.sort((a: Card, b: Card): number =>
    a.rarity > b.rarity ? 1 : -1
  );

  res.json(sortedCards);
}
