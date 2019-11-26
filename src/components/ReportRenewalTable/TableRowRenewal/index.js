import React from 'react';
import { parseISO, format } from 'date-fns';
import PropTypes from 'prop-types';
// import { Container } from './styles';

export default function TableRowRenewal({ item }) {
    const { userName, email, plan, planValue, planRenewalDate } = item;

    return (
        <tr>
            <td>{userName}</td>
            <td>{email}</td>
            <td>{plan}</td>
            <td>{planValue}</td>
            <td>{planRenewalDate}</td>
        </tr>
    );
}

TableRowRenewal.propTypes = {
    item: PropTypes.shape({
        userName: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        plan: PropTypes.string.isRequired,
        planValue: PropTypes.number.isRequired,
        planRenewalDate: PropTypes.string,
    }).isRequired,
};
