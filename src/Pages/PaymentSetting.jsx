import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom'

// ## style css area #### 

const Container = styled.div`
 
  .main-body{
    background-color: #F2F3F6;
  }
.main-content-conatainer{
    background-color: #fff;
    margin: 10px;
    border-radius: 15px;
    box-shadow: 0px 2px 4px rgba(0, 0, 20, 0.08), 0px 1px 2px rgba(0, 0, 20, 0.08);
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
    /* border-color: 1px solid #ced4da !important; */
    outline: none !important;
    box-shadow: none  !important;
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
.header-1 h6{
    margin-top: 2px;
}
.input-icon img{
    object-fit: cover;
    width: 18px;
    margin-left: 7px;
    margin-top: 4px;
}

.margin-minus{
    margin-top: -18px;
}

.my-option{
    min-height: 3rem !important;
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



const PaymentSetting = () => {
    return (
        <Container>
            <div className="container-fluid main-body p-3">
                <div className='d-flex justify-content-between for-dislay-direction'>
                    <div className="breadCrum ms-2">
                        <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
                            <ol class="breadcrumb ms-1">
                                <li class="breadcrumb-item active breadCrum-color heading-14" aria-current="page">Home</li>
                                <li class="breadcrumb-item active breadCrum-color heading-14" aria-current="page">Setting</li>
                                <li class="breadcrumb-item breadcrum-li heading-14" ><Link href="#">Payment Settings</Link></li>
                            </ol>
                        </nav>
                    </div>
                    <div className='me-2'>
                        <div class="input-group mb-3 ">
                            <input type="text" class="form-control form-focus" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                            <span class="input-group-text button-bg-color button-color" style={{ cursor: 'pointer', height: "34px", fontSize: '14px' }} id="basic-addon2">Search</span>
                        </div>
                    </div>
                </div>

                <h5 className='  mb-3 margin-minus22 heading-16 for-margin-top' >Payment Settings </h5>

                <div className="main-content-conatainer pt-1 ">

                    <div className='d-flex gap-2 header-1   mx-3'>
                        <div className="input-icon ps-2 " style={{ marginTop: '2.5px' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_165_3996)">
                                    <path d="M9.99893 18.8505C5.111 18.8505 1.14844 14.888 1.14844 10C1.14844 5.11193 5.111 1.14941 9.99893 1.14941C14.8871 1.14941 18.8496 5.11193 18.8496 10C18.8496 14.888 14.8871 18.8505 9.99893 18.8505Z" stroke="black" />
                                    <path d="M8.82244 3.14465V4.61783C8.22633 4.61783 5.54464 5.37724 5.54464 7.81206C5.54464 9.97807 7.47981 10.5677 8.82103 10.7612L8.82244 13.209C7.84313 12.9294 7.66515 12.1759 7.52917 11.5531H5.37891C5.51199 13.9891 7.65152 15.122 8.82244 15.2941V16.7927H10.8665V15.3167C12.4845 15.2307 14.4007 13.8335 14.4007 11.9185C14.4007 9.72527 12.4919 9.1027 10.8665 8.93535V6.6916C11.5061 6.73693 12.0051 7.37152 12.0592 8.01745H14.1882C14.1882 5.84169 12.2087 4.69715 10.8452 4.61783V3.14465H8.82244ZM8.83378 6.71285V8.57272C7.39288 8.55006 7.36487 6.9709 8.83378 6.71285ZM10.8906 11.1111C12.6736 11.1564 12.8711 12.9358 10.8877 13.2203L10.8906 11.1111Z" fill="black" />
                                    <path d="M10.8906 13.2196L10.8926 11.1106L10.8906 13.2196Z" fill="white" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_165_3996">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </div>
                        <div className='mt-1 text-color-000'>
                            <h6>Currency</h6>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-6 mx-3 mt-2 ">
                            <h6 className='size-1 heading-14 text-color'>Currency</h6>
                            <select class="form-select form-select-md input-border-color grey-input-text-color form-focus-input  heading-14" style={{ color: '#ADADBD' }} aria-label="Small select example">
                                <option selected className=''>USD</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <button type="button" class="btn btn-secondary mt-3 button-bg-color" >Update Currency</button>

                        </div>
                    </div>

                    <div className='d-flex gap-2 header-1   mx-3 mt-4'>
                        <div className="input-icon ps-2" style={{ marginTop: '2.5px' }}>
                            {/* <img src="./images/website.svg" alt="" /> */}
                            <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 5H11.25V6.25H17.5V5ZM17.5 7.5H11.25V8.75H17.5V7.5ZM15 10H11.25V11.25H15V10ZM8.75 5H2.5V11.25H8.75V5ZM0 0V16.25H20V0H0ZM18.75 15H1.25L1.3 2.5H18.75V15Z" fill="black" />
                            </svg>


                        </div>
                        <div className='mt-1 text-color-000'>
                            <h6 >Offline Payment Instruction</h6>
                        </div>
                    </div>

                    <div className="row mt-3 mx-2 heading-14">
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="formFile" class="form-label">Offline Payment Instruction Image/PDF</label>
                                <input class="form-control form-focus-input  input-border-color grey-input-text-color form-select-md " style={{ borderRadius: '5px', }} type="file" id="formFile" />
                                <button type="button" class="btn btn-secondary mt-3 button-bg-color" >Submit</button>

                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Offline Payment Instruction</label>
                                <input type="email" class="form-control input-border-color grey-input-text-color form-focus-input form-control-lg $input-btn-padding-y-sm heading-14" style={{ borderRadius: '5px' }} id="exampleFormControlInput1" placeholder="You can make payments using your mobile banking number." />
                            </div>
                        </div>

                    </div>

                    <div className='d-flex gap-2 header-1  mx-3 mt-3 '>
                        <div className="input-icon ps-2" style={{ marginTop: '2.5px' }}>
                            {/* <img src="./images/367638_paypal_icon 1.svg" alt="" /> */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.8042 9.35992C17.1936 12.1316 14.911 13.7625 12.1805 13.7625H9.32766L8.34977 18.2031H4.35633L4.73348 16.5255H6.06836H7.12984L7.35832 15.4893L8.10773 12.0849H9.89902C13.3702 12.0849 16.0836 9.94977 16.8122 6.64668C16.8736 6.3666 16.9148 6.10059 16.94 5.84445C17.7207 6.59258 18.16 7.75051 17.8042 9.35992ZM5.03016 15.2043H3.67629H2.07422L5.09039 1.79688H11.8961C13.156 1.79688 14.545 2.36691 15.2243 3.57402C15.4584 3.99051 15.6088 4.48187 15.6402 5.05328C15.6622 5.45 15.6273 5.88617 15.5222 6.36164C15.2839 7.44465 14.7875 8.34883 14.1119 9.05406C13.0792 10.1327 11.6228 10.7354 9.99977 10.7593C9.96602 10.7599 9.93285 10.7636 9.89906 10.7636H7.04566L6.06836 15.2043H5.03016ZM7.61629 8.19531H9.49051C9.90637 8.19531 10.3204 8.05828 10.6841 7.8298C10.8229 7.74074 10.9563 7.64059 11.0766 7.52691C11.4132 7.21062 11.6669 6.80578 11.7732 6.36164C11.9599 5.69516 11.7436 5.11652 11.2977 4.79645C11.063 4.62816 10.7664 4.52859 10.4285 4.52859H8.47262L8.40992 4.79645L7.61629 8.19531Z" fill="black" />
                            </svg>

                        </div>
                        <div className='mt-1 text-color-000'>
                            <h6>Paypal settings</h6>
                        </div>
                    </div>

                    <div className="row mt-3 mx-2 heading-14">
                        <div className="col-6 ">
                            <h6 className='size-1'>Active</h6>
                            <select class="form-select form-select-md input-border-color form-focus-input  " aria-label="Small select example">
                                <option selected >No</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-6 ">
                            <h6 className='size-1'>Active</h6>
                            <select class="form-select form-select-md form-focus-input input-border-color text-color-000" aria-label="Small select example">
                                <option selected >Sandbox</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                    </div>

                    <div className="row mt-2 mx-2  heading-14">
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Client ID (Sandbox)</label>
                                <input type="email" class="form-control form-focus-input form-select-lg  input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="snd_cl_id_xxxxxxxxxxxxx" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-black">Client Secrect (Sandbox)</label>
                                <input type="email" class="form-control form-focus-input form-select-lg  input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="snd_cl_sid_xxxxxxxxxxxx" />
                            </div>
                        </div>
                    </div>

                    <div className="row  mx-2 heading-14" >
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Client ID (Live)</label>
                                <input type="email" class="form-control form-focus-input form-select-lg  input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="lv_cl_id_xxxxxxxxxxxxxxx" />
                                <button type="button" class="btn btn-secondary mt-3 button-bg-color" >Update Paypal</button>

                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Client Secrect (Live)</label>
                                <input type="email" class="form-control form-focus-input form-select-lg  input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="lv_cl_sid_xxxxxxxxxxxxxx" />
                            </div>
                        </div>
                    </div>

                    <div className='d-flex gap-2 header-1  mx-3 mt-3'>
                        <div className="input-icon ps-2" style={{ marginTop: '2.5px' }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.7414 8.45957C9.23501 7.87234 9.23501 7.60851 9.23501 7.25957C9.23501 6.91063 9.51586 6.59574 10.3244 6.59574C10.8671 6.59312 11.4022 6.72468 11.8818 6.97872L12.401 7.20851C12.4634 7.23714 12.5321 7.24956 12.6007 7.2446C12.6692 7.23963 12.7354 7.21746 12.7931 7.18012C12.8508 7.14279 12.8982 7.0915 12.9308 7.031C12.9634 6.97051 12.9802 6.90276 12.9797 6.83404V4.59574C12.98 4.51269 12.956 4.43137 12.9106 4.3618C12.8652 4.29224 12.8005 4.23747 12.7244 4.20425C11.9788 3.89056 11.1756 3.73689 10.3669 3.75319C7.94139 3.7617 6.17969 5.29361 6.17969 7.4468C6.17969 10 8.65628 10.8511 9.45628 11.166C10.852 11.7021 10.852 12.0596 10.852 12.3915C10.852 13.183 10.001 13.3021 9.54139 13.3021C8.85778 13.2954 8.1882 13.1075 7.60096 12.7574L7.23501 12.5532C7.17051 12.5159 7.09736 12.4963 7.02288 12.4962C6.9484 12.4961 6.87519 12.5155 6.81058 12.5525C6.74597 12.5896 6.69221 12.6429 6.65468 12.7073C6.61714 12.7716 6.59716 12.8447 6.59671 12.9191V15.1915C6.59642 15.2745 6.62044 15.3559 6.66581 15.4254C6.71118 15.495 6.77591 15.5498 6.85203 15.583C7.67603 15.9315 8.56162 16.1109 9.45628 16.1106C12.5456 16.1106 13.9244 14.1872 13.9244 12.2894C13.9159 9.99999 12.2222 9.02978 10.7414 8.45957Z" fill="black" />
                                <path d="M18.5106 0H1.48936C1.09436 0 0.715533 0.156914 0.436224 0.436224C0.156914 0.715533 0 1.09436 0 1.48936V18.5106C0 18.9056 0.156914 19.2845 0.436224 19.5638C0.715533 19.8431 1.09436 20 1.48936 20H18.5106C18.9056 20 19.2845 19.8431 19.5638 19.5638C19.8431 19.2845 20 18.9056 20 18.5106V1.48936C20 1.09436 19.8431 0.715533 19.5638 0.436224C19.2845 0.156914 18.9056 0 18.5106 0ZM18.7234 18.5106C18.7234 18.5671 18.701 18.6212 18.6611 18.6611C18.6212 18.701 18.5671 18.7234 18.5106 18.7234H1.48936C1.43293 18.7234 1.37881 18.701 1.33891 18.6611C1.29901 18.6212 1.2766 18.5671 1.2766 18.5106V1.48936C1.2766 1.43293 1.29901 1.37881 1.33891 1.33891C1.37881 1.29901 1.43293 1.2766 1.48936 1.2766H18.5106C18.5671 1.2766 18.6212 1.29901 18.6611 1.33891C18.701 1.37881 18.7234 1.43293 18.7234 1.48936V18.5106Z" fill="black" />
                            </svg>

                        </div>
                        <div className='mt-1 text-color-000'>
                            <h6>Stripe settings</h6>
                        </div>
                    </div>

                    <div className="row mt-3 mx-2 heading-14">
                        <div className="col-6 ">
                            <h6 className='size-1'>Active</h6>
                            <select class="form-select form-select-md form-focus-input input-border-color  " aria-label="Small select example">
                                <option selected >No</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-6 ">
                            <h6 className='size-1'>Active</h6>
                            <select class="form-select form-select-md form-focus-input input-border-color  " aria-label="Small select example">
                                <option selected >Sandbox</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                    </div>

                    <div className="row mt-2 mx-2 heading-14">
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Test Public Key</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="pk_test_xxxxxxxxxxxxx" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Test Sectect Key</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="sk_test_xxxxxxxxxxxxxx" />
                            </div>
                        </div>
                    </div>

                    <div className="row  mx-2 heading-14" >
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Live Public Key</label>
                                <input type="email" class="form-control form-focus-input form-select-md  $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px' }} id="exampleFormControlInput1" placeholder="pk_live_xxxxxxxxxxxxxx" />
                                <button type="button" class="btn btn-secondary mt-3 button-bg-color" >Update Stripe</button>

                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Live Secrect Key</label>
                                <input type="email" class="form-control form-focus-input  form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px' }} id="exampleFormControlInput1" placeholder="sk_live_xxxxxxxxxxxxxx" />
                            </div>
                        </div>
                    </div>

                    <div className='d-flex gap-2 header-1  mx-3 '>
                        <div className="input-icon ps-2" style={{ marginTop: '2.5px' }}>
                            {/* <img src="./images/Group.svg" alt="" /> */}
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.99161 20.0063C4.43737 20.0304 -0.129625 15.4072 0.00280959 9.76466C0.127218 4.38701 4.57783 -0.0595935 10.116 0.000604118C15.606 0.0567886 20.1449 4.6278 19.9965 10.2783C19.856 15.6319 15.4415 20.0304 9.99161 20.0063ZM18.7805 10.0014C18.7403 4.97293 14.671 1.10423 9.87121 1.17647C5.19185 1.24469 1.2188 5.05721 1.22683 10.0175C1.23485 15.05 5.33632 18.9107 10.1401 18.8344C14.8074 18.7622 18.7443 14.9537 18.7805 10.0014Z" fill="black" />
                                <path d="M16.6131 12.0923C16.6131 11.4984 16.6131 10.9365 16.6131 10.3747C16.6131 9.95329 16.6131 9.5319 16.6131 9.11052C16.6131 8.9219 16.5088 8.83361 16.3282 8.81756C16.1556 8.8015 16.0353 8.89782 16.0031 9.0744C15.9911 9.13861 15.9951 9.20684 15.9951 9.27506C15.9951 10.0175 15.9951 10.7599 15.9951 11.5024C15.9951 11.9117 15.8185 12.0923 15.4132 12.0923C15.2607 12.0923 15.1082 12.0923 14.9356 12.0923C14.9316 12 14.9236 11.9238 14.9236 11.8475C14.9236 10.9566 14.9276 10.0697 14.9156 9.17874C14.9156 9.07039 14.8514 8.92591 14.7671 8.8617C14.6989 8.81354 14.5223 8.82157 14.4581 8.87776C14.3738 8.95401 14.3136 9.10249 14.3096 9.21888C14.2975 9.97335 14.3016 10.7318 14.3016 11.4863C14.3016 11.9238 14.133 12.0923 13.6956 12.0923C13.5511 12.0923 13.4026 12.0923 13.2461 12.0923C13.2461 10.6837 13.2461 9.29914 13.2461 7.90255C13.5952 7.90255 13.9364 7.90255 14.2855 7.90255C14.2935 7.98282 14.3016 8.05907 14.3136 8.18749C14.5464 7.93867 14.7992 7.7942 15.1202 7.81828C15.4252 7.84236 15.7022 7.92262 15.8787 8.22762C15.9349 8.17946 15.9871 8.14334 16.0353 8.0992C16.3362 7.80222 16.6854 7.74203 17.0666 7.89453C17.4599 8.05104 17.6646 8.35203 17.6766 8.77743C17.6847 9.15065 17.6766 9.52789 17.6807 9.90111C17.6807 10.4509 17.6807 10.9967 17.6807 11.5465C17.6807 11.9037 17.492 12.0883 17.1349 12.0923C16.9703 12.0923 16.8018 12.0923 16.6131 12.0923Z" fill="black" />
                                <path d="M5.34775 7.90254C5.40795 7.89451 5.44407 7.88649 5.4842 7.88649C5.95374 7.88649 6.41927 7.88248 6.88881 7.88649C7.24598 7.8905 7.50283 8.13531 7.50283 8.48846C7.51085 9.42353 7.51487 10.3586 7.50283 11.2937C7.4948 11.7953 7.18579 12.0803 6.68815 12.0843C6.41927 12.0883 6.1544 12.0883 5.88552 12.0843C5.3638 12.0722 5.01466 11.7552 4.97854 11.2335C4.95446 10.8883 4.95847 10.5392 4.97051 10.1941C4.99058 9.63623 5.37183 9.27103 5.93367 9.25097C6.06611 9.24696 6.20256 9.25097 6.33499 9.25097C6.47545 9.25097 6.5196 9.16669 6.5196 9.04228C6.5196 8.91386 6.45137 8.8657 6.32697 8.86972C6.17446 8.87373 6.01795 8.87373 5.86545 8.86972C5.55242 8.85768 5.35578 8.65702 5.34775 8.348C5.34374 8.20353 5.34775 8.05906 5.34775 7.90254ZM6.50756 11.1091C6.50756 10.784 6.50756 10.479 6.50756 10.162C6.31493 10.186 6.0621 10.0656 5.99387 10.2783C5.92565 10.4991 5.92163 10.78 5.99788 10.9967C6.07012 11.1893 6.32295 11.101 6.50756 11.1091Z" fill="black" />
                                <path d="M7.83822 7.8905C8.13921 7.8905 8.41211 7.8905 8.685 7.8905C8.71711 7.8905 8.74922 7.89853 8.80139 7.90656C8.80139 8.21958 8.80139 8.52458 8.80139 8.82959C8.80139 9.02222 8.79737 9.21886 8.80139 9.4115C8.8054 9.64426 8.90573 9.75262 9.10238 9.75262C9.29501 9.7486 9.3833 9.64827 9.3833 9.41952C9.38731 8.99011 9.3833 8.56472 9.3833 8.13531C9.3833 8.06307 9.3833 7.99083 9.3833 7.90656C9.71639 7.90656 10.0254 7.90656 10.3465 7.90656C10.3505 7.97077 10.3585 8.03096 10.3585 8.08715C10.3585 9.07038 10.3665 10.0536 10.3545 11.0368C10.3505 11.2455 10.3023 11.4662 10.214 11.6508C10.0696 11.9599 9.76856 12.0682 9.45152 12.0843C9.0502 12.1003 8.64889 12.0883 8.23553 12.0883C8.23553 11.8796 8.21145 11.6749 8.24356 11.4743C8.27566 11.2616 8.47231 11.1291 8.69704 11.1211C8.84955 11.1131 9.00606 11.1171 9.15856 11.1211C9.30303 11.1251 9.39132 11.073 9.38731 10.9124C9.3833 10.7639 9.29501 10.7358 9.16257 10.7238C8.8977 10.7037 8.62481 10.6957 8.38 10.6195C8.05494 10.5151 7.8623 10.2382 7.85026 9.9011C7.81816 9.23492 7.83822 8.57676 7.83822 7.8905Z" fill="black" />
                                <path d="M3.18287 11.101C3.11866 11.4261 3.2832 11.8033 2.95814 11.9799C2.74945 12.0963 2.46452 12.0803 2.19563 12.1284C2.18761 12.004 2.18359 11.9398 2.18359 11.8716C2.18359 10.8362 2.18359 9.80077 2.18359 8.76537C2.18359 8.18346 2.47656 7.88649 3.05445 7.88247C3.31531 7.88247 3.57617 7.87445 3.83702 7.88247C4.35874 7.89853 4.71992 8.24767 4.73196 8.76939C4.744 9.25097 4.744 9.73255 4.73196 10.2141C4.71992 10.7158 4.40288 11.0529 3.90123 11.093C3.66847 11.1171 3.43571 11.101 3.18287 11.101ZM3.17485 10.1258C3.3113 10.1258 3.42768 10.1339 3.54005 10.1218C3.66446 10.1098 3.75275 10.0496 3.74873 9.9011C3.74472 9.62821 3.76077 9.3513 3.74071 9.0784C3.73669 9.00616 3.64038 8.90583 3.56413 8.88577C3.44373 8.85366 3.30728 8.87774 3.17485 8.87774C3.17485 9.30715 3.17485 9.70847 3.17485 10.1258Z" fill="black" />
                                <path d="M12.3483 7.12803C12.3483 7.36882 12.3483 7.61362 12.3483 7.87849C12.545 7.87849 12.7215 7.87849 12.9182 7.87849C12.9182 8.2156 12.9182 8.53264 12.9182 8.86975C12.7416 8.86975 12.565 8.86975 12.3604 8.86975C12.3604 9.94929 12.3604 11.0048 12.3604 12.0803C12.1436 12.0803 11.947 12.1044 11.7624 12.0763C11.4855 12.0321 11.2648 11.8275 11.2728 11.4743C11.2888 10.6917 11.2768 9.90916 11.2768 9.12659C11.2768 9.05435 11.2768 8.98211 11.2768 8.88981C11.0842 8.88981 10.9076 8.88981 10.7109 8.88981C10.7109 8.5527 10.7109 8.23968 10.7109 7.9106C10.7551 7.90257 10.7992 7.89454 10.8434 7.89053C11.2206 7.87849 11.5216 7.71796 11.7544 7.42099C11.943 7.17217 12.0834 7.11197 12.3483 7.12803Z" fill="black" />
                                <path d="M6.50878 11.1091C6.32417 11.1011 6.07134 11.1894 5.99911 10.9967C5.92286 10.78 5.92286 10.4991 5.99509 10.2784C6.06332 10.0617 6.31615 10.182 6.50878 10.162C6.50878 10.479 6.50878 10.78 6.50878 11.1091Z" fill="white" />
                                <path d="M3.17188 10.1259C3.17188 9.70849 3.17188 9.30717 3.17188 8.88178C3.3003 8.88178 3.43674 8.8577 3.56115 8.8898C3.63339 8.90987 3.72971 9.0102 3.73773 9.08244C3.7578 9.35533 3.74175 9.62823 3.74576 9.90514C3.74977 10.0496 3.66148 10.1098 3.53707 10.1259C3.42471 10.1339 3.31234 10.1259 3.17188 10.1259Z" fill="white" />
                            </svg>

                        </div>
                        <div className='mt-1'>
                            <h6>Paytm settings</h6>
                        </div>
                    </div>

                    <div className="row mt-3 mx-2 heading-14">
                        <div className="col-6 ">
                            <h6 className='size-1 text-color-000'>Active</h6>
                            <select class="form-select form-focus-input form-select-md input-border-color " aria-label="Small select example">
                                <option selected >No</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className="col-6 ">
                            <h6 className='size-1 text-color-000'>Active</h6>
                            <select class="form-select form-focus-input form-select-md input-border-color " aria-label="Small select example">
                                <option selected >Test</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>

                    </div>

                    <div className="row mt-2 mx-2 heading-14">
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Test Merchant Id</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="tm_id_xxxxxxxxxxxx" />
                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Test Merchant Key</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="tm_key_xxxxxxxxxx" />
                            </div>
                        </div>
                    </div>

                    <div className="row  mx-2 heading-14" >
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Live Merchant Id</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="tm_id_xxxxxxxxxxxx" />
                                {/* <button type="button" class="btn btn-secondary mt-3" style={{backgroundColor:'#008479'}}>Update Stripe</button> */}

                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label text-color-000">Live Merchant Key</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="Live Merchant Key" />
                            </div>
                        </div>
                    </div>

                    <div className="row  mx-2 heading-14" >
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Environment</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="provide-a-environment" />

                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Merchant_Website</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="merchant-website" />
                            </div>
                        </div>
                    </div>

                    <div className="row  mx-2 heading-14" >
                        <div className="col-6 ">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Channel</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="provide-channel-type" />
                                <button type="button" class="btn btn-secondary mt-3 button-bg-color" >Update Paytm</button>

                            </div>
                        </div>
                        <div className="col-6">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label">Industry_type</label>
                                <input type="email" class="form-control form-focus-input form-select-md $input-btn-padding-y-sm input-border-color grey-input-text-color" style={{ borderRadius: '5px', fontSize: '13px' }} id="exampleFormControlInput1" placeholder="provide-industry-type" />
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </Container>
    )
}

export default PaymentSetting
