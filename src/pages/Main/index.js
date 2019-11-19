import React, { useState, useEffect } from 'react';

import { Container, Row } from 'react-bootstrap';
import { Title, SubTitle, Button } from './styles';
import Api from '../../services/api';
import SubscriptionList from '../../components/SubscriptionList';
import { Link } from 'react-router-dom';

export default function Main() {
    const [SubscriptionPlans, setSubscriptionPlans] = useState([]);
    const [selected, setSelected] = useState(-1);

    async function getSubscriptions() {
        const listPlans = await Api.get('SubscriptionsPlans');
        setSubscriptionPlans(listPlans.data);
    }

    useEffect(() => {
        getSubscriptions();
    }, []);

    return (
        <Container>
            <Title>Esolha Seu Plano</Title>
            <SubTitle>Escolha o melhor plano para você</SubTitle>
            <SubscriptionList
                list={SubscriptionPlans}
                onItemClick={id => setSelected(id)}
                selected={selected}
            />
            <Row className="justify-content-center">
                <Link to={`/Order/${selected}`}>
                    <Button>Assine agora</Button>
                </Link>
            </Row>
        </Container>
    );
}
