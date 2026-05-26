'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'

const navItems = [
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/projects', label: 'Projects' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        <Logo variant="header" onNavigate={() => setOpen(false)} />
        <nav className="hidden lg:flex items-center gap-6 font-medium text-text-2 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-brand-orange transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href="tel:8889992902"
            className="hidden xl:inline-flex text-sm font-semibold text-brand-primary hover:text-brand-orange transition-colors"
          >
            (888) 999-2902
          </a>
          <Button
            asChild
            className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full font-semibold hidden md:inline-flex"
          >
            <Link href="/contact">Request a Consultation</Link>
          </Button>
          <button
            className="lg:hidden h-11 w-11 flex items-center justify-center text-brand-primary hover:text-brand-orange transition-colors rounded-full focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 outline-none"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden border-t border-border bg-bg-white shadow-lg">
          <nav className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-1 font-medium text-brand-primary">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 px-2 rounded-lg hover:bg-bg-cream hover:text-brand-orange transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="tel:8889992902"
              className="py-3 px-2 rounded-lg text-brand-primary hover:bg-bg-cream hover:text-brand-orange transition-colors"
              onClick={() => setOpen(false)}
            >
              (888) 999-2902
            </a>
            <Button
              asChild
              className="bg-brand-orange hover:bg-brand-orange/90 text-white rounded-full font-semibold w-full mt-3"
              onClick={() => setOpen(false)}
            >
              <Link href="/contact">Request a Consultation</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
