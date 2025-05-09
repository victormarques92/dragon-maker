import { ThemeProvider as ThemeProviderMUI } from '@mui/material/styles';
import type { ReactNode } from 'react';
import './global.css';
import { muiTheme } from './muiTheme';

interface Props {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: Props) => {
  return (
    <ThemeProviderMUI theme={muiTheme}>
      {children}
    </ThemeProviderMUI>
  );
};
