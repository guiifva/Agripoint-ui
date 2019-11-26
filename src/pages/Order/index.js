import React, { useState, useEffect, Redirect } from 'react';
import { Col, Row, Container, Card, Modal } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { Lista, Button, Img } from './styles';
import creditCardHelper from '../../Helpers/creditCardHelper';

import Api from '../../services/api';

export default function Order(props) {
    const [error, setError] = useState('');
    const [ccName, setCcName] = useState('false');

    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [cardholderName, setcardholderName] = useState('');
    const [cvv, setCvv] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => console.log('modal aberta');

    const [plan, setPlan] = useState({
        planName: '',
        description: '',
        planMonths: -1,
        value: -1,
        id: -1,
    });

    const [user, setUser] = useState({
        id: '',
        userName: '',
        email: '',
        address: {
            zipCode: '',
            state: '',
            city: '',
            street: '',
            placeNumber: -1,
            complement: '',
            id: -1,
        },
        company: -1,
    });

    const schema = Yup.object().shape({
        numeroCartao: Yup.string()
            .min(
                16,
                'O numero do cartao de credito deve ser ter no minimo 16 digitos'
            )
            .required('O numero do cartão de credito é obrigatorio.'),
        nomeUsuarioDoCartao: Yup.string()
            .max(100, 'O Nome deve ter no maximo 100 caracteres.')
            .required('O nome é obrigatorio'),
        cvv: Yup.string()
            .min(3, 'No minimo 3 digitos.')
            .required('O numero é obrigatória.'),
        ano: Yup.date()
            .required('insira um ano de vencimento valido')
            .min(
                new Date().getFullYear(),
                'o ano de vencimento tem que ser maior que o atual'
            ),
        mes: Yup.number()
            .required()
            .min(1, 'O Mês deve estar entre 1 e 12')
            .max(12, 'O Mês deve estar entre 1 e 12'),
    });

    const creditCardValidations = e => {
        if (e.length <= 16) {
            setCreditCardNumber(e);
            setCcName(creditCardHelper(e));
        }
    };

    const getSubscriptionPlan = async planId => {
        Api.get(`SubscriptionsPlans/${planId}`)
            .then(resp => {
                setPlan(resp.data);
            })
            .catch(() => {
                window.alert(
                    `Erro na requisição. Você esta sendo redirecionado para seleção de planos`
                );
                window.location.href = '/subscriptionPlans';
            });
    };

    const getUser = async () => {
        const token = window.localStorage.getItem('tokenSite');
        const userToken = jwt.decode(token);

        Api.get(`Users/${userToken.Id}`)
            .then(resp => {
                setUser(resp.data);
            })
            .catch(() => {
                window.alert('Erro na requisição');
            });
    };

    const clientHasOneMoreSubscribe = async () => {
        await getUser();

        await Api.get(`Orders/HasSubscribe/${user.id}`)
            .then(res => res.data)
            .catch(err => {
                alert('Não foi possivel cadastrar usuario');
                return false;
            });
    };

    const handleConfirmOrder = async e => {
        //e.preventDefault();

        await getUser();

        const result = await Api.get(`Orders/HasSubscribe/${user.id}`)
            .then(res => res.data)
            .catch(err => {
                alert('Não foi possivel cadastrar usuario');
                return false;
            });
        console.log(result);

        if (result) {
            alert('Usuario já possui uma assinatura corrente!');

            setTimeout(() => {
                window.location.href = '/Home';
            }, 1000);
            return false;
        }

        Api.post('Orders', {
            userId: user.id,
            subscriptionPlanId: plan.id,
            creditCard: {
                cardholderName,
                creditCardNumber,
                valid: `${mes}/${ano}`,
                cvv,
            },
        })
            .then(res => {
                setShow(true);
                setTimeout(() => {
                    setShow(false);
                    alert('pedido concluido com sucesso');
                    window.location.href = '/Home';
                }, 3000);
            })
            .catch(err => {
                setError(`Não foi possivel realizar o pedido`);
            });

        return false;
    };

    useEffect(() => {
        getSubscriptionPlan(props.match.params.subscriptionPlansId);
        getUser();
    }, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Pedido</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>
                        Seu pedido está sendo processado, Aguarde por favor!
                    </h1>
                </Modal.Body>
                <Modal.Footer>
                    <p>Educapoint.</p>
                </Modal.Footer>
            </Modal>
            <Container>
                <Row className="justify-content-center mb-5">
                    <h1>VOCÊ ESTÁ ASSINANDO</h1>
                </Row>
                <Row>
                    <Col md="4" className="d-flex align-items-stretch">
                        <Card>
                            <Card.Title>
                                Dados do pedido:
                                <span className="ml-3">R${plan.value}</span>
                            </Card.Title>
                            <Card.Body>
                                <h5>{plan.planName}</h5>
                                <Lista>
                                    <li>{plan.description}</li>
                                </Lista>
                            </Card.Body>
                            <Card.Footer>
                                <p>{user.userName}</p>
                                <p>{user.email}</p>
                                <p>{user.PhoneNumber}</p>
                                <p>
                                    Brasil | {user.address.state} |
                                    {user.address.city}
                                </p>
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col md="8" className="d-flex align-items-stretch">
                        <Card>
                            <Row className="justify-content-center mt-3 ">
                                <Card.Title>
                                    ESCOLHA UMA FORMA DE PAGAMENTO
                                </Card.Title>
                                <Img
                                    src={require('../../assets/amex.svg')}
                                    alt="icone cartao de credito amex"
                                    id="amex"
                                    hidden={ccName !== 'amex'}
                                />
                                <Img
                                    src={require('../../assets/diners.ico')}
                                    alt="icone cartao de credito diners"
                                    id="diners"
                                    hidden={ccName !== 'diners'}
                                />
                                <Img
                                    src={require('../../assets/discover.svg')}
                                    alt="icone cartao de credito discover"
                                    id="discover"
                                    hidden={ccName !== 'discover'}
                                />
                                <Img
                                    src={require('../../assets/elo.svg')}
                                    alt="icone cartao de credito elo"
                                    id="elo"
                                    hidden={ccName !== 'elo'}
                                />
                                <Img
                                    src={require('../../assets/jcb.svg')}
                                    alt="icone cartao de credito jcb"
                                    id="jcb"
                                    hidden={ccName !== 'jcb'}
                                />
                                <Img
                                    src={require('../../assets/master.svg')}
                                    alt="icone cartao de credito master"
                                    id="master"
                                    hidden={ccName !== 'mastercard'}
                                />
                                <Img
                                    src={require('../../assets/visa.svg')}
                                    alt="icone cartao de credito visa"
                                    id="visa"
                                    hidden={ccName !== 'visa'}
                                />
                            </Row>
                            <Card.Body>
                                <Form
                                    schema={schema}
                                    onSubmit={handleConfirmOrder}
                                >
                                    <Input
                                        type="number"
                                        placeholder="Cartão de crédito"
                                        className="form-control"
                                        value={creditCardNumber}
                                        name="numeroCartao"
                                        onChange={e =>
                                            creditCardValidations(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Input
                                        type="text"
                                        value={cardholderName}
                                        placeholder="Nome do titular"
                                        className="form-control mt-3"
                                        name="nomeUsuarioDoCartao"
                                        onChange={e =>
                                            setcardholderName(e.target.value)
                                        }
                                    />
                                    <Row>
                                        <Col md="3">
                                            <Input
                                                type="number"
                                                value={mes}
                                                placeholder="Mês"
                                                className="form-control mt-3"
                                                name="mes"
                                                onChange={e => {
                                                    if (e.target.value <= 12)
                                                        setMes(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col md="3">
                                            <Input
                                                type="number"
                                                value={ano}
                                                placeholder="Ano"
                                                className="form-control mt-3"
                                                name="ano"
                                                onChange={e => {
                                                    if (
                                                        e.target.value.length <
                                                        5
                                                    )
                                                        setAno(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <Col md="6">
                                            <Input
                                                type="number"
                                                value={cvv}
                                                placeholder="Codigo de segurança (CVV)"
                                                className="form-control mt-3"
                                                name="cvv"
                                                onChange={e => {
                                                    if (
                                                        e.target.value.length <
                                                        4
                                                    )
                                                        setCvv(e.target.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Button variant="primary" type="submit">
                                            Finalizar Assinatura
                                        </Button>
                                    </Row>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}
