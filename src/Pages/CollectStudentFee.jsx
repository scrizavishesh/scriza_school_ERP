import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { DownloadStudentFeeDataCSV, DownloadStudentFeeDataPDF, getCollectedStudentFeeByIdApi, getStudentDataByIdApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { CSVLink } from 'react-csv';
import AddStudentFeeForm from '../Modals/AddStudentFeeForm';

const Container = styled.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }
    
    .table tbody tr:last-child {
        background-color: #1f47c0 !important;
    }

    .form-control::placeholder{
        color: var(--greyState);
    }

    .form-control, .form-select{
        color: var(--greyState);
        border-radius: 5px !important;
        border: 1px solid var(--fontControlBorder);
        box-shadow: none !important;
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

    .greenBG{
        background-color: var(--headingBackgroundColor);
    }

    .darkgreentext{
        color: var(--greenTextColor);
    }

    .greyText{
      color: var(--greyTextColor) !important;
    }

    .modal-footer{
        border: none !important;
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


const CollectStudentFee = () => {

    const { id } = useParams();

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    const [studentFeeRes, setStudentFeeRes] = useState([]);
    // Variable State
    const [studentId, setStudentId] = useState('')
    const [studentName, setStudentName] = useState('')
    const [fatherName, setFatherName] = useState('')
    const [classNo, setClassNo] = useState(0);
    const [studentRollNo, setStudentRollNo] = useState('')
    const [studentPh, setStudentPh] = useState('')
    const [studentImage, setStudentImage] = useState('')
    const [modalHideVal, setModalHideVal] = useState(false);

    const [AddFeeId, setAddFeeId] = useState('')
    const [FeeName, setFeeName] = useState('')

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    // CSV State
    const [csvData, setCSVData] = useState([])
    const [PDFResponse, setPDFResponse] = useState()


    useEffect(() => {
        getStudentDataById();
        getAllCollectFeesByStudentId();
        if (modalHideVal) {
            $('.modal').each(function () {
                $(this).modal('hide');
            });
        }
    }, [token, pageNo, modalHideVal])

    useEffect(() => {
        DownloadCSV();
        DownloadPDF();
    }, [token])

    // CSV Download
    const DownloadCSV = async () => {
        try {
            const response = await DownloadStudentFeeDataCSV(id);
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
            const response = await DownloadStudentFeeDataPDF(id);
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
        link.download = 'Student Fee Data.pdf';
        link.click();
    };


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getStudentDataById = async () => {
        try {
            setloaderState(true);
            var response = await getStudentDataByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentName(response?.data?.student?.studentName);
                    setStudentId(response?.data?.student?.studentId);
                    setFatherName(response?.data?.student?.fatherName);
                    setClassNo(response?.data?.student?.classNo);
                    setStudentPh(response?.data?.student?.studentPhone);
                    setStudentImage(response?.data?.student?.studentImage);
                    setloaderState(false);
                }
                else {
                    console.log('error')
                    toast.error(response?.data?.message);
                }
            }
            else {
                console.log('error')
                toast.error(response?.data?.message);
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

    const getAllCollectFeesByStudentId = async () => {
        try {
            setloaderState(true);
            var response = await getCollectedStudentFeeByIdApi(id, pageSize, pageNo);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentFeeRes(response?.data?.feePaid)
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    // toast.success(response?.data?.message);
                    setloaderState(false);
                }
                else {
                    console.log('error')
                    // toast.error(response?.data?.message);
                }
            }
            else {
                console.log('error')
                // toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleModalHideVal = () => {
        setModalHideVal(true)
    }

    return (

        <Container>
            {loaderState && (<DataLoader />)}
            <div className="container-fluid pt-4 ">
                <div className="row gap-xl-0 gap-3">
                    <div className="col-xxl-9 col-xl-8 col-lg-7 col-sm-7 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/collectFees" className='bredcrumText text-decoration-none'>Fee Collection </a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Collect Fees</li>
                            </ol>
                        </nav>
                        <p className='font14 ps-0 fontWeight500'>Collect Fees List</p>
                    </div>
                    <div className="col-xxl-3 col-xl-4 col-lg-4 col-sm-4 pe-0">
                        <div className="row">
                            <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"Student Fee Data.csv"}>
                                    <span className='font14 textVerticalCenter'>
                                        <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                        <span className='ms-1'>Export to CSV</span>
                                    </span>
                                </CSVLink>
                            </div>
                            <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                                <button className="btn ps-2 pe-2 ExportBtns bg-white" type="button" onClick={handleDownloadPdf}>
                                    <span className='font14 textVerticalCenter'>
                                        <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                        <span className='ms-1'>Export to PDF</span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* <div className="col-xxl-7 col-xl-8 col-lg-12 col-sm-12">
                        <div className="row gap-sm-0 gap-3">

                            <div className="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12 text-end">
                                <div className="row">
                                    <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                                        <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit">
                                            <span className='font14 textVerticalCenter'>
                                                <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                                                <span className='ms-1'>Export to CSV</span>
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start p-0 align-self-center">
                                        <Link className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" to='/superAdminAddSchools'>
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
                                    <form className="d-flex" role="search">
                                        <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                                        <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="container-fluid p-4">
                <div className="row bg-white cardradius2">
                    <div className="col-12">
                        <div className="row p-3">
                            <div className="col-9">
                                <div className="row greenBG cardradius2 p-3">
                                    <div className="col-2 align-self-center">
                                        <div className="row">
                                            <img src={studentImage} alt="" />
                                        </div>
                                    </div>
                                    <div className="col-10">
                                        <div className="row">
                                            <h2 className='darkgreentext'>Details info</h2>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6 col-12">
                                                <div className="row p-2">
                                                    <form>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Name: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentName} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Father Name: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={fatherName} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Mobile: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentPh} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-12">
                                                <div className="row p-2">
                                                    <form>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Class (Section): </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={classNo} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Admission No: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentId} />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <label htmlFor="inputEmail3" className="col-sm-4 col-form-label greyText font14 p-1">Roll Number: </label>
                                                            <div className="col-sm-8">
                                                                <input type="email" readOnly className="form-control-plaintext font14 p-1" id="inputEmail3" value={studentRollNo} />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row p-3 overflow-scroll">
                            <table className="table align-middle table-striped">
                                <thead>
                                    <tr>
                                        <th className=''><span className='font14'>#</span></th>
                                        <th><span className='font14'>Fee Group</span></th>
                                        <th><span className='font14'>Fee Code</span></th>
                                        <th><span className='font14'>Due Date</span></th>
                                        <th><span className='font14'>Status</span></th>
                                        {/* <th><span className='font14'>Amount</span></th> */}
                                        <th><span className='font14'>Payment Id</span></th>
                                        <th><span className='font14'>Mode</span></th>
                                        <th><span className='font14'>Payment Date</span></th>
                                        <th><span className='font14'>Discount</span></th>
                                        <th><span className='font14'>Fine</span></th>
                                        <th><span className='font14'>Paid</span></th>
                                        <th><span className='font14'>Balance</span></th>
                                        <th className='text-center'><span className='font14'>Action</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                    {studentFeeRes.map((item, index) => (
                                        <tr className='align-middle' key={item.feePaidId}>
                                            <th className='greyText font14'>{index + 1}</th>
                                            <td className='greyText font14'>{item.feeGroup.split('_').join(' ')}</td>
                                            <td className='greyText font14'>{item.feeType}</td>
                                            <td className='greyText font14'>{item.dueDate}</td>
                                            <td className='greyText font14'>{item.mode}</td>
                                            {/* <td className='greyText font14'>{item.paidAmount}</td> */}
                                            <td className='greyText font14'>{item.paymentId}</td>
                                            <td className='greyText font14'>{item.paymentMode}</td>
                                            <td className='greyText text-center font14'>{item.paymentDate ? item.paymentDate.split('T')[0] : '-'}</td>
                                            <td className='greyText font14'>{item.discount}</td>
                                            <td className='greyText font14'>{item.fineAmount}</td>
                                            <td className='greyText font14'>{item.paid}</td>
                                            <td className='greyText font14'>{item.balance}</td>
                                            <td className='text-end'>
                                                <div className="dropdown dropdownbtn">
                                                    <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <span>Action</span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#AddFee" onClick={() => { setAddFeeId(item.feePaidId), setFeeName(item.feeGroup.split('_').join(' ')) }}>
                                                                Add Fee
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#PrintFee">
                                                                Print
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

                <div className="modal modal-md fade" id="AddFee" tabIndex="-1" aria-labelledby="AddFeeLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content ps-3 pe-3">
                            <div className="modal-header ps-0 pe-0">
                                <span className="modal-title font16" id="AddFeeLabel">{FeeName}</span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-1">
                                <AddStudentFeeForm AddFeeId={AddFeeId} modalHideTrue={handleModalHideVal} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal fade" id="PrintFee" tabIndex="-1" aria-labelledby="PrintFeeLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h6 className="modal-title" id="PrintFeeLabel">Print Modal</h6>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <span>Print Modal Body</span>
                            </div>
                            {/* <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div> */}
                        </div>
                    </div>
                </div>

            </div>
        </Container>
    )
}

export default CollectStudentFee
