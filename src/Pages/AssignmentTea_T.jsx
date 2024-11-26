
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { TeacherClassGetApi } from '../Utils/Apis'
import { TeacherSectionRoomByIdGetApi } from '../Utils/Apis'
import Assign_publish from './Assign_publish_T';
import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import Assign_archieves from '../Pages/Assign_archieves_T';
import Assign_draft from '../Pages/Assign_draft_T';
import { TeacherAssignmntGetAllApi } from '../Utils/Apis';
import Add_assign_offcnvs from './Add_assign_offcnvs_T';
import { useLocation } from 'react-router-dom';

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
height: fit-content;
overflow : scroll;

    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        background-color: #F0F8F7;
        padding: 10px;
        cursor: pointer;
        /* height: 20px; */
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    @media screen and (max-width: 598px) and (min-width: 576px) {
        .fontSizeResponsive{
            font-size: 14px !important;
        }
    }

    @media screen and (max-width: 575px) and (min-width: 6px) {
        .fontSizeResponsive{
            
        }
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



const AssignmentTeacher = () => {
  const location = useLocation();
  const [loader, setLoader] = useState(false)
  const [forDelete, setForDelete] = useState(false)

  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)

  const [searchKey, setSearchKey] = useState('')
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [classdata, setClassdata] = useState([])
  const [assignmntdata, setAssignmntdata] = useState()
  const [sectionData, setSectionData] = useState([])
  const [subjectData, setSubjectData] = useState([])
  const [examCategoryData, setExamCategoryData] = useState([])
  const [sessionAllData, setSessionAllData] = useState([])
  const [marksAllData, setMarksAllData] = useState([])
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)
  const [title, setTitle] = useState()

  const [classId, setClassId] = useState()
  const [sectionId, setSectionId] = useState()
  const [subjectId, setSubjectId] = useState()
  const [singleState, setSingleState] = useState('published');

  const [isValidFromDateRequired, setIsValidFromDateRequired] = useState(false);

  const PageNO = location.state;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); 
  };

  useEffect(() => {
    UpdatClassGetApi()
    if (classId) {
      MySectionGetApi()
      MySubjectByClassIdGetApi()
    }

    MyAssignmntGetApi()
    setPageNo(PageNO)
  }, [classId, subjectId, sectionId,pageNo,PageNO])

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
      console.log('Subject-get-all-api in Assignmnt', response);
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

  // Get all assignmnt 
  const MyAssignmntGetApi = async () => {
    setLoader(true)
    try {
      const response = await TeacherAssignmntGetAllApi(sectionId, subjectId, searchKey, pageNo, pageSize);
      console.log('Assignmnt-get-all-api in Assignmenttttt_______', response);
      if (response?.status === 200) {
        setSearch(true)
        // toast.success(response?.data?.msg)
        setAssignmntdata(response?.data)
        setLoader(false)
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [search, setSearch] = useState(false)

  const data = assignmntdata;

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
                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Assignments</Link></li>
              </ol>
            </nav>
          </div>
          <div className='d-flex g-1 for-media-query'>
            <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Add Assignment</Link>
          </div>
        </div>
        <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>Assignments Details</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}
          <div className="row p-3">
            <div className="col-lg-4 col-md-6 col-sm-12 ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                  <option value="" >--Choose--</option>
                  {
                    classdata.map(item =>
                      <option value={item.classId}>{item.classNo}</option>
                    )
                  }

                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 ">
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Section</label>
                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                  <option value="" >All Class</option>
                  {
                    sectionData.map(item =>
                      <option value={item.sectionId}>{item.sectionName}</option>

                    )
                  }
                </select>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12">
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


          </div>
          {/* ####### buttons ######  */}

          {/* --------------   */}

          <div className="container-fluid">
            <div className="row">
              <div className="row pb-3 ms-1">
                <div className="bg-white rounded-2 p-2 ">
                  <div className="row border-bottom border-2 ">
                    <div className="col-xxl-12 col-xl-12 col-sm-12 col-12">

                      <div className="row pb-2 gap-sm-0 gap-3 ">
                        <div className="col-md-2 col-sm-6 col-12 text-center ">
                          <span className={`font16 fontSizeResponsive px-0 fontWeight500 ps-3 pb-2 pe-3 heading-16  ${singleState === 'published' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('published') }}>Published</span>
                        </div>
                        <div className="col-md-2 col-sm-12 col-12 text-center px-0">
                          <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16 ${singleState === 'drafts' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('drafts') }}>Drafts</span>
                        </div>
                        <div className="col-md-2 col-sm-12 col-12 text-center">
                          <span className={`font16 fontSizeResponsive px-0 fontWeight500  ps-3 pb-2 pe-3 heading-16  ${singleState === 'archives' ? 'ActiveState' : 'InActiveState'}`} onClick={() => { setSingleState('archives') }}>Archives</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {
                    search ?
                      <div className="row">
                        {
                          singleState === 'published' && (<Assign_publish data={data} />)
                        }
                        {
                          singleState === 'drafts' && (<Assign_draft />)
                        }
                        {
                          singleState === 'archives' && (<Assign_archieves />)
                        }
                      </div>
                      :
                      <></>
                  }
                </div>
              </div>
            </div>
          </div>
          {/* --------------   */}


        </div>
        {/* ################## Off Canvas Area ####################  */}

        {/* ##### offcanvas added start ########  */}
        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
          {
            show && (
              <>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Assignment</h5>
                </div>
                <hr className='' style={{ marginTop: '-3px' }} />
                <div className="offcanvas-body pt-0">

                  <Add_assign_offcnvs />
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
      </div>

    </Container>
  )
}

export default AssignmentTeacher
