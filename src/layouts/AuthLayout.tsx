import { Box, Stack, Typography } from '@mui/material';

import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../stores';
import bgAuth from '/images/bg-image.jpg';
import logo from '/images/logo.png';

interface Props {
  children: ReactNode;
  title: string;
}

export const AuthLayout: React.FC<Props> = ({
  children,
  title,
}) => {
  const { user } = useUser();

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <Stack
      sx={{
        alignItems: 'center',
        backgroundImage: `url(${bgAuth})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '100vh',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Stack
        bgcolor="white"
        borderRadius={2}
        maxWidth={536}
        width="100%"
        overflow="hidden"
      >
        <Stack
          sx={{
            backgroundColor: theme => theme.palette.grey[900],
          }}
          px={3}
          py={4}
          alignItems="center"
        >
          <img src={logo} alt="Logo UEX" width="50%" />
        </Stack>

        <Box px={{ xs: 3, sm: 6 }} pt={3} pb={6}>
          <Typography
            variant="h3"
            textAlign="center"
            fontWeight={600}
            mb={5}
          >
            {title}
          </Typography>

          {children}
        </Box>
      </Stack>
    </Stack>
  );
};
