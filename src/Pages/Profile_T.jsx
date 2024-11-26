import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { TeacherProfileByIdAllApi } from '../Utils/Apis';
import { TeacherProfileUpdateAllApi } from '../Utils/Apis';



// ## style css area start ####  

const Container = styled.div`
  .breadcrum-li a{
  text-decoration: none;
  margin-top: 5px;
  color: #008479;
  }
  .main-body{
    background-color: #F2F3F6; 
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    border-radius: 15px;
}
.container-div-conetent{
    padding: 18px 18px 18px 18px;
    background-color: #fff;
    border-radius: 3px;
}
.my-ul{
    border: 1px solid #D7E7E5;

}
.content-div{
    background-color: #E5F3F2;
    text-align: center;
    padding: 15px 0px 15px 0px;
}
.content-div123{
    background-color: #E5F3F2;
   
}
.li-link{
    color: #000;
    text-decoration: none ;
    cursor: pointer !important;
}
.nav-pills .nav-link.active, .nav-pills .show>.nav-link {
    background-color: transparent ;
    color: orange;
    border-bottom: 1px solid orange;
    border-radius: 0;
}
.my-nav-link{
    color: #000;
}
.color123{
    color: #8F8F8F;
}
.for-padding{
    /* padding: 0px 0px 2px 60px; */
}
.li-links{
    border: 1px solid  #D7E7E5;
}
.verified{
    background: #0AAD24;
    color: #fff;
    padding: 2px 7px;
    border-radius: 3px;
}

@media only screen and (max-width: 1200px) {
    .content-responsive{
font-size: 11px !important;
padding-bottom: 8px;
}
}
@media only screen and (max-width: 991px) {
    .content-responsive{
font-size: 14px !important;
}
}
`;
// ## style css area end #### 

const Profile = () => {

    const [forDelete, setForDelete] = useState(false)
    
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)
    const [hide22, setHide22] = useState(false)
    const [show22, setShow22] = useState(true)
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [leaveType, setLeaveType] = useState()
    const [LeaveData, setLeaveData] = useState([])
    const [loader, setLoader] = useState(false)
    const [searchKey, setSearchKey] = useState()
    const [IdForDelete, setIdForDelete] = useState()
    const [IdForUpdate, setIdForUpdate] = useState()

    const [address, setAddress] = useState()
    const [staffName, setStaffName] = useState()
    const [staffLastName, setStaffLastName] = useState()
    const [phone, setPhone] = useState()
    const [staffEmail, setStaffEmail] = useState()
    const [designation, setDesignation] = useState()
    const [dob, setDob] = useState()
    const [gender, setGender] = useState()
    const [swicthInput, setSwicthInput] = useState(false)
    const [imageFile, setImageFile] = useState()
    const [isValidAddressRequired, setIsValidAddressRequired] = useState(false);
    const [isValidStaffNameRequired, setIsValidStaffNameRequired] = useState(false);
    const [isValidStaffLastNameRequired, setIsValidStaffLastNameRequired] = useState(false);
    const [isValidPhoneRequired, setIsValidPhoneRequired] = useState(false);
    const [isValidStaffEmailRequired, setIsValidStaffEmailRequired] = useState(false);

    useEffect(() => {
        MyProfileGetAllApi()
    }, [])

    // ###### validation ##########
    const [errors, setErrors] = useState({});

    const FuncValidation = () => {
        let isValid = true;
        // address
        if (!address || address === "" || !/^[a-zA-Z0-9\s,.'-/#%]+$/.test(address)) {
            setIsValidAddressRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // staffname
        if (!staffName || staffName === "" || !/^[A-Za-z\s]+$/.test(staffName)) {
            setIsValidStaffNameRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // stafflastname
        if (!staffLastName || staffLastName === "" || !/^[A-Za-z\s]+$/.test(staffName)) {
            setIsValidStaffLastNameRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // phone
        if (!phone || phone === "" || !/^[6-9]{4}[0-9]{6}$/.test(phone)) {
            setIsValidPhoneRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // staffemail
        if (staffEmail === "" || !staffEmail) {
            setIsValidStaffEmailRequired(true)
        }
        else {
        }
        return isValid;
    }

    // address 
    const handleAddress = (e2) => {
        setAddress(e2);
        const nameRegex = /^[a-zA-Z0-9\s,.'-/#%]+$/;
        setIsValidAddressRequired(nameRegex.test(e2));

        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidAddressRequired(true)
        } else {
            setIsValidAddressRequired(false)
        }
    }
    // staffName 
    const handleStaffName = (e2) => {
        setStaffName(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidStaffNameRequired(nameRegex.test(e2));

        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidStaffNameRequired(true)
        } else {
            setIsValidStaffNameRequired(false)
        }
    }
    // phone
    const handlePhone = (e2) => {
        setPhone(e2);
        const noRegex = /^[6-9]{4}[0-9]{6}$/;
        setIsValidPhoneRequired(noRegex.test(e2));

        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidPhoneRequired(true)
        } else {
            setIsValidPhoneRequired(false)
        }
        if(e2.length > 10){
            setIsValidPhoneRequired(true)
           } else {
            setIsValidPhoneRequired(false)
        }
    }

    // ###### validation ##########

    // Leave Get All Api   
    const MyProfileGetAllApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherProfileByIdAllApi();
            console.log('Get all Api data in Profile', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setAddress(response?.data?.address)
                setStaffName(response?.data?.name)
                setStaffLastName(response?.data?.otherStaff?.staffLastName)
                setPhone(response?.data?.phone)
                setStaffEmail(response?.data?.email)
                setDesignation(response?.data?.roleType?.roleName)
                setDob(response?.data?.staffDOB)
                setImageFile(response?.data?.image)
                setGender(response?.data?.gender)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    // Profile Put api 
    const MyProfilePutApi = async () => {
        if (FuncValidation()) {
            setLoader(true)
            try {
                const formData = new FormData()
                formData.append('staffName', staffName)
                formData.append('lastName', staffLastName)
                formData.append('staffPhone', phone)
                formData.append('address', address)
                formData.append('staffImage', imageFile)

                const response = await TeacherProfileUpdateAllApi(formData);
                console.log('MY profile update api', response)
                if (response?.status === 200) {
                    toast.success(response?.data?.message);
                    // MyLeaveGetAllApi()
                    setShow22(false)
                    setHide22(true)
                    setLoader(false)
                } else {
                    toast.error(response?.data?.message);
                    setShow22(true)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <Container>
            <div className="container-fluid p-4">
                <div className="container-div-conetent">
                    <div className="row " >

                        <div className="col-lg-3 div-col-3 content-div123" >

                            <div className="content-div">
                                <p>
                                    <img src="./public/images/Ellipse 26 (3).png" alt="" />
                                </p>
                                <h2 className='heading-20 mt-2' >{staffName}</h2>
                                <p className='heading-14 mt-2'>Teacher <span className='verified'>Verified</span></p>
                                <hr className='mx-2 mb-0' />
                                <p className='ps-4 py-2  heading-14' style={{ color: "#008479", textAlign: 'initial' }}>Details info</p>
                                <hr className='mx-2 mt-0' />
                            </div>
                            <div className="row heading-14 content-responsive">
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <p className='pt-1 color123'>Email:</p>
                                    <p className='pt-1 color123'>Phone:</p>
                                    <p className='pt-1 color123'>Address:</p>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <p className='pt-1'>{staffEmail}</p>
                                    <p className='pt-1'>{phone}</p>
                                    <p className='pt-1'>{address}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div class="mb-1">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Name</label>
                                <input type="text" class="form-control form-control-sm" value={staffName} onChange={(e) => handleStaffName(e.target.value)} id="exampleFormControlInput1" placeholder="Bertha N. Fisher" />
                            </div>
                            <div className='pt-1'>
                                {isValidStaffNameRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Name is required
                                    </p>
                                )}
                            </div>
                            <div class="mb-1">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Email</label>
                                <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" value={staffEmail} placeholder="admin@example.com" disabled />
                            </div>
                            <div class="mb-1">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Designation</label>
                                <input type="text" class="form-control form-control-sm" id="exampleFormControlInput1" value={designation} placeholder="Enter your Designation" disabled />
                            </div>
                            <div class="mb-1">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Birthday</label>
                                <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1" value={dob ? dob.split('T')[0] : ''} placeholder="Bertha N. Fisher" disabled />
                            </div>

                            <div className="mb-1  ">
                                <label for="exampleFormControlInput1" className="form-label heading-16">Gender</label>
                                <select class="form-select  form-select-sm form-focus  label-color" aria-label="Default select example" disabled>
                                    <option  >--Choose--</option>
                                    <option value="male" >Male</option>
                                    <option value="female" >Female</option>
                                    <option value="other" >Other</option>

                                </select>
                            </div>
                            <div class="mb-1">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Phone Number</label>
                                <input type="email" class="form-control form-control-sm" value={phone} onChange={(e) => handlePhone(e.target.value)} id="exampleFormControlInput1" placeholder="Bertha N. Fisher" />
                            </div>
                            <div className='pt-3'>
                                {isValidPhoneRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Number is required
                                    </p>
                                )}
                            </div>
                            <div class="mb-1">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Address</label>
                                <input type="text" class="form-control form-control-sm" value={address} onChange={(e) => handleAddress(e.target.value)} id="exampleFormControlInput1" placeholder="Bertha N. Fisher" />
                            </div>
                            <div className='pt-3'>
                                {isValidAddressRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Address is required
                                    </p>
                                )}
                            </div>
                      
                            <div class="mb-3 " style={{ display: 'flex', }}>
                                <div className='w-100'>
                                    <label for="exampleFormControlInput1" class="form-label">Profile Image</label>
                                    {
                                        imageFile && swicthInput ?
                                            <input type="file" class="form-control" id="exampleFormControlInput1" onChange={(e) => setImageFile(e.target.files[0])} placeholder="select file" accept='.jpg, .png, .jpeg' />
                                            :
                                            <input type="text" class="form-control" id="exampleFormControlInput1" value={imageFile} placeholder="name@example.com" />
                                    }
                                </div>
                                <div style={{ margin: 'auto', paddingTop: '30px', paddingLeft: '5px' }}>
                                    <button type="button" class="btn btn-outline-success my-green heading-14 " onClick={() => setSwicthInput(!swicthInput)} >{swicthInput ? "View " : "Edit"}</button>
                                </div>
                            </div>
                            <div className='my-button11 mt-2'>
                                <button type="button" className="btn btn-outline-success heading-12 btn-bgAndColor" onClick={MyProfilePutApi}>Save Changes</button>
                                <button type="button" className="btn btn-outline-success heading-12 ms-1">Cancel</button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>


        </Container >
    )
}

export default Profile
