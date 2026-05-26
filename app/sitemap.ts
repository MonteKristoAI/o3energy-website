import { MetadataRoute } from 'next'
import { servicesData } from '@/lib/data/services'
import { industriesData } from '@/lib/data/industries'
import { projectsData } from '@/lib/data/projects'
import { blogPosts } from '@/lib/data/blog'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://o3energy.com'

  const staticRoutes = [
    '',
    '/about',
    '/leadership',
    '/locations',
    '/awards',
    '/projects',
    '/services',
    '/industries',
    '/blog',
    '/contact',
    '/privacy',
    '/terms'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  const serviceRoutes = servicesData.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const industryRoutes = industriesData.map(industry => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const projectRoutes = projectsData.map(project => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogRoutes = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...projectRoutes, ...blogRoutes]
}
