import React, {useState, useEffect, useCallback} from 'react';

//************************************** Components React ***************************************
import BuyWeapons from './BuyWeapons'

//************************************ Components MAteria-UI ************************************
import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';

//************************************ BigchainDb ************************************
import {groupCredits} from '../../../utils/BigchainDB'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 45,
    },
    paper: {
      padding: theme.spacing(0),
      textAlign: 'center',
      marginTop: 5,
      marginRight: 15,
      marginLeft: 15,
      paddingBottom: 5,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
  }));

export default function BuyAssets() {
    const classes = useStyles()
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const [isBuyed, setIsBuyed] = useState(false)
    const handleIsBuyed = bool => setIsBuyed(bool)

    const [creditsCurrentUser, setCreditsCurrentUser] = useState(null)
    const handleCreditsCurrentUser = creditsCurrentUser => setCreditsCurrentUser(creditsCurrentUser)

    const groupCreditsMemorized = useCallback(async () => await groupCredits(currentUser.keys, 'credit'), [currentUser.keys])


    useEffect(() => {
        if (isBuyed || !creditsCurrentUser)
          groupCreditsMemorized()
            .then(creditsCurrentUser => handleCreditsCurrentUser(creditsCurrentUser))
            .then(handleIsBuyed(false))
      }, [isBuyed, groupCreditsMemorized, creditsCurrentUser]);

    return (
        <div className={classes.root}>

        <Grid container justify="center" alignItems="center" spacing={1}>
          <Grid item xs={6}>
            <Paper elevation={2}  className={classes.paper}>
              <Typography color="textPrimary" align="center" variant="h5"> Comprar Armas</Typography>
            </Paper>
          </Grid>
          <Grid item xs={2}>
            <Paper elevation={2}  className={classes.paper}>
              <Typography color="textPrimary" align="center" variant="h5"> {`Total de Monedas disponible: ${creditsCurrentUser ? creditsCurrentUser : ''}`} </Typography>
            </Paper>
          </Grid>
        </Grid>

        <Grid container justify="space-around" spacing={1}>
            <Grid item xs={10}>
              <Paper elevation={5}  className={classes.paper}>
                  <BuyWeapons handleIsBuyed={handleIsBuyed}/>
              </Paper>
            </Grid>
        </Grid>
        
    </div>
    )
}