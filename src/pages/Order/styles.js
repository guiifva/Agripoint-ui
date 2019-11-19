import styled from 'styled-components';

export const Lista = styled.ul`
    margin-left: 5px;

    li {
        margin-top: 10px;
        padding: 2px;
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
