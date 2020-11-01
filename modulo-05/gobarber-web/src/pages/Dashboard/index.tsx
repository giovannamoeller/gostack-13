import React, { useCallback, useState } from "react";
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css'; // importa o estilos padrões

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  Calendar,
  NextAppointment,
  Section,
  Appointment,
} from "./styles";
import logo from "../../assets/logo.svg";
import { FiClock, FiPower } from "react-icons/fi";
import { useAuth } from "../../hooks/auth";

const DashBoard: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
      // garantir q o user n clica em dia unavailble
    if(modifiers.available) {
        setSelectedDate(day);
    }
  }, []);

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

          <Section>
            <strong>Manhã</strong>
            <Appointment>
              <span>
                <FiClock />
                08:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
                  alt=""
                />
                <strong>Giovanna Moeller</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                09:30
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
                  alt=""
                />
                <strong>Giovanna Moeller</strong>
              </div>
            </Appointment>
          </Section>

          <Section>
            <strong>Tarde</strong>

            <Appointment>
              <span>
                <FiClock />
                16:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
                  alt=""
                />
                <strong>Giovanna Moeller</strong>
              </div>
            </Appointment>

            <Appointment>
              <span>
                <FiClock />
                17:00
              </span>

              <div>
                <img
                  src="https://avatars1.githubusercontent.com/u/47362960?s=460&u=99702db3dedab50f47b0f151acea1e2e9db1b3fc&v=4"
                  alt=""
                />
                <strong>Giovanna Moeller</strong>
              </div>
            </Appointment>
          </Section>
        </Schedule>

        <Calendar>
            <DayPicker 
                weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
                fromMonth={new Date()}
                disabledDays={[
                    { daysOfWeek: [0, 6] }]}
                modifiers={{
                    available: { daysOfWeek: [1, 2, 3, 4, 5] }
                }}
                selectedDays={selectedDate}
                onDayClick={handleDateChange}
                months={[
                    'Janeiro',
                    'Fevereiro',
                    'Março',
                    'Abril', 
                    'Maio',
                    'Junho',
                    'Julho',
                    'Agosto',
                    'Setembro',
                    'Outubro',
                    'Novembro',
                    'Dezembro',
                ]}
                />

        </Calendar>
      </Content>
    </Container>
  );
};

export default DashBoard;
