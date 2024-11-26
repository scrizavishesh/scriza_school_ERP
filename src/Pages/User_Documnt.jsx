import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { DocumntGetAllApi } from '../Utils/Apis'
import { Documents_getById } from '../Utils/Apis'

const User_Documnt = (data) => {


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


    console.log('true false', status)
    const [loader, setLoader] = useState(false)


    console.log('data idd from parent in User document', data)

    const [DocumentName, setDocumentName] = useState()
    console.log('documents name ',DocumentName)
    const [DocumentNameType, setDocumentNameType] = useState()
    const [image, setImage] = useState()
    const [updateStatus, setUpdateStatus] = useState()
    const [swicthInput, setSwicthInput] = useState(false)

    const [isValidDocumentNameRequired, setIsValidDocumentNameRequired] = useState(false);
    const [isValidDocumentNameTypeRequired, setIsValidDocumentNameTypeRequired] = useState(false);


    // ###### validation ##########
    const [errors, setErrors] = useState({});

    const FuncValidation = () => {

        // name 
        if (DocumentName === "" || !DocumentName) {
            setIsValidDocumentNameRequired(true)
        }
        else {
        }
        // type 
        if (DocumentNameType === "" || !DocumentNameType) {
            setIsValidDocumentNameTypeRequired(true)
        }
        else {
        }
        return errors;
    }

    // DocumentName 
    const handleDocumentName = (e2) => {
        setDocumentName(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidDocumentNameRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidDocumentNameRequired(true)
        } else {
            setIsValidDocumentNameRequired(false)
        }
    }
    // DocumentNameType
    const handleDocumentNameType = (e2) => {
        setDocumentNameType(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidDocumentNameTypeRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidDocumentNameTypeRequired(true)
        } else {
            setIsValidDocumentNameTypeRequired(false)
        }
    }

    // ###### validation ##########

    // User post Api 
    const ContactDataApi = async () => {
        if (FuncValidation()) {
            const formData = new FormData()
            formData.append('documentName', DocumentName);
            formData.append('documentType', DocumentNameType);
            formData.append('file', image);
            setLoader(true)
            try {
                const response = await DocumntGetAllApi(MyUserID, formData);
                console.log('my staff post api response in documents', response)
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
            const response = await Documents_getById(MyUserID);
            console.log("my Documenttttttt file  api get by id is here______________ ", response);
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setUpdateStatus(response?.data?.status);
                setDocumentName(response?.data?.document?.docNumber);
                setDocumentNameType(response?.data?.document?.docType);
                setImage(response?.data?.document?.docPath);
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
            <div className="container-fluid px-0 mt-3">
                <p className='mb-2' style={{ marginTop: '-10px' }}>Documents</p>
                <div className="table-container  table-responsive">

                    <table className="table table-sm ">
                        <thead className=''>
                            <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                                <th className='tableGreyBackgroundColor ps-4 pb-2' style={{ width: '25%' }}>Title</th>
                                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Amount </th>
                                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Allowance Option</th>
                                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Amount Option</th>
                            </tr>
                        </thead>
                        <tbody className='heading-14 align-middle greyTextColor greyText'>
                            {/* <tr className='heading-14 ' >
                    <td className=' greyText pe-0 ' style={{ width: '25%' }}>table</td>
                    <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                    <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                    <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                  </tr> */}
                        </tbody>
                        <Toaster />
                    </table>
                </div>

                <div>
                    <p>Add New Document</p>
                    <div className="row ">
                        <div className="col-lg-6 col-md-6 col-sm-12 ">

                            <div className="mb-3   for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Document Name </label>
                                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={DocumentName} onChange={(e) => handleDocumentName(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Document Name" />
                            </div>
                            <div className='pt-1'>
                                {isValidDocumentNameRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Valid name is required
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 ">
                            <div className="mb-3  pt- for-media-margin">
                                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Document Type </label>
                                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={DocumentNameType} onChange={(e) => handleDocumentNameType(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Payslip" />
                            </div>
                            <div className='pt-1'>
                                {isValidDocumentNameTypeRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Valid type is required
                                    </p>
                                )}
                            </div>
                        </div>
                        {/* <div className="row pe-0">
                            <div class="mb-3 pe-0">
                                <label for="exampleFormControlInput1" class="form-label">Document File</label>
                                <input type="file" class="form-control form-control-sm" onChange={(e) => setImage(e.target.files[0])} id="exampleFormControlInput1" placeholder="name@example.com" accept='.jpg, .png, .jpeg' />
                            </div>
                            <p className='heading-12' style={{ marginTop: '-5px' }}>Upload files only: png, jpg, jpeg, gif, txt, pdf, xls, xlsx, doc, docx</p>
                        </div> */}
                         <div class="mb-3 " style={{display:'flex',}}>
                            <div className='w-100'>
                                <label for="exampleFormControlInput1" class="form-label">Document File</label>
                                {
                                    image  && swicthInput ?
                                        <input type="file" class="form-control" id="exampleFormControlInput1" onChange={(e) => setImage(e.target.files[0])} placeholder="select file" accept='.jpg, .png, .jpeg' />
                                        :
                                        <input type="text" class="form-control" id="exampleFormControlInput1" value={image}  placeholder="name@example.com" />
                                }
                            </div>
                            
                            <div style={{margin:'auto',paddingTop:'30px',paddingLeft:'5px'}}>
                                <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={() => setSwicthInput(!swicthInput)} >{swicthInput ? "View " : "Edit"}</button>
                            </div>
                            
                        </div>
                    </div>

                </div>
                <div className="row mt-4 buttons-topss text-center">
                    <div className='my-button11 heading-14'>
                        {
                            updateStatus === "success"
                                ?
                                <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" onClick={ContactDataApi} >Update Document</button>
                                :
                                <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" onClick={ContactDataApi} >Add Document</button>

                        }
                        <button type="button" class="btn btn-outline-success heading-14">Cancel</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_Documnt
