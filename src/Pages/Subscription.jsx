import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
// import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { GetApi } from '../Utils/Apis'
import { SubscriptionDeleteApi } from '../Utils/Apis'
import { SubscriptionGetByIdApi } from '../Utils/Apis'
import { SubscriptionPutApi } from '../Utils/Apis'
import { PlanGetApi } from '../Utils/Apis'
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';
import { valueOrDefault } from 'chart.js/helpers';
import { Icon } from '@iconify/react/dist/iconify.js';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
// import HashLoader from './HashLoader';
import DataLoader from '../Layouts/Loader';
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
    border-radius: 5px;

}
/* .margin-minus22{
    margin-top: -18px;
    font-size: 16px;
} */
th, td{
  padding: 10px;
}
.my-td-style-yellow span{
  background-color: #FFEED3;
    color: #FF914C;
    padding: 3px 12px 3px 12px;
    border-radius: 15%;
}
.my-td-style-green span{
  background-color:#E6FFE2;
  color: #00A67E;
  padding: 3px 12px 3px 12px;
  border-radius: 15%;
}
.my-button-drop{
  line-height: 13px !important;
  border: 1px solid #D9D9D9 !important;

}
.pagination-a{
  background-color: #f2f0f0;
  color: #000;
  padding: 0.00175rem 0.25rem;
  margin-left: 0px !important;
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
  background-color: #F2F3F6;
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
    background-color: #ffffff;
    color: #000;
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
.font-red{
    color: #C90303;

}
.font-green{
    color: #00A67E;
}
.anchor-color a{
  color: #8F8F8F;
}
.for-margin-top{
    margin-top: -18px;
    margin-left: 15px;
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
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
  }
  .color{
    background-color:#B50000 !important ;
    color: #fff !important;
  }
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #008479;
    border-radius: 0%;
  }
  .button112233{
    background-color: #008479 !important;
    border: 1px solid #008479;
    color: #fff;
    border-radius: 0;
    
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
  .statusBgActive{
   color: #00A67E;
  }
  .statusBgDeActive{
   color: #C90303;
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
  .my-123-form-check-input:checked {
    background-color: #B50000;
    border-color: #B50000;
}
.pagination {
    display: flex;
    list-style: none;
    padding: 0;
}

.pagination li {
    margin: 0 5px;
}

.pagination li a {
    box-shadow: none !important;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    font-size: var(--font-size-14);
    border-radius: 8px;
    border: 1px solid #ddd;
    text-decoration: none;
    color: #000;
    /* background-color: #f5f5f5;
    transition: background-color 0.3s; */
}

.pagination li a:hover {
    background-color: #317a77 !important;
    color: #fff !important;
}

.pagination li.active a {
    background-color: #317a77 !important;
    color: #fff;
    font-weight: bold;
}
.my-red-tick:checked {
    background-color: #B50000 ;
    border-color: #B50000 ;
    box-shadow: none !important;
}
.my-red-tick {
    box-shadow: none !important;
    border:0.2px solid #aaa !important;
}
/* ########## media query ###########  */
 @media only screen and (max-width: 735px) {
  .for-media-query{
    display: flex;
    flex-direction: column;
  }
}
@media only screen and (max-width: 860px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }
}
`;
// ## style css area end ####  


const Subscription = () => {

  // const navigate = useNavigate();

  const [putdata, setPutdata] = useState([])

  const [loader, setLoader] = useState(false)

  const [hidedelete, setHidedelete] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [deleteid, setDeleteid] = useState()
  const [putid, setPutid] = useState()
  const [putemail, setPutemail] = useState()
  const [putstatus, setPutstatus] = useState()
  const [putstate, setPutstate] = useState()
  const [putpackage, setPutpackage] = useState()
  const [plandata, setPlandata] = useState([])
  const [data, setData] = useState([])
  const [offcanvasclose, setOffcanvasClose] = useState(false)

  const [successUpdateState, setSuccessUpdateState] = useState(false)
  const [updateState, setUpdateState] = useState(true)

  const [confirmation, setConfirmation] = useState(true)


  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1);
  };

  // ##### validation states ########## 
  const [putphoneNo, setPutphoneNo] = useState()
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordRequired, setIsValidPasswordRequired] = useState(true);

  const [inputValues, setInputValue] = useState({
    putphoneNo: ''
  });

  const [validation, setValidation] = useState({
    putphoneNo: ''
  });

  // Validation states start

  const [errors, setErrors] = useState({});
  const [refresh, setRefresh] = useState(false);
  //  Date range 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // console.log('my both date1 =', startDate)
  // console.log('my both date2 =', endDate)

  const handleDateChange = (dates) => {
    setStartDate(formatDate(dates[0] == null ? '' : dates[0]));
    setEndDate(formatDate(dates[1] == null ? '' : dates[1]))
    console.log('hello date ')
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {
    showName()
    Getallplan()
  }, [pageNo, refresh]);

  const ClearBothDate = () => {
    setStartDate('')
    setEndDate('')
    showName()
  }


  // Get All 
  const showName = async () => {
    setLoader(true)
    try {
      const response = await GetApi(searchKey, pageNo, pageSize, startDate, endDate);
      console.log('subscription-get-all-api', response);
      if (response?.status === 200) {
        // toast.success(response?.data?.message);
        setLoader(false)
        setData(response.data.subscriptions)
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Delete api

  // const SubsDeleteApi = async (id) => {
  //   try {
  //     const response = await SubscriptionDeleteApi(id);
  //     if (response?.status === 200) {
  //       setHidedelete(true)
  //       setShowdelete(false)
  //       toast.success(response?.data?.msg);
  //       showName()
  //     } else {
  //       toast.error(response?.data?.msg);
  //     }

  //   } catch (error) {
  //     console.log('catch')
  //   }
  // }

  // Get by id 

  const GetByIdApi = async (id) => {
    setPutstate(id)
    try {
      const response = await SubscriptionGetByIdApi(id);
      console.log('my-get-by-id-data-subdcription', response)
      setPutphoneNo(response.data.subscription.phoneNo)
      setPutstatus(response.data.subscription.status)
      setPutpackage(response.data.subscription.plan)
      setPutid(response.data.subscription.subsId)
      setPutemail(response.data.subscription.email)

      const newDate = new Date(response.data.subscription.purchaseDate).toISOString().slice(0, 10);
      setMynewdate(newDate)

      if (response?.status === 'success') {

        toast.success(response?.data?.msg);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log('catch')
    }
  }

  // ###### validation ##########
  const FuncValidation = () => {
    let errors = validation;
    if (!inputValues.putphoneNo.trim()) {
      errors.putphoneNo = 'Number is required';
    }
    else {
      errors.putphoneNo = '';
    }
    // if(isValidPasswordRequired === 'Number is required'){
    //   setIsValidPassword('')
    // }
    // let userContact = errors.putphoneNo; 

    setIsValidPasswordRequired(errors.putphoneNo)
    return errors;
  }

  const handlephone = (e2) => {
    setPutphoneNo(e2);
    // setIsValidPasswordRequired('') 
    const phonedRegex = /^\+?(91)?([6-9]{1})([0-9]{9})$/;
    setIsValidPassword(phonedRegex.test(e2));
  }
  // ###### validation  end##########

  // handler for status option 
  const handleStatusChange = (value) => {
    setPutstatus(value);
  };

  const offcanvasRef = useRef(null);

  // Put Apii
  const SubcPutDataApi = async (id) => {
    console.log('id for request update',id)
    if (putphoneNo === '') {
      FuncValidation();
    }
    if (!isValidPassword === false) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('planId', putpackage)
        // formData.append('email', putemail)
        formData.append('phone', putphoneNo)
        formData.append('status', putstatus)

        const response = await SubscriptionPutApi(id, formData);
        console.log(' put subscription response', response)
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setUpdateState(false)
          setLoader(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
          offcanvasInstance.hide();
          console.log('offcanvas', offcanvasRef)
          setSuccessUpdateState(true)
          showName()

          setTimeout(() => {
            showName()
            setUpdateState(true);
          }, 1000)
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error)
      }
      setOffcanvasClose(true);
    }
  }
  const HandleState = () => {
    setUpdateState(true)
    setSuccessUpdateState(false)
  }
  // Get All from  plan module
  const Getallplan = async () => {
    setLoader(true)
    try {
      const response = await PlanGetApi();
      console.log('addPlan-1111', response)
      if (response?.status === 200) {
        // toast.success(data?.msg);
        setLoader(false)
        setPlandata(response?.data?.plans)
      } else {
      }
    } catch (error) {
      console.log(error)
    }
    // console.log('my-dataset',data)
  }

  const showName123 = () => {
    showName()
    //  setSearchKey('')
  }

  // const formatDate = (date) => {
  //   if (!date) return null;
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate() + 0;

  //   if (month < 10) {
  //     return '0' + month; 
  //   } else if(day < 10){
  //     return '0' + day; 
  //   } else {
  //     return `${year} ${month.toString()} ${day.toString()}`; 
  //   }
  // };

  // return `${year}-${month}-${day}`;

  return (
    <Container>
       {
        loader && (
          <DataLoader />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>

          <div className="breadCrum ps-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol className="breadcrumb ms-2">
                <li className="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li className="breadcrumb-item breadcrum-li heading-14" >
                  <Link to="#" onClick={showName123}>Subscriptions</Link>
                </li>
              </ol>
              {/* to='/subscriptionPage' */}
            </nav>
          </div>

          <div className='d-flex g-1 for-media-query'>
            <div className="row  me-2">
              <div className="col-9 ">
                <div className="date-picker-container">
                  <Flatpickr
                    class="form-control"
                    placeholder='Date'
                    value={[startDate, endDate]}
                    options={{
                      mode: 'range',
                      dateFormat: 'Y-n-j',
                    }}
                    onChange={handleDateChange}
                    render={({ defaultValue, ...props }, ref) => (
                      <div className="input-group d-flex">
                        <input style={{ height: '34px' }} {...props} ref={ref} defaultValue={defaultValue} />
                      </div>
                    )}
                  />
                </div>
              </div>

              <div className="col-3 p-0 ps-2" >
                <Link type="submit" className="btn btn-primary mb-3 heading-1 remove-shadow button-bg-color heading-14" style={{ border: '1px solid #008479', lineHeight: '1.2', display: 'flex' }} onClick={showName}>
                  <svg width="40" height="16" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '2px' }}>
                    <path d="M4.57143 7.42857C4.57143 7.27702 4.63163 7.13167 4.7388 7.02451C4.84596 6.91735 4.9913 6.85714 5.14286 6.85714H8.57143C8.72298 6.85714 8.86833 6.91735 8.97549 7.02451C9.08265 7.13167 9.14286 7.27702 9.14286 7.42857C9.14286 7.58012 9.08265 7.72547 8.97549 7.83263C8.86833 7.9398 8.72298 8 8.57143 8H5.14286C4.9913 8 4.84596 7.9398 4.7388 7.83263C4.63163 7.72547 4.57143 7.58012 4.57143 7.42857ZM2.28571 4C2.28571 3.84845 2.34592 3.7031 2.45308 3.59594C2.56025 3.48878 2.70559 3.42857 2.85714 3.42857H10.8571C11.0087 3.42857 11.154 3.48878 11.2612 3.59594C11.3684 3.7031 11.4286 3.84845 11.4286 4C11.4286 4.15155 11.3684 4.2969 11.2612 4.40406C11.154 4.51122 11.0087 4.57143 10.8571 4.57143H2.85714C2.70559 4.57143 2.56025 4.51122 2.45308 4.40406C2.34592 4.2969 2.28571 4.15155 2.28571 4ZM0 0.571429C0 0.419876 0.060204 0.274531 0.167368 0.167368C0.274531 0.060204 0.419876 0 0.571429 0H13.1429C13.2944 0 13.4398 0.060204 13.5469 0.167368C13.6541 0.274531 13.7143 0.419876 13.7143 0.571429C13.7143 0.722981 13.6541 0.868326 13.5469 0.975489C13.4398 1.08265 13.2944 1.14286 13.1429 1.14286H0.571429C0.419876 1.14286 0.274531 1.08265 0.167368 0.975489C0.060204 0.868326 0 0.722981 0 0.571429Z" fill="white" />
                  </svg> &nbsp;
                  <p style={{ fontSize: '15px' }}>Filter</p>
                </Link>
              </div>
            </div>

            <div className='me-2'>
              <div className="input-group mb-3 ">
                <input type="text" className="form-control form-focus input-border-color " style={{ height: '34px' }} value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" />
                <span className="input-group-text button-bg-color button-color heading-14" style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2" onClick={showName}>Search</span>
              </div>
            </div>
          </div>

        </div>
        <h5 className=' mb-3  text-color-000 heading-16 for-margin-top' >Subscriptions Report</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container px-3 table-responsive">
            <table className="table table-sm table-striped">
              <thead className='heading-16'>
                <tr className='heading-16 text-color-000' style={{ backgroundColor: '  --tableActionButtonBgColor' }}>
                  {/* <th className=''>#</th> */}
                  <th>#</th>
                  <th>Price  &nbsp; <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4 3.05556H6L9 0L12 3.05556H9.6V10.3889H8.4V3.05556ZM0 7.94444H2.3994L2.4 0.611112H3.6V7.94444H6L3 11L0 7.94444Z" fill="black" />
                  </svg>
                  </th>
                  <th>Package  &nbsp; <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4 3.05556H6L9 0L12 3.05556H9.6V10.3889H8.4V3.05556ZM0 7.94444H2.3994L2.4 0.611112H3.6V7.94444H6L3 11L0 7.94444Z" fill="black" />
                  </svg>
                  </th>
                  <th>Purchase Date  &nbsp; <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4 3.05556H6L9 0L12 3.05556H9.6V10.3889H8.4V3.05556ZM0 7.94444H2.3994L2.4 0.611112H3.6V7.94444H6L3 11L0 7.94444Z" fill="black" />
                  </svg>
                  </th>
                  <th>Email</th>
                  <th>Contact No</th>
                  <th>Status &nbsp; <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.4 3.05556H6L9 0L12 3.05556H9.6V10.3889H8.4V3.05556ZM0 7.94444H2.3994L2.4 0.611112H3.6V7.94444H6L3 11L0 7.94444Z" fill="black" />
                  </svg>
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody className='heading-14 align-middle greyTextColor greyText'>
                {
                  data?.map((item, index) => (
                    <tr key={item.id} className='my-bg-color align-middle'>

                      <td className=' greyText'>{index + 1}</td>
                      <td className=' greyText'>{item.price}</td>
                      <td className=' greyText'>{item.plan}</td>
                      <td className='greyText'>{item?.purchaseDate ? item.purchaseDate.slice(0, 10) : ''} </td>

                      <td className=' greyText'>{item.email}</td>
                      <td className=' greyText'>{item.phoneNo}</td>
                      <td className={`${item.status === true ? 'statusBgActive' : 'statusBgDeActive'}`}>{`${item.status === true ? 'Active' : 'DeActivate'}`}</td>
                      <td className=' greyText'>
                        <div className="dropdown my-button-show">
                          <button className="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul className="dropdown-menu heading-14 anchor-color heading-14" >
                            <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onClick={() => { GetByIdApi(item.subsId) }}>Edit Subscription</Link></li>
                            {/* <li><Link className="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight22" aria-controls="offcanvasRight" to={''} onClick={() => { setDeleteid(item.subsId) }}>Delete</Link></li> */}
                          </ul>
                        </div>
                      </td>
                      {/* <Toaster /> */}
                    </tr>

                  ))}
              </tbody>
              <Toaster />
            </table>

            <div className="d-flex" style={{ marginBottom: '10px' }}>
              <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
              <div className="ms-auto">
                <ReactPaginate
                  previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                  nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                  breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                  onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                />
              </div>
            </div>

          </div>


        </div>
        {/* ########################## edit offcanvas  start ################  */}

          {
            updateState && (
              <>
              <div className="offcanvas-end offcanvas" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef}>
                <div className="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" >
                    <svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                    </svg>
                  </Link>
                  <h5 className="offcanvas-title heading-16" id="offcanvasRightLabel">Subscription Edit</h5>
                </div>
                <hr className='mx-3' style={{ marginTop: '-3px' }} />

                <div class="offcanvas-body">
                  <div className="input " >
                    <div className="mb-3" style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color ">ID</label>
                      <input type="email" className="form-control form-focus input-bg label-color" value={putid} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="SCR152" disabled />
                    </div>

                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color ">Package</label>
                      <select className="form-select  form-focus" value={putpackage} onChange={(e) => setPutpackage(e.target.value)} aria-label="Default select example">
                        {/* <option selected >{putpackage}</option> */}
                        {
                          plandata.map(item => (
                            <option value={item.planId} >{item.planName}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3" style={{ marginTop: '-6px' }}>
                      <label for="exampleFormControlInput1" className="form-label label-color ">Email</label>
                      <input type="email" className="form-control form-focus input-bg label-color" value={putemail} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="xyz12@gmail.com" disabled />
                      {errors.putemail && <span style={{ color: 'red' }}>{errors.putemail}</span>}
                    </div>

                    <div style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlTextarea1" className="form-label label-color">Contact No</label>
                      <div className="input-group mb-3 cont-drop-btn">
                        <button className="btn btn-outline-secondary dropdown-toggle" style={{ border: '1px solid #ced4da' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
                        <ul className="dropdown-menu">
                          <li><a className="dropdown-item" href="#">Action</a></li>
                          <li><a className="dropdown-item" href="#">Another action</a></li>
                          <li><a className="dropdown-item" href="#">Something else here</a></li>
                          <li><hr className="dropdown-divider" /> </li>
                          <li><a className="dropdown-item" href="#">Separated link</a></li>
                        </ul>
                        <input type="text" className="form-control form-focus" value={putphoneNo} onChange={(e) => handlephone(e.target.value)} aria-label="Text input with dropdown button" />
                      </div>
                    </div>

                    <div>
                      {!isValidPassword && (
                        <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-2px' }}>
                          Atleast 10 digit required
                        </p>
                      )}
                      <p className='ms-1' style={{ color: 'red', float: 'left', fontSize: '14px', marginTop: '-2px' }}>{isValidPasswordRequired}</p>
                    </div>
                    <br />

                    <div style={{ marginTop: '-4px' }}>
                      <label for="exampleFormControlTextarea1" className="form-label label-color">Status</label>
                      <select className="form-select form-focus" value={putstatus} onChange={(e) => handleStatusChange(e.target.value)} aria-label="Default select example">
                        {/* <option selected value={putstatus} >{putstatus === true ? 'Active' : 'InActive'}</option> */}
                        <option value={true}>Active</option>
                        <option value={false}>InActive</option>
                      </select>
                    </div>
                    <div className='my-button11 '>
                      <button type="button" className="btn btn-outline-success" value={`${offcanvasclose === true ? 'data-bs-dismiss="offcanvas" aria-label="Close"' : ''}`} style={{ backgroundColor: '#008479', color: '#fff' }} onClick={(e) => SubcPutDataApi(putstate)}>Update</button>
                      <button type="button" className="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      {/* <Toaster /> */}
                    </div>
                  </div>
                </div>
          </div>
              </>
            )
          }
          {/* {
            successUpdateState && (
              <>
                <div className="offcanvas-header d-block for-my-display">
                  <div className="offcanvas-header p-0 ">
                    <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                    <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                  </div>
                  <hr className='' />
                  <div className="delete-section mt-5">
                    <div className="bg-container">
                      <div className="img-container22">
                        <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                          <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        </svg>
                      </div>
                      <div className="content mt-5">
                        <p className='heading-20'>Successful Update</p>
                        <hr style={{ width: '' }} />
                        <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Updated</p>
                      </div>
                      <div className='button-position'  >
                        <button type="button" className="btn btn-outline-primary button112233 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }} onClick={HandleState}>Continue</button>

                      </div>

                    </div>
                  </div>
                </div>
              </>
            )
          } */}


        {/* ########################## edit offcanvas  end  ################  */}

        {/* ################ offcanvas delete start #############  */}

        <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight22" aria-labelledby="offcanvasRightLabel">

          {
            showdelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Delete Section</h5>
                </div>
                <hr className='' />

                <div className="offcanvas-body">

                  <div className="sure-main-container mt-4">
                    <div className="sure-container">
                      <div>
                        <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M29.5312 0.46875C13.2656 0.46875 0 13.7344 0 30C0 46.2656 13.2656 59.5312 29.5312 59.5312C45.7969 59.5312 59.0625 46.2656 59.0625 30C59.0625 13.7344 45.7969 0.46875 29.5312 0.46875ZM29.5312 55.7812C15.3281 55.7812 3.75 44.2031 3.75 30C3.75 15.7969 15.3281 4.21875 29.5312 4.21875C43.7344 4.21875 55.3125 15.7969 55.3125 30C55.3125 44.2031 43.7344 55.7812 29.5312 55.7812Z" fill="#B50000" />
                          <path d="M31.4062 25.5469H27.6562V44.2969H31.4062V25.5469Z" fill="#B50000" />
                          <path d="M31.4062 16.6406H27.6562V20.3906H31.4062V16.6406Z" fill="#B50000" />
                        </svg>
                      </div>
                      {/* <div className="symbol-container">
                                        <img src="./images/Group.png" alt="" />
                                      </div> */}
                      <div className="sure-content mt-2">
                        <h5 className='heading-20'>Are you sure?</h5>
                        <p>This Action will be permanently <br /> delete the Profile Data</p>
                      </div>
                      <div className="form-check mt-1">
                        <input className="form-check-input my-123-form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={(e) => setConfirmation(!confirmation)} />
                        <label className="form-check-label agree" for="flexCheckDefault" >
                          I Agree to delete the Profile Data
                        </label>
                      </div>

                      <div className="mt-4">
                        <button type="button" className="btn btn-outline-primary button00 color" onClick={(e) => SubsDeleteApi(deleteid)} disabled={confirmation ? true : false}>Delete</button>
                        <button type="button" className="btn btn-outline-primary button00 ms-2" data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            )
          }
          {/* ############## After click ##############  */}

          {
            hidedelete && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                </div>
                <hr className='' />
                <div className="delete-section mt-5">
                  <div className="bg-container">
                    <div className="img-container22">
                      <svg className='pt-1 mt-2' width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.2266 26.4378L35.68 2" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                        <path d="M14.3912 26.5944L2 14.2032" stroke="white" stroke-width="5" stroke-miterlimit="10" />
                      </svg>
                    </div>
                    <div className="content mt-5">
                      <p className='heading-20'>Successful Delete</p>
                      <hr style={{ width: '' }} />
                      <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your profile has been <br /> Successfully Delete</p>
                    </div>
                    <div className='button-position'>
                      <button type="button" className="btn btn-outline-primary button112233 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }}>Continue</button>

                    </div>

                  </div>
                </div>
              </div>

            )
          }
        </div>
        {/* ################ offcanvas delete end #############  */}



      </div>
    </Container>
  )
}

export default Subscription


{/* style={{overflowY:'auto',height:'400px', position:'absolute',width:'93%'}} */ }
