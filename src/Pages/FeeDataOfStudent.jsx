import React, { useEffect, useState } from 'react'
import { getCollectedStudentFeeByIdApi, getStudentDataByIdApi } from '../Utils/Apis';
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import DataLoader from '../Layouts/Loader';
import AddStudentFeeForm from '../Modals/AddStudentFeeForm';

const Container = styled.div`
    
`;

const FeeDataOfStudent = ({ StudentId }) => {

    const id = StudentId;

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, setSearchByKey] = useState('');
    // Variable State
    const [studentFeeRes, setStudentFeeRes] = useState([]);
    const [AddFeeId, setAddFeeId] = useState('')
    const [FeeName, setFeeName] = useState('')
    const [modalHideVal, setModalHideVal] = useState(false);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    useEffect(() => {
        getAllCollectFeesByStudentId();
        if(modalHideVal){
            $('.modal').each(function () {
                $(this).modal('hide');
            });
        }
    }, [token, StudentId, pageNo, modalHideVal])

    const getAllCollectFeesByStudentId = async () => {
        try {
            setloaderState(true);
            var response = await getCollectedStudentFeeByIdApi(StudentId, pageSize, pageNo);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setStudentFeeRes(response?.data?.feePaid)
                    setCurrentPage(response?.data?.currentPage)
                    setTotalPages(response?.data?.totalPages)
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


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handleModalHideVal = () => {
        setModalHideVal(true)
    }


    return (
        <Container>
        { loaderState && ( <DataLoader /> ) }
            <div className="container-fluid">
                <div className="row">
                    <table className="table align-middle table-striped">
                        <thead>
                            <tr>
                                <th className=''><span className='font14'>#</span></th>
                                <th><span className='font14'>Fee Group</span></th>
                                <th><span className='font14'>Fee Code</span></th>
                                <th><span className='font14'>Due Date</span></th>
                                <th><span className='font14'>Status</span></th>
                                <th><span className='font14'>Amount</span></th>
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
                                <tr className='align-middle'>
                                    <th className='greyText font14'>{index + 1}</th>
                                    <td className='greyText font14'>{item.feeGroup.split('_').join(' ')}</td>
                                    <td className='greyText font14'>{item.feeType}</td>
                                    <td className='greyText font14'>{item.dueDate}</td>
                                    <td className='greyText font14'>{item.mode}</td>
                                    <td className='greyText font14'>{item.amount}</td>
                                    <td className='greyText font14'>{item.paymentId}</td>
                                    <td className='greyText font14'>{item.paymentMode}</td>
                                    <td className='greyText font14'>{item.paymentDate}</td>
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
                                                    {/* <button className="dropdown-item greyText" type="button" data-bs-toggle="modal" data-bs-target="#AddFee" onClick={() => setEditId(item.id)}> */}
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

            <div className="modal modal-md fade" id="AddFee" tabIndex="-1" aria-labelledby="AddFeeLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content ps-3 pe-3">
                            <div className="modal-header ps-0 pe-0">
                                <span className="modal-title font16" id="AddFeeLabel">{FeeName}</span>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body p-1">
                                <AddStudentFeeForm AddFeeId={AddFeeId} modalHideTrue={handleModalHideVal}/>
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

        </Container>
    )
}

export default FeeDataOfStudent
