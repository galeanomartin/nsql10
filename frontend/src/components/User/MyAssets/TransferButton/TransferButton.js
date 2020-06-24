import React, {useState} from 'react';

//************************************** React Components ******************************************
import OwnerAfterSelector from './OwnerAfterSelector'

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
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

//********************************************* Components *********************************************
import {transferAsset} from '../../../../utils/BigchainDB'

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
export default function TransferButton(props) {
    const classes = useStyles()

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false)
    const handleToggle = () => setOpen(!open)

    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})
    
    const [amount, setAmount] = useState(1)
    const handleAmount = amount => setAmount(amount)

    const [ownerAfter, setOwnerAfter] = useState(null)
    const handleOwnerAfter = ownerAfter => setOwnerAfter(ownerAfter)

    const [confirm, setConfirm] = useState('')
    const handleConfirm = confirm => setConfirm(confirm)

    const handleTransfer = async () => {
        try {
            if (!currentUser || !ownerAfter || !props.asset || !amount)
                return handleStatus(true, 'warning', '¡Ooops! ¡Para realizar la transferencia, todos los campos deben estar completos!')

            if (parseInt(amount) > parseInt(props.asset.amount))
                return handleStatus(true, 'warning', '¡Ooops! ¡No puede transferir activos que no posee!')

            const responseBuy = await transferAsset(currentUser.keys, ownerAfter.keys, props.asset, amount)
            return responseBuy
                ? handleStatus(true, 'success', '¡El Activo ha sido transferido exitosamente!!!',
                    //history.Push('/home')
                )
                
                : handleStatus(true, 'warning', '¡Ooops! Ha ocurrido un error al intentar comprar!!!')
        } catch (error) {
            return handleStatus(true, 'error', '¡Ooops! Ha ocurrido un inesperado!!!')
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
                        startIcon={<SendIcon fontSize="small"/>} 
                        className={classes.margin}
                        onClick={() => handleToggle()}
                    >Transferir</Button>
                            
                    <Backdrop className={classes.backdrop} open={open}>
                        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
                        <Paper elevation={5}>
                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs={10}>
                                    <h4 style={{color: '#735c0f', backgroundColor: '#fffbdd', textAlign: 'center'}}>
                                        ¡Transfiera el activo!
                                    </h4>
                                    <hr/>
                                    <p align="justify" style={{textAlign: 'center'}}>
                                        Esta a punto de confirmar una transferencia. Esto transferira su activo al propietario seleccionado. <b>{props.asset.asset.name}</b>.
                                        Por favor, escriba <b>{props.asset.asset.name}</b> para confirmar.
                                    </p>
                                    <hr/>
                                </Grid>
                            </Grid>

                            <Grid container direction="row" justify="space-around" alignItems="center" spacing={2}>
                                <Grid item xs={5}>
                                    <Tooltip title="Cantidad de activos" placement="bottom">
                                        <TextField
                                        required
                                        type="number"
                                        id="cantidad"
                                        name="cantidad"
                                        label={props.asset.amount}
                                        fullWidth
                                        InputProps={{inputProps: {min: '1', max: `${props.asset.amount}`}}}
                                        onChange={e => handleAmount(e.target.value)}
                                        />
                                    </Tooltip>
                                </Grid>

                                <Grid item xs={5}>
                                    <OwnerAfterSelector handleOwnerAfter={handleOwnerAfter}/>
                                </Grid>
                            </Grid>

                            <Grid container direction="column" justify="center" alignItems="center" spacing={2}>
                                <Grid item xs={10}>
                                    <Tooltip title="Nombre del activo" placement="bottom">
                                        <TextField required id="standard-basic" label="Activo" onChange={e => handleConfirm(e.target.value)}/>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={10}>
                                    <Button 
                                        variant="contained" 
                                        size="small" 
                                        color="secondary" 
                                        startIcon={<SendIcon fontSize="small"/>} 
                                        className={classes.margin}
                                        disabled={confirm !== props.asset.asset.name || status.showMessage ? true : false}
                                        onClick={() => handleTransfer()}
                                    >Transferir</Button>

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
                            ? <Alert severity={status.type} onClick={() => handleClose() & props.handleIsTransferred(true) & handleStatus(false)} style={{marginTop: '5px'}}><AlertTitle>{status.type}</AlertTitle> - {status.message}</Alert>
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