import styled from "styled-components";

export const Container = styled.div`
  width: 340px;
  padding: 16px;
  border-radius: 10px;
  border: none;
  outline: 0;
  background: #232129;

  display: flex;
  align-items: center;
  & + div {
    margin-top: 8px;
  }

  input {
    background: transparent;
    flex: 1;
    border: none;
    color: #f4ede8;
    &::placeholder {
      color: #666360;
    }
  }

  svg {
    margin-right: 16px;
    color: #666360;
  }
`;
