import styled, { css } from "styled-components";
import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 340px;
  padding: 16px;
  border-radius: 10px;
  border: 2px solid #232129;
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

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      svg {
        color: #ff9000;
      }
      border: 2px solid #ff9000;
    `}

    ${(props) =>
    props.isFilled &&
    css`
      svg {
        color: #ff9000;
      }
    `}
`;

export const Error = styled(Tooltip)`
  height: 20px;
  svg {
    margin: 0;
  }

  span {
    background: #c53030;
    color: white;

    &::before {
      border-color: #c53030 transparent;
    }
  }
`;
