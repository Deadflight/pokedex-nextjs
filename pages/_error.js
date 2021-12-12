import Layout from "@/components/Layout";
import { loadTranslations } from "ni18n"
import { useTranslation } from "react-i18next";
import { ni18nConfig } from "../ni18n.config"
import { themeOptions, Button, Grid, Typography  } from "@/ui/index";
import NotFound from "./404";
import ServerError from "./500";

export const getServerSideProps = async ({locale, res}) => {
  const i18nConf = await loadTranslations(ni18nConfig, locale, ['errors-page']);
  const statusCode = res.statusCode;

  return{
    props:{
      statusCode,
      ...i18nConf
    }
  }
}

const ErrorPage = ({statusCode, message}) => {
  const { t } = useTranslation(['errors-page'])

  if(statusCode === 404){
    return <NotFound/>
  }

  if (typeof statusCode === 'number' && statusCode > 500) {
    return <ServerError statusCode={statusCode} />
  }

  let errorMessage = message
  if (!message) {
    errorMessage = statusCode ? t('serverError') : t('clientError')
  }

  return(
    <Layout>
      <Grid container sx={{justifyContent: 'center'}}>
        <Grid item xs={12}>
          <Typography align="center" variant="h5">{t('errorMessage')}</Typography>
        </Grid>
        {!statusCode ? null : (
          <Grid item xs={12}>
            <Typography variant="body1" align="center" gutterBottom>
              <span style={{backgroundColor: '#cfcfcf' }}>
                ERRORCODE: {statusCode}
              </span>
            </Typography>
          </Grid>
        )}
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
    </Layout>
  )
}

export default ErrorPage