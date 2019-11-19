import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;
export const ItemWrap = styled.div`
    flex-direction: row !important;
    width: 100%;
    flex: 1;
`;

export const Btn = styled.button`
    color: #fff !important;
    font-size: 12px !important;
    background: gray !important;
    height: 20px !important;
    border: 0 !important;
    border-radius: 5px !important;
    width: 100% !important;
    margin-bottom: 15px;
`;

export const Form = styled.form`
    width: 800px;
    background: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    p {
        color: #ff3333;
        margin-bottom: 15px;
        border: 1px solid #ff3333;
        padding: 10px;
        width: 100%;
        text-align: center;
    }
    input {
        flex: auto;
        height: 46px;
        margin-bottom: 15px;
        padding: 0 20px;
        color: #777;
        font-size: 15px;
        width: 100%;
        border: 1px solid #ddd;
        &::placeholder {
            color: #999;
        }
    }
    hr {
        margin: 20px 0;
        border: none;
        border-bottom: 1px solid #cdcdcd;
        width: 100%;
    }
    a {
        font-size: 16;
        font-weight: bold;
        color: #999;
        text-decoration: none;
    }
`;
