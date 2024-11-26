import React, { useState, useEffect } from 'react';

const MyTime = ({ data }) => {

  const myBoolean = data
  const [update, setupdate] = useState(false);

  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  console.log('my hours', hours)
  console.log('my min', minutes)
  console.log('my second', seconds)


  useEffect(() => {
    let interval = null;

    if (myBoolean) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else if (!myBoolean && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [myBoolean]);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prev) => prev + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHours((prev) => prev + 1);
    }
  }, [minutes]);

  useEffect(() => {
    if (hours === 24) {
      setHours(0);
      setDays((prev) => prev + 1);
    }
  }, [hours]);


  return (
    <div className="timer" style={{ fontSize: '20px', paddingTop: '3px' }}>
      {`${hours} : ${minutes} : ${seconds}`}
    </div>
  );
};

export default MyTime;


