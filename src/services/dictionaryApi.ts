import axios from 'axios';
import { DictionaryResponse } from '@/types/dictionary';

const API_BASE_URL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const dictionaryApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchWord = async (word: string): Promise<DictionaryResponse> => {
  const response = await dictionaryApi.get<DictionaryResponse>(`/${word}`);
  return response.data;
};

export default dictionaryApi;

