'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const BLUR_MAX = 10
const SCALE_MAX = 1.1
const ROTATE_MAX = 2.5
const MOVEMENT_SENSITIVITY = 0.0007
const RECOVER_DURATION_MS = 2000

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export default function DisorientBackground() {
  const [disorientation, setDisorientation] = useState(0)
  const valueRef = useRef(0)
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number | null>(null)
  const recoverStartValRef = useRef(0)

  useEffect(() => {
    valueRef.current = disorientation
  }, [disorientation])

  const handleMouseLeave = useCallback(() => {
    lastPosRef.current = null
    const current = valueRef.current
    if (current <= 0) return
    recoverStartValRef.current = current
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const t = Math.min(elapsed / RECOVER_DURATION_MS, 1)
      const eased = easeOutCubic(t)
      const next = recoverStartValRef.current * (1 - eased)
      setDisorientation(next)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e
    const last = lastPosRef.current
    lastPosRef.current = { x: clientX, y: clientY }

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }

    let next: number
    if (last !== null) {
      const dx = clientX - last.x
      const dy = clientY - last.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      next = Math.min(1, valueRef.current + dist * MOVEMENT_SENSITIVITY)
    } else {
      next = Math.min(1, valueRef.current + 0.015)
    }
    valueRef.current = next
    setDisorientation(next)
  }, [])

  const blur = disorientation * BLUR_MAX
  const scale = 1 + disorientation * (SCALE_MAX - 1)
  const rotate = disorientation * ROTATE_MAX
  const rotateY = disorientation * 3
  const rotateX = disorientation * 1.5

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `perspective(1400px) scale(${scale}) rotate(${rotate}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          filter: `blur(${blur}px)`,
        }}
      >
        <Image
          src="/hero-bg.png"
          alt=""
          fill
          className="object-cover object-center select-none"
          priority
          sizes="100vw"
          draggable={false}
        />
      </div>
    </div>
  )
}
