import React, { useState } from 'react';
import capitalize from '../../../../utils/capitalize'

import { Grid, TextField, Button, makeStyles } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import {createAsset} from '../../../../utils/BigchainDB'

const useStyles = makeStyles((theme) => ({
    grid:{
      marginLeft:1,
      marginRight:1
    },
    button:{
      background: '#242424',
      color:'#ffffff'
    }
  }));

export default function CreateCredit() {
    const classes = useStyles()
    const DarthVader = JSON.parse(localStorage.getItem('users')).find(user => user.name === 'Darth Vader')

    let creditDefault = {
        name:'',
        price: '1',
        type:'credit'
      }

    const [credit, setCredit] = useState(creditDefault)
    const [amount, setAmount] = useState(1)

    const handlePrice = price => setCredit({...credit, price: price})
    const handleAmount = amount => setAmount(amount)
    const handleName = name => setCredit({...credit, name: name})

    const handleCreditDefault = cred => setCredit(cred)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})  

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            if (credit.name === '' || !DarthVader)
                return handleStatus(true, 'info', 'Debe tener en cuenta que no se permiten campos vacíos.')
            
            return await createAsset(DarthVader.keys, credit, amount)
                .then(responseCreate => responseCreate 
                    ? handleStatus(true, 'success', 'Moneda creada creada exitosamente!!!')
                    : handleStatus(true, 'error', 'Ooops! Ha ocurrido un error :(')
                )
                .then(() => setInterval(() => handleStatus(false), 5000))
                .then(() => handleCreditDefault(creditDefault))
                 
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

    return (
        <div>
            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Alert severity={status.type}>{status.message}</Alert>
                    : null
                }
            </div>

            <form onSubmit={handleSubmit}>
                <Grid container direction="row" justify="flex-start" alignItems="center">
                    <h1 style={{marginLeft:20}}>{/*<MonetizationOnIcon fontSize="small"/>*/} Crear Moneda</h1>
                </Grid>
                <Grid container spacing={3} className={classes.grid}>
                <Grid item xs={8}>
                    <TextField
                    required
                    type="text"
                    id="nombre"
                    name="nombre"
                    label="Nombre de la Moneda"
                    fullWidth
                    onChange={e => handleName(capitalize(e.target.value))}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                    type="number"
                    //required
                    id="precio"
                    name="precio"
                    label="Precio"
                    fullWidth
                    value={credit.price}
                    onChange={e => handlePrice(`${e.target.value}`)}
                    disabled
                    />
                </Grid>
                {/*}
                <Grid item xs={3}>
                    <TextField
                    type="number"
                    required
                    id="precio"
                    name="precio"
                    label="precio"
                    fullWidth
                    onChange={e => handlePrice(`${e.target.value}`)}
                    />
            </Grid>*/}



                <Grid item xs={5}>
                    <TextField
                    required
                    type="number"
                    id="cantidad"
                    name="cantidad"
                    label="Cantidad"
                    fullWidth
                    inputProps={{min: '1'}}
                    onChange={e => handleAmount(e.target.value)}
                    />
                </Grid>
                <Grid item xs={5}>
                    <Button className={classes.button} type="submit" size="medium" variant="contained">
                    CREAR MONEDA 
                    </Button>
                </Grid>

                </Grid>
            </form>
        </div>
    )
}