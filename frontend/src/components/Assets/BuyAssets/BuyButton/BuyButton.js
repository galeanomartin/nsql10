import React, {useState} from 'react';

//************************************** Material-UI Components ******************************************
import {
    TextField,
    Button,
    Grid,
    Backdrop,
    Paper,
    CircularProgress,
    Tooltip
} from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';

//************************************** Material-UI Icons ******************************************
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import CancelIcon from '@material-ui/icons/Cancel';

//********************************************* Components *********************************************
import {buyAsset} from '../../../../utils/BigchainDB'

//************************************* Styles ****************************************
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

//********************************************* Components *********************************************
export default function BuyButton(props) {
    const classes = useStyles()

    const DarthVader = JSON.parse(localStorage.getItem('users')).find(user => user.name === 'Darth Vader')
    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const [amount, setAmount] = useState(1)
    const handleAmount = amount => setAmount(amount)

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false)
    const handleToggle = () => setOpen(!open)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})
    
    const [confirm, setConfirm] = useState('')
    const handleConfirm = confirm => setConfirm(confirm)

    const handleBuy = async () => {
        try {
            const responseBuy = await buyAsset(currentUser.keys, DarthVader.keys, props.asset)
            return responseBuy
                ? handleStatus(true, 'success', '¡El Arma ha sido comprada exitosamente!!!')
                : handleStatus(true, 'warning', '¡Ooops! Ha ocurrido un error al intentar comprar :/ ¡Revisa que tus creditos sean suficientes! ')
        } catch (error) {
            return handleStatus(true, 'error', '¡Ooops! Ha ocurrido un inesperado :/')
        }
    }

    return (
        <div>
            {
            props 
            ?
                <Grid container direction="column" justify="center" alignItems="center" spacing={3}>
                    
                    <Button 
                        variant="contained" 
                        size="small" 
                        color="secondary" 
                        startIcon={<ShoppingBasketIcon fontSize="small"/>} 
                        className={classes.margin}
                        onClick={() => handleToggle()}
                    >Comprar</Button>
                            
                    <Backdrop className={classes.backdrop} open={open}>
                        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
                        <Paper elevation={5}>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs={10}>
                                    <h4 style={{color: '#735c0f', backgroundColor: '#fffbdd', textAlign: 'center'}}>
                                        ¡Compre el activo!
                                    </h4>

                                    <hr/>
                                    <p align="justify" style={{textAlign: 'center'}}>
                                        Esta a punto de confirmar una compra. Esto lo hara propietario del activo <b>{props.asset.asset.name}</b>.
                                        Por favor, escriba <b>{props.asset.asset.name}</b> para confirmar.
                                    </p>
                                    <hr/>
                                </Grid>
                                <Grid item xs={10}>
                                    <TextField required id="standard-basic" label="Activo" onChange={e => handleConfirm(e.target.value)}/>
                                </Grid>
                                <Grid item xs={10}>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        color="secondary" 
                                        startIcon={<ShoppingBasketIcon fontSize="small"/>} 
                                        className={classes.margin}
                                        disabled={confirm !== props.asset.asset.name || status.showMessage ? true : false}
                                        onClick={() => handleBuy()}
                                    >Comprar</Button>

                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        color="primary" 
                                        startIcon={<CancelIcon fontSize="small"/>} 
                                        className={classes.margin}
                                        disabled={status.showMessage ? true : false}
                                        onClick={() => handleClose()}
                                    >Cancelar</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                        {
                            status.showMessage 
                            ? <Alert severity={status.type} onClick={() => handleClose() & props.handleIsBuyed(true) & handleStatus(false)} style={{marginTop: '5px'}}><AlertTitle>{status.type}</AlertTitle> - {status.message}</Alert>
                            : ''
                        }
                        </Grid>
                    </Backdrop>

                </Grid>
            :
                <Grid 
                  container 
                  justify="center" 
                  alignItems="center"
                  style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginRight: '-50%',
                      transform: 'translate(-50%, -50%)',
                  }}
                >
                    <CircularProgress color="inherit"/>
                </Grid>
            }
        </div>
    )
}