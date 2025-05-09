import type { ContactDTO, OrderByTypesDTO } from '../dtos';

export const sortByName = (
  list: ContactDTO[],
  order: OrderByTypesDTO = 'asc',
): ContactDTO[] => {
  return [...list].sort((a, b) => {
    const result = a.name.localeCompare(b.name, 'pt-BR');

    return order === 'asc' ? result : -result;
  });
};
