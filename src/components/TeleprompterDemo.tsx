import {
  CaretDownIcon,
  NoteIcon,
  PencilSimpleIcon,
} from '@phosphor-icons/react'
import { useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ScriptLine, type LineState } from './teleprompter/ScriptLine'
import { InteractiveSimplifiedControlBar } from './teleprompter/SimplifiedControlBar'
import { TeleprompterTopButton } from './teleprompter/TeleprompterUi'
import { Shimmer } from './Shimmer'

type TeleprompterDemoProps = {
  videoSrc: string
  script: readonly string[]
}

const SCROLL_SPEED_PX_PER_SEC = 11
const FOCUS_RATIO = 0.36

function formatRecordingTime(ms: number) {
  const totalSeconds = Math.floor(ms / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes}:${String(seconds).padStart(2, '0')}`
}

export function TeleprompterDemo({ videoSrc, script }: TeleprompterDemoProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const scrollViewportRef = useRef<HTMLDivElement>(null)
  const scriptInnerRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([])
  const scrollOffsetRef = useRef(0)
  const recordingStartRef = useRef<number | null>(null)

  const [isVisible, setIsVisible] = useState(false)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [elapsedMs, setElapsedMs] = useState(0)
  const [overlayActive, setOverlayActive] = useState(true)
  const [fullscreenActive, setFullscreenActive] = useState(false)
  const [activeLineIndex, setActiveLineIndex] = useState(2)
  const [wordProgress, setWordProgress] = useState(0.22)

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { rootMargin: '20%' },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = videoRef.current
    if (!video || !isVisible || !isVideoLoaded || prefersReducedMotion) return
    video.play().catch(() => {})
  }, [isVisible, isVideoLoaded, prefersReducedMotion])

  useEffect(() => {
    if (isVideoLoaded && isVisible && !prefersReducedMotion) {
      setIsRecording(true)
    }
  }, [isVideoLoaded, isVisible, prefersReducedMotion])

  useEffect(() => {
    if (!isRecording) {
      recordingStartRef.current = null
      setElapsedMs(0)
      return
    }

    recordingStartRef.current = performance.now()
    let raf = 0

    const tick = () => {
      if (recordingStartRef.current) {
        setElapsedMs(performance.now() - recordingStartRef.current)
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isRecording])

  useEffect(() => {
    if (!isRecording || prefersReducedMotion) return

    const viewport = scrollViewportRef.current
    const inner = scriptInnerRef.current
    if (!viewport || !inner) return

    let raf = 0
    let last = performance.now()

    const tick = (now: number) => {
      const delta = now - last
      last = now
      const maxScroll = inner.scrollHeight - viewport.clientHeight

      if (maxScroll > 0) {
        scrollOffsetRef.current += (SCROLL_SPEED_PX_PER_SEC * delta) / 1000
        if (scrollOffsetRef.current >= maxScroll) scrollOffsetRef.current = 0
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
  }, [isRecording, prefersReducedMotion])

  useEffect(() => {
    const onFullscreenChange = () => {
      setFullscreenActive(document.fullscreenElement === containerRef.current)
    }

    document.addEventListener('fullscreenchange', onFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', onFullscreenChange)
  }, [])

  const handleStartRecording = useCallback(() => {
    scrollOffsetRef.current = 0
    if (scriptInnerRef.current) scriptInnerRef.current.style.transform = 'translateY(0)'
    if (videoRef.current) videoRef.current.currentTime = 0
    setActiveLineIndex(2)
    setWordProgress(0.22)
    setIsRecording(true)
  }, [])

  const handleStopRecording = useCallback(() => {
    setIsRecording(false)
  }, [])

  const handleReset = useCallback(() => {
    scrollOffsetRef.current = 0
    if (scriptInnerRef.current) scriptInnerRef.current.style.transform = 'translateY(0)'
    if (videoRef.current) videoRef.current.currentTime = 0
    setActiveLineIndex(2)
    setWordProgress(0.22)
    setIsRecording(false)
    setElapsedMs(0)
  }, [])

  const handleToggleOverlay = useCallback(() => {
    setOverlayActive((prev) => !prev)
  }, [])

  const handleToggleFullscreen = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    if (document.fullscreenElement === container) {
      document.exitFullscreen().catch(() => {})
    } else {
      container.requestFullscreen().catch(() => {})
    }
  }, [])

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

  const showOverlay = overlayActive
  const showShimmer = !isVisible || !isVideoLoaded

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/9] w-full overflow-hidden radius-inset bg-black shadow-none"
      aria-label="Speakflow teleprompter demo"
    >
      {showShimmer ? <Shimmer variant="dark" className="absolute inset-0 z-0" /> : null}

      {isVisible ? (
        <video
          ref={videoRef}
          src={videoSrc}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ease-out ${
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          onLoadedData={() => setIsVideoLoaded(true)}
        />
      ) : null}

      <div
        className={`pointer-events-none absolute inset-0 z-[5] bg-black/75 transition-opacity duration-300 ease-out ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-12 py-10 md:px-16 md:py-12">
        <TeleprompterTopButton aria-hidden="true">
          <NoteIcon size={12} weight="bold" aria-hidden="true" />
          Scripts
        </TeleprompterTopButton>
        <TeleprompterTopButton className="relative" aria-hidden="true">
          <PencilSimpleIcon size={12} weight="bold" aria-hidden="true" />
          Edit
          <CaretDownIcon size={10} weight="bold" aria-hidden="true" />
          <span
            className="absolute -top-3 -right-3 size-8 rounded-full bg-[#3b82f6]"
            aria-hidden="true"
          />
        </TeleprompterTopButton>
      </div>

      <div
        ref={scrollViewportRef}
        className={`absolute inset-0 z-10 overflow-hidden px-16 md:px-32 transition-opacity duration-300 ease-out ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0, #000 12%, #000 84%, transparent 100%)',
          maskImage:
            'linear-gradient(to bottom, transparent 0, #000 12%, #000 84%, transparent 100%)',
        }}
        aria-hidden={!showOverlay}
      >
        <div
          ref={scriptInnerRef}
          className="mx-auto max-w-[92%] pt-[16%] pb-[80px] text-left will-change-transform"
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

      <div className="absolute inset-x-0 bottom-0 z-20 flex justify-center px-12 pb-12 md:px-16 md:pb-16">
        <InteractiveSimplifiedControlBar
          isRecording={isRecording}
          timerLabel={formatRecordingTime(elapsedMs)}
          overlayActive={overlayActive}
          fullscreenActive={fullscreenActive}
          onStart={handleStartRecording}
          onStop={handleStopRecording}
          onReset={handleReset}
          onToggleOverlay={handleToggleOverlay}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </div>
    </div>
  )
}
