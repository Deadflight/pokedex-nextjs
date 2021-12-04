import { serialize } from 'cookie'

// Sadly, getting the locale info in API Routes is not officially supported.
// It should match next.config::i18n.defaultLocale
const DEFAULT_LOCALE = 'en'

// Learn more: https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
const PREFERRED_LOCALE_COOKIE = 'NEXT_LOCALE'

const languageHandler = (request, response) => {
  if (request.method === 'GET') {
    const preferredLocale = request.cookies[PREFERRED_LOCALE_COOKIE] || ''

    return response.status(200).json({
      preferredLocale,
      defaultLocale: DEFAULT_LOCALE,
    })
  }

  if (request.method === 'POST') {
    const newPreferredLocale = request.body.preferredLocale

    // For this page, we don't care setting an invalid value.
    // worst case: the value is ignored and Next.js defaults to defaultLocale. Not critical.
    setCookie(response, PREFERRED_LOCALE_COOKIE, newPreferredLocale, {
      // Heads-up: the NEXT_LOCALE must be set to the `/` path
      path: '/',
    })

    // 307 (temporary) redirect to homepage
    response.redirect('/')
    return response.end()
  }

  // Not other supported method
  response.status(405).end()
}

function setCookie(
  res,
  name,
  value,
  options
) {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

export default languageHandler