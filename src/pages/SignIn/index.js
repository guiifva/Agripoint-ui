import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import api from '../../services/api';
import { login } from '../../services/auth';

import { Form, Container, Btn } from './styles';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSignIn = async e => {
        e.preventDefault();

        if (!email || !password) {
            setError('preencha corretamente os campos!');
        } else {
            api.post('/Login/SignIn', {
                email: email,
                password: password,
                confirmPassword: password,
            })
                .then(res => {
                    login(res.data);
                    return <Redirect to="/Main" />;
                })
                .catch(err => {
                    setError(
                        `Não foi possivel realizar o login, erros: ${err.errors}`
                    );
                });
        }
    };

    return (
        <>
            <Container>
                <Form onSubmit={handleSignIn}>
                    <img
                        src={require('../../assets/educapointIcon.jpg')}
                        className="img-fluid"
                        alt="Logo da empresa Agripoint"
                    />
                    {error && <p>{error}</p>}
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Btn type="submit">Entrar</Btn>
                    <hr />
                    <Link to="/signup">Criar conta grátis</Link>
                </Form>
            </Container>
        </>
    );
}
