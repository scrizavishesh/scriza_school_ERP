import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { deleteFeeMasterByGroupNameApi, deleteFeeMasterByIdApi, getAllFeeGroupApi, getAllFeeMasterApi, getAllFeeTypeApi, getFeeMasterByIdApi, updateFeeMasterByIdApi } from '../../Utils/Apis'
import toast, { Toaster } from 'react-hot-toast'
import DataLoader from '../../Layouts/Loader'
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Container = styled.div``;

const ViewAllFeeMaster = ({ goData, setGroupName, reloadMasters, searchInputData }) => {

    const token = localStorage.getItem('token');
    
    //loader State
    const [loaderState, setloaderState] = useState(false);
    // const [searchByKey, setSearchByKey] = useState('')
    const [FeeMasterData, setFeeMasterData] = useState([])
    const [EditFeeMasterIdData, setEditFeeMasterIdData] = useState('')
    const [DelFeeMasterIdData, setDelFeeMasterIdData] = useState('')
    const [isChecked, setIsChecked] = useState(false)
    const [isChecked1, setIsChecked1] = useState(false)
    const [EditFeeGroupNameDelete, setEditFeeGroupNameDelete] = useState('');
    const [feeGroupName, setFeeGroupName] = useState('');
    const [FeeGroupData, setFeeGroupData] = useState([]);
    const [FeeTypeData, setFeeTypeData] = useState([]);
    // setSearchByKey(searchInputData)
    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    const [masterType, setMasterType] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });

    const percentageVal = watch('percentage')
    const amountVal = watch('fineValue')

    useEffect(() => {
        if (token || searchInputData || reloadMasters ) {
            getAllFeeMasterData();
        }
        if (!reloadMasters) {
            getAllFeeGroupData();
            getAllFeeTypeData();
        }
    }, [token, pageNo, reloadMasters, searchInputData])

    useEffect(() => {
        setFeeGroupName(feeGroupName.split('_').join(' '))
    }, [feeGroupName])


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const getAllFeeMasterData = async () => {
        try {
            setloaderState(true);
            var response = await getAllFeeMasterApi(searchInputData, pageNo, pageSize);
            console.log(response, 'fee master')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeMasterData(response?.data?.feeMaster);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Group API - ', error)
        }
    }

    const DeleteFeeMasterCodeById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteFeeMasterByIdApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        toast.success(response?.data?.message)
                        getAllFeeMasterData()
                        const offcanvasElement = document.getElementById('deleteFeeMaster');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                            setIsChecked(false)
                        }
                    }
                }
                else {
                    toast.error(response?.error);
                }
            }
            catch (error) {
                console.error('Error during delete:', error);
            }
        }
    }

    const DeleteCompleteFeeMasterById = async () => {
        if (isChecked1) {
            try {
                console.log(EditFeeGroupNameDelete)
                var response = await deleteFeeMasterByGroupNameApi(EditFeeGroupNameDelete);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        toast.success(response?.data?.message)
                        getAllFeeMasterData()
                        const offcanvasElement = document.getElementById('deleteFeeMasterBgGroupName');
                        if (offcanvasElement) {
                            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
                            if (!offcanvas) {
                                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
                            }
                            offcanvas.hide();
                            setIsChecked1(false)
                        }
                    }
                }
                else {
                    toast.error(response?.error);
                }
            }
            catch (error) {
                console.error('Error during delete:', error);
            }
        }
    }


    // const handlePage = (value) => {
    //     goData(true)
    //     setGroupName(value)
    // }

    const getAllFeeGroupData = async () => {
        try {
            setloaderState(true);
            var response = await getAllFeeGroupApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeGroupData(response?.data?.feeGroup);
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Group API - ', error)
        }
    }

    const getAllFeeTypeData = async () => {
        try {
            setloaderState(true);
            var response = await getAllFeeTypeApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeTypeData(response?.data?.feeTypes);
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Type API - ', error)
        }
    }

    const getFeeMasterDataById = async (id) => {
        try {
            setEditFeeMasterIdData(id)
            setloaderState(true);
            var response = await getFeeMasterByIdApi(id);
            console.log(response, 'fee master by id ')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeGroupName(response?.data?.feeMaster?.feeGroup)
                    setValue('feeGroup', response?.data?.feeMaster?.feeGroup)
                    setValue('feeType', response?.data?.feeMaster?.feeTypeCode)
                    setValue('date', response?.data?.feeMaster?.dueDate)
                    setValue('amount', response?.data?.feeMaster?.amount)
                    setMasterType(response?.data?.feeMaster?.fineType)
                    setValue('percentage', response?.data?.feeMaster?.percentage)
                    setValue('fineValue', response?.data?.feeMaster?.fineValue)
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Group API - ', error)
        }
    }

    const UpdateFeeMaster = async (data) => {
        try {
            const formData = new FormData();
            formData.append('feeGroup', data?.feeGroup);
            formData.append('feeType', data?.feeType);
            formData.append('date', data?.date);
            formData.append('amount', data?.amount);
            formData.append('fineType', masterType);
            formData.append('percentage', data?.percentage);
            formData.append('fineValue', data?.fineValue);

            var response = await updateFeeMasterByIdApi(EditFeeMasterIdData, formData);
            console.log(response);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    getAllFeeMasterData()
                    const offcanvasElement = document.getElementById('editFeeMaster');
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

        }
        catch {

        }
    }

    const validateDate = (value) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        return selectedDate >= today || 'Date cannot be in the past';
    };



    return (
        <Container className='container-fluid p-0'>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row">
                <table className="table align-middle table-striped">
                    <thead>
                        <tr>
                            <th className=''><span className='font14'>#</span></th>
                            <th><span className='font14'>Fee Group</span></th>
                            <th><span className='font14'>Fee Code</span></th>
                            <th><span className='font14'>Amount</span></th>
                            <th className='text-center'><span className='font14'>Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {FeeMasterData.map((item, index) => (
                            <tr key={index} className='align-middle'>
                                <th className='greyText font14'>{index + 1}</th>
                                <td className='greyText font14'>{item.feeGroup.split('_').join(' ')}</td>
                                <td className='greyText font14'>
                                    {(item.feeMasterList).map((feeCodeVal) => (
                                        <p className='font14 p-1' key={feeCodeVal.feeMasterId}>{feeCodeVal.feeTypeCode}</p>
                                    ))}
                                </td>
                                <td className=''>
                                    {(item.feeMasterList).map((feeCodeVal) => (
                                        <div className="d-flex" key={feeCodeVal.feeMasterId}>
                                            <p className='font14 greyText align-self-center flex-grow-1 p-1'>{feeCodeVal.amount}</p>
                                            <div className="">
                                                <button className='btn p-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#editFeeMaster" aria-controls="editFeeMaster" onClick={() => getFeeMasterDataById(feeCodeVal.feeMasterId)}>
                                                    <Icon icon="carbon:edit" width="1.1em" height="1.1em" style={{ color: '#8F8F8F' }} />
                                                </button>
                                                <button className='btn p-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteFeeMaster" aria-controls="deleteFeeMaster" onClick={() => setDelFeeMasterIdData(feeCodeVal.feeMasterId)}>
                                                    <Icon icon="mi:delete" width="1.1em" height="1.1em" style={{ color: '#8F8F8F' }} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </td>
                                <td className='text-center'>
                                    {/* <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' onClick={()=> handlePage(item.feeGroup)}>
                                        <Icon icon="gridicons:tag" width="1.5em" height="1.5em" style={{ color: '#008479' }} />
                                    </button> */}
                                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteFeeMasterBgGroupName" aria-controls="deleteFeeMasterBgGroupName" onClick={() => setEditFeeGroupNameDelete(item.feeGroup)}>
                                        <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#008479' }} />
                                    </button>
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
            <Toaster />

            {/* Edit Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editFeeMaster" aria-labelledby="editFeeMasterLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Fees Master</h2>
                </div>
                <div className="offcanvas-body p-3">
                    <form onSubmit={handleSubmit(UpdateFeeMaster)}>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label font14">Fee Group</label>
                            <select id="feeGroup" className={`form-select font14 ${errors.feeGroup ? 'border-danger' : ''}`} value={feeGroupName} {...register('feeGroup', { required: 'Fee Group is required *' })} >
                                <option value="">--- Select ---</option>
                                {FeeGroupData.map((option) => (
                                    <option key={option.feeGroupId} value={option.feeGroupName}>{option.feeGroupName}</option>
                                ))}
                            </select>
                            {errors.feeGroup && <p className="font12 text-danger">{errors.feeGroup.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label font14">Fee Type</label>
                            <select id="feeType" className={`form-select font14 ${errors.feeType ? 'border-danger' : ''}`} {...register('feeType', { required: 'Fee Type is required *' })} >
                                <option value="">--- Select ---</option>
                                {FeeTypeData.map((option) => (
                                    <option key={option.feeTypeId} value={option.feeTypeCode}>{option.feeTypeName}</option>
                                ))}
                            </select>
                            {errors.feeType && <p className="font12 text-danger">{errors.feeType.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Due Date</label>
                            <input id="date" type="date" className={`form-control font14 ${errors.date ? 'border-danger' : ''}`} {...register('date', { required: 'Due Date is required *', validate: validateDate })} />
                            {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label font14">Amount</label>
                            <input id="amount" type="number" className={`form-control font14 ${errors.amount ? 'border-danger' : ''}`} placeholder='Enter Amount' {...register('amount', { required: 'Amount is required *', min: { value: 0, message: 'Amount cannot be negative' } })} />
                            {errors.amount && <p className="font12 text-danger">{errors.amount.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label font14">Fine Type</label>
                            <div className="d-flex justify-content-between">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" checked={masterType === '' ? true : false} disabled />
                                    <label className="form-check-label font14" htmlFor="exampleRadios3">
                                        None
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="percent" checked={masterType === 'percent' ? true : false} onChange={(e) => { setMasterType(e.target.value), setValue('fineValue', 0) }} />
                                    <label className="form-check-label font14" htmlFor="exampleRadios1">
                                        Percentage
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="amount" checked={masterType === 'amount' ? true : false} onChange={(e) => { setMasterType(e.target.value), setValue('percentage', 0) }} />
                                    <label className="form-check-label font14" htmlFor="exampleRadios2">
                                        Amount
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Percentage</label>
                                    <input id="percentage" type="number" className={`form-control font14 ${errors.percentage ? 'border-danger' : ''}`} value={percentageVal} disabled={masterType === 'amount' || masterType === '' ? true : false} placeholder='Enter Percentage' {...register('percentage', masterType === 'percent' ? { required: 'Percentage is required *', min: { value: 0, message: 'Percentage cannot be negative' } } : {})} />
                                    {errors.percentage && <p className="font12 text-danger">{errors.percentage.message}</p>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Amount</label>
                                    <input id="fineValue" type="number" className={`form-control font14 ${errors.fineValue ? 'border-danger' : ''}`} value={amountVal} disabled={masterType === 'percent' || masterType === '' ? true : false} placeholder='Enter Master value' {...register('fineValue', masterType === 'amount' ? { required: 'Master value is required *', min: { value: 0, message: 'Master value cannot be negative' } } : {})} />
                                    {errors.fineValue && <p className="font12 text-danger">{errors.fineValue.message}</p>}
                                </div>
                            </div>
                        </div>
                        <p className='text-center p-3'>
                            <button className='btn addButtons2 font14 text-white me-2' type='submit'>Update Fee Master</button>
                            <button className='btn cancelButtons font14' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                    </form>
                    {/* {EditWarning
                        ?
                        <>
                            <form className='row' action="">
                                <div className="mb-3">
                                    <label htmlFor="inputEmail4" className="form-label font14">Fee Group</label>
                                    <select className="form-select font14" aria-label="Default select example" value={EditFeeGroupName.split('_').join(' ')} onChange={(e) => setEditFeeGroupName(e.target.value)}>
                                        <option >Select a Fee Group</option>
                                        {FeeGroupData.map((option) => (
                                            <option key={option.feeGroupId} value={option.feeGroupName}>{option.feeGroupName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail4" className="form-label font14">Fee Type</label>
                                    <select className="form-select font14" aria-label="Default select example" value={EditFeeTypeName} onChange={(e) => setEditFeeTypeName(e.target.value)}>
                                        <option >Select a Fee Type</option>
                                        {FeeTypeData.map((option) => (
                                            <option key={option.feeTypeId} value={option.feeTypeCode}>{option.feeTypeName}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Due Date</label>
                                    <input type="date" className="form-control font14" id="exampleFormControlInput1" value={EditDueDate} onChange={(e) => setEditDueDate(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail4" className="form-label font14">Amount</label>
                                    <input type="number" className="form-control font14" id="exampleFormControlInput1" value={EditAmount} onChange={(e) => setEditAmount(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="inputEmail4" className="form-label font14">Fine Type</label>
                                    <div className="d-flex justify-content-between">
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" checked={EditFineType === ""} value="" disabled readOnly />
                                            <label className="form-check-label font14" htmlFor="exampleRadios3">
                                                None
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" checked={EditFineType === "Percentage"} value="Percentage" onChange={(e) => setEditFineType(e.target.value)} />
                                            <label className="form-check-label font14" htmlFor="exampleRadios1">
                                                Percentage
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" checked={EditFineType === "FixedAmount"} value="FixedAmount" onChange={(e) => setEditFineType(e.target.value)} />
                                            <label className="form-check-label font14" htmlFor="exampleRadios2">
                                                Fixed Amount
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Percentage</label>
                                            <input type="text" className="form-control font14 " id="exampleFormControlInput1" value={EditFineType === 'Percentage' ? EditFineAmount : ''} disabled={EditFineType === 'FixedAmount'} onChange={(e) => setEditFineAmount(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Fix Amount</label>
                                            <input type="text" className="form-control font14 " id="exampleFormControlInput1" value={EditFineType === 'FixedAmount' ? EditFineAmount : ''} disabled={EditFineType === 'Percentage'} onChange={(e) => setEditFineAmount(e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <p className='text-center p-3'>
                                <button className='btn addButtons2 font14 text-white me-2' onClick={UpdateFeeMaster}>Update Fee Master</button>
                                <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </>
                        :
                        <>
                            <div>
                                <div className="mt-3">
                                    <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                    <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                        <p className='warningHeading'>Successful Added</p>
                                        <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                    </div>
                                    <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllFeeMasterData}>Continue</button>
                                </div>
                            </div>
                        </>
                    } */}
                </div>
            </div>


            {/* Delete Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeMaster" aria-labelledby="deleteFeeMasterLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="deleteFeeGroupeLabel">Delete Fees Master Code</h2>
                </div>
                <div className="offcanvas-body p-3">
                    <div className=''>
                        <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                        <p className='text-center warningHeading'>Are you Sure?</p>
                        <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                        <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" checked={isChecked} onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                        <p className='text-center p-3'>
                            <button className='btn deleteButtons text-white' onClick={() => DeleteFeeMasterCodeById(DelFeeMasterIdData)}>Delete</button>
                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                    </div>
                </div>
            </div>


            {/* Delete Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeMasterBgGroupName" aria-labelledby="deleteFeeMasterBgGroupNameLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="deleteFeeGroupeLabel">Delete Fees Master</h2>
                </div>
                <div className="offcanvas-body p-3">
                    <div className=''>
                        <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                        <p className='text-center warningHeading'>Are you Sure?</p>
                        <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                        <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" checked={isChecked1} onChange={(e) => setIsChecked1(e.target.checked)} />I Agree to delete the Profile Data</p>
                        <p className='text-center p-3'>
                            <button className='btn deleteButtons text-white' onClick={DeleteCompleteFeeMasterById}>Delete</button>
                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                    </div>
                </div>
            </div>

        </Container>
    )
}

export default ViewAllFeeMaster