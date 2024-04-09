import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Adicionando importação do CSS da react-toastify
import '../../partials/_produtolista.scss';

function ProdutoListaVinculados(props) {
    const [rows, setRows] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [selectedRow, setSelectedRow] = useState(null);
    const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

    useEffect(() => {
        axios.get("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/listar-equipamentos-vinculados")
            .then(response => {
                setRows(response.data.response.filter(row => row.status === 'EM USO'));
            })
            .catch(error => {
                console.error('Erro ao buscar equipamentos vinculados:', error);
            });
    }, []);

    const handleFiltroChange = (event) => {
        const valorFiltro = event.target.value.toUpperCase();
        setFiltro(valorFiltro);
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
    };

    const handleDesvincularClick = () => {
        setConfirmationDialogOpen(true);
    };

    const handleConfirmDesvincular = () => {
        if (!selectedRow) {
            console.error('Nenhum equipamento selecionado para desvincular.');
            return;
        }
        axios.delete("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/desvincular-equipamento", {
            data: { n_serie: selectedRow.n_serie }
        })
            .then(response => {
                console.log("Equipamento desvinculado:", selectedRow); // Log para verificar se o equipamento foi desvinculado corretamente
                toast.success("Equipamento desvinculado com sucesso!", {
                    autoClose: 2000,
                });
                // Remove o item excluído da lista
                const updatedRows = rows.filter(row => row.n_serie !== selectedRow.n_serie);
                setRows(updatedRows);
                setSelectedRow(null);
                setConfirmationDialogOpen(false);
            })
            .catch(error => {
                console.error('Erro ao desvincular equipamento:', error);
                setConfirmationDialogOpen(false);
            });
    };

    const handleCancelDesvincular = () => {
        setConfirmationDialogOpen(false);
    };

    const filtroResultado = rows.filter(row =>
        row.modelo.toUpperCase().includes(filtro) ||
        row.n_serie.toUpperCase().includes(filtro) ||
        row.patrimonio.toUpperCase().includes(filtro) ||
        row.nome.toUpperCase().includes(filtro)
    );

    return (
        <div className="produto-lista-container">
            <h4 className="produto-lista-title">{props.texto}</h4>
            <TextField
                value={filtro}
                onChange={handleFiltroChange}
                style={{ marginTop: "10px", width: '70%' }}
                id="outlined-basic"
                label="Pesquisar"
                variant="outlined"
            />
            <TableContainer component={Paper} className="produto-tabela">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="produto-tabela-header">Nome</TableCell>
                            <TableCell className="produto-tabela-header" align="right">Numero de Série</TableCell>
                            <TableCell className="produto-tabela-header" align="right">Patrimonio</TableCell>
                            <TableCell className="produto-tabela-header" align="right">Modelo</TableCell>
                            <TableCell className="produto-tabela-header" align="right">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtroResultado.map((row) => (
                            <TableRow key={row.id} onClick={() => handleRowClick(row)} className={selectedRow === row ? 'selected-row' : ''}>
                                <TableCell className="produto-item">{row.nome}</TableCell>
                                <TableCell align="right" className="produto-item">{row.n_serie}</TableCell>
                                <TableCell align="right" className="produto-item">{row.patrimonio.toUpperCase()}</TableCell>
                                <TableCell align="right" className="produto-item">{row.modelo.toUpperCase()}</TableCell>
                                <TableCell align="right" className="produto-item">
                                    {selectedRow === row && (
                                        <Button variant="contained" color="secondary" onClick={handleDesvincularClick} style={{ width: '50%' }}>Desvincular</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={confirmationDialogOpen} onClose={handleCancelDesvincular}>
                <DialogTitle>Desvincular Equipamento</DialogTitle>
                <DialogContent>
                    <Typography>Deseja realmente desvincular o equipamento?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelDesvincular} color="primary">Não</Button>
                    <Button onClick={handleConfirmDesvincular} color="primary" autoFocus>Sim</Button>
                </DialogActions>
            </Dialog>
            <ToastContainer pauseOnHover={false} /> {/* Renderizando o ToastContainer */}
        </div>
    );
}

export default ProdutoListaVinculados;
