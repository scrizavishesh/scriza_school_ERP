import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { StaffAttendanceGetAllApi } from '../Utils/Apis'
import { AttendanceCSV } from '../Utils/Apis'
import { RolePermissionGetApi } from '../Utils/Apis'
import { TakeAttendancePostApi } from '../Utils/Apis'
import { CSVLink } from 'react-csv';
import { SatffAttendancePutApi } from '../Utils/Apis'
import { AttendanceGetAllBymonth } from '../Utils/Apis'

import toast, { Toaster } from 'react-hot-toast';

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
  background-color: #F2F3F6;
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
  width: 25%;
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
  max-height: 300px; /* Set the maximum height as needed */
  overflow-y: auto; /* Add vertical scrollbar if necessary */
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

@media only screen and (max-width: 1060px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 950px) {
    .heading-responsive{
        margin-top: 5px !important;
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

const TakeAttendance = () => {

  const [hide, setHide] = useState(true)
  const [show, setShow] = useState(true)
  const [hide2, setHide2] = useState(true)
  const [show2, setShow2] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [loader, setLoader] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [attendance, setAttendance] = useState(false)
  const [present, setPresent] = useState([])
  const [absent, setAbsent] = useState([])
  const [attendanceDataByMonth, setAttendanceDataByMonth] = useState([])
  console.log('my month data in staff', attendanceDataByMonth)
  console.log('present', present)
  console.log('absent', absent)

  const [takeAttenSearhDate, setTakeAttenSearhDate] = useState([])
  const [search, setSearch] = useState('')
  const [rolePermisAllData, setRolePermisAllData] = useState([])
  const [month, setMonth] = useState()
  const [year, setYear] = useState()
  const [date, setDate] = useState()
  const [roleid, setRoleId] = useState()

  const UpdateHandleBtn = (e) => {
    if (show === true) {
      setShow(false)
    } else {
      setShow(true)
    }
  }

  const UpdateHandleBtn2 = (e) => {
    if (hide2 === true) {
      setHide2(false)
    } else {
      setHide2(true)
    }
  }

  useEffect(() => {
    MyRolPermisGetAllApi()
    MyTakeAttendanceGetApi()
    // Download_Slip()
  }, [roleid])

  // CSV 
  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await AttendanceCSV(roleid, month, year);
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCsvData(rows);
        // setTableData(rows.slice(1));
      }
    } catch (err) {
      console.log(err);
    }
  };


  // Role permission Get All Api  from role permission page  
  const MyRolPermisGetAllApi = async () => {
    try {
      const response = await RolePermissionGetApi();
      console.log('My role permission get all data12', response)

      if (response?.status === 200) {
        // toast.success(response?.data?.msg)
        setRolePermisAllData(response?.data?.roles)
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Take attendance get all aapi by search-date
  const MyTakeAttendanceGetApi = async () => {
    try {
      const response = await StaffAttendanceGetAllApi(date, roleid);
      console.log('my take attendance by search-date ', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setTakeAttenSearhDate(response?.data?.attendance)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // *****************************
  const handleRadioChange = (index, value, id) => {
    const updatedData = takeAttenSearhDate.map((item, i) =>
      i === index ? { ...item, isPresent: value } : item
    );

    setTakeAttenSearhDate(updatedData);
    setAttendance(value)

    if (value === true) {
      let presentValue = id;
      setPresent([...present, presentValue])

    } else {
      let absentValue = id;
      setAbsent([...absent, absentValue])
    }

  };
  // *****************************

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  // Daily attendance Post Api 
  const MyTakeAttendancePostApi = async () => {
    const data = {
      "date": date,
      "roleId": roleid,
      "presentStaffId": present
    }
    setLoader(true)
    try {
      const response = await TakeAttendancePostApi(data);
      console.log('take attendance data00', response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          setHidedelete(true)
          setLoader(false)

          setHide(false)

          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setHide(false)

          setTimeout(() => {
            setHide(true)
            setShow(true)
          }, 0.5)

        } else {
          toast.error(response?.data?.message);
          // setShow(true)
        }
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Daily attendance Put api 
  const MyNewDailyAttendancePutApi = async () => {
    const data = {
      "date": date,
      "sectionId": roleid,
      "presentStaffId": present,
      "absentStaffId": absent,

    }
    setLoader(true)
    try {
      const response = await SatffAttendancePutApi(data);
      console.log('MY_Take_Attendance____put-Api', response)
      if (response?.status === 200) {
        toast.success(response?.data?.msg);
        setHidedelete(true)
        setLoader(false)
        setShow2(false)
     
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
        offcanvasInstance.hide();
        setHide2(false)

        setTimeout(() => {
          setHide2(true)
          setShow2(true)
        }, 0.5)
      } else {
        toast.error(response?.data?.msg);
        setEditshow(true)
      }

    } catch (error) {
      console.log(error)
    }
  }


  //  attendance get all aapi by month
  const MyAttendanceGetAllApiByMonth = async () => {
    try {
      // console.log('my section id and data', sectionId, date)
      const response = await AttendanceGetAllBymonth(roleid, month, year, search, 1, 10);
      console.log('my attendance data by month 00000000 ', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setAttendanceDataByMonth(response?.data?.attendance)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Container>
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Human Resource</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Take Attendance</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
            <CSVLink className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 heading-14 export1 my-own-outline-btn me-2' data={csvData} filename={"orders.csv"} onClick={Download_Slip}>
              <span>
                <svg width="15" height="18" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479" />
                </svg>
              </span> &nbsp;
              <span >Export CSV File</span>
            </CSVLink>
            <div className='me-2 search-responsive'>
              <div className="input-group mb-3 ">
                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2">Search</span>
              </div>
            </div>
            {/* <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Take Attendance</Link> */}
            <div class="dropdown">
              <button className="btn btn-success heading-16 my-own-button me-3  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                Attendnace
              </button>
              <ul class="dropdown-menu">
                <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to="#">Take Attendance </Link></li>
                <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight123" aria-controls="offcanvasRight" to="#">Update Attendance</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-22px' }}>Attendance List</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-4 col-md-4 col-sm-12  ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Month</label>
                <select class="form-select  form-select-sm" onChange={(e) => setMonth(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value="01">01</option>
                  <option value="02">02</option>
                  <option value="03">03</option>
                  <option value="04">04</option>
                  <option value="05">05</option>
                  <option value="06">06</option>
                  <option value="07">07</option>
                  <option value="08">08</option>
                  <option value="09">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Year</label>
                <select class="form-select  form-select-sm" onChange={(e) => setYear(e.target.value)} aria-label="Default select example">
                  <option >--Choose--</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                  <option value="2027">2027</option>
                  <option value="2028">2028</option>
                  <option value="2029">2029</option>
                  <option value="2030">2030</option>

                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color  heading-14">Role Id</label>
                <select class="form-select form-focus form-select-sm " onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example">
                  <option value="" >--Choose--</option>
                  {
                    rolePermisAllData.map(item => (
                      <option value={item.roleId} >{item.roleName}</option>
                    ))
                  }
                </select>
              </div>
            </div>
          </div>
          {/* ####### buttons ######  */}
          <div className="row buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" onClick={MyAttendanceGetAllApiByMonth}>Search</button>
              <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
          </div>

          <div className="row mt-4 mb-4 bg-color-pink p-3 m-3">
            <div className="col-3"></div>
            <div className="col-6 ">
              <div className="row heading-16 ">

                <div className="col-4 pe-0">
                  <span className='heading-16 greyText'>Role</span>
                  <span className='heading-16'> Admin</span>
                </div>
                <div className="col-4 px-0">
                  <span className='heading-16 greyText'> Month</span>
                  <span>- March </span>
                </div>
                <div className="col-4 ">
                  <span className='heading-16 greyText '> Year</span>
                  <span>-  2024</span>
                </div>
              </div>
            </div>
            <div className=""></div>
          </div>

          <div className="table-container px-3 table-responsive">
            <table className="table table-sm ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='table-row-bg-color'>#</th>
                  <th className='table-row-bg-color'> Staff Name</th>
                  <th className='table-row-bg-color'>1</th>
                  <th className='table-row-bg-color'>2</th>
                  <th className='table-row-bg-color'>3</th>
                  <th className='table-row-bg-color'>4</th>
                  <th className='table-row-bg-color'>5</th>
                  <th className='table-row-bg-color'>6</th>
                  <th className='table-row-bg-color'>7</th>
                  <th className='table-row-bg-color'>8</th>
                  <th className='table-row-bg-color'>9</th>
                  <th className='table-row-bg-color'>10</th>
                  <th className='table-row-bg-color'>11</th>
                  <th className='table-row-bg-color'>12</th>
                  <th className='table-row-bg-color'>13</th>
                  <th className='table-row-bg-color'>14</th>
                  <th className='table-row-bg-color'>15</th>
                  <th className='table-row-bg-color'>16</th>
                  <th className='table-row-bg-color'>17</th>
                  <th className='table-row-bg-color'>18</th>
                  <th className='table-row-bg-color'>19</th>
                  <th className='table-row-bg-color'>20</th>
                  <th className='table-row-bg-color'>21</th>
                  <th className='table-row-bg-color'>22</th>
                  <th className='table-row-bg-color'>23</th>
                  <th className='table-row-bg-color'>24</th>
                  <th className='table-row-bg-color'>25</th>
                  <th className='table-row-bg-color'>26</th>
                  <th className='table-row-bg-color'>27</th>
                  <th className='table-row-bg-color'>28</th>
                  <th className='table-row-bg-color'>29</th>
                  <th className='table-row-bg-color'>30</th>
                  <th className='table-row-bg-color'>31</th>


                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {/* <tr className='heading-14 ' >
                  <td className=' greyText '>1.</td>
                  <td className=' greyText '>Saqib khan</td>
                  <td className=' greyText '>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText '>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText '>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                  <td className=' greyText'>
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                    </svg>
                  </td>
                </tr> */}

                {
                  attendanceDataByMonth.map((item, index) => (
                    <tr className='heading-14 ' >
                      <td className=' greyText '>{index + 1}</td>
                      <td className=' greyText '>{item.staffName}</td>
                      {
                        item?.attendance.map((item, index) => (
                          <td className='greyText' >
                            {
                              item.status === "present" ?
                                <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M15.2949 0L6.12781 9.17061L2.70158 5.74438L0 8.44948L6.12429 14.5738L6.91577 13.7858L18 2.70158L15.2949 0Z" fill="#41AD49" />
                                </svg>
                                :
                                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M1.39055 0.226368L0.226368 1.39055C-0.0754561 1.69237 -0.0754561 2.20978 0.226368 2.55473L4.1932 6.52156L0.226368 10.4884C-0.0754561 10.7902 -0.0754561 11.3076 0.226368 11.6526L1.34743 12.7736C1.64925 13.0755 2.16667 13.0755 2.51161 12.7736L6.47844 8.8068L10.4453 12.7736C10.7471 13.0755 11.2645 13.0755 11.6095 12.7736L12.7305 11.6526C13.0323 11.3507 13.0323 10.8333 12.7305 10.4884L8.76368 6.47844L12.7305 2.51161C13.0323 2.20978 13.0323 1.69237 12.7305 1.34743L11.6095 0.226368C11.3076 -0.0754561 10.7902 -0.0754561 10.4453 0.226368L6.47844 4.1932L2.51161 0.226368C2.20978 -0.0754561 1.69237 -0.0754561 1.39055 0.226368Z" fill="#B50000" />
                                </svg>
                            }
                          </td>
                        ))
                      }

                    </tr>

                  ))}



              </tbody>
            </table>
          </div>

        </div>
        {/* ################## Off Canvas Area ####################  */}

        {
          hide ? (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Take Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />

                <div className="inputs">
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                    <input type="date" className="form-control form-focus input-bg label-color" onChange={(e) => setDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                  </div>
                </div>
                <div className="mb-3">
                  <label for="exampleFormControlInput1" className="form-label label-color ">Role</label>
                  <select class="form-select form-focus input-bg label-color" onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example">
                    <option value="" >--Choose--</option>
                    {
                      rolePermisAllData.map(item => (
                        <option value={item.roleId} >{item.roleName}</option>
                      ))
                    }
                  </select>
                </div>
                {
                  show ? (
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success heading-16" style={{ backgroundColor: '#008479', color: '#fff' }} onClick={UpdateHandleBtn}>Show User List</button>
                      <button type="button" className="btn btn-outline-success ">Cancel</button>
                    </div>
                  ) : (
                    <div className="container-fluid">
                      <div className="table-container pt-3 table-responsive overflow-y">
                        <table className="table  ">
                          <thead className=''>
                            <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                              <th className='table-row-bg-color greyTextColor'>#</th>
                              <th className='table-row-bg-color greyTextColor'> Student Name</th>
                              <th className='table-row-bg-color greyTextColor'>Status</th>

                            </tr>
                          </thead>
                          <tbody className='heading-14 align-middle greyTextColor ' >

                            {
                              takeAttenSearhDate.map((item, index) => (
                                <tr className='heading-14' key={index}>
                                  <td className='greyText'>{index + 1}</td>
                                  <td className='greyText'>{item.staffName}</td>
                                  <td className='heading-18 pe-0 d-flex'>
                                    <div className='d-flex'>
                                      <p className=''>P</p>
                                      <span className='pt-1 ps-2'>
                                        <input
                                          className="form-check-input my-form-check-input123"
                                          checked={item.isPresent === true}
                                          type="radio"
                                          onClick={() => handleRadioChange(index, true, item.id)}
                                        />
                                      </span>
                                    </div>
                                    <div className='d-flex ps-4'>
                                      <p>A</p>
                                      <span className='pt-1 ps-2'>
                                        <input
                                          className="form-check-input my-form-check-input123"
                                          checked={item.isPresent === false}
                                          type="radio"
                                          onClick={() => handleRadioChange(index, false)}
                                        />
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}

                          </tbody>
                        </table>
                      </div>
                      <div className='my-button11 '>
                        <button type="button" className="btn btn-outline-success heading-16" style={{ color: '#fff', backgroundColor: '#008479' }} onClick={MyTakeAttendancePostApi}>Submit</button>
                        <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                      </div>
                    </div>
                  )
                }

              </div>
            </div>
          ) : (
            ''
          )
        }

        {/* ##### offcanvas Update attendance start ########  */}
          {/* ########## content area #################  */}
          {
            show2 ? (
              <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight123" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef22}>
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Update Attendance</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="inputs">

                  <div className="inputs">
                    <div className="mb-3">
                      <label for="exampleFormControlInput1" className="form-label label-color ">Date</label>
                      <input type="date" className="form-control form-focus input-bg label-color" onChange={(e) => setDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label for="exampleFormControlInput1" className="form-label label-color ">Role</label>
                    <select class="form-select form-focus input-bg label-color" onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example">
                      <option value="" >--Choose--</option>
                      {
                        rolePermisAllData.map(item => (
                          <option value={item.roleId} >{item.roleName}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

                {
                  hide2 ? (
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success heading-16" style={{backgroundColor:'#008479', color:'#fff'}} onClick={UpdateHandleBtn2}>Show Student List</button>
                      <button type="button" className="btn btn-outline-success ">Cancel</button>
                    </div>
                  ) : (
                    <div className="container-fluid">

                      <div className="table-container pt-3 table-responsive overflow-y">
                        <table className="table  ">
                          <thead className=''>
                            <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                              <th className='table-row-bg-color greyTextColor'>#</th>
                              <th className='table-row-bg-color greyTextColor'> Student Name</th>
                              <th className='table-row-bg-color greyTextColor'>Status</th>
                            </tr>
                          </thead>
                          <tbody className='heading-14 align-middle greyTextColor ' >
                            {
                              takeAttenSearhDate.map((item, index) => (
                                <tr className='heading-14' key={index}>
                                  <td className='greyText'>{index + 1}</td>
                                  <td className='greyText'>{item.staffName}</td>
                                  <td className='heading-18 pe-0 d-flex'>
                                    <div className='d-flex'>
                                      <p>P</p>
                                      <span className='pt-1 ps-2'>
                                        <input
                                          className="form-check-input my-form-check-input123"
                                          checked={item.isPresent === true}
                                          type="radio"
                                          onChange={() => handleRadioChange(index, true, item.id)}
                                        />
                                      </span>
                                    </div>
                                    <div className='d-flex ps-4'>
                                      <p>A</p>
                                      <span className='pt-1 ps-2'>
                                        <input
                                          className="form-check-input my-form-check-input123"
                                          checked={item.isPresent === false}
                                          type="radio"
                                          onChange={() => handleRadioChange(index, false, item.id)}
                                        />
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                      <div className='my-button11 '>
                        <button type="button" className="btn btn-outline-success heading-16" style={{backgroundColor:'#008479', color:'#fff'}} onClick={MyNewDailyAttendancePutApi}>Update</button>
                        <button type="button" className="btn btn-outline-success ">Cancel</button>
                      </div>
                    </div>
                  )
                }

              </div>
        </div>
            ) : ''
          }
          {/* ################# After click ###############  */}
       

        {/* ##### offcanvase Update attendance  end ########  */}




      </div>
    </Container>
  )
}

export default TakeAttendance
