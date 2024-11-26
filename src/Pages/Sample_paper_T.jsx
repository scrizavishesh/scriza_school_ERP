import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { TeacherClassGetApi } from '../Utils/Apis'
import { TeacherSectionRoomByIdGetApi } from '../Utils/Apis'
import { TeacherSamplePaperPostApi } from '../Utils/Apis'
import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import { TeacherGetTeacherGetAll } from '../Utils/Apis'
import { TeacherSampleGetAllApi } from '../Utils/Apis'
import { TeacherSampleGetByIdApi } from '../Utils/Apis'
import { TeacherSamplePDF } from '../Utils/Apis'
import { TeacherSampleDeleteApi } from '../Utils/Apis'
import { TeacherSamplePutApi } from '../Utils/Apis'
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

const Sample_paper = () => {

    const [loader, setLoader] = useState(false)
    const [forDelete, setForDelete] = useState(false)
    const token = localStorage.getItem('token');
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [searchKey, setSearchKey] = useState('')
    const [showadd, setShowadd] = useState(true)
    const [hideedit, setHideedit] = useState(false)
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [classId, setClassId] = useState()
    const [idForUpdate, setIdForUpdate] = useState()
    const [idForDelte, setIdForDelete] = useState()
    const [sectionId, setSectionId] = useState()
    const [subjectId, setSubjectId] = useState()
    const [teacherId, setTeacherId] = useState()
    const [file, setFile] = useState()
    const [status, setStatus] = useState()
    const [classdata, setClassdata] = useState([])
    const [sectionData, setSectionData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [teacherData, setTeachertData] = useState([])
    const [sampleData, setSampleDataAll] = useState([])
    const [title, setTitle] = useState()
    const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [idForPDF, setIdForPDF] = useState()
    const [PDFResponse, setPDFResponse] = useState()

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); 
    };

    // pdf 
    const base64ToBlob = (base64Data, contentType) => {
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
            const slice = byteCharacters.slice(offset, offset + 512);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    useEffect(() => {
        DownloadPDF();
    }, [token, idForPDF])

    // PDF Download Response
    const DownloadPDF = async () => {
        try {
            const response = await TeacherSamplePDF(idForPDF);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message);
                    setPDFResponse(response?.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    // Handle PDF Download in Device
    const handleDownloadPdf = (id) => {
        setIdForPDF(id)
        const { pdf } = PDFResponse;
        const blob = base64ToBlob(pdf, 'application/pdf');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'driver.pdf';
        link.click();
        DownloadPDF()
    };


    useEffect(() => {
        if (token) {
            UpdatClassGetApi();
        }
    }, [token]);

    useEffect(() => {
        if (token || pageNo) {
            MySampleGetApi();
        }
        if (classId) {
            MySectionGetApi();
            MySubjectByClassIdGetApi();
        }
        if (classId && subjectId) {
            MyTeacherByClassIdGetApi();
        }
    }, [token, classId, subjectId,pageNo]);

    // ###### validation ##########
    const [errors, setErrors] = useState({});


    const FuncValidation = () => {
        let isValid = true;

        // title
        if (!title || title === "" || !/^[A-Za-z\s]+$/.test(title)) {
            setIsValidTitleRequired(true)
            isValid = false
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
    // ###### validation ##########

    // Get All Api from class list page for id 
    const UpdatClassGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassGetApi();
            console.log('class-get-all-api in Marks', response);
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
            console.log('SECTION-get-all-api in sample paper', response);
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

        setLoader(true)
        try {
            const response = await TeacherSubjectByClassIdInSyllabusGetAllApi(classId);
            console.log('Subject-get-all-api in sample paper', response);
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
            console.log('Teacher-get-all-api in Sample paper', response);
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

    // post Api 
    const SampleDataApi = async () => {
        if (FuncValidation()) {
            setLoader(true)
            {
                const formData = new FormData()
                formData.append('title', title);
                formData.append('ClassId', classId);
                formData.append('sectionId', sectionId);
                formData.append('subjectId', subjectId);
                formData.append('teacherId', teacherId);
                formData.append('status', status);
                formData.append('file', file);
                try {
                    const response = await TeacherSamplePaperPostApi(formData);
                    if (response?.data?.status === "success") {
                        toast.success(response?.data?.message);
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
                } catch (error) {
                    console.log(error)
                }
            }
        }

    }

    // Get All Api sample paper
    const MySampleGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherSampleGetAllApi(searchKey, pageNo, pageSize);
            console.log('Get-get-all-api in Sample', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setSampleDataAll(response?.data?.samplePaper)
                setCurrentPage(response?.data?.currentPage);
                setTotalPages(response?.data?.totalPages);
                setLoader(false)

            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Delete api
    const MySampleDeleteApi = async (id) => {
        setLoader(true)
        try {
            const response = await TeacherSampleDeleteApi(id);
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
    // Get By Id
    const MySampleGetByIdApi = async (id) => {
        setIdForUpdate(id)
        setLoader(true)
        try {
            const response = await TeacherSampleGetByIdApi(id);
            console.log('Get by id data in sample paperrrrrr', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setTitle(response?.data?.SamplePaper?.title)
                setClassId(response?.data?.SamplePaper?.classId)
                setSectionId(response?.data?.SamplePaper?.sectionId)
                setSubjectId(response?.data?.SamplePaper?.subjectId)
                setTeacherId(response?.data?.SamplePaper?.teacherId)
                setStatus(response?.data?.SamplePaper?.status)

                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    //  Put api sample
    const MySamplePutApi = async () => {
        if (FuncValidation()) {
            setLoader(true)
            try {
                const formData = new FormData()
                formData.append('title', title);
                formData.append('ClassId', classId);
                formData.append('sectionId', sectionId);
                formData.append('subjectId', subjectId);
                formData.append('teacherId', teacherId);
                formData.append('status', status);

                const response = await TeacherSamplePutApi(idForUpdate, formData);
                console.log('My-Sample-put-Api-response', response)

                if (response?.status === 200) {
                    toast.success(response?.data?.mess);
                    setShowadd(false)
                    setHideedit(true)
                    MySampleGetApi()
                    setLoader(false)
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef22.current);
                    offcanvasInstance.hide();
                    setTimeout(() => {
                        setShowadd(true)
                    }, 0.5)
                } else {
                    toast.error(response?.data?.msg);
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
            <div className="container-fluid main-body p-3">

                <div className='d-flex justify-content-between for-dislay-direction'>
                    <div className="breadCrum ms-2">
                        <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol className="breadcrumb ms-2">
                                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                                <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Sample Paper</Link></li>
                            </ol>
                        </nav>
                    </div>
                    <div className='d-flex g-1 for-media-query'>

                        <Link type="button" className="btn btn-success heading-16 my-own-button me-3 " data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" to={''}>+ Add Sample Paper</Link>
                    </div>
                </div>
                <h5 className='ms-3 mb-2 margin-minus22 heading-16' style={{ marginTop: '-12px' }}>Sample Paper Details</h5>

                <div className="main-content-conatainer pt-1 ">
                    {/* ###### copy content till here for all component ######  */}
                    <div className="row p-3">
                        <div className="col-lg-4 col-md-6 col-sm-12 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14">Class</label>
                                <select class="form-select  form-select-sm form-focus label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                                    <option value="" >--Choose--</option>
                                    {
                                        classdata?.map(item =>
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
                                    <option value="" >A--Choose--</option>
                                    {
                                        sectionData?.map(item =>
                                            <option value={item.sectionId}>{item.sectionName}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color heading-14">Subject</label>
                                <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                    <option selected>--Choose--</option>
                                    {
                                        subjectData?.map(item =>
                                            <option value={item.subjectId}>{item.subjectName}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </div>

                    </div>
                    {/* ####### buttons ######  */}
                    <div className="row mb-3 buttons-topss">
                        <div className='my-button11 heading-16'>
                            <button type="button" class="btn btn-outline-success my-green" onClick={MySampleGetApi}>Search</button>
                            <button type="button" class="btn btn-outline-success">Cancel</button>
                        </div>
                    </div>


                    <div className="table-container px-3 table-responsive">
                        <table className="table table-sm table-striped">
                            <thead className=''>
                                <tr className='heading-16 text-color-000' style={{ fontWeight: '500' }} >
                                    <th className='' style={{ width: '6%' }}>#</th>
                                    <th style={{ width: '8%' }}>Title</th>
                                    <th style={{ width: '8%' }}>Class</th>
                                    <th style={{ width: '8%' }} >Section</th>
                                    <th style={{ width: '8%' }}>Subject</th>
                                    <th style={{ width: '8%' }} >Sample Paper Details</th>
                                    <th style={{ width: '8%' }} >Action</th>
                                </tr>
                            </thead>
                            <tbody className='heading-14 align-middle greyTextColor'>

                                {
                                    sampleData.map((item, index) => (
                                        <tr className='heading-14' key={index} >
                                            <td className=' greyText'>{index + 1}</td>
                                            <td className=' greyText' >{item.title}</td>
                                            <td className=' greyText' >{item.classNo}</td>
                                            <td className=' greyText' >{item.sectionName}</td>
                                            <td className=' greyText' >{item.subjectName}</td>
                                            <td className=' greyText d-flex ' >
                                                <p  >
                                                    <svg className='mt-4' width="18" height="20" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M16.5221 0.119141L19.9829 3.59088L19.9695 3.60365L16.5515 3.60623L16.5195 0.121719L16.5221 0.119141Z" fill="#F1F1F1" />
                                                        <path d="M7.23135 5.59891C7.23135 6.25762 6.86338 6.56875 6.29859 6.5643C6.22131 6.5643 6.135 6.5643 6.08203 6.55217V4.74854C6.135 4.73641 6.22512 4.72363 6.36439 4.72363C6.89977 4.72369 7.23521 5.0265 7.23135 5.59891Z" fill="#F1F1F1" />
                                                        <path d="M4.44158 5.12072C4.44158 5.40309 4.23709 5.57113 3.90621 5.57113C3.81609 5.57113 3.75029 5.56668 3.69727 5.55455V4.74057C3.74262 4.72844 3.82822 4.71631 3.95473 4.71631C4.26586 4.71631 4.44158 4.86707 4.44158 5.12072Z" fill="#F1F1F1" />
                                                        <path d="M2.36254 2.54395H13.0959V8.74117H2.36254H2.33635H0.0625V2.54395H2.33629H2.36254Z" fill="#F1F1F1" />
                                                        <path d="M11.4759 11.9407C11.4835 12.584 11.0721 13.8394 11.0721 13.8394C10.9301 13.6899 10.6465 12.89 10.6465 12.1502C10.6465 11.4104 10.8855 11.2085 11.0721 11.2085C11.2592 11.2085 11.4681 11.298 11.4759 11.9407Z" fill="#DC1D00" />
                                                        <path d="M15.9554 17.5515C15.9554 18.4012 14.4156 18.0548 13.4688 17.1534C13.4688 17.1534 15.9554 16.7023 15.9554 17.5515Z" fill="#DC1D00" />
                                                        <path d="M7.02048 20.3501C6.25829 19.8939 8.62026 18.489 9.04641 18.4443C9.04641 18.4443 7.81846 20.8273 7.02048 20.3501Z" fill="#DC1D00" />
                                                        <path d="M11.4308 15.2373C11.864 16.0443 12.7239 16.9937 12.7239 16.9937C12.7239 16.9937 12.3948 17.0307 11.6302 17.2179C10.8654 17.405 10.4814 17.5993 10.4814 17.5993C10.4814 17.5993 10.4814 17.5993 10.7952 16.8966C11.1095 16.1937 11.4308 15.2373 11.4308 15.2373Z" fill="#DC1D00" />
                                                        <path d="M19.9957 3.60389V23.8829H2.3623V8.74121H13.0956V2.54398H2.3623V0.116211H16.5195L16.522 0.119375L16.5195 0.121894L16.5514 3.60641L19.9695 3.60383L19.9829 3.59105L19.9957 3.60389Z" fill="#DC1D00" />
                                                        <path d="M9.04664 18.4441C8.62055 18.4888 6.25852 19.8938 7.0207 20.3499C7.81869 20.8272 9.04664 18.4441 9.04664 18.4441ZM13.469 17.1536C14.4158 18.055 15.9556 18.4014 15.9556 17.5516C15.9556 16.7025 13.469 17.1536 13.469 17.1536ZM12.724 16.9938C12.724 16.9938 11.8641 16.0445 11.4309 15.2375C11.4309 15.2375 11.1096 16.1939 10.7953 16.8967C10.4815 17.5995 10.4815 17.5995 10.4815 17.5995C10.4815 17.5995 10.8655 17.4052 11.6303 17.218C12.395 17.0309 12.724 16.9938 12.724 16.9938ZM11.0719 13.8396C11.0719 13.8396 11.4833 12.5842 11.4758 11.9409C11.468 11.2982 11.2591 11.2087 11.0719 11.2087C10.8854 11.2087 10.6464 11.4105 10.6464 12.1504C10.6464 12.8902 10.93 13.6902 11.0719 13.8396ZM11.5881 14.8114C12.0067 15.716 13.1579 16.8814 13.1579 16.8814C13.1579 16.8814 13.5311 16.7843 15.0708 16.7473C16.6111 16.7102 16.6782 17.5765 16.6852 17.6513C16.6929 17.7267 16.753 18.4141 15.5269 18.4588C14.3016 18.5036 13.0302 17.2257 13.0302 17.2257C13.0302 17.2257 12.5075 17.3081 12.0744 17.4124C11.6412 17.5171 10.2503 17.8985 10.2503 17.8985C10.2503 17.8985 9.83889 18.646 8.92717 19.8414C8.01486 21.0374 6.99328 20.948 6.7019 20.5518C6.36328 20.0918 6.62461 19.6325 7.26733 19.0344C7.91004 18.4365 9.39293 17.9406 9.39293 17.9406C9.39293 17.9406 9.69193 17.4027 10.1302 16.376C10.5684 15.3493 10.9001 14.3181 10.9001 14.3181C10.9001 14.3181 10.4663 13.333 10.3819 12.4948C10.2874 11.5601 10.3921 10.9321 11.1096 10.9244C11.8272 10.9167 12.0513 11.4553 12.0737 12.3893C12.096 13.3241 11.5881 14.8114 11.5881 14.8114Z" fill="white" />
                                                        <path d="M9.94141 4.79248V4.26514H8.30078V7.01904H8.88672V5.90576H9.88281V5.43701H8.88672V4.79248H9.94141Z" fill="#A51600" />
                                                        <path d="M7.42738 4.53967C7.1616 4.33904 6.80934 4.24512 6.28545 4.24512C5.97051 4.24512 5.66406 4.26557 5.42969 4.3026V7.01022C5.60547 7.03066 5.82736 7.05105 6.15062 7.05105C6.69051 7.05105 7.13916 6.93668 7.4292 6.69521C7.69498 6.47033 7.89057 6.10611 7.89057 5.57842C7.89057 5.09232 7.71426 4.75242 7.42738 4.53967ZM6.26535 6.56432C6.18807 6.56432 6.13281 6.56432 6.01562 6.55219V4.74855C6.13281 4.73643 6.19188 4.72365 6.33121 4.72365C6.86658 4.72365 7.20197 5.02646 7.19811 5.59893C7.19811 6.25764 6.83008 6.56877 6.26535 6.56432Z" fill="#A51600" />
                                                        <path d="M4.76453 4.46613C4.58055 4.31853 4.28061 4.24512 3.89594 4.24512C3.51578 4.24512 3.20313 4.27002 3.02734 4.3026V7.01883H3.67188V6.0365C3.73047 6.04482 3.81537 6.04928 3.89723 6.04928C4.2652 6.04928 4.58641 5.95916 4.79922 5.75859C4.96275 5.60338 5.05592 5.37398 5.05592 5.10439C5.05592 4.83416 4.9402 4.60541 4.76453 4.46613ZM3.8933 5.5708C3.80324 5.5708 3.73047 5.56635 3.67188 5.55422V4.74023C3.73047 4.72811 3.81537 4.71598 3.94182 4.71598C4.25301 4.71598 4.42867 4.86674 4.42867 5.12039C4.42867 5.40275 4.22424 5.5708 3.8933 5.5708Z" fill="#A51600" />
                                                    </svg>
                                                </p>
                                                <p className='ps-2 pt-4'>
                                                    <button className='' type="button" onClick={(e) => handleDownloadPdf(item.sampleId)}>Dowload</button>
                                                </p>
                                            </td>
                                            <td className='greyText'>
                                                <div className="dropdown my-button-show">
                                                    <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Action  &nbsp;
                                                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                                                        </svg>

                                                    </button>
                                                    <ul className="dropdown-menu anchor-color heading-14">
                                                        <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight1234" aria-controls="staticBackdrop" onClick={(e) => MySampleGetByIdApi(item.sampleId)} >Edit</Link></li>
                                                        <li><a className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="staticBackdrop" onClick={(e) => setIdForDelete(item.sampleId)}>Delete</a></li>
                                                    </ul>
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
                {
                    show && (
                        <>
                            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Add Sample Paper</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="offcanvas-body pt-0">
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => handleTitle(e.target.value)} placeholder="Select Title" />
                                    </div>
                                    <div className='pt-1'>
                                        {isValidTitleRequired && (
                                            <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                                Title is required
                                            </p>
                                        )}
                                    </div>


                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                classdata?.map(item =>
                                                    <option value={item.classId}>{item.classNo}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                        <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                sectionData?.map(item =>
                                                    <option value={item.sectionId}>{item.sectionName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                subjectData?.map(item =>
                                                    <option value={item.subjectId}>{item.subjectName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-1">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Teacher</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setTeacherId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                teacherData?.map(item =>
                                                    <option value={item.staffId}>{item.staffName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label label-color heading-16">Upload File</label>
                                        <input type="file" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setFile(e.target.files[0])} placeholder="Select Class" accept='.pdf' />
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Status</label>
                                        <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>

                                            <option value='true'>True</option>
                                            <option value='false'>False</option>
                                        </select>
                                    </div>
                                    <div className='my-button11 '>
                                        <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={SampleDataApi}>Add Smaple</button>
                                        <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                }

                {/* ##### offcanvase added  end ########  */}

                {/* ##### offcanvas edit start ########  */}
                {
                    showadd && (
                        <>
                            <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight1234" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef22}>
                                <div className="offcanvas-header">
                                    <Link data-bs-dismiss="offcanvas" ><img src="./images/Vector (13).svg" alt="" /></Link>
                                    <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Edit Sample Paper</h5>
                                </div>
                                <hr className='' style={{ marginTop: '-3px' }} />
                                <div className="offcanvas-body pt-0">

                                    <div class="mb-3">
                                        <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                        <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" value={title} onChange={(e) => handleTitle(e.target.value)} placeholder="Select Title" />
                                    </div>

                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" value={classId} onChange={(e) => setClassId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                classdata?.map(item =>
                                                    <option value={item.classId}>{item.classNo}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                        <select class="form-select  form-select-sm form-focus   label-color" value={sectionId} onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                sectionData?.map(item =>
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
                                                subjectData?.map(item =>
                                                    <option value={item.subjectId}>{item.subjectName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-1">
                                        <label for="exampleFormControlInput1" className="form-label  heading-16">Teacher</label>
                                        <select class="form-select  form-select-sm form-focus  label-color" value={teacherId} onChange={(e) => setTeacherId(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>
                                            {
                                                teacherData?.map(item =>
                                                    <option value={item.staffId}>{item.staffName}</option>
                                                )
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-1  ">
                                        <label for="exampleFormControlInput1" className="form-label   heading-16">Status</label>
                                        <select class="form-select  form-select-sm form-focus   label-color" value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                                            <option selected>--Choose--</option>

                                            <option value='true'>True</option>
                                            <option value='false'>False</option>

                                        </select>
                                    </div>
                                    <div className='my-button11 '>
                                        <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={MySamplePutApi}>Update Smaple</button>
                                        <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                                    </div>
                                </div>

                            </div>
                        </>


                    )
                }

                {/* ##### offcanvase edit end ########  */}
                {/* ################ offcanvas delete start #############  */}

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
                                                <button type="button" className="btn my-btn  button00 my-button112233RedDelete" disabled={forDelete ? false : true} onClick={(e) => MySampleDeleteApi(idForDelte)}>Delete</button>
                                                <button type="button" className="btn cancel-btn ms-2" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }

            </div>
            {/* ################ offcanvas delete end #############  */}

        </Container>
    )
}

export default Sample_paper
