import React from 'react';
import image from '../../styles/img/logo.png'

import CreateCredit from './CreateCredit'
import CreateWeapon from './CreateWeapon'

import { Grid, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: 45,
    },
    paper: {
      padding: theme.spacing(1),
      textAlign: 'center',
      marginTop: 15,
      marginRight: 15,
      paddingBottom: 25,
      color: theme.palette.text.secondary,
    },
    grid:{
      marginLeft:1,
      marginRight:1
    }
  }));

export default function CreateAssets() {
    const classes = useStyles()

    return (
        <div className={classes.root}>

        <Grid container spacing={2}>
            <Grid item xs={6}>
              <br/><br/>
            <a title="Dart Vader - HOME" href="/users/Darth%20Vader/assets">
              <img alt="" style={{display:'block', marginTop:15, marginLeft:'auto', marginRight:'auto'}}src={image}></img>
              </a>
              {/*<Button className={classes.button} href="/assets/create" size="medium" variant="contained" color="primary">
                      Crear Galactic Coins
                </Button>
              {/*<a title="Dart Vader" href="/users/Darth%20Vader/assets" target="_blank"><img src={image} alt="Los Tejos" /></a>*/}

            </Grid>
            <Grid item xs={6}>
                <Paper elevation={5}  className={classes.paper}>
                  <CreateCredit/>
                </Paper>
                <Paper elevation={5}  className={classes.paper}>
                  <CreateWeapon/>
                </Paper>
            </Grid>
        </Grid>
      </div>
    )
}