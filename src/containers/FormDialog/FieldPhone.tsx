import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { formatPhone } from '../../helpers';

export const FieldPhone: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="phone"
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          label="Telefone *"
          onChange={e =>
            field.onChange(formatPhone(e.target.value))
          }
          error={!!errors.phone}
          helperText={errors.phone?.message?.toString()}
        />
      )}
    />
  );
};
