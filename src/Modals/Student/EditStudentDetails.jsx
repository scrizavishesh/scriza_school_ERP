import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { addNewStudentApi, getAllClassApi, getAllFeeMasterApi, getStudentDataByIdApi, updateStudentApi } from '../../Utils/Apis'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import DataLoader from '../../Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    overflow: scroll;

    .formimagetext{
      border-radius: 5px 0px 0px 5px !important;
    }

    .hideScrollBar::-webkit-scrollbar {
        display: none !important;
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px ;
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

const EditStudentDetails = ({ studentGetId, onReload }) => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // loader State
  const [loaderState, setloaderState] = useState(false);
  const [studentEmailVal, setStudentEmailVal] = useState('');
  const [parentEmailVal, setParentEmailVal] = useState('');
  // Data States
  const [FeeMasterData, setFeeMasterData] = useState([])
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    mode: 'onChange'
  });

  const sectionIdVal = watch('sectionName');

  const [studentImageVal, setstudentImageVal] = useState('')
  const [parentImageVal, setparentImageVal] = useState('')

  // Chnage type of input State
  const [changeImageType, setChangeImageType] = useState(true)
  const [changeImageTypeParent, setChangeImageTypeParent] = useState(true)


  //UseEffect Call
  useEffect(() => {
    getAllClassData();
    getAllFeeMasterData();
    getStudentDataById();
  }, [token, studentGetId])

  // All API Functions
  const getAllClassData = async () => {
    setloaderState(true);
    try {
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllClassData(response?.data?.classes);
          setloaderState(false);
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
    }
  }

  const getAllFeeMasterData = async () => {
    try {
      setloaderState(true);
      var response = await getAllFeeMasterApi('', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setFeeMasterData(response?.data?.feeMaster);
          setloaderState(false);
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

  const handleClassChange = async (val) => {
    setloaderState(true)
    if (!allClassData || allClassData.length === 0) {
      console.log('Class data is not available yet.');
      return;
    }
    setloaderState(true);
    const classNoVal = parseInt(val);
    setValue('classNo', classNoVal);
    const selectedClass = allClassData.find(c => c.classNo === classNoVal);
    if (selectedClass) {
      setloaderState(false)
      setAllSectionData(selectedClass.section || []);
    } else {
      setloaderState(false)
      setAllSectionData([]);
    }
    setloaderState(false);
    if (selectedClass.section.length > 0) {
      setValue('sectionName', selectedClass.section[0].classSecId);
    }
  };

  const getStudentDataById = async () => {
    setloaderState(true);
    try {
      var response = await getStudentDataByIdApi(studentGetId);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setValue('studentName', response?.data?.student?.studentName);
          setValue('feeGroupName', response?.data?.student?.feeGroupName);
          setValue('fatherName', response?.data?.student?.fatherName);
          setValue('motherName', response?.data?.student?.motherName);
          setValue('studentPh', response?.data?.student?.studentPhone);
          setValue('parentNo', response?.data?.student?.parentNo);
          setValue('studentEmail', response?.data?.student?.studentEmail);
          setStudentEmailVal(response?.data?.student?.studentEmail);
          setValue('parentEmail', response?.data?.student?.parentEmail);
          setParentEmailVal(response?.data?.student?.parentEmail);
          setValue('fatherOccupation', response?.data?.student?.fatherOccupation);
          setValue('motherOccupation', response?.data?.student?.motherOccupation);
          await handleClassChange(response?.data?.student?.classNo);
          setValue('sectionName', response?.data?.student?.classSection);
          setValue('studentDOB', response?.data?.student?.dateOfBirth);
          setValue('gender', response?.data?.student?.studentGender);
          setValue('studentAddress', response?.data?.student?.address);
          setValue('emergencyNo', response?.data?.student?.emergencyNo);
          setValue('studentImage', response?.data?.student?.studentImage);
          setstudentImageVal(response?.data?.student?.studentImage);
          setValue('parentImage', response?.data?.student?.parentImage);
          setparentImageVal(response?.data?.student?.parentImage);
          setValue('feeGroupName', response?.data?.feeGroup);
          if (response?.data?.student?.studentImage === '' || response?.data?.student?.studentImage === null){
            setChangeImageType(false)
          }
          else{
            setChangeImageType(true)
          }
          if (response?.data?.student?.parentImage === '' || response?.data?.student?.parentImage === null){
            setChangeImageTypeParent(false)
          }
          else {
            setChangeImageTypeParent(true)
          }
          setloaderState(false);
        } else {
          toast.error(response?.data?.msg);
          setloaderState(false);
        }
      } else {
        setloaderState(false);
      }
    } catch (error) {
      setloaderState(false);
      // console.log('error', error);
    }
  };

  const updateStudent = async (data) => {
    setloaderState(true)
    console.log(data, 'data')
    try {
      const formData = new FormData();
      formData.append("studentName", data.studentName);
      formData.append("fatherName", data.fatherName);
      formData.append("motherName", data.motherName);
      formData.append("parentNo", data.parentNo);
      if (data?.studentEmail !== studentEmailVal) {
        formData.append("studentEmail", data.studentEmail);
      }
      if (data?.parentEmail !== parentEmailVal) {
        formData.append("parentEmail", data.parentEmail);
      }
      formData.append("fatherOccupation", data.fatherOccupation);
      formData.append("motherOccupation", data.motherOccupation);
      formData.append("classNo", data.classNo);
      formData.append("sectionName", data.sectionName);
      formData.append("studentDOB", data.studentDOB);
      formData.append("gender", data.gender);
      formData.append("studentAddress", data.studentAddress);
      formData.append("emergencyNo", data.emergencyNo);
      formData.append("studentPh", data.studentPh);
      formData.append("feeGroupName", data.feeGroupName);
      
      if (data?.studentImage !== studentImageVal) {
        formData.append("studentImage", data.studentImage);
      }

      if (data?.parentImage !== parentImageVal) {
        formData.append("parentImage", data.parentImage[0]);
      }

      var response = await updateStudentApi(studentGetId, formData);
      console.log(response, 'res')
      if (response?.status === 200) {
        console.log(response?.status, '200')
        if (response?.data?.status === 'success') {
          setloaderState(false)
          toast.success(response?.data?.message)
          onReload(true)
        }
        else {
          setloaderState(false)
          toast.error(response?.data?.message);
          console.log('fail')
        }
      } else {
        setloaderState(false)
        toast.error(response?.data?.message);
      }
    } catch (error) {
      setloaderState(false)
      toast.error(response?.data?.message);
      console.error('Error during update:', error);
    }
  }


  return (
    <>
      <Container className='hideScrollBar pt-3'>
        {
          loaderState && (
            <DataLoader />
          )
        }
        <div className="container-fluid">
          <form className="row h-100 overflow-scroll" onSubmit={handleSubmit(updateStudent)}>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label font14">Name*</label>
              <input id="studentName" type="text" className={`form-control font14 ${errors.studentName ? 'border-danger' : ''}`} placeholder="Enter Student Name" {...register('studentName', { required: 'Student Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Student Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Student Name'; } return true; } })} />
              {errors.studentName && <p className="font12 text-danger">{errors.studentName.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="bloodGroup" className="form-label font14">Blood Group*</label>
              <select id="bloodGroup" className={`form-select font14 ${errors.bloodGroup ? 'border-danger' : ''}`} {...register('bloodGroup', { required: 'BloodGroup is required *' })} >
                <option value="" disabled>Select Blood Group</option>
                <option value='AB+'>AB+</option>
                <option value='A+'>A+</option>
                <option value='B+'>B+</option>
                <option value='O+'>O+</option>
              </select>
              {errors.bloodGroup && <p className="font12 text-danger">{errors.bloodGroup.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="fatherName" className="form-label font14">Father Name*</label>
              <input id="fatherName" type="text" className={`form-control font14 ${errors.fatherName ? 'border-danger' : ''}`} placeholder="Enter Father's Name" {...register('fatherName', { required: 'Father Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Father Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Father Name'; } return true; } })} />
              {errors.fatherName && <p className="font12 text-danger">{errors.fatherName.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="motherName" className="form-label font14">Mother Name*</label>
              <input id="motherName" type="text" className={`form-control font14 ${errors.motherName ? 'border-danger' : ''}`} placeholder="Enter Mother's Name" {...register('motherName', { required: 'Mother Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Mother Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Mother Name'; } return true; } })} />
              {errors.motherName && <p className="font12 text-danger">{errors.motherName.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="studentPh" className="form-label font14">Student Contact Details*</label>
              <input id="studentPh" type="tel" className={`form-control font14 ${errors.studentPh ? 'border-danger' : ''}`} placeholder="Enter Student's Phone Number" {...register('studentPh', { required: `Student's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
              {errors.studentPh && <p className="font12 text-danger">{errors.studentPh.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="parentNo" className="form-label font14">Parent Contact Details*</label>
              <input id="parentNo" type="tel" className={`form-control font14 ${errors.parentNo ? 'border-danger' : ''}`} placeholder="Enter Parent's Phone Number" {...register('parentNo', { required: `Parent's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
              {errors.parentNo && <p className="font12 text-danger">{errors.parentNo.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="studentEmail" className="form-label font14">Student Email*</label>
              <input id="studentEmail" type="email" className={`form-control font14 ${errors.studentEmail ? 'border-danger' : ''}`} placeholder="Enter Student's Email" {...register('studentEmail', { required: `Student's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
              {errors.studentEmail && <p className="font12 text-danger">{errors.studentEmail.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="parentEmail" className="form-label font14">Parent Email*</label>
              <input id="parentEmail" type="email" className={`form-control font14 ${errors.parentEmail ? 'border-danger' : ''}`} placeholder="Enter Parent's Email" {...register('parentEmail', { required: `Parent's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
              {errors.parentEmail && <p className="font12 text-danger">{errors.parentEmail.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="fatherOccupation" className="form-label font14">Father Occupation*</label>
              <select id="fatherOccupation" className={`form-select font14 ${errors.fatherOccupation ? 'border-danger' : ''}`} {...register('fatherOccupation', { required: 'Father Occupation is required *' })} >
                <option value='' disabled>--- Choose ---</option>
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
            <div className="mb-3">
              <label htmlFor="motherOccupation" className="form-label font14">Mother Occupation*</label>
              <select id="motherOccupation" className={`form-select font14 ${errors.motherOccupation ? 'border-danger' : ''}`} {...register('motherOccupation', { required: 'Mother Occupation is required *' })} >
                <option value='' disabled>--- Choose ---</option>
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
            <div className="mb-3">
              <label htmlFor="classNo" className="form-label font14">Class*</label>
              <select id="classNo" className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`} {...register('classNo', { required: 'Class is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
                <option value="" disabled>--- Select ---</option>
                {allClassData.map((classs) => (<option key={classs.classId} value={classs.classNo}> {classs.classNo} </option>))}
              </select>
              {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="sectionName" className="form-label font14">Section</label>
              <select id="sectionName" className={`form-select font14 ${errors.sectionName ? 'border-danger' : ''}`} value={sectionIdVal} {...register('sectionName', { required: 'Section is required *' })} >
                <option value="" disabled>--- Select ---</option>
                {allSectionData.map((section) => (<option key={section.classSecId} value={section.sectionName}> {section.sectionName} </option>))}
                {/* {allSectionData.map(section => (
                    <option key={section.classSecId} value={section.sectionName}> 
                      {section.sectionName}
                    </option>
                ))} */}
              </select>
              {errors.sectionName && <p className="font12 text-danger">{errors.sectionName.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="studentDOB" className="form-label font14">Birthday*</label>
              <input id="studentDOB" type="date" className={`form-control font14 ${errors.studentDOB ? 'border-danger' : ''}`} placeholder="Enter Date Of Birth" {...register("studentDOB", { required: 'Date Of Birth is required *' })} />
              {errors.studentDOB && <p className="font12 text-danger">{errors.studentDOB.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label font14">Gender*</label>
              <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required *' })} >
                <option value='' disabled>--- Select ---</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
              </select>
              {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="studentAddress" className="form-label font14">Address*</label>
              <input id="studentAddress" type="text" className={`form-control font14 ${errors.studentAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("studentAddress", { required: 'Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
              {errors.studentAddress && <p className="font12 text-danger">{errors.studentAddress.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="emergencyNo" className="form-label font14">Emergency Contact Details*</label>
              <input id="emergencyNo" type="tel" className={`form-control font14 ${errors.emergencyNo ? 'border-danger' : ''}`} placeholder="Enter Emergency Phone Number" {...register('emergencyNo', { required: 'Emergency Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
              {errors.emergencyNo && <p className="font12 text-danger">{errors.emergencyNo.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="studentImage" className="form-label font14">Student Image*</label>
              <div className="d-flex bg-white">
                {studentImageVal !== null && changeImageType ?
                  <input id="studentImageText" type="text" className='form-control formimagetext font14' value={studentImageVal.split('/').pop()} disabled />
                  :
                  <input id="studentImage" type="file" className={`form-control formimagetext font14 ${errors.studentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('studentImage', { required: 'Student Image is required *', validate: value => { if (value && value.length > 0) { const file = value[0]; if (file.size < 10240 || file.size > 204800) { return 'File size must be between 10 KB to 200 KB'; } } return true; } })} />
                }
                <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                  <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)} disabled={studentImageVal === null || studentImageVal === '' ? true : false}>
                    {studentImageVal !== null && changeImageType ? 'Edit' : 'View'}
                  </span>
                </div>
              </div>
              {errors.studentImage && <p className="font12 text-danger">{errors.studentImage.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="parentImage" className="form-label font14">Parent Image*</label>
              <div className="d-flex bg-white">
                {parentImageVal !== null && changeImageTypeParent ?
                  <input id="parentImageText" type="text" className='form-control formimagetext font14' value={parentImageVal.split('/').pop()} disabled />
                  :
                  <input id="parentImage" type="file" className={`form-control formimagetext font14 ${errors.parentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('parentImage', { required: 'Parent Image is required *', validate: value => { if (value && value.length > 0) { const file = value[0]; if (file.size < 10240 || file.size > 204800) { return 'File size must be between 10 KB to 200 KB'; } } return true; } })} />
                }
                <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center' >
                  <span className="text-white font14 align-self-center" onClick={() => setChangeImageTypeParent(!changeImageTypeParent)} disabled={parentImageVal === null || parentImageVal === '' ? true : false }>
                    {parentImageVal !== null && changeImageTypeParent ? 'Edit' : 'View'}
                  </span>
                </div>
              </div>
              {errors.parentImage && <p className="font12 text-danger">{errors.parentImage.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="feeGroupName" className="form-label font14">Fee Group*</label>
              <select id="feeGroupName" className={`form-select font14 ${errors.feeGroupName ? 'border-danger' : ''}`} {...register('feeGroupName', { required: 'Fee Group Selection is required *' })} >
                <option value="" disabled>--- Select ---</option>
                {FeeMasterData?.map(option => (
                  <option key={option.feeGroup} value={option.feeGroup}>
                    {option.feeGroup}
                  </option>
                ))}
              </select>
              {errors.feeGroupName && <p className="font12 text-danger">{errors.feeGroupName.message}</p>}
            </div>
            <p className='text-center p-3'>
              <button className='btn updateButtons text-white' type='submit'>Update</button>
              <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
            </p>
          </form>
          <Toaster />
        </div>
      </Container>
    </>
  )
}

export default EditStudentDetails
