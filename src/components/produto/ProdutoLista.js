import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

function EquipLista(props) {

  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    axios.get("https://1ruolljjx9.execute-api.us-east-1.amazonaws.com/listar-equipamentos").then(
      r => {
        setRows(r.data.response)
      }
    )
  }, [])

  return (
    <div style={{ marginTop: 100 }}>
      <h4 style={{ fontSize: "18px", fontWeight: "bold" }}>{props.texto}</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Modelo</TableCell>
              <TableCell align="right">Numero de Série</TableCell>
              <TableCell align="right">Patrimonio</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row"> {row.modelo.toUpperCase()}</TableCell>
                <TableCell align="right">{row.n_serie}</TableCell>
                <TableCell align="right">{row.patrimonio.toUpperCase()}</TableCell>
                <TableCell align="right">{row.nome}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div >
  )
}


export default EquipLista