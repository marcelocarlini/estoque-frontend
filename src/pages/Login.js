import React from 'react'


export default function login() {
    return (
        <div className='page-container'>
            <div className='container'>
                <form>
                    <h1>Login</h1>
                    <div>
                        <input placeholder="Email" type='email' />
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/user--v1.png" alt="user--v1" />
                    </div>
                    <div>
                        <input placeholder='Senha' type='password' />
                        <img width="20" height="20" src="https://img.icons8.com/ios/50/lock--v1.png" alt="lock--v1" />
                        <a href='#'>Esqueci minha senha</a>
                    </div>
                    <button type='submit'>Entrar</button>
                    <div>
                        <p>Não esta cadastrado ? <a href='#'>Cadastrar</a></p>
                    </div>
                </form>
            </div>
        </div>
    )
}
