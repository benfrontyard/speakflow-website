export const SPOKEN_COLOR = '#5a5a5a'
export const TRANSITION_COLOR = '#8a8a8a'
export const ACTIVE_WORD_COLOR = '#ffffff'
export const UPCOMING_COLOR = 'rgba(255, 255, 255, 0.78)'

export type LineState = 'spoken' | 'active' | 'upcoming'

type ScriptLineProps = {
  line: string
  lineState: LineState
  wordProgress: number
}

export function ScriptLine({ line, lineState, wordProgress }: ScriptLineProps) {
  if (lineState === 'spoken') {
    return (
      <span style={{ color: SPOKEN_COLOR }} className="transition-[color,opacity] duration-500 ease-out">
        {line}
      </span>
    )
  }

  if (lineState === 'upcoming') {
    return (
      <span
        style={{ color: UPCOMING_COLOR }}
        className="transition-[color,opacity] duration-500 ease-out"
      >
        {line}
      </span>
    )
  }

  const words = line.split(/\s+/)
  const activeWordIndex = Math.min(words.length - 1, Math.floor(wordProgress * words.length))

  return (
    <span className="transition-[color,opacity] duration-300 ease-out">
      {words.map((word, index) => {
        let color = UPCOMING_COLOR
        let weight = 500

        if (index < activeWordIndex) {
          color = TRANSITION_COLOR
        } else if (index === activeWordIndex) {
          color = ACTIVE_WORD_COLOR
          weight = 700
        }

        return (
          <span
            key={index}
            style={{ color, fontWeight: weight }}
            className="transition-[color] duration-300 ease-out"
          >
            {word}
            {index < words.length - 1 ? ' ' : ''}
          </span>
        )
      })}
    </span>
  )
}
