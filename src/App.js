import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function WinnerAccouncement({ winner }){
  return (
    <div className = "winner-announcement">
      {winner} WINS!
    </div>
  );
}



function Board({ xIsNext, squares, onPlay, isGameOver}) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    if (isGameOver){
      return null;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    onPlay(nextSquares);
  }
  return (
    <>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function goBack(){
    if (currentMove > 0) {
      setCurrentMove(currentMove - 1);
    }
  }

  function restartGame(){
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }


  const winner = calculateWinner(currentSquares);
  const isGameOver = winner != null;

  let status;
  if (winner) {
    status = null;
  } else {
    status = (xIsNext ? 'X' : 'O');
  }

  return (
    <>
    <div className="game">
    <div className="status">
      <h2>TURN</h2>
      <p><strong>{status}</strong></p>
      </div>
      <div className="game-board">
        {isGameOver ? (
          <WinnerAccouncement winner = {winner} />
        ) : (
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} isGameOver={isGameOver}/>
        )}
      </div>
      <div className="game-info">
        <button className="buttons" onClick={restartGame}>
          Restart
        </button>
        <button className="buttons" onClick={goBack} disabled={currentMove === 0}>
          Back
        </button>
      </div>
    </div>
  </>);
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
