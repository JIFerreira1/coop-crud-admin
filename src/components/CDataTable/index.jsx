import React, { useState, useEffect } from 'react';

import { DataGrid } from '@material-ui/data-grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import useStyles from './style';

export default function CDataTable({dataReceived}) {
  const classes = useStyles();
  let [goRendered, setGoRendered] = useState(false)
  useEffect(() => {
    setGoRendered = true
  }, [dataReceived.length > 0])
  return (
    
    <DataGrid pagination {...dataReceived} />
    // <TableContainer component={Paper}>
    //   <Table className={classes.table} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Dessert (100g serving)</TableCell>
    //         <TableCell align="right">Calories</TableCell>
    //         <TableCell align="right">Fat&nbsp;(g)</TableCell>
    //         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
    //         <TableCell align="right">Protein&nbsp;(g)</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {dataReceived.map((row) => (
    //         <TableRow key={row.nome}>
    //           <TableCell component="th" scope="row">
    //             {row.nome}
    //           </TableCell>
    //           <TableCell align="right">{row.calories}</TableCell>
    //           <TableCell align="right">{''}</TableCell>
    //           <TableCell align="right">{''}</TableCell>
    //           <TableCell align="right">{''}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>
    // </TableContainer>
  );
}
