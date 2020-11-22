import api from './api';

export interface Card {
  id: number;
  count?: number;
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

export const fetchUserCards = async (userId: string): Promise<Card[]> => {
  const { data } = await api.get<Card[]>(`/inventory/${userId}`);

  const sortedCards = data.sort((a: Card, b: Card): number => a.rarity > b.rarity ? 1 : -1);

  return sortedCards;
};

export const drawCard = async (userId: string): Promise<Card> => {
  const { data } = await api.get<Card>(`/draw/${userId}`);

  return data;
};

export const useCard = async (userId: string, cardId: string): Promise<void> => {
  const { data } = await api.get(`/use/${userId}/${cardId}`);

  return data;
};

