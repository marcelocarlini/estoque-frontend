import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import axios from 'axios';
import '../../partials/_produtolista.scss'

function ProdutoLista(props) {
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
    <div className="produto-lista-container">
      <h4 className="produto-lista-title">{props.texto}</h4>
      <div className="produto-filtros">
        <div className="produto-filtro">
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
      <TableContainer component={Paper} className="produto-tabela">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="produto-tabela-header">Modelo</TableCell>
              <TableCell className="produto-tabela-header" align="right">Numero de Série</TableCell>
              <TableCell className="produto-tabela-header" align="right">Patrimonio</TableCell>
              <TableCell className="produto-tabela-header" align="right">Categoria</TableCell>
              <TableCell className="produto-tabela-header" align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filtro.slice().reverse().map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" className="produto-item">{row.modelo.toUpperCase()}</TableCell>
                <TableCell align="right" className="produto-item">{row.n_serie}</TableCell>
                <TableCell align="right" className="produto-item">{row.patrimonio.toUpperCase()}</TableCell>
                <TableCell align="right" className="produto-item">{row.nome}</TableCell>
                <TableCell align="right" className="produto-item">{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProdutoLista;
