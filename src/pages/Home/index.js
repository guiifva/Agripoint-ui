import React from 'react';

import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Button, Title, SubTitle } from './styles';

export default function Home() {
    return (
        <>
            <Container>
                <Title>Bem Vindo a Educapoint</Title>
                <SubTitle>Conheça nossos planos e assine-os!</SubTitle>
                <Row className="justify-content-center">
                    <Link to="/SubscriptionPlans">
                        <Button>Ir para planos</Button>
                    </Link>
                </Row>
            </Container>
        </>
    );
}
