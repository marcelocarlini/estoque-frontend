import React, { useEffect, useState } from 'react';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importe a biblioteca Axios

import '../partials/_login.scss';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("https://lp7vw2q19f.execute-api.us-east-1.amazonaws.com/login", {
                usuario,
                senha
            });

            if (response.data.success) {
                navigate('/Menu'); // Redireciona para a página de menu após o login bem-sucedido
            } else {
                alert('Credenciais inválidas');
            }
        } catch (error) {
            console.error(error);
            alert('Erro de login');
        }
    }

    return (
        <Box className="custom-box">
            <Card className="custom-card" >
                <CardContent>
                    <div className="custom-title">LOGIN</div>
                    <form onSubmit={handleSubmit}>
                        <div className="custom-input">
                            <TextField id='id-usuario' type='text' label="Usuário" variant="outlined" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                            <TextField id='id-senha' type='password' label="Senha" variant="outlined" value={senha} onChange={(e) => setSenha(e.target.value)} />
                        </div>
                        <div>
                            <Button className="custom-button" variant="contained" type='submit'>Entrar</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Login;

