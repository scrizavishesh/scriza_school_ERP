import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TeachergetAllAssignmentsDataApi, TeachergetAllClassRoutineDataApi, TeachergetAllEventDataApi, TeachergetAllHolidayDataApi, TeachergetAllLeaveOfTeacherDataApi, TeachergetAllDashboardAttendanceDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import LineChart from '../Charts/LineChart'


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
  .my-btn12{
  border: 1px solid #aaa;
  padding: 5px 7px;
}
.progress-bar{
  width: 100% !important;
  height: 5px !important;
  border-radius: 0px !important;
  background-color: #FF914C;
}
.my-progress-bar {
    /* width: 10% ; */
    height: 6px!important ;
    border-radius: 10px !important;
    background-color: #FF914D;
    margin-top: -3px ;
}
.my-graph-length{
height: 10px;
border:1px solid #aaa;
width: "100%" !important;
border-radius: 10px !important;

}

`;

const DashboardPage = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const navigate = useNavigate()
  const [AssignmentData, setAssignmentData] = useState([]);
  const [HolidayData, setHolidayData] = useState([]);
  const [RoutineData, setRoutineData] = useState([]);
  const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
  const [EventData, setEventData] = useState([]);
  const [leaveAllData, setLeaveAllData] = useState([]);
  const [availableLeave, setAvailableLeave] = useState([]);

  const [showTime, setShowTime] = useState()
  const [showLateByHours, setShowLateByHours] = useState()
  const [showLateByMinutes, setShowLateByMinutes] = useState()
  const [showDate, setShowDate] = useState()
  const [showLate, setShowLate] = useState()
  const [showCheckIn, setShowCheckIn] = useState()
  const [showCheckOut, setShowCheckOut] = useState()
  const [showTimeHours, setShowTimeHours] = useState()
  const [showTimeMinutes, setShowTimeMinutes] = useState()
  const [showTimeSecond, setShowTimeSecond] = useState()
  const [showAttendanceBarGraph, setShowAttendanceBarGraph] = useState()

  const [timeTableDay, setTimeTableDay] = useState('');

  const date = new Date();
  const today = date.toLocaleDateString('en-US', { weekday: 'long' });

  useEffect(() => {
    getAllClassRoutine();
    getAllAssignments();
    getAllHolidays();
    getAllEvents();
    MyGetallLeaveOfTeacher();
    MyAttendanceShowOfTeacher();
  }, [token, timeTableDay]);


  const ToLowerCase = (value) => {
    setTimeTableDay(value.toLowerCase());
  }
  // const getAllDailyAttendance = async () => {

  //   try {
  //     setloaderState(true);
  //     var response = await getAllStudentAttendanceApi();
  //     if (response?.status === 200) {
  //       if (response?.data?.status === 'success') {
  //         setloaderState(false);
  //         setDailyAttendanceData(response?.data?.attendance)
  //         toast.success(response.data.message);
  //       }
  //       else {
  //         setloaderState(false);
  //       }
  //     }
  //     else {
  //       setloaderState(false);
  //       console.log(response?.data?.msg);
  //     }
  //   }
  //   catch (error) {
  //     console.log('Error Facing during Get All DailyAttendance API - ', error)
  //   }
  // }
  // class routine get all api
  const getAllClassRoutine = async () => {
    try {
      setloaderState(true);
      var response = await TeachergetAllClassRoutineDataApi(timeTableDay);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setRoutineData(response?.data?.timeTable)
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All ClassRoutines API - ', error)
    }
  }

  const getAllAssignments = async () => {
    try {
      setloaderState(true);
      var response = await TeachergetAllAssignmentsDataApi();
      console.log(response, 'Assignment responseeee-------------')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAssignmentData(response?.data?.assignment)
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Assignment API - ', error)
    }
  }

  const getAllHolidays = async () => {
    try {
      setloaderState(true);
      const searchByKey = ''
      const pageNo = ''
      const pageSize = ''
      var response = await TeachergetAllHolidayDataApi(searchByKey, pageNo, pageSize);
      console.log(response, 'holiday')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setHolidayData(response?.data?.holidays)
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Holiday API - ', error)
    }
  }
  const getAllEvents = async () => {
    try {
      setloaderState(true);
      const searchByKey = ''
      const pageNo = ''
      const pageSize = ''
      var response = await TeachergetAllEventDataApi(searchByKey, pageNo, pageSize);
      console.log(response, 'Events')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setEventData(response?.data?.events)
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Event API - ', error)
    }
  }
  const MyGetallLeaveOfTeacher = async () => {
    try {
      setloaderState(true);
      var response = await TeachergetAllLeaveOfTeacherDataApi();
      console.log(response, 'All leave data in teacher')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setLeaveAllData(response?.data?.leave)
          setAvailableLeave(response?.data?.leave)
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Event API - ', error)
    }
  }
  const MyAttendanceShowOfTeacher = async () => {
    try {
      setloaderState(true);
      var response = await TeachergetAllDashboardAttendanceDataApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);

          setShowTime(response?.data?.leave)
          setShowLateByHours(response?.data?.ByHour)
          setShowLateByMinutes(response?.data?.ByMin)
          setShowDate(response?.data?.attendanceDate)
          setShowLate(response?.data?.state)
          setShowCheckIn(response?.data?.checkInTime)
          setShowCheckOut(response?.data?.checkOutTime)
          setShowTimeHours(response?.data?.workHour?.hours)
          setShowTimeMinutes(response?.data?.workHour?.minutes)
          setShowTimeSecond(response?.data?.workHour?.seconds)
          setShowAttendanceBarGraph(response?.data?.percent)
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Event API - ', error)
    }
  }

  const AllDaysAttendanceHandle = () => {
    navigate('/assignleave')
  }

  return (

    <Container className='container-fluid pb-4'>

      {
        loaderState && (
          <HashLoader />
        )
      }

      <div className="row mx-2">
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Timetable Details</p>
                  </div>
                  <div>
                    <select className="form-select rounded-2 borderOrange text-black font12" value={timeTableDay} aria-label="Default select example" onChange={(e) => ToLowerCase(e.target.value)}>
                      <option value={today}>Today</option>
                      <option value=''>Week</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row heading-16">
                {RoutineData?.map((item) => (
                  <div className='row' key={item.day}>
                    {item?.periodTable?.map((item1) => (
                      <div className="col-6 p-1" key={item1.classRouteId}>
                        <div className="timeTableCard p-2">
                          <p className='greenText font18'>{item1.subject}</p>
                          <div className="d-flex pt-2">
                            <div className="flex-grow-1 align-self-center">
                              <p className='font12'>{item1.startHourTime}-{item1.endHourTime}</p>
                            </div>
                            <div>
                              <p className='font12 greyText'>Class - {item1.section}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className=" d-flex justify-content-between">
                <div className="pt-2">
                  <p >Attendance</p>
                </div>
                <div className="">
                  <div className='d-flex g-1 for-media-query'>
                    <div className='pe-2'  >
                    </div>
                    <div className='pe-2'>
                      <Link className="btn my-btn12 heading-12  mt-1" data-bs-dismiss="offcanvas" onClick={() => AllDaysAttendanceHandle()} >Last 7 Days</Link>
                    </div>
                  </div>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className='text-center mt-4'>
                  <h4 className='mb-0'>{`${showTimeHours ? showTimeHours : 0} : ${showTimeMinutes ? showTimeMinutes : 0} : ${showTimeSecond ? showTimeSecond : 0}`} Hrs</h4>
                  <p className='pt-0'>{showDate}</p>
                  <p className='heading-14 pb-3' style={{ color: '#FF914C' }}>{showLate} by {`${showLateByHours ? showLateByHours : 0} : ${showLateByMinutes ? showLateByMinutes : 0}`}</p>
                </div>
                <div className='pt-1 my-graph-length p-0' >
                  <div class="progress my-progress-bar  " style={{ width: `${showAttendanceBarGraph !== 0 ? `${showAttendanceBarGraph}%` : '0%'}` }} role="progressbar" aria-label="Animated striped example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar  progress-bar-striped progress-bar-animated" ></div>
                  </div>
                </div>
                <div className='d-flex mb-3 mt-2 justify-content-between heading-14' style={{ color: '#8F8F8F' }}>
                  <p>{showCheckIn}</p>
                  <p>General</p>
                  <p>{showCheckOut}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row mx-2">
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Assignment Details</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/assignmenttea'>View All</Link>
                </div>
              </div>
              <div className="row">
                {AssignmentData.slice(0, 3).map((item) => (
                  <div className="col-12 p-1" key={item.id}>
                    <div className="timeTableCard p-2">
                      <div className="row mb-2">
                        <div className="col-4 align-self-center">
                          <p className='greenText font16'>{item.title}</p>
                        </div>
                        <div className="col-4 align-self-center">
                          <p className='font14'>{item.subjectName}</p>
                        </div>
                        <div className="col-4 align-self-center">
                          <p className='font12'></p>
                        </div>
                      </div>
                      <div className="row pt-1 heading-16">
                        <div className="col-2 align-self-center">
                          <p className='font12 greyText'>Class - {item.sectionName}</p>
                        </div>
                        <div className="col-5 align-self-center">
                          <p className='font12 greyText'>Start Date - {item.startDate}</p>
                        </div>
                        <div className="col-5 align-self-center">
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
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Leave Report</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/leave'>View All</Link>
                </div>
              </div>
              <div className="row heading-16">
                {leaveAllData?.map((item) => (
                  <div className="col-6 p-1" key={item.classRouteId}>
                    <div className='d-flex timeTableCard' >
                      <div className=" p-2">
                        <p className='greenText font18'>{item.leaveType}</p>
                        <div className="d-flex pt-2">
                          <div className="flex-grow-1 align-self-center">
                            <p className='font12'>Available {item.leaveCount} day</p>
                          </div>
                        </div>
                      </div>
                      <div className='my-class'>
                        <p className='ps-5'>
                          <LineChart />
                        </p>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row mx-2">
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
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
                {EventData.map((item) => (
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
        <div className="col-lg-6 col-md-12 col-sm-12 ps-3 pe-3 pt-3">
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
                {HolidayData.map((item) => (
                  <div className="col-4 p-2" key={item.holidayId}>
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