import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { SyllabusSectionGetAllApi } from '../Utils/Apis'
import { ClassGetApi } from '../Utils/Apis'
import { SubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import { AllTeacherBySubjectId } from '../Utils/Apis'
import { ClassRoitinePostApi } from '../Utils/Apis'
import { ClassRoutineGetAll } from '../Utils/Apis'
import { ClassRoutineCSV } from '../Utils/Apis'
import { ClassRoutineBySearchGetAll } from '../Utils/Apis'
import HashLoader from './HashLoaderCom';
import { CSVLink } from 'react-csv';

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
.for-width{
  width:30%;
}
.my-own-button{
  height: 33px;
  width:75% !important;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  width: 60%;
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
.tableActionButtonBgColor{
  background: transparent !important;
}
.my-button-drop{
  border: none !important;
}
.my-class-for-padding{
  padding-left: 80px !important;
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

@media only screen and (max-width: 1240px) {
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


const ClassRoutine = () => {

  const [loader, setLoader] = useState(false)

  const [show, setShow] = useState(true)
  const [hide, setHide] = useState(false)

  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)

  const [stateChange, setStateChange] = useState(false)
  const [defaultState, setDefaultState] = useState(true)

  const [classData, setClassData] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [teacherData, setTeacherData] = useState([])
  const [classRoutineData, setClassRoutineData] = useState([])
  const [breakType, setBreakType] = useState('')
  const [classNo, setClassNo] = useState('')
  const [classId, setClassId] = useState()
  console.log('my class id', classId)
  console.log('my class no', classNo)

  const [section, setSection] = useState('')
  const [sectionName, setSectionName] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [teacherId, setTeacherId] = useState('')
  // console.log('my teacher id is = ',teacherId)
  const [day, setDay] = useState()
  const [endTime, setEndTime] = useState()
  const [startTime, setStartTime] = useState()


  // console.log('my subject idddd', subjectId)


  const StateFunction = (e) => {
    const value = e.target.value;
    setBreakType(value)
    if (value === 'short break' || value === 'lunch break') {
      setStateChange(true)
      setDefaultState(false)
    } else {
      setStateChange(false)
      setDefaultState(true)
    }
  }

  const UpdateHandleBtn = (e) => {

    if (show === true && hide === false) {
      setShow(false)
      setHide(true)
    } else {
      setShow(true)
    }
  }

  const showNamedelete = () => {
    if (showadd === true && hideedit === false) {
      setShowadd(false)
      setHideedit(true)
    } else {
      setShowadd(true)
    }
  }

  const Handle = (e) => {
    const value = e.target.value;
    const [val1, val2] = value.split(',');
    setClassId(parseInt(val1))
    // const num = val2.trim()
    setClassNo(val2)
    console.log('my class id s = ', val1)
    console.log('my class no is = ', val2)
  }

  const [searchKey, setSearchKey] = useState('')

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  useEffect(() => {
    UpdatClassGetApi()
    if (classId) {
      MySyllabusSectionGetApi()
    }
    if (classId) {
      MySubjectByClassIdGetApi()
    }
    if (classId && subjectId) {
      MyAllTeacherBySubjectId()
    }

    // MyClassRoutineGetAllApi()
  }, [classId, subjectId])

  useEffect(() => {
    Download_Slip()
  }, [])

  const [csvData, setCsvData] = useState([]);

  const Download_Slip = async () => {
    try {
      const response = await ClassRoutineCSV(classNo, sectionName);
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCsvData(rows);
        // setTableData(rows.slice(1));
      }
    } catch (err) {
      console.log(err);
    }
  };
  // other apis area start----------------------------

  // class Get all data from class page for class id  
  const UpdatClassGetApi = async () => {
    setLoader(true)
    try {
      const response = await ClassGetApi(searchKey, pageNo, pageSize);
      console.log('class-get-all-api ', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setClassData(response?.data?.classes)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Section by class for section 
  const MySyllabusSectionGetApi = async () => {
    // console.log('class id inside the section func',classId)
    setLoader(true)
    try {
      const response = await SyllabusSectionGetAllApi(classId);

      console.log('Section-get-all-api in classRoutine', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setSectionData(response?.data?.allSections)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Subject by class id From class get all api 
  const MySubjectByClassIdGetApi = async () => {
    setLoader(true)
    try {
      const response = await SubjectByClassIdInSyllabusGetAllApi(classId);
      console.log('Subject-get-all-api in Syllabus', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setSubjectData(response?.data?.subjects)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }


  const MyAllTeacherBySubjectId = async () => {
    setLoader(true)
    try {
      const response = await AllTeacherBySubjectId(classId, subjectId);
      // console.log('my subject id',subjectId)
      console.log('All teacher dattt0000000000000', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setTeacherData(response?.data?.teacher)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // other apis area end----------------------------

  const offcanvasRef = useRef(null)
  const offcanvasRef22 = useRef(null)
  const offcanvasRef33 = useRef(null)

  // class routine post Api 
  const MyClassRoutinePostApi = async () => {
    const formData = new FormData()
    formData.append('breakType', breakType);
    formData.append('classNo', classNo);
    formData.append('section', section);
    formData.append('subjectId', subjectId);
    formData.append('teacherId', teacherId);
    formData.append('day', day);
    formData.append('startTime', startTime);
    formData.append('endTime', endTime);
    setLoader(true)
    try {
      const response = await ClassRoitinePostApi(formData);
      console.log('class-routine-post-api', response)

      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setShow(false)
          setHide(true)
          // MyClassRoutineGetAllApi()
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setTimeout(() => {
            setShow(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShow(true)
        }
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ClassRoutine get all api 
  const MyClassRoutineGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await ClassRoutineGetAll(searchKey, classNo, sectionName);
      console.log('Class Routine get all api data', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setClassRoutineData(response?.data?.timetable)
        setLoader(false)
        // console.log(response?.data?.schoolClassSections, 'section data by class')
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ClassRoutine get all api by search class no and section  
  const MyClassRoutineSearchGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await ClassRoutineBySearchGetAll(classNo, section);
      console.log('Class Routine get all api data by CLASS NO AND  SEARCH', response);
      if (response?.status === 200) {
        toast.success(response?.data?.classes?.message)
        setLoader(false)
        // setClassRoutineData(response?.data?.routes)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

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
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Academic</li>
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#" onClick={MyClassRoutineGetAllApi}>Class Routine</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query for-width'>
            <CSVLink className=' btn AddBtnn font16 heading-14 export1 my-own-outline-btn me-4' data={csvData} filename={"orders.csv"}>
              <span>
                <svg width="15" height="18" viewBox="0 0 15 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0V5H15L10 0ZM8.75 5V0H1.875C0.839453 0 0 0.839453 0 1.875V18.125C0 19.1602 0.839453 20 1.875 20H13.125C14.1605 20 15 19.1605 15 18.125V6.25H10.0352C9.30859 6.25 8.75 5.69141 8.75 5ZM5 10.9375C5 11.1094 4.85938 11.25 4.6875 11.25H4.375C4.02734 11.25 3.75 11.5273 3.75 11.875V13.125C3.75 13.4727 4.02734 13.75 4.375 13.75H4.6875C4.85938 13.75 5 13.8906 5 14.0625V14.6875C5 14.8594 4.85938 15 4.6875 15H4.375C3.33984 15 2.5 14.1602 2.5 13.125V11.875C2.5 10.8398 3.33984 10 4.375 10H4.6875C4.85938 10 5 10.1406 5 10.3125V10.9375ZM6.73047 15H6.25C6.0791 15 5.9375 14.8584 5.9375 14.6875V14.0625C5.9375 13.8906 6.07812 13.75 6.25 13.75H6.72852C6.96289 13.75 7.13398 13.6133 7.13398 13.4912C7.13398 13.4424 7.10469 13.3887 7.05098 13.3398L6.19629 12.6074C5.87109 12.3242 5.67969 11.9258 5.67969 11.5078C5.67969 10.6797 6.42188 10 7.33594 10H7.8125C7.9834 10 8.125 10.1416 8.125 10.3125V10.9375C8.125 11.1094 7.98438 11.25 7.8125 11.25H7.33594C7.10156 11.25 6.93047 11.3867 6.93047 11.5088C6.93047 11.5576 6.95977 11.6113 7.01348 11.6602L7.86816 12.3926C8.19531 12.6758 8.38574 13.0762 8.38574 13.491C8.38281 14.3203 7.64062 15 6.73047 15ZM11.25 11.125V10.3125C11.25 10.1406 11.3906 10 11.5625 10H12.1875C12.3594 10 12.5 10.1406 12.5 10.3125V11.123C12.5 12.5098 11.9969 13.8184 11.084 14.8C10.9688 14.9258 10.8008 15 10.625 15C10.4492 15 10.2832 14.9268 10.166 14.7998C9.25391 13.8203 8.75 12.5117 8.75 11.125V10.3125C8.75 10.1406 8.89062 10 9.0625 10H9.6875C9.85938 10 10 10.1406 10 10.3125V11.123C10 11.9191 10.2246 12.6953 10.625 13.3449C11.0273 12.6953 11.25 11.918 11.25 11.125Z" fill="#008479" />
                </svg>
              </span> &nbsp;
              <span>Export CSV File</span>
            </CSVLink>

            <Link type="button" className="btn btn-success heading-16 my-own-button me-2 " data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop1012" aria-controls="offcanvasRight" to={''}>+ ADD Class Routine</Link>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16 heading-responsive' style={{ marginTop: '-12px' }}>Class Routine Details</h5>

        <div className="main-content-conatainer pt-1 ">
          <div className="row p-3">
            <div className="col-lg-6 col-md-6 col-sm-12  ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => Handle(e)} aria-label="Default select example">
                  <option selected>--Choose--</option>
                  {
                    classData?.map((item =>
                      <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                    ))
                  }
                </select>
              </div>
            </div>

            <div className="col-lg-6 col-md-6 col-sm-12">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Section</label>
                <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSectionName(e.target.value)} aria-label="Default select example">
                  <option selected>--Choose--</option>
                  {
                    sectionData.map((item =>
                      <option value={item.sectionName}>{item.sectionName}</option>
                    ))
                  }
                </select>
              </div>
            </div>

          </div>
          <div className="row buttons-topss">
            <div className='my-button11 heading-16'>
              <button type="button" class="btn btn-outline-success" style={{ color: "#ffffff", backgroundColor: '#008479' }} onClick={MyClassRoutineGetAllApi}>Search</button>
              <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
          </div>


          <div className="table-container px-3 pt-4 table-responsive w-100">
            <table className="table table-sm table-bordered">
              <thead className='text-center'>
                <tr className='heading-16 text-color-000 text-center' style={{ fontWeight: '500' }}>
                  <th className='table-row-bg-color'></th>
                  <th className='table-row-bg-color'> 9 - 9.45 AM</th>
                  <th className='table-row-bg-color'>10 - 10.45 AM</th>
                  <th className='table-row-bg-color'>11 - 11.45 AM</th>
                  <th className='table-row-bg-color'>12 - 12.45 PM</th>
                  <th className='table-row-bg-color'>1 - 1.45 PM</th>
                  <th className='table-row-bg-color'>2 - 2.45 PM</th>
                  <th className='table-row-bg-color'>3 - 3.45 PM</th>
                  <th className='table-row-bg-color'>4 - 4.45 PM</th>

                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor text-center'>

                {
                  classRoutineData?.map((item, index) => (
                    <tr key={index}>
                      <td className=' greyText'>{item.day}</td>
                      {
                        item?.timetable?.map((item) => (
                          <td className=' greyText'>
                            {item.teacher} <br />
                            {item.subject ? item.subject : item.breakType}
                          </td>
                        ))
                      }

                    </tr>
                  ))
                }

              </tbody>
            </table>
          </div>

        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas added start ########  */}
        {
          show && (
            <>
              <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop1012" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Class Routine</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />
                <div class="offcanvas-body">
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Break Type</label>
                    <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => StateFunction(e)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      <option value="">None</option>
                      <option value="short break">Short Break</option>
                      <option value="lunch break">Lunch Break</option>
                    </select>
                  </div>
                  {
                    defaultState && (
                      <>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => Handle(e)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            {
                              classData?.map((item =>
                                <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSection(e.target.value)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            {
                              sectionData.map((item =>
                                <option value={item.sectionName}>{item.sectionName}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label heading-16">Subject</label>
                          <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            {
                              subjectData.map((item =>
                                <option value={item.subjectId}>{item.subjectName}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label  heading-16 ">Teacher</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setTeacherId(e.target.value)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            {
                              teacherData.map((item =>
                                <option value={item.staffId}>{item.staffName}</option>
                              ))
                            }
                          </select>
                        </div>

                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label  heading-16">Day</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setDay(e.target.value)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </div>

                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label heading-16">Starting Time</label>
                          <input type="time" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setStartTime(e.target.value)} placeholder="Select " />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label heading-16">Ending Time</label>
                          <input type="time" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setEndTime(e.target.value)} placeholder="Select " />
                        </div>
                      </>
                    )
                  }

                  {
                    stateChange && (
                      <>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => Handle(e)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            {
                              classData.map((item =>
                                <option value={`${item.classId} , ${item.classNo}`}>{item.classNo}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSection(e.target.value)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            {
                              sectionData.map((item =>
                                <option value={item.sectionName}>{item.sectionName}</option>
                              ))
                            }
                          </select>
                        </div>
                        <div className="mb-1  ">
                          <label for="exampleFormControlInput1" className="form-label  heading-16">Day</label>
                          <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setDay(e.target.value)} aria-label="Default select example">
                            <option selected>--Choose--</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                            <option value="Sunday">Sunday</option>
                          </select>
                        </div>

                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label heading-16">Starting Time</label>
                          <input type="time" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setStartTime(e.target.value)} placeholder="Select " />
                        </div>
                        <div class="mb-3">
                          <label for="exampleFormControlInput1" class="form-label heading-16">Ending Time</label>
                          <input type="time" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setEndTime(e.target.value)} placeholder="Select " />
                        </div>
                      </>
                    )
                  }


                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16" style={{backgroundColor:'#008479',color:"#fff"}} onClick={(e) => { MyClassRoutinePostApi() }}>Add Class Routine</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                  </div>
                </div>
              </div>
            </>
          )

        }
        {/* ################# After click ###############  */}

        {/* ##### offcanvase added  end ########  */}



        {/* ##### offcanvas edit start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel">
          {
            showadd && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Class Routine</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />

                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Class </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Section </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Subject </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16 ">Teacher</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Assign a Teacher </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16 ">Day</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select a Day </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16 ">Starting Hour</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Starting Hour </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16 ">Starting Minute</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Starting Minute </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16 ">Ending Hour</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Ending Hour </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-1  ">
                  <label for="exampleFormControlInput1" className="form-label  heading-16 ">Ending Minute</label>
                  <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                    <option selected>Select Ending Minute </option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>


                <div className='my-button11 '>
                  <button type="button" className="btn btn-outline-success heading-16" onClick={(e) => { showNamedelete() }}>Update Routine</button>
                  <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                </div>
              </div>
            )
          }
          {/* ################# After click ###############  */}
          {
            hideedit && (
              <div className="container-fluid">
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Successfully Message</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="delete-section  mt-5">
                  <div className="bg-container">
                    <div className="img-container">
                      <img src="./images/XMLID_1_.png" alt="" />
                    </div>
                    <div className="content mt-5">
                      <p >Successful Edit</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Changes has been <br /> Successfully Saved</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{ fontSize: '14px' }}>Continue</button>
                    </div>

                  </div>
                </div>
              </div>
            )
          }
          {/* ##### offcanvase edit end ########  */}
        </div>





      </div>
    </Container>
  )
}

export default ClassRoutine

// {
//   item?.subjectModels?.map((item)=>(
//     <div>
//       {item.subjectName}
//     </div>
//   ))
// }


// ----------------------------------

// insode the body data in map 
// {
//   classRoutineData.map((item, index) => (
//     <tr key={index}>
//       <td className=' greyText'>
//         {
//           item?.classes?.map((item) => (
//               item?.sections?.map((item)=>(
//                item?.routinesByDay?.tuesday?.map((item)=>(
//                 <div>
//                   {item.day}
//                 </div>
//                ))
//               ))
//           ))
//         }
//       </td>
//       <td className=' greyText'>
//         {
//           item?.classes?.map((item) => (
//               item?.sections?.map((item)=>(
//                item?.routinesByDay?.tuesday?.map((item)=>(
//                 <div>
//                  {item.teacher}
//                    <br />
//                   {item.subject}
//                 </div>
//                ))
//               ))
//           ))
//         }
//       </td>
//       <td className=' greyText'>
//         <div className="dropdown my-button-show">
//           <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//             Action  &nbsp;
//             <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
//               <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
//             </svg>
//           </button>
//           <ul className="dropdown-menu anchor-color heading-14">
//             <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="offcanvasRight1234" onClick={(e) => SyllabusGetByIdApi(item.syllabusId)}>Edit</Link></li>
//             <li><Link className="dropdown-item" to={''} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" onClick={(e) => setIdForDelete(item.syllabusId)}>Delete</Link></li>
//           </ul>
//         </div>
//       </td>
//     </tr>
//   ))
// }



{/* {
  item?.subjectModels?.map((item)=>(
    <div>
      {item.subjectName}
    </div>
  ))
} */}

// thead 

{/* <tr className='heading-16 text-color-000 text-center' style={{ fontWeight: '500' }}>
                  <th className='table-row-bg-color'></th>
                  <th className='table-row-bg-color'> 9 - 9.45 AM</th>
                  <th className='table-row-bg-color'>10 - 10.45 AM</th>
                  <th className='table-row-bg-color'>11 - 11.45 AM</th>
                  <th className='table-row-bg-color'>12 - 12.45 AM</th>
                </tr> */}
// thead 
