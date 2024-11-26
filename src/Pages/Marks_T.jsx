import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { TeacherClassGetApi } from '../Utils/Apis'
import { TeacherSectionRoomByIdGetApi } from '../Utils/Apis'
import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import { TeacherExamcategoryGetAll } from '../Utils/Apis'
import { TeacherSessionyGetAll } from '../Utils/Apis'
import { TeacherMarksGetAll } from '../Utils/Apis'
import { TeacherMarksPostApi } from '../Utils/Apis'
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

const Marks = () => {
    const [loader, setLoader] = useState(false)
    const [forDelete, setForDelete] = useState(false)

    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)

    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [setClassdata, setSetClassdata] = useState([])
    const [sectionData, setSectionData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [examCategoryData, setExamCategoryData] = useState([])
    const [sessionAllData, setSessionAllData] = useState([])
    const [marksAllData, setMarksAllData] = useState([])
    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    const [showadd, setShowadd] = useState(true)
    const [hideedit, setHideedit] = useState(false)

    const [grade, setGrade] = useState()
    const [gainMarks, setGainMarks] = useState()
    const [comments, setComments] = useState()
    const [markId, setMarkId] = useState()
    console.log(markId, 'markId')
    const [studentId, setStudentId] = useState()
    console.log(studentId, 'studentId')

    const [searchKey, setSearchKey] = useState('')
    const [classId, setClassId] = useState()
    const [classNo, setClassNo] = useState()
    const [sectionId, setSectionId] = useState()
    const [sectionName, setSectionName] = useState()
    console.log('mark id ', markId)
    console.log('student id ', studentId)
    const [subjectId, setSubjectId] = useState()
    const [subjectShow, setSubjectShow] = useState()
    const [examCategory, setExamCategory] = useState()
    const [examCategoryShow, setExamCategoryShow] = useState()
    const [sessionName, setSessionName] = useState()
    console.log('session ', sessionName)

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); 
    };

    useEffect(() => {
        UpdatClassGetApi()
        MyExamCategory()
        SessionGetAll()
        if (classId) {
            MySectionGetApi()
            MySubjectByClassIdGetApi()
        }
    }, [classId,pageNo])

    // Get All Api from class list page for id 
    const UpdatClassGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassGetApi();
            console.log('class-get-all-api in Marks', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setSetClassdata(response?.data?.classes)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Section Get All Api from section page for id 
    const MySectionGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherSectionRoomByIdGetApi(classId);
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
    const MySubjectByClassIdGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherSubjectByClassIdInSyllabusGetAllApi(classId);
            console.log('Subject-get-all-api in Marks', response);
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
    // Exam category 
    const MyExamCategory = async () => {
        setLoader(true)
        try {
            const response = await TeacherExamcategoryGetAll(searchKey);
            console.log('Exam Category-get-all-api in Marks', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setExamCategoryData(response?.data?.categories)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Session 
    const SessionGetAll = async () => {
        setLoader(true)
        try {
            const response = await TeacherSessionyGetAll(searchKey);
            console.log('Session Data', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setSessionAllData(response?.data?.sessions)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const HandleSection = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setSectionId(parseInt(val1))
        // const num = val2.trim()
        setSectionName(val2)
        console.log('my section id s = ', val1)
        console.log('my section no is = ', val2)
      }
    // Marks Post Api 
    const MyMarksPostApi = async (markId, studentId) => {

        const formData = new FormData()
        formData.append('markId', markId);
        formData.append('categoryName', examCategory);
        formData.append('classId', classId);
        formData.append('sectionId', sectionId);
        formData.append('subjectId', subjectId);
        formData.append('studentId', studentId);
        formData.append('sessionName', sessionName);
        formData.append('marks', gainMarks);
        formData.append('comments', comments);

        setLoader(true)
        try {
            const response = await TeacherMarksPostApi(formData);
            // console.log('class-post-api', response)
            if (response?.status === 200) {
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);

                    setShow(false)

                    setLoader(false)
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
    
    //   Get All 
    const MyMarksGetAll = async () => {
        setLoader(true)
        try {
            const response = await TeacherMarksGetAll(classId, sectionId, subjectId, sessionName, examCategory, searchKey, pageNo, pageSize);
            console.log('Marks All Data', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setMarksAllData(response?.data?.marks)
                setSubjectShow(response?.data?.subjectName)
                setExamCategoryShow(response?.data?.examCategory)
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
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Accounting</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Marks</Link></li>
                            </ol>
                        </nav>
                    </div>
                
                </div>
                <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>Manage Marks</h5>

                <div className="main-content-conatainer pt-1 ">
                    {/* ###### copy content till here for all component ######  */}
                    <div className="row p-3">
                        <div className="col-lg-3 col-md-6 col-sm-12 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Exam Category</label>
                                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setExamCategory(e.target.value)} aria-label="Default select example">
                                    <option value="" >All Class</option>
                                    {
                                        examCategoryData.map(item =>
                                            <option value={item.examCategoryName}>{item.examCategoryName}</option>
                                        )
                                    }

                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                                    <option value="" >All Class</option>
                                    {
                                        setClassdata.map(item =>
                                            <option value={item.classId}>{item.classNo}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Section</label>
                                <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => HandleSection(e)} aria-label="Default select example">
                                    <option value="">--Choose--</option>
                                    {
                                        sectionData.map(item =>
                                            <option  value={`${item.sectionId} , ${item.sectionName}`}>{item.sectionName}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Subject</label>
                                <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                    <option value="">--Choose--</option>
                                    {
                                        subjectData.map(item =>
                                            <option value={item.subjectId}>{item.subjectName}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Session</label>
                                <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => setSessionName(e.target.value)} aria-label="Default select example">
                                    <option value="">--Choose--</option>
                                    {
                                        sessionAllData.map(item =>
                                            <option value={item.sessionName}>{item.sessionName}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    {/* ####### buttons ######  */}
                    <div className="row mb-3 buttons-topss">
                        <div className='my-button11 heading-16'>
                            <button type="button" class="btn btn-outline-success my-green" onClick={MyMarksGetAll}>Search</button>
                            <button type="button" class="btn btn-outline-success">Cancel</button>
                        </div>
                    </div>

                    <div className="row mt-4 mb-4 bg-color-pink p-3 m-3">
                        <div className="col-1"></div>
                        <div className="col-11 ">
                            <div className="row heading-16 ">
                                <div className="col-3 p-0 ps-5">
                                    <span className='heading-16 greyText'>  Exam</span>
                                    - {examCategoryShow}
                                </div>
                                <div className="col-2 p-0 ps-4">
                                    <span className='heading-16 greyText'>Class </span>
                                    - {classId}
                                </div>
                                <div className="col-2 p-0">
                                    <span className='heading-16 greyText'> Section</span>
                                    - {sectionName}
                                </div>
                                <div className="col-4 p-0">
                                    <span className='heading-16 greyText ps-4'> Subject </span>
                                    - {subjectShow}
                                </div>

                            </div>
                        </div>
                        <div className="col-1"></div>
                    </div>
                    <div className="table-container px-3 table-responsive">
                        <table className="table table-sm table-striped">
                            <thead className=''>
                                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }}>
                                    <th className='' style={{ width: '100px' }}>#</th>
                                    <th>Student Name</th>
                                    <th>Mark</th>
                                    <th >Grade Point</th>
                                    <th>Comment</th>
                                    <th >Actions</th>
                                </tr>
                            </thead>
                            <tbody className='heading-14 align-middle greyTextColor'>

                                {
                                    marksAllData?.map((item, index) => (
                                        <tr className='heading-14' >
                                            <td className=' greyText'>{index + 1}</td>
                                            <td className=' greyText' >{item.studentName}</td>
                                            <td className=' greyText' >
                                                <input type="text" class="form-focus form-control-sm table-input " onChange={(e) => setGainMarks(e.target.value)} value={item.gainMarks} />
                                            </td>
                                            <td className=' greyText' >
                                                <input type="text" class="form-focus form-control-sm table-input " onChange={(e) => setGrade(e.target.value)} value={item.gradePoints} />
                                            </td>
                                            <td className=' greyText' >
                                                <input type="text" class="form-focus form-control-sm table-input " onChange={(e) => setComments(e.target.value)} value={item.comments} />
                                            </td>
                                            <td className=' greyText' >
                                                <div className='edit-icon' onClick={() => MyMarksPostApi(item.markId, item.studentId)}>
                                                    <svg width="45" height="32" viewBox="0 0 51 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <rect width="51" height="38" rx="5" fill="#008479" />
                                                        <path d="M24.4967 30C22.8357 29.9995 21.1984 29.6049 19.7195 28.8486C18.2405 28.0923 16.9621 26.996 15.9893 25.6496C15.0164 24.3032 14.3769 22.7452 14.1232 21.1036C13.8695 19.462 14.0089 17.7837 14.5299 16.2064C15.051 14.6292 15.9388 13.1981 17.1204 12.0306C18.302 10.8632 19.7438 9.99275 21.3272 9.49083C22.9107 8.9889 24.5906 8.86981 26.229 9.14333C27.8674 9.41686 29.4175 10.0752 30.7521 11.0643C30.9307 11.2094 31.0464 11.4178 31.0751 11.6462C31.1039 11.8745 31.0434 12.1051 30.9063 12.29C30.7693 12.4749 30.5662 12.5997 30.3393 12.6386C30.1125 12.6774 29.8794 12.6272 29.6887 12.4985C28.1135 11.3291 26.1899 10.7251 24.229 10.7844C22.2681 10.8436 20.3845 11.5626 18.8828 12.825C17.3811 14.0874 16.3492 15.8194 15.9539 17.741C15.5585 19.6626 15.8229 21.6613 16.7043 23.414C17.5857 25.1667 19.0325 26.5708 20.8108 27.3993C22.589 28.2278 24.5948 28.4323 26.5037 27.9796C28.4125 27.527 30.1129 26.4437 31.3298 24.9049C32.5467 23.3661 33.209 21.4618 33.2095 19.5C33.2082 19.0405 33.1709 18.5819 33.0978 18.1283C33.0796 18.0109 33.0847 17.8912 33.1128 17.7758C33.1409 17.6604 33.1915 17.5517 33.2616 17.4558C33.3317 17.36 33.42 17.2789 33.5215 17.2172C33.6229 17.1555 33.7356 17.1144 33.8529 17.0962C33.9703 17.078 34.09 17.0831 34.2054 17.1112C34.3208 17.1393 34.4295 17.1898 34.5254 17.26C34.6212 17.3301 34.7023 17.4184 34.764 17.5198C34.8257 17.6213 34.8668 17.7339 34.885 17.8513C34.9649 18.3971 35.0022 18.9484 34.9967 19.5C34.9944 22.284 33.8874 24.9534 31.9187 26.922C29.9501 28.8906 27.2808 29.9976 24.4967 30Z" fill="white" />
                                                        <path d="M25.614 22.8511C25.3774 22.8501 25.1508 22.7553 24.984 22.5875L20.7393 18.3428C20.5929 18.1719 20.5164 17.952 20.5251 17.7271C20.5338 17.5022 20.627 17.2888 20.7861 17.1297C20.9453 16.9705 21.1586 16.8773 21.3835 16.8686C21.6084 16.8599 21.8283 16.9364 21.9993 17.0828L25.614 20.693L36.3776 9.93387C36.5485 9.78747 36.7684 9.71097 36.9933 9.71966C37.2182 9.72835 37.4316 9.82158 37.5907 9.98073C37.7499 10.1399 37.8431 10.3532 37.8518 10.5781C37.8605 10.803 37.784 11.0229 37.6376 11.1939L26.244 22.5875C26.0772 22.7553 25.8506 22.8501 25.614 22.8511Z" fill="white" />
                                                    </svg>

                                                </div>
                                            </td>
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
                <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                    {
                        show && (
                            <>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Syllabus</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="offcanvas-body pt-0">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Select Title" />
                                    </div>
                                    <div>
                       
                                    </div>

                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                    
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                        <select class="form-select  form-select-sm form-focus   label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                     
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                       
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Upload Syllabus</label>
                                        <input type="file" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Select Class" />
                                    </div>
                                    <div>
                                    </div>
                                    <div className='my-button11 '>
                                        <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" >Add Syllabus</button>
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
                            <>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Class Routine</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="offcanvas-body pt-0">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" placeholder="Select Class" />
                                    </div>
                                    <div>
                        
                                    </div>

                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label heading-16">Class</label>
                                        <select class="form-select  form-select-sm form-focus label-color" aria-label="Default select example">
                                            <option selected >--Choose--</option>
                           
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                          
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                        <select class="form-select  form-select-sm form-focus label-color" aria-label="Default select example">
                                            <option selected>--Choose--</option>
                       
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Upload Syllabus</label>
                                        <input type="file" class="form-control form-control-sm" value={''} id="exampleFormControlInput1" placeholder="Select File" />
                                    </div>
                                    <div>
                                    </div>
                                    <div className='my-button11'>
                                        <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" >Update Syllabus</button>
                                        <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                                    </div>
                                </div>
                            </>
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
                                                <input className="form-check-input my-form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                                <label className="form-check-label agree" for="flexCheckDefault">
                                                    I Agree to delete the Profile Data
                                                </label>
                                            </div>

                                            <div className="mt-4">
                                                <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true}  >Delete</button>
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
                                            <p className='heading-20'>Successful Delete</p>
                                            <hr style={{ width: '' }} />
                                            <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                                        </div>
                                        <div className='button-position'>
                                            <button type="button" className="btn btn-outline-primary button11 mt-4 mb my-button112233" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

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

export default Marks
