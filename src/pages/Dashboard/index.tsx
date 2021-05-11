import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { isToday, format, isAfter } from 'date-fns';
// import  ptBr  from 'date-fns/locale/pt-BR';

import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { FiClock, FiPower } from 'react-icons/fi';
import { parseISO } from 'date-fns/esm';
import { Link } from 'react-router-dom';
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
} from './styles';

import logoImage from '../../assets/logoImg.svg';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface IAppointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailabilityItem[]
  >([]);

  const [appoinments, setAppointments] = useState<IAppointment[]>([]);

  // useCallback always will return function
  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    // will return the days available and disable the click highlight for dates that are not available
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  // will be fired every time current month changes. Every time this method is called, you need to list it's dependency
  useEffect(() => {
    api
      .get(`./providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // This function will be fired everytime the day selected changes. //useEffect wil always execute a function
  useEffect(() => {
    api
      .get<IAppointment[]>('./appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => {
          return {
            ...appointment,
            hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
          };
        });
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // useMemo is to save in memory a specific value, format, etc, and tell when the value is supposed to be used.
  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  // useMemo will return a specific value
  const selectedDayAsText = useMemo(() => {
    return format(selectedDate, 'MMMM dd');
  }, [selectedDate]);

  const selectedWeekDayAsText = useMemo(() => {
    return format(selectedDate, 'cccc');
  }, [selectedDate]);

  const morningAppointments = useMemo(() => {
    return appoinments.filter(appointment => {
      return parseISO(appointment.date).getHours() < 12;
    });
  }, [appoinments]);

  const afternoonAppointments = useMemo(() => {
    return appoinments.filter(appointment => {
      return parseISO(appointment.date).getHours() >= 12;
    });
  }, [appoinments]);

  const nextAppointment = useMemo(() => {
    return appoinments.find(appointment =>
      // will get the next appointment that is after currect date/time
      isAfter(parseISO(appointment.date), new Date()),
    );
  }, [appoinments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImage} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />

            <div>
              <span>Welcome,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>
          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Scheduled appointmets </h1>
          <p>
            {isToday(selectedDate) && <span>Today</span>}
            <span>{selectedDayAsText}</span>
            <span>{selectedWeekDayAsText}</span>
          </p>

          {isToday(selectedDate) && nextAppointment && (
            <NextAppointment>
              <strong>Next appointment</strong>
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
            <strong>Morning</strong>

            {morningAppointments.length === 0 && (
              <p>No appointments in the morning</p>
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
            <strong>Afternoon</strong>

            {afternoonAppointments.length === 0 && (
              <p>No appointments in the afternoon</p>
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
            weekdaysShort={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            fromMonth={new Date()}
            onMonthChange={handleMonthChange}
            // because disableDays is an array, you need to add ... before adding it inside another array
            disabledDays={[{ daysOfWeek: [0, 6] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5] },
            }}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
          />
        </Calendar>
      </Content>
    </Container>
  );
};
export default Dashboard;
