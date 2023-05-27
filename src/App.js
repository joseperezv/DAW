import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import RouteProvider from './providers/RouteProvider';
import { ThemeProvider } from '@mui/material/styles';
import { darkTheme } from './themes';
function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <Router>
          <Header />
          <RouteProvider />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
