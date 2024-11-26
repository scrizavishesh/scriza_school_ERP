import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import toast from 'react-hot-toast';
import { deleteGradeApi, getGradeDataApi, getGradeDataByIdApi, updateGradeByIdApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import AddGradePage from '../Modals/Examination/AddGradePage';
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

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }

    
`;


const Grades = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    const [AllGradeData, setAllGradeData] = useState([]);
    const [searchByKey, setSearchByKey] = useState('')
    const [addGrade, setAddGrade] = useState('');
    const [deleteGradeId, setDeleteGradeId] = useState('');
    const [GradeId, setGradeId] = useState(0);

    const [isChecked, setIsChecked] = useState(false);


    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    // Pagination

    useEffect(() => {
        getAllGradeData();
    }, [token, pageNo, addGrade])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };


    const getAllGradeData = async () => {
        try {
            setloaderState(true);
            var response = await getGradeDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAllGradeData(response?.data?.grades);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)

                    if (addGrade) {
                        const offcanvasElement = document.getElementById('addCategory_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                        setAddGrade(false)
                    }
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error while fetching data: ', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
    }

    const DeleteGrade = async () => {
        if (isChecked) {
            try {
                console.log('first')
                var response = await deleteGradeApi(deleteGradeId);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        toast.success(response?.data?.message)
                        getAllGradeData();
                        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                            setIsChecked(false)
                        }
                    }
                    else {
                        setloaderState(false);
                        toast.error(response?.data?.message)
                    }
                } else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } catch (error) {
                setloaderState(false);
                console.error('Error during update:', error);
                toast.error('Error during update:', error)
            }
        }
        else {
            toast.error('Please Agree to Delete Grade')
        }
    }


    const getGradeDataById = async (id) => {
        try {
            setloaderState(true);
            setGradeId(id)
            const idd = parseInt(id)
            var response = await getGradeDataByIdApi(idd);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setValue('grade', response?.data?.grade?.grade)
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error during update:', error);
            toast.error('Error during update:', error)
        }
    }

    const EditGrades = async (data) => {
        try {
            setloaderState(true)
            const formData = new FormData();
            formData.append('grade', data?.grade)
            var response = await updateGradeByIdApi(GradeId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    getAllGradeData();
                    const offcanvasElement = document.getElementById('Edit_staticBackdrop');
                    if (offcanvasElement) {
                        let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                        if (!offcanvas) {
                            offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                        }
                        offcanvas.hide();
                    }
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error during update:', error);
            toast.error('Error during update:', error)
        }
    }

    const handleAddNewExam = () => {
        setAddGrade(true);
    }



    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/examCategory" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Grades</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Grades List</p>
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
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
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
                                        <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                            <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                                <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllGradeData}>Search</span></button>
                                            </form>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#addCategory_staticBackdrop" aria-controls="addCategory_staticBackdrop">
                                                <span className="btn ps-0 pe-0 addButtons text-white font14">+ Add Grades</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th className='text-center'><span className='font14'>#</span></th>
                                        <th><span className='font14'>Grade</span></th>
                                        <th><span className='font14'>Grade Point</span></th>
                                        <th><span className='font14'>Mark From</span></th>
                                        <th><span className='font14'>Mark Upto</span></th>
                                        <th className='text-center'><span className='font14'>Action</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {AllGradeData.map((item, index) => (
                                        <tr key={item.id} className='my-bg-color align-middle'>
                                            <th className='text-center greyText'><h3>{index + 1}</h3></th>
                                            <td className='greyText'><h3>{item.grade}</h3></td>
                                            <td className='greyText'><h3>{item.gradePoint}</h3></td>
                                            <td className='greyText'><h3>{item.marksFrom}</h3></td>
                                            <td className='greyText'><h3>{item.marksUpTo}</h3></td>
                                            <td className='text-center'>
                                                <div className="dropdown dropdownbtn">
                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Action</span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getGradeDataById(item.id)}> Edit </button> </li>
                                                        <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteGradeId(item.id)}> Delete </button> </li>
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

                        </div>
                    </div>

                    {/* Add */}
                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="addCategory_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header ps-0 modalHighborder p-2">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <span className="offcanvas-title font14" id="staticBackdropLabel">Create Grade</span>
                        </div>
                        <div className="offcanvas-body scrollBarHide">
                            {loaderState && (<DataLoader />)}
                            <div className="" style={{ zIndex: -1 }}>
                                <AddGradePage setAddValue={handleAddNewExam} />
                            </div>
                        </div>
                    </div>

                    {/* Edit */}
                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header modalHighborder p-2">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <span className="offcanvas-title font14" id="staticBackdropLabel">Edit Grade</span>
                        </div>
                        <div className="offcanvas-body p-0 scrollBarHide">
                            {loaderState && (<DataLoader />)}
                            <div className="container-fluid" style={{ zIndex: -1 }}>
                                <div className="row">
                                    <form className='p-3' onSubmit={handleSubmit(EditGrades)}>
                                        <div className="mb-3">
                                            <label htmlFor="exampleInputEmail1" className="form-label font14">Name</label>
                                            <input id="grade" type="text" className={`form-control font14 ${errors.grade ? 'border-danger' : ''}`} placeholder="Enter Grade" {...register('grade', { required: 'Grade is required *', validate: value => { const allowedGrades = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E', 'F']; if (!allowedGrades.includes(value)) { return 'Grade must be one of A1, A2, B1, B2, C1, C2, D1, D2, E, F'; } return true; } })} />
                                            {errors.grade && <p className="font12 text-danger">{errors.grade.message}</p>}
                                        </div>
                                        <p className='text-center p-3'>
                                            <button className='btn updateButtons text-white' type='button' onClick={EditGrades}>Update</button>
                                            <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delete */}
                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header modalHighborder p-2">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />

                                </svg>
                            </Link>
                            <span className="offcanvas-title font14" id="staticBackdropLabel">Delete Grade</span>
                        </div>
                        <div className="offcanvas-body p-0 scrollBarHide">
                            {loaderState && (<DataLoader />)}
                            <div className="" style={{ zIndex: -1 }}>
                                <p className='modalLightBorder p-2'>Grade</p>
                                <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                <p className='text-center warningHeading'>Are you Sure?</p>
                                <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                <p className='text-center p-3'>
                                    <button className='btn deleteButtons text-white' type='button' onClick={DeleteGrade}>Delete</button>
                                    <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Grades




// 726
