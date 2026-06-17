import {
  ArrowCounterClockwiseIcon,
  CaretDownIcon,
  CornersOutIcon,
  DownloadSimpleIcon,
  GearIcon,
  PlayIcon,
  StackIcon,
  VideoCameraIcon,
} from '@phosphor-icons/react'
import {
  TeleprompterBar,
  TeleprompterChip,
  TeleprompterIconButton,
  TeleprompterRecordSquare,
  teleprompterChipClass,
  teleprompterIconBtnClass,
} from './TeleprompterUi'

type SimplifiedControlBarProps = {
  timerLabel: string
  showFlowLabel?: boolean
}

export function SimplifiedControlBar({
  timerLabel,
  showFlowLabel = true,
}: SimplifiedControlBarProps) {
  return (
    <TeleprompterBar className="max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <TeleprompterChip>
        <span className="size-12 shrink-0 rounded-[2px] bg-white/22" aria-hidden="true" />
        <span className="text-caption font-medium tabular-nums leading-none text-accent-alt">
          {timerLabel}
        </span>
      </TeleprompterChip>

      <TeleprompterIconButton>
        <ArrowCounterClockwiseIcon size={14} weight="bold" className="text-accent-alt/75" />
      </TeleprompterIconButton>

      <TeleprompterChip>
        <TeleprompterRecordSquare />
        <VideoCameraIcon size={12} weight="bold" className="text-accent-alt/65" />
      </TeleprompterChip>

      <TeleprompterChip className="gap-8">
        <DownloadSimpleIcon size={12} weight="bold" className="shrink-0 text-accent-alt/80" />
        {showFlowLabel ? (
          <span className="text-caption font-medium leading-none text-accent-alt">Flow</span>
        ) : null}
        <CaretDownIcon size={10} weight="bold" className="shrink-0 text-accent-alt/55" />
      </TeleprompterChip>

      <TeleprompterIconButton>
        <CornersOutIcon size={14} weight="bold" className="text-accent-alt/75" />
      </TeleprompterIconButton>

      <TeleprompterIconButton>
        <StackIcon size={14} weight="bold" className="text-accent-alt/75" />
      </TeleprompterIconButton>

      <TeleprompterIconButton>
        <GearIcon size={14} weight="bold" className="text-accent-alt/75" />
      </TeleprompterIconButton>
    </TeleprompterBar>
  )
}

type InteractiveSimplifiedControlBarProps = {
  isRecording: boolean
  timerLabel: string
  overlayActive: boolean
  fullscreenActive: boolean
  onStart: () => void
  onStop: () => void
  onReset: () => void
  onToggleOverlay: () => void
  onToggleFullscreen: () => void
}

const interactiveChipClass = `${teleprompterChipClass} transition-[border-color,background-color] duration-150 hover:border-white/20`
const interactiveIconBtnClass = `${teleprompterIconBtnClass} cursor-pointer transition-[border-color,background-color] duration-150 hover:border-white/20`

export function InteractiveSimplifiedControlBar({
  isRecording,
  timerLabel,
  overlayActive,
  fullscreenActive,
  onStart,
  onStop,
  onReset,
  onToggleOverlay,
  onToggleFullscreen,
}: InteractiveSimplifiedControlBarProps) {
  return (
    <TeleprompterBar className="max-w-full overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {isRecording ? (
        <button
          type="button"
          className={interactiveChipClass}
          aria-label={`Stop recording at ${timerLabel}`}
          onClick={onStop}
        >
          <span className="size-12 shrink-0 rounded-[2px] bg-[#e53935]" aria-hidden="true" />
          <span className="text-caption font-medium tabular-nums leading-none text-accent-alt">
            {timerLabel}
          </span>
        </button>
      ) : (
        <button
          type="button"
          className={interactiveChipClass}
          onClick={onStart}
        >
          <PlayIcon size={10} weight="fill" className="text-accent-alt" aria-hidden="true" />
          <span className="text-caption font-medium leading-none text-accent-alt">Start</span>
        </button>
      )}

      <button
        type="button"
        className={interactiveIconBtnClass}
        aria-label="Reset script"
        onClick={onReset}
      >
        <ArrowCounterClockwiseIcon size={14} weight="bold" className="text-accent-alt/75" />
      </button>

      <div className={teleprompterChipClass} aria-hidden="true">
        <TeleprompterRecordSquare />
        <VideoCameraIcon size={12} weight="bold" className="text-accent-alt/65" />
      </div>

      <div className={`${teleprompterChipClass} gap-8`} aria-hidden="true">
        <DownloadSimpleIcon size={12} weight="bold" className="shrink-0 text-accent-alt/80" />
        <span className="text-caption font-medium leading-none text-accent-alt">Flow</span>
        <CaretDownIcon size={10} weight="bold" className="shrink-0 text-accent-alt/55" />
      </div>

      <button
        type="button"
        className={`${interactiveIconBtnClass} ${fullscreenActive ? 'border-white/25 bg-white/[0.06]' : ''}`}
        aria-label="Fullscreen"
        aria-pressed={fullscreenActive}
        onClick={onToggleFullscreen}
      >
        <CornersOutIcon size={14} weight="bold" className="text-accent-alt/75" />
      </button>

      <button
        type="button"
        className={`${interactiveIconBtnClass} ${overlayActive ? 'border-white/25 bg-white/[0.06]' : ''}`}
        aria-label="Overlay"
        aria-pressed={overlayActive}
        onClick={onToggleOverlay}
      >
        <StackIcon size={14} weight="bold" className="text-accent-alt/75" />
      </button>

      <div className={teleprompterIconBtnClass} aria-hidden="true">
        <GearIcon size={14} weight="bold" className="text-accent-alt/75" />
      </div>
    </TeleprompterBar>
  )
}
