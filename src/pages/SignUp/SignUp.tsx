import { yupResolver } from '@hookform/resolvers/yup';
import {
  VisibilityOffOutlined,
  VisibilityOutlined,
} from '@mui/icons-material';
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link as LinkMUI,
  OutlinedInput,
  TextField,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import {
  Controller,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '../../components';
import { AuthLayout } from '../../layouts';
import { useRegisteredUsers, useUser } from '../../stores';
import { validationSchema } from './validationSchema';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const { registeredUsers, setNewUser } = useRegisteredUsers();
  const { setUser } = useUser();
  const navigate = useNavigate();
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

  const onSubmit: SubmitHandler<FormValues> = data => {
    const emailExists = registeredUsers.some(
      user => user.email === data.email,
    );

    if (emailExists) {
      toast({
        status: 'error',
        message: 'E-mail já cadastrado',
      });

      return;
    }

    const newUser = { ...data, id: uuidv4() };

    setNewUser(newUser);
    setUser(newUser);
    navigate('/');
  };

  return (
    <AuthLayout title="Cadastrar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Nome *"
                  error={!!errors.name}
                  helperText={errors.name?.message ?? ''}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="E-mail *"
                  error={!!errors.email}
                  helperText={errors.email?.message ?? ''}
                />
              )}
            />
          </Grid>

          <Grid size={12}>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field, formState }) => (
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
                            formState.errors.password
                              ? 'error'
                              : 'default'
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
          </Grid>

          <Grid size={12}>
            <Button type="submit" fullWidth>
              Cadastrar
            </Button>
          </Grid>

          <Grid size={12}>
            <Typography variant="body2" textAlign="center">
              Já tem uma conta?{' '}
              <LinkMUI component={Link} to="/login">
                Fazer login!
              </LinkMUI>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
