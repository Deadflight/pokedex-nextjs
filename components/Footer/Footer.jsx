import { 
  Container, 
  Grid, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  TwitterIcon,
  WebAssetIcon, 
  GitHubIcon,
  LinkedInIcon,
  themeOptions,
  Typography
} from '@/ui/index'
import { StyledFooter } from './FooterStyles'
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation(['common'])

  return (
    <StyledFooter 
      sx={{ 
        py: 3,
        px: 2,
        mt: 'auto',
      }} 
      component="footer">
      <Container>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item>
            <Typography variant="h6">
              Pokedex
            </Typography>           
          </Grid>
          <Grid item>
          <Typography variant="h6">
            {t('about')}
          </Typography>
          <List>
            <ListItem disablePadding>
              <ListItemText primary="Carlos Correa"/>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton disableGutters component="a" href="https://carloscorreaportfolio.netlify.app/">
                <ListItemIcon >
                  <WebAssetIcon sx={{ color: 'white '}}/>
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton disableGutters component="a" href="https://github.com/Deadflight">
                <ListItemIcon>
                  <GitHubIcon sx={{ color: 'white' }} />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton disableGutters component="a" href="https://www.linkedin.com/in/carloscorreamillan/">
                <ListItemIcon>
                  <LinkedInIcon sx={{ color: 'white' }} />
                </ListItemIcon>
              </ListItemButton>
              <ListItemButton disableGutters component="a" href="https://twitter.com/Deadfligth">
                <ListItemIcon>
                  <TwitterIcon sx={{ color: 'white' }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
          </List>
          </Grid>
        </Grid>
      </Container>
    </StyledFooter>
  )
}

export default Footer
