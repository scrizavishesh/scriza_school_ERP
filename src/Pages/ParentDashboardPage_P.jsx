import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import Calender from '../Layouts/Calender'
import { getAllAssignmentsDataApi, getAllEventDataApi, getAllHolidayDataApi, getAllNoticeDataApi, getAllStudentAttendanceApi, getFeeDashDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import BarChart from '../Charts/BarChart';

const Container = styled.div`

  .cards{
    border : 1px solid var(--cardsBorder);
    background-color: #fff;
    border-radius: var(--borderRadius10px);
  }

  .borderOrange{
    border: 1px solid var(--activeOrangeBorder) !important;
  }

  .borderLeftOrange{
    border-left: 4px solid var(--orangeTextColor) !important;
  }

  .timeTableCard{
    border : 1px solid var(--timeTableCardBorder);
    background-color: var(--timeTableCardBg);
    border-radius: var(--borderRadius5px);
  }

  .chartCard{
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


`;

const DashboardPage = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [AssignmentData, setAssignmentData] = useState([]);
  const [HolidayData, setHolidayData] = useState([]);
  const [NoticeData, setNoticeData] = useState([]);
  const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
  const [EventData, setEventData] = useState([]);

  const [timeTableDay, setTimeTableDay] = useState('monday')
  const [totalFeeData, setTotalFeeData] = useState()
  const [paidFeeData, setPaidFeeData] = useState()
  const [balanceFeeData, setBalanceFeeData] = useState()

  const date = new Date();
  const today = date.toLocaleDateString('en-US', { weekday: 'short' });

  const [attendanceMonthSearch, setAttendanceMonthSearch] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth() + 1); // Set default to current month
  const [year, setYear] = useState(new Date().getFullYear()); // Set default to current year

  useEffect(() => {
    if (token || attendanceMonthSearch) {
      getAllDailyAttendance();
    }
    if (token) {
      getAllAssignments();
      getAllHolidays();
      getAllEvents();
      getAllNotices();
      getFeesData();
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
          setDailyAttendanceData(response?.data?.attendance);
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
    }
    catch (error) {
      console.error(error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate('/');
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  }

  const getAllAssignments = async () => {
    try {
      setloaderState(true);
      var response = await getAllAssignmentsDataApi('', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAssignmentData(response?.data?.assignment)
          // // toast.success(response.data.message);
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
      console.error(error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token');
        setTimeout(() => {
          navigate('/');
        }, 200);
      }
    }
    finally {
      setloaderState(false);
    }
  }

  const getAllNotices = async () => {
    try {
      setloaderState(true);
      var response = await getAllNoticeDataApi('','','');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setNoticeData(response?.data?.notices)
          // // toast.success(response.data.message);
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
      console.log('Error Facing during Get All Notice API - ', error)
    }
  }

  const getAllHolidays = async () => {
    try {
      setloaderState(true);
      var response = await getAllHolidayDataApi('','','');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setHolidayData(response?.data?.holidays)
          // // toast.success(response.data.message);
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

  const getFeesData = async () => {
    try {
      setloaderState(true);
      var response = await getFeeDashDataApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setTotalFeeData(response?.data?.totalFee)
          setPaidFeeData(response?.data?.totalPaid)
          setBalanceFeeData(response?.data?.totalLeft)
          // // toast.success(response.data.message);
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

  const getAllEvents = async () => {
    try {
      setloaderState(true);
      const searchByKey = ''
      const pageNo = ''
      const pageSize = ''
      var response = await getAllEventDataApi('','','');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setEventData(response?.data?.events)
          // // toast.success(response.data.message);
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


  return (
    <Container className='container-fluid pb-4'>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="row">
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <p className='font14 p-1'>Fees Report Details</p>
              </div>
              <div className="row p-3 justify-content-center">
                <BarChart />
                {/* <div className="col-6">
                </div> */}
              </div>
              <div className="row p-3">
                <div className="chartCard">
                  <div className="d-flex p-3">
                    <div className="flex-grow-1">
                      <p>
                        <Icon className='me-2' icon="ic:round-square" width="1.2em" height="1.2em" style={{ color: '#01CCBB' }} />
                        <span className='font14'>Total Fee</span>
                      </p>
                    </div>
                    <div className="align-self-center">
                      <p className='font14'>{totalFeeData}</p>
                    </div>
                  </div>
                  <div className="d-flex p-3">
                    <div className="flex-grow-1">
                      <p>
                        <Icon className='me-2' icon="ic:round-square" width="1.2em" height="1.2em" style={{ color: '#E95B6D' }} />
                        <span className='font14'>Paid Fee</span>
                      </p>
                    </div>
                    <div className="align-self-center">
                      <p className='font14'>{paidFeeData}</p>
                    </div>
                  </div>
                  <div className="d-flex p-3">
                    <div className="flex-grow-1">
                      <p>
                        <Icon className='me-2' icon="ic:round-square" width="1.2em" height="1.2em" style={{ color: '#FEBC00' }} />
                        <span className='font14'>Balance Fee</span>
                      </p>
                    </div>
                    <div className="align-self-center">
                      <p className='font14'>{balanceFeeData}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row p-1">
                <p className='font14 p-0'>Last Paid Activity</p>
                <hr className='mt-1 mb-2' />
                <div className="d-flex justify-content-between p-0">
                  <p className='font14 greyText'>October Month Fese</p>
                  <p className='font14 greyText'>16 October 2023</p>
                  <p className='font14 greenText fw-bolder'>10,250</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <p className='font14 p-1'>Attendance</p>
              </div>
              <div className="row">
                <Calender className='calenderp0' DailyAttendanceData={DailyAttendanceData} month={month} year={year} monthUpdate={updateMonth} yearUpdate={updateYear} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
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
                {AssignmentData.length > 0
                  ?
                  AssignmentData.slice(0, 3).map((item) => (
                    <div className="col-12 p-1" key={item.id}>
                      <div className="timeTableCard p-2">
                        <div className="row">
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
                        <div className="row pt-1">
                          <div className="col-4 align-self-center">
                            <p className='font12 greyText'>Class - {item.sectionName}</p>
                          </div>
                          <div className="col-4 align-self-center">
                            <p className='font12 greyText'>Start Date - {item.startDate}</p>
                          </div>
                          <div className="col-4 align-self-center">
                            <p className='font12 greyText'>End Date - {item.endDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                  :
                  <p className='text-danger font14'> No Data Found !!!</p>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
          <div className="row cards p-2 h-100">
            <div className="col-12">
              <div className="row">
                <div className="d-flex p-1">
                  <div className="flex-grow-1 align-self-center">
                    <p className='font14'>Notice Board</p>
                  </div>
                  <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Notice'>View All</Link>
                </div>
              </div>
              <div className="row p-1">
                {NoticeData.length > 0
                  ?
                  NoticeData.slice(0, 2).map((item) => (
                    <>
                      <hr className='mb-2' />
                      <p className='font14 p-0'>{item.noticeTitle}</p>
                      <p className='font14 p-0 greyText pt-2 pb-2'>{item.description}</p>
                      <div className="d-flex p-2">
                        <p className='p-0'>
                          <Icon icon="fluent-mdl2:date-time-12" width="1.2em" height="1.2em" style={{ color: '#FF914D' }} />
                          <span className='font14 ms-2 greyText'>Publish Date: {item.noticeDate}</span>
                        </p>
                        <p className='p-0 ms-4'>
                          <Icon icon="mage:user-check" width="1.2em" height="1.2em" style={{ color: '#FF914D' }} />
                          <span className='font14 ms-2 greyText'>Created By: {item?.createdBy}</span>
                        </p>
                      </div>
                    </>
                  ))
                  :
                  <p>No Data Found !!!</p>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
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
                {EventData.slice(0, 4).map((item) => (
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
        <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
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
                {HolidayData.slice(0, 6).map((item) => (
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



















// import { Icon } from '@iconify/react';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import styled from 'styled-components'
// import Calender from '../Layouts/Calender'
// import { getAllAssignmentsDataApi, getAllEventDataApi, getAllHolidayDataApi, getAllNoticeDataApi, getAllStudentAttendanceApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import BarChart from '../Charts/BarChart';

// const Container = styled.div`

//   .cards{
//     border : 1px solid var(--cardsBorder);
//     background-color: #fff;
//     border-radius: var(--borderRadius10px);
//   }

//   .borderOrange{
//     border: 1px solid var(--activeOrangeBorder) !important;
//   }

//   .borderLeftOrange{
//     border-left: 4px solid var(--orangeTextColor) !important;
//   }

//   .timeTableCard{
//     border : 1px solid var(--timeTableCardBorder);
//     background-color: var(--timeTableCardBg);
//     border-radius: var(--borderRadius5px);
//   }

//   .chartCard{
//     border : 1px solid var(--timeTableCardBorder);
//     background-color: var(--timeTableCardBg);
//     border-radius: var(--borderRadius5px);
//   }

//   .holidayCard{
//     border : 1px solid var(--timeTableCardBorder);
//     background-image: url(./images/holidayBg.svg);
//     background-size: cover;
//     background-repeat: no-repeat;
//     border-radius: var(--borderRadius5px);
//   }

//   .eventCards{
//     border : 1px solid var(--timeTableCardBorder);
//     background-color: var(--timeTableCardBg);
//     border-radius: 0px !important;
//   }

//   .greyText{
//     color: var(--greyTextColor);
//   }

//   .greenText{
//     color: var(--greenTextColor);
//   }

//   .carousel-indicators [data-bs-target] {
//     background-color: #D9D9D9;
//     border-radius: 50%;
//     width: 10px;
//     height: 10px;
//   }

//   .carousel-indicators .active {
//     background-color: #01CCBB;
//   }


// `;

// const DashboardPage = () => {

//   const token = localStorage.getItem('token');
//   //loader State
//   const [loaderState, setloaderState] = useState(false);

//   const [AssignmentData, setAssignmentData] = useState([]);
//   const [HolidayData, setHolidayData] = useState([]);
//   const [NoticeData, setNoticeData] = useState([]);
//   const [DailyAttendanceData, setDailyAttendanceData] = useState([]);
//   const [EventData, setEventData] = useState([]);

//   const [timeTableDay, setTimeTableDay] = useState('monday')

//   const date = new Date();
//   const today = date.toLocaleDateString('en-US', { weekday: 'short' });

//   const [attendanceMonthSearch, setAttendanceMonthSearch] = useState(false);
//   const [month, setMonth] = useState(new Date().getMonth() + 1); // Set default to current month
//   const [year, setYear] = useState(new Date().getFullYear()); // Set default to current year

//   useEffect(() => {
//     if (token || attendanceMonthSearch) {
//       getAllDailyAttendance();
//     }
//     if(token){
//       getAllAssignments();
//       getAllHolidays();
//       getAllEvents();
//       getAllNotices();
//     }
//     if (today) {
//       setTimeTableDay(today)
//     }
//   }, [token, today, attendanceMonthSearch]);

//   const getAllDailyAttendance = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllStudentAttendanceApi(month, year);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setDailyAttendanceData(response?.data?.attendance);
//           setAttendanceMonthSearch(false);
//           // // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           // toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.msg);
//       }
//     }
//     catch (error) {
//       console.error(error);
//       if (error?.response?.data?.statusCode === 401) {
//         localStorage.removeItem('token');
//         setTimeout(() => {
//           navigate('/');
//         }, 200);
//       }
//     }
//     finally {
//       setloaderState(false);
//     }
//   }

//   const getAllAssignments = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllAssignmentsDataApi('','');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setAssignmentData(response?.data?.assignment)
//           // // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.msg);
//       }
//     }
//     catch (error) {
//       console.error(error);
//       if (error?.response?.data?.statusCode === 401) {
//         localStorage.removeItem('token');
//         setTimeout(() => {
//           navigate('/');
//         }, 200);
//       }
//     }
//     finally {
//       setloaderState(false);
//     }
//   }

//   const getAllNotices = async () => {
//     try {
//       setloaderState(true);
//       const searchByKey = ''
//       const pageNo = ''
//       const pageSize = ''
//       var response = await getAllNoticeDataApi('','','');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setNoticeData(response?.data?.notices)
//           // // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.msg);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Notice API - ', error)
//     }
//   }

//   const getAllHolidays = async () => {
//     try {
//       setloaderState(true);
//       const searchByKey = ''
//       const pageNo = ''
//       const pageSize = ''
//       var response = await getAllHolidayDataApi('','','');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setHolidayData(response?.data?.holidays)
//           // // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.msg);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Holiday API - ', error)
//     }
//   }

//   const updateMonth = (newMonth) => {
//     console.log('Parent received new month:', newMonth);
//     if (month !== newMonth) {
//       setMonth(newMonth); // Update state
//       setAttendanceMonthSearch(true)
//     }
//   };

//   // Function to update year
//   const updateYear = (newYear) => {
//     console.log('Parent received new year:', newYear);
//     if (year !== newYear) {
//       setYear(newYear);  // Update state
//       setAttendanceMonthSearch(true)
//     }
//   };

//   const getAllEvents = async () => {
//     try {
//       setloaderState(true);
//       const searchByKey = ''
//       const pageNo = ''
//       const pageSize = ''
//       var response = await getAllEventDataApi('','','');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setEventData(response?.data?.events)
//           // // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.msg);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Event API - ', error)
//     }
//   }


//   return (
//     <Container className='container-fluid pb-4'>
//       {
//         loaderState && (
//           <DataLoader />
//         )
//       }
//       <div className="row">
//         <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
//           <div className="row cards p-2 h-100">
//             <div className="col-12">
//               <div className="row">
//                 <div className="d-flex p-1">
//                   <div className="flex-grow-1 align-self-center">
//                     <p className='font14'>Fees Report Details</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="row pt-3">
//                 <div className="col-4">
//                   <div className="row">
//                     <div className="chartCard">
//                       <div className="d-flex pt-3 pb-3">
//                         <div className="flex-grow-1">
//                           <p>
//                             <Icon className='me-2' icon="ic:round-square" width="1.2em" height="1.2em" style={{ color: '#01CCBB' }} />
//                             <span className='font14'>Total Fee</span>
//                           </p>
//                         </div>
//                         <div className="align-self-center">
//                           <p className='font14'>70,500</p>
//                         </div>
//                       </div>
//                       <div className="d-flex pt-3 pb-3">
//                         <div className="flex-grow-1">
//                           <p>
//                             <Icon className='me-2' icon="ic:round-square" width="1.2em" height="1.2em" style={{ color: '#E95B6D' }} />
//                             <span className='font14'>Paid Fee</span>
//                           </p>
//                         </div>
//                         <div className="align-self-center">
//                           <p className='font14'>70,500</p>
//                         </div>
//                       </div>
//                       <div className="d-flex pt-3 pb-3">
//                         <div className="flex-grow-1">
//                           <p>
//                             <Icon className='me-2' icon="ic:round-square" width="1.2em" height="1.2em" style={{ color: '#FEBC00' }} />
//                             <span className='font14'>Total Fee</span>
//                           </p>
//                         </div>
//                         <div className="align-self-center">
//                           <p className='font14'>70,500</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="col-8">
//                   <BarChart width={100}/>
//                 </div>
//               </div>
//               <div className="row p-1">
//                 <p className='font14 p-0'>Last Paid Activity</p>
//                 <hr className='mt-1 mb-2' />
//                 <div className="d-flex justify-content-between p-0">
//                   <p className='font14 greyText'>October Month Fese</p>
//                   <p className='font14 greyText'>16 October 2023</p>
//                   <p className='font14 greenText fw-bolder'>10,250</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
//           <div className="row cards p-2 h-100">
//             <div className="col-12">
//               <div className="row">
//                 <p>Attendance</p>
//               </div>
//               <div className="row">
//                 <Calender className='calenderp0' DailyAttendanceData={DailyAttendanceData} month={month} year={year} monthUpdate={updateMonth} yearUpdate={updateYear} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
//           <div className="row cards p-2 h-100">
//             <div className="col-12">
//               <div className="row">
//                 <div className="d-flex p-1">
//                   <div className="flex-grow-1 align-self-center">
//                     <p className='font14'>Assignment Details</p>
//                   </div>
//                   <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Assignments'>View All</Link>
//                 </div>
//               </div>
//               <div className="row">
//                 {AssignmentData.length > 0
//                   ?
//                   AssignmentData.slice(0, 3).map((item) => (
//                   <div className="col-12 p-1" key={item.id}>
//                     <div className="timeTableCard p-2">
//                       <div className="row">
//                         <div className="col-4 align-self-center">
//                           <p className='greenText font16'>{item.title}</p>
//                         </div>
//                         <div className="col-4 align-self-center">
//                           <p className='font14'>{item.subjectName}</p>
//                         </div>
//                         <div className="col-4 align-self-center">
//                           <p className='font12'></p>
//                         </div>
//                       </div>
//                       <div className="row pt-1">
//                         <div className="col-4 align-self-center">
//                           <p className='font12 greyText'>Class - {item.sectionName}</p>
//                         </div>
//                         <div className="col-4 align-self-center">
//                           <p className='font12 greyText'>Start Date - {item.startDate}</p>
//                         </div>
//                         <div className="col-4 align-self-center">
//                           <p className='font12 greyText'>End Date - {item.endDate}</p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))
//               :
//                 <p className='text-danger font14'> No Data Found !!!</p>
//               }
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
//           <div className="row cards p-2 h-100">
//             <div className="col-12">
//               <div className="row">
//                 <div className="d-flex p-1">
//                   <div className="flex-grow-1 align-self-center">
//                     <p className='font14'>Notice Board</p>
//                   </div>
//                   <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Notice'>View All</Link>
//                 </div>
//               </div>
//               <div className="row p-1">
//                 {NoticeData.length > 0
//                   ?
//                   NoticeData.slice(0, 2).map((item) => (
//                       <>
//                         <hr className='mb-2' />
//                         <p className='font14 p-0'>{item.noticeTitle}</p>
//                         <p className='font14 p-0 greyText pt-2 pb-2'>{item.description}</p>
//                         <div className="d-flex p-2">
//                           <p className='p-0'>
//                             <Icon icon="fluent-mdl2:date-time-12" width="1.2em" height="1.2em" style={{ color: '#FF914D' }} />
//                             <span className='font14 ms-2 greyText'>Publish Date: {item.noticeDate}</span>
//                           </p>
//                           <p className='p-0 ms-4'>
//                             <Icon icon="mage:user-check" width="1.2em" height="1.2em" style={{ color: '#FF914D' }} />
//                             <span className='font14 ms-2 greyText'>Created By: Joe Black</span>
//                           </p>
//                         </div>
//                       </>
//                   ))
//                   :
//                   <p>No Data Found !!!</p>
//                 }
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
//           <div className="row cards p-2 h-100">
//             <div className="col-12">
//               <div className="row">
//                 <div className="d-flex p-1">
//                   <div className="flex-grow-1 align-self-center">
//                     <p className='font14'>Upcoming Events</p>
//                   </div>
//                   <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' to='/Event'>View All</Link>
//                 </div>
//               </div>
//               <div className="row">
//                 {EventData.slice(0,4).map((item) => (
//                   <div className="col-12 p-1" key={item.eventId}>
//                     <div className="eventCards">
//                       <div className="borderLeftOrange p-2">
//                         <div className="d-flex p-1">
//                           <div className="flex-fill">
//                             <p className='font14'>{item.eventName}</p>
//                           </div>
//                           <div className="flex-shrink">
//                             <p className="font14 text-end greyText">{item.startDate}</p>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6 col-12 ps-3 pe-3 pt-3">
//           <div className="row cards p-2 h-100">
//             <div className="col-12">
//               <div className="row">
//                 <div className="d-flex p-1">
//                   <div className="flex-grow-1 align-self-center">
//                     <p className='font14'>Upcoming Holiday</p>
//                   </div>
//                   <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Holiday'>View All</Link>
//                 </div>
//               </div>
//               <div className="row">
//                 {HolidayData.slice(0,6).map((item) => (
//                   <div className="col-4 p-2" key={item.holidayId}>
//                     <div className="holidayCard p-4">
//                       <p className='font16 text-center'>{item.holidayTitle}</p>
//                       <p className='greyText font14 text-center'>{item.holidayDate}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Toaster />
//     </Container>
//   )
// }

// export default DashboardPage


