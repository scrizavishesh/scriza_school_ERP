import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


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
.main-content-conatainer22{
    padding-bottom: 5% !important;
    background-color: #fff;
    margin: 10px;
    /* height: 100vh; */
    border-radius: 8px;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: transparent !important;
    outline: none !important;
    box-shadow: none !important;
}
.form-focus-input:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: 1px solid #ced4da !important;
    outline: none !important;
    box-shadow: none  !important;
}
.form-control:focus {
    border-color: #ced4da !important;
}
.form-select:focus {
    border-color: #ced4da !important;
}

.header-1{
    background-color: #E5F3F2;
    /* background-color: #4af1e6; */
    border-radius: 5px;
    margin-top: 15px;
}
.input-icon img{
    object-fit: cover;
    width: 18px;
    margin-left: 7px;
    margin-top: 2px;
}
.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
}

.my-button11 button{
  border-radius: 5px;
  border: 1px solid var(  --buttonBorderColor) !important;
  color: #000;
}
.my-button11 button:hover{
    background: var( --buttonBgColor) !important;
    color: var(--whiteTextColor) !important;
}
.for-margin-top{
    margin-top: -20px;
    margin-left: 12px;
  }
@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
@media only screen and (max-width: 768px) {
    .for-media-margin{
       padding: 0px 14px 0px 14px  !important;
    }
    .media-margin-top{
        margin-top: 10px;
    }

}
`;
// ## style css area end ####  

const SystemSettin = () => {
  return (
   <Container>
     <div className="container-fluid main-body p-3">
    <div className='d-flex justify-content-between for-dislay-direction' >
    <div className="breadCrum ms-2">
    <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">   
        <ol class="breadcrumb ms-1">
            <li class="breadcrumb-item active font-color heading-14" aria-current="page">Home</li>
            <li class="breadcrumb-item active font-color heading-14" aria-current="page">Setting</li>
            <li class="breadcrumb-item breadcrum-li heading-14"  ><Link href="#">System Setting</Link></li>
        </ol>
    </nav>
    </div>
    <div className='me-2'>
        <div class="input-group mb-3 ">
            <input type="text" class="form-control form-focus grey-border-color" style={{height:'34px'}} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <span class="input-group-text  button-bg-color button-color heading-14 " style={{ cursor:'pointer',height:"34px"}} id="basic-addon2">Search</span>
        </div>
    </div>
    </div>
    <h5 className='mb-3 margin-minus22 heading-16 for-margin-top' >System Setting</h5>

    <div className="main-content-conatainer22 pt-1 ">
            {/* ###### copy content till here for all component ######  */}

        <div className='d-flex gap-2 header-1  mx-3 '>
                <div className="input-icon ps-2" style={{marginTop:'2px'}}>
                    {/* <img src="./images/Group 59.svg" alt="" /> */}
                    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.125 16.2887H16.875V15.0387H17.5V12.5387H15V13.1637H13.75V11.9137C13.75 11.7479 13.8158 11.589 13.9331 11.4718C14.0503 11.3545 14.2092 11.2887 14.375 11.2887H18.125C18.2908 11.2887 18.4497 11.3545 18.5669 11.4718C18.6842 11.589 18.75 11.7479 18.75 11.9137V15.6637C18.75 15.8295 18.6842 15.9884 18.5669 16.1056C18.4497 16.2228 18.2908 16.2887 18.125 16.2887Z" fill="black"/>
                        <path d="M15 19.4137H11.25C11.0842 19.4137 10.9253 19.3478 10.8081 19.2306C10.6908 19.1134 10.625 18.9545 10.625 18.7887V15.0387C10.625 14.8729 10.6908 14.714 10.8081 14.5968C10.9253 14.4795 11.0842 14.4137 11.25 14.4137H15C15.1658 14.4137 15.3247 14.4795 15.4419 14.5968C15.5592 14.714 15.625 14.8729 15.625 15.0387V18.7887C15.625 18.9545 15.5592 19.1134 15.4419 19.2306C15.3247 19.3478 15.1658 19.4137 15 19.4137ZM11.875 18.1637H14.375V15.6637H11.875V18.1637Z" fill="black"/>
                        <path d="M9.375 13.0749C8.92331 12.9572 8.51366 12.7153 8.19258 12.3765C7.8715 12.0377 7.65186 11.6157 7.55859 11.1584C7.46532 10.701 7.50216 10.2267 7.66494 9.78921C7.82772 9.35175 8.1099 8.96871 8.47945 8.68357C8.84899 8.39844 9.29109 8.22265 9.75553 8.17616C10.22 8.12966 10.6881 8.21434 11.1069 8.42057C11.5256 8.6268 11.8781 8.94631 12.1244 9.34282C12.3706 9.73933 12.5008 10.197 12.5 10.6637H13.75C13.7507 9.94859 13.547 9.24817 13.1627 8.64504C12.7785 8.04192 12.2298 7.56123 11.5814 7.25966C10.933 6.95809 10.2118 6.84822 9.503 6.94299C8.79419 7.03777 8.12726 7.33325 7.58084 7.79458C7.03442 8.25591 6.63131 8.86386 6.41903 9.54675C6.20675 10.2296 6.19416 10.959 6.38274 11.6488C6.57132 12.3386 6.9532 12.9601 7.48337 13.44C8.01354 13.92 8.66988 14.2383 9.375 14.3575V13.0749Z" fill="black"/>
                        <path d="M18.058 9.13245L16.6142 10.4012L15.7267 9.5137L17.233 8.1887L15.758 5.6387L13.608 6.3637C13.1043 5.94449 12.5339 5.6128 11.9205 5.38245L11.4767 3.1637H8.52673L8.08298 5.38245C7.46461 5.60637 6.89107 5.93864 6.38923 6.3637L4.24548 5.6387L2.77048 8.1887L4.47048 9.68245C4.35484 10.3294 4.35484 10.9917 4.47048 11.6387L2.77048 13.1387L4.24548 15.6887L6.39548 14.9637C6.89911 15.3829 7.46953 15.7146 8.08298 15.9449L8.52673 18.1637H9.37673V19.4137H8.52673C8.23771 19.4134 7.95772 19.313 7.73439 19.1295C7.51106 18.9461 7.35817 18.6909 7.30173 18.4074L6.98298 16.8324C6.70002 16.6944 6.4265 16.5378 6.16423 16.3637L4.64548 16.8762C4.51633 16.9182 4.38129 16.9393 4.24548 16.9387C4.02593 16.9402 3.80996 16.8831 3.61988 16.7732C3.4298 16.6633 3.2725 16.5047 3.16423 16.3137L1.68923 13.7637C1.54334 13.5131 1.48913 13.2195 1.53588 12.9333C1.58263 12.6472 1.72743 12.3861 1.94548 12.1949L3.14548 11.1449C3.13298 10.9824 3.12673 10.8262 3.12673 10.6637C3.12673 10.5012 3.13923 10.3449 3.15173 10.1887L1.94548 9.13245C1.72743 8.94128 1.58263 8.68024 1.53588 8.39405C1.48913 8.10786 1.54334 7.81431 1.68923 7.5637L3.16423 5.0137C3.2725 4.8227 3.4298 4.66406 3.61988 4.55419C3.80996 4.44432 4.02593 4.38718 4.24548 4.3887C4.38129 4.38807 4.51633 4.40917 4.64548 4.4512L6.15798 4.9637C6.42239 4.78951 6.69799 4.63292 6.98298 4.49495L7.30173 2.91995C7.35817 2.63649 7.51106 2.38134 7.73439 2.19789C7.95772 2.01444 8.23771 1.91401 8.52673 1.9137H11.4767C11.7657 1.91401 12.0457 2.01444 12.2691 2.19789C12.4924 2.38134 12.6453 2.63649 12.7017 2.91995L13.0205 4.49495C13.3034 4.63296 13.577 4.78955 13.8392 4.9637L15.358 4.4512C15.4871 4.40917 15.6222 4.38807 15.758 4.3887C15.9775 4.38718 16.1935 4.44432 16.3836 4.55419C16.5737 4.66406 16.731 4.8227 16.8392 5.0137L18.3142 7.5637C18.4601 7.81431 18.5143 8.10786 18.4676 8.39405C18.4208 8.68024 18.276 8.94128 18.058 9.13245Z" fill="black"/>
                    </svg>

                </div>
                <div className='text-color-000' style={{marginTop:'6px'}}>
                    <h6 className='heading-16'>System Settings</h6>
                </div>
        </div>

        <div className="row heading-14 media-margin-top" >
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">School Name</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter School Name" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">School Title</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter System Title" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Navbar Title</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Navbar Title" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">School Email</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter System Email" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Phone</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Phone Number" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Fax</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Fax" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}> 
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Address</label>
                    <input type="email" class="form-control form-focus-input form-control-md  heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Address" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1 " class="form-label text-color-000 ">Frontend View</label>
                    {/* <input type="email" class="form-control form-control-sm" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Price Subtitle" /> */}
                    <select class="form-select form-focus-input form-select-md heading-14 grey-input-text-color input-border-color" aria-label="Default select example" style={{borderRadius:'5px', marginTop:'-5px'}} >
                        <option selected>Yes</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                     </select>
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Timezone</label>
                    {/* <input type="email" class="form-control form-control-sm" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Instagram Link" /> */}
                    <select class="form-select form-focus-input form-select-md  heading-14 grey-input-text-color input-border-color" aria-label="Default select example" style={{borderRadius:'5px', marginTop:'-5px'}} >
                        <option selected>YUTC/GMT +5:30</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                     </select>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Footer Text</label>
                    <input type="email" class="form-control form-focus-input form-control-md   heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Footer Text" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Footer Link</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Footer Link" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Help Link</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Help Link" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
        <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">System Language</label>
                    <select class="form-select form-focus-input form-select-md heading-14 grey-input-text-color input-border-color" aria-label="Default select example" style={{borderRadius:'5px', marginTop:'-5px'}} >
                        <option selected>English</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                     </select>
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 p-0 pe-4">
                <div class="mb-3 ps-3 pt-2  for-media-margin">
                <label for="formFileSm" class="form-label text-color-000">Update Logo</label>
                <input class="form-control form-focus-input form-control-md  heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}}  id="formFileSm" type="file" />
                </div>
            </div>
         
        </div>

     {/* ####### buttons ######  */}
     
        <div className="row">
            <div className='my-button11 '>
            <button type="button" class="btn btn-outline-success">Submit</button>
            <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
        </div>

     </div>
    </div>
   </Container>
  )
}

export default SystemSettin
