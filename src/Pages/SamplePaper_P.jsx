import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllSamplePaperDataApi, getDownloadSamplePaperDataApiByStu } from '../Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const Container = styled.div`
    height: 92vh;
    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    /* .hoverIcon{
        position: relative;
        cursor: pointer;

        &:hover .hoveringDescriptionDiv{
            display: block;
            cursor: pointer;
            position: absolute;
            background-color: var(--hoveringDivBg) !important;
            border: 1px solid var(--hoveringDivBorder);
            color: #fff;
            width: 260px;
            z-index: 1;
        }
    }

    .hoveringDescriptionDiv{
        display: none;
    } */
/* 
    .custom-tooltip {
        --bs-tooltip-bg: var(--bd-violet-bg);
        --bs-tooltip-color: var(--bs-white);
    } */

`;

const SamplePaper = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [SamplePaperData, setSamplePapersData] = useState([]);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllSamplePapers();
    }, [token, pageNo]);

    const getAllSamplePapers = async () => {
        try {
            setloaderState(true);
            var response = await getAllSamplePaperDataApi(pageNo, pageSize);
            console.log(response, 'sample paper')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setSamplePapersData(response?.data?.samplePaper)
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.msg);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Sample Paper API - ', error)
        }
    }

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

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
            const response = await getDownloadSamplePaperDataApiByStu(id, data);
            if (response?.status === 200) {
                const pdfData = response?.data;
                downloadFileFunction(pdfData, 'SamplPaper.pdf');
                toast.success('SamplPaper Downloaded Successfully');
                setloaderState(false);
            } else {
                toast.error('Failed to download the SamplPaper.');
            }
        } catch (error) {
            toast.error('An error occurred while downloading the SamplPaper-', error);
        }
    };


    return (

        <Container className="container-fluid p-4 overflow-scroll">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Sample Paper</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Sample Paper Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <td className='font14'>#</td>
                            <td className='font14'>Title</td>
                            <td className='font14'>Subject</td>
                            <td className='font14'>Sample Paper Details</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr></tr>
                        {SamplePaperData.map((item, index) => (
                            <tr key={item.holidayId}>
                                <td className='font14 greyText'>{index + 1}</td>
                                <td className='font14 greyText'>{item.title}</td>
                                <td className='font14 greyText'>{item.subjectName}</td>
                                <td className='greyText'>
                                    <p className='font14 align-self-start m-0'>
                                        <Icon icon="bxs:file-pdf" width="1.3em" height="1.3em" style={{ color: 'red' }} />
                                        <Link className='ms-2' to='' onClick={() => downloadSamplePaper(item.sampleId)}>Download</Link>
                                    </p>
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
                <Toaster />
            </div>
        </Container>

    )
}

export default SamplePaper

