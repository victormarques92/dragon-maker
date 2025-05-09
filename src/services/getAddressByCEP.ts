import axios from 'axios';
import type { CepDTO } from '../dtos';

export const getAddressByCEP = async (
  cep: string,
): Promise<CepDTO | null> => {
  const BASE_URL = import.meta.env.VITE_VIA_CEP_BASE_URL;

  const customCep = cep.replace(/\D/g, '');

  if (customCep.length !== 8) {
    console.warn('CEP inválido:', cep);

    return null;
  }

  try {
    const { data } = await axios.get(
      `${BASE_URL}/${customCep}/json/`,
    );

    if (data.erro) {
      console.warn('CEP não encontrado:', customCep);

      return null;
    }

    return data as CepDTO;
  } catch (error) {
    console.error('Erro ao buscar CEP:', error);

    return null;
  }
};
