import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import BarChart from '../Charts/BarChart';
import DataLoader from '../Layouts/Loader';
import { Icon } from '@iconify/react';
import toast, { Toaster } from 'react-hot-toast';
import { getAllEventsApi, getAllHolidayDataApi, getAllNoticeApi, getAdminDashDataApi } from '../Utils/Apis';

const Container = styled.div`
  overflow-y: auto;
  -ms-overflow-style: none;

  ::-webkit-scrollbar{
    display: none !important;
  }
  
  .holidayCard{
    border : 1px solid var(--timeTableCardBorder);
    background-image: url(./images/holidayBg.svg);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: var(--borderRadius5px);
  }

  .card{
    border-radius: 10px;
    border: 1px solid var(--greyborderColor)
  }

  .latestreqDiv h3{
    line-height: 26px !important;
  }

  .latestreqDiv{
    max-height: 5em !important; 
    overflow-y: auto;
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .borderOrange{
    border: 1px solid var(--activeOrangeBorder) !important;
  }

  .bgOrange{
    width: fit-content;
    background-color: var(--activeOrangeBorder);
  }

  .eventBorder{
    border : 1px solid var(--greyborderColor) !important;
  }

  .eventBg{
    background-color : var(--dashEventBg) !important;
  }

  .border-left-orange{
    border-left: 5px solid var(--activeOrangeBorder) !important;
  }

`;

const AdminDashboard = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [DashData, setDashData] = useState();
  const [EventData, setEventData] = useState([]);
  const [NoticeData, setNoticeData] = useState([]);
  const [HolidayData, setHolidayData] = useState([]);
  const [searchByKey, setSearchByKey] = useState('');
  const [graphKeyData, setGraphKeyData] = useState('MONTH');

  useEffect(() => {
    getAllNoticeData();
    getAllEventData();
    getDashboardData()
    getAllHolidays();
  }, [token])

  const getDashboardData = async () => {
    try {
      setloaderState(true);
      var response = await getAdminDashDataApi();
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setDashData(response?.data?.totalData)
        }
        else {
          toast.error(response.data.message);
        }
      }
      else {
        toast.error(response.data.message);
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
      var response = await getAllHolidayDataApi('', '', '');
      console.log(response)
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
  const getAllNoticeData = async () => {
    try {
      setloaderState(true);
      var response = await getAllNoticeApi(searchByKey);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setNoticeData(response?.data?.notices);
        }
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        // localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
    }
  }

  const getAllEventData = async () => {
    try {
      setloaderState(true);
      var response = await getAllEventsApi(searchByKey);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setEventData(response?.data?.events);
          // toast.success(response.data.message);
        }
      }
      else {
        // // toast.error(response.data.message);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        // localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 2000);
      }
    }
  }



  return (
    <>
      <Container>
        {
          loaderState && (
            <DataLoader />
          )
        }
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Students</h2></div>
                    <div className="flex-shrink-1"><Icon icon="ph:graduation-cap" width="1.6em" height="1.6em" style={{ color: '#008479' }} /></div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-0">
                    <div className="w-100"><h1 className='orangeText'>{DashData?.totalStudent}</h1></div>
                    {/* <div className="w-100"><h1 className='orangeText'>{DashData.totalSchool}</h1></div> */}
                    <div className="flex-shrink-1 p-1"><Link to='/allStudent'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Vehicles</h2></div>
                    <div className="flex-shrink-1"><Icon icon="ph:chalkboard-teacher" width="1.6em" height="1.6em" style={{ color: '#008479' }} /></div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-0">
                    <div className="w-100"><h1 className='orangeText'>{DashData?.totalVehicle}</h1></div>
                    {/* <div className="w-100"><h1 className='orangeText'>{DashData.totalSchool}</h1></div> */}
                    <div className="flex-shrink-1 p-1"><Link to='/teacher'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Drivers</h2></div>
                    <div className="flex-shrink-1"><Icon icon="ri:parent-line" width="1.6em" height="1.6em" style={{ color: '#008479' }} /></div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-0">
                    <div className="w-100"><h1 className='orangeText'>{DashData?.totalDriver}</h1></div>
                    {/* <div className="w-100"><h1 className='orangeText'>{DashData.totalSchool}</h1></div> */}
                    <div className="flex-shrink-1 p-1"><Link to='/allStudent'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Total Staffs</h2></div>
                    <div className="flex-shrink-1"><Icon icon="f7:person-3" width="1.6em" height="1.6em" style={{ color: '#008479' }} /></div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-0">
                    <div className="w-100"><h1 className='orangeText'>{DashData?.totalStaff}</h1></div>
                    {/* <div className="w-100"><h1 className='orangeText'>{DashData.totalSchool}</h1></div> */}
                    <div className="flex-shrink-1 p-1"><Link to='/other_staff'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
              <div className="card p-2">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="row p-1">
                    <div className="col-7 align-self-center"><h2>Todays Attendance - <span className='font14 orangeText fontWeight900'>1250</span></h2></div>
                    <div className="col-5">
                      <div className="d-flex gap-2 justify-content-end">
                        <div className="dropdown">
                          <ul className="dropdown-menu">
                            <li>
                              <button className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Today <Icon icon="fe:drop-down" width="1.3em" height="1.3em" style={{ color: '#000' }} />
                              </button>
                            </li>
                            <li>
                              <button className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Week <Icon icon="fe:drop-down" width="1.3em" height="1.3em" style={{ color: '#000' }} />
                              </button>
                            </li>
                            <li>
                              <button className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Month <Icon icon="fe:drop-down" width="1.3em" height="1.3em" style={{ color: '#000' }} />
                              </button>
                            </li>
                            <li>
                              <button className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Year <Icon icon="fe:drop-down" width="1.3em" height="1.3em" style={{ color: '#000' }} />
                              </button>
                            </li>
                            {/* <a className="dropdown-item font12" href="#">Week</a>
                            <li><a className="dropdown-item font12" href="#">Month</a></li>
                            <li><a className="dropdown-item font12" href="#">Year</a></li> */}
                          </ul>
                        </div>
                        <Link className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' to='/attendancePage'>Go to Attendance</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-scroll pt-3 pb-1">
                  <BarChart graphKey={graphKeyData} />
                </div>
              </div>
            </div>
            {/* <div className="col-lg-6 col-md-12 col-sm-12 ps-0 pe-0">
              <div className="card p-2">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="row p-1">
                    <div className="col-3 align-self-center"><h2>Student Fee</h2></div>
                    <div className="col-7">
                      <div className="row">
                        <div className="col-6 align-self-center">
                          <span className='p-1 font12'><Icon icon="material-symbols-light:square" width="1.5em" height="1.4em" style={{ color: '#B57FBE' }} />Total Fees: <span className='font12 fontWeight900'>1,20,145</span></span>
                        </div>
                        <div className="col-6 align-self-center">
                          <span className='p-1 font12'><Icon icon="material-symbols-light:square" width="1.5em" height="1.7em" style={{ color: '#E4867F' }} />Due Fees: <span className='font12 fontWeight900'>1,20,145</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="col-2">
                      <div className="dropdown">
                        <Link className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' type="button" data-bs-toggle="dropdown" aria-expanded="false">
                          Week <Icon icon="fe:drop-down" width="1.3em" height="1.3em" style={{ color: '#000' }} />
                        </Link>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item font12" href="#">Week</a></li>
                          <li><a className="dropdown-item font12" href="#">Month</a></li>
                          <li><a className="dropdown-item font12" href="#">Year</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="overflow-scroll pt-3 pb-1">
                  <LineChart />
                </div>
              </div>
            </div> */}
            <div className="col-lg-6 col-md-12 col-sm-12 h-100">
              {/* <div className="row card p-2 h-100 p-2 pb-3">
                <div className="col-12">
                  <div className="row">
                    <div className="d-flex p-1">
                      <div className="flex-grow-1 align-self-center">
                        <p className='font14'>Upcoming Holiday</p>
                      </div>
                      <Link className='p-1 ps-2 pe-2 rounded-2 borderOrange text-black text-decoration-none font12' type="button" to='/Holiday'>View All</Link>
                    </div>
                  </div>
                  
                </div>
              </div> */}
              <div className="row card p-2 h-100 p-2 pb-3">
                {/* <div className="card p-2 pb-3"> */}
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="d-flex p-1">
                    <div className="flex-fill"><h2>Upcoming Holidays</h2></div>
                    <div className="flex-fill text-end">
                      <Link className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' to='/holiday'>
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="row">
                  {HolidayData.slice(0, 9).map((item) => (
                    <div className="col-4 p-1" key={item.holidayId}>
                      <div className="holidayCard p-4">
                        <p className='font16 text-center'>{item.holidayTitle}</p>
                        <p className='greyText font14 text-center'>{item.holidayDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-lg-6 col-md-12 col-sm-12 ps-0">
              <div className="card p-2 pb-1">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="d-flex p-1">
                    <div className="flex-fill"><h2>Notice Board</h2></div>
                    <div className="flex-fill text-end">
                      <Link className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' to='/notice'>
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  {NoticeData.length > 0 ?
                    NoticeData.slice(0, 2).map((item, index) => (
                      <div className="pt-2" key={index}>
                        <h2 className='p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none'>{item?.noticeDate}</h2>
                        <h2 className='border-bottom border-1 pt-3 pb-3 text-grey'>{item?.description}</h2>
                        <h5 className='greyText pt-3'>{item?.noticeTitle} | {item?.noticeTime.slice(0, 5)}</h5>
                      </div>
                    ))
                    :
                    <div className='font12 text-danger'>No Data Found !!</div>
                  }
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 ps-0 pe-0">
              <div className="card p-2 h-100">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="d-flex p-1">
                    <div className="flex-fill"><h2>Upcoming Events</h2></div>
                    <div className="flex-fill text-end">
                      <Link className='p-1 rounded-2 borderOrange text-black text-decoration-none font12' to='/event'>
                        View All
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="card greyTopborders greyBottomborders border-0 p-1">
                  {EventData.length > 0 ?
                    EventData.slice(0, 5).map((item, index) => (
                      <div className="p-0 mt-1 mb-1 eventBorder eventBg" key={index}>
                        <div className="d-flex p-2 border-left-orange">
                          <div className="flex-fill"><h2 className='font14'>{item?.eventName}</h2></div>
                          <div className="flex-shrink text-end greyText font14"><h2>{item?.endDate}</h2></div>
                        </div>
                      </div>
                    ))
                    :
                    <div className='p-1 font12 text-danger'>No Data Found !!</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>

        <Toaster />
      </Container>
    </>
  )
}

export default AdminDashboard
