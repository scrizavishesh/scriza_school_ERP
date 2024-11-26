import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { BankGetAllApi } from '../Utils/Apis'
import { personal_Bank_details__GetById } from '../Utils/Apis'


const Per_info_bank = ({ data }) => {

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

    const [AccountTil, setAccountTil] = useState()
    const [IFSC, setIFSC] = useState()
    const [accountNo, setAccountNo] = useState()
    const [swiftCode, setSwiftCode] = useState('')
    const [bankName, setBankName] = useState()
    const [bankBranch, setBankBranch] = useState()

    const [isValidAccountTilRequired, setIsValidAccountTilRequired] = useState(false);
    const [isValidIFSCRequired, setIsValidIFSCRequired] = useState(false);
    const [isValidaccountNoRequired, setIsValidaccountNoRequired] = useState(false);
    const [isValidSwiftCodeRequired, setIsValidSwiftCodeRequired] = useState(false);
    const [isValidBankNameRequired, setIsValidBankNameRequired] = useState(false);
    const [isValidBankBranchRequired, setIsValidBankBranchRequired] = useState(false);

    // ###### validation ##########
    const [errors, setErrors] = useState({});

    const FuncValidation = () => {

        // title 
        if (AccountTil === "" || !AccountTil) {
            setIsValidAccountTilRequired(true)
        }
        else {
        }
        // IFSC
        if (IFSC === "" || !IFSC) {
            setIsValidIFSCRequired(true)
        }
        else {
        }
        // accountNo
        if (accountNo === "" || !accountNo) {
            setIsValidaccountNoRequired(true)
        }
        else {
        }
        // swiftCode
        if (swiftCode === "" || !swiftCode) {
            setIsValidSwiftCodeRequired(true)
        }
        else {
        }
        // bankName
        if (bankName === "" || !bankName) {
            setIsValidBankNameRequired(true)
        }
        else {
        }
        // bankBranch
        if (bankBranch === "" || !bankBranch) {
            setIsValidBankBranchRequired(true)
        }
        else {
        }
        return errors;
    }

    // AccountTil 
    const handleAccountTil = (e2) => {
        setAccountTil(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidAccountTilRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidAccountTilRequired(true)
        } else {
            setIsValidAccountTilRequired(false)
        }
    }
    // IFSC 
    const handleIFSC = (e2) => {
        setIFSC(e2)
        const noRegex = /^\d+(\.\d{1,2})?$/;
        setIsValidIFSCRequired(noRegex.test(e2));
        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidIFSCRequired(true)
        } else {
            setIsValidIFSCRequired(false)
        }
    }
    // accountNo 
    const handleAccountNo = (e2) => {
        setAccountNo(e2)
        const noRegex = /^\d+(\.\d{1,2})?$/;
        setIsValidaccountNoRequired(noRegex.test(e2));
        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidaccountNoRequired(true)
        } else {
            setIsValidaccountNoRequired(false)
        }
    }
    // swiftCode 
    const handleSwiftCode = (e2) => {
        setSwiftCode(e2)
        const noRegex = /^\d+(\.\d{1,2})?$/;
        setIsValidSwiftCodeRequired(noRegex.test(e2));
        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidSwiftCodeRequired(true)
        } else {
            setIsValidSwiftCodeRequired(false)
        }
    }
    // bankName
    const handlebankName = (e2) => {
        setBankName(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidBankNameRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidBankNameRequired(true)
        } else {
            setIsValidBankNameRequired(false)
        }
    }
    // bankBranch
    const handlebankBranch = (e2) => {
        setBankBranch(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidBankBranchRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidBankBranchRequired(true)
        } else {
            setIsValidBankBranchRequired(false)
        }
    }

    // ###### validation ##########

    // User post Api 
    const ContactDataApi = async () => {
        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('accountTitle', AccountTil);
            formData.append('accountNumber', accountNo);
            formData.append('bankName', bankName);
            formData.append('ifscCode', IFSC);
            formData.append('swiftCode', swiftCode);
            formData.append('bankBranch', bankBranch);

            setLoader(true)
            try {
                const response = await BankGetAllApi(MyUserID, formData);
                console.log('my staff post api response in BANKKKKKKK', response)
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
            const response = await personal_Bank_details__GetById(MyUserID);
            console.log("my Bank details get by id api is here______________ ", response);
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setUpdateStatus(response?.data?.status);

                setAccountTil(response?.data?.bankDetails?.accountTitle);
                setIFSC(response?.data?.bankDetails?.ifscCode);
                setAccountNo(response?.data?.bankDetails?.accountNumber);
                setSwiftCode(response?.data?.bankDetails?.swiftCode);
                setBankName(response?.data?.bankDetails?.bankName);
                setBankBranch(response?.data?.bankDetails?.bankBranch);

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
                <p className='heading-16 mt-3'>Bank Details</p>
                <div className="row px-1 pt-2">
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Account Title  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={AccountTil} onChange={(e) => handleAccountTil(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Title" />
                        </div>
                        <div className='pt-1'>
                            {isValidAccountTilRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid title is required
                                </p>
                            )}
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">IFSC Code  </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={IFSC} onChange={(e) => handleIFSC(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter IFSC Code" />
                        </div>
                        <div className='pt-1'>
                            {isValidIFSCRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid code is required
                                </p>
                            )}
                        </div>

                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 ">
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Account Number </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={accountNo} onChange={(e) => handleAccountNo(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Number" />
                        </div>
                        <div className='pt-1'>
                            {isValidaccountNoRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid acc no is required
                                </p>
                            )}
                        </div>

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Swift Code</label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={swiftCode} onChange={(e) => handleSwiftCode(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Swift Code" />
                        </div>
                        <div className='pt-1'>
                            {isValidSwiftCodeRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid swift no is required
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-4 col-sm-12 ">

                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Bank Name </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={bankName} onChange={(e) => handlebankName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Bank Name" />
                        </div>
                        <div className='pt-1'>
                            {isValidBankNameRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid name is required
                                </p>
                            )}
                        </div>
                        <div className="mb-3  pt- for-media-margin">
                            <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Bank Branch </label>
                            <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={bankBranch} onChange={(e) => handlebankBranch(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Branch Name" />
                        </div>
                        <div className='pt-1'>
                            {isValidBankBranchRequired && (
                                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                    Valid bran name is required
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="row mt-3 buttons-tops text-center">
                        <div className='my-button11 heading-14'>
                            {
                                updateStatus === "success"
                                    ?
                                    <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Update</button>
                                    :
                                    <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Submit</button>
                            }
                            <button type="button" class="btn btn-outline-success heading-12 ms-1">Cancel</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Per_info_bank
