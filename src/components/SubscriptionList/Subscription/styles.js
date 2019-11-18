import styled from 'styled-components';

export const Card = styled.div`
    box-shadow: ${props =>
        props.selected ? '0 0 1px 7px orange' : '0 0 1px 7px gray'};
    height: 30rem;
    flex: 1;
    margin-right: 25px;
    position: relative;
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    h1 {
        text-align: center;
    }

    .selectSpan {
        margin-bottom: 20px;
        width: 100%;
        display: block;
        text-align: center;
        font-size: 2rem;
        color: ${props => (props.selected ? 'orange' : 'black')};
    }

    .planValues {
        margin: auto;
        font-size: 3rem;
        font-weight: 700;
        width: 100%;
        text-align: center;
        align-self: center;
    }
    .planValues > span {
        text-align: center;
        font-size: 3rem;
        font-weight: 700;
        color: orange;
    }

    :hover {
        box-shadow: 0 0 1px 7px orange;
    }
`;
