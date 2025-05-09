import { Autocomplete, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { getLocation, getPostalCode } from '../../services';

export const FieldAddress: React.FC = () => {
  const { control, setValue, watch } = useFormContext();

  const {
    ready,
    setValue: setPlacesValue,
    suggestions: { data },
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
  });

  const handleSelect = useCallback(
    async (address: string) => {
      if (!address) return;

      setPlacesValue(address, false);
      clearSuggestions();

      const [postalCode, location] = await Promise.all([
        getPostalCode(address),
        getLocation(address),
      ]);

      setValue('cep', postalCode ?? '');
      setValue('lat', location.lat);
      setValue('lng', location.lng);
    },
    [setPlacesValue, clearSuggestions, setValue],
  );

  return (
    <Controller
      name="address"
      control={control}
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <Autocomplete
          getOptionLabel={opt => opt.description || ''}
          filterOptions={opt => opt}
          options={data}
          noOptionsText="Endereço não encontrado"
          onChange={(_, newValue) => {
            const address = newValue?.description ?? '';

            handleSelect(address);
            field.onChange(address);
          }}
          inputValue={field.value}
          disabled={!ready || !watch('cep')}
          renderInput={params => (
            <TextField
              {...params}
              label="Endereço"
              error={!!errors.address}
              helperText={errors.address?.message?.toString()}
              onChange={e => {
                const value = e.target.value;

                field.onChange(value);
                setPlacesValue(value);
              }}
            />
          )}
        />
      )}
    />
  );
};
