import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { addNewDriverApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
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

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    .form-control::placeholder, .form-control , .form-select{
        color: var(--greyState)
    }

    .form-control , .form-select{
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
`;

const AddDriver = () => {

    const navigate = useNavigate('');
    // loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    const AddDriverData = async (data) => {
        console.log('try')
        try {
            const formData = new FormData();
            formData.append("driverName", data.driverName);
            formData.append("driverEmail", data.driverEmail);
            formData.append("gender", data.gender);
            formData.append("driverAddress", data.driverAddress);
            formData.append("phoneNo", data.phoneNo);
            formData.append("driverImage", data.driverImage[0]);
            var response = await addNewDriverApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    toast.success(response?.data?.message)
                    setTimeout(() => {
                        navigate('/driver');
                    }, 1500);
                }
                else{
                    toast.error(response?.data?.message, 'else 1');
                    setloaderState(false)
                }
            }
            else{
                toast.error(response?.data?.message, 'else 2');
                setloaderState(false)
            }
        }
        catch(error) { 
            toast.error(error);
            console.log(error, 'catch error')
            setloaderState(false)
            if (error?.response?.data?.statusCode === 401){
              localStorage.removeItem('token')
              setTimeout(() => {
                navigate('/')
              }, 200);
            }
        }
    }


    return (
        <>
            <Container>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid">
                    <div className="row p-4">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Driver</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>Add Driver Form</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <form className="row g-3" onSubmit={handleSubmit(AddDriverData)}>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="driverName" className="form-label font14">Name*</label>
                                        <input id="driverName" type="text" className={`form-control font14 ${errors.driverName ? 'border-danger' : ''}`} placeholder="Enter Driver Name" {...register('driverName', { required: 'Driver Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Driver Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Driver Name'; } return true; } })} />
                                        {errors.driverName && <p className="font12 text-danger">{errors.driverName.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="driverEmail" className="form-label font14">Email*</label>
                                        <input id="driverEmail" type="email" className={`form-control font14 ${errors.driverEmail ? 'border-danger' : ''}`} placeholder="Enter Driver's Email" {...register('driverEmail', { required: `Driver's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                                        {errors.driverEmail && <p className="font12 text-danger">{errors.driverEmail.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="driverAddress" className="form-label font14">Address*</label>
                                        <input id="driverAddress" type="text" className={`form-control font14 ${errors.driverAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("driverAddress", { required: 'Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.driverAddress && <p className="font12 text-danger">{errors.driverAddress.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="phoneNo" className="form-label font14">Phone*</label>
                                        <input id="phoneNo" type="tel" className={`form-control font14 ${errors.phoneNo ? 'border-danger' : ''}`} placeholder="Enter Driver's Phone Number" {...register('phoneNo', { required: `Driver's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                                        {errors.phoneNo && <p className="font12 text-danger">{errors.phoneNo.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="gender" className="form-label font14">Gender*</label>
                                        <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required *' })} >
                                            <option value='' >--- Choose ---</option>
                                            <option value='Male'>Male</option>
                                            <option value='Female'>Female</option>
                                        </select>
                                        {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 col-12">
                                        <label htmlFor="driverImage" className="form-label font14">Photo*</label>
                                        <input id="driverImage" type="file" className={`form-control font14 ${errors.driverImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' onChange={(e) => { const files = e.target.files; setValue('driverImage', files[0]); }}  {...register('driverImage', { required: 'Driver Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                        {errors.driverImage && <p className="font12 text-danger">{errors.driverImage.message}</p>}
                                    </div>
                                <div className="row p-5">
                                    <div className="col-md-6 col-sm-6 col-6 text-end">
                                        <button className='btn AddBtnn font16 text-white' type='submit'>Add Driver</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-6 text-start">
                                        <Link className='btn CancelBtnn font16' to='/driver' >Cancel</Link>
                                    </div>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <Toaster/>
                </div>
            </Container>
        </>
    )
}

export default AddDriver
