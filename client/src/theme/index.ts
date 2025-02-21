import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000',
      light: '#2c2c2c',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#757575',
      light: '#a4a4a4',
      dark: '#494949',
      contrastText: '#ffffff',
    },
    error: {
      main: '#000000',
      light: '#2c2c2c',
      dark: '#000000',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#757575',
    },
    divider: 'rgba(0, 0, 0, 0.12)',
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#000000',
          backgroundImage: 'linear-gradient(to right, #000000, #1a1a1a)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.15)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#000000',
          '&:hover': {
            backgroundColor: '#2c2c2c',
          },
        },
        outlined: {
          borderColor: '#000000',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderColor: '#000000',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
          '&:hover': {
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          '&.MuiChip-filledError': {
            backgroundColor: '#000000',
            color: '#ffffff',
          },
        },
        outlined: {
          borderColor: 'rgba(0, 0, 0, 0.23)',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundImage: 'linear-gradient(to bottom right, #ffffff, #fafafa)',
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.18)',
          border: '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(to bottom right, #ffffff, #fafafa)',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
        },
        elevation3: {
          boxShadow: '0 4px 24px rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: '#000000',
        },
      },
    },
  },
});

export default theme;
