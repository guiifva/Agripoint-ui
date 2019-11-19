import React, { useState, useEffect, Redirect } from 'react';
import { Col, Row, Container, Card, Form } from 'react-bootstrap';
import jwt from 'jsonwebtoken';
import { Lista, Button } from './styles';

import Api from '../../services/api';

export default function Order(props) {
    const [error, setError] = useState('');

    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [cardholderName, setcardholderName] = useState('');
    const [cvv, setCvv] = useState('');

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

    const [order, setOrder] = useState({
        userId: '',
        subscriptionPlanId: -1,
        creditCardId: -1,
        id: -1,
    });

    const getSubscriptionPlan = async planId => {
        Api.get(`SubscriptionsPlans/${planId}`)
            .then(resp => {
                setPlan(resp.data);
            })
            .catch(() => {
                window.alert('Erro na requisição');
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

    const handleConfirmOrder = async e => {
        e.preventDefault();

        Api.post('Order', {
            userId: user.id,
            subscriptionPlanId: plan.id,
            creditCard: {
                cardholderName,
                creditCardNumber,
                valid: `01/${mes}/${ano}`,
                cvv,
            },
        })
            .then(res => {
                return <Redirect to="/Main" />;
            })
            .catch(err => {
                setError(
                    `Não foi possivel realizar o pedido, erros: ${err.errors}`
                );
            });
    };

    useEffect(() => {
        getSubscriptionPlan(props.match.params.subscriptionPlansId);

        getUser();
    }, []);

    return (
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
                        </Row>
                        <Card.Body>
                            <Form onSubmit={handleConfirmOrder}>
                                <Form.Group>
                                    <Form.Control
                                        type="number"
                                        placeholder="Cartão de crédito"
                                        id="cartaoCredito"
                                        onChange={e =>
                                            setCreditCardNumber(e.target.value)
                                        }
                                    />
                                </Form.Group>

                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nome do titular"
                                        id="userName"
                                        onChange={e =>
                                            setcardholderName(e.target.value)
                                        }
                                    />
                                </Form.Group>
                                <Row>
                                    <Col md="3">
                                        <Form.Group>
                                            <Form.Control
                                                type="number"
                                                placeholder="Mês"
                                                id="mes"
                                                onChange={e =>
                                                    setMes(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="3">
                                        <Form.Group>
                                            <Form.Control
                                                type="number"
                                                placeholder="Ano"
                                                id="ano"
                                                onChange={e =>
                                                    setAno(e.target.value)
                                                }
                                            />
                                        </Form.Group>
                                    </Col>
                                    <Col md="6">
                                        <Form.Group>
                                            <Form.Control
                                                type="number"
                                                placeholder="Codigo de segurança (CVV)"
                                                id="cvv"
                                                onChange={e =>
                                                    setCvv(e.target.values)
                                                }
                                            />
                                        </Form.Group>
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
    );
}
