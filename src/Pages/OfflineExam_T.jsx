import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import HashLoader from './HashLoaderCom';

import { TeacherOfflineExamGetAll } from '../Utils/Apis'
import { TeacherClassGetApi } from '../Utils/Apis'
import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import { TeacherExamcategoryGetAll } from '../Utils/Apis'
import { TeacherClassRoomGetApi } from '../Utils/Apis'
import { TeacherOfflinePostApi } from '../Utils/Apis'
import { TeacherOfflineDeleteApi } from '../Utils/Apis'
import { TeacherOfflineGetByIdApi } from '../Utils/Apis'
import { TeacherOfflinePutApi } from '../Utils/Apis'

import { Icon } from '@iconify/react/dist/iconify.js';
import ReactPaginate from 'react-paginate';

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
@media only screen and (max-width: 1210px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
`;

// ## style css area end ####  


const OfflineExam = () => {

    const [loader, setLoader] = useState(false)
    const [editshow, setEditshow] = useState(true)
    const [edithide, setEdithide] = useState(false)
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [forDelete, setForDelete] = useState(false)
    const [show, setShow] = useState(true)
    const [hide, setHide] = useState(false)
    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    const [examAllData, setExamAllData] = useState([])
    const [classId, setClassId] = useState()
    const [date, setDate] = useState()
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [marks, setMarks] = useState()
    const [classRoomId, setClassRoomId] = useState()
    const [examCategory, setExamCategory] = useState()
    const [sectionId, setSectionId] = useState()
    const [subjectId, setSubjectId] = useState()                
    const [classdata, setClassdata] = useState([])
    console.log('Id For Update', IdForUpdate)
    const [sectionData, setSectionData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [examCategoryData, setExamCategoryData] = useState([])
    const [sessionAllData, setSessionAllData] = useState([])
    const [classroomdata, setClassroomdata] = useState([])
    
    const [isValidDateValiRequired, setIsValidDateValiRequired] = useState(false);
    const [isValidMarksValiRequired, setIsValidMarksValiRequired] = useState(false);
    const [isValidStartTimeValiRequired, setIsValidStartTimeValiRequired] = useState(false);
    const [isValidEndTimeValiRequired, setIsValidEndTimeValiRequired] = useState(false);
    
    const [searchKey, setsearchKey] = useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); 
    };
    useEffect(() => {
        MyExamGetAllApi()
        MyExamCategory()
        UpdatClassGetApi()
        ClassRoomGetAllApi()
        if (classId) {
            MySubjectByClassIdGetApi()
        }
    }, [classId, pageNo])


    const [errors, setErrors] = useState({});
    // ###### validation ##########

    const FuncValidation = () => {
        let isValid = true;
        // marks 
        if (!marks || marks === "" || !/^[0-9]+$/.test(marks)) {
            setIsValidMarksValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // date
        if (!date || date === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date)) {
            setIsValidDateValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // start itme
        if (!startTime || startTime === "" || !/^[0-2][0-3]:[0-5][0-9]$/.test(startTime)) {
            setIsValidStartTimeValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidStartTimeValiRequired(false)
        }
        // end itme
        if (!endTime || endTime === "" || !/^[0-2][0-3]:[0-5][0-9]$/.test(endTime)) {
            setIsValidEndTimeValiRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
            setIsValidEndTimeValiRequired(false)
        }
        return isValid;
    }

    // marks 
    const handleMarks = (e2) => {
        setMarks(e2);
        const noRegex = /^[0-9]+$/;
        setIsValidMarksValiRequired(noRegex.test(e2));
        if (!e2 || e2 === "" || !noRegex.test(e2)) {
            setIsValidMarksValiRequired(true)
        } else {
            setIsValidMarksValiRequired(false)
        }
    }
    // date 
    const handleDate = (e2) => {
        setDate(e2);
        const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        setIsValidDateValiRequired(dateRegex.test(e2));

        if (!e2 || e2 === "" || !dateRegex.test(e2)) {
            setIsValidDateValiRequired(true)
        } else {
            setIsValidDateValiRequired(false)
        }
    }
    // start time 
    const handleStartTime = (e2) => {
        setStartTime(e2);
        const dateRegex = /^[0-2][0-3]:[0-5][0-9]$/;
        setIsValidStartTimeValiRequired(dateRegex.test(e2));

        if (!e2 || e2 === "" || !dateRegex.test(e2)) {
            setIsValidStartTimeValiRequired(true)
        } else {
            setIsValidStartTimeValiRequired(false)
        }
    }
    // end time 
    const handleEndTime = (e2) => {
        setEndTime(e2);
        const dateRegex = /^[0-2][0-3]:[0-5][0-9]$/;
        setIsValidEndTimeValiRequired(dateRegex.test(e2));

        if (!e2 || e2 === "" || !dateRegex.test(e2)) {
            setIsValidEndTimeValiRequired(true)
        } else {
            setIsValidEndTimeValiRequired(false)
        }
    }

    // ###### validation ##########

    // Get All Api from class list page for id 
    const UpdatClassGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassGetApi();
            console.log('class-get-all-api in  offline', response);
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
    // Subject by class id From class get all api 
    const MySubjectByClassIdGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherSubjectByClassIdInSyllabusGetAllApi(classId);
            console.log('Subject-get-all-api in offline', response);
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
    // ClassRomm Get All Api 
    const ClassRoomGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassRoomGetApi();
            console.log('class-Room-get-all-api', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setClassroomdata(response?.data?.rooms)
                // setDeleteroomid(response?.data?.rooms?.roomId)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Exam category 
    const MyExamCategory = async () => {
        setLoader(true)
        try {
            const response = await TeacherExamcategoryGetAll(searchKey);
            console.log('Exam Category-get-all-api in offline', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setExamCategoryData(response?.data?.categories)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // ----------------------------------------- 

    const offcanvasRef = useRef(null);
    const offcanvasRef22 = useRef(null);
    const offcanvasRef33 = useRef(null);

    // Post api 
    const MyMarksPostApi = async () => {

        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('categoryId', examCategory);
            formData.append('classId', classId);
            formData.append('subjectId', subjectId);
            formData.append('roomId', classRoomId);
            formData.append('totalMarks', marks);
            formData.append('date', date);
            formData.append('startingTime', startTime);
            formData.append('endingTime', endTime);
            setLoader(true)

            try {
                const response = await TeacherOfflinePostApi(formData);
                console.log('class-post-api on offline exam', response)
                if (response?.status === 200) {
                    if (response?.data?.status === "success") {
                        toast.success(response?.data?.message);
                        MyExamGetAllApi()
                        setShow(false)
                        setHide(true)
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

    }
    // Exam Get All Api   
    const MyExamGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherOfflineExamGetAll(searchKey, pageNo, pageSize);
            console.log('Exam get All Api data', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setExamAllData(response?.data?.examDetails)
                setCurrentPage(response?.data?.currentPage);
                setTotalPages(response?.data?.totalPages);
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Delete api
    const MyOfflineExamDeleApi = async (id) => {
        setLoader(true)
        try {
            const response = await TeacherOfflineDeleteApi(id);
            console.log('my-delete-api in assign leave', response)
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                MyExamGetAllApi()
                setShowdelete(false)
                setHidedelete(true)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
                setShowdelete(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Get by id 
    const MyAssignLeaveGetByIdApi = async (id) => {
        console.log('my idddd newwwww', id)
        setIdForUpdate(id)
        setLoader(true)
        try {
            const response = await TeacherOfflineGetByIdApi(id);
            console.log('Offline get by id all data', response)

            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setExamCategory(response?.data?.examDetails?.examCategoryId)
                setClassId(response?.data?.examDetails?.classId)
                setSubjectId(response?.data?.examDetails?.subjectId)
                setClassRoomId(response?.data?.examDetails?.roomNumber)
                setDate(response?.data?.examDetails?.date)
                setStartTime(response?.data?.examDetails?.startingTime)
                setEndTime(response?.data?.examDetails?.endingTime)
                setMarks(response?.data?.examDetails?.totalMarks)
                setLoader(false)
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Put Api 

    const MyOfflinePutApi = async () => {
        // console.log('my id for update', id)
        if(FuncValidation()){
            try {
                const formData = new FormData()
                formData.append('categoryId', examCategory)
                formData.append('classId', classId)
                formData.append('subjectId', subjectId)
                formData.append('roomId', classRoomId)
                formData.append('totalMarks', marks)
                formData.append('startingTime', startTime)
                formData.append('date', date)
                formData.append('endingTime', endTime)
    
                const response = await TeacherOfflinePutApi(IdForUpdate, formData);
    
                console.log('My_offline_Api', response)
                if (response?.status === 200) {
                    toast.success(response?.data?.msg);
                    setEditshow(false)
                    setEdithide(true)
                    MyHolidayGetAllApi()
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
                    offcanvasInstance.hide();
                    setTimeout(() => {
                        setEditshow(true)
                    }, 0.5)
                } else {
                    toast.error(response?.data?.msg);
                    setEditshow(true)
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
            <div className="container-fluid main-body p-3">

                <div className='d-flex justify-content-between for-dislay-direction'>
                    <div className="breadCrum ms-2">
                        <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb ms-2">
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Exam Category</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Offline Exam</Link></li>
                            </ol>
                        </nav>
                    </div>

                    <div className='d-flex g-1 for-media-query'>

                        <div>
                          
                        </div>
                        <div className='d-flex'>
                            <div className='me-2 search-responsive'>
                                <div className="input-group mb-3 search-responsive">
                                    <input type="text" className="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e) => setsearchKey(e.target.value)} />
                                    <span className="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2" onClick={MyExamGetAllApi}>Search</span>
                                </div>
                            </div>
                            <Link type="button" className="btn btn-success heading-16 my-own-button me-3" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop">+ ADD Exam</Link>

                        </div>

                    </div>

                </div>
                <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-22px' }}>Offline Exam</h5>

                <div className="main-content-conatainer pt-1 ">
                    {/* ###### copy content till here for all component ######  */}

                    <div className="table-container px-3 table-responsive">

                        <table className="table table-sm table-striped">
                            <thead className=''>
                                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                    <th className=''>#</th>
                                    <th>Exam Name</th>
                                    <th>Room Number</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                    <th>Starting Time</th>
                                    <th>Ending Time</th>
                                    <th>Total Marks</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody className='heading-14 align-middle greyTextColor'>
                                {
                                    examAllData?.map((item, index) => (
                                        <tr className='heading-14' >
                                            <td className=' greyText pe-0'>{index + 1}</td>
                                            <td className=' greyText pe-0'>{item.examCategory}</td>
                                            <td className=' greyText pe-0'>{item.roomNumber}</td>
                                            <td className=' greyText pe-0'>{item.subject}</td>
                                            <td className=' greyText pe-0'>{item.date}</td>
                                            <td className=' greyText pe-0'>{item.startingDateTime}</td>
                                            <td className=' greyText pe-0'>{item.endingDateTime}</td>
                                            <td className=' greyText pe-0'>{item.totalMarks}</td>
                                            <td className=' greyText  pe-0' >
                                                <div className="dropdown my-button-show">
                                                    <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Action  &nbsp;
                                                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="">
                                                            <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                                                        </svg>
                                                    </button>
                                                    <ul className="dropdown-menu anchor-color heading-14">
                                                        <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop101" aria-controls="staticBackdrop" onClick={() => MyAssignLeaveGetByIdApi(item.id)} >Edit</Link></li>
                                                        <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={() => setIdForDelete(item.id)}>Delete</Link></li>
                                                        <Toaster />
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
                {/* ################## Add Off Canvas Area ####################  */}

                {
                    show && (
                        <>
                            <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" >
                                        <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                                        </svg>
                                    </Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Create Exam</h5>
                                </div>
                                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                                <div class="offcanvas-body pt-0">
                                    <div className="input " >

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Exam Name</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setExamCategory(e.target.value)} aria-label="Default select example">
                                                <option value={''}>--Chosse--</option>
                                                {
                                                    examCategoryData.map(item =>
                                                        <option value={item.categoryId}>{item.examCategoryName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Class</label>
                                            <select class="form-select  form-select-sm  form-focus  label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                                                <option value={''}>--Choose--</option>
                                                {
                                                    classdata.map(item =>
                                                        <option value={item.classId}>{item.classNo}</option>
                                                    )
                                                }
                                            </select>

                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Subject</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Chosee--</option>
                                                {
                                                    subjectData.map(item =>
                                                        <option value={item.subjectId}>{item.subjectName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Class Room</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setClassRoomId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Choose--</option>
                                                {
                                                    classroomdata.map(item =>
                                                        <option value={item.roomId}>{item.roomNo}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Date </label>
                                            <input type="date" className="form-control form-focus   heading-14" onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidDateValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Date is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Starting Time</label>
                                            <input type="time" className="form-control form-focus   heading-14" onChange={(e) => handleStartTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidStartTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Start time is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Ending Time </label>
                                            <input type="time" className="form-control form-focus   heading-14" onChange={(e) => handleEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidEndTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    End time is required
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Total Marks </label>
                                            <input type="email" className="form-control form-focus heading-14" onChange={(e) => handleMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                        </div>
                                        <div className=''>
                                            {isValidMarksValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Number is required
                                                </p>
                                            )}
                                        </div>

                                        <div className='my-button11 '>
                                            <button type="button" className="btn btn-outline-success my-button112233" onClick={MyMarksPostApi}>Create Exam</button>
                                            <button type="button" className="btn btn-outline-success">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

                {/* ################## Add Off Canvas Area end ####################  */}

                {/* ################## Edit Off Canvas Area end ####################  */}
                {
                    editshow && (
                        <>
                            <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop101" aria-labelledby="staticBackdropLabel" ref={offcanvasRef22}>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" >
                                        <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                                        </svg>
                                    </Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Exam</h5>
                                </div>
                                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                                <div class="offcanvas-body pt-0">
                                    <div className="input " >

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Exam Name</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={examCategory} onChange={(e) => setExamCategory(e.target.value)} aria-label="Default select example">
                                                <option value={''}>--Chosse--</option>
                                                {
                                                    examCategoryData.map(item =>
                                                        <option value={item.categoryId}>{item.examCategoryName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Class</label>
                                            <select class="form-select  form-select-sm  form-focus  label-color" value={classId} onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                                                <option value={''}>--Choose--</option>
                                                {
                                                    classdata.map(item =>
                                                        <option value={item.classId}>{item.classNo}</option>
                                                    )
                                                }
                                            </select>

                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Subject</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={subjectId} onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Chosee--</option>
                                                {
                                                    subjectData.map(item =>
                                                        <option value={item.subjectId}>{item.subjectName}</option>
                                                    )
                                                }
                                            </select>
                                        </div>
                                        <div className="mb-1  ">
                                            <label for="exampleFormControlInput1" className="form-label  label-color heading-14">Class Room</label>
                                            <select class="form-select  form-select-sm form-focus  label-color" value={classRoomId} onChange={(e) => setClassRoomId(e.target.value)} aria-label="Default select example">
                                                <option selected>--Choose--</option>
                                                {
                                                    classroomdata.map(item =>
                                                        <option value={item.roomId}>{item.roomNo}</option>
                                                    )
                                                }
                                            </select>
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Date </label>
                                            <input type="date" className="form-control form-focus   heading-14" value={date} onChange={(e) => handleDate(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidDateValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Date is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Starting Time</label>
                                            <input type="time" className="form-control form-focus   heading-14" value={startTime} onChange={(e) => handleStartTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidStartTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Start time is required
                                                </p>
                                            )}
                                        </div>
                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Ending Time </label>
                                            <input type="time" className="form-control form-focus   heading-14" value={endTime} onChange={(e) => handleEndTime(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="100.00" />
                                        </div>
                                        <div className=''>
                                            {isValidEndTimeValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    End time is required
                                                </p>
                                            )}
                                        </div>

                                        <div className="mb-3 mt-3" style={{ marginTop: '-6px' }}>
                                            <label for="exampleFormControlInput1" className="form-label label-color heading-14">Total Marks </label>
                                            <input type="email" className="form-control form-focus heading-14" value={marks} onChange={(e) => handleMarks(e.target.value)} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="Marks" />
                                        </div>
                                        <div className=''>
                                            {isValidMarksValiRequired && (
                                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                    Number is required
                                                </p>
                                            )}
                                        </div>
                                        <div className='my-button11 '>
                                            <button type="button" className="btn btn-outline-success my-button112233" onClick={MyOfflinePutApi}>Update Exam</button>
                                            <button type="button" className="btn btn-outline-success">Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }
                {/* ################## Edit Off Canvas Area ####################  */}       

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
                                                <input className="form-check-input my-form-check-input" onClick={() => setForDelete(true)} type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label agree" for="flexCheckDefault">
                                                    I Agree to delete the Profile Data
                                                </label>
                                            </div>

                                            <div className="mt-4">
                                                <button type="button" className="btn my-btn button00" disabled={forDelete ? false : true} onClick={() => MyOfflineExamDeleApi(IdForDelete)}>Delete</button>
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

            </div>
        </Container>
    )
}

export default OfflineExam
