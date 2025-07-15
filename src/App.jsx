import './App.css'
import './styles/glass-button.css'
import SessionProvider from './context/SessionProvider';

import Routing from "./routes/Routing";

function App() {

  return (
    <SessionProvider>
      <Routing />
    </SessionProvider>
  )

}

export default App
