import styled from "styled-components";
import { shade } from "polished";

export const Container = styled.button`
  background: #ff9000;
  border-radius: 10px;
  color: #312e38;
  border: none;
  width: 340px;
  height: 56px;
  margin: 3vh 0;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#ff9000")};
  }
`;
