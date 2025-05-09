import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import React from 'react';
import {
  FormProvider,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { FieldAddress } from './FieldAddress';
import { FieldCep } from './FieldCep';
import { FieldCpf } from './FieldCpf';
import { FieldName } from './FieldName';
import { FieldPhone } from './FieldPhone';
import { validationSchema } from './validationSchema';

interface FormValues {
  address: string;
  cep: string;
  cpf: string;
  lat: number;
  lng: number;
  name: string;
  phone: string;
}

interface Props {
  open: boolean;
  initialValues?: any;
  title?: string;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
}

export const FormDialog: React.FC<Props> = ({
  open,
  initialValues,
  title,
  onClose,
  onSubmit,
}) => {
  const methods = useForm<FormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema) as any,
  });
  const { handleSubmit, reset: resetForm } = methods;

  const handleClose = () => {
    onClose();

    resetForm();
  };

  const handleOnSubmit: SubmitHandler<FormValues> = data => {
    onSubmit(data);

    resetForm();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      {title && <DialogTitle>{title}</DialogTitle>}

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleOnSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              {/* =========================== */}
              {/* NOME                        */}
              {/* =========================== */}
              <Grid size={12}>
                <FieldName />
              </Grid>

              {/* =========================== */}
              {/* TELEFONE                    */}
              {/* =========================== */}
              <Grid size={12}>
                <FieldPhone />
              </Grid>

              {/* =========================== */}
              {/* CPF                         */}
              {/* =========================== */}
              <Grid size={12}>
                <FieldCpf />
              </Grid>

              {/* =========================== */}
              {/* CEP                         */}
              {/* =========================== */}
              <Grid size={12}>
                <FieldCep />
              </Grid>

              {/* =========================== */}
              {/* ENDEREÇO                    */}
              {/* =========================== */}
              <Grid size={12}>
                <FieldAddress />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button
              variant="text"
              color="error"
              onClick={onClose}
            >
              Cancelar
            </Button>

            <Button type="submit" variant="text">
              Salvar
            </Button>
          </DialogActions>
        </form>
      </FormProvider>
    </Dialog>
  );
};
