import React from "react";

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
} from "./styles";
import logo from "../../assets/logo.svg";
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";

const DashBoard: React.FC = () => {
  const { signOut, user } = useAuth();

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />
          <Profile>
            {console.log(user.avatar_url)}
            {user.avatar_url && <img src={user.avatar_url} alt={user.name} />}
            <div>
              <span>Bem vindo(a),</span>
              <strong>{user.name}</strong>
            </div>
          </Profile>

          <button type="button">
            <FiPower onClick={signOut} />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Horários agendados</h1>
          <p>
            <span>Hoje</span>
            <span>Dia 06</span>
            <span>Segunda-Feira</span>
          </p>

          <NextAppointment>
            <strong>Atendimento a seguir</strong>
            <div>
              <img
                src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
                alt=""
              />
              <strong>Giovanna Moeller</strong>
              <span>
                <FiClock />
                08:00
              </span>
            </div>
          </NextAppointment>
        </Schedule>
        <Calendar />
      </Content>
    </Container>
  );
};

export default DashBoard;
