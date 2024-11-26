import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { getSchoolDataByIdAPI, updateSchoolDataByIdAPI } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .formimagetext{
        border-radius: 5px 0px 0px 5px;
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
    
`;


const SchoolSetting = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // Data State

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    const [schoolLogoVal, setSchoolLogoVal] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)

    useEffect(() => {
        getSchoolDataById();
    }, [token])

    const getSchoolDataById = async () => {
        try {
            setloaderState(true);
            var response = await getSchoolDataByIdAPI();
            if (response?.status == 200) {
                if (response?.data?.status === 'success') {
                    const schoolDataById = response?.data?.school
                    setValue('schoolName', schoolDataById?.schoolName === null ? '' : schoolDataById?.schoolName);
                    setValue('schoolPhone', schoolDataById?.schoolPhone === null ? '' : schoolDataById?.schoolPhone);
                    setValue('schoolAddress', schoolDataById?.schoolAddress === null ? '' : schoolDataById?.schoolAddress);
                    setValue('schoolInfo', schoolDataById?.description === null ? '' : schoolDataById?.description);
                    setValue('email', schoolDataById?.schoolEmail === null ? '' : schoolDataById?.schoolEmail);
                    setValue('warningText', schoolDataById?.warningText === null ? '' : schoolDataById?.warningText);
                    setValue('socialLink1', schoolDataById?.socialLink1 === null ? '' : schoolDataById?.socialLink1);
                    setValue('socialLink2', schoolDataById?.socialLink2 === null ? '' : schoolDataById?.socialLink2);
                    setValue('socialLink3', schoolDataById?.socialLink3 === null ? '' : schoolDataById?.socialLink3);
                    setValue('schoolLogo', schoolDataById?.schoolPhoto === null ? '' : schoolDataById?.schoolPhoto);
                    setSchoolLogoVal(schoolDataById?.schoolPhoto)
                    setloaderState(false);
                    // toast.success(response?.data?.message)
                }
                else {
                    toast.error(response?.data?.message)
                }
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

    const UpdateSchoolSettingFun = async (data) => {

        try {
            const formData = new FormData();
            formData.append('schoolPrefix', '')
            formData.append('schoolName', data?.schoolName)
            formData.append('schoolAddress', data?.schoolAddress)
            formData.append('schoolPhone', data?.schoolPhone)
            formData.append('email', data?.email)
            formData.append('schoolInfo', data?.schoolInfo)
            formData.append('socialLink1', data?.socialLink1)
            formData.append('socialLink2', data?.socialLink2)
            formData.append('socialLink3', data?.socialLink3)
            formData.append('warningText', data?.warningText)
            if (data?.schoolLogo[0] === schoolLogoVal) {
                formData.append('schoolLogo', data?.schoolLogo[0])
            }
            var response = await updateSchoolDataByIdAPI(formData);
            if (response?.status === 200) {
                if (response.data.status === 'success') {
                    toast.success(response?.data?.message)
                    setTimeout(() => {
                        navigate('/');
                    }, 1000);
                }
            } else {
                toast.error(response?.error);
            }
        } catch (error) {
            console.error('Error during update:', error);
        }
    }

    const handleSocialLink3Change = (value) => {
        setSchoolSocial3(value);
        setSchoolSocial3Error(validateSocialLink3(value))
    }

    const validateSocialLink3 = (value) => {
        if (value.trim() === '') {
            return '* Social Media Link is required';
        }
        const socialLinkPattern = /^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/;
        if (!socialLinkPattern.test(value)) {
            return 'Invalid social media link';
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
                    <div className="row p-2 pt-4">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/schoolSetting" className='bredcrumText text-decoration-none'>Settings</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">School Settings</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>School Settings</p>
                        </div>
                        <div className="row pb-3">
                            <div className="overflow-scroll cardradius bg-white p-3">
                                <form className="row" onSubmit={handleSubmit(UpdateSchoolSettingFun)}>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Name</label>
                                        <input id="schoolName" type="text" className={`form-control font14 ${errors.schoolName ? 'border-danger' : ''}`} placeholder="Enter School Name" {...register('schoolName', { required: 'School Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'School Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in School Name'; } return true; } })} />
                                        {errors.schoolName && <p className="font12 text-danger">{errors.schoolName.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Phone</label>
                                        <input id="schoolPhone" type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter School's Phone Number" {...register('schoolPhone', { required: `School Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                                        {errors.schoolPhone && <p className="font12 text-danger">{errors.schoolPhone.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Address</label>
                                        <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("schoolAddress", { required: 'School Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.schoolAddress && <p className="font12 text-danger">{errors.schoolAddress.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">School Information</label>
                                        <input id="schoolInfo" type="text" className={`form-control font14 ${errors.schoolInfo ? 'border-danger' : ''}`} placeholder="Entes School Info" {...register("schoolInfo", { validate: value => { if (!value) return true; if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'School Info must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.schoolInfo && <p className="font12 text-danger">{errors.schoolInfo.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Email Receipt Title</label>
                                        <input id="email" type="email" className={`form-control font14 ${errors.email ? 'border-danger' : ''}`} placeholder="Enter School's Email" {...register('email', { required: `School Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                                        {errors.email && <p className="font12 text-danger">{errors.email.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 1</label>
                                        <input id="socialLink1" type="text" className={`form-control font14 ${errors.socialLink1 ? 'border-danger' : ''}`} placeholder="Enter Social Link" {...register('socialLink1', { validate: value => { if (!value) return true; if (!/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(value)) { return 'Not a valid social link format'; } return true; } })} />
                                        {errors.socialLink1 && <p className="font12 text-danger">{errors.socialLink1.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="warningText" className="form-label font14">Warning Text</label>
                                        <input id="warningText" type="text" className={`form-control font14 ${errors.warningText ? 'border-danger' : ''}`} placeholder="Entes Warning Text" {...register("warningText", { validate: value => { if (!value) return true; if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                                        {errors.warningText && <p className="font12 text-danger">{errors.warningText.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 2</label>
                                        <input id="socialLink2" type="text" className={`form-control font14 ${errors.socialLink2 ? 'border-danger' : ''}`} placeholder="Enter Social Link" {...register('socialLink2', { validate: value => { if (!value) return true; if (!/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(value)) { return 'Not a valid social link format'; } return true; } })} />
                                        {errors.socialLink2 && <p className="font12 text-danger">{errors.socialLink2.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Social Link 3</label>
                                        <input id="socialLink3" type="text" className={`form-control font14 ${errors.socialLink3 ? 'border-danger' : ''}`} placeholder="Enter Social Link" {...register('socialLink3', { validate: value => { if (!value) return true; if (!/^(https?:\/\/)?(www\.)?(facebook|twitter|instagram|linkedin|youtube)\.com\/[a-zA-Z0-9(\.\?)?]/.test(value)) { return 'Not a valid social link format'; } return true; } })} />
                                        {errors.socialLink3 && <p className="font12 text-danger">{errors.socialLink3.message}</p>}
                                    </div>
                                    <div className="col-md-6 col-sm-12 mb-3">
                                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Update Logo</label>
                                        <div className="d-flex bg-white">
                                            {schoolLogoVal !== null && changeImageType ?
                                                <input id="schoolLogo" type="text" className='form-control formimagetext font14' value={schoolLogoVal.split('/').pop()} disabled />
                                                :
                                                <input id="schoolLogo" type="file" className={`form-control formimagetext font14 ${errors.schoolLogo ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('schoolLogo', { required: 'Student Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                            }
                                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                                    {schoolLogoVal !== null && changeImageType ? 'Edit' : 'View'}
                                                </span>
                                            </div>
                                        </div>
                                        {errors.schoolLogo && <p className="font12 text-danger">{errors.schoolLogo.message}</p>}
                                    </div>
                                    <div className="row p-3">
                                        <div className="col-md-6 col-sm-6 col-6 text-end">
                                            <button className='btn addCategoryButtons font16 text-white' type='submit'>Update Settings</button>
                                        </div>
                                        <div className="col-md-6 col-sm-6 col-6 text-start">
                                            <button className='btn cancelButtons font16' type='button'>Cancel</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default SchoolSetting




