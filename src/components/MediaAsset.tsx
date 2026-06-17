import { useReducedMotion } from 'framer-motion'
import { useLottie } from 'lottie-react'
import { useEffect, useRef, useState } from 'react'

export type MediaAssetSource =
  | { type: 'lottie'; src: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string; alt?: string }

type MediaAssetProps = {
  source: MediaAssetSource
  aspectRatio?: string
  className?: string
  label?: string
}

function LottiePlayer({
  animationData,
  autoplay,
  loop,
}: {
  animationData: object
  autoplay: boolean
  loop: boolean
}) {
  const { View } = useLottie({
    animationData,
    loop,
    autoplay,
    style: { width: '100%', height: '100%' },
  })

  return View
}

export function MediaAsset({
  source,
  aspectRatio = 'aspect-video',
  className = '',
  label,
}: MediaAssetProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [lottieData, setLottieData] = useState<object | null>(null)

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
    if (source.type !== 'lottie' || !isVisible || lottieData) return

    let cancelled = false

    fetch(source.src)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setLottieData(data)
      })
      .catch(() => {
        if (!cancelled) setLottieData(null)
      })

    return () => {
      cancelled = true
    }
  }, [source, isVisible, lottieData])

  const wrapperClass = `${aspectRatio} w-full overflow-hidden rounded-lg-4 bg-surface-alt ${className}`

  if (source.type === 'image') {
    return (
      <div ref={containerRef} className={wrapperClass}>
        <img
          src={source.src}
          alt={source.alt ?? label ?? ''}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
    )
  }

  if (source.type === 'video') {
    return (
      <div ref={containerRef} className={wrapperClass}>
        {isVisible ? (
          <video
            src={source.src}
            poster={source.poster}
            className="h-full w-full object-cover"
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
          />
        ) : null}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={wrapperClass} aria-label={label}>
      {isVisible && lottieData ? (
        <LottiePlayer
          animationData={lottieData}
          loop={!prefersReducedMotion}
          autoplay={!prefersReducedMotion}
        />
      ) : (
        <div className="flex h-full items-center justify-center text-body-sm text-text-secondary-alt">
          {label ?? 'Loading…'}
        </div>
      )}
    </div>
  )
}
