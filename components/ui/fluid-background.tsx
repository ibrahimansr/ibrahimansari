'use client'

import { useCallback, useEffect, useRef } from 'react'
import { FluidSim } from '@/lib/fluidSim'

export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const simRef = useRef<FluidSim | null>(null)
  const bgTextureRef = useRef<WebGLTexture | null>(null)
  const bgImageSizeRef = useRef({ w: 1, h: 1 })
  const lastPosRef = useRef<{ x: number; y: number } | null>(null)
  const rafRef = useRef<number>(0)
  const lastTimeRef = useRef<number>(0)

  const resize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !simRef.current) return
    const dpr = Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 2)
    const w = Math.floor(canvas.clientWidth * dpr)
    const h = Math.floor(canvas.clientHeight * dpr)
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || typeof window === 'undefined') return

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    })
    if (!gl) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = '/hero-bg.png'

    img.onload = () => {
      bgImageSizeRef.current = { w: img.naturalWidth, h: img.naturalHeight }
      const texture = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      bgTextureRef.current = texture

      try {
        simRef.current = new FluidSim(canvas)
      } catch (e) {
        console.error('FluidSim init failed', e)
        return
      }
      resize()

      let lastTime = performance.now() / 1000
      const loop = (time: number) => {
        rafRef.current = requestAnimationFrame(loop)
        const sim = simRef.current
        const bg = bgTextureRef.current
        const size = bgImageSizeRef.current
        if (!sim || !bg) return
        const t = time / 1000
        const dt = Math.min(t - lastTime, 1 / 30)
        lastTime = t
        sim.step(dt)
        gl.bindTexture(gl.TEXTURE_2D, bg)
        sim.render(bg, canvas.width, canvas.height, size.w, size.h)
      }
      rafRef.current = requestAnimationFrame(loop)
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
      if (simRef.current) {
        simRef.current.destroy()
        simRef.current = null
      }
      if (bgTextureRef.current && gl) {
        gl.deleteTexture(bgTextureRef.current)
        bgTextureRef.current = null
      }
    }
  }, [resize])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const canvas = canvasRef.current
    const sim = simRef.current
    if (!canvas || !sim) return
    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const last = lastPosRef.current
    lastPosRef.current = { x: e.clientX, y: e.clientY }
    if (last !== null && (last.x !== e.clientX || last.y !== e.clientY)) {
      const dx = (e.clientX - last.x) / rect.width
      const dy = (e.clientY - last.y) / rect.height
      sim.splat(x, y, dx, dy)
    }
  }, [])

  const handlePointerLeave = useCallback(() => {
    lastPosRef.current = null
  }, [])

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  )
}
