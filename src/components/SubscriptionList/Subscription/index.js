import React from 'react';
import { Card } from './styles';

export default function Subscription({ sub, onItemClick, selected }) {
    return (
        <Card onClick={() => onItemClick(sub.id)} selected={selected}>
            <h1>{sub.planName && sub.planName}</h1>
            <p className="planValues">
                <span>R$ </span>
                {sub.value && sub.value}
            </p>
            <span className="selectSpan">
                {selected ? 'Selecionado' : 'Selecione'}
            </span>
        </Card>
    );
}
