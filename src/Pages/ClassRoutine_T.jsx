import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

import { TeacherSyllabusSectionGetAllApi } from '../Utils/Apis'
import { TeacherClassGetApi } from '../Utils/Apis'
import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import { TeacherAllTeacherBySubjectId } from '../Utils/Apis'
import { TeacherClassRoitinePostApi } from '../Utils/Apis'
import { TeacherClassRoutineGetAll } from '../Utils/Apis'
// import { ClassRoutineBySearchGetAll } from '../Utils/Apis'
import HashLoader from './HashLoaderCom';
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
  const [section, setSection] = useState('')
  const [subjectId, setSubjectId] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [day, setDay] = useState()
  const [endTime, setEndTime] = useState()
  const [startTime, setStartTime] = useState()

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
    MyClassRoutineGetAllApi()
  }, [classId, subjectId])


  // other apis area start----------------------------

  // class Get all data from class page for class id  
  const UpdatClassGetApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherClassGetApi();
      console.log('class-get-all-api ', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
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
    setLoader(true)
    try {
      const response = await TeacherSyllabusSectionGetAllApi(classId);
      console.log('Section-get-all-api in Syllabus', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
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
      const response = await TeacherSubjectByClassIdInSyllabusGetAllApi(classId);
      console.log('Subject-get-all-api in Syllabus', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setSubjectData(response?.data?.subjects)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // console.log('my subject id',subjectId)


  const MyAllTeacherBySubjectId = async () => {
    setLoader(true)
    try {
      const response = await TeacherAllTeacherBySubjectId(classId, subjectId);
      // console.log('my subject id',subjectId)
      console.log('All teacher by subject id', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
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
      const response = await TeacherClassRoitinePostApi(formData);
      console.log('class-routine-post-api', response)

      if (response?.status === 200) {
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setShow(false)
          setHide(true)
          MyClassRoutineGetAllApi()
          setLoader(false)

        } else {
          toast.error(response?.data?.msg);
          setShow(true)
        }
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ClassRoutine get all api 
  const MyClassRoutineGetAllApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherClassRoutineGetAll();
      console.log('Class Routine get all api data', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setClassRoutineData(response?.data?.timeTable)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // ClassRoutine get all api by search class no and section  
  // const MyClassRoutineSearchGetAllApi = async () => {
  //   setLoader(true)
  //   try {
  //     const response = await ClassRoutineBySearchGetAll(classNo, section);
  //     console.log('Class Routine get all api data by CLASS NO AND  SEARCH', response);
  //     if (response?.status === 200) {
  //       setLoader(false)
  //     } else {
  //       toast.error(response?.data?.classes?.message);
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Class Routine</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>       
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>Class Routine Details</h5>

        <div className="main-content-conatainer pt-1 ">
  
          <div className="table-container px-3 pt-3 table-responsive w-100">
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
                            {item.subject}
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
        <div className="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop1012" aria-labelledby="staticBackdropLabel">
          {
            show && (
              <>
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
                    <button type="button" className="btn btn-outline-success heading-16" onClick={(e) => { MyClassRoutinePostApi() }}>Add Class Routine</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                  </div>
                </div>
              </>
            )

          }
          {/* ################# After click ###############  */}
          {
            hide && (
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
                      <p >Successful Added</p>
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
          {/* ##### offcanvase added  end ########  */}

        </div>


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
