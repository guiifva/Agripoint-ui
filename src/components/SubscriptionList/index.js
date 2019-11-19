import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Subscription from './Subscription';
import { CardList, Button } from './styles';

export default function SubscriptionList({ list, onItemClick, selected }) {
    return list && list.length > 0 ? (
        <Container>
            <CardList>
                {list.map(item => (
                    <Subscription
                        key={item.id}
                        sub={item}
                        onItemClick={onItemClick}
                        selected={item.id === selected}
                    />
                ))}
            </CardList>
        </Container>
    ) : (
        'a lista ta vazia'
    );
}
