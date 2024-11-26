import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import AddSamplePaper from '../Modals/SamplePapers/AddSamplePaper';
import EditSamplePaper from '../Modals/SamplePapers/EditSamplePaper';
import { DownloadSamplePaperExcel, DownloadSamplePaperPDF, deleteSamplePaperApi, getAllClassApi, getDownloadSamplePaperDataApi, getSearhSamplePaperDataApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';

const Container = styled.div`

    select:-internal-list-box {
        overflow: visible !important;
        background-color: #00A67E !important;
    }

    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border: 1px solid var(--formInputBorder) !important;
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
        border-radius: 6px;
        border: 1.5px solid var(--fontControlBorder);
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


const SamplePaper = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [SearchBtn, setSearchBtn] = useState(false);
    const [DeleteWarning, setDeleteWarning] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [searchByKey, setSearchByKey] = useState('')

    const [EditItemId, setEditItemId] = useState('')
    const [DeleteItemId, setDeleteItemId] = useState('')

    const [classNo, setClassNo] = useState('');
    const [classId, setClassId] = useState(0);
    const [sectionId, setSectionId] = useState(0);
    const [subjectId, setSubjectId] = useState(0);
    const [allClassData, setAllClassData] = useState([]);
    const [allSamplePaperData, setAllSamplePaperData] = useState([]);
    const [closeAddModal, setCloseAddModal] = useState(false);
    const [closeEditModal, setCloseEditModal] = useState(false);
    // CSV State
    const [csvData, setCSVData] = useState([])
    const [PDFResponse, setPDFResponse] = useState()
    const [allowCsvPdf, setAllowCsvPdf] = useState(false)

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        if (pageNo || closeAddModal || closeEditModal || allowCsvPdf) {
            getAllSamplePaper();
        }
        if (token) {
            getAllClassData();
            DownloadCSV();
            DownloadPDF();
        }
        if (closeAddModal) {
            const offcanvasElement = document.getElementById('add_staticBackdrop');
            if (offcanvasElement) {
                let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (!offcanvas) {
                    offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                }
                offcanvas.hide();
            }
            setCloseAddModal(false)
        }

        if (closeEditModal) {
            const offcanvasElement = document.getElementById('Edit_staticBackdrop');
            if (offcanvasElement) {
                let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                if (!offcanvas) {
                    offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                }
                offcanvas.hide();
            }
            setCloseAddModal(false)
        }

    }, [token, pageNo, closeAddModal, closeEditModal, allowCsvPdf]);

    const handleClassChange = (value) => {
        // setLoaderState(true);
        setValue('ClassId', value);
        const selectedClass = allClassData.find(c => c.classId === value)

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
            // setLoaderState(false)
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
            // setLoaderState(false)
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    // CSV Download
    const DownloadCSV = async () => {
        try {
            const response = await DownloadSamplePaperExcel();
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
            const response = await DownloadSamplePaperPDF();
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
        link.download = 'Sample Papers.pdf';
        link.click();
    };

    const getAllSamplePaper = async () => {
        try {
            setSearchBtn(true)
            setloaderState(true)
            var response = await getSearhSamplePaperDataApi(classId, sectionId, subjectId, searchByKey, pageNo, pageSize);
            // console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllSamplePaperData(response?.data?.samplePaper);
                    setTotalPages(response.data.totalPages)
                    setCurrentPage(response.data.currentPage)
                    // toast.success(response.data.message)
                    setAllowCsvPdf(true)
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch (e) {
            console.log(e);

        }
    }

    const downloadFileFunction = (blob, filename) => {
        const url = window.URL.createObjectURL(blob);
        //creates a temporary URL that points to the Blob object. This URL can be used as a link to access the file data.
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        //releases the memory used by the temporary URL. This is important to prevent memory leaks, 
        //as the URL was only needed for the duration of the file download process.
    };

    const downloadSamplePaper = async (id) => {
        try {
            setloaderState(true);
            const data = {
                "responseType": "blob"
            };
            const response = await getDownloadSamplePaperDataApi(id, data);
            if (response?.status === 200) {
                const pdfData = response?.data;
                downloadFileFunction(pdfData, 'SamplPaper.pdf');
                toast.success('SamplPaper Downloaded Successfully');
                setloaderState(false);
            } else {
                setloaderState(false);
                toast.error('Failed to download the SamplPaper.');
            }
        } catch (error) {
            setloaderState(false);
            toast.error('An error occurred while downloading the SamplPaper-', error);
        }
    };

    const getAllClassData = async () => {
        try {
            setloaderState(true)
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            console.log(error)
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }

        }
    }


    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            getAllStudentData();
        }
    };

    const DeleteSamplePaperDataById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteSamplePaperApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        toast.success(response?.data?.message)
                        const offcanvasElement = document.getElementById('Delete_staticBackdrop');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                        }
                        getAllSamplePaper()
                        setIsChecked(false)
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

    const handleAddSampleModal = () => {
        setCloseAddModal(true)
    }

    const handleEditSampleModal = () => {
        setCloseEditModal(true)
    }

    const cancelSearch = () => {
        setClassId(0)
        setSectionId(0)
        setSubjectId(0)
        getAllSamplePaper();
    }


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
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">SamplePaper</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>SamplePaper</p>
                        </div>
                        <div className="col-xxl-8 col-xl-9 col-lg-12 col-sm-12 pe-0">
                            <div className="row gap-sm-0 gap-3">

                                <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12 text-end">
                                    <div className="row">
                                        <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                            <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"SamplePaper Record.csv"}>
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to CSV</span>
                                                </span>
                                            </CSVLink>
                                            {/* {allowCsvPdf ? (
                                            ) : (
                                                <button className="btn ps-2 pe-2 ExportBtns bg-white" disabled>
                                                    <span className='font14 textVerticalCenter'>
                                                        <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                        <span className='ms-1'>Export to CSV</span>
                                                    </span>
                                                </button>
                                            )} */}
                                        </div>
                                        <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                                            <button className="btn ps-2 pe-2 ExportBtns bg-white" type="button" onClick={handleDownloadPdf}>
                                                {/* disabled={!allowCsvPdf} */}
                                                <span className='font14 textVerticalCenter'>
                                                    <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                    <span className='ms-1'>Export to PDF</span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-12 text-end align-self-center">
                                    <div className="row gap-md-0 gap-sm-3">
                                        <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                                            {/* <form className="d-flex" role="search">
                                                <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                                <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllSamplePaper}>Search</span></button>
                                            </form> */}
                                            <div className="d-flex">
                                                <input className="form-control formcontrolsearch font14" type="text" disabled={!allowCsvPdf} placeholder="Search" onChange={(e) => setSearchByKey(e.target.value)} onKeyDown={handleKeyDown} />
                                                <button className="btn searchhhButtons text-white font14" type="button" disabled={!allowCsvPdf} onClick={getAllSamplePaper}><h2>Search</h2></button>
                                            </div>
                                        </div>
                                        <div className="col-md-4 col-sm-12 col-4 text-sm-end text-start p-0">
                                            <button className="btn ps-0 pe-0 addCategoryButtons text-white" type="button" data-bs-toggle="offcanvas" data-bs-target="#add_staticBackdrop" aria-controls="add_staticBackdrop"><span className='font14 textVerticalCenter'>+ Add SamplePaper</span></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                    <select className="form-select bordeRadius5 font14" aria-label="Default select example" value={classId} onChange={handleClassChange}>
                                        <option value="">-- Select --</option>
                                        {allClassData?.map((option) => (
                                            <option key={option.classId} value={option?.classId}>
                                                {option?.classNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                    <select className="form-select bordeRadius5 font14" aria-label="Default select example" value={sectionId} onChange={(e) => setSectionId(e.target.value)}>
                                        <option value="">-- Select --</option>
                                        {allSectionData?.map(option => (
                                            <option key={option.classSecId} value={option.classSecId}>
                                                {option.sectionName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-md-4 col-sm-6 col-12">
                                    <label htmlFor="inputEmail4" className="form-label font14">Subject</label>
                                    <select className="form-select bordeRadius5 font14" aria-label="Default select example" value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
                                        <option value="">-- Select --</option>
                                        {allSubjectData?.map((option) => (
                                            <option key={option.subjectId} value={option.subjectId}>
                                                {option.subjectName}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn addCategoryButtons text-white' onClick={getAllSamplePaper} disabled={classId === 0 || sectionId === 0 || subjectId === 0 ? true : false}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3' onClick={cancelSearch}>Cancel</button>
                                </p>
                            </form>
                            {SearchBtn
                                ?
                                <>
                                    <div className="row">
                                        <div className="overflow-scroll">
                                            {allSamplePaperData && allSamplePaperData.length === 0 ? (
                                                <div className="d-flex justify-content-center p-5">
                                                    <img src="./images/search.svg" alt="" className='img-fluid' />
                                                </div>
                                            ) : (
                                                <>
                                                    <table className="table align-middle table-striped">
                                                        <thead>
                                                            <tr>
                                                                <th className='tableHeading text-center'><span className='font14'>#</span></th>
                                                                <th className='tableHeading '><span className='font14'>Title</span></th>
                                                                <th className='tableHeading '><span className='font14'>Class</span></th>
                                                                <th className='tableHeading '><span className='font14'>Section</span></th>
                                                                <th className='tableHeading '><span className='font14'>Subject</span></th>
                                                                <th className='tableHeading '><span className='font14'>Teacher</span></th>
                                                                <th className='tableHeading '><span className='font14'>Download</span></th>
                                                                <th className='tableHeading text-center'><span className='font14'>Action</span></th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allSamplePaperData.map((item, index) => (
                                                                <tr key={item.sampleId} className='align-middle'>
                                                                    <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.title}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.classNo}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.sectionName}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.subjectName}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <span className='font14 align-self-start'>{item.teacherName}</span>
                                                                    </td>
                                                                    <td className='greyText'>
                                                                        <p className='font14 align-self-start m-0'>
                                                                            <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em" style={{ color: 'red' }} />
                                                                            <Link className='ms-2' to='' onClick={() => downloadSamplePaper(item.sampleId)}>Download</Link>
                                                                        </p>
                                                                    </td>
                                                                    <td className='text-center'>
                                                                        <div className="dropdown dropdownbtn">
                                                                            <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span>Action</span>
                                                                            </button>
                                                                            <ul className="dropdown-menu dropdown-menu-end">
                                                                                <li>
                                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setEditItemId(item.sampleId)}>
                                                                                        Edit
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeleteItemId(item.sampleId)}>
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
                                            )}
                                        </div>
                                    </div>

                                </>
                                :
                                <>
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="./images/search.svg" alt="" className='img-fluid' />
                                    </div>
                                </>
                            }
                        </div>
                    </div>

                    {/* Add */}
                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="add_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header border-bottom border-2 p-1">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <h2 className="offcanvas-title" id="staticBackdropLabel">Sample Paper Add</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <AddSamplePaper addedSuccess={handleAddSampleModal} />
                        </div>
                    </div>

                    {/* Edit */}
                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header border-bottom border-2 p-1">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <h2 className="offcanvas-title" id="staticBackdropLabel">SamplePaper Edit</h2>
                        </div>
                        <div className="offcanvas-body p-0">
                            <EditSamplePaper EditItemId={EditItemId} EditedSuccess={handleEditSampleModal} />
                        </div>
                    </div>

                    {/* Delete */}
                    <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
                        <div className="offcanvas-header ps-0 modalHighborder p-1">
                            <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                                    <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                                </svg>
                            </Link>
                            <span className="offcanvas-title" id="staticBackdropLabel">SamplePaper</span>
                        </div>
                        <div className="offcanvas-body p-0">
                            <div>
                                <div className=''>
                                    <p className='modalLightBorder p-2'>SamplePaper</p>
                                    <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                                    <p className='text-center warningHeading'>Are you Sure?</p>
                                    <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                                    <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value={isChecked} id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                                    <p className='text-center p-3'>
                                        <button className='btn deleteButtons text-white' onClick={() => DeleteSamplePaperDataById(DeleteItemId)}>Delete</button>
                                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SamplePaper
