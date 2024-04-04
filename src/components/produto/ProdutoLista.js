import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EquipLista(props) {
  const [rows, setRows] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState('');
  const [totalPorStatus, setTotalPorStatus] = useState({});

  useEffect(() => {
    axios.get("https://1ruolljjx9.execute-api.us-east-1.amazonaws.com/listar-equipamentos").then(
      r => {
        setRows(r.data.response);
      }
    );
  }, []);

  useEffect(() => {
    const totalEquipamentosPorStatus = {};
    rows.forEach(row => {
      if (!totalEquipamentosPorStatus[row.status]) {
        totalEquipamentosPorStatus[row.status] = 1;
      } else {
        totalEquipamentosPorStatus[row.status]++;
      }
    });
    setTotalPorStatus(totalEquipamentosPorStatus);
  }, [rows]);

  const handleStatusChange = (event) => {
    setStatusFiltro(event.target.value);
  };
  const totalPorStatusTexto = (status) => {
    return totalPorStatus[status] || 0;
  };

  const filtro = statusFiltro ? rows.filter(row => row.status === statusFiltro) : rows;

  return (
    <div style={{ marginTop: 100 }}>
      <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: '20px' }}>{props.texto}</h4>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FormControl style={{ flex: 1, marginRight: '20px' }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter"
            id="status-filter"
            value={statusFiltro}
            label="Status"
            onChange={handleStatusChange}
            sx={{
              width: '140px',
              marginBottom: '10px'
            }}
          >
            <MenuItem value="">Todos</MenuItem>
            <MenuItem value="EM USO">Em uso</MenuItem>
            <MenuItem value="DISPONÍVEL">Disponível</MenuItem>
            <MenuItem value="BAIXA">Baixa</MenuItem>
            <MenuItem value="RETORNO">Retorno</MenuItem>
          </Select>
        </FormControl>
        {statusFiltro && (
          <Typography style={{ marginTop: '10px' }}>
            Total de players: {totalPorStatusTexto(statusFiltro)}
          </Typography>
        )}
      </div>


      <TableContainer component={Paper} sx={{ marginTop: '10px' }}>
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
            {filtro.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row"> {row.modelo.toUpperCase()}</TableCell>
                <TableCell align="right">{row.n_serie}</TableCell>
                <TableCell align="right">{row.patrimonio.toUpperCase()}</TableCell>
                <TableCell align="right">{row.nome}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default EquipLista;
