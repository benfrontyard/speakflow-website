const YOUTUBE_VIDEO_ID = 'bS8WKg9ndKA'

const embedParams = new URLSearchParams({
  autoplay: '1',
  mute: '1',
  loop: '1',
  playlist: YOUTUBE_VIDEO_ID,
  controls: '0',
  showinfo: '0',
  rel: '0',
  modestbranding: '1',
  playsinline: '1',
  iv_load_policy: '3',
  disablekb: '1',
  fs: '0',
  enablejsapi: '1',
})

export function HeroVideoBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <iframe
        title=""
        tabIndex={-1}
        className="absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?${embedParams.toString()}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
    </div>
  )
}
