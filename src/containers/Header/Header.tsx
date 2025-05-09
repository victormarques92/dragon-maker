import { Grid } from '@mui/material';
import React from 'react';
import { HeaderAccount } from './HeaderAccount';
import logo from '/images/logo.png';

export const Header: React.FC = () => {
  return (
    <Grid
      container
      spacing={3}
      sx={{ backgroundColor: theme => theme.palette.grey[900] }}
      px={3}
      py={2}
    >
      <Grid size="grow">
        <img src={logo} alt="Logo UEX" height="40px" />
      </Grid>

      <Grid size="auto">
        <HeaderAccount />
      </Grid>
    </Grid>
  );
};
