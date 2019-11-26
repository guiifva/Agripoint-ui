import React from 'react';

import { Row, Table } from 'react-bootstrap';
import TableRowRenewal from './TableRowRenewal';
// import { Container } from './styles';

export default function ReportRenewalTable({ table }) {
    return table && table.length > 0 ? (
        <Row className="justify-content-center p-3">
            <Table responsive>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Plano</th>
                        <th>Valor</th>
                        <th>Proxima Renovção</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map(item => (
                        <TableRowRenewal key={item.orderId + 1} item={item} />
                    ))}
                </tbody>
            </Table>
        </Row>
    ) : (
        <h1>Não há dados</h1>
    );
}
