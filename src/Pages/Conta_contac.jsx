import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserContactGetAllApi } from '../Utils/Apis'
import { Conatct_conat_ById } from '../Utils/Apis'
import { Conatct_conat_PutApi } from '../Utils/Apis'

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
    /* height: 100vh; */
    border-radius: 15px;

}
.margin-minus22{
    margin-top: -18px;
    font-size: 16px;
}
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 1px 18px 1px 18px;
    border-radius: 18px 18px 18px 18px;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid var(--tableActionButtonBgColor)  !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
}
.form-focus:focus {
    color: #212529 !important;
    background-color: #fff !important;
    border-color: var(--greyInputborderColor) !important;
    outline: none !important;
    box-shadow: none !important;
}
.page-link-1122 {
    /* padding: 0.00175rem 0.05rem; */
    padding: 0rem 0rem;
}
.pagination-a a{
  gap: 2px;
}
.my-pagina li a:hover{
  background-color: #008479;
  color: #fff;
  border: none;
}
.input-bg{
  background-color: #F2F3F6 !important;
}
.label-color{
  color: #bbbec1;
}
.cont-drop-btn button:hover{
  background-color: transparent;
  color: #000;
  cursor: pointer;
  border: none;
}


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}

.my-button11 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button11 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-button22{
    display: flex;
    gap: 4px;
    margin-top: 4px;
}

.my-button22 button{
    border-radius: 5px;
  border: 1px solid #ababad;
  color: #000;
font-size: 12px;
}
.my-button22 button:hover{
    background-color: #008479;
    color: #fff;
}
.my-grey{
  color: #ADADBD;
}

.my-div-class p{
  border: 1px solid #ADADBD;
  padding: 10px;
  border-radius: 4px;
  background-color: #F2F3F6;
  color: #ADADBD;
  border: 1px solid #F2F3F6;
}
.my-div-class span a{
    text-decoration: none;
}
.anchor-color a{
  color: #8F8F8F;
}
.my-own-button{
  height: 33px;
  background-color: var(  --greenTextColor);
  line-height: 18px;
}
.my-own-outline-btn{
  height: 33px;
  line-height: 0px;
  color: #000;
  border: 1px solid var( --buttonBorder);
  background-color: #fff;
}

.img-div img{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 1px solid #b9b8b8;

}
/* ############# offcanvas ############## */
.forInput {
    background : #F2F3F6;
    color:  #ADADBD;
    /* font-family: 'Noto Sans'; */
    font-size: 14px;
  }
  .forInput::placeholder{
    color: #ADADBD;
  }

  .forInputFont{
    font-size: 14px;
  }
    .forLabel {
    color:  #ADADBD;
    font-size: 15px;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }

  .img-container{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    top: -16%;
  }
  .img-container22{
    position: absolute;
    height: 60px;
    width: 60px;
    border-radius: 50%;
    background-color: #2BB673;
    border: 2px solid #cdcdcd;
    top: -16%;
  }
  .img-container img{
    height: 30px;
    width: 36px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container22 img{
    height: 27px;
    width: 32px;
    margin: 11px;
    margin-top: 14px;
  }
  .img-container{

  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #F2F3F6;
  }
  .delete-section {
    /* height: 30%; */
    position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  }
  .button-position{
    position: absolute;
    top: 78%;
  }
  .main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 1px solid #F1F5FA;
  }
  .image-container img{
    width: 100%;
    height: 100%;
  }
  .delete-content{
    font-size: 20px;
  }
  .delete-content span{
    background-color: #0AAD24;
    color: #fff;
    font-size: 15px;
    padding: 2px 6px 2px 6px;
    border-radius: 4px;
  }
  .likeButton{
    background-color: #008479;
    color: #fff;
    font-size: 17px;
    padding: 2px 8px 2px 8px;
    border-radius: 4px;
    display: inline;
  }

.view-details-background-color{
    background-color: var(--backgroundColor);
  }

  .symbol-container img{
    object-fit: cover;
  }
  .subject{
    font-size: 14px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .sure-content h5{
    font-weight: 200;
  }
  .sure-content p{
    font-size: 14px;
    color: #ADADBD;
  }
  .agree{
    font-size: 14px;
    color: #ADADBD;
  }
  .buttons-topss{
    margin-top: -35px;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .bg-color-pink{
    border: 1px dashed #EECEBE;
    background: #FFF9F6;
  }
  .my-non-clickable button{
    border-radius: 5px;
    border: 1px solid #ECEBF3;
    background: #FFF;
    color: #000;
  }
  .my-form-check-input123:checked {
    background-color: var( --greenTextColor);
    border-color: var( --greenTextColor);
  }
  .my-error-border{
    border: 1px solid red !important;
  }
/* ############# offcanvas ############## */

/* ########## media query ###########  */
 @media only screen and (max-width: 950px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 605px) {
  .for-media-query-22{
    flex: 0 0 auto !important;
    width: 53% !important;
  }
  .my-own-button{
    margin-top: 5px;
    margin-bottom: 25px;
  }
  .search-responsive{
    margin-top: 10px;
  }
  .export1{
    margin-top: 8px !important;
  }
  .export2{
    margin-top: 12px !important;
  }
}

@media only screen and (max-width: 605px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
`;
// ## style css area end ####  

const Conta_contac = ({ data }) => {

  const { transferId, myUserId } = data;

  const staffId = transferId;
  const userId = myUserId;
  const MyUserID = localStorage.getItem('MyUserID');


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



  const [departmnt, setDepartmnt] = useState()
  const [designation, setDesignation] = useState()

  const [LeaveCate, setLeaveCate] = useState()

  const [lastName, setLastName] = useState()
  const [status, setStatus] = useState()
  console.log('true false', status)

  const [updateStatus, setUpdateStatus] = useState()
  const [contractStart, setContractStart] = useState()
  const [contractEnd, setContractEnd] = useState()
  const [basicSalary, setBasicSalary] = useState()
  const [hourlyRate, setHourlyRate] = useState()
  const [payslip, setPayslip] = useState()
  const [officeShift, setOfficeShift] = useState()
  const [errorBorder, setErrorBorder] = useState(false)
  const [originalMail, setOriginalMail] = useState();

  const [isValidContractStartRequired, setIsValidContractStartRequired] = useState(false);
  const [isValidContractEndRequired, setIsValidContractEndRequired] = useState(false);
  const [isValidBasicSalaryRequired, setIsValidBasicSalaryRequired] = useState(false);
  const [isValidHourlyRateRequired, setIsValidHourlyRateRequired] = useState(false);
  const [isValidPayslipRequired, setIsValidPayslipRequired] = useState(false);
  const [isValidOfficeShiftRequired, setIsValidOfficeShiftRequired] = useState(false);
  const [isValidDepartmentRequired, setIsValidDepartmentRequired] = useState(false);
  const [isValidDesignationRequired, setIsValidDesignationRequired] = useState(false);

  // ###### validation ##########
  const [errors, setErrors] = useState({});


  const FuncValidation = () => {
    let isValid = true;

    // start date
    if (!contractStart || contractStart === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(contractStart)) {
      setIsValidContractStartRequired(true)
      setErrorBorder(true)
      setLoader(false)
      isValid = false
    }
    else {
      setErrorBorder(false)
    }
    // end date 
    if (!contractEnd || contractEnd === "" || !/^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(contractEnd )) {
      setIsValidContractEndRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    // department 
    if (!departmnt || departmnt === "" || !/^[A-Za-z\s]+$/.test(departmnt)) {
      setIsValidDepartmentRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    // designation 
    if (!departmnt || departmnt === "" ||  !/^[A-Za-z\s]+$/.test(departmnt) ) {
      setIsValidDesignationRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    // basic salary 
    if (!basicSalary || basicSalary === "" || !/^\d{5}(-\d{4})?$/.test(basicSalary)) {
      setIsValidBasicSalaryRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    // hourlyRate
    if (!hourlyRate || hourlyRate === "" || !/^\d{4}(-\d{8})?$/.test(hourlyRate)) {
      setIsValidHourlyRateRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    // payslip
    if (!payslip || payslip === "" || !/^[A-Za-z\s]+$/.test(payslip)) {
      setIsValidPayslipRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    // officeShift
    if (!officeShift || officeShift === "" ||  !/^[A-Za-z\s]+$/.test(officeShift)) {
      setIsValidOfficeShiftRequired(true)
      setLoader(false)
      isValid = false
    }
    else {
    }
    return isValid;
  }


  // start date 
  const handleStartDate = (e2) => {
    setContractStart(e2)
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    setIsValidContractStartRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidContractStartRequired(true)
      setErrorBorder(true)
    } else {
      setIsValidContractStartRequired(false)
      setErrorBorder(false)
    }
  }
  // end date 
  const handleEndDate = (e2) => {
    setContractEnd(e2)
    const dateRegex = /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;
    setIsValidContractEndRequired(dateRegex.test(e2));
    if (e2 === "") {
      setIsValidContractEndRequired(true)
    } else {
      setIsValidContractEndRequired(false)
    }
  }
  // department 
  const handleDepartment = (e2) => {
    setDepartmnt(e2)
    const dateRegex = /^[A-Za-z\s]+$/;
    setIsValidDepartmentRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidDepartmentRequired(true)
    } else {
      setIsValidDepartmentRequired(false)
    }
  }
  // designation 
  const handleDesignation = (e2) => {
    setDesignation(e2)
    const dateRegex = /^[A-Za-z\s]+$/;
    setIsValidDesignationRequired(dateRegex.test(e2));
    if (e2 === "" || !dateRegex.test(e2)) {
      setIsValidDesignationRequired(true)
    } else {
      setIsValidDesignationRequired(false)
    }
  }
  // basicSalary
  const handleBasicSalary = (e2) => {
    setBasicSalary(e2)
    const noRegex = /^\d{5}(-\d{4})?$/;
    setIsValidBasicSalaryRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidBasicSalaryRequired(true)
    } else {
      setIsValidBasicSalaryRequired(false)
    }
  }
  // hourlyRate 
  const handlehourHyRate = (e2) => {
    setHourlyRate(e2)
    const noRegex = /^\d{4}(-\d{8})?$/;
    setIsValidHourlyRateRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidHourlyRateRequired(true)
    } else {
      setIsValidHourlyRateRequired(false)
    }
  }
  // payslip 
  const handlePayslip = (e2) => {
    setPayslip(e2)
    const noRegex = /^[A-Za-z\s]+$/;
    setIsValidPayslipRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidPayslipRequired(true)
    } else {
      setIsValidPayslipRequired(false)
    }
  }
  // officeShift 
  const handleOfficeShift = (e2) => {
    setOfficeShift(e2);
    const nameRegex = /^[A-Za-z]+$/;
    setIsValidOfficeShiftRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidOfficeShiftRequired(true)
    } else {
      setIsValidOfficeShiftRequired(false)
    }
  }


  // ###### validation ##########



  // User post Api 
  const ContactDataApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('contactDate', contractStart);
      formData.append('basicSalary', basicSalary);
      formData.append('hourlyRate', hourlyRate);
      formData.append('contractEnd', contractEnd);
      formData.append('paySlipType', payslip);
      formData.append('shift', officeShift);

      setLoader(true)
      try {
        const response = await UserContactGetAllApi(MyUserID, formData);
        console.log('my staff post api response', response)
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
  const MyStaffGetById = async (id) => {
    setIdForUpdate(id);
    setLoader(true);
    try {
      const response = await Conatct_conat_ById(userId);
      console.log("my contact conatct number get by id ", response);
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setUpdateStatus(response?.data?.status);
        setContractStart(response?.data?.contact?.contractStart);
        setContractEnd(response?.data?.contact?.contractEnd);
        setBasicSalary(response?.data?.contact?.basicSalary);
        setHourlyRate(response?.data?.contact?.hoursRate);
        setOriginalMail(response?.data?.user?.staffEmail);
        setPayslip(response?.data?.contact?.paySlip);
        setOfficeShift(response?.data?.contact?.shift);

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
 
      formData.append('contactDate', contractStart);
      formData.append('basicSalary', basicSalary);
      formData.append('hourlyRate', hourlyRate);
      formData.append('contractEnd', contractEnd);
      formData.append('paySlipType', payslip);
      formData.append('shift', officeShift);
      setLoader(true);

      try {
        const response = await Conatct_conat_PutApi(myUserId, formData);
        console.log("My conatct in conatct put api 000000", response);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShow(false);
          setLoader(false);
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
    <Container>
      <div className="container-fluid pt-2">
        <div className="row p-3 pb-0">
          <div className="col-lg-4 col-md-4 col-sm-12  ">
            <div className="mb-3 pe-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contract Date</label>

              <input type="date" className={`form-control form-focus-input  form-control-sm heading-14 grey-input-text-color input-border-color `} value={contractStart} onChange={(e) => handleStartDate(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="24-02-2024" />
              {/* ${errorBorder ? '   my-error-border' : ''} */}
            </div>
            <div className='pt-1'>
              {isValidContractStartRequired && (
                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                  Valid date is required
                </p>
              )}
            </div>
            <div className="mb-3 pe-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Basic Salary</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={basicSalary} onChange={(e) => handleBasicSalary(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Amout" />
            </div>
            <div className='pt-1'>
              {isValidBasicSalaryRequired && (
                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                  Valid salary is required
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12  ">
            <div className="mb-3 pe-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Department</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={departmnt} onChange={(e) => handleDepartment(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="department" />
            </div>
            {isValidDepartmentRequired && (
              <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                Valid department is required
              </p>
            )}

            <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Hourly Rate</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={hourlyRate} onChange={(e) => handlehourHyRate(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Amount" />
            </div>
            <div className='pt-1'>
              {isValidHourlyRateRequired && (
                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                  Valid hourly rate is required
                </p>
              )}
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-12">
            <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Designation</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={designation} onChange={(e) => handleDesignation(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="designation" />
            </div>
            {isValidDesignationRequired && (
              <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                Valid designation is required
              </p>
            )}
            <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Payslip Type</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={payslip} onChange={(e) => handlePayslip(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="write oayslip name" />
            </div>
            <div className='pt-1'>
              {isValidPayslipRequired && (
                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                  Valid payslip is required
                </p>
              )}
            </div>


          </div>
        </div>
        <div className="row px-3">
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="mb-3 pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Office Shift</label>
              <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={officeShift} onChange={(e) => handleOfficeShift(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="write shift" />
            </div>
            <div className='pt-1'>
              {isValidOfficeShiftRequired && (
                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                  Valid shift is required
                </p>
              )}
            </div>
            <label for="exampleFormControlInput1" class="form-label mb-1 label-text-color focus heading-14 label-color">Leave Categories </label>

            <form class="form-floating">
              <input type="email" class="form-control" id="floatingInputValue" onChange={(e) => setLeaveCate(e)} placeholder="" />
            </form>

            <p className='label-color heading-14'>If All is selected, then all leave categories will show to employee which are
              added in the system.</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 ">
            <div className="mb-3  pt- for-media-margin">
              <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Contract End</label>
              <input type="date" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={contractEnd} onChange={(e) => handleEndDate(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Date of Leaving" />
            </div>
            <div className='pt-1'>
              {isValidContractEndRequired && (
                <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                  Valid date is required
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="row mt-2 buttons-topss">
          <div className='my-button11 heading-16'>
            {updateStatus === "success"
              ?
              <button type="button" class="btn btn-outline-success my-green" onClick={ContactDataApi}>Update Contract</button>
              :
              <button type="button" class="btn btn-outline-success my-green" onClick={ContactDataApi}>Submit Contract</button>

            }
            <button type="button" class="btn btn-outline-success">Cancel</button>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Conta_contac
