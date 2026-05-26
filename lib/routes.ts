export const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/about': 'About',
  '/leadership': 'Leadership',
  '/locations': 'Locations',
  '/services': 'Services',
  '/services/project-development': 'Project Development',
  '/services/epc': 'EPC',
  '/services/installation-maintenance': 'Installation & Maintenance',
  '/services/financing': 'Financing',
  '/services/asset-management': 'Asset Management',
  '/industries': 'Industries',
  '/industries/commercial': 'Commercial',
  '/industries/government': 'Government',
  '/industries/utility-scale': 'Utility Scale',
  '/projects': 'Projects',
  '/partners': 'Partners',
  '/blog': 'Blog',
  '/contact': 'Contact',
}

export function getBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean)
  const breadcrumbs = [
    { label: routeLabels['/'], href: '/' }
  ]
  
  let currentPath = ''
  parts.forEach((part) => {
    currentPath += `/${part}`
    if (routeLabels[currentPath]) {
      breadcrumbs.push({
        label: routeLabels[currentPath],
        href: currentPath
      })
    }
  })
  
  return breadcrumbs
}
