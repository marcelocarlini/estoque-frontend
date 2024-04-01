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

  React.useEffect(() => {
    axios.get("https://1ruolljjx9.execute-api.us-east-1.amazonaws.com/listar-categorias").then(
      r => {
        setCategoriaOptions(r.data.response)
      }
    )
  }, [])

  function cadastroProduto() {

    axios.post("https://1ruolljjx9.execute-api.us-east-1.amazonaws.com/cadastro-equipamento", {
      "modelo": modelo,
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
            <TextField value={modelo} onChange={(e) => { setModelo(e.target.value.toUpperCase()) }} style={{ marginTop: "10px" }} id="outlined-basic" label="Modelo" variant="outlined" />
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