import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { formatCPF } from '../../helpers';

export const FieldCpf: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="cpf"
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          label="CPF *"
          onChange={e =>
            field.onChange(formatCPF(e.target.value))
          }
          error={!!errors.cpf}
          helperText={errors.cpf?.message?.toString()}
        />
      )}
    />
  );
};
