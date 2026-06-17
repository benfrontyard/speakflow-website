import {
  ChatCircleIcon,
  HouseIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react'
import { animate, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { assetUrl } from '../lib/assetUrl'

type CollaboratePreviewProps = {
  active?: boolean
}

/** Flowy ease — soft deceleration, no snap */
const motionEase = [0.16, 1, 0.3, 1] as const

const AVATARS = [
  assetUrl('/images/collaborate/avatar-bun.png'),
  assetUrl('/images/collaborate/avatar-short.png'),
  assetUrl('/images/collaborate/avatar-glasses.png'),
] as const

const COMMENTS = [
  { nameWidth: '58%', timeWidth: '28%', line1: '78%', line2: '52%' },
  { nameWidth: '52%', timeWidth: '24%', line1: '68%', line2: '44%' },
  { nameWidth: '48%', timeWidth: '22%', line1: '72%', line2: '38%' },
] as const

const IDLE_HOLD_MS = 1400
const SEQUENCE_MS = 1200
const FINAL_HOLD_MS = 2200

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const id = window.setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, ms)

    const onAbort = () => {
      window.clearTimeout(id)
      reject(new DOMException('Aborted', 'AbortError'))
    }

    signal.addEventListener('abort', onAbort)
  })
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

/** Hermite smoothstep — C1 continuous at boundaries */
function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1)
  return t * t * (3 - 2 * t)
}

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress
}

/**
 * Layout ratios from team-card.svg (404 × 221 viewBox).
 * All values are % of the preview container.
 */
const LAYOUT = {
  idle: {
    shellLeft: 14,
    shellTop: 14,
    shellWidth: 72,
    shellHeight: 72,
  },
  final: {
    shellLeft: 5,
    shellTop: 8.5,
    shellWidth: 90,
    shellHeight: 83,
    navWidth: 12,
    panelWidth: 30,
    contentLeft: 12,
    contentTop: 0,
    contentWidth: 58,
    contentHeight: 100,
  },
} as const

function getSequenceState(t: number) {
  const panelIn = smoothstep(80, 380, t)
  const panelX = lerp(108, 0, panelIn)

  const commentVisible = COMMENTS.map((_, index) => {
    const start = 200 + index * 100
    return smoothstep(start, start + 220, t)
  })

  const expand = smoothstep(420, SEQUENCE_MS, t)

  const shellLeft = lerp(LAYOUT.idle.shellLeft, LAYOUT.final.shellLeft, expand)
  const shellTop = lerp(LAYOUT.idle.shellTop, LAYOUT.final.shellTop, expand)
  const shellWidth = lerp(LAYOUT.idle.shellWidth, LAYOUT.final.shellWidth, expand)
  const shellHeight = lerp(LAYOUT.idle.shellHeight, LAYOUT.final.shellHeight, expand)

  const navWidth = lerp(0, LAYOUT.final.navWidth, expand)
  const navOpacity = smoothstep(440, 620, t)

  const panelWidth = lerp(0, LAYOUT.final.panelWidth, expand)

  const contentLeft = lerp(0, LAYOUT.final.contentLeft, expand)
  const contentTop = lerp(0, LAYOUT.final.contentTop, expand)
  const contentWidth = lerp(100, LAYOUT.final.contentWidth, expand)
  const contentHeight = lerp(100, LAYOUT.final.contentHeight, expand)

  const highlightOpacity = smoothstep(520, 720, t)
  const markerOpacity = smoothstep(640, 820, t)
  const connectorProgress = smoothstep(720, 980, t)
  const activeCommentOpacity = smoothstep(800, SEQUENCE_MS, t)

  return {
    panelX,
    panelWidth,
    commentVisible,
    shellLeft,
    shellTop,
    shellWidth,
    shellHeight,
    navWidth,
    navOpacity,
    contentLeft,
    contentTop,
    contentWidth,
    contentHeight,
    expand,
    highlightOpacity,
    markerOpacity,
    connectorProgress,
    activeCommentOpacity,
  }
}

function SkeletonLine({
  width,
  className = '',
}: {
  width: string
  className?: string
}) {
  return (
    <div
      className={`h-[5px] rounded-full bg-[#D5D5D4] ${className}`}
      style={{ width }}
    />
  )
}

function LeftNav({ width, opacity }: { width: number; opacity: number }) {
  return (
    <div
      className="absolute top-0 bottom-0 left-0 flex flex-col items-center overflow-hidden border-r border-[#EFEFEF] bg-[#FAFAFA]"
      style={{ width: `${width}%`, opacity }}
    >
      <div className="flex w-full flex-col items-center pt-[12%]">
        <img
          src={assetUrl('/speakflow-logo.svg')}
          alt=""
          className="mb-[16%] size-[22px]"
        />
        <HouseIcon size={14} weight="regular" className="mb-[12%] text-[#625241]/70" />
        <VideoCameraIcon size={14} weight="regular" className="text-[#625241]/50" />
      </div>
    </div>
  )
}

function AnnotationMarker({ opacity }: { opacity: number }) {
  return (
    <div
      className="absolute top-1/2 right-[-5px] flex size-[14px] -translate-y-1/2 items-center justify-center rounded-full bg-accent-5 shadow-[0_2px_8px_color-mix(in_srgb,var(--color-accent-5)_35%,transparent)]"
      style={{ opacity }}
    >
      <ChatCircleIcon size={8} weight="fill" className="text-white" />
    </div>
  )
}

function DocumentContent({
  highlightOpacity,
  markerOpacity,
}: {
  highlightOpacity: number
  markerOpacity: number
}) {
  return (
    <div className="relative flex h-full flex-col px-[7%] py-[5.5%]">
      <div className="mb-[3.5%] flex flex-col gap-[4px]">
        <SkeletonLine width="34%" />
        <SkeletonLine width="56%" />
      </div>

      <div className="relative mb-[3.5%]">
        <div
          className="relative rounded-[6px] bg-[color-mix(in_srgb,var(--color-accent-5)_10%,#F8F8F8)] px-[8px] py-[6px]"
          style={{ opacity: Math.max(0.35, highlightOpacity) }}
        >
          <div className="flex flex-col gap-[4px]">
            <SkeletonLine width="88%" className="bg-[#C8C8C7]" />
            <SkeletonLine width="72%" className="bg-[#C8C8C7]" />
            <SkeletonLine width="64%" className="bg-[#C8C8C7]" />
          </div>
          <AnnotationMarker opacity={markerOpacity} />
        </div>
      </div>

      <div className="flex flex-col gap-[4px]">
        <SkeletonLine width="48%" />
        <SkeletonLine width="62%" />
        <SkeletonLine width="40%" />
        <SkeletonLine width="54%" />
        <SkeletonLine width="36%" />
        <SkeletonLine width="58%" />
        <SkeletonLine width="44%" />
      </div>
    </div>
  )
}

function CommentCard({
  avatarSrc,
  comment,
  visible,
  active,
  activeOpacity,
}: {
  avatarSrc: string
  comment: (typeof COMMENTS)[number]
  visible: number
  active: boolean
  activeOpacity: number
}) {
  const y = (1 - visible) * 5
  const accentMix = active ? activeOpacity : 0

  return (
    <div
      className="rounded-[8px] border p-[8px] transition-colors"
      style={{
        opacity: visible,
        transform: `translateY(${y}px)`,
        borderColor: active
          ? `color-mix(in srgb, var(--color-accent-5) ${18 + accentMix * 22}%, #EFEFEF)`
          : '#EFEFEF',
        backgroundColor: active
          ? `color-mix(in srgb, var(--color-accent-5) ${4 + accentMix * 8}%, white)`
          : 'white',
      }}
    >
      <div className="flex items-start gap-[6px]">
        <img
          src={avatarSrc}
          alt=""
          className="size-[18px] shrink-0 rounded-full bg-[#F8F8F8] object-cover"
        />
        <div className="min-w-0 flex-1">
          <div className="mb-[4px] flex items-center justify-between gap-[4px]">
            <SkeletonLine width={comment.nameWidth} className="h-[4px]" />
            <SkeletonLine width={comment.timeWidth} className="h-[3px] opacity-60" />
          </div>
          <div className="flex flex-col gap-[3px]">
            <SkeletonLine width={comment.line1} className="h-[4px]" />
            <SkeletonLine width={comment.line2} className="h-[4px]" />
          </div>
        </div>
      </div>
    </div>
  )
}

function CommentPanelHeader({ opacity }: { opacity: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-between border-b border-[#EFEFEF] px-[10%] py-[7%]"
      style={{ opacity }}
    >
      <SkeletonLine width="38%" className="h-[5px]" />
      <div className="flex items-center gap-[3px] rounded-full border border-[color-mix(in_srgb,var(--color-accent-5)_25%,#EFEFEF)] bg-white px-[6px] py-[3px]">
        <ChatCircleIcon size={7} weight="fill" className="text-accent-5" />
        <span className="text-[6px] font-semibold tracking-[-0.01em] text-accent-5">
          Comment
        </span>
      </div>
    </div>
  )
}

function CommentPanel({
  x,
  width,
  commentVisible,
  activeCommentOpacity,
  expand,
}: {
  x: number
  width: number
  commentVisible: number[]
  activeCommentOpacity: number
  expand: number
}) {
  const headerOpacity = smoothstep(0.3, 0.7, expand)

  return (
    <div
      className="absolute top-0 right-0 bottom-0 flex flex-col border-l border-[#EFEFEF] bg-[#FAFAFA]"
      style={{
        width: `${width}%`,
        transform: `translateX(${x}%)`,
      }}
    >
      <CommentPanelHeader opacity={headerOpacity} />

      <div className="flex flex-1 flex-col gap-[7px] overflow-hidden px-[8%] py-[6%]">
        {AVATARS.map((src, index) => (
          <CommentCard
            key={src}
            avatarSrc={src}
            comment={COMMENTS[index] ?? COMMENTS[0]}
            visible={commentVisible[index] ?? 0}
            active={index === 0}
            activeOpacity={activeCommentOpacity}
          />
        ))}
      </div>
    </div>
  )
}

function ConnectorLine({ progress }: { progress: number }) {
  if (progress <= 0) return null

  return (
    <svg
      className="pointer-events-none absolute inset-0 z-20 overflow-visible"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 66 34 C 74 34, 80 36, 86 40 C 90 43, 92 46, 94 52"
        fill="none"
        stroke="var(--color-accent-5)"
        strokeWidth="0.3"
        strokeLinecap="round"
        strokeDasharray="36"
        strokeDashoffset={36 * (1 - progress)}
        opacity={0.5 + progress * 0.4}
      />
      <circle
        cx="66"
        cy="34"
        r="0.65"
        fill="var(--color-accent-5)"
        opacity={progress}
      />
    </svg>
  )
}

function AppShell({ sequenceT }: { sequenceT: number }) {
  const state = getSequenceState(sequenceT)

  return (
    <div
      className="absolute overflow-hidden rounded-[12px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.07)]"
      style={{
        left: `${state.shellLeft}%`,
        top: `${state.shellTop}%`,
        width: `${state.shellWidth}%`,
        height: `${state.shellHeight}%`,
      }}
    >
      <LeftNav width={state.navWidth} opacity={state.navOpacity} />

      <div
        className="absolute overflow-hidden bg-white"
        style={{
          left: `${state.contentLeft}%`,
          top: `${state.contentTop}%`,
          width: `${state.contentWidth}%`,
          height: `${state.contentHeight}%`,
        }}
      >
        <DocumentContent
          highlightOpacity={state.highlightOpacity}
          markerOpacity={state.markerOpacity}
        />
      </div>

      <ConnectorLine progress={state.connectorProgress} />

      <CommentPanel
        x={state.panelX}
        width={state.panelWidth}
        commentVisible={state.commentVisible}
        activeCommentOpacity={state.activeCommentOpacity}
        expand={state.expand}
      />
    </div>
  )
}

function CollaborateFinalState() {
  return <AppShell sequenceT={SEQUENCE_MS} />
}

export function CollaboratePreview({ active = true }: CollaboratePreviewProps) {
  const prefersReducedMotion = useReducedMotion()
  const [sequenceT, setSequenceT] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (prefersReducedMotion || !active) {
      setSequenceT(SEQUENCE_MS)
      return
    }

    const controller = new AbortController()
    abortRef.current = controller
    let cancelled = false

    const runLoop = async () => {
      while (!cancelled && !controller.signal.aborted) {
        setSequenceT(0)

        try {
          await sleep(IDLE_HOLD_MS, controller.signal)
        } catch {
          break
        }

        const controls = animate(0, SEQUENCE_MS, {
          duration: SEQUENCE_MS / 1000,
          ease: motionEase,
          onUpdate: (latest) => {
            if (!cancelled) setSequenceT(latest)
          },
        })

        await controls.finished.catch(() => undefined)

        if (cancelled || controller.signal.aborted) break

        setSequenceT(SEQUENCE_MS)

        try {
          await sleep(FINAL_HOLD_MS, controller.signal)
        } catch {
          break
        }
      }
    }

    void runLoop()

    return () => {
      cancelled = true
      controller.abort()
      abortRef.current = null
      setSequenceT(0)
    }
  }, [active, prefersReducedMotion])

  return (
    <div
      className="pointer-events-none relative aspect-[16/9] w-full overflow-hidden rounded-lg-5 bg-[#EDEDED] select-none"
      aria-hidden="true"
    >
      {prefersReducedMotion ? (
        <CollaborateFinalState />
      ) : (
        <AppShell sequenceT={sequenceT} />
      )}
    </div>
  )
}
