import React, { useState, useEffect } from 'react';
import { Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Box, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProdutoVincular(props) {
    const [nomeEquipamento, setNomeEquipamento] = useState("");
    const [modelo, setModelo] = useState("");
    const [modelosDisponiveis, setModelosDisponiveis] = useState([]);
    const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);

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

    const handleModeloChange = (event) => {
        const selectedModelo = event.target.value;
        setModelo(selectedModelo);
        setEquipamentoSelecionado(null); // Limpa o equipamento selecionado ao mudar o modelo
    };

    const handleFiltroChange = (event) => {
        const valorFiltro = event.target.value.toUpperCase();
        setFiltro(valorFiltro);
    };

    const handleRowClick = (equipamento) => {
        setEquipamentoSelecionado(equipamento);
    };

    const handleNomeEquipamentoChange = (event) => {
        setNomeEquipamento(event.target.value.toUpperCase());
    };

    const vincularProduto = () => {
        if (!equipamentoSelecionado || !nomeEquipamento) {
            toast.warn('Por favor, selecione um equipamento e preencha o nome');
            return;
        }

        axios.post("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/vincular-equipamento", {
            nome: nomeEquipamento,
            modelo: equipamentoSelecionado.modelo,
            n_serie: equipamentoSelecionado.n_serie,
            patrimonio: equipamentoSelecionado.patrimonio,
            categoria: equipamentoSelecionado.categoria,
            status: 'EM USO' // Defina o status como 'em_uso'
        })
            .then(response => {
                toast.success("Equipamento cadastrado com sucesso!", {
                    autoClose: 2000,
                });
                // Limpar campos ou fazer outras ações após o salvamento bem-sucedido
                setEquipamentoSelecionado(null);
                setNomeEquipamento("");
            })
            .catch(error => {
                console.error('Erro ao cadastrar equipamento:', error);
                toast.error("Erro ao cadastrar equipamento. Por favor, tente novamente mais tarde.");
            });
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
                                                <TableRow key={equipamento.id} onClick={() => handleRowClick(equipamento)}>
                                                    <TableCell>{equipamento.modelo}</TableCell>
                                                    <TableCell>{equipamento.n_serie}</TableCell>
                                                    <TableCell>{equipamento.patrimonio}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                        {equipamentoSelecionado && (
                            <div style={{ marginTop: "20px", display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                <TextField
                                    value={nomeEquipamento}
                                    onChange={handleNomeEquipamentoChange}
                                    label="Nome do Equipamento"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                />
                                <Button variant="contained" color="primary" onClick={vincularProduto} style={{ marginLeft: "10px", width: '30%', marginTop: "20px" }}>
                                    Salvar
                                </Button>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
            <ToastContainer pauseOnHover={false} />
        </Box>
    );
}

export default ProdutoVincular;
