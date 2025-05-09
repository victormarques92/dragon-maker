import { createTheme } from '@mui/material';

export const muiTheme = createTheme({
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        size: 'large',
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      defaultProps: {
        fullWidth: true,
      },
    },
    // MuiGrid: {
    //   styleOverrides: {
    //     root: {
    //       '&.MuiGrid-container': {
    //         marginInline: 0,
    //         width: '100%',
    //       },
    //     },
    //   },
    // },
    // MuiTooltip: {
    //   defaultProps: {
    //     arrow: true,
    //   },
    //   styleOverrides: {
    //     tooltip: {
    //       maxWidth: 'none',
    //     },
    //   },
    // },
    // MuiDialog: {
    //   styleOverrides: {
    //     paper: {
    //       backgroundColor: props.palette?.common?.white,
    //     },
    //   },
    // },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Montserrat',
  },
});
