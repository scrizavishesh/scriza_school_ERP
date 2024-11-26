import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
// import { AssignmntGetByIdApi } from '../Utils/Apis'
// import { AssignmntDeleteByIdApi } from '../Utils/Apis'
import Add_assign_offcnvs from './Add_assign_offcnvs_T';

// import { TeacherClassGetApi } from '../Utils/Apis'
// import { AssignmntPutApi } from '../Utils/Apis'
// import { TeacherSectionRoomByIdGetApi } from '../Utils/Apis'
// import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
// import { AssignmentPostApi } from '../Utils/Apis'
// import { TeacherGetTeacherGetAll } from '../Utils/Apis'
import { Icon } from '@iconify/react/dist/iconify.js';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';

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

.unpaid{
    background-color: #B50000;
    color: #fff;
    padding: 2px 10px;
    font-size: 13px;
    border-radius: 15px ;
    display: inline-block;
}
.paid{
    background-color: #00A67E;
    color: #fff;
    font-size: 13px;
    padding: 2px 10px;
    border-radius: 15px ;
    display: inline-block;
}
.my-green{
    background-color: #008479;
    color: #fff !important;
}
.modal-header{
    border-bottom: none !important;
}
.main{
    border-top: none !important;
}
.main-content{
    background-color: #F0F0FF;
    padding: 8px;
}
.img-content img{
    width: 80px;
}
.img-content {
    padding: 4px 0px 0px 4px;
}
.ul-1{
    list-style: none;
    color: #8F8F8F;
}
.ul-2{
    list-style: none;
}
.outer-border{
    border: 1px solid #DDDDEB;
    padding: 0px 12px 0px 12px;
}

.table-input{
    border: 1px solid #E4E7EB;
}
.edit-icon{
    cursor: pointer;
}
.progress-bar{
  background-color: #008479;
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

const Assign_publish = (props) => {

  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    const dataToSend = pageNo;
    navigate('/assignmenttea', { state: dataToSend });
  }, [pageNo])

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };
  console.log(props.data, 'Data time000000000')

  const assignments = props.data?.assignment || [];

  useEffect(() => {
    setCurrentPage(props.data?.currentPage);
    setTotalPages(props.data?.totalPages);
  }, [props])

  // const myMapDataFromOherassignmentDataa1 = [props.data]

  console.log('my trasferrrr data ', assignments)

  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [assignmntData, setAssignmntData] = useState()
  const [classId, setClassId] = useState()
  const [classNo, setClassNo] = useState()
  const [sectionId, setSectionId] = useState()
  const [subjectId, setSubjectId] = useState()
  const [showdelete, setShowdelete] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [title, setTitle] = useState()
  const [IdForDetails, setIdForDetails] = useState()
  const [hidedelete, setHidedelete] = useState(false)
  const [classData, setClassdata] = useState([])
  const [sectionData, setSectionData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [examCategoryData, setExamCategoryData] = useState([])
  const [sessionAllData, setSessionAllData] = useState([])
  const [marksAllData, setMarksAllData] = useState([])
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)
  const [teacher, setTeacher] = useState()
  const [totalMarks, setTotalMarks] = useState()
  const [startDay, setStartDay] = useState()
  const [endDay, setEndDay] = useState()
  const [assignmentUpload, setAssignmentUpload] = useState()
  const [status, setStatus] = useState()
  const [teacherData, setTeachertData] = useState([])

  const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
  const [isValidMarksRequired, setIsValidMarksRequired] = useState(false);
  const [isValidStartDateRequired, setIsValidStartDateRequired] = useState(false);
  const [isValidEndDayDateRequired, setIsValidEndDayDateRequired] = useState(false);

  useEffect(() => {
    UpdatClassGetApi()
  }, [])

  useEffect(() => {

    if (subjectId) {
      MyTeacherByClassIdGetApi(subjectId)
    }
  }, [subjectId])


  // ###### validation ##########
  const [errors, setErrors] = useState({});


  const FuncValidation = () => {
    let isValid = true
    // title
    if (!title || title === "" || !/^[A-Za-z\s]+$/.test(title)) {
      setIsValidTitleRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    // marks 
    if (!totalMarks || totalMarks === "" || !/^[0-9]+$/.test(totalMarks)) {
      setIsValidMarksRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    // start date 
    if (!startDay || startDay === "" || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(startDay)) {
      setIsValidStartDateRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    // end date 
    if (!endDay || endDay === "" || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(endDay)) {
      setIsValidEndDayDateRequired(true)
      isValid = false;
      setLoader(false)
    }
    else {
    }
    return isValid;
  }

  // title
  const handleTitle = (e2) => {
    setTitle(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidTitleRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidTitleRequired(true)
    } else {
      setIsValidTitleRequired(false)
    }
  }
  // marks 
  const handleMarks = (e2) => {
    setTotalMarks(e2)
    const noRegex = /^[0-9]+$/;
    setIsValidMarksRequired(noRegex.test(e2));

    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidMarksRequired(true)
    } else {
      setIsValidMarksRequired(false)
    }
  }
  // start date 
  const handleStartDate = (e2) => {
    setStartDay(e2)
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    setIsValidStartDateRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidStartDateRequired(true)
    } else {
      setIsValidStartDateRequired(false)
    }
  }
  // end date 
  const handleEndDate = (e2) => {
    setEndDay(e2)
    const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    setIsValidEndDayDateRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidEndDayDateRequired(true)
    } else {
      setIsValidEndDayDateRequired(false)
    }
  }
  // ###### validation ##########



  const handle = (event) => {
    const value = event.target.value;
    const [val1, val2] = value.split(',');
    setClassId(parseInt(val1))
    const num = val2.trim()
    setClassNo(num)
    // console.log(val1, 'classsssssssssss')
    MySectionGetApi(val1)
    MySubjectByClassIdGetApi(val1)
  }
  // Get All Api from class list page for id 
  const UpdatClassGetApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherClassGetApi();
      console.log('class-get-all-api in Assignment', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setClassdata(response?.data?.classes)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Section Get All Api from section page for id 
  const MySectionGetApi = async (id) => {
    console.log(id, 'id in section')
    setLoader(true)
    try {
      const response = await TeacherSectionRoomByIdGetApi(id);
      console.log('SECTION-get-all-api', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setSectionData(response?.data?.allSections)
        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  // Subject by class id From class get all api 
  const MySubjectByClassIdGetApi = async (id) => {
    console.log(id, 'id in subject')
    setLoader(true)
    try {
      const response = await TeacherSubjectByClassIdInSyllabusGetAllApi(id);
      console.log('Subject-get-all-api in Assignment', response);
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
  // Teacher by class id and subject id From get all api 
  const MyTeacherByClassIdGetApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherGetTeacherGetAll(classId, subjectId);
      console.log('Teacher-get-all-api in Assignment', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.classes?.message)
        setTeachertData(response?.data?.teacher)
        setLoader(false)
      } else {
        toast.error(response?.data?.classes?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const offcanvasRef = useRef(null);
  const offcanvasRef22 = useRef(null);
  const offcanvasRef33 = useRef(null);

    // Delete api
    const AssignmnttttDeleteByIdApi = async (id) => {
      setLoader(true)
      try {
        const response = await AssignmntDeleteByIdApi(id);
        console.log('delete api assignmnttttttt111',response)
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShowdelete(false)
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

  //   Get All  by id
  const MyAssigmntGetByIdGetAll = async (id) => {
    setIdForUpdate(id)
    setLoader(true)
    try {
      const response = await AssignmntGetByIdApi(id);
      console.log('Get all by id  Data in assihmnt', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message)
        setTitle(response?.data?.Assignment?.title)
        setClassId(response?.data?.Assignment?.classId)
        setSectionId(response?.data?.Assignment?.sectionId)
        setSubjectId(response?.data?.Assignment?.subjectId)
        setTeacher(response?.data?.Assignment?.teacherId)
        setTotalMarks(response?.data?.Assignment?.totalMarks)
        setStartDay(response?.data?.Assignment?.startDate)
        setEndDay(response?.data?.Assignment?.endDate)
        setStatus(response?.data?.Assignment?.status)

        setLoader(false)
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error)
    }
  }


  //  Put api 
  const MyAssignmntPutApi = async (id) => {
    if (FuncValidation()) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('title', title)
        formData.append('ClassId', classId)
        formData.append('subjectId', subjectId)
        formData.append('teacherId', teacher)
        formData.append('totalMarks', classId)
        formData.append('startDate', startDay)
        formData.append('endDate', endDay)
        formData.append('status', status)
        formData.append('sectionId', sectionId)
        const response = await AssignmntPutApi(IdForUpdate, formData);
        console.log('MY_Assigmnt-put-Api', response)

        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShowadd(false)
          setHideedit(true)
          // MyOnlinCoruseGetAllApi()
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          setShow(false)
          setTimeout(() => {
            setShowadd(true)
          }, 0.5)
        } else {
          toast.error(response?.data?.message);
          setShowadd(true)
        }

      } catch (error) {
        console.log(error)
      }
    }
  }
  return (
    <Container>
      {
        loader && (
          <HashLoader />
        )
      }
      <div className="">
        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container  table-responsive">
            <table className="table table-sm r table-striped">
              <thead className=''>
                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                  <th className='' style={{ width: '100px' }}>#</th>
                  <th>Title</th>
                  <th>Details</th>
                  <th >Deadline</th>
                  <th>Submission</th>
                  <th>Status</th>
                  <th >Actions</th>
                </tr>
              </thead>
              <tbody className='heading-14 align-middle greyTextColor'>

                {
                  assignments?.map((item, index) => (
                    <tr className='heading-14' >
                      <td className=' greyText'>{index + 1}</td>
                      <td className=' greyText' >{item.title}</td>
                      <td className=' greyText'> class -{item.classNo} <br />section -{item.sectionName} <br />subject -{item.subjectName}</td>
                      <td className=' greyText' >Start Time - {item.startDate} <br /> End Time - {item.endDate} </td>
                      <td className=' greyText d' >
                        <div className=''>
                          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar progress-bar-striped progress-bar-animated" style={{ width: `${item.currentSubmissions}%` }}></div>
                          </div>
                          {/* <p className='heading-12'>37</p> */}
                        </div>
                      </td>
                      <td className=' greyText' >{item.status}</td>
                      <td className=' greyText' >
                        <td className=' greyText  pe-0' >
                          <div className="dropdown my-button-show">
                            <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Action &nbsp;
                              <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                              </svg>
                            </button>
                            <ul className="dropdown-menu anchor-color heading-14">
                              <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop101" aria-controls="staticBackdrop" onClick={() => MyAssigmntGetByIdGetAll(item.id)} >Edit</Link></li>
                              <li><Link className="dropdown-item" to={`/assignmentdetails/${item.id}`} onChange={(e) => setIdForDetails(item.id)}>Open</Link></li>
                              <li><Link className="dropdown-item" to={`/assignmntsubmssion/${item.id}/${item.sectionId}/${item.totalMarks}`}>Submission</Link></li>
                              <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={() => setIdForDelete(item.id)}>Delete</Link></li>
                     
                            </ul>
                          </div>
                        </td>
                      </td>
                    </tr>
                  ))
                }

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
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          <div className="offcanvas-header">
            <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
            <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Assignment</h5>
          </div>
          <hr className='' style={{ marginTop: '-3px' }} />
          <div className="offcanvas-body pt-0">
            <Add_assign_offcnvs />
          </div>
        </div>
        {/* ##### offcanvas edit start ########  */}
        {
          showadd && (
            <>
              <div className="offcanvas offcanvas-end" tabindex="-1" id="staticBackdrop101" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Assignment</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0  ">
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                    <input type="email" class="form-control form-control-sm" value={title} onChange={(e) => handleTitle(e.target.value)} id="exampleFormControlInput1" placeholder="Select Title" />
                  </div>
                  <div className='pt-1'>
                    {isValidTitleRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Valid title is required
                      </p>
                    )}
                  </div>

                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={classId} onChange={handle} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        classData.map(item => (
                          <option value={`${item.classId}, ${item.classNo}`}>{item.classNo}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                    <select class="form-select  form-select-sm form-focus   label-color" value={sectionId} onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        sectionData.map(item =>
                          <option value={item.sectionId}>{item.sectionName}</option>
                        )
                      }

                    </select>
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        subjectData.map(item =>
                          <option value={item.subjectId}>{item.subjectName}</option>
                        )
                      }

                    </select>
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Teacher</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={teacher} onChange={(e) => setTeacher(e.target.value)} aria-label="Default select example">
                      <option selected>--Choose--</option>
                      {
                        teacherData.map(item =>
                          <option value={item.subjectId}>{item.staffName}</option>
                        )
                      }

                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Total Marks</label>
                    <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" value={totalMarks} onChange={(e) => handleMarks(e.target.value)} placeholder="Select Title" />
                  </div>
                  <div className='pt-1'>
                    {isValidMarksRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Valid marks is required
                      </p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Start Day</label>
                    <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1" value={startDay} onChange={(e) => handleStartDate(e.target.value)} placeholder="Select Class" />
                  </div>
                  <div className='pt-1'>
                    {isValidStartDateRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Valid start date is required
                      </p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">End Day</label>
                    <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1" value={endDay} onChange={(e) => handleEndDate(e.target.value)} placeholder="Select Class" />
                  </div>
                  <div className='pt-1'>
                    {isValidEndDayDateRequired && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                        Valid end date is required
                      </p>
                    )}
                  </div>
                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label heading-16">Assignment Upload </label>
                    <input type="file" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setAssignmentUpload(e.target.value)} placeholder="Select Class" />
                  </div>
                  <div className="mb-1  ">
                    <label for="exampleFormControlInput1" className="form-label  heading-16">Status</label>
                    <select class="form-select  form-select-sm form-focus  label-color" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                      <option >--Choose--</option>
                      <option value="active">Active</option>
                      <option value="inactive">InActive</option>

                    </select>
                  </div>
                  <div className='my-button11 '>
                    <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={MyAssignmntPutApi}>Update Assignment</button>
                    <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
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
                        <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={()=> AssignmnttttDeleteByIdApi(IdForDelete)} >Delete</button>
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

export default Assign_publish
