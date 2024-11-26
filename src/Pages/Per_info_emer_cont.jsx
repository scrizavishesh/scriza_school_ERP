import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { EmergencyGetAllApi } from '../Utils/Apis'
import { personal_Emergeny__GetById } from '../Utils/Apis'


const Per_info_emer_cont = ({ data }) => {

    const staffId = data.data;

    const MyUserID = localStorage.getItem('MyUserID');

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
    const [status, setStatus] = useState()
    const [updateStatus, setUpdateStatus] = useState()


    console.log('true false', status)
    const [loader, setLoader] = useState(false)

    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [contact, setContact] = useState()
    const [address, setAddress] = useState('')

    const [isValidNameRequired, setIsValidNameRequired] = useState(false);
    const [isValidEmailRequired, setIsValidEmailRequired] = useState(false);
    const [isValidContactRequired, setIsValidContactRequired] = useState(false);
    const [isValidAddressRequired, setIsValidAddressRequired] = useState(false);

    // ###### validation ##########
    const [errors, setErrors] = useState({});

    const FuncValidation = () => {

        // name 
        if (name === "" || !name) {
            setIsValidNameRequired(true)
        }
        else {
        }
        // email
        if (email === "" || !email) {
            setIsValidEmailRequired(true)
        }
        else {
        }
        // contact
        if (contact === "" || !contact) {
            setIsValidContactRequired(true)
        }
        else {
        }
        // address
        if (address === "" || !address) {
            setIsValidAddressRequired(true)
        }
        else {
        }
        return errors;
    }
    // name 
    const handleName = (e2) => {
        setName(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidNameRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidNameRequired(true)
        } else {
            setIsValidNameRequired(false)
        }
    }
    // email 
    const handleemail = (e2) => {
        setEmail(e2)
        const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        setIsValidEmailRequired(regexEmail.test(e2));
        if (e2 === "" || !regexEmail.test(e2)) {
            setIsValidEmailRequired(true)
        } else {
            setIsValidEmailRequired(false)
        }
    }
    // contact 
    const handlecontact = (e2) => {
        setContact(e2)
        const phoneRegex = /^\d+(\.\d{1,2})?$/;
        setIsValidContactRequired(phoneRegex.test(e2));
        if (e2 === "" || !phoneRegex.test(e2)) {
            setIsValidContactRequired(true)
        } else {
            setIsValidContactRequired(false)
        }
    }
    // address
    const handleaddress = (e2) => {
        setAddress(e2)
        const addRegex = /^[a-zA-Z0-9\s,.'-/]+$/;
        setIsValidAddressRequired(addRegex.test(e2));
        if (e2 === "" || !addRegex.test(e2)) {
            setIsValidAddressRequired(true)
        } else {
            setIsValidAddressRequired(false)
        }
    }

    // ###### validation ##########

    // User post Api 
    const ContactDataApi = async () => {
        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('fullName', name);
            formData.append('phoneNumber', contact);
            formData.append('email', email);
            formData.append('address', address);
            setLoader(true)
            try {
                const response = await EmergencyGetAllApi(MyUserID, formData);
                console.log('my staff post api response in EMERGENCyyyyyyy', response)
                if (response?.data?.status === "success") {
                    toast.success(response?.data?.message);
                    setStatus(response?.data?.status)
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
    useEffect(() => {
        MyStaffGetById()
    }, [])

    // Staff Get by id
    const MyStaffGetById = async () => {
        // setIdForUpdate(id);
        setLoader(true);
        try {
            const response = await personal_Emergeny__GetById(MyUserID);
            console.log("my EMERGECY get by id api is here______________ ", response);
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setUpdateStatus(response?.data?.status);

                setName(response?.data?.emergency?.fullName);
                setEmail(response?.data?.emergency?.email);
                setContact(response?.data?.emergency?.phoneNumber);
                setAddress(response?.data?.emergency?.address);
               

                setLoader(false);
            } else {
                toast.error(response?.data?.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <div className="container-fluid">
                <div className="row px-1 pt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Full Name  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={name} onChange={(e) => handleName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Full Name" />
                        </div>
                        <div className='pt-1'>
                            {isValidNameRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid name is required
                                </p>
                            )}
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Email  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={ email} onChange={(e) => handleemail(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Email" />
                        </div>
                        <div className='pt-1'>
                            {isValidEmailRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid email is required
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contact Number</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={ contact} onChange={(e) => handlecontact(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Contact Number" />
                        </div>
                        <div className='pt-1'>
                            {isValidContactRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid phone is required
                                </p>
                            )}
                        </div>

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Address</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={address} onChange={(e) => handleaddress(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Address" />
                        </div>
                        <div className='pt-1'>
                            {isValidAddressRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid address is required
                                </p>
                            )}
                        </div>
                    </div>


                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            {
                                updateStatus === "success"
                                    ?
                                    <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Update Contact</button>
                                    :
                                    <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Add Contact</button>

                            }
                            <button type="button" class="btn btn-outline-success heading-12 ms-1    ">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Per_info_emer_cont
