import { useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ScriptLine, type LineState } from './teleprompter/ScriptLine'
import { SimplifiedControlBar } from './teleprompter/SimplifiedControlBar'

type FlowTeleprompterPreviewProps = {
  script: readonly string[]
  active?: boolean
}

const SCROLL_SPEED_PX_PER_SEC = 22
const FOCUS_RATIO = 0.36

function formatTimer(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

function ControlBar({ elapsedMs }: { elapsedMs: number }) {
  return (
    <div
      className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-10 pb-10 md:px-12 md:pb-12"
      aria-hidden="true"
    >
      <SimplifiedControlBar timerLabel={formatTimer(elapsedMs)} />
    </div>
  )
}

export function FlowTeleprompterPreview({ script, active = true }: FlowTeleprompterPreviewProps) {
  const prefersReducedMotion = useReducedMotion()
  const viewportRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const scrollOffsetRef = useRef(0)
  const elapsedRef = useRef(0)

  const [activeLineIndex, setActiveLineIndex] = useState(2)
  const [wordProgress, setWordProgress] = useState(0.22)
  const [elapsedMs, setElapsedMs] = useState(23000)

  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveLineIndex(2)
      setWordProgress(0.22)
      setElapsedMs(23000)
      return
    }

    if (!active) return

    const viewport = viewportRef.current
    const inner = innerRef.current
    if (!viewport || !inner) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const delta = now - last
      last = now

      elapsedRef.current += delta
      setElapsedMs(elapsedRef.current)

      const maxScroll = inner.scrollHeight - viewport.clientHeight
      if (maxScroll > 0) {
        scrollOffsetRef.current += (SCROLL_SPEED_PX_PER_SEC * delta) / 1000
        if (scrollOffsetRef.current >= maxScroll) {
          scrollOffsetRef.current = 0
          elapsedRef.current = 0
        }
        inner.style.transform = `translateY(-${scrollOffsetRef.current}px)`
      }

      const focusY = viewport.clientHeight * FOCUS_RATIO
      let nextActiveLine = 0
      let nextWordProgress = 0

      lineRefs.current.forEach((lineEl, index) => {
        if (!lineEl || lineEl.dataset.empty === 'true') return

        const top = lineEl.offsetTop - scrollOffsetRef.current
        const bottom = top + lineEl.offsetHeight

        if (top <= focusY && bottom > focusY) {
          nextActiveLine = index
          nextWordProgress = Math.min(1, Math.max(0, (focusY - top) / lineEl.offsetHeight))
        }
      })

      setActiveLineIndex(nextActiveLine)
      setWordProgress(nextWordProgress)

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, prefersReducedMotion])

  const getLineState = (index: number): LineState => {
    if (prefersReducedMotion) {
      if (index < 2) return 'spoken'
      if (index === 2) return 'active'
      return 'upcoming'
    }

    if (index < activeLineIndex) return 'spoken'
    if (index === activeLineIndex) return 'active'
    return 'upcoming'
  }

  return (
    <div
      className="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg-5 bg-black select-none"
      aria-hidden="true"
    >
      <div
        ref={viewportRef}
        className="absolute inset-x-0 top-0 bottom-[64px] overflow-hidden md:bottom-[68px]"
      >
        <div
          ref={innerRef}
          className="mx-auto max-w-[min(100%,34rem)] px-16 pt-[18%] will-change-transform md:max-w-[min(100%,38rem)] md:px-20 md:pt-[16%]"
          style={{
            fontSize: 'clamp(1.0625rem, 2.1vw, 1.625rem)',
            lineHeight: 1.58,
            fontWeight: 500,
          }}
        >
          {script.map((line, index) => {
            if (line === '') {
              return <p key={index} className="h-[0.55em]" aria-hidden="true" />
            }

            const lineState = getLineState(index)

            return (
              <p
                key={index}
                ref={(el) => {
                  lineRefs.current[index] = el
                }}
                data-empty="false"
                className="transition-[color,opacity] duration-500 ease-out"
              >
                <ScriptLine
                  line={line}
                  lineState={lineState}
                  wordProgress={lineState === 'active' ? wordProgress : 0}
                />
              </p>
            )
          })}
        </div>
      </div>

      <ControlBar elapsedMs={elapsedMs} />
    </div>
  )
}
