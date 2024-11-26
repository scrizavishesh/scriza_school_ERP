import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UpdateImageGetAllApi } from '../Utils/Apis'
import { Profile_picture__GetById } from '../Utils/Apis'
import { Profile_picture_PutApi } from '../Utils/Apis'


const User_Prof_pic = ({ data }) => {

    const staffId = data;
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
    const [swicthInput, setSwicthInput] = useState(false)

    const [staffName, setstaffName] = useState('')
    const [staffEmail, setstaffEmail] = useState('')
    const [staffAddress, setstaffAddress] = useState('')
    const [staffPhone, setstaffPhone] = useState('')
    const [staffGender, setstaffGender] = useState('')
    const [roleId, setroleId] = useState('')

    const [staffImage, setstaffImage] = useState()
    const [copy, setCopy] = useState()

    console.log('Imageeeeeeeee', staffImage)
    const [loader, setLoader] = useState(false)

    // User post Api 
    const ContactDataApi = async () => {

        const formData = new FormData()
        formData.append('staffName', staffName);
        formData.append('staffEmail', staffEmail);
        formData.append('staffAddress', staffAddress);
        formData.append('staffPhone', staffPhone);
        formData.append('staffGender', staffGender);
        formData.append('roleId', roleId);
        formData.append('staffImage', staffImage);

        setLoader(true)
        try {
            const response = await UpdateImageGetAllApi(MyUserID, formData);
            console.log('my staff post api response in Profileeeeeee updateeeeee', response)
            if (response?.data?.status === "success") {
                toast.success(response?.data?.message);
                setStatus(response?.data?.status)
                setstaffImage("")
                // setFunction(response?.data?.otherstaff?.staffStatus)

                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
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
            const response = await Profile_picture__GetById(MyUserID);
            console.log("my profile picture api get by id is here______________ ", response);
            if (response?.status === 200) {
                // toast.success(response?.data?.msg);
                setUpdateStatus(response?.data?.status);
                setstaffImage(response?.data?.user?.staffImage);
                setCopy(response?.data?.user?.staffImage);

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

        const formData = new FormData();
        formData.append('staffImage', staffImage);
        setLoader(true);
        try {

            const response = await Profile_picture_PutApi(MyUserID, formData);
            // console.log("MY_TEACHER stafff____put-Api 000000", response);
            if (response?.status === 200) {
                toast.success(response?.data?.message);
                setShow(false);
                // MyTeacherGetAllApi();
                setLoader(false);

            } else {
                toast.error(response?.data?.message);
                setShow(true);
            }
        } catch (error) {
            console.log(error);
        }

    };
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 col-md-6 col-sm-12">
                        <div class="mb-3 " style={{display:'flex',}}>
                            <div className='w-100'>
                                <label for="exampleFormControlInput1" class="form-label">Profile Picture</label>
                                {
                                    staffImage && swicthInput ?
                                        <input type="file" class="form-control" id="exampleFormControlInput1" onChange={(e) => setstaffImage(e.target.files[0])} placeholder="name@example.com" accept='.jpg, .png, .jpeg' />
                                        :
                                        <input type="text" class="form-control" id="exampleFormControlInput1" value={staffImage} onChange={(e) => setstaffImage(e.target.files[0])} placeholder="name@example.com" />
                                }
                            </div>

                            <div style={{margin:'auto',paddingTop:'30px',paddingLeft:'5px'}}>
                                <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={() => setSwicthInput(!swicthInput)} >{swicthInput ? "View " : "Edit "}</button>
                                {/* <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={() => setSwicthInput(!swicthInput)} disabled={staffImage === "" ? true : false}>{swicthInput ? "View " : "Edit "}</button> */}

                            </div>
                        </div>

                        <div className="row mt-4 buttons-tops">
                            <div className='my-button11 heading-14'>
                                {
                                    updateStatus === "success"
                                        ?
                                        <button type="button" class="btn btn-outline-success my-green heading-12" onClick={MyStaffePutApi}>Update Picture</button>
                                        :
                                        <button type="button" class="btn btn-outline-success my-green heading-12" onClick={ContactDataApi}>Add Picture</button>
                                }
                                <button type="button" class="btn btn-outline-success heading-12 ms-1 ">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User_Prof_pic
