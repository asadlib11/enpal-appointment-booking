import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import CustomerBooking from './pages/CustomerBooking';
import SalesManager from './pages/SalesManager';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Button color="inherit" component={Link} to="/">
                Book Appointment
              </Button>
              <Button color="inherit" component={Link} to="/manager">
                Sales Manager
              </Button>
            </Toolbar>
          </AppBar>

          <Container>
            <Routes>
              <Route path="/" element={<CustomerBooking />} />
              <Route path="/manager" element={<SalesManager />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
