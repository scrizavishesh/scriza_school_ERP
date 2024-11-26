import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { DownloadDriverExcel, DownloadDriverPDF, deleteDriverApi, getDriverDataApi, getDriverDataByIdApi, updateDriverDataApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';
import { useForm } from 'react-hook-form';

const Container = styled.div`

    .formImageInput{
        border-radius: 5px 0px 0px 5px;
    }

    .editViewBtn, .editViewBtn:active, .editViewBtn:hover{
        border-radius: 0px 5px 5px 0px;
        background-color: var(--greenTextColor);
        color: #fff;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
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

    .eventablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
    }

    .ExportBtns{
        border-radius: 3px;
        border: 1.5px solid var(--fontControlBorder);
    }

    .oddModaltablerow{
        background-color: var(--tableGreyBackgroundColor) !important;
        border-bottom: 1.5px solid var(--darkGreenBorderColor);
    }
    .form-check-input{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formdltcheck:checked{
        background-color: #B50000;
        border-color: #B50000;
    }

    .formEditSpecFeatcheck:checked{
        background-color: #00A67E;
        border-color: #00A67E;
    }

    .modalHighborder{
        border-bottom: 2px solid var(--modalBorderColor);
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
    
    .warningHeading{
        font-size: var(--font-size-20);
    }

    .warningText{
        font-size: var(--font-size-15);
        line-height: 22px;
        color: var(--greyInputTextColor) !important;
    }

    .textVerticalCenter{
        line-height: 22px;
    }
    
    .form-check-input{
        width: 18px;
        height: 18px;
    }

    .formcontrolinput{
        border-radius: 0px !important;
    }

    .contbtn{
        margin-left: 43% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;

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

const Driver = () => {

    // token
    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // driver data state
    const [driverData, setDriverData] = useState([]);
    // searchKey State
    const [searchByKey, setSearchByKey] = useState('')
    // CSV State
    const [csvData, setCSVData] = useState([])
    const [PDFResponse, setPDFResponse] = useState()
    // ID states
    const [editId, setEditId] = useState('')
    const [deleteId, setDeleteId] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    // Get By ID Data
    const [driverNameById, setDriverNameById] = useState();
    const [driverAddressById, setDriverAddressById] = useState();
    const [driverPhoneById, setDriverPhoneById] = useState();
    const [driverEmailById, setDriverEmailById] = useState();
    const [driverGenderById, setDriverGenderById] = useState();
    const [driverImageById, setDriverImageById] = useState();
    const [driverImageVal, setDriverImageVal] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)

    const { register, handleSubmit, formState: { errors }, setValue, values } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        getAllDriverData();
        if (token) {
            DownloadCSV();
            DownloadPDF();
        }
    }, [token, pageNo, isChecked])

    // Pagination
    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    // CSV Download
    const DownloadCSV = async () => {
        try {
            const response = await DownloadDriverExcel();
            if (response?.status === 200) {
                const rows = response?.data?.split('\n').map(row => row.split(','));
                setCSVData(rows);
                // setTableData(rows.slice(1));
            }
        } catch (err) {
            console.log(err);
        }
    };

    // PDF Download Response
    const DownloadPDF = async () => {
        try {
            const response = await DownloadDriverPDF();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setPDFResponse(response?.data);
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    // Handle PDF Download in Device
    const handleDownloadPdf = () => {
        const { pdf } = PDFResponse;
        const blob = base64ToBlob(pdf, 'application/pdf');
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'driver.pdf';
        link.click();
    };

    // Get All Data
    const getAllDriverData = async () => {
        try {
            setloaderState(true);
            var response = await getDriverDataApi(searchByKey, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setDriverData(response?.data?.drivers);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    // toast.success(response.data.message););
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            }
            else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false);
            console.error('Error during fetching driver:', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
    }

    // Get By Id
    const getDriverDataById = async (id) => {
        try {
            setEditId(id);
            var response = await getDriverDataByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setValue('driverName', response?.data?.driver?.driverName);
                    setValue('driverEmail', response?.data?.driver?.driverEmail);
                    setValue('driverAddress', response?.data?.driver?.driverAddress);
                    setValue('phoneNo', response?.data?.driver?.phoneNumber);
                    setValue('gender', response?.data?.driver?.gender);
                    setValue('driverImage', response?.data?.driver?.driverImage);
                    setDriverNameById(response?.data?.driver?.driverName);
                    setDriverAddressById(response?.data?.driver?.driverAddress);
                    setDriverPhoneById(response?.data?.driver?.phoneNumber);
                    setDriverEmailById(response?.data?.driver?.driverEmail);
                    setDriverGenderById(response?.data?.driver?.gender);
                    setDriverImageById(response?.data?.driver?.driverImage);
                    setDriverImageVal(response?.data?.driver?.driverImage);
                    // toast.success(response?.data?.message)
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            }
            else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false);
            console.error('Error during login:', error);
        }
    }

    // Update By Id
    const UpdateDriverData = async (data) => {
        setloaderState(true)
        try {
            const formData = new FormData();
            if (driverNameById !== data.driverName) {
                formData.append("driverName", data.driverName)
            }
            if (driverEmailById !== data.driverEmail) {
                formData.append("driverEmail", data.driverEmail)
            }
            if (driverAddressById !== data.driverAddress) {
                formData.append("driverAddress", data.driverAddress)
            }
            if (driverPhoneById !== data.phoneNo) {
                formData.append("phoneNo", data.phoneNo)
            }
            if (driverGenderById !== data.gender) {
                formData.append("gender", data.gender)
            }
            if (driverImageById !== data.driverImage) {
                formData.append("driverImage", data.driverImage)
            }
            var response = await updateDriverDataApi(editId, formData);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    getAllDriverData()
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
            }
            else {
                setloaderState(false);
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false);
            console.error('Error during login:', error);
        }
    };

    // Delete API
    const DeleteDriverDataById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteDriverApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        setloaderState(false);
                        toast.success(response?.data?.message)
                        getAllDriverData()
                        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                        setTimeout(() => {
                            setIsChecked(false)
                        }, 1000);
                    }
                    else {
                        setloaderState(false);
                        toast.error(response?.data?.message)
                    }
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                }
            }
            catch (error) {
                setloaderState(false);
                console.error('Error during login:', error);
            }
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            getAllDriverData();
        }
    };


    return (
        <>
            <Container>
                {loaderState && (<DataLoader />)}
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Driver</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Driver List</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">
                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"DriverData.csv"}>
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to CSV</span>
                                                </span>
                                            </CSVLink>
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                                            <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="button" onClick={handleDownloadPdf}>
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to PDF</span>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 col-12 text-end align-self-center">
                                    <div className="row gap-md-0 gap-sm-3">
                                        <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                            <div className="d-flex">
                                                <input className="form-control formcontrolsearch font14" type="text" placeholder="Search" onChange={(e) => setSearchByKey(e.target.value)} onKeyDown={handleKeyDown} />
                                                <button className="btn searchhhButtons text-white font14" type="button" onClick={getAllDriverData}><h2>Search</h2></button>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start">
                                            <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addDriver'><span className='font14 textVerticalCenter'>+ ADD Driver</span></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3 pe-0">
                        <div className="overflow-scroll cardradius bg-white p-3">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th><h2>#</h2></th>
                                        <th><h2>Name</h2></th>
                                        <th><h2>Address</h2></th>
                                        <th><h2>Phone</h2></th>
                                        <th><h2>Email</h2></th>
                                        <th className='text-end'><h2>Action</h2></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {driverData.map((item, index) => (
                                        <tr key={item.id} className='my-bg-color align-middle'>
                                            <th className='greyText'><h3>{index + 1}</h3></th>
                                            <td className='greyText'><h3>{item.driverName}</h3></td>
                                            <td className='greyText'><h3>{item.driverAddress}</h3></td>
                                            <td className='greyText'><h3>{item.phoneNumber}</h3></td>
                                            <td className='greyText'><h3>{item.driverEmail}</h3></td>
                                            <td className='text-end'>
                                                <div className="dropdown dropdownbtn">
                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Action</span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getDriverDataById(item.driverId)}>
                                                                Edit
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteId(item.driverId)}>
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
                        </div>
                    </div>
                </div>
                {/* Edit */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header border-bottom border-2 p-2">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <h2 className="offcanvas-title" id="staticBackdropLabel">Driver Edit</h2>
                    </div>
                    <div className="offcanvas-body p-0">
                        {loaderState && (<DataLoader />)}
                        <div className="container-fluid p-3" style={{ zIndex: -1 }}>
                            <div className="row">
                                <form onSubmit={handleSubmit(UpdateDriverData)}>
                                    <div className="mb-3">
                                        <label htmlFor="driverName" className='form-label greyText font14'>Driver Name</label>
                                        <input id="driverName" type="text" className={`form-control font14 ${errors.driverName ? 'border-danger' : ''}`} placeholder="Enter Driver Name" {...register('driverName', { required: 'Driver Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Driver Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Driver Name'; } return true; } })} />
                                        {errors.driverName && <p className="font12 text-danger">{errors.driverName.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="driverEmail" className='form-label greyText font14'>Driver Email</label>
                                        <input id="driverEmail" type="email" className={`form-control font14 ${errors.driverEmail ? 'border-danger' : ''}`} placeholder="Enter Driver's Email" {...register('driverEmail', { required: `Driver's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                                        {errors.driverEmail && <p className="font12 text-danger">{errors.driverEmail.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="driverAddress" className='form-label greyText font14'>Driver Address</label>
                                        <input id="driverAddress" type="text" className={`form-control font14 ${errors.driverAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("driverAddress", { required: 'Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.driverAddress && <p className="font12 text-danger">{errors.driverAddress.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phoneNo" className='form-label greyText font14'>Phone Number</label>
                                        <input id="phoneNo" type="tel" className={`form-control font14 ${errors.phoneNo ? 'border-danger' : ''}`} placeholder="Enter Driver's Phone Number" {...register('phoneNo', { required: `Driver's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                                        {errors.phoneNo && <p className="font12 text-danger">{errors.phoneNo.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="gender" className='form-label greyText font14'>Gender</label>
                                        <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required *' })} >
                                            <option value='' >--- Choose ---</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                        {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="driverImage" className='form-label greyText font14'>Driver Image</label>
                                        <div className="d-flex bg-white">
                                            {driverImageVal !== null && changeImageType ?
                                                <input id="studentImage" type="text" className='form-control formimagetext font14' value={driverImageVal.split('/').pop()} disabled />
                                                :
                                                <input id="studentImage" type="file" className={`form-control formimagetext font14 ${errors.studentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('studentImage', { required: 'Admin Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                            }
                                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                                    {driverImageVal !== null && changeImageType ? 'Edit' : 'View'}
                                                </span>
                                            </div>
                                        </div>
                                        {errors.studentImage && <p className="font12 text-danger">{errors.studentImage.message}</p>}
                                    </div>
                                    <p className='text-center p-3'>
                                        <button className='btn addButtons text-white' type='submit'>Update Driver</button>
                                        <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Delete */}
                <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                    <div className="offcanvas-header ps-0 modalHighborder p-1">
                        <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                            </svg>
                        </Link>
                        <span className="offcanvas-title" id="staticBackdropLabel">Driver Delete</span>
                    </div>
                    <div className="offcanvas-body p-0">
                        {loaderState && (<DataLoader />)}
                        <div style={{ zIndex: -1 }}>
                            <p className='modalLightBorder p-2'>Driver</p>
                            <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                            <p className='text-center warningHeading'>Are you Sure?</p>
                            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                            <p className='text-center p-3'>
                                <button className='btn deleteButtons text-white' onClick={() => DeleteDriverDataById(deleteId)}>Delete</button>
                                <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </div>
                        {/* <div>
                            {DeleteWarning
                                ?
                                <>
                                </>
                                :
                                <>
                                    <div >
                                        <p className='border-bottom p-3'>Driver</p>
                                        <div className="">
                                            <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                                            <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                                                <p className='warningHeading'>Successful Deleted</p>
                                                <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                                            </div>
                                            <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllDriverData}>Continue</button>
                                        </div>
                                    </div>
                                </>
                            }
                        </div> */}
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Driver




