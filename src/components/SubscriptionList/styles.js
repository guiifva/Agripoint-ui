import styled from 'styled-components';

export const CardList = styled.div`
    display: flex;

    button {
        border-radius: 1px;
        color: orange;
        background-color: gray;
    }
`;

export const Button = styled.button`
    margin-top: 20px;
    justify-content: center;
    width: 250px;
    height: 60px;
    color: orange !important;
    background-color: gray;

    a {
        color: inherit;
    }

    a:hover {
        color: inherit;
        text-decoration: none;
        font-size: 110%;
    }
`;
