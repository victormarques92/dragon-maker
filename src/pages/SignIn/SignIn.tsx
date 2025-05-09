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
import { useState } from 'react';
import {
  Controller,
  useForm,
  type SubmitHandler,
} from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '../../components';
import { AuthLayout } from '../../layouts';
import { useRegisteredUsers, useUser } from '../../stores';
import { validationSchema } from './validationSchema';

interface FormProps {
  email: string;
  password: string;
}

export const SignIn = () => {
  const { registeredUsers } = useRegisteredUsers();
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<FormProps> = data => {
    const foundUser = registeredUsers.find(
      user =>
        user.email === data.email &&
        user.password === data.password,
    );

    if (foundUser) {
      setUser(foundUser);

      return navigate('/');
    }

    if (!foundUser) {
      return toast({
        status: 'error',
        message: 'E-mail e/ou senha inválidos.',
      });
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid size={12}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field, formState }) => (
                <TextField
                  {...field}
                  label="E-mail *"
                  error={!!formState.errors.email}
                  helperText={
                    formState.errors.email?.message ?? ''
                  }
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
                  error={!!formState.errors.password}
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
                          onClick={handleTogglePassword}
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

                  {!!formState.errors.password?.message && (
                    <FormHelperText>
                      {formState.errors.password?.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </Grid>

          <Grid size={12}>
            <Button type="submit" fullWidth>
              Entrar
            </Button>
          </Grid>

          <Grid size={12}>
            <Typography variant="body2" textAlign="center">
              Ainda não tem uma conta?{' '}
              <LinkMUI component={Link} to="/register">
                Cadastre-se agora!
              </LinkMUI>
            </Typography>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};
