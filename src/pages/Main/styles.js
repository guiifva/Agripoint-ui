import styled from 'styled-components';

export const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: orange;
`;

export const SubTitle = styled.p`
    width: 100%;
    text-align: center;
    color: gray;
    font-size: 1.2rem;
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
