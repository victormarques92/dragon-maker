import { TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

export const FieldName: React.FC = () => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name="name"
      defaultValue=""
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          label="Nome *"
          error={!!errors.name}
          helperText={errors.name?.message?.toString()}
        />
      )}
    />
  );
};
