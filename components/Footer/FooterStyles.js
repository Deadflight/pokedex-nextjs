import { Box, styled, themeOptions } from '@/ui/index'

export const StyledFooter = styled(Box)(() => ({
  color: themeOptions.palette.primary.contrastText,
  backgroundColor: themeOptions.palette.primary.main,
  minHeight: '4rem',
  width: '100%',
}))