import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewExamCategoryApi, deleteExamCategoryApi, getExamCategoryDataApi, getExamCategoryDataByIdApi, updateExamCategoryDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import AddExamCategory from '../Modals/Examination/AddExamCategory';
import { useForm } from 'react-hook-form';

const Container = styled.div`

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .modalLightBorder{
        border-bottom: 1px solid var(--modalBorderColor);
    }

    .correvtSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -16% !important;
        background-color: #2BB673;
        width: 73px;
        height: 73px;
        align-items: center;
    }

    .deleteSVG{
        position: relative;
        width: fit-content ;
        margin-left: 43% !important;
        margin-bottom: -18% !important;
        background-color: #fff;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .greenBgModal{
        background-color: var(--breadCrumActiveTextColor);
    }

    .greenText{
        color: var(--breadCrumActiveTextColor);
    }

    .orangeText{
        color: var(--OrangeBtnColor);
    }

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    .infoIcon{
        cursor: pointer;
    }
    
    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }
`;


const ExamCategory = () => {

    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    // Data States
    const [ExamCategoryData, setExamCategoryData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')
    const [addValue, setAddValue] = useState(true);
    const [ExamCategoryById, setExamCategoryById] = useState('');
    const [deleteExamCategoryId, setDeleteExamCategoryId] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllExamCategoryData();
    }, [token, pageNo, addValue])

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handleAddNewExam = () => {
        setAddValue(true);
    }

    // Get all Exam category data for table
    const getAllExamCategoryData = async () => {
        try {
            setloaderState(true);
            var response = await getExamCategoryDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setExamCategoryData(response?.data?.categories);
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    if (addValue) {
                        const offcanvasElement = document.getElementById('addCategory_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                        setAddValue(false)
                    }
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error during fetching data:', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
    }

    // Get Exam category data by id
    const getExamCategoryDataById = async (id) => {
        setExamCategoryById(id)
        try {
            setloaderState(true);
            var response = await getExamCategoryDataByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setValue('examCategoryName', response?.data?.Category?.examCategoryName);
                    // toast.success(response.data.message);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch { }
    }

    // Delete Exam category data
    const DeleteExamCategory = async () => {
        if (isChecked) {
            try {
                setloaderState(true);
                var response = await deleteExamCategoryApi(deleteExamCategoryId);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setloaderState(false);
                        toast.success(response?.data?.message)
                        getAllExamCategoryData();
                        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                    }
                }
                else {
                    toast.error(response?.error);
                }
            }
            catch (error) {
                console.error('Error during login:', error);
            }
        }
    }

    // Update Exam category data
    const updateExamCategoryById = async (data) => {
        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append('examCategoryName', data?.examCategoryName)
            var response = await updateExamCategoryDataApi(ExamCategoryById, formData);

            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    getAllExamCategoryData();
                    const offcanvasElement = document.getElementById('Edit_staticBackdrop');
                    if (offcanvasElement) {
                        let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (!offcanvas) {
                            offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                        }
                        offcanvas.hide();
                    }
                }
            } else {
                toast.error(response?.error);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    return (
        <>
            <Container>
                {loaderState && (<DataLoader />)}
                {/* All Data */}
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/examCategory" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Exam Category</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Exam Category List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">

                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                    {/* <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to CSV</span>
                                                </span>
                                            </Link>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" >
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to PDF</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div> */}
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                                    <div className="row gap-md-0 gap-sm-3">
                                        <div className="col-md-7 col-sm-12 col-7 text-sm-end text-start ps-0">
                                            <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                                <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllExamCategoryData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-5 col-sm-12 col-5 text-sm-end text-start">
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#addCategory_staticBackdrop" aria-controls="addCategory_staticBackdrop">
                                                <span className="btn ps-0 pe-0 addCategoryButtons text-white font14">+ ADD Exam Category</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            {ExamCategoryData
                                ?
                                <>
                                    <table className="table align-middle table-striped">
                                        <thead>
                                            <tr>
                                                <th className='text-start'><span className='font14'>#</span></th>
                                                <th><span className='font14'>Title</span></th>
                                                <th className='text-end'><span className='font14'>Action</span></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ExamCategoryData.map((item, index) => (
                                                <tr key={item.categoryId} className='my-bg-color align-middle'>
                                                    <th className='text-start greyText'><h3>{index + 1}</h3></th>
                                                    <td className='greyText'><h3>{item.examCategoryName}</h3></td>
                                                    <td className='text-end'>
                                                        <div className="dropdown dropdownbtn">
                                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                <span>Action</span>
                                                            </button>
                                                            <ul className="dropdown-menu">
                                                                <li>
                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getExamCategoryDataById(item.categoryId)}>
                                                                        Edit
                                                                    </button>
                                                                </li>
                                                                <li>
                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteExamCategoryId(item.categoryId)}>
                                                                        Delete
                                                                    </button>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    <div className="d-flex">
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
                                </>
                                :
                                <div className='p-1 font12 text-danger'>No Data Found !!</div>
                            }
                        </div>
                    </div>
                </div>

                {/* Add Data */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addCategory_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Create ExamCategory</span>
                    </div>
                    <div className="offcanvas-body scrollBarHide">
                        {loaderState && (<DataLoader />)}
                        <div className="" style={{ zIndex: -1 }}>
                            <AddExamCategory setAddedExam={handleAddNewExam} />
                        </div>
                    </div>
                </div>

                {/* Update Data */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Edit Exam Category</span>
                    </div>
                    <div className="offcanvas-body p-0 scrollBarHide">
                        {loaderState && (<DataLoader />)}
                        <div className="" style={{ zIndex: -1 }}>
                            <form className='p-3' onSubmit={handleSubmit(updateExamCategoryById)}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label font14">Name</label>
                                    <input id="examCategoryName" type="text" className={`form-control font14 ${errors.examCategoryName ? 'border-danger' : ''}`} placeholder="Enter Exam Category Name" {...register('examCategoryName', { required: 'Exam Category Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Exam Category Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Exam Category Name'; } return true; } })} />
                                    {errors.examCategoryName && <p className="font12 text-danger">{errors.examCategoryName.message}</p>}
                                </div>
                                <p className='text-center p-3'>
                                    <button className='btn updateButtons text-white' type='submit' >Update</button>
                                    <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Delete Data */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />

                            </svg>
                        </Link>
                        <span className="offcanvas-title font14" id="staticBackdropLabel">Delete Exam Category</span>
                    </div>
                    <div className="offcanvas-body p-0 scrollBarHide">
                        {loaderState && (<DataLoader />)}
                        <div className="" style={{ zIndex: -1 }}>
                            <p className='modalLightBorder p-2'>Exam Category</p>
                            <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                            <p className='text-center warningHeading'>Are you Sure?</p>
                            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                            <p className='text-center p-3'>
                                <button className='btn deleteButtons text-white' onClick={() => DeleteExamCategory(deleteExamCategoryId)}>Delete</button>
                                <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </div>
                    </div>
                </div>

                <Toaster />
            </Container>
        </>
    )
}

export default ExamCategory
