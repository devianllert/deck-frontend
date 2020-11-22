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
  const { data } = await api.get<Card[]>('/api/cards');

  return data;
};

export const fetchUserCards = async (userId: string): Promise<Card[]> => {
  const { data } = await api.get<Card[]>(`/api/inventory/${userId}`);

  return data;
};

export const drawCard = async (userId: string): Promise<Card> => {
  const { data } = await api.get<Card>(`/api/draw/${userId}`);

  return data;
};

export const useCard = async (userId: string, cardId: string): Promise<void> => {
  const { data } = await api.get(`/api/use/${userId}/${cardId}`);

  return data;
};

