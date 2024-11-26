import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { addNewStudentApi, getAllClassApi, getAllFeeMasterApi } from '../Utils/Apis'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DataLoader from '../Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    overflow: scroll;

    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
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
`;


const SingleStudentAdmission = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // loader State
    const [loaderState, setloaderState] = useState(false);
    // Data States
    const [FeeMasterData, setFeeMasterData] = useState([])
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    //UseEffect Call
    useEffect(() => {
        getAllClassData();
        getAllFeeMasterData();
    }, [token])

    // All API Functions
    const getAllClassData = async () => {
        setloaderState(true);
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                    setloaderState(false);
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
            console.log('Error Facing during Get All Class API - ', error)
            if (error?.response?.data?.statusCode === 401){
              localStorage.removeItem('token')
              setTimeout(() => {
                navigate('/')
              }, 200);
            }
        }
    }

    const getAllFeeMasterData = async () => {
        try {
            setloaderState(true);
            const searchByKey = ''
            const pageNo = ''
            const pageSize = ''
            var response = await getAllFeeMasterApi(searchByKey, pageNo, pageSize);
            console.log(response, 'fee master')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setFeeMasterData(response?.data?.feeMaster);
                    setloaderState(false);
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

    const AddNewStudent = async (data) => {
        try {
            const formData = new FormData();
            formData.append("studentName", data.studentName);
            formData.append("bloodGroup", data.bloodGroup);
            formData.append("fatherName", data.fatherName);
            formData.append("motherName", data.motherName);
            formData.append("parentNo", data.parentNo);
            formData.append("studentEmail", data.studentEmail);
            formData.append("parentEmail", data.parentEmail);
            formData.append("fatherOccupation", data.fatherOccupation);
            formData.append("motherOccupation", data.motherOccupation);
            formData.append("classNo", data.classNo);
            formData.append("section", data.section);
            formData.append("studentDOB", data.studentDOB);
            formData.append("gender", data.gender);
            formData.append("studentAddress", data.studentAddress);
            formData.append("emergencyNo", data.emergencyNo);
            formData.append("studentPh", data.studentPh);
            formData.append("studentImage", data.studentImage[0]);
            formData.append("parentImage", data.parentImage[0]);
            formData.append("feeGroupName", data.feeGroupName);

            var response = await addNewStudentApi(formData);
            console.log(response, 'res')
            if (response?.status === 200) {
                console.log(response?.status, '200')
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    setTimeout(() => {
                        navigate('/allStudent');
                    }, 700);
                }
                else {
                    toast.error(response?.data?.message);
                    console.log('fail')
                }
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(response?.data?.message);
            console.error('Error during update:', error);
        }
    }

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setValue('classNo', classNoVal);
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
    };



    return (
        <>
            <Container className='hideScrollBar p-3'>
                { loaderState && ( <DataLoader /> ) }
                <div className="container-fluid">
                    <form className="row g-3 h-100 overflow-scroll" onSubmit={handleSubmit(AddNewStudent)}>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentName" className="form-label font14">Name*</label>
                            <input id="studentName" type="text" className={`form-control font14 ${errors.studentName ? 'border-danger' : ''}`} placeholder="Enter Student Name" {...register('studentName', { required: 'Student Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Student Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Student Name'; } return true; } })} />
                            {errors.studentName && <p className="font12 text-danger">{errors.studentName.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="bloodGroup" className="form-label font14">Blood Group*</label>
                            <select id="bloodGroup" className={`form-select font14 ${errors.bloodGroup ? 'border-danger' : ''}`} {...register('bloodGroup', { required: 'BloodGroup is required *' })} >
                                <option value="">Select Blood Group</option>
                                <option value='AB+'>AB+</option>
                                <option value='A+'>A+</option>
                                <option value='B+'>B+</option>
                                <option value='O+'>O+</option>
                            </select>
                            {errors.bloodGroup && <p className="font12 text-danger">{errors.bloodGroup.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="fatherName" className="form-label font14">Father Name*</label>
                            <input id="fatherName" type="text" className={`form-control font14 ${errors.fatherName ? 'border-danger' : ''}`} placeholder="Enter Father's Name" {...register('fatherName', { required: 'Father Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Father Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Father Name'; } return true; } })} />
                            {errors.fatherName && <p className="font12 text-danger">{errors.fatherName.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="motherName" className="form-label font14">Mother Name*</label>
                            <input id="motherName" type="text" className={`form-control font14 ${errors.motherName ? 'border-danger' : ''}`} placeholder="Enter Mother's Name" {...register('motherName', { required: 'Mother Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Mother Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Mother Name'; } return true; } })} />
                            {errors.motherName && <p className="font12 text-danger">{errors.motherName.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentPh" className="form-label font14">Student Contact Details*</label>
                            <input id="studentPh" type="tel" className={`form-control font14 ${errors.studentPh ? 'border-danger' : ''}`} placeholder="Enter Student's Phone Number" {...register('studentPh', { required: `Student's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                            {errors.studentPh && <p className="font12 text-danger">{errors.studentPh.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="parentNo" className="form-label font14">Parent Contact Details*</label>
                            <input id="parentNo" type="tel" className={`form-control font14 ${errors.parentNo ? 'border-danger' : ''}`} placeholder="Enter Parent's Phone Number" {...register('parentNo', { required: `Parent's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                            {errors.parentNo && <p className="font12 text-danger">{errors.parentNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentEmail" className="form-label font14">Student Email*</label>
                            <input id="studentEmail" type="email" className={`form-control font14 ${errors.studentEmail ? 'border-danger' : ''}`} placeholder="Enter Student's Email" {...register('studentEmail', { required: `Student's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                            {errors.studentEmail && <p className="font12 text-danger">{errors.studentEmail.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="parentEmail" className="form-label font14">Parent Email*</label>
                            <input id="parentEmail" type="email" className={`form-control font14 ${errors.parentEmail ? 'border-danger' : ''}`} placeholder="Enter Parent's Email" {...register('parentEmail', { required: `Parent's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                            {errors.parentEmail && <p className="font12 text-danger">{errors.parentEmail.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="fatherOccupation" className="form-label font14">Father Occupation*</label>
                            <select id="fatherOccupation" className={`form-select font14 ${errors.fatherOccupation ? 'border-danger' : ''}`} {...register('fatherOccupation', { required: 'Father Occupation is required *' })} >
                                <option value='' >--- Choose ---</option>
                                <option value='Private'>Private</option>
                                <option value='Service Man'>Service Man</option>
                                <option value='Government'>Government</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Lawyer'>Lawyer</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Doctor'>Doctor</option>
                                <option value='Unemployment'>Unemployment</option>
                                <option value='Bussiness Man'>Bussiness Man</option>
                                <option value='Retired'>Retired</option>
                            </select>
                            {errors.fatherOccupation && <p className="font12 text-danger">{errors.fatherOccupation.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="motherOccupation" className="form-label font14">Mother Occupation*</label>
                            <select id="motherOccupation" className={`form-select font14 ${errors.motherOccupation ? 'border-danger' : ''}`} {...register('motherOccupation', { required: 'Mother Occupation is required *' })} >
                                <option value='' >--- Choose ---</option>
                                <option value='House Wife'>House Wife</option>
                                <option value='Government'>Government</option>
                                <option value='Working'>Working</option>
                                <option value='Accountant'>Accountant</option>
                                <option value='Lawyer'>Lawyer</option>
                                <option value='Teacher'>Teacher</option>
                                <option value='Doctor'>Doctor</option>
                                <option value='Unemployment'>Unemployment</option>
                                <option value='Retired'>Retired</option>
                            </select>
                            {errors.motherOccupation && <p className="font12 text-danger">{errors.motherOccupation.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="classNo" className="form-label font14">Class*</label>
                            <select id="classNo" className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`} {...register('classNo', { required: 'Class is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
                                <option value="">Select Class</option>
                                {allClassData.map((classs) => (<option key={classs.classId} value={classs.classNo}> {classs.classNo} </option>))}
                            </select>
                            {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="section" className="form-label font14">Section</label>
                            <select id="section" className={`form-select font14 ${errors.section ? 'border-danger' : ''}`} {...register('section', { required: 'Section is required *' })} >
                                <option value="">Select Section</option>
                                {allSectionData.map((section) => (<option key={section.classSecId} value={section.sectionName}> {section.sectionName} </option>))}
                            </select>
                            {errors.section && <p className="font12 text-danger">{errors.section.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentDOB" className="form-label font14">Birthday*</label>
                            <input id="studentDOB" type="date" className={`form-control font14 ${errors.studentDOB ? 'border-danger' : ''}`} placeholder="Enter Date Of Birth" {...register("studentDOB", { required: 'Date Of Birth is required *' })} />
                            {errors.studentDOB && <p className="font12 text-danger">{errors.studentDOB.message}</p>}
                            {/* <input type="date" className={`form-control font14  ${studentDOBError ? 'border-1 border-danger' : ''} `} id="validationDefault02" onChange={(e) => handleBirthdayChange(e.target.value)} />
                            <span className='text-danger'>{studentDOBError}</span> */}
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
                            <label htmlFor="studentAddress" className="form-label font14">Address*</label>
                            <input id="studentAddress" type="text" className={`form-control font14 ${errors.studentAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("studentAddress", { required: 'Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
                            {errors.studentAddress && <p className="font12 text-danger">{errors.studentAddress.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="emergencyNo" className="form-label font14">Emergency Contact Details*</label>
                            <input id="emergencyNo" type="tel" className={`form-control font14 ${errors.emergencyNo ? 'border-danger' : ''}`} placeholder="Enter Emergency Phone Number" {...register('emergencyNo', { required: 'Emergency Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                            {errors.emergencyNo && <p className="font12 text-danger">{errors.emergencyNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="studentImage" className="form-label font14">Student Image*</label>
                            <input id="studentImage" type="file" className={`form-control font14 ${errors.studentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('studentImage', { required: 'Student Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            {errors.studentImage && <p className="font12 text-danger">{errors.studentImage.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="parentImage" className="form-label font14">Parent Image*</label>
                            <input id="parentImage" type="file" className={`form-control font14 ${errors.parentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('parentImage', { required: 'Parent Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            {errors.parentImage && <p className="font12 text-danger">{errors.parentImage.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="feeGroupName" className="form-label font14">Fee Master*</label>
                            <select id="feeGroupName" className={`form-select font14 ${errors.feeGroupName ? 'border-danger' : ''}`} {...register('feeGroupName', { required: 'Fee Group Name is required *' })} >
                                <option value=''>--- Choose ---</option>
                                {FeeMasterData.map((option) => (
                                    <option key={option.feeGroup} value={option?.feeGroup}>
                                        {option.feeGroup.split('_').join(' ')}
                                    </option>
                                ))}
                            </select>
                            {errors.feeGroupName && <p className="font12 text-danger">{errors.feeGroupName.message}</p>}
                        </div>
                        <div className="row p-4">
                            <div className="col-md-6 col-sm-6 col-6 text-end">
                                <button className='btn AddBtnn font16 text-white' type='submit'>+ Add Student</button>
                            </div>
                            <div className="col-md-6 col-sm-6 col-6 text-start">
                                <button className='btn CancelBtnn font16' type='button'>Cancel</button>
                            </div>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    )
}

export default SingleStudentAdmission
