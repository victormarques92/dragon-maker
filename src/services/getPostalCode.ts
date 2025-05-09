import { getGeocode } from 'use-places-autocomplete';

export const getPostalCode = async (
  address: string,
): Promise<string | null> => {
  if (!address) {
    console.warn('Endereço inválido.');

    return null;
  }

  try {
    const results = await getGeocode({ address });

    const addressComponents = results?.[0]?.address_components;

    if (
      !addressComponents ||
      !Array.isArray(addressComponents)
    ) {
      return null;
    }

    const postalCodeComponent = addressComponents.find(
      component => component.types.includes('postal_code'),
    );

    return postalCodeComponent?.long_name ?? null;
  } catch (error) {
    console.error('Erro ao buscar o CEP:', error);

    return null;
  }
};
