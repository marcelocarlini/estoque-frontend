import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField } from '@mui/material';
import axios from 'axios';
import '../../partials/_produtolista.scss';

function ProdutoLista(props) {
    const [rows, setRows] = useState([]);
    const [filtro, setFiltro] = useState("");

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
                            <TableCell className="produto-tabela-header">Modelo</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtroResultado.slice().reverse().map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="produto-item">{row.nome}</TableCell>
                                <TableCell align="right" className="produto-item">{row.n_serie}</TableCell>
                                <TableCell align="right" className="produto-item">{row.patrimonio.toUpperCase()}</TableCell>
                                <TableCell align="right" className="produto-item">{row.modelo.toUpperCase()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default ProdutoLista;
