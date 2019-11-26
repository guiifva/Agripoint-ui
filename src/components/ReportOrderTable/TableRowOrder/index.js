import React from 'react';

// import { Container } from './styles';

export default function TableRowOrder({ item }) {
    return (
        <tr>
            <td>{item.orderId}</td>
            <td>{item.userName}</td>
            <td>{item.email}</td>
            <td>{item.plan}</td>
            <td>{item.planValue}</td>
            <td>{item.purchaseDay}</td>
        </tr>
    );
}
