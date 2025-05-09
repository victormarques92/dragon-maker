import { TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from '../../components';
import { formatCEP } from '../../helpers';
import { getAddressByCEP, getLocation } from '../../services';

export const FieldCep: React.FC = () => {
  const { control, setValue } = useFormContext();

  const handleCep = useCallback(
    async (cepValue: string) => {
      const formattedCep = formatCEP(cepValue);
      setValue('cep', formattedCep);

      const digitsOnly = formattedCep.replace(/\D/g, '');

      if (digitsOnly.length === 8) {
        try {
          const addressData = await getAddressByCEP(
            formattedCep,
          );

          if (addressData) {
            const fullAddress = `${addressData.logradouro} - ${addressData.bairro}, ${addressData.localidade} - ${addressData.uf}, Brasil`;
            const location = await getLocation(fullAddress);

            setValue('address', fullAddress);
            setValue('lat', location?.lat);
            setValue('lng', location?.lng);
          }
        } catch (error) {
          console.error('Erro ao buscar CEP:', error);

          toast({
            status: 'error',
            message:
              'CEP não encontrado. Por favor, tente novamente.',
          });
        }
      }
    },
    [setValue],
  );

  return (
    <Controller
      control={control}
      name="cep"
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          label="CEP *"
          onChange={e => {
            const value = e.target.value;

            field.onChange(value);
            handleCep(value);
          }}
          error={!!errors.cep}
          helperText={errors.cep?.message?.toString()}
        />
      )}
    />
  );
};
