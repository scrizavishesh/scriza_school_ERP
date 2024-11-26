import React, { useEffect, useState } from 'react'
import { getAllClassApi, getAllFeeMasterApi, getStudentDataByIdApi, updateStudentApi } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';

const EditStudentDetails = ({ studentGetId, onReload }) => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  // Data State
  const [allFeeMaster, setAllFeeMaster] = useState([]);
  const [allClassData, setAllClassData] = useState([]);
  const [allSecAccToClassData, setAllSecAccToClassData] = useState([]);
  const [EditWarning, setEditWarning] = useState(true);
  // Variable State
  const [studentName, setStudentName] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [fatherName, setFatherName] = useState('')
  const [motherName, setMotherName] = useState('')
  const [parentNo, setParentNo] = useState('')
  const [studentEmail, setStudentEmail] = useState('')
  const [parentEmail, setParentEmail] = useState('')
  const [fatherOccupation, setFatherOccupation] = useState('')
  const [motherOccupation, setMotherOccupation] = useState('')
  const [classNo, setClassNo] = useState(0);
  const [section, setSection] = useState('')
  const [studentDOB, setstudentDOB] = useState()
  const [gender, setGender] = useState('')
  const [studentAddress, setStudentAddress] = useState('')
  const [emergencyNo, setEmergencyNo] = useState('')
  const [studentPh, setStudentPh] = useState('')
  const [studentImage, setStudentImage] = useState('')
  const [FeeMaster, setFeeMaster] = useState('')
  // Error State
  const [studentNameError, setStudentNameError] = useState('')
  const [bloodGroupError, setBloodGroupError] = useState('')
  const [fatherNameError, setFatherNameError] = useState('')
  const [motherNameError, setMotherNameError] = useState('')
  const [parentNoError, setParentNoError] = useState('')
  const [studentEmailError, setStudentEmailError] = useState('')
  const [parentEmailError, setParentEmailError] = useState('')
  const [fatherOccupationError, setFatherOccupationError] = useState('')
  const [motherOccupationError, setMotherOccupationError] = useState('')
  const [classNoError, setClassNoError] = useState('')
  const [sectionError, setSectionError] = useState('')
  const [studentDOBError, setstudentDOBError] = useState('')
  const [genderError, setGenderError] = useState('')
  const [studentAddressError, setStudentAddressError] = useState('')
  const [emergencyNoError, setEmergencyNoError] = useState('')
  const [studentPhError, setStudentPhError] = useState('')
  const [studentImageError, setStudentImageError] = useState('')
  // Chnage type of input State
  const [changeImageType, setChangeImageType] = useState(true)
  const [FeeMasterError, setFeeMasterError] = useState('')

  // Use Effect Call
  useEffect(() => {
    if (studentGetId) { getStudentDataById(); }
  }, [studentGetId, onReload, allSecAccToClassData])

  useEffect(() => {
    handleClassChange(classNo);
  }, [classNo]);

  useEffect(() => {
    getAllClassData();
    getAllFeeMasterData()
  }, [token])

  // API Function Calls
  const getAllClassData = async () => {
    try {
      setloaderState(true);
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAllClassData(response?.data?.classes);
          setloaderState(false);
        }
      }
      else {
      }
    }
    catch (error) {
      console.log('error', error)
    }
  }

  const getStudentDataById = async () => {
    try {
      setloaderState(true);
      var response = await getStudentDataByIdApi(studentGetId);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setStudentName(response?.data?.student?.studentName);
          setBloodGroup(response?.data?.student?.bloodGroup);
          setFatherName(response?.data?.student?.fatherName);
          setMotherName(response?.data?.student?.motherName);
          setParentNo(response?.data?.student?.parentNo);
          setStudentEmail(response?.data?.student?.studentEmail);
          setParentEmail(response?.data?.student?.parentEmail);
          setFatherOccupation(response?.data?.student?.fatherOccupation);
          setMotherOccupation(response?.data?.student?.motherOccupation);
          setClassNo(response?.data?.student?.classNo);
          setSection(response?.data?.student?.classSection);
          setstudentDOB(response?.data?.student?.dateOfBirth);
          setGender(response?.data?.student?.studentGender);
          setStudentAddress(response?.data?.student?.address);
          setEmergencyNo(response?.data?.student?.emergencyNo);
          setStudentPh(response?.data?.student?.studentPhone);
          setStudentImage(response?.data?.student?.studentImage);
          // toast.success(response?.data?.message);
          setloaderState(false);
        }
      }
      else {
        toast.error(response?.data?.message);
      }
    }
    catch {

    }
  }

  const getAllFeeMasterData = async () => {
    try {
      setloaderState(true);
      const searchByKey = ''; 
      const pageNo = ''; 
      const pageSize = '';
      var response = await getAllFeeMasterApi(searchByKey, pageNo, pageSize);
      console.log(response, 'fee master')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllFeeMaster(response?.data?.feeMaster);
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

  const UpdateStudentByID = async () => {

    const studentNameValidate = validateStudentName(studentName);
    const bloodGroupValidate = validateBloodGroup(bloodGroup);
    const fatherNameValidate = validateFatherName(fatherName);
    const motherNameValidate = validateMotherName(motherName);
    const parentNoValidate = validateParentPhone(parentNo);
    const studentPhValidate = validateStudentPhone(studentPh);
    const studentEmailValidate = validateStudentEmail(studentEmail);
    const parentEmailValidate = validateParentEmail(parentEmail);
    const fatherOccupationValidate = validateFatherOccupation(fatherOccupation);
    const motherOccupationValidate = validateMotherOccupation(motherOccupation);
    const classNoValidate = validateClass(classNo);
    const sectionValidate = validateSection(section);
    const studentDOBValidate = validateBirthday(studentDOB);
    const genderValidate = validateGender(gender);
    const studentAddressValidate = validateAddress(studentAddress);
    const emergencyNoValidate = validateEmergencyNo(emergencyNo);
    const studentImageValidate = validateStudentImage(studentImage);
    const FeeMasterValidate = validateFeeMaster(FeeMaster);

    if (studentNameValidate || bloodGroupValidate || fatherNameValidate || motherNameValidate || parentNoValidate || studentPhValidate || studentEmailValidate || parentEmailValidate || fatherOccupationValidate || motherOccupationValidate || classNoValidate || sectionValidate || studentDOBValidate || genderValidate || studentAddressValidate || emergencyNoValidate || studentImageValidate || FeeMasterValidate) {
      setStudentNameError(studentNameValidate);
      setBloodGroupError(bloodGroupValidate);
      setFatherNameError(fatherNameValidate);
      setMotherNameError(motherNameValidate);
      setParentNoError(parentNoValidate);
      setStudentPhError(studentPhValidate);
      setStudentEmailError(studentEmailValidate);
      setParentEmailError(parentEmailValidate);
      setFatherOccupationError(fatherOccupationValidate);
      setMotherOccupationError(motherOccupationValidate);
      setClassNoError(classNoValidate);
      setSectionError(sectionValidate);
      setstudentDOBError(studentDOBValidate);
      setGenderError(genderValidate);
      setStudentAddressError(studentAddressValidate);
      setEmergencyNoError(emergencyNoValidate);
      // setStudentImageError(studentImageValidate);
      setFeeMasterError(FeeMasterValidate)
      return;
    }

    setStudentNameError('');
    setBloodGroupError('');
    setFatherNameError('');
    setMotherNameError('');
    setParentNoError('');
    setStudentPhError('');
    setStudentEmailError('');
    setParentEmailError('');
    setFatherOccupationError('');
    setMotherOccupationError('');
    setClassNoError('');
    setSectionError('');
    setstudentDOBError('');
    setGenderError('');
    setStudentAddressError('');
    setEmergencyNoError('');
    setFeeMasterError('')
    // setStudentImageError('');

    try {
      setloaderState(true);
      const formData = new FormData();
      formData.append("studentName", studentName);
      formData.append("bloodGroup", bloodGroup);
      formData.append("fatherName", fatherName);
      formData.append("motherName", motherName);
      formData.append("parentNo", parentNo);
      formData.append("studentEmail", studentEmail);
      formData.append("parentEmail", parentEmail);
      formData.append("fatherOccupation", fatherOccupation);
      formData.append("motherOccupation", motherOccupation);
      formData.append("classNo", classNo);
      formData.append("sectionName", section);
      formData.append("studentDOB", studentDOB);
      formData.append("gender", gender);
      formData.append("studentAddress", studentAddress);
      formData.append("emergencyNo", emergencyNo);
      formData.append("studentPh", studentPh);
      formData.append("studentImage", studentImage);
      formData.append("feeGroupName", FeeMaster);

      var response = await updateStudentApi(studentGetId, formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          setEditWarning(!EditWarning);
          onReload(true);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }
    }
    catch (error) {
      setloaderState(false);
      console.log('Error while updating student ', error)
    }
  }

  const handleStudentNameChange = (value) => {
    setStudentName(value);
    setStudentNameError(validateStudentName(value))
  }

  const validateStudentName = (value) => {
    if (value.trim() === '') {
      return '* Student Name is required';
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleFeeMasterChange = (value) => {
    setFeeMaster(value);
    setFeeMasterError(validateFeeMaster(value))
  }

  const validateFeeMaster = (value) => {
    if (value === '') {
      return '* Fee Master is required';
    }
    return '';
  };

  const handleBloodGroupChange = (value) => {
    setBloodGroup(value);
    setBloodGroupError(validateBloodGroup(value))
  }

  const validateBloodGroup = (value) => {
    if (value === '') {
      return '* Blood Group is required';
    }
    return '';
  };

  const handleFatherNameChange = (value) => {
    setFatherName(value);
    setFatherNameError(validateFatherName(value))
  }

  const validateFatherName = (value) => {
    if (value.trim() === '') {
      return '* Father Name is required';
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleMotherNameChange = (value) => {
    setMotherName(value);
    setMotherNameError(validateMotherName(value))
  }

  const validateMotherName = (value) => {
    if (value.trim() === '') {
      return '* Mother Name is required';
    }
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleParentPhoneChange = (value) => {
    setParentNo(value);
    setParentNoError(validateParentPhone(value))
  }

  const validateParentPhone = (value) => {
    if (value.trim() === '') {
      return `* Parent's Contact Number is required`;
    }
    const PhoneRegex = /^[6-9]\d{9}$/;
    if (!PhoneRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleStudentPhoneChange = (value) => {
    setStudentPh(value);
    setStudentPhError(validateStudentPhone(value))
  }

  const validateStudentPhone = (value) => {
    if (value.trim() === '') {
      return `* Student's Contact Number is required`;
    }
    const PhoneRegex = /^[6-9]\d{9}$/;
    if (!PhoneRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleStudentEmailChange = (value) => {
    setStudentEmail(value);
    setStudentEmailError(validateStudentEmail(value))
  }

  const validateStudentEmail = (value) => {
    if (value.trim() === '') {
      return `* Stundent's Email is required`;
    }
    const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
    if (!emailRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleParentEmailChange = (value) => {
    setParentEmail(value);
    setParentEmailError(validateParentEmail(value))
  }

  const validateParentEmail = (value) => {
    if (value.trim() === '') {
      return `* Parent's Email is required`;
    }
    const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
    if (!emailRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleFatherOccupChange = (value) => {
    setFatherOccupation(value);
    setFatherOccupationError(validateFatherOccupation(value))
  }

  const validateFatherOccupation = (value) => {
    if (value === '') {
      return `* Father's Occupation is required`;
    }
    return '';
  };

  const handleMotherOccupChange = (value) => {
    setMotherOccupation(value);
    setMotherOccupationError(validateMotherOccupation(value))
  }

  const validateMotherOccupation = (value) => {
    if (value === '') {
      return `* Mother's Occupation is required`;
    }
    return '';
  };

  const handleClassChange = (val) => {
    const classNoVal = parseInt(val);
    setClassNo(classNoVal);

    const selectedClass = allClassData.find(c => c.classNo === classNoVal);

    if (selectedClass) {
      setAllSecAccToClassData(selectedClass.section || []);

    } else {
      setAllSecAccToClassData([]);
    }
    setSection('');
    validationCheck();
    setClassNoError(validateClass(classNoVal));
  }

  const validateClass = (value) => {
    if (value === '') {
      return '* Class is required';
    }
    return '';
  };

  const handleSectionChange = (value) => {
    setSection(value);
    setSectionError(validateSection(value))
  }

  const validateSection = (value) => {
    if (value === '') {
      return '* Section is required';
    }
    return '';
  };

  const handleBirthdayChange = (value) => {
    setstudentDOB(value);
    setstudentDOBError(validateBirthday(value))
  }

  const validateBirthday = (value) => {
    if (value === '') {
      return '* Birthday is required';
    }
    return '';
  };

  const handleGenderChange = (value) => {
    setGender(value);
    setGenderError(validateGender(value))
  }

  const validateGender = (value) => {
    if (value === '') {
      return '* Gender is required';
    }
    return '';
  };

  const handleAddressChange = (value) => {
    setStudentAddress(value);
    setStudentAddressError(validateAddress(value))
  }

  const validateAddress = (value) => {
    if (value.trim() === '') {
      return '* Address is required';
    }
    const addressRegex = /^[A-Za-z0-9\s-]+$/;
    if (!addressRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleEmergencyNoChange = (value) => {
    setEmergencyNo(value);
    setEmergencyNoError(validateEmergencyNo(value))
  }

  const validateEmergencyNo = (value) => {
    if (value.trim() === '') {
      return '* Emergency Number is required';
    }
    const PhoneRegex = /^[6-9]\d{9}$/;
    if (!PhoneRegex.test(value)) {
      return '* Invalid characters !!';
    }
    return '';
  };

  const handleStudentImageChange = (value) => {
    setStudentImage(value[0]);
    setStudentImageError(validateStudentImage(value))
  }

  const validateStudentImage = (value) => {
    if (value === '') {
      return '* Student Image is required';
    }
    if (value === null) {
      return '* Student Image is required';
    }
    return '';
  };

  const validationCheck = () => {

    const studentNameValidate = validateStudentName(studentName);
    const bloodGroupValidate = validateBloodGroup(bloodGroup);
    const fatherNameValidate = validateFatherName(fatherName);
    const motherNameValidate = validateMotherName(motherName);
    const parentNoValidate = validateParentPhone(parentNo);
    const studentPhValidate = validateStudentPhone(studentPh);
    const studentEmailValidate = validateStudentEmail(studentEmail);
    const parentEmailValidate = validateParentEmail(parentEmail);
    const fatherOccupationValidate = validateFatherOccupation(fatherOccupation);
    const motherOccupationValidate = validateMotherOccupation(motherOccupation);
    const classNoValidate = validateClass(classNo);
    const sectionValidate = validateSection(section);
    const studentDOBValidate = validateBirthday(studentDOB);
    const genderValidate = validateGender(gender);
    const studentAddressValidate = validateAddress(studentAddress);
    const emergencyNoValidate = validateEmergencyNo(emergencyNo);
    const studentImageValidate = validateStudentImage(studentImage);

    if (studentNameValidate || bloodGroupValidate || fatherNameValidate || motherNameValidate || parentNoValidate || studentPhValidate || studentEmailValidate || parentEmailValidate || fatherOccupationValidate || motherOccupationValidate || classNoValidate || sectionValidate || studentDOBValidate || genderValidate || studentAddressValidate || emergencyNoValidate || studentImageValidate) {
      setStudentNameError(studentNameValidate);
      setBloodGroupError(bloodGroupValidate);
      setFatherNameError(fatherNameValidate);
      setMotherNameError(motherNameValidate);
      setParentNoError(parentNoValidate);
      setStudentPhError(studentPhValidate);
      setStudentEmailError(studentEmailValidate);
      setParentEmailError(parentEmailValidate);
      setFatherOccupationError(fatherOccupationValidate);
      setMotherOccupationError(motherOccupationValidate);
      setClassNoError(classNoValidate);
      setSectionError(sectionValidate);
      setstudentDOBError(studentDOBValidate);
      setGenderError(genderValidate);
      setStudentAddressError(studentAddressValidate);
      setEmergencyNoError(emergencyNoValidate);
      // setStudentImageError(studentImageValidate);
      return;
    }

    setStudentNameError('');
    setBloodGroupError('');
    setFatherNameError('');
    setMotherNameError('');
    setParentNoError('');
    setStudentPhError('');
    setStudentEmailError('');
    setParentEmailError('');
    setFatherOccupationError('');
    setMotherOccupationError('');
    setClassNoError('');
    setSectionError('');
    setstudentDOBError('');
    setGenderError('');
    setStudentAddressError('');
    setEmergencyNoError('');
    // setStudentImageError('');

  }

  return (

    <div>
      {
        loaderState && (
          <DataLoader />
        )
      }
      {EditWarning
        ?
        <>
          <div>
            <div className="p-3">
              <form>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Name*</label>
                  <input type="text" className={`form-control font14 ${studentNameError ? 'border-1 border-danger' : ''}`} id="validationDefault01" value={studentName} placeholder="Enter Name" onChange={(e) => handleStudentNameChange(e.target.value)} />
                  <span className='text-danger'>{studentNameError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Blood Group*</label>
                  <select className={`form-select font14 ${bloodGroupError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={bloodGroup} onChange={(e) => handleBloodGroupChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    <option value='AB+'>AB+</option>
                    <option value='AB-'>AB-</option>
                    <option value='A+'>A+</option>
                    <option value='A-'>A-</option>
                    <option value='B+'>B+</option>
                    <option value='B-'>B-</option>
                    <option value='O+'>O+</option>
                    <option value='O-'>O-</option>
                  </select>
                  <span className='text-danger'>{bloodGroupError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Father Name*</label>
                  <input type="text" className={`form-control font14 ${fatherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={fatherName} placeholder="Enter Father Name" onChange={(e) => handleFatherNameChange(e.target.value)} />
                  <span className='text-danger'>{fatherNameError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Mother Name*</label>
                  <input type="text" className={`form-control font14 ${motherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={motherName} placeholder="Enter Mother Name" onChange={(e) => handleMotherNameChange(e.target.value)} />
                  <span className='text-danger'>{motherNameError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Parent Contact Details*</label>
                  <input type="text" className={`form-control font14 ${parentNoError ? 'border-1 border-danger' : ''}`} id="validationDefault01" value={parentNo} placeholder="Enter Parent Contact Number" onChange={(e) => handleParentPhoneChange(e.target.value)} />
                  <span className='text-danger'>{parentNoError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Student Contact Details*</label>
                  <input type="text" className={`form-control font14 ${studentPhError ? 'border-1 border-danger' : ''}`} id="validationDefault01" value={studentPh} placeholder="Enter Parent Contact Number" onChange={(e) => handleStudentPhoneChange(e.target.value)} />
                  <span className='text-danger'>{studentPhError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Student Email*</label>
                  <input type="text" className={`form-control font14 ${studentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={studentEmail} placeholder="Enter Student Email" onChange={(e) => handleStudentEmailChange(e.target.value)} />
                  <span className='text-danger'>{studentEmailError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Parent Email*</label>
                  <input type="text" className={`form-control font14 ${parentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={parentEmail} placeholder="Enter Parent Email" onChange={(e) => handleParentEmailChange(e.target.value)} />
                  <span className='text-danger'>{parentEmailError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Father Occupation*</label>
                  <select className={`form-select font14 ${fatherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={fatherOccupation} onChange={(e) => handleFatherOccupChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    <option value='Private'>Private</option>
                    <option value='Government'>Government</option>
                    <option value='Bussiness Man'>Bussiness Man</option>
                  </select>
                  <span className='text-danger'>{fatherOccupationError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Mother Occupation*</label>
                  <select className={`form-select font14 ${motherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={motherOccupation} onChange={(e) => handleMotherOccupChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    <option value='House Wife'>House Wife</option>
                    <option value='Government'>Government</option>
                    <option value='Working'>Working</option>
                  </select>
                  <span className='text-danger'>{motherOccupationError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Class*</label>
                  <select className={`form-select font14 ${classNoError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={classNo} onChange={(e) => handleClassChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    {allClassData?.map((option, index) => (
                      <option key={option.classId} value={option?.classNo}>
                        {option?.classNo}
                      </option>
                    ))}
                  </select>
                  <span className='text-danger'>{classNoError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Section*</label>
                  <select className={`form-select font14 ${sectionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={section} onChange={(e) => handleSectionChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    {allSecAccToClassData?.map(option => (
                      <option key={option.classSecId} value={option.sectionName}>
                        {option.sectionName}
                      </option>
                    ))}
                  </select>
                  <span className='text-danger'>{sectionError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Birthday*</label>
                  <input type="date" className={`form-control font14  ${studentDOBError ? 'border-1 border-danger' : ''} `} id="validationDefault02" value={studentDOB} onChange={(e) => handleBirthdayChange(e.target.value)} />
                  <span className='text-danger'>{studentDOBError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Gender*</label>
                  <select className={`form-select font14 ${genderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={gender} onChange={(e) => handleGenderChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                  </select>
                  <span className='text-danger'>{genderError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Address*</label>
                  <input type="text" className={`form-control font14  ${studentAddressError ? 'border-1 border-danger' : ''} `} id="validationDefault01" value={studentAddress} placeholder="Enter Address" onChange={(e) => handleAddressChange(e.target.value)} />
                  <span className='text-danger'>{studentAddressError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Emergency Contact Details*</label>
                  <input type="text" className={`form-control font14  ${emergencyNoError ? 'border-1 border-danger' : ''} `} id="validationDefault02" value={emergencyNo} placeholder="Enter School Info" onChange={(e) => handleEmergencyNoChange(e.target.value)} />
                  <span className='text-danger'>{emergencyNoError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault02" className="form-label font14">Photo*</label>
                  {/* <input type={changeImageType ? "text" : "file"} className={`form-control font14  ${studentImageError ? 'border-1 border-danger' : ''} `} id="validationDefault02" value={studentImage} onChange={(e) => handleStudentImageChange(e.target.files)} /> */}
                  <div className="d-flex bg-white">
                    {studentImage && changeImageType ? (
                      <input type='text' className={`form-control font14 formcontrolImageborder ${studentImageError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={studentImage.split('/').pop()} readOnly />
                    ) : (
                      <input type='file' className={`form-control font14 formcontrolImageborder ${studentImageError ? 'border-1 border-danger' : ''}`} accept="image/png, image/jpg, image/svg, image/jpeg" id="validationDefault02" onChange={(e) => handleStudentImageChange(e.target.files)} />
                    )}
                    <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                      <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                        {studentImage && changeImageType ? 'Edit' : 'View'}
                      </span>
                    </div>
                  </div>
                  <span className='text-danger'>{studentImageError}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="validationDefault01" className="form-label font14">Fee Master*</label>
                  <select className={`form-select font14 ${FeeMasterError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={FeeMaster} onChange={(e) => handleFeeMasterChange(e.target.value)}>
                    <option value=''>--- Choose ---</option>
                    {allFeeMaster?.map(option => (
                      <option key={option.feeGroup} value={option.feeGroup}>
                        {option.feeGroup}
                      </option>
                    ))}
                  </select>
                  <span className='text-danger'>{FeeMasterError}</span>
                </div>
              </form>
              <p className='text-center p-3'>
                <button className='btn updateButtons text-white' onClick={UpdateStudentByID}>Update</button>
                <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={onReload}>Cancel</button>
              </p>
            </div>
          </div>
        </>
        :
        <>
          <div>
            <p className='modalLightBorder p-2 mb-0'>Student List</p>
            <div className="mt-3  ">
              <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
              <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                <p className='warningHeading'>Successful Updated</p>
                <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
              </div>
              <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { onReload, setEditWarning(true), setAbc('Hey, I am updated one ') }}>Continue</button>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default EditStudentDetails




























// import React, { useState, useEffect } from 'react'
// import styled from 'styled-components'
// import { addNewStudentApi, getAllClassApi, getAllFeeMasterApi, getStudentDataByIdApi } from '../../Utils/Apis'
// import toast, { Toaster } from 'react-hot-toast';
// import { useNavigate } from 'react-router-dom';
// import DataLoader from '../../Layouts/Loader';
// import { useForm } from 'react-hook-form';

// const Container = styled.div`
//     overflow: scroll;

//     .hideScrollBar::-webkit-scrollbar {
//         display: none !important;
//     }

//     .form-control::placeholder, .form-control, .form-select{
//         color: var(--greyState)
//     }

//     .form-control, .form-select{
//         border-radius: 5px !important;
//         box-shadow: none !important;
//         border: 1px solid var(--fontControlBorder);
//     }

//     .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
//         border: 2px solid var(--BtnBorder);
//         background-color: var(--breadCrumActiveTextColor)
//     }

//     .CancelBtnn, .CancelBtnn:active{
//         border: 2px solid var(--BtnBorder);
//     }
// `;


// const EditStudentDetails = ({ studentGetId, onReload }) => {

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   // loader State
//   const [loaderState, setloaderState] = useState(false);
//   // Data States
//   const [FeeMasterData, setFeeMasterData] = useState([])
//   const [allClassData, setAllClassData] = useState([]);
//   const [allSectionData, setAllSectionData] = useState([]);

//   const { register, handleSubmit, formState: { errors }, setValue, values } = useForm({
//     mode: 'onChange'
//   });

//   //UseEffect Call
//   useEffect(() => {
//     if (studentGetId) {
//       getAllClassData();
//       getAllFeeMasterData();
//       getStudentDataById();
//     }
//   }, [token, studentGetId])

//   // All API Functions
//   const getAllClassData = async () => {
//     setloaderState(true);
//     try {
//       var response = await getAllClassApi();
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllClassData(response?.data?.classes);
//           setloaderState(false);
//           // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Class API - ', error)
//     }
//   }

//   const getAllFeeMasterData = async () => {
//     try {
//       setloaderState(true);
//       const searchByKey = ''
//       const pageNo = ''
//       const pageSize = ''
//       var response = await getAllFeeMasterApi(searchByKey, pageNo, pageSize);
//       console.log(response, 'fee master')
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setFeeMasterData(response?.data?.feeMaster);
//           setloaderState(false);
//           // toast.success(response.data.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Fee Group API - ', error)
//     }
//   }

//   const getStudentDataById = async () => {
//     setloaderState(true)
//     try {
//       var response = await getStudentDataByIdApi(studentGetId);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setValue('studentName', response?.data?.student?.studentName);
//           setValue('bloodGroup', response?.data?.student?.bloodGroup);
//           setValue('fatherName', response?.data?.student?.fatherName);
//           setValue('motherName', response?.data?.student?.motherName);
//           setValue('studentPh', response?.data?.student?.studentPhone);
//           setValue('parentNo', response?.data?.student?.parentNo);
//           setValue('studentEmail', response?.data?.student?.studentEmail);
//           setValue('parentEmail', response?.data?.student?.parentEmail);
//           setValue('fatherOccupation', response?.data?.student?.fatherOccupation);
//           setValue('motherOccupation', response?.data?.student?.motherOccupation);
//           setTimeout( async() => {
//             await handleClassChange(response?.data?.student?.classNo);
//             setValue('sectionName', response?.data?.student?.classSection);
//           }, 2000);
//           setValue('studentDOB', response?.data?.student?.dateOfBirth);
//           setValue('gender', response?.data?.student?.studentGender);
//           setValue('studentAddress', response?.data?.student?.address);
//           setValue('emergencyNo', response?.data?.student?.emergencyNo);
//           setValue('studentImage', response?.data?.student?.studentImage);


//           // toast.success(response?.data?.message);
//           // setValue('classNo', response?.data?.student?.classNo);
//           // setValue('sectionName', response?.data?.student?.classSection);
//           // setValue('feeGroupName', response?.data?.student?.studentImage);

//         }
//         else {
//           toast.error(response?.data?.msg)
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log('error', error)
//     }
//   }

//   const updateStudent = async (data) => {
//     try {
//       const formData = new FormData();
//       formData.append("studentName", data.studentName);
//       formData.append("bloodGroup", data.bloodGroup);
//       formData.append("fatherName", data.fatherName);
//       formData.append("motherName", data.motherName);
//       formData.append("parentNo", data.parentNo);
//       formData.append("studentEmail", data.studentEmail);
//       formData.append("parentEmail", data.parentEmail);
//       formData.append("fatherOccupation", data.fatherOccupation);
//       formData.append("motherOccupation", data.motherOccupation);
//       formData.append("classNo", data.classNo);
//       formData.append("section", data.section);
//       formData.append("studentDOB", data.studentDOB);
//       formData.append("gender", data.gender);
//       formData.append("studentAddress", data.studentAddress);
//       formData.append("emergencyNo", data.emergencyNo);
//       formData.append("studentPh", data.studentPh);
//       formData.append("studentImage", data.studentImage);
//       // formData.append("feeGroupName", data.feeGroupName);

//       var response = await addNewStudentApi(formData);
//       console.log(response, 'res')
//       if (response?.status === 200) {
//         console.log(response?.status, '200')
//         if (response?.data?.status === 'success') {
//           toast.success(response?.data?.message)
//           setTimeout(() => {
//             navigate('/allStudent');
//           }, 700);
//         }
//         else {
//           toast.error(response?.data?.message);
//           console.log('fail')
//         }
//       } else {
//         toast.error(response?.data?.message);
//       }
//     } catch (error) {
//       toast.error(response?.data?.message);
//       console.error('Error during update:', error);
//     }
//   }

//   const handleClassChange = (val) => {
//     setloaderState(true);
//     const classNoVal = parseInt(val);
//     setValue('classNo', classNoVal);
//     const selectedClass = allClassData.find(c => c.classNo === classNoVal);
//     if (selectedClass) {
//       setAllSectionData(selectedClass.section || []);
//       setloaderState(false);
//     } else {
//       setAllSectionData([]);
//       setloaderState(false);
//     }
//   };



//   return (
//     <>
//       <Container className='hideScrollBar pt-3'>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid">
//           <form className="row h-100 overflow-scroll" onSubmit={handleSubmit(updateStudent)}>
//             <div className="mb-3">
//               <label htmlFor="studentName" className="form-label font14">Name*</label>
//               <input id="studentName" type="text" className={`form-control font14 ${errors.studentName ? 'border-danger' : ''}`} placeholder="Enter Student Name" {...register('studentName', { required: 'Student Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Student Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Student Name'; } return true; } })} />
//               {errors.studentName && <p className="font12 text-danger">{errors.studentName.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="bloodGroup" className="form-label font14">Blood Group*</label>
//               <select id="bloodGroup" className={`form-select font14 ${errors.bloodGroup ? 'border-danger' : ''}`} {...register('bloodGroup', { required: 'BloodGroup is required *' })} >
//                 <option value="">Select Blood Group</option>
//                 <option value='AB+'>AB+</option>
//                 <option value='A+'>A+</option>
//                 <option value='B+'>B+</option>
//                 <option value='O+'>O+</option>
//               </select>
//               {errors.bloodGroup && <p className="font12 text-danger">{errors.bloodGroup.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="fatherName" className="form-label font14">Father Name*</label>
//               <input id="fatherName" type="text" className={`form-control font14 ${errors.fatherName ? 'border-danger' : ''}`} placeholder="Enter Father's Name" {...register('fatherName', { required: 'Father Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Father Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Father Name'; } return true; } })} />
//               {errors.fatherName && <p className="font12 text-danger">{errors.fatherName.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="motherName" className="form-label font14">Mother Name*</label>
//               <input id="motherName" type="text" className={`form-control font14 ${errors.motherName ? 'border-danger' : ''}`} placeholder="Enter Mother's Name" {...register('motherName', { required: 'Mother Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Mother Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Mother Name'; } return true; } })} />
//               {errors.motherName && <p className="font12 text-danger">{errors.motherName.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="studentPh" className="form-label font14">Student Contact Details*</label>
//               <input id="studentPh" type="tel" className={`form-control font14 ${errors.studentPh ? 'border-danger' : ''}`} placeholder="Enter Student's Phone Number" {...register('studentPh', { required: `Student's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
//               {errors.studentPh && <p className="font12 text-danger">{errors.studentPh.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="parentNo" className="form-label font14">Parent Contact Details*</label>
//               <input id="parentNo" type="tel" className={`form-control font14 ${errors.parentNo ? 'border-danger' : ''}`} placeholder="Enter Parent's Phone Number" {...register('parentNo', { required: `Parent's Phone Number is required *`, validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
//               {errors.parentNo && <p className="font12 text-danger">{errors.parentNo.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="studentEmail" className="form-label font14">Student Email*</label>
//               <input id="studentEmail" type="email" className={`form-control font14 ${errors.studentEmail ? 'border-danger' : ''}`} placeholder="Enter Student's Email" {...register('studentEmail', { required: `Student's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
//               {errors.studentEmail && <p className="font12 text-danger">{errors.studentEmail.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="parentEmail" className="form-label font14">Parent Email*</label>
//               <input id="parentEmail" type="email" className={`form-control font14 ${errors.parentEmail ? 'border-danger' : ''}`} placeholder="Enter Parent's Email" {...register('parentEmail', { required: `Parent's Email is required *`, validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
//               {errors.parentEmail && <p className="font12 text-danger">{errors.parentEmail.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="fatherOccupation" className="form-label font14">Father Occupation*</label>
//               <select id="fatherOccupation" className={`form-select font14 ${errors.fatherOccupation ? 'border-danger' : ''}`} {...register('fatherOccupation', { required: 'Father Occupation is required *' })} >
//                 <option value='' >--- Choose ---</option>
//                 <option value='Private'>Private</option>
//                 <option value='Service Man'>Service Man</option>
//                 <option value='Government'>Government</option>
//                 <option value='Accountant'>Accountant</option>
//                 <option value='Lawyer'>Lawyer</option>
//                 <option value='Teacher'>Teacher</option>
//                 <option value='Doctor'>Doctor</option>
//                 <option value='Unemployment'>Unemployment</option>
//                 <option value='Bussiness Man'>Bussiness Man</option>
//                 <option value='Retired'>Retired</option>
//               </select>
//               {errors.fatherOccupation && <p className="font12 text-danger">{errors.fatherOccupation.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="motherOccupation" className="form-label font14">Mother Occupation*</label>
//               <select id="motherOccupation" className={`form-select font14 ${errors.motherOccupation ? 'border-danger' : ''}`} {...register('motherOccupation', { required: 'Mother Occupation is required *' })} >
//                 <option value='' >--- Choose ---</option>
//                 <option value='House Wife'>House Wife</option>
//                 <option value='Government'>Government</option>
//                 <option value='Working'>Working</option>
//                 <option value='Accountant'>Accountant</option>
//                 <option value='Lawyer'>Lawyer</option>
//                 <option value='Teacher'>Teacher</option>
//                 <option value='Doctor'>Doctor</option>
//                 <option value='Unemployment'>Unemployment</option>
//                 <option value='Retired'>Retired</option>
//               </select>
//               {errors.motherOccupation && <p className="font12 text-danger">{errors.motherOccupation.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="classNo" className="form-label font14">Class*</label>
//               <select id="classNo" className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`} {...register('classNo', { required: 'Class is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
//                 <option value="">Select Class</option>
//                 {allClassData.map((classs) => (<option key={classs.classId} value={classs.classNo}> {classs.classNo} </option>))}
//               </select>
//               {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="section" className="form-label font14">Section</label>
//               <select id="section" className={`form-select font14 ${errors.section ? 'border-danger' : ''}`} {...register('section', { required: 'Section is required *' })} >
//                 <option value="">Select Section</option>
//                 {allSectionData.map((section) => (<option key={section.classSecId} value={section.sectionName}> {section.sectionName} </option>))}
//               </select>
//               {errors.section && <p className="font12 text-danger">{errors.section.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="studentDOB" className="form-label font14">Birthday*</label>
//               <input id="studentDOB" type="date" className={`form-control font14 ${errors.studentDOB ? 'border-danger' : ''}`} placeholder="Enter Date Of Birth" {...register("studentDOB", { required: 'Date Of Birth is required *' })} />
//               {errors.studentDOB && <p className="font12 text-danger">{errors.studentDOB.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="gender" className="form-label font14">Gender*</label>
//               <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Gender is required *' })} >
//                 <option value='' >--- Choose ---</option>
//                 <option value='Male'>Male</option>
//                 <option value='Female'>Female</option>
//               </select>
//               {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="studentAddress" className="form-label font14">Address*</label>
//               <input id="studentAddress" type="text" className={`form-control font14 ${errors.studentAddress ? 'border-danger' : ''}`} placeholder="Entes Address" {...register("studentAddress", { required: 'Address is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Address must contain only letters, digits, and spaces'; } return true; } })} />
//               {errors.studentAddress && <p className="font12 text-danger">{errors.studentAddress.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="emergencyNo" className="form-label font14">Emergency Contact Details*</label>
//               <input id="emergencyNo" type="tel" className={`form-control font14 ${errors.emergencyNo ? 'border-danger' : ''}`} placeholder="Enter Emergency Phone Number" {...register('emergencyNo', { required: 'Emergency Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
//               {errors.emergencyNo && <p className="font12 text-danger">{errors.emergencyNo.message}</p>}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="studentImage" className="form-label font14">Photo*</label>
//               <input id="studentImage" type="studentImage" className={`form-control font14 ${errors.studentImage ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('studentImage', { required: 'Student Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
//               {errors.studentImage && <p className="font12 text-danger">{errors.studentImage.message}</p>}
//             </div>
//             {/* <div className="mb-3">
//                 <label htmlFor="feeGroupName" className="form-label font14">Fee Master*</label>
//                 <select id="feeGroupName" className={`form-select font14 ${errors.feeGroupName ? 'border-danger' : ''}`} {...register('feeGroupName', { required: 'Fee Group Name is required *' })} >
//                     <option value=''>--- Choose ---</option>
//                     {FeeMasterData.map((option) => (
//                         <option key={option.feeGroup} value={option?.feeGroup}>
//                             {option.feeGroup.split('_').join(' ')}
//                         </option>
//                     ))}
//                 </select>
//                 {errors.feeGroupName && <p className="font12 text-danger">{errors.feeGroupName.message}</p>}
//             </div> */}
//             <p className='text-center p-3'>
//               <button className='btn updateButtons text-white' type='submit'>Update</button>
//               <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={onReload}>Cancel</button>
//             </p>
//           </form>
//           <Toaster />
//         </div>
//       </Container>
//     </>
//   )
// }

// export default EditStudentDetails




















// import React, { useEffect, useState } from 'react'
// import { getAllClassApi, getAllFeeMasterApi, getStudentDataByIdApi, updateStudentApi } from '../../Utils/Apis';
// import toast from 'react-hot-toast';
// import DataLoader from '../../Layouts/Loader';

// const EditStudentDetails = ({ studentGetId, onReload }) => {

//   const token = localStorage.getItem('token');
//   //loader State
//   const [loaderState, setloaderState] = useState(false);
//   // Data State
//   const [allFeeMaster, setAllFeeMaster] = useState([]);
//   const [allClassData, setAllClassData] = useState([]);
//   const [allSecAccToClassData, setAllSecAccToClassData] = useState([]);
//   const [EditWarning, setEditWarning] = useState(true);
//   // Variable State
//   const [studentName, setStudentName] = useState('')
//   const [bloodGroup, setBloodGroup] = useState('')
//   const [fatherName, setFatherName] = useState('')
//   const [motherName, setMotherName] = useState('')
//   const [parentNo, setParentNo] = useState('')
//   const [studentEmail, setStudentEmail] = useState('')
//   const [parentEmail, setParentEmail] = useState('')
//   const [fatherOccupation, setFatherOccupation] = useState('')
//   const [motherOccupation, setMotherOccupation] = useState('')
//   const [classNo, setClassNo] = useState(0);
//   const [section, setSection] = useState('')
//   const [studentDOB, setstudentDOB] = useState()
//   const [gender, setGender] = useState('')
//   const [studentAddress, setStudentAddress] = useState('')
//   const [emergencyNo, setEmergencyNo] = useState('')
//   const [studentPh, setStudentPh] = useState('')
//   const [studentImage, setStudentImage] = useState('')
//   const [FeeMaster, setFeeMaster] = useState('')
//   // Error State
//   const [studentNameError, setStudentNameError] = useState('')
//   const [bloodGroupError, setBloodGroupError] = useState('')
//   const [fatherNameError, setFatherNameError] = useState('')
//   const [motherNameError, setMotherNameError] = useState('')
//   const [parentNoError, setParentNoError] = useState('')
//   const [studentEmailError, setStudentEmailError] = useState('')
//   const [parentEmailError, setParentEmailError] = useState('')
//   const [fatherOccupationError, setFatherOccupationError] = useState('')
//   const [motherOccupationError, setMotherOccupationError] = useState('')
//   const [classNoError, setClassNoError] = useState('')
//   const [sectionError, setSectionError] = useState('')
//   const [studentDOBError, setstudentDOBError] = useState('')
//   const [genderError, setGenderError] = useState('')
//   const [studentAddressError, setStudentAddressError] = useState('')
//   const [emergencyNoError, setEmergencyNoError] = useState('')
//   const [studentPhError, setStudentPhError] = useState('')
//   const [studentImageError, setStudentImageError] = useState('')
//   // Chnage type of input State
//   const [changeImageType, setChangeImageType] = useState(true)
//   const [FeeMasterError, setFeeMasterError] = useState('')

//   // Use Effect Call
//   useEffect(() => {
//     if (token) { 
//       getAllClassData();
//       getAllFeeMasterData();
//     }
//     if (studentGetId) { getStudentDataById(); }
//     if (classNo) { handleClassChange(classNo); }
//   }, [studentGetId, onReload, allSecAccToClassData, classNo, token])

//   // API Function Calls
//   const getAllClassData = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllClassApi();
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllClassData(response?.data?.classes);
//           setloaderState(false);
//         }
//         else{
//           toast.error(response?.data?.msg)
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log('error', error)
//     }
//   }

//   const getStudentDataById = async () => {
//     try {
//       setloaderState(true);
//       var response = await getStudentDataByIdApi(studentGetId);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setStudentName(response?.data?.student?.studentName);
//           setBloodGroup(response?.data?.student?.bloodGroup);
//           setFatherName(response?.data?.student?.fatherName);
//           setMotherName(response?.data?.student?.motherName);
//           setParentNo(response?.data?.student?.parentNo);
//           setStudentEmail(response?.data?.student?.studentEmail);
//           setParentEmail(response?.data?.student?.parentEmail);
//           setFatherOccupation(response?.data?.student?.fatherOccupation);
//           setMotherOccupation(response?.data?.student?.motherOccupation);
//           setClassNo(response?.data?.student?.classNo);
//           setSection(response?.data?.student?.classSection);
//           setstudentDOB(response?.data?.student?.dateOfBirth);
//           setGender(response?.data?.student?.studentGender);
//           setStudentAddress(response?.data?.student?.address);
//           setEmergencyNo(response?.data?.student?.emergencyNo);
//           setStudentPh(response?.data?.student?.studentPhone);
//           setStudentImage(response?.data?.student?.studentImage);
//           // toast.success(response?.data?.message);
//           setloaderState(false);
//         }
//         else{
//           toast.error(response?.data?.msg)
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log('error', error)
//     }
//   }

//   const getAllFeeMasterData = async () => {
//     try {
//       setloaderState(true);
//       const searchByKey = ''; 
//       const pageNo = ''; 
//       const pageSize = '';
//       var response = await getAllFeeMasterApi(searchByKey, pageNo, pageSize);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setAllFeeMaster(response?.data?.feeMaster);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log('Error Facing during Get All Fee Group API - ', error)
//     }
//   }

//   const UpdateStudentByID = async () => {
//     try {
//       setloaderState(true);
//       const formData = new FormData();
//       formData.append("studentName", studentName);
//       formData.append("bloodGroup", bloodGroup);
//       formData.append("fatherName", fatherName);
//       formData.append("motherName", motherName);
//       formData.append("parentNo", parentNo);
//       formData.append("studentEmail", studentEmail);
//       formData.append("parentEmail", parentEmail);
//       formData.append("fatherOccupation", fatherOccupation);
//       formData.append("motherOccupation", motherOccupation);
//       formData.append("classNo", classNo);
//       formData.append("sectionName", section);
//       formData.append("studentDOB", studentDOB);
//       formData.append("gender", gender);
//       formData.append("studentAddress", studentAddress);
//       formData.append("emergencyNo", emergencyNo);
//       formData.append("studentPh", studentPh);
//       formData.append("studentImage", studentImage);
//       formData.append("feeGroupName", FeeMaster);

//       var response = await updateStudentApi(studentGetId, formData);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           toast.success(response?.data?.message)
//           setEditWarning(!EditWarning);
//           onReload(true);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message)
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message)
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log('Error while updating student ', error)
//     }
//   }

//   const handleStudentNameChange = (value) => {
//     setStudentName(value);
//     setStudentNameError(validateStudentName(value))
//   }

//   const validateStudentName = (value) => {
//     if (value.trim() === '') {
//       return '* Student Name is required';
//     }
//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (!nameRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleFeeMasterChange = (value) => {
//     setFeeMaster(value);
//     setFeeMasterError(validateFeeMaster(value))
//   }

//   const validateFeeMaster = (value) => {
//     if (value === '') {
//       return '* Fee Master is required';
//     }
//     return '';
//   };

//   const handleBloodGroupChange = (value) => {
//     setBloodGroup(value);
//     setBloodGroupError(validateBloodGroup(value))
//   }

//   const validateBloodGroup = (value) => {
//     if (value === '') {
//       return '* Blood Group is required';
//     }
//     return '';
//   };

//   const handleFatherNameChange = (value) => {
//     setFatherName(value);
//     setFatherNameError(validateFatherName(value))
//   }

//   const validateFatherName = (value) => {
//     if (value.trim() === '') {
//       return '* Father Name is required';
//     }
//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (!nameRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleMotherNameChange = (value) => {
//     setMotherName(value);
//     setMotherNameError(validateMotherName(value))
//   }

//   const validateMotherName = (value) => {
//     if (value.trim() === '') {
//       return '* Mother Name is required';
//     }
//     const nameRegex = /^[A-Za-z\s]+$/;
//     if (!nameRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleParentPhoneChange = (value) => {
//     setParentNo(value);
//     setParentNoError(validateParentPhone(value))
//   }

//   const validateParentPhone = (value) => {
//     if (value.trim() === '') {
//       return `* Parent's Contact Number is required`;
//     }
//     const PhoneRegex = /^[6-9]\d{9}$/;
//     if (!PhoneRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleStudentPhoneChange = (value) => {
//     setStudentPh(value);
//     setStudentPhError(validateStudentPhone(value))
//   }

//   const validateStudentPhone = (value) => {
//     if (value.trim() === '') {
//       return `* Student's Contact Number is required`;
//     }
//     const PhoneRegex = /^[6-9]\d{9}$/;
//     if (!PhoneRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleStudentEmailChange = (value) => {
//     setStudentEmail(value);
//     setStudentEmailError(validateStudentEmail(value))
//   }

//   const validateStudentEmail = (value) => {
//     if (value.trim() === '') {
//       return `* Stundent's Email is required`;
//     }
//     const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
//     if (!emailRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleParentEmailChange = (value) => {
//     setParentEmail(value);
//     setParentEmailError(validateParentEmail(value))
//   }

//   const validateParentEmail = (value) => {
//     if (value.trim() === '') {
//       return `* Parent's Email is required`;
//     }
//     const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
//     if (!emailRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleFatherOccupChange = (value) => {
//     setFatherOccupation(value);
//     setFatherOccupationError(validateFatherOccupation(value))
//   }

//   const validateFatherOccupation = (value) => {
//     if (value === '') {
//       return `* Father's Occupation is required`;
//     }
//     return '';
//   };

//   const handleMotherOccupChange = (value) => {
//     setMotherOccupation(value);
//     setMotherOccupationError(validateMotherOccupation(value))
//   }

//   const validateMotherOccupation = (value) => {
//     if (value === '') {
//       return `* Mother's Occupation is required`;
//     }
//     return '';
//   };

//   const handleClassChange = (val) => {
//     const classNoVal = parseInt(val);
//     setClassNo(classNoVal);

//     const selectedClass = allClassData.find(c => c.classNo === classNoVal);

//     if (selectedClass) {
//       setAllSecAccToClassData(selectedClass.section || []);

//     } else {
//       setAllSecAccToClassData([]);
//     }
//     setSection('');
//     validationCheck();
//     setClassNoError(validateClass(classNoVal));
//   }

//   const validateClass = (value) => {
//     if (value === '') {
//       return '* Class is required';
//     }
//     return '';
//   };

//   const handleSectionChange = (value) => {
//     setSection(value);
//     setSectionError(validateSection(value))
//   }

//   const validateSection = (value) => {
//     if (value === '') {
//       return '* Section is required';
//     }
//     return '';
//   };

//   const handleBirthdayChange = (value) => {
//     setstudentDOB(value);
//     setstudentDOBError(validateBirthday(value))
//   }

//   const validateBirthday = (value) => {
//     if (value === '') {
//       return '* Birthday is required';
//     }
//     return '';
//   };

//   const handleGenderChange = (value) => {
//     setGender(value);
//     setGenderError(validateGender(value))
//   }

//   const validateGender = (value) => {
//     if (value === '') {
//       return '* Gender is required';
//     }
//     return '';
//   };

//   const handleAddressChange = (value) => {
//     setStudentAddress(value);
//     setStudentAddressError(validateAddress(value))
//   }

//   const validateAddress = (value) => {
//     if (value.trim() === '') {
//       return '* Address is required';
//     }
//     const addressRegex = /^[A-Za-z0-9\s-]+$/;
//     if (!addressRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleEmergencyNoChange = (value) => {
//     setEmergencyNo(value);
//     setEmergencyNoError(validateEmergencyNo(value))
//   }

//   const validateEmergencyNo = (value) => {
//     if (value.trim() === '') {
//       return '* Emergency Number is required';
//     }
//     const PhoneRegex = /^[6-9]\d{9}$/;
//     if (!PhoneRegex.test(value)) {
//       return '* Invalid characters !!';
//     }
//     return '';
//   };

//   const handleStudentImageChange = (value) => {
//     setStudentImage(value[0]);
//     setStudentImageError(validateStudentImage(value))
//   }

//   const validateStudentImage = (value) => {
//     if (value === '') {
//       return '* Student Image is required';
//     }
//     if (value === null) {
//       return '* Student Image is required';
//     }
//     return '';
//   };

//   const validationCheck = () => {

//     const studentNameValidate = validateStudentName(studentName);
//     const bloodGroupValidate = validateBloodGroup(bloodGroup);
//     const fatherNameValidate = validateFatherName(fatherName);
//     const motherNameValidate = validateMotherName(motherName);
//     const parentNoValidate = validateParentPhone(parentNo);
//     const studentPhValidate = validateStudentPhone(studentPh);
//     const studentEmailValidate = validateStudentEmail(studentEmail);
//     const parentEmailValidate = validateParentEmail(parentEmail);
//     const fatherOccupationValidate = validateFatherOccupation(fatherOccupation);
//     const motherOccupationValidate = validateMotherOccupation(motherOccupation);
//     const classNoValidate = validateClass(classNo);
//     const sectionValidate = validateSection(section);
//     const studentDOBValidate = validateBirthday(studentDOB);
//     const genderValidate = validateGender(gender);
//     const studentAddressValidate = validateAddress(studentAddress);
//     const emergencyNoValidate = validateEmergencyNo(emergencyNo);
//     const studentImageValidate = validateStudentImage(studentImage);

//     if (studentNameValidate || bloodGroupValidate || fatherNameValidate || motherNameValidate || parentNoValidate || studentPhValidate || studentEmailValidate || parentEmailValidate || fatherOccupationValidate || motherOccupationValidate || classNoValidate || sectionValidate || studentDOBValidate || genderValidate || studentAddressValidate || emergencyNoValidate || studentImageValidate) {
//       setStudentNameError(studentNameValidate);
//       setBloodGroupError(bloodGroupValidate);
//       setFatherNameError(fatherNameValidate);
//       setMotherNameError(motherNameValidate);
//       setParentNoError(parentNoValidate);
//       setStudentPhError(studentPhValidate);
//       setStudentEmailError(studentEmailValidate);
//       setParentEmailError(parentEmailValidate);
//       setFatherOccupationError(fatherOccupationValidate);
//       setMotherOccupationError(motherOccupationValidate);
//       setClassNoError(classNoValidate);
//       setSectionError(sectionValidate);
//       setstudentDOBError(studentDOBValidate);
//       setGenderError(genderValidate);
//       setStudentAddressError(studentAddressValidate);
//       setEmergencyNoError(emergencyNoValidate);
//       // setStudentImageError(studentImageValidate);
//       return;
//     }

//     setStudentNameError('');
//     setBloodGroupError('');
//     setFatherNameError('');
//     setMotherNameError('');
//     setParentNoError('');
//     setStudentPhError('');
//     setStudentEmailError('');
//     setParentEmailError('');
//     setFatherOccupationError('');
//     setMotherOccupationError('');
//     setClassNoError('');
//     setSectionError('');
//     setstudentDOBError('');
//     setGenderError('');
//     setStudentAddressError('');
//     setEmergencyNoError('');
//     // setStudentImageError('');

//   }

//   return (

//     <div>
//       {
//         loaderState && (
//           <DataLoader />
//         )
//       }
//       {EditWarning
//         ?
//         <>
//           <div>
//             <div className="p-3">
//               <form>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Name*</label>
//                   <input type="text" className={`form-control font14 ${studentNameError ? 'border-1 border-danger' : ''}`} id="validationDefault01" value={studentName} placeholder="Enter Name" onChange={(e) => handleStudentNameChange(e.target.value)} />
//                   <span className='text-danger'>{studentNameError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Blood Group*</label>
//                   <select className={`form-select font14 ${bloodGroupError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={bloodGroup} onChange={(e) => handleBloodGroupChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     <option value='AB+'>AB+</option>
//                     <option value='AB-'>AB-</option>
//                     <option value='A+'>A+</option>
//                     <option value='A-'>A-</option>
//                     <option value='B+'>B+</option>
//                     <option value='B-'>B-</option>
//                     <option value='O+'>O+</option>
//                     <option value='O-'>O-</option>
//                   </select>
//                   <span className='text-danger'>{bloodGroupError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Father Name*</label>
//                   <input type="text" className={`form-control font14 ${fatherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={fatherName} placeholder="Enter Father Name" onChange={(e) => handleFatherNameChange(e.target.value)} />
//                   <span className='text-danger'>{fatherNameError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Mother Name*</label>
//                   <input type="text" className={`form-control font14 ${motherNameError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={motherName} placeholder="Enter Mother Name" onChange={(e) => handleMotherNameChange(e.target.value)} />
//                   <span className='text-danger'>{motherNameError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Parent Contact Details*</label>
//                   <input type="text" className={`form-control font14 ${parentNoError ? 'border-1 border-danger' : ''}`} id="validationDefault01" value={parentNo} placeholder="Enter Parent Contact Number" onChange={(e) => handleParentPhoneChange(e.target.value)} />
//                   <span className='text-danger'>{parentNoError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Student Contact Details*</label>
//                   <input type="text" className={`form-control font14 ${studentPhError ? 'border-1 border-danger' : ''}`} id="validationDefault01" value={studentPh} placeholder="Enter Parent Contact Number" onChange={(e) => handleStudentPhoneChange(e.target.value)} />
//                   <span className='text-danger'>{studentPhError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Student Email*</label>
//                   <input type="text" className={`form-control font14 ${studentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={studentEmail} placeholder="Enter Student Email" onChange={(e) => handleStudentEmailChange(e.target.value)} />
//                   <span className='text-danger'>{studentEmailError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Parent Email*</label>
//                   <input type="text" className={`form-control font14 ${parentEmailError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={parentEmail} placeholder="Enter Parent Email" onChange={(e) => handleParentEmailChange(e.target.value)} />
//                   <span className='text-danger'>{parentEmailError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Father Occupation*</label>
//                   <select className={`form-select font14 ${fatherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={fatherOccupation} onChange={(e) => handleFatherOccupChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     <option value='Private'>Private</option>
//                     <option value='Government'>Government</option>
//                     <option value='Bussiness Man'>Bussiness Man</option>
//                   </select>
//                   <span className='text-danger'>{fatherOccupationError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Mother Occupation*</label>
//                   <select className={`form-select font14 ${motherOccupationError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={motherOccupation} onChange={(e) => handleMotherOccupChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     <option value='House Wife'>House Wife</option>
//                     <option value='Government'>Government</option>
//                     <option value='Working'>Working</option>
//                   </select>
//                   <span className='text-danger'>{motherOccupationError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Class*</label>
//                   <select className={`form-select font14 ${classNoError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={classNo} onChange={(e) => handleClassChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     {allClassData?.map((option, index) => (
//                       <option key={option.classId} value={option?.classNo}>
//                         {option?.classNo}
//                       </option>
//                     ))}
//                   </select>
//                   <span className='text-danger'>{classNoError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Section*</label>
//                   <select className={`form-select font14 ${sectionError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={section} onChange={(e) => handleSectionChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     {allSecAccToClassData?.map(option => (
//                       <option key={option.classSecId} value={option.sectionName}>
//                         {option.sectionName}
//                       </option>
//                     ))}
//                   </select>
//                   <span className='text-danger'>{sectionError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Birthday*</label>
//                   <input type="date" className={`form-control font14  ${studentDOBError ? 'border-1 border-danger' : ''} `} id="validationDefault02" value={studentDOB} onChange={(e) => handleBirthdayChange(e.target.value)} />
//                   <span className='text-danger'>{studentDOBError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Gender*</label>
//                   <select className={`form-select font14 ${genderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={gender} onChange={(e) => handleGenderChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     <option value='Male'>Male</option>
//                     <option value='Female'>Female</option>
//                   </select>
//                   <span className='text-danger'>{genderError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Address*</label>
//                   <input type="text" className={`form-control font14  ${studentAddressError ? 'border-1 border-danger' : ''} `} id="validationDefault01" value={studentAddress} placeholder="Enter Address" onChange={(e) => handleAddressChange(e.target.value)} />
//                   <span className='text-danger'>{studentAddressError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Emergency Contact Details*</label>
//                   <input type="text" className={`form-control font14  ${emergencyNoError ? 'border-1 border-danger' : ''} `} id="validationDefault02" value={emergencyNo} placeholder="Enter School Info" onChange={(e) => handleEmergencyNoChange(e.target.value)} />
//                   <span className='text-danger'>{emergencyNoError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault02" className="form-label font14">Photo*</label>
//                   {/* <input type={changeImageType ? "text" : "studentImage"} className={`form-control font14  ${studentImageError ? 'border-1 border-danger' : ''} `} id="validationDefault02" value={studentImage} onChange={(e) => handleStudentImageChange(e.target.files)} /> */}
//                   <div className="d-flex bg-white">
//                     {studentImage && changeImageType ? (
//                       <input type='text' className={`form-control font14 formcontrolImageborder ${studentImageError ? 'border-1 border-danger' : ''}`} id="validationDefault02" value={studentImage.split('/').pop()} readOnly />
//                     ) : (
//                       <input type='studentImage' className={`form-control font14 formcontrolImageborder ${studentImageError ? 'border-1 border-danger' : ''}`} accept="image/png, image/jpg, image/svg, image/jpeg" id="validationDefault02" onChange={(e) => handleStudentImageChange(e.target.files)} />
//                     )}
//                     <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
//                       <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
//                         {studentImage && changeImageType ? 'Edit' : 'View'}
//                       </span>
//                     </div>
//                   </div>
//                   <span className='text-danger'>{studentImageError}</span>
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="validationDefault01" className="form-label font14">Fee Master*</label>
//                   <select className={`form-select font14 ${FeeMasterError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" value={FeeMaster} onChange={(e) => handleFeeMasterChange(e.target.value)}>
//                     <option value=''>--- Choose ---</option>
//                     {allFeeMaster?.map(option => (
//                       <option key={option.feeGroup} value={option.feeGroup}>
//                         {option.feeGroup}
//                       </option>
//                     ))}
//                   </select>
//                   <span className='text-danger'>{FeeMasterError}</span>
//                 </div>
//               </form>
//               <p className='text-center p-3'>
//                 <button className='btn updateButtons text-white' onClick={UpdateStudentByID}>Update</button>
//                 <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={onReload}>Cancel</button>
//               </p>
//             </div>
//           </div>
//         </>
//         :
//         <>
//           <div>
//             <p className='modalLightBorder p-2 mb-0'>Student List</p>
//             <div className="mt-3  ">
//               <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//               <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                 <p className='warningHeading'>Successful Updated</p>
//                 <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//               </div>
//               <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => { onReload, setEditWarning(true), setAbc('Hey, I am updated one ') }}>Continue</button>
//             </div>
//           </div>
//         </>
//       }
//     </div>
//   )
// }

// export default EditStudentDetails

