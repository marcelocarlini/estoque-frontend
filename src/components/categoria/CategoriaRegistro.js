import React from 'react'
import { Box, Button, Card, CardContent, TextField } from '@mui/material'
import axios from 'axios'

function CategoriaCadastro(props) {

  const [nome, setNome] = React.useState("")

  function cadastroCategorias() {

    axios.post("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/cadastro-categoria", {
      "nome": nome,
    }).then(r => {
      alert("Categoria foi cadastrada")
      setNome("");

    })
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: 'auto' }}>
      <Card style={{ marginTop: '100px', width: "70%" }}>
        <CardContent>
          <div style={{ fontSize: "18px", fontWeight: "bold" }}>{props.texto}</div>
          <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
            <TextField value={nome} onChange={(e) => { setNome(e.target.value.toUpperCase()) }} style={{ marginTop: "10px" }} id="outlined-basic" label="Nome" variant="outlined" />
            <Button style={{ marginTop: "10px" }} variant="contained" onClick={() => { cadastroCategorias() }}>Salvar</Button>
          </div>
        </CardContent>
      </Card>
    </Box >
  )
}

export default CategoriaCadastro