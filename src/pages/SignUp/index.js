import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import { Container, Btn, Button } from './styles';
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
    const [cpf, setCpf] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async e => {
        //e.preventDefault();

        api.post('/Login/Register', {
            email,
            password,
            userName,
            confirmPassword,
            cpf,
            addressViewModel: {
                state,
                zipCode,
                street,
                city,
                placeNumber,
                complement,
            },
        })
            .then(resp => {
                window.location.href = '/';
            })
            .catch(err => {
                console.log(err);
            });
    };

    const schema = Yup.object().shape({
        email: Yup.string()
            .email()
            .required('O email é obrigatorio'),
        senha: Yup.string()
            .required('A senha é requerida')
            .min(8, 'A senha deve possuir no minimo 8 caracteres')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'A senha deve conter pelo menos 1 letra maiuscula, 1 numero e 1 caracter especial!'
            ),
        confirmacaoSenha: Yup.string()
            .required('A senha é requerida')
            .min(8, 'A senha deve possuir no minimo 8 caracteres')
            .matches(
                /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                'A senha deve conter pelo menos 1 letra maiuscula, 1 numero e 1 caracter especial!'
            ),
        nome: Yup.string()
            .required('O nome é requerido')
            .min(4, 'O nome deve possuir no minimo 4 caracteres'),
        cpf: Yup.string()
            .required('O cpf é obrigatorio!')
            .matches(/^\d{3}\.?\d{3}\.?\d{3}\-?\d{2}$/)
            .min(11, 'o cpf deve possuir no minimo 11 caracteres'),
        estado: Yup.string()
            .required('O estado deve estar preenchido!')
            .min(2, 'O estado deve ter ao menos 2 caracteres!'),
        cep: Yup.string()
            .required('O cep é obrigatorio!')
            .matches(/^[0-9]{2}.?[0-9]{3}-?[0-9]{3}/, 'Insira um cep valido'),
        rua: Yup.string()
            .required('O nome da rua é requerido!')
            .min(2, 'O nome da rua deve ter ao menos 2 caracteres!'),
        cidade: Yup.string()
            .required('O nome da cidade é requerido!')
            .min(4, 'O nome da cidade deve ter ao menos 4 caracteres!'),
        numeroCasa: Yup.string().required('O numero da casa é requerido!'),
    });

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
            setZipCode(trim(cep));
        });
    };

    return (
        <>
            <Row className="justify-content-center">
                <h1>Cadastro de usuário</h1>
            </Row>
            <Container>
                <Col md="6">
                    <Row className="d-flex">
                        <Form
                            className="form-group flex-fill"
                            schema={schema}
                            onSubmit={handleSignUp}
                        >
                            <Input
                                value={userName}
                                type="text"
                                className="form-control mt-3"
                                placeholder="Nome de usuário"
                                onChange={e => setUserName(e.target.value)}
                                name="nome"
                            />
                            <Input
                                value={email}
                                type="email"
                                className="form-control mt-3"
                                placeholder="Endereço de e-mail"
                                name="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                            <Input
                                value={password}
                                type="password"
                                className="form-control mt-3"
                                placeholder="Senha"
                                name="senha"
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Input
                                value={confirmPassword}
                                type="password"
                                className="form-control mt-3"
                                placeholder="Confirmar Senha"
                                name="confirmacaoSenha"
                                onChange={e =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                            <Col md="12">
                                <Row>
                                    <Col md="10">
                                        <Input
                                            value={zipCode}
                                            type="text"
                                            className="form-control mt-3"
                                            placeholder="CEP"
                                            onChange={e =>
                                                setZipCode(e.target.value)
                                            }
                                            name="cep"
                                        />
                                    </Col>
                                    <Col md="2">
                                        <Btn
                                            className="mt-3"
                                            onClick={searchViaCep}
                                        >
                                            Pesquisar
                                        </Btn>
                                    </Col>
                                </Row>
                            </Col>
                            <Input
                                value={state}
                                type="text"
                                className="form-control mt-3"
                                placeholder="Estado"
                                onChange={e => setState(e.target.value)}
                                name="estado"
                            />
                            <Input
                                value={city}
                                className="form-control mt-3"
                                type="text"
                                placeholder="Cidade"
                                onChange={e => setCity(e.target.value)}
                                name="cidade"
                            />
                            <Input
                                value={street}
                                className="form-control mt-3"
                                type="text"
                                placeholder="Rua"
                                name="rua"
                                onChange={e => setStreet(e.target.value)}
                            />
                            <Input
                                value={placeNumber}
                                className="form-control mt-3"
                                type="numeric"
                                placeholder="Numero"
                                name="numeroCasa"
                                onChange={e => setPlaceNumber(e.target.value)}
                            />
                            <Input
                                value={complement}
                                className="form-control mt-3"
                                type="text"
                                placeholder="Complemento"
                                name="complemento"
                                onChange={e => setComplement(e.target.value)}
                            />
                            <hr />
                            <Input
                                value={cpf}
                                className="form-control mt-3"
                                type="text"
                                placeholder="CPF"
                                name="cpf"
                                onChange={e => setCpf(e.target.value)}
                            />
                            <Row className="justify-content-center mt-3">
                                <Button type="submit">Cadastrar grátis</Button>
                            </Row>
                            <Row className="justify-content-center mt-5">
                                <hr />
                                <Link to="/">Fazer login</Link>
                            </Row>
                        </Form>
                    </Row>
                </Col>
            </Container>
        </>
    );
}
