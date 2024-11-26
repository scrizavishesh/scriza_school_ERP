import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styled from 'styled-components';

const Container = styled.div`
  .react-calendar__tile--active:active, 
  .react-calendar__tile--active:enabled, 
  .react-calendar__tile--active:focus {
    background: #daffe4;
    color: #000;
  }

  .react-calendar__tile {
    height: 90px;
    border: 1px solid #E7E7E7;
  }

  abbr[title] {
    text-decoration: none;
    color: #FF904A;
  }

  .react-calendar__month-view__weekdays{
    text-transform: none !important;
    font-weight: 400;
  }

  .react-calendar__navigation{
    /* display: none !important; */
  }

  .react-calendar {
    width: 100%;
    border: none !important;
  }

  .react-calendar__month-view__weekdays{
    padding: 1%;
  }

  .status-circle-container {
    margin-top: 5px;
    display: flex;
    justify-content: center;
  }

  .status-circle {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
  }

  .present {
    background-color: #37d6ae;
  }

  .absent {
    background-color: #ff5f5f;
  }

  .holiday {
    background-color: #f4b840;
  }

  .legend {
    display: flex;
    margin-top: 20px;
  }

  .legend-item {
    margin-right: 20px;
    display: flex;
    align-items: center;
  }

  .legend-item .status-circle {
    margin-right: 5px;
  }
`;

const CustomCalendar = ({ DailyAttendanceData, month, year, monthUpdate, yearUpdate }) => {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    if (month || year) {
      const newDate = new Date(year, month - 1);
      setValue(newDate);
    }
  }, [month, year]);

  const getStatusForDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const attendance = DailyAttendanceData.find((entry) => entry.date === formattedDate);
    return attendance ? attendance.status : null;
  };

  const handleActiveStartDateChange = ({ activeStartDate }) => {
    const newMonth = activeStartDate.getMonth() + 1;
    const newYear = activeStartDate.getFullYear();

    if (newMonth !== month) {
      monthUpdate(newMonth);
    }

    if (newYear !== year) {
      yearUpdate(newYear);
    }

    console.log(newMonth, newYear)
  };

  return (
    <Container>
      <Calendar
        onChange={setValue}
        value={value}
        onActiveStartDateChange={handleActiveStartDateChange}
        tileContent={({ date, view }) =>
          view === 'month' && (
            <div className="status-circle-container">
              {getStatusForDate(date) === 'present' && <span className="status-circle present" />}
              {getStatusForDate(date) === 'absent' && <span className="status-circle absent" />}
              {getStatusForDate(date) === 'holiday' && <span className="status-circle holiday" />}
            </div>
          )
        }
      />

      <div className="legend">
        <div className="legend-item font14">
          <span className="status-circle present" /> Present
        </div>
        <div className="legend-item font14">
          <span className="status-circle holiday" /> Holiday
        </div>
        <div className="legend-item font14">
          <span className="status-circle absent" /> Absent
        </div>
      </div>
    </Container>
  );
};

export default CustomCalendar;