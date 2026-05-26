'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface LogoProps {
  variant?: 'header' | 'footer'
  onNavigate?: () => void
}

export function Logo({ variant = 'header', onNavigate }: LogoProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isHome) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    onNavigate?.()
  }

  const sizeClass = variant === 'header' ? 'text-2xl' : 'text-3xl'
  const colorClass = variant === 'header' ? 'text-brand-primary' : 'text-white'

  return (
    <Link
      href="/"
      onClick={handleClick}
      aria-label={isHome ? 'Scroll to top of home page' : 'Go to home page'}
      className="flex items-center gap-2"
    >
      <span className={`font-display font-bold ${sizeClass} ${colorClass} tracking-tight`}>
        O3<span className="text-brand-orange">Energy</span>
      </span>
    </Link>
  )
}
