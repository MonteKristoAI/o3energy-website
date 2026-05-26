'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { getBreadcrumbs } from '@/lib/routes'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { BreadcrumbItem as BreadcrumbItemType } from '@/lib/types'

export function BreadcrumbNav({ items, generateFromPath = true }: { items?: BreadcrumbItemType[], generateFromPath?: boolean }) {
  const pathname = usePathname()
  
  if (pathname === '/') return null
  
  const breadcrumbs = generateFromPath ? getBreadcrumbs(pathname) : items
  
  if (!breadcrumbs || breadcrumbs.length === 0) return null

  return (
    <div className="w-full border-b border-border bg-bg-cream/80 backdrop-blur-xl sticky top-16 z-40 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1
              return (
                <React.Fragment key={crumb.href}>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage className="font-semibold text-brand-primary">{crumb.label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={crumb.href} className="text-text-2 hover:text-brand-orange transition-colors">
                        {crumb.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLast && <BreadcrumbSeparator />}
                </React.Fragment>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  )
}
