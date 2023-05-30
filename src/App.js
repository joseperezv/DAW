import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteProvider from './providers/RouteProvider';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './themes';
import { IdentityProvider } from './providers/IdentityProvider';
function App() {
  return (
    <>
      <IdentityProvider>
        <ThemeProvider theme={darkTheme}>
          <Router>
            <RouteProvider />
          </Router>
        </ThemeProvider>
      </IdentityProvider>
    </>
  );
}

export default App;
