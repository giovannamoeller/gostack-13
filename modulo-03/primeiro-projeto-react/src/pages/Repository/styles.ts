import styled, { css } from "styled-components";


export const Header = styled.header`
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
        display: flex;
        align-items: center;
        color: #A8A8B3; 
        span {
            font-size: 14px;
        }
        margin-left: auto;
    }
`;

export const Repo = styled.section`
    margin-top: 10vh;
    div.repo {
        img {
            width: 100px;
            border-radius: 50%;
        }
        display: flex;
        align-items: center;
        div {
            strong {
                font-size: 36px;
                line-height: 42px;
                color: #3D3D4D;
            }
            p {
                font-size: 16px;
                line-height: 23px;
                color: #737380;
            }
            margin-left: 40px;
        }
    }

    div.info {
        margin-top: 5vh;
        display: grid;
        grid-template-columns: repeat(3, 150px);

        strong {
            font-size: 36px;
            line-height: 50px;
            color: #3D3D4D;
        }

        p {
            font-size: 18px;
            line-height: 23px;
            color: #6C6C80;
        }
    }

`;

export const Issues = styled.div`
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

