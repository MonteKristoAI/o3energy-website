'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useSpring, useTransform, useInView } from 'framer-motion'
import { Metric } from '@/lib/types'

export function MetricTile({ value, label, suffix = '', prefix = '', decimals = 0, duration = 2 }: Metric) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })
  const [hasReducedMotion, setHasReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setHasReducedMotion(mediaQuery.matches)
  }, [])

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  })

  const display = useTransform(spring, (current) => {
    return Number(current.toFixed(decimals)).toLocaleString()
  })

  useEffect(() => {
    if (isInView && !hasReducedMotion) {
      spring.set(value)
    } else if (hasReducedMotion) {
      spring.set(value)
    }
  }, [isInView, hasReducedMotion, spring, value])

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 p-5 md:p-6 bg-brand-dark border border-white/10 rounded-2xl shadow-sm text-center md:text-left h-full"
    >
      <div
        className="font-display font-extrabold tabular-nums leading-none tracking-tight text-accent-coral text-[clamp(2rem,3vw+0.75rem,3.25rem)]"
        aria-label={`${prefix}${value}${suffix} ${label}`}
      >
        <span>{prefix}</span>
        <motion.span aria-hidden="true">{display}</motion.span>
        <span>{suffix}</span>
      </div>
      <div
        className="text-xs md:text-sm font-body font-medium text-white/70 uppercase tracking-widest"
        aria-hidden="true"
      >
        {label}
      </div>
    </div>
  )
}
