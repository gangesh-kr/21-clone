import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Shared Animation Presets ───
// All timings follow the Montfort rule: slow, deliberate, cinematic

export const EASE = {
  smooth: 'power3.out',
  slow: 'power2.out',
  cinematic: 'power4.out',
  subtle: 'power1.out',
}

export const TIMING = {
  fast: 0.8,
  normal: 1.2,
  slow: 1.6,
  slower: 2.0,
  stagger: 0.15,
  staggerSlow: 0.25,
}

/**
 * Reveal lines of text on scroll — the core Montfort animation
 */
export function createTextReveal(element, options = {}) {
  const {
    trigger = element,
    start = 'top 80%',
    y = 50,
    stagger = TIMING.stagger,
    duration = TIMING.slow,
    ease = EASE.cinematic,
  } = options

  // Split into child elements (lines/words)
  const children = element.children.length > 0
    ? Array.from(element.children)
    : [element]

  gsap.set(children, { y, opacity: 0 })

  return gsap.to(children, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
  })
}

/**
 * Slow image parallax — image moves slower than scroll
 */
export function createParallax(element, options = {}) {
  const {
    trigger = element.parentElement,
    y = '-15%',
    start = 'top bottom',
    end = 'bottom top',
  } = options

  return gsap.to(element, {
    y,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  })
}

/**
 * Slow scale on scroll — cinematic image zoom
 */
export function createScaleReveal(element, options = {}) {
  const {
    trigger = element.parentElement,
    from = 1.1,
    to = 1.0,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  gsap.set(element, { scale: from })

  return gsap.to(element, {
    scale: to,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: true,
    },
  })
}

/**
 * Fade in on scroll — simple opacity reveal
 */
export function createFadeIn(element, options = {}) {
  const {
    trigger = element,
    start = 'top 85%',
    duration = TIMING.normal,
    delay = 0,
    y = 30,
  } = options

  gsap.set(element, { opacity: 0, y })

  return gsap.to(element, {
    opacity: 1,
    y: 0,
    duration,
    delay,
    ease: EASE.smooth,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: 'play none none none',
    },
  })
}

/**
 * Pin a section and scrub through progress
 */
export function createPinSection(trigger, options = {}) {
  const {
    start = 'top top',
    end = '+=400%',
    pin = true,
    scrub = 1,
    onUpdate,
  } = options

  return ScrollTrigger.create({
    trigger,
    start,
    end,
    pin,
    scrub,
    onUpdate,
  })
}

export { gsap, ScrollTrigger }
