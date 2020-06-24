import React from 'react';
//import { useHistory } from 'react-router-dom'

import MyGalacticCoins from './MyGalacticCoins';
import MyWeapons from './MyWeapons';

import { Grid, makeStyles, Paper, Button, Typography } from '@material-ui/core';

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
  grid: {
    marginLeft: 1,
    marginRight: 1
  }
}));

export default function MyAssets() {
  //const history = useHistory()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))



  const classes = useStyles()

  return (
    <div className={classes.root}>

      {
        currentUser.name
          ?

          <Grid container justify="center" alignItems="center" spacing={3}>
            <Grid item xs={4}>
              <Paper elevation={2} className={classes.paper}>
                < br/>
                <Typography color="textPrimary" align="center" variant="h5"> <b>Galactic Coins de {currentUser.name}</b></Typography>
                <br/>
                {
                  currentUser.name === 'Darth Vader'
                    ?
                    <Button className={classes.button} href="/assets/create" size="medium" variant="contained" color="primary">
                      Crear Galactic Coins
                </Button>
                    :
                    
                    <Button className={classes.button} href="/assets/buy" size="medium" variant="contained" color="primary">
                    Comprar Armas
              </Button>

                }

                {/*<h1>PONER BOTON</h1>/*/}
              </Paper>
            </Grid>
          </Grid>

          : ''
      }



      <Grid container direction="row" justify="space-around" alignItems="center" spacing={1}>
        <Grid item xs={6}>
          <Paper elevation={5} className={classes.paper}>
            <MyGalacticCoins />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={5} className={classes.paper}>
            <MyWeapons />
          </Paper>
        </Grid>
      </Grid>

    </div>
  )
}