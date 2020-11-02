import React, { useCallback, useEffect, useMemo, useState } from "react";
import DayPicker, { DayModifiers } from "react-day-picker";
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import "react-day-picker/lib/style.css"; // importa o estilos padrões

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
import api from "../../services/api";
import { Link } from "react-router-dom";

interface MonthAvailabilityItem {
    day: number;
    available: boolean
}

interface Appointment {
    id: string;
    date: string;
    hourFormatted: string;
    user: {
        name: string;
        avatar_url: string;
    }
}

const DashBoard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const { signOut, user } = useAuth();

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback(
    (month: Date) => {
        setCurrentMonth(month);
    },
    []
  );

  const disabledDays = useMemo(() => {
    const dates = monthAvailability.filter(monthDay => monthDay.available === false)
        .map(monthDay => {
            const year = currentMonth.getFullYear();
            const month = currentMonth.getMonth();
            return new Date(year, month, monthDay.day);
        });

        return dates;
  }, [currentMonth, monthAvailability]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", {
        locale: ptBR
    });
  }, [selectedDate]);

  const selectedWeekDayAsText = useMemo(() => {
    const week_day = format(selectedDate, "cccc", {
        locale: ptBR
    });
    if(week_day !== 'sábado' && week_day !== 'domingo') {
        return week_day[0].toLocaleUpperCase() + week_day.substr(1) + '-feira';
    } else {
        return week_day[0].toLocaleUpperCase() + week_day.substr(1);
    }
  }, [selectedDate]);

  useEffect(() => {
    api(`/providers/${user.id}/month-availability`, {
        
        params: {
            year: currentMonth.getFullYear(),
            month: currentMonth.getMonth() + 1,
        }
    }).then(response => {
        setMonthAvailability(response.data);
    });
  }, [currentMonth, user.id]); // toda vez que currentMonth mudar, vai chamar esse useEffect

  useEffect(() => {
      api.get<Appointment[]>('/appointments/me', {
          params: {
              year: selectedDate.getFullYear(),
              month: selectedDate.getMonth() + 1,
              day: selectedDate.getDate(),
          }
      }).then(response => {
          const appointmentFormatted = response.data.map(appointment => {
              return {
                  ...appointment,
                  hourFormatted: format(parseISO(appointment.date), 'HH:mm')
              }
          })
          setAppointments(appointmentFormatted);
      });  
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appointments.filter(appointment => {
        return parseISO(appointment.date).getHours() < 12; // antes do almoço
    });
  }, [appointments]);

  const afternoonAppointments = useMemo(() => {
    return appointments.filter(appointment => {
        return parseISO(appointment.date).getHours() >= 12; // depois do almoço
    });
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => {
        isAfter(parseISO(appointment.date), new Date());
    });
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logo} alt="GoBarber" />
          <Profile>
            {user.avatar_url && <img src={user.avatar_url} alt={user.name} />}
            <div>
              <span>Bem vindo(a),</span>
                <Link to="/profile"><strong>{user.name}</strong></Link>
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
            {isToday(selectedDate) && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDayAsText}</span>
          </p>
          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
                <strong>Agendamento a seguir</strong>
                <div>
                <img
                    src={nextAppointment.user.avatar_url}
                    alt={nextAppointment.user.name}
                />
                <strong>{nextAppointment.user.name}</strong>
                <span>
                    <FiClock />
                    {nextAppointment.hourFormatted}
                </span>
                </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointments.length === 0 && (
                <p>Nenhum agendamento nesse período.</p>
            )}

            {morningAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                <span>
                    <FiClock />
                    {appointment.hourFormatted}
                </span>

                <div>
                    <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                    />
                    <strong>{appointment.user.name}</strong>
                </div>
                </Appointment>
            ))}

          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointments.length === 0 && (
                <p>Nenhum agendamento nesse período.</p>
            )}

            {afternoonAppointments.map(appointment => (
                <Appointment key={appointment.id}>
                <span>
                    <FiClock />
                    {appointment.hourFormatted}
                </span>

                <div>
                    <img
                    src={appointment.user.avatar_url}
                    alt={appointment.user.name}
                    />
                    <strong>{appointment.user.name}</strong>
                </div>
                </Appointment>
            ))}

          </Section>
        </Schedule>

        <Calendar>
          <DayPicker
            weekdaysShort={["D", "S", "T", "Q", "Q", "S", "S"]}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disabledDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            onMonthChange={handleMonthChange}
            months={[
              "Janeiro",
              "Fevereiro",
              "Março",
              "Abril",
              "Maio",
              "Junho",
              "Julho",
              "Agosto",
              "Setembro",
              "Outubro",
              "Novembro",
              "Dezembro",
            ]}
          />
        </Calendar>
      </Content>
    </Container>
  );
};

export default DashBoard;
