import React from 'react';

//************************************ Components Materia-UI ************************************
import {
    Tooltip,
    TextField,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';

//********************************************* Styles *********************************************
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

//********************************************* Components *********************************************
export default function UsersDropdown(props) {
    const classes = useStyles();

    const users = JSON.parse(localStorage.getItem('users'));
    const fields = [...users.map(user => user.name)]    

    return (
        <div className={classes.root}>

          <Tooltip title="Seleccione destinatario">
          <Autocomplete
              id="combo-box-users"
              options={fields ? fields : ''}
              renderInput={(params) => <TextField {...params} required id="standard-basic" label="Usuario"/>}
              onSelect={e => props.handleOwnerAfter(users.find(user => user.name === e.target.value))}
          />
          </Tooltip>

        </div>
    )
}