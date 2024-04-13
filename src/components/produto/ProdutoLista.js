import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, FormControl, InputLabel, MenuItem, Select, Typography, TextField, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import axios from 'axios';
import '../../partials/_produtolista.scss';

function ProdutoLista(props) {
  const [rows, setRows] = useState([]);
  const [statusFiltro, setStatusFiltro] = useState('Todos');
  const [modeloFiltro, setModeloFiltro] = useState('Todos');
  const [totalPorStatus, setTotalPorStatus] = useState({});
  const [filtro, setFiltro] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    // Carregar os equipamentos ao montar o componente
    axios.get("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/listar-equipamentos").then(
      r => {
        setRows(r.data.response);
      }
    );
  }, []);

  useEffect(() => {
    // Atualizar o total de equipamentos por status sempre que a lista de equipamentos mudar
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

  // Função para lidar com a mudança de filtro de status
  const handleStatusChange = (event) => {
    const selectedStatus = event.target.value;
    setStatusFiltro(selectedStatus);
  };

  // Função para lidar com a mudança de filtro de modelo
  const handleModeloChange = (event) => {
    const selectedModelo = event.target.value;
    setModeloFiltro(selectedModelo);
  };  

  // Função para lidar com a mudança de filtro de pesquisa
  const handleFiltroChange = (event) => {
    const valorFiltro = event.target.value.toUpperCase();
    setFiltro(valorFiltro);
  };

  // Função para calcular o total de equipamentos por status
  const totalPorStatusTexto = (status) => {
    let total = 0;
    if (status === "Todos") {
      // Se o status for "Todos" e o modelo também for "Todos",
      // retornamos o total geral de equipamentos
      if (modeloFiltro === "Todos") {
        Object.values(totalPorStatus).forEach(value => {
          total += value;
        });
      } else {
        // Se o status for "Todos" e um modelo específico for selecionado,
        // filtramos as linhas com base apenas no modelo selecionado
        total = rows.filter(row => row.modelo === modeloFiltro).length;
      }
    } else {
      // Caso contrário, aplicamos o filtro de status e, se necessário, o filtro de modelo
      const filtroStatus = rows.filter(row => row.status === status && (modeloFiltro === "Todos" || row.modelo === modeloFiltro));
      total = filtroStatus.length;
    }
    return total;
  };



  // Obter modelos únicos para o filtro de modelo
  const modelosUnicos = [...new Set(rows.map(row => row.modelo))];

  // Aplicar filtros e pesquisa aos resultados
  const filtroResultado = rows.filter(row =>
    (statusFiltro === "Todos" || row.status === statusFiltro) &&
    (modeloFiltro === "Todos" || row.modelo === modeloFiltro) &&
    (filtro === "" ||
      row.modelo.toUpperCase().includes(filtro) ||
      row.n_serie.toUpperCase().includes(filtro) ||
      row.patrimonio.toUpperCase().includes(filtro) ||
      row.nome.toUpperCase().includes(filtro) ||
      row.status.toUpperCase().includes(filtro))
  );

  // Função para abrir o diálogo de edição de status
  const handleEditStatus = (row) => {
    setSelectedRow(row);
    setEditDialogOpen(true);
  };

  // Função para confirmar a edição de status
  const handleConfirmEdit = () => {
    if (!selectedRow || !newStatus) {
      console.error('Erro ao confirmar a edição do status.');
      return;
    }
    // Enviar solicitação para atualizar o status no backend
    axios.put("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/editar-status", {
      id: selectedRow.id,
      novo_status: newStatus
    })
      .then(response => {
        console.log("Status editado com sucesso:", response.data);
        // Atualizar o estado local dos equipamentos com o novo status
        setRows(rows.map(row => {
          if (row.id === selectedRow.id) {
            return { ...row, status: newStatus };
          }
          return row;
        }));
        setNewStatus('');
        setSelectedRow(null);
        setEditDialogOpen(false);
      })
      .catch(error => {
        console.error('Erro ao editar status:', error);
        setEditDialogOpen(false);
      });
  };

  // Função para cancelar a edição de status
  const handleCancelEdit = () => {
    setSelectedRow(null);
    setNewStatus('');
    setEditDialogOpen(false);
  };

  return (
    <div className="produto-lista-container">
      <h4 className="produto-lista-title">{props.texto}</h4>
      <div className="produto-filtros">
        <div className="produto-filtro">
          {/* Filtro por status */}
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
          {/* Filtro por modelo */}
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
        {/* Exibir total de equipamentos por status */}
        {statusFiltro && (
          <Typography style={{ marginTop: '10px' }}>
            Total de equipamentos: {totalPorStatusTexto(statusFiltro)}
          </Typography>
        )}
      </div>
      {/* Campo de pesquisa */}
      <TextField
        value={filtro}
        onChange={handleFiltroChange}
        style={{ marginTop: "10px", width: '70%' }}
        id="outlined-basic"
        label="Pesquisar"
        variant="outlined"
      />
      {/* Tabela de equipamentos */}
      <TableContainer component={Paper} className="produto-tabela">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {/* Cabeçalhos das colunas */}
              <TableCell className="produto-tabela-header">Modelo</TableCell>
              <TableCell className="produto-tabela-header" align="right">Numero de Série</TableCell>
              <TableCell className="produto-tabela-header" align="right">Patrimonio</TableCell>
              <TableCell className="produto-tabela-header" align="right">Categoria</TableCell>
              <TableCell className="produto-tabela-header" align="right">Status</TableCell>
              <TableCell className="produto-tabela-header" align="right">Ações</TableCell> {/* Adicionando a coluna de ações */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Renderizar os resultados filtrados */}
            {filtroResultado.slice().reverse().map((row) => (
              <TableRow
                key={row.id}
                className={selectedRow && selectedRow.id === row.id ? 'selected-row' : ''}
                onClick={() => setSelectedRow(row)}
              >
                <TableCell component="th" scope="row" className={`produto-item ${selectedRow && selectedRow.id === row.id ? 'selected-text' : ''}`}>
                  {row.modelo.toUpperCase()}
                </TableCell>
                <TableCell align="right" className={`produto-item ${selectedRow && selectedRow.id === row.id ? 'selected-text' : ''}`}>
                  {row.n_serie}
                </TableCell>
                <TableCell align="right" className={`produto-item ${selectedRow && selectedRow.id === row.id ? 'selected-text' : ''}`}>
                  {row.patrimonio.toUpperCase()}
                </TableCell>
                <TableCell align="right" className={`produto-item ${selectedRow && selectedRow.id === row.id ? 'selected-text' : ''}`}>
                  {row.nome}
                </TableCell>
                <TableCell align="right" className={`produto-item ${selectedRow && selectedRow.id === row.id ? 'selected-text' : ''}`}>
                  {row.status}
                </TableCell>
                <TableCell align="right" className={`produto-item ${selectedRow && selectedRow.id === row.id ? 'selected-text' : ''}`}>
                  <IconButton
                    onClick={() => handleEditStatus(row)}
                    aria-label="editar status"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>

            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Diálogo de edição de status */}
      <Dialog open={editDialogOpen} onClose={handleCancelEdit}>
        <DialogTitle>Editar Status</DialogTitle>
        <DialogContent>
          <Typography style={{ marginBottom: '30px' }}>Deseja realmente editar o status deste equipamento?</Typography>
          {/* Seleção do novo status */}
          <FormControl>
            <InputLabel id="novo-status-label">Novo Status</InputLabel>
            <Select
              labelId="novo-status"
              id="novo-status"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              label="Novo Status"
              sx={{ width: '200px' }}
            >
              <MenuItem value="EM USO">Em uso</MenuItem>
              <MenuItem value="DISPONÍVEL">Disponível</MenuItem>
              <MenuItem value="BAIXA">Baixa</MenuItem>
              <MenuItem value="RETORNO">Retorno</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {/* Botões de ação */}
          <Button onClick={handleCancelEdit} color="primary">Cancelar</Button>
          <Button onClick={handleConfirmEdit} color="primary" autoFocus>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProdutoLista;
