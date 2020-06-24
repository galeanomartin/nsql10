import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

//************************************ Components MAteria-UI ************************************
import {
  makeStyles,
  IconButton,
  Tooltip,
  ClickAwayListener,
  Popper,
  MenuItem,
  Grow,
  Paper,
  MenuList,
  Typography,
} from '@material-ui/core'

//************************************** Icons MAteria-UI ***************************************
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

//import logo from '../../styles/img/logo.png'


//****************************************** Styles  ********************************************

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

//********************************************* Components *********************************************
export default function UsersDropdown(props) {
  const history = useHistory()
  const classes = useStyles();

  const users = JSON.parse(localStorage.getItem('users'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  function handleCurrentUser(user) {
    //return localStorage.setItem('currentUser', JSON.stringify(user)) & history.push(`/users/${user.name}/assets`)
    return localStorage.setItem('currentUser', JSON.stringify(user)) & history.push('/home')
    //history.push(`/users/${currentUser.name}/assets`)}
  }

  return (
    <Fragment >
        <Tooltip title="Usuarios" placement="bottom">
            <IconButton 
            className={classes.menuButton} 
            color="inherit" aria-label="users"
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            >
            <AccountCircleIcon/>
            </IconButton>
        </Tooltip>

        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            {({ TransitionProps, placement }) => (
            <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
                <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                    {
                        users
                        ? 
                        users.map((user, i) =>  
                            <MenuItem key={i} onClick={() => handleCurrentUser(user)}>
                            {user.name}
                            </MenuItem>  
                        )
                        : null
                    }

                    </MenuList>
                </ClickAwayListener>

              



                </Paper>
            </Grow>
            )}
        </Popper>
    </Fragment>
  );
}