import styled from 'styled-components';

export const Button = styled.button`
    margin-top: 50px;
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

export const Title = styled.h1`
    width: 100%;
    text-align: center;
    color: orange;
    margin-top: 50px;
`;

export const SubTitle = styled.p`
    width: 100%;
    text-align: center;
    color: gray;
    font-size: 1.2rem;
`;
