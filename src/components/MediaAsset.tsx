import { useReducedMotion } from 'motion/react'
import { useLottie } from 'lottie-react'
import { useEffect, useRef, useState } from 'react'
import { Shimmer } from './Shimmer'

export type MediaAssetSource =
  | { type: 'lottie'; src: string }
  | { type: 'video'; src: string; poster?: string }
  | { type: 'image'; src: string; alt?: string }

type MediaAssetProps = {
  source: MediaAssetSource
  aspectRatio?: string
  objectFit?: 'cover' | 'contain'
  className?: string
  label?: string
  eager?: boolean
}

function LottiePlayer({
  animationData,
  autoplay,
  loop,
  objectFit,
}: {
  animationData: object
  autoplay: boolean
  loop: boolean
  objectFit: 'cover' | 'contain'
}) {
  const { View } = useLottie({
    animationData,
    loop,
    autoplay,
    style: { width: '100%', height: '100%' },
    rendererSettings: {
      preserveAspectRatio: objectFit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet',
    },
  })

  return (
    <div className="absolute -inset-x-[10%] -inset-y-[11%] overflow-hidden [&_svg]:block [&_svg]:h-full [&_svg]:w-full [&_svg]:overflow-hidden">
      {View}
    </div>
  )
}

export function MediaAsset({
  source,
  aspectRatio = 'aspect-video',
  objectFit = 'cover',
  className = '',
  label,
  eager = false,
}: MediaAssetProps) {
  const prefersReducedMotion = useReducedMotion()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(eager)
  const [isLoaded, setIsLoaded] = useState(false)
  const [lottieData, setLottieData] = useState<object | null>(null)

  useEffect(() => {
    if (eager) return

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
  }, [eager])

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

  const wrapperClass = `${aspectRatio} relative isolate w-full overflow-hidden rounded-lg-4 bg-surface-alt ${className}`
  const fitClass = objectFit === 'contain' ? 'object-contain' : 'object-cover'
  const mediaReady =
    source.type === 'lottie' ? Boolean(lottieData) : isLoaded
  const showShimmer = !isVisible || !mediaReady
  const fadeClass = mediaReady
    ? 'opacity-100 transition-opacity duration-300 ease-out'
    : 'opacity-0'

  if (source.type === 'image') {
    return (
      <div ref={containerRef} className={wrapperClass}>
        {showShimmer ? <Shimmer className="absolute inset-0" /> : null}
        {isVisible ? (
          <img
            src={source.src}
            alt={source.alt ?? label ?? ''}
            className={`h-full w-full ${fitClass} ${fadeClass}`}
            loading={eager ? 'eager' : 'lazy'}
            fetchPriority={eager ? 'high' : undefined}
            onLoad={() => setIsLoaded(true)}
          />
        ) : null}
      </div>
    )
  }

  if (source.type === 'video') {
    return (
      <div ref={containerRef} className={wrapperClass}>
        {showShimmer ? <Shimmer className="absolute inset-0" /> : null}
        {isVisible ? (
          <video
            src={source.src}
            poster={source.poster}
            className={`h-full w-full object-cover ${fadeClass}`}
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
            preload={eager ? 'auto' : 'metadata'}
            onLoadedData={() => setIsLoaded(true)}
          />
        ) : null}
      </div>
    )
  }

  return (
    <div ref={containerRef} className={wrapperClass} aria-label={label}>
      {showShimmer ? <Shimmer className="absolute inset-0" /> : null}
      <div className={`relative h-full w-full overflow-hidden ${fadeClass}`}>
        {isVisible && lottieData ? (
          <LottiePlayer
            animationData={lottieData}
            loop={!prefersReducedMotion}
            autoplay={!prefersReducedMotion}
            objectFit={objectFit}
          />
        ) : null}
      </div>
    </div>
  )
}
