import { Button, themeOptions } from '@/ui/index'
import { useTranslation } from 'react-i18next'

const FetchingButton = ({fetchNextPage, hasNextPage, isFetchingNextPage}) => {
  const { t } = useTranslation(['common'])

  return (   
              <Button sx={{
                backgroundColor: themeOptions.palette.primary.main, 
                  ":hover": {
                    backgroundColor: themeOptions.palette.primary.contrastText, 
                    color: themeOptions.palette.primary.main 
                  },
                }} 
                variant="contained"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
              >
                {
                  isFetchingNextPage
                  ? t('loadingMore')
                  : hasNextPage
                  ? t('loadMore')
                  : t('nothingToLoad')
                }
              </Button>
  )
}

export default FetchingButton
