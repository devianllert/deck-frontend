import api from './api';

export interface Card {
  id: number;
  title: string;
  description: string;
  rarity: number;
  drops: boolean;
}

export const fetchAllCards = async (): Promise<Card[]> => {
  const { data } = await api.get<Card[]>('/cards');

  const sortedCards = data.sort((a: Card, b: Card): number => a.rarity > b.rarity ? 1 : -1);

  return sortedCards;
};

export const drawCard = async (userId: number): Promise<Card> => {
  const { data } = await api.post<Card>(`/draw/${userId}`);

  return data;
};

export const useCard = async (userId: number, cardId: number): Promise<void> => {
  const { data } = await api.post(`/use/${userId}/${cardId}`);

  return data;
};

