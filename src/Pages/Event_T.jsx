import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
// import { CAlert } from '@coreui/react';
// import '@coreui/coreui/dist/css/coreui.min.css'
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { TeacherEventPostApi } from '../Utils/Apis'
import { TeacherEventGetAllApi } from '../Utils/Apis'
import { TeacherEventCSV } from '../Utils/Apis'
import { TeacherEventDeleteApi } from '../Utils/Apis'
import { TeacherEventGetByIdApi } from '../Utils/Apis'
import { TeacherEventPutApi } from '../Utils/Apis'
import HashLoaderCom from './HashLoaderCom';
import { CSVLink } from 'react-csv';
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
    border-radius: 5px;

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
.label-color::placeholder{
  color: #bbbec1 ;
}
.label-color{
  color: #bbbec1 ;
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
  width: 150px;
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
    border-radius: 8px;
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
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .my-button112233{
        background-color: #008479 !important;
        color: #fff  !important;
        border-radius: 0;
    }
    .my-Ongoing-status{
     border: 1px solid var( --OnGoingStatus) ;
     border-radius: 15px;
     width: 100%;
     color: #41AD49 !important;
     padding:  1px 0px;
     text-align: center;
    }
    .my-Upcoming-status{
     border: 1px solid var(--UpcomingStatus) ;
     border-radius: 15px;
     width: 100%;
     color: #4F3EE0 !important;
     padding: 1px 0px;
     text-align: center;
    }
    .my-Closed-status{
     border: 1px solid var(  --ClosedStatus) ;
     border-radius: 15px;
     width: 70%;
     color: #B50000 !important;
     padding: 1px;
     text-align: center;
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
/* ############# offcanvas ############## */

/* ########## media query ###########  */
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


@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 1035px) {
    .for-dislay-direction{
        display: none;
        flex-direction: column;
    }
    .heading-response{
      margin-top: 0px !important;
    }

}
`;
// ## style css area end ####  

const Event = () => {

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [addshow, setAddshow] = useState(true)
  const [addhide, setaddhide] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)

  const [eventName, setEventName] = useState()
  const [startDate, setStartDate] = useState()
  const [startTime, setStartTime] = useState()
  const [endDate, setEndDate] = useState()
  const [endTime, setEndTime] = useState()
  const [eventStatus, setEventStatus] = useState()
  const [eventAllData, setEventAllData] = useState([])
  const [idForDelete, setIdForDelete] = useState()

  const [eventNameDataById, setEventNameDataById] = useState([])
  const [startDateDataById, setStartDateDataById] = useState()
  const [startTimeDataById, setStartTimeDataById] = useState()
  const [endDateDataById, setEndDateDataById] = useState()
  const [endTimeDataById, setEndTimeDataById] = useState()
  const [eventStatusDataById, setEventStatusDataById] = useState()
  const [eventIdForUpdate, setEventIdForUpdate] = useState()
  // console.log('event id for update',eventIdForUpdate)
  // console.log('my DATAAAA event name',eventNameDataById)

  const [isValidNameRequired, setIsValidNameRequired] = useState(false);
  const [isValidDateRequired, setIsValidDateRequired] = useState(false);
  const [isValidTimeRequired, setIsValidTimeRequired] = useState(false);
  const [isValidEndDateRequired, setIsValidEndDateRequired] = useState(false);
  const [isValidEndTimeRequired, setIsValidEndTimeRequired] = useState(false);

  const [searchKey, setsearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  useEffect(() => {
    MyEventGetAllApi()
    Download_Slip()
  }, [pageNo])

  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await TeacherEventCSV();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCsvData(rows);
        // setTableData(rows.slice(1));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [errors, setErrors] = useState({});
  // ###### validation ##########

  const FuncValidation = () => {
    let isValid = true;

    // name 
    if (!eventName || eventName === "" || !/^[A-Za-z\s]+$/.test(eventName)) {
      setIsValidNameRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    // date
    if (!startDate || startDate === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(startDate)) {
      setIsValidDateRequired(true)
      isValid = false
      setLoader(false)
    }
    else {  
    }
    // time
    if (!startTime || startTime === "" || !/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/.test(startTime)) {
      setIsValidTimeRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    // end date
    if (!endDate || endDate === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(endDate)) {
      setIsValidEndDateRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    // end time
    if (!endTime || endTime === "" || !/^(?:[01][0-9]|2[0-3]):[0-5][0-9]$/.test(endTime)) {
      setIsValidEndTimeRequired(true)
      isValid = false
      setLoader(false)
    }
    else {
    }
    return isValid;
  }

  const handleName = (e2) => {
    setEventName(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidNameRequired(nameRegex.test(e2));

    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidNameRequired(true)
    } else {
      setIsValidNameRequired(false)
    }
  }
  const handleDate = (e2) => {
    setStartDate(e2);
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    setIsValidDateRequired(dateRegex.test(e2));

    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidDateRequired(true)
    } else {
      setIsValidDateRequired(false)
    }
  }
  const handleEndDate = (e2) => {
    setEndDate(e2);
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    setIsValidEndDateRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidEndDateRequired(true)
    } else {
      setIsValidEndDateRequired(false)
    }
  }
  const handleTime = (e2) => {
    setStartTime(e2);
    const timeRegex = /^[0-2][0-3]:[0-5][0-9]$/;
    setIsValidTimeRequired(timeRegex.test(e2));
    if (e2 === "" || !timeRegex.test(e2)) {
      setIsValidTimeRequired(true)
    } else {
      setIsValidTimeRequired(false)
    }
  }
  const handleEndTime = (e2) => {
    setEndTime(e2);
    const timeRegex = /^[0-2][0-3]:[0-5][0-9]$/;
    setIsValidEndTimeRequired(timeRegex.test(e2));
    if (e2 === "" || !timeRegex.test(e2)) {
      setIsValidEndTimeRequired(true)
    } else {
      setIsValidEndTimeRequired(false)
    }
  }
  // ###### validation  end##########

  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

  // Event Post Api 
  const MyEventPostApi = async () => {
    setLoader(true)
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('eventName', eventName);
      formData.append('eventStatus', eventStatus);
      formData.append('startDate', startDate);
      formData.append('startTime', startTime);
      formData.append('endDate', endDate);
      formData.append('endTime', endTime);
      try {
        const response = await TeacherEventPostApi(formData);
        // console.log('class-post-api', response)
        if (response?.status === 200) {
          if (response?.data?.status === "success") {
            toast.success(response?.data?.message);
            MyEventGetAllApi()
            setAddshow(false)
            setaddhide(true)
            setLoader(false)
            const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
            offcanvasInstance.hide();
            setTimeout(() => {
              setAddshow(true)
            }, 0.5)
          } else {
            toast.error(response?.data?.message);
            setAddshow(true)
          }
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Event Get All Api   
  const MyEventGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherEventGetAllApi(searchKey, pageNo, pageSize);
      console.log('Event get All Api data', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setEventAllData(response?.data?.events)
        setCurrentPage(response?.data?.currentPage);
        setTotalPages(response?.data?.totalPages);
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Delete api
  const MyEventDeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await TeacherEventDeleteApi(id);
      // console.log('my-subs-api',response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        MyEventGetAllApi()
        setShowdelete(false)
        setHidedelete(true)
        setLoader(false)
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef33.current);
        offcanvasInstance.hide();
        setTimeout(() => {
          setShowdelete(true)
          setForDelete(false)
        }, 0.5)
      } else {
        toast.error(response?.data?.message);
        setShowdelete(true)
      }
    } catch (error) {
      console.log('catch')
    }
  }
  // Get by id 
  const MyEventGetByIdApi = async (id) => {
    setLoader(true)
    setEventIdForUpdate(id)
    try {
      const response = await TeacherEventGetByIdApi(id);
      console.log('all data by ger by id', response)

      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        // setAllDataById(response?.data?.events)
        setEventName(response?.data?.events?.eventName)
        setStartDate(response?.data?.events?.startingDate)
        setStartTime(response?.data?.events?.startingTime)
        setEndDate(response?.data?.events?.endingDate)
        setEndTime(response?.data?.events?.endingTime)
        setEventStatus(response?.data?.events?.eventStatus)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log('catch')
    }
  }
  // Event Put api 
  const MyEventPutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('eventName', eventNameDataById)
        formData.append('eventStatus', eventStatusDataById)
        formData.append('startDate', startDateDataById)
        formData.append('startTime', startTimeDataById)
        formData.append('endDate', endDateDataById)
        formData.append('endTime', endTimeDataById)

        const response = await TeacherEventPutApi(id, formData);
        console.log('MY_SECTION____put-Api', response)
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShow(false)
          setHide(true)
          MyEventGetAllApi()
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShow(true)
        }

      } catch (error) {
        console.log(error)
      }
    }
  }
  const handleForDelete = () => {
    MyEventDeleteApi(idForDelete)
  }
  return (
    <Container>
      {
        loader && (
          <HashLoaderCom />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item breadcrum-li heading-14 " ><Link href="#">Event</Link></li>
              </ol>
            </nav>
          </div>

          <div className='d-flex g-1 for-media-query'>


            <CSVLink className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 heading-14 export1 my-own-outline-btn me-2' data={csvData} filename={"orders.csv"}>
              <span>
                <svg width="15" height="18" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479" />
                </svg>
              </span> &nbsp;
              <span >Export CSV File</span>
            </CSVLink>
            <div className='me-2 search-responsive'>
              <div className="input-group mb-3 search-responsive">
                <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" onChange={(e) => setsearchKey(e.target.value)} aria-describedby="basic-addon2" />
                <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} onClick={MyEventGetAllApi} id="basic-addon2" >Search</span>
              </div>
            </div>
            <Link type="button" className="btn btn-success heading-16 my-own-button me-3" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">+ Add Event</Link>

          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-response' style={{ marginTop: '-22px' }}>Event Details</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container px-3 table-responsive">

            <table className="table table-sm table-striped ">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className=''>#</th>
                  <th>Event Name</th>
                  <th>Start Date & Time</th>
                  <th>End Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  eventAllData.map((item, index) => (
                    <tr className='heading-14' >
                      <td className=' greyText pe-0'>{index + 1}</td>
                      <td className=' greyText pe-0'>{item.eventName}</td>
                      <td className=' greyText pe-0'>{item.startDate} {item.startTime}</td>
                      <td className=' greyText pe-0'>{item.endDate} {item.endTime}</td>
                      <td className='greyText pe-0'>
                        <p className={`greyText pe-0 ${item.status === "Ongoing" ? 'my-Ongoing-status' : `${item.status === "Upcoming" ? 'my-Upcoming-status' : 'my-Closed-status'}`}`}>{item.status}</p>
                      </td>
                      <td className=' greyText  pe-0' >
                        <div className="dropdown my-button-show">
                          <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action  &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul className="dropdown-menu anchor-color heading-14">
                            <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1212" aria-controls="offcanvasRight" onClick={(e) => MyEventGetByIdApi(item.eventId)} >Edit</Link></li>
                            <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => setIdForDelete(item.eventId)}>Delete</Link></li>
                          </ul>
                        </div>
                      </td>
                    </tr>

                  ))}
              </tbody>
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

        {/* ################## Off Canvas Area ####################  */}
        {
          addshow && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Event </h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Event Name</label>
                      <input type="text" className="form-control form-focus label-color  heading-14" onChange={(e) => handleName(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Event name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Start Date</label>
                      <input type="date" className="form-control form-focus label-color  heading-14" onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">Start Time</label>
                      <input type="time" className="form-control form-focus label-color  heading-14" onChange={(e) => handleTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="9:30   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Time is required
                        </p>
                      )}
                    </div>

                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">End Date</label>
                      <input type="date" className="form-control form-focus   heading-14" onChange={(e) => handleEndDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label  heading-14">End Time</label>
                      <input type="time" className="form-control form-focus label-color  heading-14" onChange={(e) => handleEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="00:00   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End time is required
                        </p>
                      )}
                    </div>
                    <div className="mb-1">
                      <label for="exampleFormControlInput1" className="form-label label-color heading-16">Status</label>
                      <select class="form-select  form-select-sm form-focus  " onChange={(e) => setEventStatus(e.target.value)} aria-label="Default select example">
                        <option selected>Ongoing </option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Closed">Closed</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyEventPostApi()}>Add Events</button>
                      <button type="button" className="btn btn-outline-success">Cancel</button>
                      <Toaster />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {/* ################## Off Canvas Area ####################  */}
        {
          show && (
            <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop1212" aria-labelledby="staticBackdropLabel" ref={offcanvasRef22}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Event</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Event Name</label>
                      <input type="text" className="form-control form-focus   heading-14" onChange={(e) => handleName(e.target.value)} value={eventName} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Event Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidNameRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Event name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Start Date</label>
                      <input type="date" className="form-control form-focus   heading-14" onChange={(e) => handleDate(e.target.value)} value={startDate} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="19 Mar 2024" />
                    </div>
                    <div className='pt-1'>
                      {isValidDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">Start Time</label>
                      <input type="time" className="form-control form-focus   heading-14" onChange={(e) => handleTime(e.target.value)} value={startTime} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="9:30   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          Time is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">End Date</label>
                      <input type="date" className="form-control form-focus   heading-14" onChange={(e) => handleEndDate(e.target.value)} value={endDate} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Enter Book Name" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndDateRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End date is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color heading-14">End Time</label>
                      <input type="time" className="form-control form-focus   heading-14" onChange={(e) => handleEndTime(e.target.value)} value={endTime} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="9:30   AM" />
                    </div>
                    <div className='pt-1'>
                      {isValidEndTimeRequired && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                          End time is required
                        </p>
                      )}
                    </div>

                    <div className="mb-1">
                      <label for="exampleFormControlInput1" className="form-label label-color heading-16">Status</label>
                      <select class="form-select  form-select-sm form-focus " onChange={(e) => setEventStatusDataById(e.target.value)} value={eventStatusDataById} aria-label="Default select example">
                        <option value="Upcoming">Upcoming</option>
                        <option value="Closed">Closed</option>
                        <option value="Ongoing">Ongoing</option>
                      </select>
                    </div>

                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success my-button112233" onClick={(e) => MyEventPutApi(eventIdForUpdate)}>Update</button>
                      <button type="button" className="btn btn-outline-success">Cancel</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }

        {
          showdelete && (
            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef33}>
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
                        <input className="form-check-input my-form-check-input" onClick={() => setForDelete(!forDelete)} type="checkbox" value="" id="flexCheckDefault" />
                        <label className="form-check-label agree" for="flexCheckDefault">
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn  my-btn button00" disabled={forDelete ? false : true} onClick={handleForDelete} >Delete</button>
                        <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {/* ############## After click ##############  */}


      </div>
      {/* ################ offcanvas delete end #############  */}
    </Container>
  )
}

export default Event
