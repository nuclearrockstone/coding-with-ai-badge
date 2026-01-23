import { SITE_CONFIG } from '@/app/lib/types'

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: `${SITE_CONFIG.domain}/sitemap.xml`,
  }
}
