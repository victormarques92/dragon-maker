import { getGeocode, getLatLng } from 'use-places-autocomplete';

interface Location {
  lat: number;
  lng: number;
}

export const getLocation = async (
  address: string,
): Promise<Location | null> => {
  if (!address) {
    console.warn('Endereço vazio ou inválido.');

    return null;
  }

  try {
    const results = await getGeocode({ address });

    if (!results.length) {
      console.warn(
        'Nenhum resultado encontrado para o endereço:',
        address,
      );

      return null;
    }

    const { lat, lng } = getLatLng(results[0]);

    return { lat, lng };
  } catch (error) {
    console.error('Erro ao obter geolocalização:', error);

    return null;
  }
};
