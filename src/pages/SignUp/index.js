import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Container, ItemWrap, Btn } from './styles';
import viaCep from '../../services/viaCep';
import api from '../../services/api';

function trim(strTexto) {
    // Substitúi os espaços vazios no inicio e no fim da string por vazio.
    return strTexto.replace(/^s+|s+$/g, '');
}

// Função para validação de CEP.@
function isCEP(strCEP) {
    // Caso o CEP não esteja nesse formato ele é inválido!
    const objER = /^[0-9]{2}[0-9]{3}[0-9]{3}$/;

    strCEP = trim(strCEP);
    if (strCEP.length > 0) {
        if (objER.test(strCEP)) return true;
        return false;
    }
    return false;
}

function isEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default function SignUp() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [placeNumber, setPlaceNumber] = useState('');
    const [complement, setComplement] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async e => {
        e.preventDefault();
        if (!userName) {
            setError('Preencha e-mail e senha para continuar!');
        } else if (!isEmail(email)) {
            setError('Informe um e-mail válido!');
        } else {
            try {
                const response = await api.post('/Login/Register', {
                    email: email,
                    password: password,
                    userName: userName,
                    confirmPassword: confirmPassword,
                    addressViewModel: {
                        state: state,
                        zipCode: zipCode,
                        street: street,
                        city: city,
                        placeNumber: placeNumber,
                        complement: complement,
                    },
                });

                this.props.history.push('/SignIn');
            } catch (err) {
                console.log(err);
                setError(
                    'Houve um problema com o login, verifique suas credenciais.'
                );
            }
        }
    };

    const searchViaCep = async e => {
        e.preventDefault();

        if (!isCEP(zipCode)) {
            alert('Insira um cep valido sem pontuação');
            setZipCode('');
            return;
        }

        await viaCep.get(`${zipCode}/json/`).then(response => {
            const {
                cep,
                logradouro,
                complemento,
                localidade,
                uf,
            } = response.data;
            setCity(localidade);
            setState(uf);
            setStreet(logradouro);
            setComplement(complemento);
            setZipCode(cep);
        });
    };

    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                {error && <p>{error}</p>}
                <input
                    value={userName}
                    type="text"
                    placeholder="Nome de usuário"
                    onChange={e => setUserName(e.target.value)}
                    id="userName"
                />
                <input
                    value={email}
                    type="email"
                    placeholder="Endereço de e-mail"
                    id="email"
                    onChange={e => setEmail(e.target.value)}
                />
                <input
                    value={password}
                    type="password"
                    placeholder="Senha"
                    id="password"
                    onChange={e => setPassword(e.target.value)}
                />
                <input
                    value={confirmPassword}
                    type="password"
                    placeholder="Confirmar Senha"
                    id="confirmPassword"
                    onChange={e => setConfirmPassword(e.target.value)}
                />

                <ItemWrap>
                    <input
                        value={zipCode}
                        type="number"
                        placeholder="CEP"
                        onChange={e => setZipCode(e.target.value)}
                        id="zipCode"
                    />
                    <Btn onClick={searchViaCep}>Pesquisar</Btn>
                </ItemWrap>
                <input
                    value={state}
                    type="text"
                    placeholder="Estado"
                    onChange={e => setState(e.target.value)}
                    id="state"
                />
                <input
                    value={city}
                    type="text"
                    placeholder="Cidade"
                    onChange={e => setState(e.target.value)}
                    id="city"
                />
                <input
                    value={street}
                    type="text"
                    placeholder="Rua"
                    onChange={e => setStreet(e.target.value)}
                />
                <input
                    value={placeNumber}
                    type="numeric"
                    placeholder="Numero"
                    onChange={e => setPlaceNumber(e.target.value)}
                />
                <input
                    value={complement}
                    type="text"
                    placeholder="Complemento"
                    onChange={e => setComplement(e.target.value)}
                />
                <button type="submit">Cadastrar grátis</button>
                <hr />
                <Link to="/">Fazer login</Link>
            </Form>
        </Container>
    );
}
