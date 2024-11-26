import React, { useState } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';


// ## style css area ####  

const Container = styled.div`
  .main-body{
    background-color: #F2F3F6;
    
  }
  .main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    border-radius: 15px;
    /* height: 52vh; */
    height: fit-content;
    box-shadow: 0px 2px 4px rgba(0, 0, 20, 0.08), 0px 1px 2px rgba(0, 0, 20, 0.08);
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: transparent !important;
    outline: none !important;
    box-shadow: none  !important;
}
.my-btn-focus:focus{
    box-shadow: none !important;
    border: none !important;
}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
.my-div{
    border: 1px solid #E4E7EB ;
    border-radius: 10px;
}
.second-border{
    font-size: 14px;
}

.my-grp-btn{
    margin-top: -2px;
    height: 32px;
}
.my-grp-btn svg{
    width: 18px;
    margin-top: -10px;
}
.for-margin-top{
    margin-top: -21px;
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
`;

const ManageFaq = () => {
    const [static1, setStatic1] =useState(true)
    const [textarea, setTextarea] =useState(false)

const handleTextArea = () =>{
    if(static1 === true && textarea === false){
        setStatic1(false)
        setTextarea(true)
    } else {
        setStatic1(true)
        setTextarea(false)
    }
}
  return (
   <Container>
     <div className="container-fluid main-body p-3">
    <div className='d-flex justify-content-between for-dislay-direction'>
    <div className="breadCrum ms-2">
    <nav style={{ '--bs-breadcrumb-divider': "'>'" }}aria-label="breadcrumb">
        <ol className="breadcrumb ms-1">
            <li className="breadcrumb-item active breadCrum-color heading-14" aria-current="page">Home</li>
            <li className="breadcrumb-item active breadCrum-color heading-14" aria-current="page">Setting</li>
            <li className="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Manage Faq</Link></li>
        </ol>
    </nav>
    </div>
    <div className='me-2'>  
        <div className="input-group mb-3 ">
            <input type="text" className="form-control grey-border-color form-focus" style={{height:'34px'}} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
            <span className="input-group-text button-bg-color button-color heading-14" style={{ cursor:'pointer',height:"34px"}} id="basic-addon2">Search</span>
        </div>
    </div>
    </div>
    <h5 className=' mb-3 margin-minus22 heading-16 for-margin-top' >Manage Faq </h5>

    <div className="main-content-conatainer pt-1 ">
            {/* ###### copy content till here for all component ######  */}

        <div className=" input-border-color my-div mx-3 mt-3">
        
            <div className='d-flex justify-content-between'>
                <div className='ps-3 pt-3 '>
                    <p>What is Scriza School ERP?</p>
                </div>
                    <div className="btn-group my-grp-btn " role="group" aria-label="Basic example" >
                        <Link type="button" className="btn btn-primary my-btn-focus button-bg-color" onClick={handleTextArea}  style={{ border:'1px solid #008479', borderRadius:'0%',}}>
                            {static1 ? (
                            //  <img src="./images/Group 60.svg" alt="" />
                            <svg width="19" height="19" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" fill="#008479"/>
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6318 1.58867C17.0087 1.21175 17.5199 1 18.0529 1C18.586 1 19.0972 1.21175 19.4741 1.58867C19.851 1.96558 20.0628 2.47679 20.0628 3.00983C20.0628 3.54287 19.851 4.05408 19.4741 4.431L10.4734 13.4317L6.68359 14.3792L7.63104 10.5894L16.6318 1.58867Z" fill="#008479" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            ) : (
                            // <img src="./images/Vector.svg" alt="" />
                                    <svg width="19" height="19" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.0062 1.45048C16.8634 1.30763 16.6937 1.19432 16.5071 1.11703C16.3204 1.03973 16.1203 0.999967 15.9183 1H3.22212C2.93029 0.999937 2.6413 1.05737 2.37167 1.16902C2.10205 1.28067 1.85706 1.44435 1.6507 1.6507C1.44435 1.85706 1.28067 2.10205 1.16902 2.37167C1.05737 2.6413 0.999937 2.93029 1 3.22212V18.7779C0.999937 19.0697 1.05737 19.3587 1.16902 19.6283C1.28067 19.898 1.44435 20.1429 1.6507 20.3493C1.85706 20.5557 2.10205 20.7193 2.37167 20.831C2.6413 20.9426 2.93029 21.0001 3.22212 21H18.7779C19.3667 20.9982 19.9309 20.7635 20.3472 20.3472C20.7635 19.9309 20.9982 19.3667 21 18.7779V6.08173C21 5.87968 20.9603 5.67961 20.883 5.49293C20.8057 5.30626 20.6924 5.13663 20.5495 4.99375L17.0062 1.45048ZM11 18.6923C10.3914 18.6923 9.79655 18.5118 9.29055 18.1738C8.78456 17.8357 8.39018 17.3551 8.15729 16.7929C7.92441 16.2306 7.86348 15.612 7.9822 15.0151C8.10092 14.4182 8.39397 13.87 8.82429 13.4397C9.2546 13.0094 9.80286 12.7163 10.3997 12.5976C10.9966 12.4789 11.6153 12.5398 12.1775 12.7727C12.7397 13.0056 13.2203 13.3999 13.5584 13.9059C13.8965 14.4119 14.0769 15.0068 14.0769 15.6154C14.0774 16.0196 13.9982 16.4199 13.8437 16.7935C13.6893 17.167 13.4627 17.5064 13.1768 17.7922C12.891 18.078 12.5516 18.3047 12.1781 18.4591C11.8045 18.6136 11.4042 18.6928 11 18.6923ZM13.3077 7.92308H4.07692C3.87291 7.92308 3.67725 7.84203 3.53299 7.69777C3.38874 7.55352 3.30769 7.35786 3.30769 7.15385V4.07692C3.30769 3.87291 3.38874 3.67725 3.53299 3.53299C3.67725 3.38874 3.87291 3.30769 4.07692 3.30769H13.3077C13.5117 3.30769 13.7074 3.38874 13.8516 3.53299C13.9959 3.67725 14.0769 3.87291 14.0769 4.07692V7.15385C14.0769 7.35786 13.9959 7.55352 13.8516 7.69777C13.7074 7.84203 13.5117 7.92308 13.3077 7.92308Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                            )
                        }
                        </Link>
                        <Link type="button" className="btn btn-primary button-bg-color"  style={{ border:'1px solid #008479', borderRadius:'0px 8px 0px 0px  '}}>
                        {/* <img src="./images/Expanded.svg" alt="" /> */}
                        <svg width="19" height="19" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2184 19.0637H3.71484V2.43359H17.2184V19.0637ZM4.50917 18.2525H16.4241V3.24482H4.50917V18.2525Z" fill="white"/>
<path d="M14.8352 3.24491H6.09766V0H14.8352V3.24491ZM6.89198 2.43368H14.0409V0.811227H6.89198V2.43368Z" fill="white"/>
<path d="M7.28779 16.2245C7.06816 16.2245 6.89062 16.0432 6.89062 15.8189V5.67856C6.89062 5.45426 7.06816 5.27295 7.28779 5.27295C7.50742 5.27295 7.68495 5.45426 7.68495 5.67856V15.8189C7.68495 16.0432 7.50742 16.2245 7.28779 16.2245Z" fill="white"/>
<path d="M10.4636 16.2246C10.2439 16.2246 10.0664 16.0433 10.0664 15.819V5.67862C10.0664 5.45432 10.2439 5.27301 10.4636 5.27301C10.6832 5.27301 10.8607 5.45432 10.8607 5.67862V15.819C10.8607 16.0433 10.6832 16.2246 10.4636 16.2246Z" fill="white"/>
<path d="M13.6472 16.2246C13.4275 16.2246 13.25 16.0433 13.25 15.819V5.67862C13.25 5.45432 13.4275 5.27301 13.6472 5.27301C13.8668 5.27301 14.0443 5.45432 14.0443 5.67862V15.819C14.0443 16.0433 13.8668 16.2246 13.6472 16.2246Z" fill="white"/>
<path d="M19.9974 2.43365H0.933594V3.24488H19.9974V2.43365Z" fill="white"/>
                        </svg>
                        </Link>
                    </div>
                </div>
                {
                    static1 && (
                        <div className="second-border mx-3  mb-3 font-color input-border-color pt-2" >
                        <p>School ERP is a collection of programs designed to assist schools in administering their executive responsibilities on a day-to-day basis. School ERP is an updated version of School ERP ERP (Enterprise Resource Planning). Also, School ERP 8 is designed for SAAS (Software as a Service) projects.</p>
                    </div>
                    )
                }
                {
                    textarea && (
                        <div className='mx-4 mb-3 font-color' style={{marginTop:'-10px',border:'#9090A0'}}>
                        <textarea className="form-control form-focus heading-14 mt-3" id="exampleFormControlTextarea1 " rows="2"  placeholder='Type here....' ></textarea>
                        </div>
                    )
                }
        </div>

        <div className="input-border-color my-div mx-3 mt-3 pb-3">
        
            <div className='d-flex justify-content-between  '>
                <div className='ps-3 pt-3'>
                    <p>How can I get developed my customer features?</p>
                </div>
                    <div className="btn-group my-grp-btn" role="group" aria-label="Basic example" >
                        <button type="button" className="btn btn-primary" style={{backgroundColor:'#008479', border:'1px solid #008479', borderRadius:'0%',}}>
                            {/* <img src="./images/Group 60.svg" alt="" /> */}
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" fill="#008479"/>
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6318 1.58867C17.0087 1.21175 17.5199 1 18.0529 1C18.586 1 19.0972 1.21175 19.4741 1.58867C19.851 1.96558 20.0628 2.47679 20.0628 3.00983C20.0628 3.54287 19.851 4.05408 19.4741 4.431L10.4734 13.4317L6.68359 14.3792L7.63104 10.5894L16.6318 1.58867Z" fill="#008479" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </button>
                        <button type="button" className="btn btn-primary"  style={{backgroundColor:'#008479', border:'1px solid #008479', borderRadius:'0px 8px 0px 0px  ',}}>
                        {/* <img src="./images/Expanded.svg" alt="" /> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2184 19.0637H3.71484V2.43359H17.2184V19.0637ZM4.50917 18.2525H16.4241V3.24482H4.50917V18.2525Z" fill="white"/>
<path d="M14.8352 3.24491H6.09766V0H14.8352V3.24491ZM6.89198 2.43368H14.0409V0.811227H6.89198V2.43368Z" fill="white"/>
<path d="M7.28779 16.2245C7.06816 16.2245 6.89062 16.0432 6.89062 15.8189V5.67856C6.89062 5.45426 7.06816 5.27295 7.28779 5.27295C7.50742 5.27295 7.68495 5.45426 7.68495 5.67856V15.8189C7.68495 16.0432 7.50742 16.2245 7.28779 16.2245Z" fill="white"/>
<path d="M10.4636 16.2246C10.2439 16.2246 10.0664 16.0433 10.0664 15.819V5.67862C10.0664 5.45432 10.2439 5.27301 10.4636 5.27301C10.6832 5.27301 10.8607 5.45432 10.8607 5.67862V15.819C10.8607 16.0433 10.6832 16.2246 10.4636 16.2246Z" fill="white"/>
<path d="M13.6472 16.2246C13.4275 16.2246 13.25 16.0433 13.25 15.819V5.67862C13.25 5.45432 13.4275 5.27301 13.6472 5.27301C13.8668 5.27301 14.0443 5.45432 14.0443 5.67862V15.819C14.0443 16.0433 13.8668 16.2246 13.6472 16.2246Z" fill="white"/>
<path d="M19.9974 2.43365H0.933594V3.24488H19.9974V2.43365Z" fill="white"/>
                       </svg>

                        </button>
                    </div>
            </div>

            <div className=" mx-3  mb-1 my-hover-effect font-color  input-border-color pt-3" style={{fontSize:'14px',marginTop:'-6px'}}>
                <p>Custom features do not coming with product support. You can contact our support center and send us details about your requirement. If our schedule is open, we can give you a quotation and take your project according to the contract.</p>
            </div>

        </div>

        <div className="input-border-color my-div mx-3 mt-4 pb-3">
        
            <div className='d-flex justify-content-between  '>
                <div className='ps-3 pt-3'>
                    <p>Which license to choose for my client project?</p>
                </div>
                <div className="btn-group my-grp-btn" role="group" aria-label="Basic example" >
                        <button type="button" className="btn btn-primary" style={{backgroundColor:'#008479', border:'1px solid #008479', borderRadius:'0%',}}>
                            {/* <img src="./images/Group 60.svg" alt="" /> */}
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" fill="#008479"/>
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6318 1.58867C17.0087 1.21175 17.5199 1 18.0529 1C18.586 1 19.0972 1.21175 19.4741 1.58867C19.851 1.96558 20.0628 2.47679 20.0628 3.00983C20.0628 3.54287 19.851 4.05408 19.4741 4.431L10.4734 13.4317L6.68359 14.3792L7.63104 10.5894L16.6318 1.58867Z" fill="#008479" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </button>
                        <button type="button" className="btn btn-primary"  style={{backgroundColor:'#008479', border:'1px solid #008479', borderRadius:'0px 8px 0px 0px  ',}}>
                        {/* <img src="./images/Expanded.svg" alt="" /> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2184 19.0637H3.71484V2.43359H17.2184V19.0637ZM4.50917 18.2525H16.4241V3.24482H4.50917V18.2525Z" fill="white"/>
<path d="M14.8352 3.24491H6.09766V0H14.8352V3.24491ZM6.89198 2.43368H14.0409V0.811227H6.89198V2.43368Z" fill="white"/>
<path d="M7.28779 16.2245C7.06816 16.2245 6.89062 16.0432 6.89062 15.8189V5.67856C6.89062 5.45426 7.06816 5.27295 7.28779 5.27295C7.50742 5.27295 7.68495 5.45426 7.68495 5.67856V15.8189C7.68495 16.0432 7.50742 16.2245 7.28779 16.2245Z" fill="white"/>
<path d="M10.4636 16.2246C10.2439 16.2246 10.0664 16.0433 10.0664 15.819V5.67862C10.0664 5.45432 10.2439 5.27301 10.4636 5.27301C10.6832 5.27301 10.8607 5.45432 10.8607 5.67862V15.819C10.8607 16.0433 10.6832 16.2246 10.4636 16.2246Z" fill="white"/>
<path d="M13.6472 16.2246C13.4275 16.2246 13.25 16.0433 13.25 15.819V5.67862C13.25 5.45432 13.4275 5.27301 13.6472 5.27301C13.8668 5.27301 14.0443 5.45432 14.0443 5.67862V15.819C14.0443 16.0433 13.8668 16.2246 13.6472 16.2246Z" fill="white"/>
<path d="M19.9974 2.43365H0.933594V3.24488H19.9974V2.43365Z" fill="white"/>
                       </svg>

                        </button>
                    </div>
            </div>

            <div className=" mx-3 my-hover-effect font-color mt-2" style={{fontSize:'14px'}}>
            <p>If you use academy LMS for a commercial project of a client, you will be required extended license.</p>     
            </div>

        </div>

        <div className="input-border-color my-div mx-3 mt-3  pb-3 " >
        
        <div className='d-flex justify-content-between '>
            <div className='ps-3 pt-3'>
                <p>How much time will I get developer support?</p>
            </div>
            <div className="btn-group my-grp-btn" role="group" aria-label="Basic example" >
                        <button type="button" className="btn btn-primary" style={{backgroundColor:'#008479', border:'1px solid #008479', borderRadius:'0%',}}>
                            {/* <img src="./images/Group 60.svg" alt="" /> */}
                            <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" fill="#008479"/>
<path d="M9.527 3.00983H2.89489C2.39233 3.00983 1.91036 3.20947 1.555 3.56483C1.19964 3.92019 1 4.40216 1 4.90472V18.1689C1 18.6715 1.19964 19.1535 1.555 19.5088C1.91036 19.8642 2.39233 20.0638 2.89489 20.0638H16.1591C16.6617 20.0638 17.1436 19.8642 17.499 19.5088C17.8544 19.1535 18.054 18.6715 18.054 18.1689V11.5368" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16.6318 1.58867C17.0087 1.21175 17.5199 1 18.0529 1C18.586 1 19.0972 1.21175 19.4741 1.58867C19.851 1.96558 20.0628 2.47679 20.0628 3.00983C20.0628 3.54287 19.851 4.05408 19.4741 4.431L10.4734 13.4317L6.68359 14.3792L7.63104 10.5894L16.6318 1.58867Z" fill="#008479" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                        </button>
                        <button type="button" className="btn btn-primary"  style={{backgroundColor:'#008479', border:'1px solid #008479', borderRadius:'0px 8px 0px 0px  ',}}>
                        {/* <img src="./images/Expanded.svg" alt="" /> */}
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.2184 19.0637H3.71484V2.43359H17.2184V19.0637ZM4.50917 18.2525H16.4241V3.24482H4.50917V18.2525Z" fill="white"/>
<path d="M14.8352 3.24491H6.09766V0H14.8352V3.24491ZM6.89198 2.43368H14.0409V0.811227H6.89198V2.43368Z" fill="white"/>
<path d="M7.28779 16.2245C7.06816 16.2245 6.89062 16.0432 6.89062 15.8189V5.67856C6.89062 5.45426 7.06816 5.27295 7.28779 5.27295C7.50742 5.27295 7.68495 5.45426 7.68495 5.67856V15.8189C7.68495 16.0432 7.50742 16.2245 7.28779 16.2245Z" fill="white"/>
<path d="M10.4636 16.2246C10.2439 16.2246 10.0664 16.0433 10.0664 15.819V5.67862C10.0664 5.45432 10.2439 5.27301 10.4636 5.27301C10.6832 5.27301 10.8607 5.45432 10.8607 5.67862V15.819C10.8607 16.0433 10.6832 16.2246 10.4636 16.2246Z" fill="white"/>
<path d="M13.6472 16.2246C13.4275 16.2246 13.25 16.0433 13.25 15.819V5.67862C13.25 5.45432 13.4275 5.27301 13.6472 5.27301C13.8668 5.27301 14.0443 5.45432 14.0443 5.67862V15.819C14.0443 16.0433 13.8668 16.2246 13.6472 16.2246Z" fill="white"/>
<path d="M19.9974 2.43365H0.933594V3.24488H19.9974V2.43365Z" fill="white"/>
                       </svg>

                        </button>
                    </div>
        </div>

        <div className=" mx-3   my-hover-effect font-color mt-2" style={{fontSize:'14px'}}>
        <p>By default, you are entitled to developer support for 6 months from the date of your purchase. Later on anytime you can renew the support pack if you need developer support. If you don't need any developer support, you don't need to buy it.</p>     
        </div>

       </div>

    </div>


    </div>
   </Container>
  )
}

export default ManageFaq
