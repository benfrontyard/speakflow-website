import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { content } from '../data/content'
import { HERO_INTRO_STAT_STAGGER, useHeroIntro } from './HeroIntro'
import { Shimmer } from './Shimmer'

const { hero } = content

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
  const { animate, getTransition } = useHeroIntro()
  const productVisualTransition = getTransition(
    'stats',
    hero.stats.length * HERO_INTRO_STAT_STAGGER + 0.03,
  )
  const [shouldLoad, setShouldLoad] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const load = () => setShouldLoad(true)

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(load, { timeout: 2000 })
      return () => window.cancelIdleCallback(id)
    }

    const timeoutId = setTimeout(load, 1500)
    return () => clearTimeout(timeoutId)
  }, [])

  const background = (
    <>
      {!isLoaded ? <Shimmer variant="dark" className="absolute inset-0" /> : null}
      {shouldLoad ? (
        <iframe
          title=""
          tabIndex={-1}
          className={`absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0 transition-opacity duration-500 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?${embedParams.toString()}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          onLoad={() => setIsLoaded(true)}
        />
      ) : null}
      <div className="hero-video-scrim-top absolute inset-0" />
      <div className="hero-video-scrim-bottom absolute inset-0" />
      <div className="hero-video-scrim-content absolute inset-0" />
      <div className="hero-video-scrim-stats absolute inset-0 hidden lg:block" />
    </>
  )

  if (!animate) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black" aria-hidden="true">
        {background}
      </div>
    )
  }

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-black"
      aria-hidden="true"
      initial={{ opacity: 0, y: 12, scale: 1.02 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={productVisualTransition}
    >
      {background}
    </motion.div>
  )
}
