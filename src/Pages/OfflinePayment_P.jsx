import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components';
import { AddNewOfflinePaymentApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';

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
        box-shadow: none;
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

    .greenText{
      color: var(--greenTextColor) !important;
    }

    .modal-footer{
        border: none !important;
    }

`;


const OfflinePayment = () => {

    const { id } = useParams();

    const navigate = useNavigate('');

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    const AddNewOfflinePayment = async (data) => {
        setloaderState(true)
        console.log('start', data)
        try {
            console.log('first')
            const formData = new FormData();
            formData.append('dateOfPayment', data?.dateOfPayment);
            formData.append('paymentMode', data?.paymentMode);
            formData.append('paymentFrom', data?.paymentFrom);
            formData.append('reference', data?.reference);
            formData.append('amountPaid', data?.amountPaid);
            formData.append('multipartFile', data?.multipartFile[0]);
            
            var response = await AddNewOfflinePaymentApi(id, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    toast.success(response?.data?.message)
                    navigate('/Fees')
                }
                else {
                    toast.error(response?.data?.message)
                    setloaderState(false)
                }
            }

        }
        catch (error) {
            setloaderState(false)
            console.log('first', error)
        }
    }

    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid pt-4 ">
                <div className="row gap-xl-0 gap-3">
                    <div className="col-xxl-5 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Fee Collection </a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees</li>
                            </ol>
                        </nav>
                        <p className='font14 ps-0 fontWeight500'>Fees List</p>
                    </div>
                    <div className="col-xxl-7 col-xl-8 col-lg-12 col-sm-12">
                        {/* <div className="row gap-sm-0 gap-3">

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
                        </div> */}
                    </div>
                </div>
            </div>
            <div className="container-fluid p-4">
                <div className="row bg-white cardradius2 p-3">
                    <p className='greenText font14 p-0'>Offline Bank Payments</p>
                    <hr className='mt-2 mb-1' />
                    <form className="row g-3" onSubmit={handleSubmit(AddNewOfflinePayment)}>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="dateOfPayment" className="form-label font14">Date Of Payment *</label>
                            <input id="dateOfPayment" type="date" className={`form-control font14 ${errors.dateOfPayment ? 'border-danger' : ''}`} placeholder="Enter Date " {...register("dateOfPayment", { required: 'Date Of Payment is required *' })} />
                            {errors.dateOfPayment && <p className="font12 text-danger">{errors.dateOfPayment.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="paymentMode" className="form-label font14">Payment Mode *</label>
                            <select id="paymentMode" className={`form-select font14 ${errors.paymentMode ? 'border-danger' : ''}`} {...register('paymentMode', { required: 'Payment Mode is required *' })} >
                                <option value="" disabled selected>--- Select ---</option>
                                <option value='Offline'>Offline</option>
                                <option value='Online'>Online</option>
                            </select>
                            {errors.paymentMode && <p className="font12 text-danger">{errors.paymentMode.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Payment From *</label>
                            <input id="paymentFrom" type="text" className={`form-control font14 ${errors.paymentFrom ? 'border-danger' : ''}`} placeholder="Enter Payment From" {...register('paymentFrom', { required: 'Payment From is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Payment From must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Payment From'; } return true; } })} />
                            {errors.paymentFrom && <p className="font12 text-danger">{errors.paymentFrom.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault01" className="form-label font14">Reference *</label>
                            <input id="reference" type="text" className={`form-control font14 ${errors.reference ? 'border-danger' : ''}`} placeholder="Enter Reference" {...register('reference', { required: 'Reference is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Reference must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Reference'; } return true; } })} />
                            {errors.reference && <p className="font12 text-danger">{errors.reference.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Amount Paid ($) *</label>
                            <input id="amountPaid" type="number" className={`form-control font14 ${errors.amountPaid ? 'border-danger' : ''}`} placeholder='Enter Paid Amount' {...register('amountPaid', { required: 'Paid Amount id required *', min: { value: 0, message: 'Amount cannot be negative' } })} />
                            {errors.amountPaid && <p className="font12 text-danger">{errors.amountPaid.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="validationDefault02" className="form-label font14">Proof Of Payment *</label>
                            <input id="multipartFile" type="file" className={`form-control font14 ${errors.multipartFile ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('multipartFile', { required: 'Student Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            {errors.multipartFile && <p className="font12 text-danger">{errors.multipartFile.message}</p>}
                        </div>
                        <div className="row p-5">
                            <div className="col-md-6 col-sm-6 col-6 text-end">
                                <button className='btn saveButtons font16 text-white' type='submit'>Save</button>
                            </div>
                            <div className="col-md-6 col-sm-6 col-6 text-start">
                                <Link className='btn cancelButtons font16' to='/Fees'>Cancel</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}

export default OfflinePayment