import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import LineChart from '../Charts/LineChart';
import DataLoader from '../Layouts/Loader';
import { RequestGetApi, getDashDataApi } from '../Utils/Apis';
import { Icon } from '@iconify/react';
import SchoolDashboard from './SchoolDashboard';
import PackageDashboard from './PackageDashboard';

const Container = styled.div`
  height: auto;
  overflow-y: auto;
  -ms-overflow-style: none;

  .table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  ::-webkit-scrollbar{
    display: none !important;
  }

  .heightt{
    height: 100% !important;
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

  .bgOrange{
    width: fit-content;
    background-color: var(--activeOrangeBorder);
  }


  @media screen and (max-width: 991px) and (min-width: 0px) {
    .paddingZeroAtSmall {
      padding: 0 !important;
    }
  }


`;


const SuperAdminDashboard = () => {

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('loggedInUserRole');

  const navigate = useNavigate();

  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [DashData, setDashData] = useState([]);
  const [AllRequest, setAllRequest] = useState([]);

  useEffect(() => {
    if (role === 'SUPERADMIN') {
      getDashData();
      getAllRequest();
    }
    
  }, [token])


  const getDashData = async () => {
    try {
      setloaderState(true);
      var response = await getDashDataApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setDashData(response?.data?.totalData);
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const getAllRequest = async () => {
    try {
      setloaderState(true);
      const search = '';
      const page = '';
      const size = '';
      const startDate = '';
      const endDate = '';
      var response = await RequestGetApi(search, page, size, startDate, endDate);
      // console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllRequest(response?.data?.requests);
          setloaderState(false);
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
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
        <div className="container-fluid ps-4 pe-4 pt-2 pb-2">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-sm-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Schools</h2></div>
                    <div className="flex-shrink-1"><Icon icon="uil:book-open" width="1.5em" height="1.5em" color='#008479' /></div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-2">
                    <div className="w-100"><h1 className='orangeText'>{DashData.totalSchool}</h1></div>
                    <div className="flex-shrink-1"><Link to='/allSchoolsPage'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-sm-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Features</h2></div>
                    <div className="flex-shrink-1"><Icon icon="mage:dashboard-2" width="1.5em" height="1.5em" color='#008479' /></div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-2">
                    <div className="w-100"><h1 className='orangeText'>{DashData.totalAddOns}</h1></div>
                    <div className="flex-shrink-1"><Link to='/addons'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-sm-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Subscriptions</h2></div>
                    <div className="flex-shrink-1">
                      <svg width="24" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.8732 5.53529C9.87343 6.61575 9.87793 7.69633 9.87197 8.77679C9.86735 9.61024 9.52792 9.96698 8.72323 9.96915C6.53043 9.97495 4.33762 9.97518 2.14481 9.96881C1.39504 9.96664 1.01667 9.61628 1.01149 8.86592C0.996189 6.61029 0.995851 4.35443 1.01239 2.0988C1.01757 1.39398 1.40697 1.01458 2.11319 1.01037C4.34336 0.99694 6.57375 0.995576 8.80392 1.01208C9.51318 1.01732 9.86364 1.40331 9.87016 2.12339C9.88063 3.26043 9.87309 4.39792 9.8732 5.53529ZM9.08596 5.45925C9.08596 4.43582 9.06896 3.41204 9.09406 2.38918C9.10464 1.9572 8.98737 1.78486 8.53168 1.78919C6.47066 1.80865 4.40931 1.80513 2.34818 1.79124C1.9446 1.78851 1.77994 1.90917 1.78321 2.3408C1.79896 4.44436 1.79649 6.54814 1.78478 8.65181C1.78265 9.03689 1.90025 9.18555 2.29978 9.18259C4.39839 9.16699 6.49711 9.16586 8.59572 9.18316C9.00999 9.18657 9.09834 9.01754 9.09215 8.64304C9.07437 7.58205 9.08596 6.52059 9.08596 5.45925Z" fill="#008479" stroke="#008479" strokeWidth="1" />
                        <path d="M5.48409 14.029C6.55236 14.029 7.62074 14.0249 8.689 14.0303C9.51384 14.0346 9.86835 14.3763 9.87071 15.1889C9.8769 17.4067 9.87724 19.6246 9.87038 21.8424C9.86801 22.6204 9.51013 22.9875 8.72513 22.9915C6.53232 23.0026 4.33952 23.0033 2.14671 22.9909C1.38355 22.9866 1.01261 22.6039 1.00867 21.8215C0.997412 19.6036 0.996511 17.3858 1.00957 15.1679C1.01418 14.3833 1.38512 14.0358 2.16697 14.0308C3.27249 14.0239 4.37835 14.029 5.48409 14.029ZM9.08516 18.4867C9.08516 17.4254 9.07795 16.3641 9.08955 15.3028C9.09303 14.9814 9.01639 14.8175 8.65411 14.8194C6.51803 14.831 4.38183 14.8304 2.24564 14.8197C1.90035 14.818 1.78544 14.9546 1.78646 15.2886C1.79343 17.4302 1.79512 19.5719 1.78511 21.7133C1.78331 22.0875 1.93321 22.2083 2.28863 22.2067C4.38724 22.1972 6.48607 22.1946 8.58467 22.2085C8.98544 22.2111 9.09855 22.0545 9.0918 21.6704C9.07312 20.6096 9.08527 19.5481 9.08516 18.4867Z" fill="#008479" stroke="#008479" strokeWidth="1" />
                        <path d="M11.8867 3.51653C11.8867 3.26645 11.8867 3.06019 11.8867 2.80658C15.5837 2.80658 19.2782 2.80658 23.0008 2.80658C23.0008 3.03742 23.0008 3.25723 23.0008 3.51653C19.3107 3.51653 15.6299 3.51653 11.8867 3.51653Z" fill="#008479" stroke="#008479" strokeWidth="1" />
                        <path d="M11.8906 16.524C11.8906 16.2643 11.8906 16.0437 11.8906 15.7906C15.592 15.7906 19.2704 15.7906 22.9886 15.7906C22.9886 16.0262 22.9886 16.2584 22.9886 16.524C19.3055 16.524 15.6266 16.524 11.8906 16.524Z" fill="#008479" stroke="#008479" strokeWidth="1" />
                        <path d="M19.0614 7.48438C19.0614 7.73582 19.0614 7.95677 19.0614 8.20969C16.6681 8.20969 14.297 8.20969 11.8965 8.20969C11.8965 7.96644 11.8965 7.74561 11.8965 7.48438C14.2619 7.48438 16.6338 7.48438 19.0614 7.48438Z" fill="#008479" stroke="#008479" strokeWidth="1" />
                        <path d="M11.8965 21.2016C11.8965 20.9478 11.8965 20.7288 11.8965 20.4771C14.292 20.4771 16.6588 20.4771 19.0551 20.4771C19.0551 20.7237 19.0551 20.9424 19.0551 21.2016C16.6849 21.2016 14.3176 21.2016 11.8965 21.2016Z" fill="#008479" stroke="#008479" strokeWidth="1" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-2">
                    <div className="w-100"><h1 className='orangeText'>{DashData.totalSubscription}</h1></div>
                    <div className="flex-shrink-1"><Link to='/subscriptionPage'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 col-12 pe-lg-3 pe-sm-4 pt-2">
              <div className="row bg-white greyborders p-2 cardradius pt-3 pb-3">
                <div className="row pe-0">
                  <div className="d-flex pe-0">
                    <div className="w-100 d-flex align-self-center"><h2>Packages Details</h2></div>
                    <div className="flex-shrink-1">
                      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.6797 28.2409C8.83891 28.2409 5.35076 26.0661 3.64845 22.6452C1.48957 20.729 0.254028 17.9911 0.254028 15.1035C0.254028 9.53545 4.76795 5.02153 10.3356 5.02153C14.1602 5.02153 17.6487 7.1857 19.3567 10.6051C21.5261 12.5243 22.7613 15.2585 22.7613 18.1589C22.7613 23.7266 18.2474 28.2409 12.6797 28.2409ZM15.771 5.30348C14.7554 5.30348 14.7554 3.75916 15.771 3.75916H22.7496C23.7651 3.75916 23.7651 5.30348 22.7496 5.30348H15.771ZM21.6728 25.7327C20.6572 25.7327 20.6572 24.1884 21.6728 24.1884H28.6514C29.6669 24.1884 29.6669 25.7327 28.6514 25.7327H21.6728ZM24.0059 18.9231C22.9903 18.9231 22.9903 17.3788 24.0059 17.3788H30.9845C32 17.3788 32 18.9231 30.9845 18.9231H24.0059ZM21.6728 12.1135C20.6572 12.1135 20.6572 10.5692 21.6728 10.5692H28.6514C29.6669 10.5692 29.6669 12.1135 28.6514 12.1135H21.6728ZM2.6155 18.7602C2.60378 18.5614 2.59773 18.3607 2.59773 18.1589C2.59773 12.5908 7.11166 8.07692 12.6797 8.07692C13.7898 8.07692 14.8579 8.25645 15.8568 8.58792C14.3102 7.27641 12.3683 6.56585 10.3356 6.56585C5.62062 6.56585 1.79798 10.3881 1.79798 15.1035C1.79798 16.3878 2.07237 17.598 2.6155 18.7602ZM17.6491 18.9311C16.6335 18.9311 16.6335 17.3867 17.6491 17.3867H19.046C20.0616 17.3867 20.0616 18.9311 19.046 18.9311H17.6491ZM6.31304 18.9311C5.29747 18.9311 5.29747 17.3867 6.31304 17.3867H7.70996C8.72553 17.3867 8.72553 18.9311 7.70996 18.9311H6.31304ZM11.9075 11.6834C11.9075 10.6678 13.4515 10.6678 13.4515 11.6834V12.3301C14.952 12.6868 16.025 14.0312 16.025 15.5858C16.025 16.6013 14.4807 16.6013 14.4807 15.5858C14.4807 14.5887 13.6764 13.7841 12.6793 13.7841C11.6827 13.7841 10.8784 14.5891 10.8784 15.5858C10.8784 16.5805 11.6849 17.3871 12.6793 17.3871C14.5268 17.3871 16.025 18.8849 16.025 20.7324C16.025 22.2869 14.952 23.6313 13.4515 23.9881V24.634C13.4515 25.6496 11.9075 25.6496 11.9075 24.634V23.9885C10.4108 23.6351 9.33404 22.2854 9.33404 20.7324C9.33404 19.7168 10.8784 19.7168 10.8784 20.7324C10.8784 21.7162 11.6868 22.547 12.6793 22.5337C13.6722 22.547 14.4807 21.7162 14.4807 20.7324C14.4807 19.7376 13.6741 18.9311 12.6793 18.9311C10.8323 18.9311 9.33404 17.4332 9.33404 15.5858C9.33404 14.0331 10.4108 12.6831 11.9075 12.3297V11.6834ZM12.6797 26.6965C17.3947 26.6965 21.2173 22.8739 21.2173 18.1589C21.2173 13.4435 17.3947 9.62125 12.6797 9.62125C7.96433 9.62125 4.14168 13.4435 4.14168 18.1589C4.14168 22.8743 7.96433 26.6965 12.6797 26.6965Z" fill="#008479" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="row pe-0 pt-2">
                  <div className="d-flex pe-2">
                    <div className="w-100"><h1 className='orangeText'>{DashData.totalPackage}</h1></div>
                    <div className="flex-shrink-1"><Link to='/allPackagesPage'><img src="./images/Vector.svg" alt="" height={20} /></Link></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 gap-lg-0 gap-3 ">
            <div className="col-lg-6 col-md-12 col-sm-12 ps-lg-0 paddingZeroAtSmall">
              <div className="card p-2 h-100">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="d-flex pb-2">
                    <div className="flex-fill"><h2>School Details</h2></div>
                    <div className="flex-fill text-end"><Link className='greenText' to='/allSchoolsPage'><h2>View All</h2></Link></div>
                  </div>
                </div>
                <div className="overflow-scroll">
                  <SchoolDashboard/>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 ps-lg-0 pe-lg-0 paddingZeroAtSmall heightt">
              <div className="card p-2 heightt">
                <div className="card-header bg-white ps-1 pe-1 heightt">
                  <div className="d-flex pb-2 heightt">
                    <div className="flex-fill"><h2>Earning Details</h2></div>
                  </div>
                </div>
                <div className="overflow-scroll heightt pt-3 pb-1">
                  <LineChart />
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-3 gap-lg-0 gap-3 ">
            <div className="col-lg-6 col-md-12 col-sm-12 ps-lg-0 paddingZeroAtSmall">
              <div className="card p-2 h-100">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="d-flex pb-2">
                    <div className="flex-fill"><h2>Package</h2></div>
                    <div className="flex-fill text-end"><Link className='greenText' to='/allPackagesPage'><h2>View All</h2></Link></div>
                  </div>
                </div>
                <div className="overflow-scroll">
                  <PackageDashboard/>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 pe-lg-0 ps-lg-0 paddingZeroAtSmall">
              <div className="card p-2 h-100">
                <div className="card-header bg-white ps-1 pe-1">
                  <div className="d-flex pb-2">
                    <div className="flex-fill"><h2>Latest Request</h2></div>
                    <div className="flex-fill text-end"><Link className='greenText' to='/requestPage'><h2>View All</h2></Link></div>
                  </div>
                </div>
                {AllRequest.length > 0 ?
                  AllRequest.slice(0, 1).map((item, index) => (
                    <div key={index}>
                      <div className="card greyTopborders greyBottomborders border-0 p-1">
                        <div className="d-flex pt-2">
                          <div className="flex-fill p-2">
                            <h2 className='text-decoration-underline'>{item?.reqMsg}</h2>
                          </div>
                          <div className="flex-shrink text-end">
                            {/* <h2 className='p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none'>{item?.reqDate}</h2> */}
                            <h2 className='p-1 ps-2 pe-2 text-white bgOrange rounded-4 text-decoration-none'>
                              {new Date(item?.reqDate).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                              })}
                            </h2>
                          </div>
                        </div>
                        <div className="row m-2 pe-0 latestreqDiv">
                          <h3 className='greyText p-0'>{item?.reqDesc}</h3>
                        </div>
                      </div>
                      <div className="card-footer bg-white p-0 pt-2">
                        <h5 className='greyText fst-italic'>{item?.userName} - {item?.reqDate.split('T')[0]}</h5>
                      </div>
                    </div>
                  ))
                  : <p className='p-2 font12 text-danger'>No Data Found !!!</p>
                }
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default SuperAdminDashboard
