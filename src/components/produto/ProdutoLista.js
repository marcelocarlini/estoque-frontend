import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

function EquipLista(props) {
  const [rows, setRows] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [modeloFiltro, setModeloFiltro] = useState('Todos');
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
    const selectedStatus = event.target.value;
    setStatusFiltro(selectedStatus);
  };

  const handleModeloChange = (event) => {
    const selectedModelo = event.target.value;
    setModeloFiltro(selectedModelo);
  };

  const totalPorStatusTexto = (status) => {
    let total = 0;
    if (status === "Todos") {
      Object.values(totalPorStatus).forEach(value => {
        total += value;
      });
    } else {
      const filtroStatus = rows.filter(row => row.status === status && (modeloFiltro === "Todos" || row.modelo === modeloFiltro));
      total = filtroStatus.length;
    }
    return total;
  };

  const modelosUnicos = [...new Set(rows.map(row => row.modelo))];

  const filtro = rows.filter(row => {
    if (statusFiltro !== "Todos" && row.status !== statusFiltro) {
      return false;
    }
    if (modeloFiltro !== "Todos" && row.modelo !== modeloFiltro) {
      return false;
    }
    return true;
  });

  return (
    <div style={{ marginTop: 100 }}>
      <h4 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: '20px' }}>{props.texto}</h4>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', flex: 1 }}>
          <FormControl style={{ marginRight: '20px' }}>
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
              <MenuItem value="Todos">Todos</MenuItem>
              <MenuItem value="EM USO">Em uso</MenuItem>
              <MenuItem value="DISPONÍVEL">Disponível</MenuItem>
              <MenuItem value="BAIXA">Baixa</MenuItem>
              <MenuItem value="RETORNO">Retorno</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id="modelo-filter-label">Modelo</InputLabel>
            <Select
              labelId="modelo-filter"
              id="modelo-filter"
              value={modeloFiltro}
              label="Modelo"
              onChange={handleModeloChange}
              sx={{
                width: '140px',
                marginBottom: '10px'
              }}
            >
              <MenuItem value="Todos">Todos</MenuItem>
              {modelosUnicos.map(modelo => (
                <MenuItem key={modelo} value={modelo}>{modelo}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {statusFiltro && (
          <Typography style={{ marginTop: '10px' }}>
            Total de equipamentos: {totalPorStatusTexto(statusFiltro)}
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
