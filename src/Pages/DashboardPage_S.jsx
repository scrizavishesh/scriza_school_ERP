import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Calender from '../Layouts/Calender'
import { getAllAssignmentsDataApi, getAllClassRoutineDataApi, getAllEventDataApi, getAllHolidayDataApi, getAllStudentAttendanceApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const Container = styled.div`

  .cards{
    border : 1px solid var(--cardsBorder);
    background-color: #fff;
    border-radius: var(--borderRadius10px);
  }

  .borderOrange{
    border: 1px solid var(--activeOrangeBorder) !important;
  }

  .continueLesson{
    background-color: var(--greenTextColor);
    border-radius: var(--borderRadius17px);
  }

  .borderLeftOrange{
    border-left: 4px solid var(--orangeTextColor) !important;
  }

  .timeTableCard{
    border : 1px solid var(--timeTableCardBorder);
    background-color: var(--timeTableCardBg);
    border-radius: var(--borderRadius5px);
  }

  .holidayCard{
    border : 1px solid var(--timeTableCardBorder);
    background-image: url(./images/holidayBg.svg);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: var(--borderRadius5px);
  }

  .eventCards{
    border : 1px solid var(--timeTableCardBorder);
    background-color: var(--timeTableCardBg);
    border-radius: 0px !important;
  }

  .greyText{
    color: var(--greyTextColor);
  }

  .greenText{
    color: var(--greenTextColor);
  }

  .carousel-indicators [data-bs-target] {
    background-color: #D9D9D9;
    border-radius: 50%;
    width: 10px;
    height: 10px;
  }

  .carousel-indicators .active {
    background-color: #01CCBB;
  }

  .calenderp0{
    padding: 0% !important;
  }

`;

const DashboardPage = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [AssignmentData, setAssignmentData] = useState([]);
  const [HolidayData, setHolidayData] = useState([]);
  const [RoutineData, setRoutineData] = useState([]);
  const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
  const [EventData, setEventData] = useState([]);

  const [timeTableDay, setTimeTableDay] = useState('monday')

  const date = new Date();
  const today = date.toLocaleDateString('en-US', { weekday: 'short' });

  const [month, setMonth] = useState(new Date().getMonth() + 1); // Set default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Set default to current year
  const [attendanceMonthSearch, setAttendanceMonthSearch] = useState(false);

  useEffect(() => {
    if (token || attendanceMonthSearch){
      getAllDailyAttendance();
    }
    if (token) {
      getAllClassRoutine();
      getAllAssignments();
      getAllHolidays();
      getAllEvents();
    }

    if (today) {
      setTimeTableDay(today)
    }
  }, [token, today, attendanceMonthSearch]);

  const getAllDailyAttendance = async () => {
    try {
      setloaderState(true);
      var response = await getAllStudentAttendanceApi(month, year);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setDailyAttendanceData(response?.data?.attendance)
          setAttendanceMonthSearch(false);
          // // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
      // setTimeout(async() => {
      // }, 3000);
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const getAllClassRoutine = async () => {
    try {
      setloaderState(true);
      var response = await getAllClassRoutineDataApi(timeTableDay);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setRoutineData(response?.data?.timetable)
          // // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const getAllAssignments = async () => {
    try {
      setloaderState(true);
      const page=''
      const size=''
      var response = await getAllAssignmentsDataApi(page,size);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAssignmentData(response?.data?.assignment)
          // // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const getAllHolidays = async () => {
    try {
      setloaderState(true);
      const searchByKey = ''
      const pageNo = ''
      const pageSize = ''
      var response = await getAllHolidayDataApi(searchByKey, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setHolidayData(response?.data?.holidays)
          // // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const getAllEvents = async () => {
    try {
      setloaderState(true);
      const searchByKey = ''
      const pageNo = ''
      const pageSize = ''
      var response = await getAllEventDataApi(searchByKey, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setEventData(response?.data?.events)
          // // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const updateMonth = (newMonth) => {
    console.log('Parent received new month:', newMonth);
    if (month !== newMonth) {
      setMonth(newMonth); // Update state
      setAttendanceMonthSearch(true)
    }
  };

  // Function to update year
  const updateYear = (newYear) => {
    console.log('Parent received new year:', newYear);
    if (year !== newYear) {
      setYear(newYear);  // Update state
      setAttendanceMonthSearch(true)
    }
  };


  return (
    <Container className='container-fluid pb-4'>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="row">
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Timetable Details</p>
                  </div>
                  <div>
                    {/* <select className="form-select rounded-2 borderOrange text-black font12" value={timeTableDay} aria-label="Default select example" onChange={(e) => setTimeTableDay(e.target.value)}>
                      <option value=''>Select</option>
                      <option defaultValue value='Today'>Today</option>
                      <option value='Week'>Week</option>
                      <option value='Month'>Month</option>
                      <option value='Year'>Year</option>
                    </select> */}
                  </div>
                </div>
              </div>
              <div className="row">
                {RoutineData.map((item) => (
                  <div className="col-sm-6 col-12 p-1" key={item.classRouteId}>
                    <div className="timeTableCard p-2">
                      <p className='greenText font18'>{item.subject}</p>
                      <div className="d-flex pt-2">
                        <div className="flex-grow-1 align-self-center">
                          <p className='font12'>{item.startHourTime.slice(0, 5)}-{item.endHourTime.slice(0, 5)}</p>
                        </div>
                        <div className="">
                          <p className='font12 greyText'>Class - {item.section}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <p>Attendance</p>
              </div>
              <div className="row">
                {/* <Calender className='calenderp0' DailyAttendanceData={DailyAttendanceData} /> */}
                <Calender className='calenderp0' DailyAttendanceData={DailyAttendanceData} month={month} year={year} monthUpdate={updateMonth} yearUpdate={updateYear} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Assignment Details</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Assignments'>View All</Link>
                </div>
              </div>
              <div className="row">
                {AssignmentData.slice(0, 3).map((item) => (
                  <div className="col-12 p-1" key={item.id}>
                    <div className="timeTableCard p-2">
                      <div className="row">
                        <div className="col-sm-4 col-12 align-self-center">
                          <p className='greenText font16'>{item.title}</p>
                        </div>
                        <div className="col-sm-4 col-6 align-self-center">
                          <p className='font14'>{item.subjectName}</p>
                        </div>
                        <div className="col-sm-4 col-4 d-sm-block d-none align-self-center">
                          <p className='font12'></p>
                        </div>
                        <div className="col-sm-4 col-6 align-self-center">
                          <p className='font12 greyText'>Class - {item.sectionName}</p>
                        </div>
                        <div className="col-sm-4 col-6 align-self-center">
                          <p className='font12 greyText'>Start Date - {item.startDate}</p>
                        </div>
                        <div className="col-sm-4 col-6 align-self-center">
                          <p className='font12 greyText'>End Date - {item.endDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Online Course</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/OnlineCourse'>View All</Link>
                </div>
              </div>
              <div className="row h-75">
                <div className="col-12 align-self-center">
                  <div id="carouselExampleIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="row p-4">
                          <div className="col-6">
                            <img src="./images/onlineCourse1.svg" className="d-block w-100" alt="..." />
                          </div>
                          <div className="col-6 align-self-center text-center">
                            <p className='font18'>Mathematics</p>
                            <p className='font14 greyText mt-1'>Trigonometry</p>
                            <p className='text-center mt-2'>
                              <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row p-4">
                          <div className="col-6">
                            <img src="./images/onlineCourse1.svg" className="d-block w-100" alt="..." />
                          </div>
                          <div className="col-6 align-self-center text-center">
                            <p className='font18'>Mathematics</p>
                            <p className='font14 greyText mt-1'>Trigonometry</p>
                            <p className='text-center mt-2'>
                              <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="row p-4">
                          <div className="col-6">
                            <img src="./images/onlineCourse1.svg" className="d-block w-100" alt="..." />
                          </div>
                          <div className="col-6 align-self-center text-center">
                            <p className='font18'>Mathematics</p>
                            <p className='font14 greyText mt-1'>Trigonometry</p>
                            <p className='text-center mt-2'>
                              <button className='btn continueLesson ps-3 pe-3 text-white font12' type='button'>Continue Lesson</button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Upcoming Events</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' to='/Event'>View All</Link>
                </div>
              </div>
              <div className="row">
                {EventData.slice(0,4).map((item) => (
                  <div className="col-12 p-1" key={item.eventId}>
                    <div className="eventCards">
                      <div className="borderLeftOrange p-2">
                        <div className="d-flex p-1">
                          <div className="flex-fill">
                            <p className='font14'>{item.eventName}</p>
                          </div>
                          <div className="flex-shrink">
                            <p className="font14 text-end greyText">{item.startDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Upcoming Holiday</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Holiday'>View All</Link>
                </div>
              </div>
              <div className="row">
                {HolidayData.slice(0,6).map((item) => (
                  <div className="col-sm-4 col-12 p-2" key={item.holidayId}>
                    <div className="holidayCard p-4">
                      <p className='font16 text-center'>{item.holidayTitle}</p>
                      <p className='greyText font14 text-center'>{item.holidayDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </Container>
  )
}

export default DashboardPage
