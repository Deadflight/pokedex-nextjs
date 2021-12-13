import { loadTranslations } from "ni18n";
import { useTranslation } from "react-i18next";
import { ni18nConfig } from "../ni18n.config"
import { themeOptions, Button, Grid, Typography } from "@/ui/index";


export const getStaticProps = async ({locale}) => {
  const i18nConf = await loadTranslations(ni18nConfig, locale, ['errors-page']);

  return {
    props: {
      ...i18nConf
    }
  }
}

const NotFound = () => {
  const { t } = useTranslation('errors-page');

  return (
      <Grid container sx={{justifyContent: 'center'}} >
        <Grid item xs={12}>
          <Typography variant="h2" align="center" gutterBottom >{t('wearesorry')}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center" gutterBottom>
            {t('notFoundErrorMessage')}
          </Typography>
        </Grid>
        <Grid item>
          <Button
              sx={{
                backgroundColor: themeOptions.palette.primary.main, 
                ":hover": {
                  backgroundColor: themeOptions.palette.primary.contrastText,
                  color: themeOptions.palette.primary.main
                }}}
              variant="contained"
              href="/"
              title={t('goHome')}
            >
              {t('goHome')}
          </Button>
        </Grid>
      </Grid>
  );
}

export default NotFound;