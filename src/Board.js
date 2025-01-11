import React, { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board() {
  const [history, setHistory] = useState([Array(9).fill('')]); // История ходов
  const [currentMove, setCurrentMove] = useState(0); // Текущий ход
  const [onPlay, setOnPlay] = useState(true); // Возможность продолжать игру
  const [gameStatus, setGameStatus] = useState(''); // Текущий статус игры
  const whoIsNext = currentMove % 2 === 0; // Определяем, чей сейчас ход (X или O)

  function checkWinner(squares) {
    const winLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winLines.length; i++) {
      const [a, b, c] = winLines[i];
      if (squares[a] === squares[b] && squares[a] === squares[c] && squares[a] !== '')
        return squares[a];
    }

    return null;
  }

  function onSquareClick(i) {
    const currentSquares = history[currentMove];
    if (currentSquares[i] !== '' || !onPlay) return; // Игнорируем клик, если клетка занята или игра окончена

    const nextSquares = currentSquares.slice();
    nextSquares[i] = whoIsNext ? 'X' : 'O'; // Записываем ход X или O

    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1); // Обновляем текущий ход

    const winner = checkWinner(nextSquares);
    if (winner) {
      setOnPlay(false);
      setGameStatus(winner + ' is the winner!');
    } else if (!nextSquares.includes('')) {
      setOnPlay(false);
      setGameStatus("It's a draw!");
    } else {
      setGameStatus('Next turn: ' + (whoIsNext ? 'O' : 'X'));
    }
  }

  function jumpTo(move) {
    setCurrentMove(move); // Переход к выбранному ходу
    setOnPlay(move === history.length - 1); // Если это последний ход, можно продолжать игру
    setGameStatus('');
  }

  function restartGame() {
    setHistory([Array(9).fill('')]); // Сбрасываем историю ходов
    setCurrentMove(0); // Возвращаемся к началу игры
    setOnPlay(true); // Включаем возможность игры
    setGameStatus(''); // Сбрасываем статус игры
  }

  const currentSquares = history[currentMove];
  const moves = history.map((squares, move) => {
    const description = move === 0 ? 'Go to game start' : `Go to move #${move}`;
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="row">
        <Square value={currentSquares[0]} onSquareClick={() => onSquareClick(0)} />
        <Square value={currentSquares[1]} onSquareClick={() => onSquareClick(1)} />
        <Square value={currentSquares[2]} onSquareClick={() => onSquareClick(2)} />
      </div>
      <div className="row">
        <Square value={currentSquares[3]} onSquareClick={() => onSquareClick(3)} />
        <Square value={currentSquares[4]} onSquareClick={() => onSquareClick(4)} />
        <Square value={currentSquares[5]} onSquareClick={() => onSquareClick(5)} />
      </div>
      <div className="row">
        <Square value={currentSquares[6]} onSquareClick={() => onSquareClick(6)} />
        <Square value={currentSquares[7]} onSquareClick={() => onSquareClick(7)} />
        <Square value={currentSquares[8]} onSquareClick={() => onSquareClick(8)} />
      </div>
      <h5 className="status">{gameStatus}</h5>
      <button onClick={restartGame}>Restart!</button>
      <ol>{moves}</ol>
    </>
  );
}

export default Board;
