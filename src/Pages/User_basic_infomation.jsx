import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { StaffPostApi } from '../Utils/Apis'
import { StaffGetById } from '../Utils/Apis'
import { StaffPutApi } from '../Utils/Apis'
import { RolePermissionGetApi } from '../Utils/Apis'
// import { IncomeCategorygetAllApi } from '../Utils/Apis'

const User_basic_infomation = ({ data, setFunction }) => {
    // console.log('my USERRRR id in basicccc',data)
    const myUserId = data;  

    const [loader, setLoader] = useState(false)
    const [forDelete, setForDelete] = useState(false)
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [searchKey, setSearchKey] = useState('')
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()
    const [showadd, setShowadd] = useState(true)
    const [hideedit, setHideedit] = useState(false)

    const [gender, setGender] = useState('')
    const [image, setImage] = useState('')
    const [roleId, setRoleId] = useState('')

    const [status, setStatus] = useState()
    // console.log('true false', status)

    const [maritalStatus, setMaritalstatus] = useState()
    const [bloodGroup, setBloodGroup] = useState()
    const [nationality, setNationality] = useState()
    const [state, setState] = useState()
    const [city, setCity] = useState()
    const [religion, setReligion] = useState()
    const [emptyValue, setemptyValue] = useState()
    const [userId, setUserId] = useState()
    const [rolePermisAllData, setRolePermisAllData] = useState([])
    const [originalMail, setOriginalMail] = useState();
    const [updateStatus, setUpdateStatus] = useState()

    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [firstAdd, setFirstAdd] = useState()
    const [secondAddress, setSecondAddress] = useState()
    const [email, setEmail] = useState()
    const [phone, setPhone] = useState('')
    const [pinCode, setpinCode] = useState('')
    const [dob, setDob] = useState()

    const [isValidFirstNameRequired, setIsValidFirstNameRequired] = useState(false);
    const [isValidLastNameRequired, setIsValidLastNameRequired] = useState(false);
    const [isValidFirstAddRequired, setIsValidFirstAddRequired] = useState(false);
    const [isValidsecondAddressRequired, setIsValidsecondAddressRequired] = useState(false);
    const [isValidEmailRequired, setIsValidEmailRequired] = useState(false);
    const [isValidPhoneRequired, setIsValidPhoneRequired] = useState(false);
    const [isValidPinCodeRequired, setIsValidPinCodeRequired] = useState(false);
    const [isValidDobRequired, setIsValidDobRequired] = useState(false);

    useEffect(() => {
        MyRolPermisGetAllApi()
        MyStaffGetById()
    }, [])
    // ###### validation ##########
    const [errors, setErrors] = useState({});


    const FuncValidation = () => {
        let isValid = true;

        // firstName
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!firstName || !firstName || !nameRegex.test(firstName)) {
            setIsValidFirstNameRequired(true);
            isValid = false
            setLoader(false)
        } else {
            setIsValidFirstNameRequired(false);
        }

        // secondName
        const name2Regex = /^[A-Za-z\s]+$/;
        if (!lastName || !lastName || !name2Regex.test(lastName)) {
            setIsValidLastNameRequired(true);
            isValid = false
            setLoader(false)
        } else {
            setIsValidLastNameRequired(false);
        }


        // if (lastName === "" || !lastName) {
        //     setIsValidLastNameRequired(true)

        // }
        // else {
        // }
        // fristAdd
        if (!firstAdd || firstAdd === "" || !/^[a-zA-Z0-9\s,.'-/#%]+$/.test(firstAdd)) {
            setIsValidFirstAddRequired(true)
            isValid = false
            setLoader(false)
        }
        else {
        }
        // secondAdd
        if (!secondAddress || secondAddress === "" || !/^[a-zA-Z0-9\s,.'-/#%]+$/.test(secondAddress)) {
            setIsValidsecondAddressRequired(true)
            isValid = false
            setLoader(false)
        }
        else {
            setIsValidsecondAddressRequired(false)
        }
        // email 
        if (!email || email === "" || !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            setIsValidEmailRequired(true)
            isValid = false
            setLoader(false)
        }
        else {
        }
        // phone 
        if (!phone || phone === "" || !/^[6-9]{4}[0-9]{6}$/.test(phone)) {
            setIsValidPhoneRequired(true)
            isValid = false
            setLoader(false)
        }
        else {
            setIsValidPhoneRequired(false)
        }
        // pinCode 
        if (!pinCode || pinCode === "" || !/^\d{6}(-\d{4})?$/.test(pinCode)) {
            setIsValidPinCodeRequired(true)
            isValid = false
            setLoader(false)
        }
        else {
            setIsValidPinCodeRequired(false)
        }
        // dob 
        if (!dob || dob === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dob)) {
            setIsValidDobRequired(true)
            isValid = false
            setLoader(false)
        }
        else {
        }
        return isValid;
    }

    // name 
    const handleName = (e2) => {
        setFirstName(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidFirstNameRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidFirstNameRequired(true)
        } else {
            setIsValidFirstNameRequired(false)
        }
    }
    // secondName 
    const handleSecondName = (e2) => {
        setLastName(e2)
        const nameRegex = /^[A-Za-z]+$/;
        setIsValidLastNameRequired(nameRegex.test(e2));

        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidLastNameRequired(true)
        } else {
            setIsValidLastNameRequired(false)
        }
    }
    // first add 
    const handleFirstAdd = (e2) => {
        setFirstAdd(e2)
        const addRegex = /^[a-zA-Z0-9\s,.'-/#%]+$/;
        setIsValidFirstAddRequired(addRegex.test(e2));
        if (e2 === "" || !addRegex.test(e2)) {
            setIsValidFirstAddRequired(true)
        } else {
            setIsValidFirstAddRequired(false)
        }
    }
    // second add 
    const handleSecondAdd = (e2) => {
        setSecondAddress(e2)
        const addRegex = /^[a-zA-Z0-9\s,.'-/#%]+$/;
        setIsValidsecondAddressRequired(addRegex.test(e2));
        if (e2 === "" || !addRegex.test(e2)) {
            setIsValidsecondAddressRequired(true)
        } else {
            setIsValidsecondAddressRequired(false)
        }
    }
    // email
    const handleEmail = (e2) => {
        setEmail(e2)
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmailRequired(regexEmail.test(e2));
        if (e2 === "") {
            setIsValidEmailRequired(true)
        } else {
            setIsValidEmailRequired(false)
        }
        if (e2 === "" || !regexEmail.test(e2)) {
            setIsValidEmailRequired(true)
        } else {
            setIsValidEmailRequired(false)
        }
    }
    // phone 
    const handlePhone = (e2) => {
        setPhone(e2)
        const phoneRegex = /^[6-9]{4}[0-9]{6}$/;
        setIsValidPhoneRequired(phoneRegex.test(e2));
        if (e2 === "" || !phoneRegex.test(e2)) {
            setIsValidPhoneRequired(true)
        } else {
            setIsValidPhoneRequired(false)
        }
        if (e2.length > 10) {
            setIsValidPhoneRequired(true)
        } else {
            setIsValidPhoneRequired(false)
        }
    }
    // pinCode 
    const handlePinCode = (e2) => {
        setpinCode(e2)
        const pinCodeRegex = /^\d{6}(-\d{4})?$/;
        setIsValidPinCodeRequired(pinCodeRegex.test(e2));
        if (e2 === "" || !pinCodeRegex.test(e2)) {
            setIsValidPinCodeRequired(true)
        } else {
            setIsValidPinCodeRequired(false)
        }
    }
    // dob 
    const handleDob = (e2) => {
        setDob(e2)
        const pinCodeRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
        setIsValidDobRequired(pinCodeRegex.test(e2));
        if (e2 === "" || !pinCodeRegex.test(e2)) {
            setIsValidDobRequired(true)
        } else {
            setIsValidDobRequired(false)
        }
    }
    // ###### validation ##########


    // Role permission Get All Api  from role permission page  
    const MyRolPermisGetAllApi = async () => {

        try {
            const response = await RolePermissionGetApi();
            // console.log('My role permission get all New User page', response)
            if (response?.status === 200) {
                // toast.success(response?.data?.msg)
                setRolePermisAllData(response?.data?.roles)
            } else {
                // toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // User post Api 
    const SubcPostDataApi = async () => {
        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('staffName', firstName);
            formData.append('staffEmail', email);
            formData.append('staffAddress', firstAdd);
            formData.append('staffPhone', phone);
            formData.append('staffGender', gender);
            formData.append('roleId', roleId);
            formData.append('staffImage', image);
            formData.append('staffLastName', lastName);
            formData.append('staffDOB', dob);

            setLoader(true)
            try {
                const response = await StaffPostApi(formData);
                console.log('my staff post api response 3333333333333333', response)
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    setemptyValue(response?.data?.status)
                    setUserId(response?.data?.status)
                    setFunction(response?.data?.otherstaff?.id)
                    localStorage.setItem('MyUserID', response?.data?.otherstaff?.id)
                    // setFunction(response?.data?.otherstaff?.staffStatus)

                    setLoader(false)
                } else {
                    toast.error(response?.data?.message);
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    // Staff Get by id
    const MyStaffGetById = async (id) => {
        setIdForUpdate(id);
        setLoader(true);
        try {
            const response = await StaffGetById(myUserId);
            console.log("My teacher get by id dataaaa =======", response);
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setUpdateStatus(response?.data?.status);
                setFirstName(response?.data?.user?.staffName);
                setLastName(response?.data?.user?.staffLastName);
                setPhone(response?.data?.user?.staffPhone);
                setEmail(response?.data?.user?.staffEmail);
                setOriginalMail(response?.data?.user?.staffEmail);
                setDob(response?.data?.user?.staffDOB);
                setpinCode(response?.data?.user?.pinCode);
                setFirstAdd(response?.data?.user?.staffAddress);
                setSecondAddress(response?.data?.user?.address2);
                // setRoleID(response?.data?.user?.staffGender);
                setLoader(false);
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Teacher Put api
    const MyStaffePutApi = async () => {

        if (FuncValidation()) {
            const formData = new FormData();
            if (originalMail !== email) {
                formData.append("staffEmail", email);
            }
            formData.append('staffName', firstName);
            // formData.append('staffEmail', email);
            formData.append('staffAddress', firstAdd);
            formData.append('staffPhone', phone);
            formData.append('staffGender', gender);
            formData.append('roleId', roleId);
            formData.append('staffImage', image);
            formData.append('staffLastName', lastName);
            formData.append('staffDOB', dob);
            setLoader(true);
            try {

                const response = await StaffPutApi(myUserId, formData);
                // console.log("MY_TEACHER stafff____put-Api 000000", response);
                if (response?.status === 200) {
                    toast.success(response?.data?.message);
                    setShow(false);
                    // MyTeacherGetAllApi();
                    setLoader(false);
                    const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
                    offcanvasInstance.hide();
                    setTimeout(() => {
                        setShow(true)
                    }, 0.5)
                } else {
                    toast.error(response?.data?.message);
                    setShow(true);
                }
            } catch (error) {
                console.log(error);
            }
        }

    };
    return (
        <>
            <div className="container-fluid">
                <p className='heading-16'>Basic Information</p>
                <div className="row px-1 pt-2">
                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color"> First Name </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={firstName} onChange={(e) => handleName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="John" />
                            {/* <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={`${emptyValue === "success" ? '' : firstName} ${firstName}`}  onChange={(e) => handleName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="John" /> */}
                        </div>
                        <div className='pt-1'>
                            {isValidFirstNameRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid first name is required
                                </p>
                            )}
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color ">Gender</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : gender} onChange={(e) => setGender(e.target.value)} aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="male" >Male</option>
                                <option value="female" >Female</option>
                                <option value="other" >Other</option>

                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> Status</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : status} onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="true" >true</option>
                                <option value="false" >false</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> State / Province</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : state} onChange={(e) => setState(e.target.value)} aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="uttar pradesh" >Uttar Pradesh</option>
                                <option value="delhi" >Delhi</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> Nationality</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : nationality} onChange={(e) => setNationality(e.target.value)} aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="indian" >Indian</option>
                                <option value="other" >Other</option>
                            </select>
                        </div>

                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Blood Group</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="a" >A</option>
                                <option value="b" >B</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Last Name </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={lastName} onChange={(e) => handleSecondName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Doe" />
                            {/* <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={emptyValue === "success" ? '' : lastName} onChange={(e) =>  handleSecondName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Doe" /> */}
                        </div>
                        <div className='pt-1'>
                            {isValidLastNameRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid last name is required
                                </p>
                            )}
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Email</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={email} onChange={(e) => handleEmail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="type email" />
                        </div>
                        <div className='pt-1'>
                            {isValidEmailRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid email is required
                                </p>
                            )}
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> Marital Status</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : maritalStatus} onChange={(e) => setMaritalstatus(e.target.value)} aria-label="Default select example">
                                <option>--Choose--</option>
                                <option value="married" >Married</option>
                                <option value="Unmarried" >Unmarried</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> City</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : city} onChange={(e) => setCity(e.target.value)} aria-label="Default select example">
                                <option>--Choose--</option>
                                <option value="noida" >Noida</option>
                                <option value="aligarh" >Aligarh</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> Citizenship</label>
                            <select class="form-select  form-select-sm form-focus label-color" aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="indian" >Indian</option>
                                <option value="other" >Other</option>
                            </select>
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Address Line 1 </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={firstAdd} onChange={(e) => handleFirstAdd(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Address" />
                        </div>
                        <div className='pt-1'>
                            {isValidFirstAddRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid address is required
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contact Number</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={phone} onChange={(e) => handlePhone(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Address" />
                        </div>
                        <div className='pt-1'>
                            {isValidPhoneRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid phone is required
                                </p>
                            )}
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Date of Birth </label>
                            <input type="date" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={dob} onChange={(e) => handleDob(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="0.00" />
                        </div>
                        <div className='pt-1'>
                            {isValidDobRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid dob is required
                                </p>
                            )}
                        </div>
                        <div className="mb-3   for-media-margin">
                            <label for="exampleFormControlInput1 " className="form-label mb-1 heading-14 label-color gender-adjust-media">Role Name*</label>
                            <select className="form-select form-control-sm  form-focus-input heading-14 grey-input-text-color input-border-color" value={emptyValue === "success" ? '' : roleId} onChange={(e) => setRoleId(e.target.value)} aria-label="Default select example" style={{ borderRadius: '5px' }} >
                                <option value="" >--Choose--</option>
                                {
                                    rolePermisAllData.map(item => (
                                        <option value={item.roleId} >{item.roleName}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Pin Code </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={pinCode} onChange={(e) => handlePinCode(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter pin code" />
                        </div>
                        <div className='pt-1'>
                            {isValidPinCodeRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid pin code is required
                                </p>
                            )}
                        </div>
                        <div class="mb-3">
                            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color "> Religion</label>
                            <select class="form-select  form-select-sm form-focus label-color" value={emptyValue === "success" ? '' : religion} onChange={(e) => setReligion(e.target.value)} aria-label="Default select example">
                                <option  >--Choose--</option>
                                <option value="muslim" >Muslim</option>
                                <option value="hindu" >Hindu</option>
                                <option value="sikh" >Sikh</option>
                                <option value="isai" >Isai</option>
                            </select>
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Address Line 2 </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={secondAddress} onChange={(e) => handleSecondAdd(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Address" />
                        </div>
                        <div className='pt-1'>
                            {isValidsecondAddressRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid address is required
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            {updateStatus === "success"
                                ?
                                <button type="button" class="btn btn-outline-success my-green heading-12" onClick={MyStaffePutApi}>Update Profile</button>
                                :
                                <button type="button" class="btn btn-outline-success my-green heading-12" onClick={SubcPostDataApi}> Add Profile</button>

                            }
                            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                            <Toaster />
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default User_basic_infomation
