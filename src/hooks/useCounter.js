import { useEffect, useRef } from 'react'

/**
 * Animates a number from 0 → target when the element enters the viewport.
 * Returns a ref to attach to the DOM element that displays the number.
 *
 * @param {number} target   - Final number value
 * @param {string} suffix   - Text appended after number, e.g. "+" or "%"
 * @param {number} duration - Animation duration in ms (default 1800)
 */
export function useCounter(target, suffix = '', duration = 1800) {
  const ref = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || hasRun.current) return

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          let startTs = null
          const step = (ts) => {
            if (!startTs) startTs = ts
            const progress = Math.min((ts - startTs) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
            el.textContent = Math.floor(eased * target).toLocaleString() + suffix
            if (progress < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
          obs.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [target, suffix, duration])

  return ref
}
