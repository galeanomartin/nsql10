import React, { Fragment } from 'react'

//************************************** Components React ***************************************
import UsersDropdown from '../UsersDropdown';
import AssetsDropdown from '../AssetsDropdown';

//************************************** Props MAteria-UI ***************************************
import PropTypes from 'prop-types'

//************************************ Components MAteria-UI ************************************
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Slide,
  makeStyles,
  Typography,
  Tooltip,
} from '@material-ui/core'

//************************************** Icons MAteria-UI ***************************************
import logo from '../../styles/img/logo.png'

//****************************************** Styles  ********************************************
HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  theme: {
    background: '#242424',
  },
  logo: {
    fillColor: theme.palette.primary.main,
  }
}));

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({ target: window ? window() : undefined });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

//********************************************* Components *********************************************
export default function HideAppBar(props) {
  const classes = useStyles();

  return (
    <Fragment >
      <CssBaseline />
      <HideOnScroll {...props}>
        <div className={classes.root}>
          <AppBar className={classes.theme}>
            <Toolbar>

            <Typography variant="h6" className={classes.title}>
              <a href="/home" /* target="_blank"*/>
                <Tooltip title="Home" placement="bottom">
                  <img 
                    src={logo} alt="logo" 
                    className={classes.logo} 
                    style={{width: '100px'}}/>
                </Tooltip>
              </a>
            </Typography>
            
            

              
            



            <UsersDropdown/>
            <AssetsDropdown/>

            </Toolbar>
          </AppBar>
        </div>
        </HideOnScroll>
      <Toolbar />
    </Fragment>
  );
}