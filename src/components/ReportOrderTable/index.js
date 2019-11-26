import React from 'react';

import { Row, Table } from 'react-bootstrap';
import TableRowOrder from './TableRowOrder';

export default function ReportOrderTable({ table }) {
    return table && table.length > 0 ? (
        <Row className="justify-content-center p-3">
            <Table responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Plano</th>
                        <th>Valor</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {table.map(item => (
                        <TableRowOrder key={item.orderId} item={item} />
                    ))}
                </tbody>
            </Table>
        </Row>
    ) : (
        <h1>Não há dados</h1>
    );
}
