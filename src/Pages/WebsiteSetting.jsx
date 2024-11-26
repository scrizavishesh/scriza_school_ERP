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
    border-radius: 5px;
}

.header-1{
    background-color: var(  --LightGreenHeadingBgColor) !important;
    border-radius: 5px;
    margin-top: 15px;
}
.header-1 h6{
    margin-top: 2px;
}
.input-icon img{
    object-fit: cover;
    width: 18px;
    margin-left: 7px;
    margin-top: 4px;
}
.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: transparent !important;
    outline: none !important;
    box-shadow: none  !important;
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
.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
}
.my-button11 button:hover{
    background-color: var( --buttonBgColor) !important;
    color: var(  --whiteColor) !important;
}
.for-margin-top{
    margin-top: -8px;
    margin-left: 13px;
  }
  /* ########## media query ###########  */
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

const ManageFaq = () => {
  return (
   <Container>
     <div className="container-fluid main-body p-3">
    <div className='d-flex justify-content-between for-dislay-direction'>
    <div className="breadCrum ms-2">
    <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
        <ol class="breadcrumb ms-1">
            <li class="breadcrumb-item active font-color heading-14" aria-current="page">Home</li>
            <li class="breadcrumb-item active font-color heading-14" aria-current="page">Setting</li>
            <li class="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Website Setting</Link></li>
        </ol>
    </nav>
    </div>
    <div className='me-2'>
        <div class="input-group  ">
            <input type="text" class="form-control form-focus grey-border-color" style={{height:'34px'}} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <span class="input-group-text  button-bg-color button-color heading-14" style={{cursor:'pointer',height:"34px" }} id="basic-addon2">Search</span>
        </div>
    </div>
    </div>
    <h5 className=' mb-3 margin-minus22 heading-16 for-margin-top' >Website Setting</h5>

    <div className="main-content-conatainer22 pt-1 ">
            {/* ###### copy content till here for all component ######  */}

        <div className='d-flex gap-2 header-1  mx-3 '>
                <div className="input-icon ps-2" style={{marginTop:'2.5px'}}>
                    {/* <img src="./images/website.svg" alt="" /> */}
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5 5H11.25V6.25H17.5V5ZM17.5 7.5H11.25V8.75H17.5V7.5ZM15 10H11.25V11.25H15V10ZM8.75 5H2.5V11.25H8.75V5ZM0 0V16.25H20V0H0ZM18.75 15H1.25L1.3 2.5H18.75V15Z" fill="black"/>
                    </svg>

                </div>
                <div className='mt-1 text-color-000'>
                    <h6>Website Settings</h6>
                </div>
        </div>

        <div className="row heading-14 media-margin-top" >
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">System Title</label>
                    <input type="email" class="form-control  form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter System Title" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Banner Title</label>
                    <input type="email" class="form-control  form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Banner Title" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}> 
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Banner Subtitle</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Subtitle" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Features Title</label>
                    <input type="email" class="form-control form-focus-input form-control-md  heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Features Title" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Features Subtitle</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Features Subtitle" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Price Subtitle</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Price Subtitle" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Faq Subtitle</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Faq Subtitle" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1 " class="form-label heading-14 text-color-000">Facebook Link</label>
                    {/* <input type="email" class="form-control form-control-sm" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Price Subtitle" /> */}
                    <select class="form-select form-control-md form-focus-input heading-14 grey-input-text-color input-border-color" aria-label="Default select example" style={{borderRadius:'5px', marginTop:'-5px'}} >
                        <option selected>Enter Facebook Link</option>
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
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Instagram Link</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Instagram Link" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Contact Mail</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Contact Mail" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label text-color-000">Frontend Footer Text</label>
                    <input type="email" class="form-control form-focus-input form-control-md  heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Frontend Footer Text" />
                </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <div class="mb-3 pe-3 pt-2 for-media-margin">
                    <label for="exampleFormControlInput1" class="form-label heading-14  text-color-000">Copyright Text</label>
                    <input type="email" class="form-control form-focus-input form-control-md heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px', marginTop:'-5px'}} id="exampleFormControlInput1" placeholder="Enter Copyright Text" />
                </div>
            </div>
        </div>

        <div className="row heading-14" style={{marginTop:'-15px'}}>
            <div className="col-lg-6 col-md-6 col-sm-12">
                <div class="mb-3 ps-3 pt-2 for-media-margin">
                <label for="formFileSm" class="form-label text-color-000">Small file input example</label>
                <input class="form-control form-control-md form-focus-input heading-14 grey-input-text-color input-border-color" style={{borderRadius:'5px'}}  id="formFileSm" type="file" />
                </div>
            </div>
            <div class="mb-3">
              
            </div>
        </div>

     {/* ####### buttons ######  */}
     
        <div className="row">
            <div className='my-button11'>
                <button type="button" class="btn btn-outline-success">Submit</button>
                <button type="button" class="btn btn-outline-success">Cancel</button>
            </div>
        </div>

     </div>
    </div>
   </Container>
  )
}

export default ManageFaq
