import { Icon } from '@iconify/react'
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom'
import { deleteFeeDiscountByIdApi, getAllFeeDiscountApi, getFeeDiscountByIdApi, updateFeeDiscountByIdApi } from '../../Utils/Apis'
import DataLoader from '../../Layouts/Loader'
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast'
import { useForm } from 'react-hook-form'

const Container = styled.div``;

const ViewAllFeeDiscount = ({ goData, ViewId, reloadDiscounts, searchInputData }) => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchByKey, stSearchByKey] = useState('')
    const [FeeDiscountData, setFeeDiscountData] = useState([])
    const [DeleteWarning, setDeleteWarning] = useState(true)
    const [DelFeeDiscountIdData, setDelFeeDiscountIdData] = useState('')
    const [EditFeeDiscountId, setEditFeeDiscountId] = useState('')

    const [feeDiscountName, setFeeDiscountName] = useState('');
    const [feeDiscountCode, setFeeDiscountCode] = useState('');
    const [discountType, setDiscountType] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
        mode: 'onChange'
    });


    const [isChecked, setIsChecked] = useState(false);

    // Pagination

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        getAllFeeDiscountData();
    }, [token, pageNo, reloadDiscounts, searchInputData])


    const getAllFeeDiscountData = async () => {
        try {
            setloaderState(true);
            var response = await getAllFeeDiscountApi(searchInputData, pageNo, pageSize);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeDiscountData(response?.data?.feeDiscounts);
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    // toast.success(response.data.message);
                    setDeleteWarning(true)
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

    const getFeeDiscountDataById = async (id) => {
        try {
            setloaderState(true);
            setEditFeeDiscountId(id)
            var response = await getFeeDiscountByIdApi(id);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeDiscountName(response?.data?.feeGroup?.feeDiscountName);
                    setValue('feeDiscountName',response?.data?.feeGroup?.feeDiscountName);
                    setFeeDiscountCode(response?.data?.feeGroup?.feeDiscountCode);
                    setValue('feeDiscountCode',response?.data?.feeGroup?.feeDiscountCode);
                    setValue('feeDiscountDescription',response?.data?.feeGroup?.feeDiscountDescription);
                    setValue('percentage',response?.data?.feeGroup?.percentage);
                    setValue('discountValue',response?.data?.feeGroup?.discountValue);
                    setDiscountType(response?.data?.feeGroup?.fineType)
                    setTotalPages(response?.data?.totalPages);
                    setCurrentPage(response?.data?.currentPage);
                    toast.success(response.data.message);
                    setDeleteWarning(true)
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

    const DeleteFeeDiscountById = async (id) => {
        if (isChecked) {
            try {
                var response = await deleteFeeDiscountByIdApi(id);
                if (response?.status === 200) {
                    if (response.data.status === 'success') {
                        toast.success(response?.data?.message)
                        getAllFeeDiscountData()
                        const offcanvasElement = document.getElementById('deleteFeeDiscount');
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
                console.error('Error during login:', error);
            }
        }
    }


    const AddNewFeeDiscount = async (data) => {
        try {
            const formData = new FormData();
            if(feeDiscountName !== data?.feeDiscountName){
                formData.append('feeDiscountName', data?.feeDiscountName);
            }
            if(feeDiscountCode !== data?.feeDiscountCode){
                formData.append('feeDiscountCode', data?.feeDiscountCode);
            }
            formData.append('feeDiscountDescription', data?.feeDiscountDescription);
            formData.append('percentage', data?.percentage);
            formData.append('discountValue', data?.discountValue);

            var response = await updateFeeDiscountByIdApi(EditFeeDiscountId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    getAllFeeDiscountData();
                    const offcanvasElement = document.getElementById('editFeeDiscount');
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


    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };

    const handlePage = (id) => {
        goData(true)
        ViewId(id)
    }

    return (
        <Container className='container-fluid'>
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
                            <th><span className='font14'>Name</span></th>
                            <th><span className='font14'>Discount Code</span></th>
                            <th><span className='font14'>Percentage (%)</span></th>
                            <th><span className='font14'>Amount</span></th>
                            <th className='text-center'><span className='font14'>Action</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {FeeDiscountData.map((item, index) => (
                            <tr key={item.feeDiscountId} className='align-middle'>
                                <th className='greyText'><h3>{index + 1}</h3></th>
                                <td className='greyText font14'>{item.feeDiscountName}</td>
                                <td className='greyText font14'>{item.feeDiscountCode}</td>
                                <td className='greyText font14'>{item.percentage ? item.percentage : <span>-</span>}</td>
                                <td className='greyText font14'>{item.discountValue ? item.discountValue : <span>-</span>}</td>
                                <td className='text-center'>
                                    {/* <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' onClick={() => handlePage(item.feeDiscountId)}>
                                        <Icon icon="gridicons:tag" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                    </button> */}
                                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#editFeeDiscount" aria-controls="editFeeDiscount" onClick={() => getFeeDiscountDataById(item.feeDiscountId)}>
                                        <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                                    </button>
                                    <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteFeeDiscount" aria-controls="deleteFeeDiscount" onClick={() => setDelFeeDiscountIdData(item.feeDiscountId)}>
                                        <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
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
                {/* {FeeDiscountData.length > 0
                    ?
                    <>
                        
                    </>
                    :
                    <p className='p-5 text-center'><img src="./images/search.svg" alt="" className='img-fluid' /></p>
                } */}
            </div>

            {/* Edit Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editFeeDiscount" aria-labelledby="editFeeDiscountLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Fees Discount</h2>
                </div>
                <div className="offcanvas-body p-3">
                    <form action="" onSubmit={handleSubmit(AddNewFeeDiscount)}>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
                            {/* <input type="text" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Name" /> */}
                            <input id="feeDiscountName" type="text" className={`form-control font14 ${errors.feeDiscountName ? 'border-danger' : ''}`} placeholder="Enter Discount Name" {...register('feeDiscountName', { required: 'Discount Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Discount Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Discount Name'; } return true; } })} />
                            {errors.feeDiscountName && <p className="font12 text-danger">{errors.feeDiscountName.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Discount Code</label>
                            <input id="feeDiscountCode" type="text" className={`form-control font14 ${errors.feeDiscountCode ? 'border-danger' : ''}`} placeholder="Enter Discount Code" {...register('feeDiscountCode', { required: 'Discount Code is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Discount Code'; } return true; } })} />
                            {errors.feeDiscountCode && <p className="font12 text-danger">{errors.feeDiscountCode.message}</p>}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="inputEmail4" className="form-label font14">Discount Type</label>
                            <div className="d-flex justify-content-between">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" checked={discountType ==='' ? true : false} disabled />
                                    <label className="form-check-label font14" htmlFor="exampleRadios3">
                                        None
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="percent" checked={discountType ==='percent' ? true : false} onChange={(e) => { setDiscountType(e.target.value), setValue('discountValue', 0) }} />
                                    <label className="form-check-label font14" htmlFor="exampleRadios1">
                                        Percentage
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="amount" checked={discountType ==='amount' ? true : false} onChange={(e) => { setDiscountType(e.target.value), setValue('percentage', 0) }} />
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
                                    <input id="percentage" type="number" className={`form-control font14 ${errors.percentage ? 'border-danger' : ''}`} disabled={discountType === 'amount' || discountType === '' ? true : false} placeholder='Enter Percentage' {...register('percentage', discountType === 'percent' ? { required: 'Percentage is required *', min: { value: 0, message: 'Percentage cannot be negative' } } : {})} />
                                    {errors.percentage && <p className="font12 text-danger">{errors.percentage.message}</p>}
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Amount</label>
                                    <input id="discountValue" type="number" className={`form-control font14 ${errors.discountValue ? 'border-danger' : ''}`} disabled={discountType === 'percent' || discountType === '' ? true : false} placeholder='Enter Discount value' {...register('discountValue', discountType === 'amount' ? { required: 'Discount value is required *', min: { value: 0, message: 'Discount value cannot be negative' } } : {})} />
                                    {errors.discountValue && <p className="font12 text-danger">{errors.discountValue.message}</p>}
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                            <input id="feeDiscountDescription" type="text" className={`form-control font14 ${errors.feeDiscountDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('feeDiscountDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                            {errors.feeDiscountDescription && <p className="font12 text-danger">{errors.feeDiscountDescription.message}</p>}
                        </div>
                        <p className='text-center p-3'>
                            <button className='btn addButtons3 font14 text-white me-2' type='submit'>Update Fee Discount</button>
                            <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                        </p>
                    </form>
                </div>
            </div>



            {/* Delete Fee Master */}
            <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeDiscount" aria-labelledby="deleteFeeDiscountLabel">
                <div className="offcanvas-header border-bottom border-2 p-2">
                    <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                            <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                        </svg>
                    </Link>
                    <h2 className="offcanvas-title" id="deleteFeeGroupeLabel">Delete Fees Group</h2>
                </div>
                <div className="offcanvas-body p-3">
                    <div className=''>
                        <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                        <p className='text-center warningHeading'>Are you Sure?</p>
                        <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                        <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" checked={isChecked} id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                        <p className='text-center p-3'>
                            <button className='btn deleteButtons text-white' onClick={() => DeleteFeeDiscountById(DelFeeDiscountIdData)}>Delete</button>
                            <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                    </div>
                </div>
            </div>

            <Toaster />
        </Container>
    )
}

export default ViewAllFeeDiscount

