import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { AdminAccountApi, getAdminDataAPI } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
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

    .headingBgColor{
        background-color: var(--headingBackgroundColor);
        
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 2px solid var(--BtnBorder);
    }

    .verifiedBtn{
        background-color: var(--verifiedButton);
    }
    
    .formimagetext{
        border-radius: 5px 0px 0px 5px;
    }
`;

const MyAccount = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // Data State

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });
    const adminNameVal = watch("adminName");
    const adminEmailVal = watch("adminEmail");
    const adminPhoneVal = watch("adminPhone");
    const adminAddressVal = watch("adminAddress");

    const [adminPhotoVal, setAdminPhotoVal] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)

    useEffect(() => {
        getAdminData();
    }, [token])

    const getAdminData = async () => {
        try {
            setloaderState(true);
            var response = await getAdminDataAPI();
            if (response?.status === 200) {
                setValue('adminName', response?.data?.name)
                setValue('adminGender', response?.data?.gender)
                // setValue('adminAddress', response?.data?.address)
                setValue('adminEmail', response?.data?.email)
                setValue('adminPhone', response?.data?.phone)
                setValue('adminDesignation', response?.data?.designation)
                setValue('adminDOB', response?.data?.dateOfBirthB)
                setValue('adminPhoto', response?.data?.image)
                setAdminPhotoVal(response?.data?.image)
                setloaderState(false);
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

    const UpdateAdminByadminId = async (data) => {
        try {
            const formData = new FormData();
            formData.append("adminName", data?.adminName === null ? '' : data?.adminName);
            formData.append("adminGender", data?.adminGender === null ? '' : data?.adminGender);
            formData.append("adminAddress", data?.adminAddress === null ? '' : data?.adminAddress);
            formData.append("adminEmail", data?.adminadminEmail === null ? '' : data?.adminEmail);
            formData.append("adminPhone", data?.adminPhone === null ? '' : data?.adminPhone);
            formData.append("adminDesignation", data?.adminDesignation === null ? '' : data?.adminDesignation);
            formData.append("adminBirthDate", data?.adminBirthDate === null ? '' : data?.adminBirthDate);
            formData.append("adminPhoto", data?.adminPhoto[0]);
            var response = await AdminAccountApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    // navigate('/allAdmin')
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch (error) {
            console.log(error, 'error')
        }
    }

    return (

        <Container>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="container-fluid pt-4">
                <div className="row pb-3">
                    <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                        <ol className="breadcrumb mb-1">
                            <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                            <li className="breadcrumb-item"><a href="/schoolSetting" className='bredcrumText text-decoration-none'>Settings</a></li>
                            <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">My Account</li>
                        </ol>
                    </nav>
                    <p className='font16 ps-0 fontWeight500'>My Account</p>
                </div>
                <div className="row pb-3">
                    <div className="overflow-scroll cardradius bg-white">
                        <div className="row p-4">
                            <div className="col-md-4 col-sm-12">
                                <div className="row h-100">
                                    <div className="headingBgColor cardradius2 ps-4 pe-4">
                                        <p className='p-3 text-center'><img className='rounded-circle' src={adminPhotoVal} alt="" height={60} /></p>
                                        <h2 className='text-center mb-2 activeTexttt fontWeight600'>{adminNameVal}</h2>
                                        <div className="d-flex align-items-center justify-content-center mb-2">
                                            <h2 className=''>Admin</h2>
                                            <button className='ms-2 verifiedBtn btn text-white font12 align-items-center p-1 ps-3 pe-3 cardradius2'>Verified</button>
                                        </div>
                                        <hr className='mb-3' />
                                        <h2 className='p-0 mb-3 activeTexttt fontWeight600'>Details info</h2>
                                        <hr className='mb-2' />
                                        <form action="" className='pe-0'>
                                            <div className="row p-0">
                                                <label htmlFor="staticadminEmail" className="col-sm-3 col-form-label greyText font14">Email :</label>
                                                <div className="col-sm-9 flex-wrap"> <input type="text" readOnly className="form-control-plaintext text-end font14" id="staticadminEmail" value={adminEmailVal} /> </div>
                                            </div>
                                            <div className="row p-0">
                                                <label htmlFor="staticPhone" className="col-sm-3 col-form-label greyText font14">Phone :</label>
                                                <div className="col-sm-9 flex-wrap"> <input type="text" readOnly className="form-control-plaintext text-end font14" id="staticPhone" value={adminPhoneVal} /> </div>
                                            </div>
                                            <div className="row p-0">
                                                <label htmlFor="staticAddress" className="col-sm-3 col-form-label greyText font14">Address :</label>
                                                <div className="col-sm-9"><input type="text" readOnly className="form-control-plaintext text-end text-break font14" id="staticAddress" value={adminAddressVal} /> </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <form className="row mb-1 g-3" onSubmit={handleSubmit(UpdateAdminByadminId)}>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Name</label>
                                        <input id="adminName" type="text" className={`form-control font14 ${errors.adminName ? 'border-danger' : ''}`} placeholder="Enter admin Name" {...register('adminName', { required: 'admin Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'admin Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in admin Name'; } return true; } })} />
                                        {errors.adminName && <p className="font12 text-danger">{errors.adminName.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">adminEmail</label>
                                        <input id="adminEmail" type="email" className={`form-control font14 ${errors.adminEmail ? 'border-danger' : ''}`} placeholder="Enter admin's adminEmail" {...register('adminEmail', { required: `admin adminEmail is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid adminEmail format'; } return true; } })} />
                                        {errors.adminEmail && <p className="font12 text-danger">{errors.adminEmail.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Designation</label>
                                        <input id="adminDesignation" type="text" className={`form-control font14 ${errors.adminDesignation ? 'border-danger' : ''}`} placeholder="Enter Designation" {...register("adminDesignation", { validate: value => { if (!value) return true; if (!/^[a-zA-Z0-9\s]+$/.test(value)) { return 'Designation must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.adminDesignation && <p className="font12 text-danger">{errors.adminDesignation.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Birthday</label>
                                        <input id="adminBirthDate" type="date" className={`form-control font14 ${errors.adminBirthDate ? 'border-danger' : ''}`} placeholder="Enter Date Of Birth" {...register("adminBirthDate", { validate: value => { if (!value) return true; } })} />
                                        {errors.adminBirthDate && <p className="font12 text-danger">{errors.adminBirthDate.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Gender</label>
                                        <select id="adminGender" className={`form-select font14 ${errors.adminGender ? 'border-danger' : ''}`} {...register('adminGender', { required: 'Gender is required *' })} >
                                            <option value='' >--- Choose ---</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                        {errors.adminGender && <p className="font12 text-danger">{errors.adminGender.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Phone Number</label>
                                        <input id="adminPhone" type="tel" className={`form-control font14 ${errors.adminPhone ? 'border-danger' : ''}`} placeholder="Enter admin's Phone Number" {...register('adminPhone', { required: `admin Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                                        {errors.adminPhone && <p className="font12 text-danger">{errors.adminPhone.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault02" className="form-label font14">Address</label>
                                        <input id="adminAddress" type="text" className={`form-control font14 ${errors.adminAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("adminAddress", { required: 'admin Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.adminAddress && <p className="font12 text-danger">{errors.adminAddress.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <label htmlFor="validationDefault01" className="form-label font14">Photo</label>
                                        <div className="d-flex bg-white">
                                            {adminPhotoVal !== null && changeImageType ?
                                                <input id="adminPhoto" type="text" className='form-control formimagetext font14' value={adminPhotoVal.split('/').pop()} disabled />
                                                :
                                                <input id="adminPhoto" type="file" className={`form-control formimagetext font14 ${errors.adminPhoto ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('adminPhoto', { required: 'Admin Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                            }
                                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                                    {adminPhotoVal !== null && changeImageType ? 'Edit' : 'View'}
                                                </span>
                                            </div>
                                        </div>
                                        {errors.adminPhoto && <p className="font12 text-danger">{errors.adminPhoto.message}</p>}
                                    </div>
                                    <div className="col-12">
                                        <p>
                                            <button className='btn addButtons text-white font14' type='submit'>Save Changes</button>
                                            <button className='btn cancelButtons font14 ms-3' type='button'>Cancel</button>
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>

    )
}

export default MyAccount
