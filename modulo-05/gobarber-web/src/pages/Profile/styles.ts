import { shade } from "polished";
import styled from "styled-components";

export const Container = styled.div`
  
  flex-direction: column; 

  header {
    height: 144px;
    background: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: #999591;
        width: 24px;
        height: 24px;
      }
    }

  }
`;

export const Content = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  width: 100%;

  margin: -136px 0;

  form {
    text-align: center;

    div:nth-child(4) { 
      margin-bottom: 24px;
    }

    display: flex;
    flex-direction: column;

    h1 {
      display: block;
      margin: 32px 0;
      font-size: 20px;
      text-align: left !important;
    }

  }
`;

export const AvatarInput = styled.div`

  position: relative;
  width: 186px;
  align-self: center;

  img {
      width: 186px;
      height: 186px;
      border-radius: 50%;
    } 

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #FF9000;
    border-radius: 50%;
    border: none;
    bottom: 0;
    right: 0;
    transition: background-color 0.2s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background: ${shade(0.2, '#FF9000')}
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312E38;
    }

    input {
      display: none;
    }
  }
`;