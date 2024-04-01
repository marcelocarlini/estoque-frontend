import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Box } from '@mui/material'
import axios from 'axios'
import React from 'react'

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

  React.useEffect(() => {
    axios.get("https://1ruolljjx9.execute-api.us-east-1.amazonaws.com/listar-categorias").then(
      r => {
        setCategoriaOptions(r.data.response)
      }
    )
  }, [])

  function cadastroProduto() {

    axios.post("https://1ruolljjx9.execute-api.us-east-1.amazonaws.com/cadastro-equipamento", {
      "modelo": modeloOptions.find(s => s.id === modelo).modelo,
      "n_serie": n_serie,
      "patrimonio": patrimonio,
      "categoria": categoria,
      "status": statusOptions.find(s => s.id === status).status
    }).then(r => {
      alert("Produto foi cadastrado")
      setModelo("");
      setN_serie("");
      setPatrimonio("");
      setCategoria("");
      setStatus("");
    })
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
                {modeloOptions.map(s => (
                  <MenuItem value={s.id}>{s.modelo}</MenuItem>
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
                {
                  categoriaOptions.map(c => (
                    <MenuItem value={c.id}>{c.nome}</MenuItem>
                  ))
                }
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
                {statusOptions.map(s => (
                  <MenuItem value={s.id}>{s.status}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button style={{ marginTop: "10px" }} variant="contained" onClick={() => { cadastroProduto() }}>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProdutoRegistro