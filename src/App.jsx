import './App.css'
import StartGame from './StartGame.jsx'
import Game from './Game.jsx'
import { useState} from 'react';


function App() {
  
  const [hasGameStarted, setHasGameStarted] = useState(false);
  return (
    

    <main> 
        {hasGameStarted ? <Game/> : <StartGame onStartGame={() => setHasGameStarted(true)} />}
    </main>
  )
}




export default App
