import { useEffect, useRef } from 'react'

const COLS = 20
const ROWS = 10
const CELL = 8
const TICK_MS = 200

type Point = { x: number; y: number }
type Dir = { dx: number; dy: number }

function randomFood(snake: Point[]): Point {
  let food: Point
  do {
    food = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) }
  } while (snake.some(s => s.x === food.x && s.y === food.y))
  return food
}

export default function SnakeBanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({
    snake: [{ x: 10, y: 5 }, { x: 9, y: 5 }, { x: 8, y: 5 }] as Point[],
    food: { x: 15, y: 5 } as Point,
    dir: { dx: 1, dy: 0 } as Dir,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const tick = () => {
      const { snake, food, dir } = stateRef.current

      const head = snake[0]
      const newHead: Point = {
        x: (head.x + dir.dx + COLS) % COLS,
        y: (head.y + dir.dy + ROWS) % ROWS,
      }

      const ate = newHead.x === food.x && newHead.y === food.y
      const newSnake = [newHead, ...snake.slice(0, ate ? undefined : snake.length - 1)]
      const newFood = ate ? randomFood(newSnake) : food

      // Change direction occasionally for visual interest
      if (Math.random() < 0.08) {
        const options: Dir[] = [
          { dx: 1, dy: 0 }, { dx: -1, dy: 0 },
          { dx: 0, dy: 1 }, { dx: 0, dy: -1 },
        ].filter(d => !(d.dx === -dir.dx && d.dy === -dir.dy))
        stateRef.current.dir = options[Math.floor(Math.random() * options.length)]
      }

      stateRef.current.snake = newSnake
      stateRef.current.food = newFood

      // Draw
      ctx.clearRect(0, 0, COLS * CELL, ROWS * CELL)

      // Food
      ctx.fillStyle = '#ef4444'
      ctx.fillRect(newFood.x * CELL, newFood.y * CELL, CELL - 1, CELL - 1)

      // Snake
      newSnake.forEach((seg, i) => {
        const alpha = 1 - (i / newSnake.length) * 0.5
        ctx.fillStyle = `rgba(74, 222, 128, ${alpha})`
        ctx.fillRect(seg.x * CELL, seg.y * CELL, CELL - 1, CELL - 1)
      })
    }

    const id = setInterval(tick, TICK_MS)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="absolute inset-0 bg-[#0a1a0a] overflow-hidden flex items-center justify-center"
      style={{ pointerEvents: 'none' }}
    >
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.3) 1px, transparent 1px)',
          backgroundSize: `${CELL}px ${CELL}px`,
        }}
      />
      <canvas
        ref={canvasRef}
        width={COLS * CELL}
        height={ROWS * CELL}
        style={{ imageRendering: 'pixelated' }}
      />
    </div>
  )
}
