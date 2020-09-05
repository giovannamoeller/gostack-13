import styled, { css } from "styled-components";

interface FormProps {
  hasError: boolean;
}

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
  margin-top: 10vh;
  max-width: 450px;
  line-height: 60px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 5vh;
  input {
    padding: 15px 20px;
    min-width: 400px;
    border: none;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;
    ${(props) => props.hasError && css `
      border-color: #c53030;
      ` }

    &::placeholder {
      color: #a8a8b3;
    }
  }
  button {
    padding: 15px 20px;
    min-width: 200px;
    border: 2px solid #04d361;
    border-radius: 8px 0;
    background: #04d361;
    border-radius: 0px 5px 5px 0px;
    color: white;
    cursor: pointer;
    font-weight: bold;
    transition: 0.5s;

    &:hover {
      background: #04d382;
    }
  }
`;

export const Repositories = styled.div`
  margin-top: 10vh;
  max-width: 700px;
  a {
    background-color: white;
    border-radius: 8px;
    width: 100%;
    padding: 16px 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    & + a { /* & representa um elemento */
      margin-top: 24px;
    } /* precedido */
    &:hover {
      transform: translateX(10px); /* adiciona 10px no eixo X */
    }
  }
  img {
    width: 64px;
    border-radius: 50%;
  }
  div {
    margin-left: 20px;
    line-height: 28px;
    flex: 1;
    strong {
      color: #3d3d4d;
      font-size: 22px;
    }
    p {
      color: #a8a8b3;
      font-size: 18px;
    }
  }
  svg {
    color: #C9C9D4;
    margin-left: auto;
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;