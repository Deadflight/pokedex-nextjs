import { Box, Button, ButtonGroup, HomeIcon, IconButton, SearchIcon, Toolbar, Typography, themeOptions } from '@/ui/index'
import { Search, SearchIconWrapper, StyledAppBar, StyledInputBase } from '@/components/Header/HeaderStyles'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'


const Header = () => {
  const { t } = useTranslation(['common']);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledAppBar position="static" >
        <Toolbar>
          <Link href="/" passHref>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home button"
              sx={{mr:2}}
            >
              <HomeIcon/>
            </IconButton>
          </Link>
          <Typography variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block'} }}
          >
            Pokedex
          </Typography>
          <Link href="/search" passHref>
            <IconButton aria-label="search" color="inherit">
              <SearchIcon/>
            </IconButton>
          </Link>
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon/>
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={t('search')}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <LocaleOptions/>
        </Toolbar>
      </StyledAppBar>
    </Box>
  )
}

const LocaleOptions = () => {
  const { locales, locale } = useRouter()
  const { t } = useTranslation(['common'])

  // Locales aren't configured
  if (locales == undefined || locale == undefined) {
    return null
  }

  return (
    <>
      <Typography sx={{pr: '0.25rem', display: { xs: 'none', sm: 'block'}}} variant="body2" component="span">
        {t('language')}:
      </Typography>
      {locales.map((loc) => (
        <form
          action="/api/language/"
          method="POST"
          key={loc}
        >
          <input name="preferredLocale" value={loc} type="hidden"></input>
          <Button
            variant={loc === locale ? 'outlined' : 'text'}
            type="submit"
            color="inherit"
            size="small"
          >
            {loc}
          </Button>
        </form>
      ))}
    </>
  )
}

export default Header
