import React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import axios from 'axios';
import { useEffect } from 'react';

function CategoriaLista(props) {

  const [rows, setRows] = React.useState([])

  React.useEffect(() => {
    axios.get("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/listar-categorias").then(
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
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.nome.toUpperCase()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></div >
  )
}

export default CategoriaLista