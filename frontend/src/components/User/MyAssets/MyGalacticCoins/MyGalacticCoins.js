import React, {useState, useEffect, useCallback} from 'react';

//************************************ Components MAteria-UI ************************************
import TransferButton from '../TransferButton'

//************************************ Components MAteria-UI ************************************
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@material-ui/core'

//************************************** Styles ***************************************
import { withStyles, makeStyles } from '@material-ui/core/styles';

//************************************** Icons MAteria-UI ***************************************
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

//************************************** BigchainDB ***************************************
import {getMyAssets} from '../../../../utils/BigchainDB'

const columns = [
  { id: 'coin', label: 'Moneda', minWidth: 170 },
  { id: 'price', label: 'Precio', minWidth: 100 },
  { id: 'amount', label: 'Cantidad', minWidth: 100 },
  { id: 'transfer', label: 'Transferir', minWidth: 100 },
];

function createData(coin, price, amount, transfer) {
  return { coin, price, amount, transfer };
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
  title: {
    flex: '1 1 100%',
  },
});



export default function MyGalacticCoins() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))
  const classes = useStyles();

  
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  const [rows, setRows] = useState([])
  const handleRows = rows => setRows(rows)

  const [isTransferred, setIsTransferred] = useState(false)
  const handleIsTransferred = bool => setIsTransferred(bool)

  const [assets, setAssets] = useState([])
  const handleAssets = assets => setAssets(assets)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getMyAssetsMemorized = useCallback(async () => await getMyAssets(currentUser.keys, 'credit'), [currentUser.keys])


  useEffect(() => {
    if (isTransferred || assets.length === 0)
      getMyAssetsMemorized()
        .then(assetsCurrentUser => handleAssets(assetsCurrentUser))
        .then(() => handleIsTransferred(false))
  }, [isTransferred, getMyAssetsMemorized, assets.length]);

  useEffect(() => {
    if (assets.length !== 0) {
      const assetsParsed = assets.map(asset => 
        createData(asset.asset.name, asset.asset.price, asset.amount, <TransferButton asset={asset} handleIsTransferred={handleIsTransferred}/>)
      )
      handleRows(assetsParsed)
    }
  }, [assets]);

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            <h3 style={{marginLeft:20}}>{/*<MonetizationOnIcon fontSize="small"/>*/} Mis Monedas</h3>
        </Typography>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <StyledTableRow>
              {columns.map((column) => (
                <StyledTableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}