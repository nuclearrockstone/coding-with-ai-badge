import { SITE_CONFIG } from '@/app/lib/types'

export default function sitemap() {
  return [
    {
      url: SITE_CONFIG.domain,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]
}
