import { yupResolver } from '@hookform/resolvers/yup';
import {
  DeleteOutlineOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import {
  Controller,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../components';
import { useRegisteredUsers, useUser } from '../../stores';
import { validationSchema } from './validationSchema';

interface FormValues {
  password: string;
}

export const HeaderDeleteAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user, removeUser } = useUser();
  const { removeRegisteredUser } = useRegisteredUsers();
  const [openModal, setOpenModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(validationSchema),
  });

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const handleOpenModal = useCallback(
    () => setOpenModal(true),
    [],
  );
  const handleCloseModal = useCallback(
    () => setOpenModal(false),
    [],
  );

  const onSubmit: SubmitHandler<FormValues> = data => {
    if (!user) {
      toast({
        status: 'error',
        message: 'Usuário não encontrado',
      });

      return;
    }

    if (user?.password !== data.password) {
      toast({
        status: 'error',
        message: 'Senha incorreta. Por favor, tente novamente.',
      });

      return;
    }

    removeRegisteredUser(user.id);
    removeUser();
    navigate('/login');
  };

  return (
    <>
      <Button
        variant="text"
        color="error"
        size="small"
        fullWidth
        startIcon={<DeleteOutlineOutlined />}
        onClick={handleOpenModal}
      >
        Remover conta
      </Button>

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Remover conta</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <DialogContentText mb={3}>
              Para deletar sua conta, informe sua senha de
              acesso.
            </DialogContentText>

            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <FormControl
                  {...field}
                  error={!!errors.password}
                >
                  <InputLabel htmlFor="password">
                    Password
                  </InputLabel>

                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          color={
                            errors.password ? 'error' : 'default'
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />

                  {!!errors.password?.message && (
                    <FormHelperText>
                      {errors.password?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </DialogContent>

          <DialogActions>
            <Button variant="text" onClick={handleCloseModal}>
              Cancelar
            </Button>

            <Button type="submit" variant="text" color="error">
              Remover contar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
