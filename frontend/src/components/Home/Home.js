import React from 'react';
//import image from '../styles/img/logo.png';
import boba from '../styles/img/boba.png';
//import { useHistory, Link } from 'react-router-dom'

import Header from '../Header'
//import KyloRen from './KyloRen'
//import BuyAssets from '../Assets/BuyAssets/BuyAssets';
//import MyAssets from '../User/MyAssets/index'

//************************************ Components MAteria-UI ************************************
import {  makeStyles  } from '@material-ui/core';

export default function Home() {

  const users = JSON.parse(localStorage.getItem('users'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))



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

  const classes = useStyles()


  return (
    <div>
      <Header />
      {/*<KyloRen/>
            <MyAssets />*/}

      <br />
      <br />
      {/*<h1>BlockchainDB Galáctico</h1>*/}

      <h1>{`Hola: ${currentUser.name}`} <p></p>Presiona la moneda</h1>

      
      
      {/*<a title= { `Ver Galactic coins de:  ${currentUser.name}`} href ={`/users/${currentUser.name}/assets`} >
                 <img alt="" style={{display:'block', marginTop:15, marginLeft:'auto', marginRight:'auto'}}src={image}></img>
          </a>*/}

      <a title={`Galactic Coins de:  ${currentUser.name}`} href={`/users/${currentUser.name}/assets`}>
        <img alt="" style={{ display: 'block', marginTop: 15, marginLeft: 'auto', marginRight: 'auto' }} src={boba} alt="" />
      </a>

      {/*<a title="Dart Vader" href="/users/Darth%20Vader/assets" target="_blank"><img src={image} alt="Los Tejos" /></a>
                 <a title="Boba Fett" href ={`/users/${currentUser.name}/assets`} target="_blank"><img src={boba} alt="Los Tejos" /></a>/*/}



    </div>


  )
}