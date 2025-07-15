import './App.css';
import './styles/glass-button.css';
import SessionProvider from './context/SessionProvider';
import { FavoritesProvider } from './context/FavoritesProvider';
import Routing from "./routes/Routing";

function App() {
  return (
    <SessionProvider>
      <FavoritesProvider>
        <Routing />
      </FavoritesProvider>
    </SessionProvider>
  );
}

export default App;
