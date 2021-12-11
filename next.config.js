module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['source.unsplash.com'],
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    domains: [  // Define domains for each locale
      {
        domain: 'https://pokedex-nextjs-beta.vercel.app/',
        defaultLocale: 'en'
      },
      {
        domain: 'https://pokedex-nextjs-beta.vercel.app/es',
        defaultLocale: 'es',
      },
    ]
  }
}
