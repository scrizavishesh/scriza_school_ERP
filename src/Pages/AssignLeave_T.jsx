import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import StateTable_1 from './StateTable_1';
import { TeacherAttendanceCheckInApi } from '../Utils/Apis'
import { TeacherAttendanceCheckOutApi } from '../Utils/Apis'
import { TeacherAttendanceTeacherGetAllApi } from '../Utils/Apis'
// import MyStopwatch from '../Pages/MyTime'
import HashLoader from './HashLoaderCom';
import { useNavigate } from 'react-router-dom';
import MyTime from '../Pages/MyTime_T';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react/dist/iconify.js';

// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 15px;

}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6 !important;
}
.label-color{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}

.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{
  height: 33px;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  line-height: 0px;
  color: #000;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}

.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

.view-details-background-color{
    background-color: var(--backgroundColor);
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .buttons-topss{
    margin-top: -35px;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .bg-color-pink{
    border: 1px dashed #EECEBE;
    background: #FFF9F6;
  }
  .my-non-clickable button{
    border-radius: 5px;
    border: 1px solid #ECEBF3;
    background: #FFF;
    color: #000;
  }
  .my-form-check-input123:checked {
    background-color: var( --greenTextColor);
    border-color: var( --greenTextColor);
}
.overflow-y {
  max-height: 300px; 
  overflow-y: auto; 
}
.my-own-outline-btn{
    border: 1px solid #008479;
    color: #008479;
}

.my-navlink-tabs a{
color: #000 !important;
}
.nav-link{
    color: #000 !important;
} 

.my-button112233{
        background-color: #008479 !important;
        color: #fff  !important;
        border-radius: 0;
        border: 1px solid #008479;
    }

    .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    background-color: #B50000;
    color: #fff;
    border-radius: 0%;
  }
.cancel-btn{
    color: #959494;
   border-color: #cdcdcd;
    --bs-btn-hover-bg: #fff;
    border-radius: 0%;
  }

  .my-btn.disabled, .my-btn:disabled, fieldset:disabled .btn {
    color: #fff ;
    pointer-events: none;
    background-color: #B50000;
    border-color: #cdcdcd;
    opacity: var(--bs-btn-disabled-opacity);
}
.my-form-check-input:checked{
  background-color: #B50000;
  border-color: #B50000;
} 

.progress-bar{
  width: 100% !important;
  height: 3px !important;
  border-radius: 10px !important;
  background-color: #FF914C;

}
.My-own-form-check-input:checked {
    background-color: #008479;
    border-color: #008479;
    box-shadow: none;
}
.my-btn12{
  border: 1px solid #aaa;
  padding: 5px 7px;
}
.pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li a {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: var(--font-size-14);
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #000;
    /* background-color: #f5f5f5;
    transition: background-color 0.3s; */
}
.pagination li a:hover {
    background-color: #317a77 !important;
    color: #fff !important;
}

.pagination li.active a {
    background-color: #317a77 !important;
    color: #fff;
    font-weight: bold;
}
.my-i-button{
  border: none;
  background: none;
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
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`;
// ## style css area end ####  

const AssignLeave = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false)
  const [forDelete2, setForDelete2] = useState(false)

  const [startWeekDate, setStartWeekDate] = useState('')
  const [endWeekDate, setEndWeekDate] = useState('')
  const [monthYear, setMonthYear] = useState('')

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [hide22, setHide22] = useState(false)
  const [show22, setShow22] = useState(true)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [showdelete12, setShowdelete12] = useState(true)
  const [hidedelete12, setHidedelete12] = useState(false)
  const [roleId, setRoleId] = useState()
  const [userId, setUserId] = useState()
  const [LeaveType, setLeaveType] = useState()
  const [LeaveNo, setLeaveNo] = useState()
  const [rolePermissionAllData, setRolePermissionAllData] = useState([])
  const [userAllData, setUserAllData] = useState([])
  const [attendanceTeacherData, setAttendanceTeacherData] = useState([])
  const [AssignAllData, setAssignAllData] = useState([])
  const [assignAllDataGetById, setAssignAllDataGetById] = useState()
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForDeleteType, setIdForDeleteType] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [searchKey, setSearchKey] = useState('')
  const [apiData, setApiData] = useState('')
  const [isChecked, setIsChecked] = useState(false);
  
  const [checkInOut, setCheckInOut] = useState(false)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); 
  };

  // Leave Get All Api   
  const MyLeaveGetAllApi = async (data) => {
    console.log('my week and month', data)
    setView(data);
    setLoader(true)
 
    const formData = new FormData()
    formData.append('fromDate', startWeekDate);
    formData.append('toDate', endWeekDate);
    formData.append('monthYear', monthYear);
    formData.append('apiData', data);

    try {
      const response = await TeacherAttendanceTeacherGetAllApi(formData,pageNo,pageSize);
      console.log('Attendance teacher get all data', response);
      if (response?.status === 200) {
        toast.success(response?.data?.message)
        setAttendanceTeacherData(response?.data?.staffAttendance)
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // -------------- Apis from other pages end----------- 

  // post api of check-in and check-out 
  const handleChange = async (event) => {
    const checked = event.target.checked;
    setIsChecked(checked);
    if (checked) {
      try {
        const response = await TeacherAttendanceCheckInApi();
        console.log('Check-in response', response);
        if (response?.status === 200) {
          toast.success(response?.data?.message)
          setLoader(false)
          setCheckInOut(true)

        }
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        const response = await TeacherAttendanceCheckOutApi();
        console.log('Check-out response', response);
        if (response?.status === 200) {
          toast.success(response?.data?.message)
          setLoader(false)
          setCheckInOut(false)
          MyLeaveGetAllApi()

        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  const handleForDelete = () => {
    MyHolidayDeleteApi(IdForDelete)
  }
  const handleForDelete2 = () => {
    MyHAssignLeaveTypeDeleteApi(IdForDeleteType)
  }

  const [view, setView] = useState('month');

  const [currentDate, setCurrentDate] = useState(new Date());

  const funct = (dateStr) => {
    const day = dateStr.slice(8, 10);
    const month = dateStr.slice(4, 7);
    const year = dateStr.slice(11, 15);
    return `${day} ${month} ${year}`
  }
  const dateStr = currentDate;
  const formattedDate = funct(dateStr.toString());
  const formatMonthYear = (date) => {
    const options = { year: 'numeric', month: 'short' };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date.setDate(date.getDate() - date.getDay()));
    const endOfWeek = new Date(date.setDate(date.getDate() - date.getDay() + 6));

    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    const start = new Intl.DateTimeFormat('en-US', options).format(startOfWeek);
    const end = new Intl.DateTimeFormat('en-US', options).format(endOfWeek);
    return `${start} - ${end}`;
  };

 
  useEffect(() => {
    // funct()
    if (roleId) {
      MyUserGetAllApi()
    }
    MyLeaveGetAllApi()

    if(currentDate){
      const dateValue = getWeekRange(new Date(currentDate));
      const [val1, val2] = dateValue.split('-');
      const formattedVal1 = val1.replace(/,/g, '');
      const formattedVal2 = val2.replace(/,/g, '');
      console.log('Statrt week date = ', formattedVal1)
      console.log('end wek date = ', formattedVal2)

      setStartWeekDate(formattedVal1);
      setEndWeekDate(formattedVal2)
    }
  }, [roleId, currentDate,pageNo])

  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="container-fluid main-body p-3">
        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>  
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Human Resource</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Attendance Report</Link></li>
              </ol>
            </nav>
          </div>
          <div className='calendar-header'>
            {view === 'month' ? (
              <div>
                <button className='me-2' style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0', }} onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>&lt;</button>
                <span>{formatMonthYear(currentDate)}</span>
                <button className='ms-2' style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0', }} onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>&gt;</button>
              </div>
            ) : (
              <div>
                <button className='me-2' style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0', }} onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 7)))}>&lt;</button>
                <span>{getWeekRange(new Date(currentDate))}</span>
                <button className='ms-2' style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: '0', }} onClick={() => setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 7)))}>&gt;</button>
              </div>
            )}
          </div>
          <div className='d-flex g-1 for-media-query'>
            <div className='pe-2'  >
              <button type="button" className="btn my-btn12 heading-12  mt-1" data-bs-dismiss="offcanvas" onClick={() => MyLeaveGetAllApi('week')} >Week View</button>
            </div>
            <div className='pe-2'>
              <button type="button" className="btn my-btn12 heading-12  mt-1" data-bs-dismiss="offcanvas" onClick={() => MyLeaveGetAllApi('month')}>Month View</button>
            </div>
            <div class="form-check form-switch pe-2 pt-1">
              <input style={{ width: '60px', height: '25px' }} class="form-check-input My-own-form-check-input  " checked={isChecked} onChange={handleChange} placeholder='hello' type="checkbox" role="switch" id="flexSwitchCheckChecked" />
            </div>
            <div className='me-2'>
            <p className=' pe-2' >
            <MyTime data={checkInOut} />
            </p>
            </div>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-14px' }}>Attendance List</h5>
        <div className="main-content-conatainer pt-1 ">
          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                  <th className=' pe-0' style={{ width: '15%' }} >Date</th>
                  <th style={{ width: '8%' }}>Check In</th>
                  <th style={{ width: '40%' }}></th>
                  <th style={{ width: '15%' }}>Check Out</th>
                  <th style={{ width: '15%' }}>Total Hours</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor greyText'>
                {
                  attendanceTeacherData?.map((item, index) => (
                    <tr className='heading-14' key={index}>
                      <td className=' greyText pe-0'>{item.date}</td>
                      <td className=' greyText pe-0'>{item.checkIn ? item.checkIn : 'Nt-chkng' } AM</td>
                      <td className=' greyText ps-3'>
                        <div className='pt-1 my-graph-length' >
                          <div class="progress my-progress-bar  " style={{ width: `${item.hourPercent !== null ? `${item.hourPercent}%` : '0%' }` }} role="progressbar" aria-label="Animated striped example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar  progress-bar-striped progress-bar-animated" ></div>
                          </div>
                        </div>
                      </td>
                      <td className=' greyText pe-0'>{item.checkOut ? item.checkOut : 'Nt-ChkOut'} PM</td>
                      <td className=' greyText pe-0'>{`${item.totalHour?.hours ? item.totalHour?.hours : 0 } : ${item.totalHour?.minutes ? item.totalHour?.minutes : 0} : ${item.totalHour?.seconds ? item.totalHour?.seconds : 0} `}</td>
                    </tr>
                  ))}
              </tbody>
              <Toaster />
            </table>
            <div className="d-flex" style={{ marginBottom: '10px' }}>
              <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
              <div className="ms-auto">
                <ReactPaginate
                  previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                  nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                  breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                  onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                />
              </div>
            </div>
          </div>
        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas added start ########  */}

        <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop101" aria-labelledby="staticBackdropLabel">
          {
            show && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Create Leave Type</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />
                <div class="offcanvas-body pt-0">
                  <div className="input " >
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-16">Role</label>
                      <select class="form-select   form-focus  label-color" onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example">
                        <option value="">--Choose--</option>
                        {
                          rolePermissionAllData.map(item => (
                            <option value={item.roleId}>{item.roleName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-14">User Name</label>
                      <select class="form-select   form-focus  label-color" onChange={(e) => setUserId(e.target.value)} aria-label="Default select example">
                        <option value="">--Choose--</option>
                        {
                          userAllData.map(item => (
                            <option key={item.id} value={item.id}>{item.staffName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-1  ">
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Leave Type</label>
                      <select class="form-select   form-focus  label-color" onChange={(e) => setLeaveType(e.target.value)} aria-label="Default select example">
                        <option value="">--Choose--</option>
                        {/* {
                          leaveTypeAllData.map(item => (
                            <option key={item.id} value={item.leaveType}>{item.leaveType}</option>
                          ))
                        } */}
                      </select>
                    </div>
                    <div className="mb-3" >
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Leave Count</label>
                      <input type="email" className="form-control form-focus label-color  heading-14" onChange={(e) => setLeaveNo(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Select Leave Count" />
                      {/* {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>} */}
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyAssignLeavePostApi()}>Submit</button>
                      <button type="button" className="btn btn-outline-success">Cancel</button>
                      {/* <Toaster /> */}
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {
            hide && (
              <>
                <div className="offcanvas-header d-block for-my-display">
                  <div className="offcanvas-header p-0 ">
                    <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                    <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                  </div>
                  <hr className='' />
                  <div className="delete-section mt-5">
                    <div className="bg-container">
                      <div className="img-container22">
                        <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                          <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                      </div>
                      <div className="content mt-5">
                        <p className='heading-20'>Successful Update</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Updated</p>
                      </div>
                      <div className='button-position'  >
                        <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>

        <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop202" aria-labelledby="staticBackdropLabel">
          {
            show22 && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel"> Edit Create Leave Type</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Leave Type</label>
                      <input type="email" className="form-control form-focus label-color  heading-14" value={''} onChange={(e) => setLeaveType(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Select Leave Type" />
                      {/* {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>} */}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Leave No</label>
                      <input type="email" className="form-control form-focus label-color  heading-14" value={''} onChange={(e) => setLeaveType(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Select Leave No" />
                      {/* {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>} */}
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyLeavePutApi(IdForUpdate)}>Update</button>
                      <button type="button" className="btn btn-outline-success">Cancel</button>
                      {/* <Toaster /> */}
                    </div>
                  </div>
                </div>
              </>
            )
          }
          {
            hide22 && (
              <>
                <div className="offcanvas-header d-block for-my-display">
                  <div className="offcanvas-header p-0 ">
                    <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                    <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                  </div>
                  <hr className='' />
                  <div className="delete-section mt-5">
                    <div className="bg-container">
                      <div className="img-container22">
                        <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                          <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                        {/* <img src="./images/XMLID_1_.png" alt="" /> */}
                      </div>
                      <div className="content mt-5">
                        <p className='heading-20'>Successful Update</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Updated</p>
                      </div>
                      <div className='button-position'  >
                        <button type="button" className="btn btn-outline-primary button112233 mt-4 mb my-button112233 " data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          }
        </div>

        {/* ################ offcanvas delete start #############  */}

        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel">

          {
            showdelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>

                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input my-form-check-input" onClick={() => setForDelete2(true)} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn button00" disabled={forDelete2 ? false : true} onClick={handleForDelete} >Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            )
          }
          {/* ############## After click ##############  */}

          {
            hidedelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                </div>
                <hr className='' />
                <div className="delete-section mt-5">
                  <div className="bg-container">
                    <div className="img-container22">
                      <img src="./images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Delete</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                    </div>

                  </div>
                </div>
              </div>

            )
          }
        </div>
        {/* ################ offcanvas delete end #############  */}


        {/* ################ offcanvas delete TYPE  start #############  */}

        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight2233" aria-labelledby="offcanvasRightLabel">

          {
            showdelete12 && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>

                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input my-form-check-input" onClick={() => setForDelete2(true)} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn my-btn button00" disabled={forDelete2 ? false : true} onClick={handleForDelete2} >Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            )
          }
          {/* ############## After click ##############  */}

          {
            hidedelete12 && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                </div>
                <hr className='' />
                <div className="delete-section mt-5">
                  <div className="bg-container">
                    <div className="img-container22">
                      <img src="./images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Delete</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                    </div>

                  </div>
                </div>
              </div>

            )
          }
        </div>
        {/* ################ offcanvas delete end #############  */}



      </div>
    </Container>
  )
}

export default AssignLeave
