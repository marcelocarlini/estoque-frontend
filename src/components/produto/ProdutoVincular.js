import React, { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProdutoVincular(props) {
    const [nomeEquipamento, setNomeEquipamento] = useState("");
    const [modelo, setModelo] = useState("");
    const [modelosDisponiveis, setModelosDisponiveis] = useState([]);
    const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState([]);
    const [filtro, setFiltro] = useState("");

    useEffect(() => {
        axios.get("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/listar-disponiveis")
            .then(response => {
                setEquipamentosDisponiveis(response.data.response);
                const uniqueModelos = Array.from(new Set(response.data.response.map(equipamento => equipamento.modelo)));
                setModelosDisponiveis(uniqueModelos);
            })
            .catch(error => {
                console.error('Erro ao buscar equipamentos disponíveis:', error);
            });
    }, []);

    // Função para lidar com a alteração de modelo
    const handleModeloChange = (event) => {
        const selectedModelo = event.target.value;
        setModelo(selectedModelo);
    };

    // Função para lidar com a alteração do filtro de pesquisa
    const handleFiltroChange = (event) => {
        const valorFiltro = event.target.value.toUpperCase(); // Converter para maiúsculas
        setFiltro(valorFiltro);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
            <Card style={{ marginTop: '100px', width: "70%" }}>
                <CardContent>
                    <div style={{ fontSize: "18px", fontWeight: "bold" }}>{props.texto}</div>
                    <div style={{ display: "flex", flexDirection: "column" }}>

                        <FormControl style={{ marginTop: "10px" }} fullWidth>
                            <InputLabel id="modelo-label">Modelo</InputLabel>
                            <Select
                                labelId="modelo-label"
                                id="modelo-select"
                                value={modelo}
                                label="Modelo"
                                onChange={handleModeloChange}
                            >
                                {modelosDisponiveis.map((modeloOption) => (
                                    <MenuItem key={modeloOption} value={modeloOption}>{modeloOption}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {modelo && (
                            <TextField
                                value={filtro}
                                onChange={handleFiltroChange}
                                style={{ marginTop: "10px" }}
                                id="outlined-basic"
                                label="Pesquisar"
                                variant="outlined"
                            />
                        )}
                        {modelo && (
                            <TableContainer component={Paper} style={{ marginTop: "20px" }}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Modelo</TableCell>
                                            <TableCell>Numero de Série</TableCell>
                                            <TableCell>Patrimonio</TableCell>
                                            {/* Adicione mais células para outras informações, se necessário */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {equipamentosDisponiveis
                                            .filter(equipamento => equipamento.modelo === modelo)
                                            .filter(equipamento =>
                                                equipamento.nome?.toUpperCase().includes(filtro) ||
                                                equipamento.modelo.toUpperCase().includes(filtro) ||
                                                equipamento.n_serie.includes(filtro) ||
                                                equipamento.patrimonio.includes(filtro)
                                            )
                                            .map((equipamento) => (
                                                <TableRow key={equipamento.id}>
                                                    <TableCell>{equipamento.modelo}</TableCell>
                                                    <TableCell>{equipamento.n_serie}</TableCell>
                                                    <TableCell>{equipamento.patrimonio}</TableCell>
                                                    {/* Adicione mais células para outras informações, se necessário */}
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </div>
                </CardContent>
            </Card>
            <ToastContainer pauseOnHover={false} />
        </Box>
    );
}

export default ProdutoVincular;
