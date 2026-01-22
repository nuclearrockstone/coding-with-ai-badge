import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
  // 默认使用英文，后续可以从 cookie 或 header 中获取
  const locale = 'en'

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
