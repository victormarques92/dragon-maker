import { TextField } from '@mui/material';
import React, { useCallback } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { formatCPF } from '../../helpers';

export const FieldCpf: React.FC = () => {
  const { control } = useFormContext();

  const handleFormatCpf = useCallback((value: string) => {
    return formatCPF(value);
  }, []);

  return (
    <Controller
      name="cpf"
      control={control}
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          label="CPF *"
          onChange={e => field.onChange(e.target.value)}
          value={handleFormatCpf(field.value)}
          error={!!errors.cpf}
          helperText={errors.cpf?.message?.toString()}
        />
      )}
    />
  );
};
