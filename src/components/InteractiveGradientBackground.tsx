const dotBackgroundStyle = {
  backgroundImage: 'url(/images/marketing/dot-grid.svg)',
  backgroundSize: '48px 48px',
} as const

export function InteractiveGradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="closing-gradient-blob closing-gradient-blob-primary absolute h-[85%] w-[75%] rounded-full blur-[80px]" />
      <div className="closing-gradient-blob closing-gradient-blob-secondary absolute h-[65%] w-[55%] rounded-full blur-[72px]" />
      <div className="closing-gradient-blob closing-gradient-blob-tertiary absolute h-[70%] w-[60%] rounded-full blur-[88px]" />

      <div className="absolute inset-0 opacity-[0.14]" style={dotBackgroundStyle} />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-accent-alt/[0.04] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-accent to-transparent" />
    </div>
  )
}
