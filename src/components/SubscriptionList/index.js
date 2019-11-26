import React from 'react';
import { Container } from 'react-bootstrap';

import Subscription from './Subscription';
import { CardList } from './styles';

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
