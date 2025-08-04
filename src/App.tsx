import { useState } from "react";

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    if (squares[i] || calculateWinner(squares)) return;
    const nextSquares = [...squares];
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const restart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  
  let status;
  if (winner) {
    status = ` ${winner} Wins!`;
  } else if (isDraw) {
    status = " It's a Draw!";
  } else {
    status = `${xIsNext ? "X" : "O"}'s Turn`;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
          Tic Tac Toe
        </h1>
        <p className="text-gray-500 text-lg">Classic game, modern design</p>
      </div>

      <div className="relative mb-8">
        <div className="grid grid-cols-3 gap-3 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
          {squares.map((square, i) => (
            <button
              key={i}
              onClick={() => handleClick(i)}
              className={`
                w-20 h-20 md:w-24 md:h-24 text-3xl md:text-4xl font-bold rounded-2xl
                transition-all duration-200 active:scale-95
                ${square === 'X' 
                  ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white shadow-lg' 
                  : square === 'O'
                  ? 'bg-gradient-to-br from-rose-400 to-rose-600 text-white shadow-lg'
                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-200 hover:border-gray-300'
                }
                ${!square && !winner && !isDraw ? 'hover:shadow-md cursor-pointer' : ''}
                ${winner || isDraw ? 'cursor-not-allowed' : ''}
              `}
              disabled={winner || isDraw || square}
            >
              {square}
            </button>
          ))}
        </div>

        <div className="absolute -top-2 -left-2 w-4 h-4 bg-indigo-200 rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-purple-200 rounded-full opacity-40"></div>
      </div>

      <div className="text-center mb-8">
        <div className={`
          inline-flex items-center px-6 py-3 rounded-full text-lg md:text-xl font-semibold
          ${winner 
            ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
            : isDraw
            ? 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border border-yellow-200'
            : 'bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 border border-indigo-200'
          }
        `}>
          {status}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xs">
        <button
          onClick={restart}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95"
        >
           New Game
        </button>
      </div>

      <div className="mt-8 flex gap-6 text-center">
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-1">
            X
          </div>
          <span className="text-sm text-gray-500">Player 1</span>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-rose-600 rounded-lg flex items-center justify-center text-white font-bold text-sm mb-1">
            O
          </div>
          <span className="text-sm text-gray-500">Player 2</span>
        </div>
      </div>

      <div className="mt-12 text-center text-gray-400 text-sm">
        <p>Touch a square to make your move</p>
      </div>
    </div>
  );
};

function calculateWinner(squares: (string | null)[]): string | null {
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
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;