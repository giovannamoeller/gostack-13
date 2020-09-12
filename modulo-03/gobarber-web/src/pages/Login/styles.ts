import styled from "styled-components";
import barberBackground from "../../assets/sign-in-background.png";
import { shade } from 'polished'

export const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  a {
    text-decoration: none;
    margin-top: 8vh;
    color: #ff9000;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: color 0.2s;

    &:hover {
      color: ${shade(0.2, '#ff9000')}
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    h1 {
      margin: 10vh 0 3vh 0;
    }

    a {
      text-decoration: none;
      color: #F4EDE8;
      transition: color 0.2s;

      &:hover {
        color: ${shade(0.2, '#F4EDE8')}
      }
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${barberBackground}) no-repeat center;
  background-size: cover;
`;
