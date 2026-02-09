import { useState } from 'react'
import './styles.css'

const winConditions: number[][] = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];


function checkWin(player: string, condition: number[], board: string[]) {
  let x: boolean = board[condition[0]] == board[condition[1]];
  let y: boolean = board[condition[1]] == board[condition[2]];
  let z: boolean = board[condition[0]] == player;
  return (x && y && z);
}


function App() {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [gameOver, setGameOver] = useState(false);
  const [totalPlays, setTotalPlays] = useState(0);
  const [turn, setTurn] = useState({
    player: (Math.round(Math.random()) == 0 ? "X" : "O"),
    winner: false,
    winningCombo: [] as number[]
  });

  return (
    <>
      <div id="container">
        <i><div className="gametext">{
          (gameOver && turn.winner) ? `${turn.player} Wins!` : "Tic Tac Toe"
        }</div></i>

        <div className="gameboard">
          {board.map((elem, i) => <div key={i} id={`${i}`} onClick={(eventObj) => {
            const target = eventObj.target as HTMLDivElement;
            const spotID: number = Number(target.id);
            let newBoard: string[];
            let newTurn;
      
            if (!board[spotID] && !gameOver) {
              newBoard = [...board];
              newBoard[spotID] = turn.player;
              setBoard(newBoard);
              setTotalPlays((prev) => (prev + 1))
              newTurn = {...turn};

              for (let i = 0; i <= 7; ++i) {
                if (checkWin(turn.player, winConditions[i], newBoard)) {
                  newTurn.winner = true;
                  newTurn.winningCombo = winConditions[i];
                  setGameOver(true);
                  setTurn(newTurn);
                  return;
                }
              }

              if (totalPlays == 8) {
                setGameOver(true);
                return;
              }

              newTurn.player = turn.player == "X" ? "O" : "X";
              setTurn(newTurn);
            }

          }}>{elem}</div>)}

        </div>

        <button id="restartbtn">Restart</button>
    </div>
    </>
  )
}


export default App
