import React from 'react';
import { Box, Button, Card, CardContent, TextField } from '@mui/material';
import '../partials/_login.scss'; // Importe o arquivo de estilos

function Login() {
    return (
        <Box className="custom-box">
            <Card className="custom-card" >
                <CardContent>
                    <div className="custom-title">LOGIN</div>
                    <div className="custom-input">
                        <TextField id="outlined-basic" type='text' label="Usuário" variant="outlined" />
                        <TextField id="outlined-basic" type='password' label="Senha" variant="outlined" />
                        <div>
                            <Button className="custom-button" variant="contained" >Entrar</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Login;
