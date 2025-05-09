import { SortByAlphaOutlined } from '@mui/icons-material';
import { IconButton, Stack, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import type { OrderByTypesDTO } from '../../dtos';

interface Props {
  search: string;
  orderBy: OrderByTypesDTO;
  onChangeSearch: (value: string) => void;
  onChangeOrderBy: (value: OrderByTypesDTO) => void;
}

export const FilterList: React.FC<Props> = ({
  search,
  orderBy,
  onChangeSearch,
  onChangeOrderBy,
}) => {
  const handleOrderBy = useCallback(() => {
    onChangeOrderBy(orderBy === 'asc' ? 'desc' : 'asc');
  }, [orderBy, onChangeOrderBy]);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangeSearch(e.target.value);
    },
    [onChangeSearch],
  );

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <TextField
        label="Filtrar por nome ou CPF"
        onChange={handleSearchChange}
        value={search}
        fullWidth
      />

      <IconButton
        onClick={handleOrderBy}
        size="large"
        title="Ordenar"
      >
        <SortByAlphaOutlined />
      </IconButton>
    </Stack>
  );
};
