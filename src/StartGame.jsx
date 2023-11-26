export default function StartGame({ onStartGame }){
    return <div className="startGameContainer"><h1 className="title">QuizApp</h1>
    <p className="instructions">The random sport question game</p>
    <button 
                onClick={onStartGame}
            >
            Start Quiz
            </button>
    </div>
  }

  