import { useEffect, useState } from 'react'

const darkSections = ['hero', 'closing']

export function useHeaderOnDarkBackground() {
  const [onDarkBackground, setOnDarkBackground] = useState(true)

  useEffect(() => {
    const sections = darkSections
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null)

    if (sections.length === 0) {
      setOnDarkBackground(false)
      return
    }

    const visibleSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.add(entry.target.id)
          } else {
            visibleSections.delete(entry.target.id)
          }
        }

        setOnDarkBackground(visibleSections.size > 0)
      },
      {
        threshold: 0,
        rootMargin: '-72px 0px 0px 0px',
      },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return onDarkBackground
}
