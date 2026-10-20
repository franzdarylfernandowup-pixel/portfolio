import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Reveal from './Reveal'

const LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

function getWinner(board) {
  for (const [a, b, c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { player: board[a], line: [a, b, c] }
    }
  }
  return null
}

// Computer: win if it can, block you if needed, take center, else random
function pickMove(board) {
  const empty = board
    .map((v, i) => (v ? null : i))
    .filter((v) => v !== null)

  for (const i of empty) {
    const t = [...board]
    t[i] = 'O'
    if (getWinner(t)?.player === 'O') return i
  }

  for (const i of empty) {
    const t = [...board]
    t[i] = 'X'
    if (getWinner(t)?.player === 'X') return i
  }

  if (!board[4]) return 4

  return empty[Math.floor(Math.random() * empty.length)]
}

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [playerTurn, setPlayerTurn] = useState(true)
  const [score, setScore] = useState({ you: 0, cpu: 0, draw: 0 })

  const result = getWinner(board)
  const isDraw = !result && board.every(Boolean)
  const gameOver = Boolean(result) || isDraw

  function finish(newBoard) {
    const w = getWinner(newBoard)
    if (w) {
      const key = w.player === 'X' ? 'you' : 'cpu'
      setScore((s) => ({ ...s, [key]: s[key] + 1 }))
    } else if (newBoard.every(Boolean)) {
      setScore((s) => ({ ...s, draw: s.draw + 1 }))
    }
  }

  function handleClick(i) {
    if (!playerTurn || board[i] || gameOver) return
    const next = [...board]
    next[i] = 'X'
    setBoard(next)
    finish(next)
    setPlayerTurn(false)
  }

  // Computer's turn
  useEffect(() => {
    if (playerTurn || gameOver) return
    const t = setTimeout(() => {
      const move = pickMove(board)
      const next = [...board]
      next[move] = 'O'
      setBoard(next)
      finish(next)
      setPlayerTurn(true)
    }, 600)
    return () => clearTimeout(t)
  }, [playerTurn, gameOver, board])

  function resetGame() {
    setBoard(Array(9).fill(null))
    setPlayerTurn(true)
  }

  function resetAll() {
    resetGame()
    setScore({ you: 0, cpu: 0, draw: 0 })
  }

  let status = 'Your turn (X)'
  if (result) status = result.player === 'X' ? 'You win!' : 'Computer wins'
  else if (isDraw) status = "It's a draw"
  else if (!playerTurn) status = 'Computer is thinking...'

  return (
    <section id="play" className="py-20 sm:py-28 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <p className="text-zinc-500 uppercase tracking-widest text-sm mb-2">
            Take a break
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Play XOX with me
          </h2>
          <p className="mt-3 text-zinc-400">
            You are X. Think you can beat the computer?
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Score */}
          <div className="mt-8 mx-auto grid grid-cols-3 gap-3 w-64 sm:w-80">
            {[
              { label: 'You (X)', value: score.you },
              { label: 'Draw', value: score.draw },
              { label: 'CPU (O)', value: score.cpu },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-zinc-800 bg-zinc-950 py-2"
              >
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-zinc-500">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Status */}
          <p className="mt-6 h-6 text-zinc-300 font-medium">{status}</p>

          {/* Board */}
          <div className="mt-4 mx-auto grid grid-cols-3 gap-2 sm:gap-3 w-64 sm:w-80">
            {board.map((cell, i) => {
              const isWinCell = result?.line.includes(i)
              return (
                <button
                  key={i}
                  onClick={() => handleClick(i)}
                  disabled={Boolean(cell) || gameOver || !playerTurn}
                  aria-label={`Cell ${i + 1}`}
                  className={`aspect-square rounded-2xl border flex items-center justify-center text-4xl sm:text-5xl font-bold transition-colors disabled:cursor-default ${
                    isWinCell
                      ? 'bg-white text-black border-white'
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-500 text-white'
                  }`}
                >
                  {cell && (
                    <motion.span
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                      className={cell === 'O' && !isWinCell ? 'text-zinc-400' : ''}
                    >
                      {cell}
                    </motion.span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Buttons */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={resetGame}
              className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-zinc-200 transition-colors"
            >
              {gameOver ? 'Play again' : 'Restart'}
            </button>
            <button
              onClick={resetAll}
              className="px-5 py-2.5 rounded-full border border-zinc-700 text-zinc-300 hover:border-white hover:text-white transition-colors"
            >
              Reset score
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Game