import React, { useState, useEffect } from 'react';

import { Container, Row, Col, Button } from 'react-bootstrap';
import ReportOrderTable from '../../components/ReportOrderTable';
import ReportRenewalTable from '../../components/ReportRenewalTable';
import Api from '../../services/api';

import { Title } from './styles';

export default function Reports() {
    const [spreadSheetsData, setSpreadSheetsData] = useState([
        {
            orderId: -1,
            userName: '',
            email: '',
            plan: '',
            planValue: -1,
            planRenewalDate: '',
            purchaseDay: '',
        },
    ]);
    const [selected, setSelected] = useState('Orders');

    async function getSpreedSheet(current) {
        const table = await Api.get(`Reports/${current}`);
        setSpreadSheetsData(table.data);
    }

    useEffect(() => {
        getSpreedSheet(selected);
    }, []);

    const handleCurrentTable = table => {
        setSelected(table);
        getSpreedSheet(table);
    };

    return (
        <Container>
            <Row className="justify-content-center mb-5">
                <Title>Relatorios</Title>
            </Row>
            <Row>
                <Col md="3 mt-5">
                    <Row>
                        <Button
                            variant={`${
                                selected === 'Orders' ? 'outline-dark' : 'dark'
                            }`}
                            className="mb-4 w-100"
                            onClick={() => handleCurrentTable('Orders')}
                        >
                            Relatorio de Pedidos
                        </Button>
                    </Row>
                    <Row>
                        <Button
                            variant={`${
                                selected === 'Renewal' ? 'outline-dark' : 'dark'
                            }`}
                            className="mb-4 w-100"
                            onClick={() => handleCurrentTable('Renewal')}
                        >
                            Relatorio de Renovações
                        </Button>
                    </Row>
                </Col>
                <Col md="9">
                    {selected === 'Orders' ? (
                        <ReportOrderTable table={spreadSheetsData} />
                    ) : (
                        <ReportRenewalTable table={spreadSheetsData} />
                    )}
                </Col>
            </Row>
        </Container>
    );
}
