import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Box } from '@mui/material'
import axios from 'axios'
import React, { useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProdutoRegistro(props) {
  const [modelo, setModelo] = React.useState("")
  const [n_serie, setN_serie] = React.useState("")
  const [patrimonio, setPatrimonio] = React.useState("")
  const [categoria, setCategoria] = React.useState("")
  const [categoriaOptions, setCategoriaOptions] = React.useState([])
  const [status, setStatus] = React.useState('');

  const statusOptions = [
    { id: 1, status: 'EM USO' },
    { id: 2, status: 'DISPONÍVEL' },
    { id: 3, status: 'BAIXA' },
    { id: 4, status: 'RETORNO' },
  ];

  const modeloOptions = [
    { id: 1, modelo: 'DELL 3090' },
    { id: 2, modelo: 'DELL 7010' },
    { id: 3, modelo: 'BEELINK T4 PRO' },
    { id: 4, modelo: 'BEELINK I5' },
    { id: 5, modelo: 'EVEREX I3' },
    { id: 6, modelo: 'EVEREX I5' },
    { id: 7, modelo: 'EVEREX I7' },
    { id: 8, modelo: 'MITSUSHIBA' },
  ];

  useEffect(() => {
    axios.get("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/listar-categorias")
      .then(response => {
        setCategoriaOptions(response.data.response)
      })
      .catch(error => {
        console.error('Error fetching category options:', error);
      });
  }, []);

  function cadastroProduto() {
    if (!modelo || !n_serie || !patrimonio || !categoria || !status) {
      toast.warn('Por favor, preencha todos os campos');
      return;
    }

    axios.post("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/cadastro-equipamento", {
      "modelo": modeloOptions.find(item => item.id === modelo).modelo,
      "n_serie": n_serie,
      "patrimonio": patrimonio,
      "categoria": categoria,
      "status": statusOptions.find(item => item.id === status).status
    })
      .then(response => {
        toast.success("Produto foi cadastrado", {
          autoClose: 1000,
        });
        setModelo("");
        setN_serie("");
        setPatrimonio("");
        setCategoria("");
        setStatus("");
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  }

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
                onChange={(e) => { setModelo(e.target.value) }}
              >
                {modeloOptions.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.modelo}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField value={n_serie} onChange={(e) => { setN_serie(e.target.value.toUpperCase()) }} style={{ marginTop: "10px" }} id="outlined-basic" label="Numero de Série" variant="outlined" />
            <TextField value={patrimonio} onChange={(e) => { setPatrimonio(e.target.value.toUpperCase()) }} style={{ marginTop: "10px" }} id="outlined-basic" label="Patrimonio" variant="outlined" />
            <FormControl style={{ marginTop: "10px" }} fullWidth>
              <InputLabel id="demo-simple-select-label">Categoria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categoria}
                label="Categoria"
                onChange={(e) => { setCategoria(e.target.value) }}
              >
                {categoriaOptions.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.nome}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl style={{ marginTop: "10px" }} fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status-select"
                value={status}
                label="Status"
                onChange={(e) => { setStatus(e.target.value) }}
              >
                {statusOptions.map(item => (
                  <MenuItem key={item.id} value={item.id}>{item.status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button style={{ marginTop: "10px" }} variant="contained" onClick={() => { cadastroProduto() }}>Salvar</Button>
          </div>
        </CardContent>
      </Card>
      <ToastContainer pauseOnHover={false} />
    </Box>
  )
}

export default ProdutoRegistro;
