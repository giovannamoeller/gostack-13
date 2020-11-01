import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    // primeira imagem apenas
    height: 80px;
  }

  button {
    margin-left: auto; // ocupar todo espaço possível
    background: transparent;
    border: 0;

    svg {
      color: #999591;
      height: 20px;
      width: 20px;
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
    color: #f4ede8;

    strong {
      color: #ff9000;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Schedule = styled.div`
  flex: 1; // ocupa todo espaço possível
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      // = do 2º span pra frente
      content: "";
      align-items: center;
      width: 1px;
      height: 12px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  strong {
    color: #999591;
    font-size: 20px;
    font-weight: 400;
  }

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    max-width: 640px;
    position: relative;

    &::before {
      position: absolute;
      content: "";
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 80px;
      border-radius: 50%;
      margin-right: 32px;
    }

    strong {
      color: white;
    }

    span {
      display: flex;
      align-items: center;
      margin-left: auto;
      svg {
        color: #ff9000;
        margin-right: 8px;
      }
      color: #999591;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
`;

export const Appointment = styled.div`
  margin-top: 24px;
  display: flex;
  align-content: center;
  max-width: 640px;

  span {
    display: flex;
    align-items: center;
    svg {
      color: #ff9000;
      margin-right: 8px;
    }
    color: #999591;
  }

  div {
    display: flex;
    flex: 1;
    strong {
        color: #999591;
        font-size: 18px;
        font-weight: 400;
    }
    background: #3e3b47;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-left: 24px;
    img {
      width: 56px;
      border-radius: 50%;
      margin-right: 32px;
    }

    strong {
      color: white;
    }
  }
`;

export const Calendar = styled.aside`
  max-width: 360px;
`;
