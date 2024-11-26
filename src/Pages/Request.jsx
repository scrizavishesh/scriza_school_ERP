import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components';
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate'
import { Link } from 'react-router-dom';
import { RequestGetApi } from '../Utils/Apis'
import { RequestDeleteApi } from '../Utils/Apis'
import { RequestGetByIdApi } from '../Utils/Apis'
import { RequestPutApi } from '../Utils/Apis'
import { RequestUpdatePutApi } from '../Utils/Apis'
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { Icon } from '@iconify/react/dist/iconify.js';
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


.my-button11{
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-top: 30px;
}

.my-button11 button{
    border-radius: 5px;
  border: 1px solid #008479;
  color: #000;
  background-color: #008479;
  color: #fff ;
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
.for-margin-top{
    margin-top: -20px;
    margin-left: 15px;
  }
  .sure-main-container{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  .button00{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #B50000;
    border-radius: 0%;
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
  .img-container22 svg{
    /* margin-top: 2px; */
  }
  .bg-container{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    width: 65%;
    background-color: #FBFBFb;
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
  .button11{
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #10c260;
    border-radius: 0%;
    background-color: #008479 !important;
    color: #fff;
  }
  .my-cancel-button {
    --bs-btn-color: #959494;
    --bs-btn-border-color: #cdcdcd;
    --bs-btn-hover-color: #fff;
    --bs-btn-hover-bg: #10c260;
border: 1px solid #adadad !important;
    background-color: #fff !important;
    color: #000 !important;
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
.completeStatus{
    width: 92px;
    font-size: 14px;
    padding: 0.5px 0.7px 0.5 0.7px;
    text-align: center;
    border-radius: 33px;
    background-color: #E4ECFF;
    color: #B9B2FF;
}
.inProgressStatus{
  width: 110px;
  font-size: 14px;
  padding: 0.5px 1px 0.5 1px;
    text-align: center;
    border-radius: 33px;
    color:#00A67E ;
    background-color: #E6FFE2;
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
.my-i-button{
  border: none;
  background: none;
}

/* ########## media query ###########  */
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
}

@media only screen and (max-width: 425px) {
    .for-media-query-22{
    flex: 0 0 auto !important;
    width: 75% !important;
  }

}
@media only screen and (max-width: 800px) {
    .for-dislay-direction{
        display: flex;
        flex-direction: column;
        margin-bottom: 5px;
    }

}
`;

// ## style css area end ####  

const ManageFaq = () => {
  const [loader, setLoader] = useState(false)

  const [data, setData] = useState([])
  const [putstate, setPutstate] = useState()
  const [delvalue, setDelvalue] = useState()
  const [show1, setShow1] = useState(true)
  const [hide2, setHide2] = useState(true)
  const [reply, setReply] = useState(false)
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [isBackdropVisible, setBackdropVisible] = useState(false);

  const [putdata, setPutdata] = useState()
  const [datamsg, setDatamsg] = useState()
  const [reqstatus, setReqstatus] = useState()
  const [reqDate, setReqDate] = useState()
  const [hidesuccess, setHidesuccess] = useState(false)
  const [check, setCheck] = useState(false)

  const [reqid, setReqid] = useState()
  const [reqemail, setReqemail] = useState()
  const [reqmsg, setReqmsg] = useState()
  const [statuscheck, setStatuscheck] = useState('COMPLETE')
  // const [errors, setErrors] = useState({});

  const [searchKey, setSearchKey] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ##### validation states ########## 
  const [reqphone, setReqphone] = useState()
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordRequired, setIsValidPasswordRequired] = useState(true);
  // const [viewDetails, setViewDetails] = useState();

  const [inputValues, setInputValue] = useState({
    reqphone: ''
  });
  const [validation, setValidation] = useState({
    reqphone: ''
  });

  useEffect(() => {
    
    showName();
    RequestGetByIdApi();
  }, [pageNo]);

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  // get all api
  const showName = async () => {
    setLoader(true)
    try {
      const response = await RequestGetApi(searchKey, pageNo, pageSize, startDate, endDate);
      console.log('get-all-api-of-request', response)
      if (response?.status === 200) {
        // toast.success(response?.data?.message);
        setData(response?.data?.requests)
        setPutdata(response?.data?.requests)
        setCurrentPage(response?.data?.currentPage)
        setTotalPages(response?.data?.totalPages)
        setLoader(false)
      } else {
        // console.log('fghjkghj')
        // toast.error(data?.message);
      }
    } catch (error) {
      console.log('catch')
    }
    for (let i = 0; i < putdata; i++) {
      console.log('my-request-indexing', i)
      return i
    }

  }

  const HandleState = () => {
    setHidedelete(false)
    setShowdelete(true)
  }
  const delValueUpdate = (id) => {
    setDelvalue(id)
  }


  const offcanvasRef = useRef(null);
  const offcanvasRef2 = useRef(null);

  const [delValue, setDelValue] = useState(null);
  const [showDelete, setShowDelete] = useState(true);
  const [hideDelete, setHideDelete] = useState(false);

  // resqust delete api
  const DeleteApi = async (id) => {
    setLoader(true)
    try {
      const response = await RequestDeleteApi(id);
      console.log('delete response ', response)
      if (response?.status === 200) {
        toast.success(response?.data?.message);
        setLoader(false)
        showName()
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef.current);
        offcanvasInstance.hide();
        setShowDelete(false);
        setCheck(false);
        showName();
        setTimeout(() => {
          showName()
          setShowDelete(true);
        }, 1000)

      } else {
        toast.error(response?.data?.message);
      }

    } catch (error) {
      console.log(error)
    }
  }

  // Get By Id Api
  const GetByIdApi = async (id) => {
    setPutstate(id)
    setLoader(true)
    try {
      const response = await RequestGetByIdApi(id);
      console.log('get-by-id-in-request-page 0000000', response)
      // setPutdata(response.data.request)
      // setReqid(response.data.request.reqId)
      setReqphone(response.data.request.reqPhone)
      setReqstatus(response.data.request.reqStatus)
      setReqemail(response.data.request.reqEmail)
      setReqmsg(response.data.request.reqMsg)
      setReqid(response.data.request.reqId)
      setReqDate(response.data.request.reqDate.slice(0, 10))
      setLoader(false)
      if (response?.status === 'success') {
        toast.success(response?.data?.msg);
      } else {
        // toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error)
    }
  }


  // Reply Put api 
  const PutDataApi = async (id) => {
    // console.log('inside the pu api', id)
    setLoader(true)
    try {
      const formData = new FormData()
      formData.append('replyMsg', datamsg)
      const response = await RequestPutApi(id, formData);
      console.log('my-data-put-Api', response)
      if (response?.status === 200) {
        setLoader(false)
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
      if (response) {
        setDatamsg('')
      }
    } catch (error) {
      console.log(error)
    }
    // console.log('my-dataset',data)
  }


  // ###### validation ##########
  const FuncValidation = () => {
    let errors = validation;
    if (!inputValues.reqphone.trim()) {
      errors.reqphone = 'Number is required';
    }
    else {
      errors.reqphone = '';
    }
    let userContact = errors.reqphone;
    setIsValidPasswordRequired(userContact)
    return errors;
  }

  const handlepassword = (e2) => {
    setReqphone(e2);
    setIsValidPasswordRequired('')

    const phonedRegex = /^\+?(91)?([6-9]{1})([0-9]{9})$/;
    setIsValidPassword(phonedRegex.test(e2));
  }
  // ###### validation ##########

  // handler for status change 
  const handleStatusChange = (value) => {
    setReqstatus(value);
  };

  // request update api
  const requestUpdateApi = async () => {
    if (reqphone === '') {
      FuncValidation();
    }
    if (!isValidPassword === false) {
      setLoader(true)
      try {
        const formData = new FormData()
        formData.append('reqStatus', reqstatus)
        formData.append('reqPhone', reqphone)
        formData.append('reqId', reqid)

        const response = await RequestUpdatePutApi(formData);
        console.log('my-data-put-Api', response)
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message);
          setLoader(false)
          showName()
          setShow1(false)
          const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasRef2.current);
          offcanvasInstance.hide();
          // setHidesuccess(true)
          // showName()
          setTimeout(() => {
            showName()
            setShow1(true);
          }, 1000)

        } else {
          toast.error(response?.data?.message);
        }
        // if (response) {
        //   setShow1(false)
        //   setHide2(true)
        // }

      } catch (error) {
        console.log(error)
      }
    }
  }

  const HandleUpdate = () => {
    setShow1(true)
    setHidesuccess(false)
  }
  const Replyhandle = (e) => {
    if (hide2 === true && reply === false) {
      setHide2(false)
      setReply(true)
    } else {
      setHide2(true)
    }
  }
  const ChangeState = () => {
    setHide2(true)
    setReply(false)
  }
  //  Date range 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  console.log('my both date1 =', startDate)
  console.log('my both date2 =', endDate)

  const handleDateChange = (dates) => {
    setStartDate(formatDate(dates[0]));
    setEndDate(formatDate(dates[1]));

    console.log('start date ', startDate)
    console.log('end date ', endDate)
  };

  const formatDate = (date) => {
    if (!date) return '';
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


  let tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  let tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
  })


  return (

    <Container>
      {
        loader && (
          <DataLoader />
        )
      }
      <div className="container-fluid main-body p-3">

        <div className='d-flex justify-content-between for-dislay-direction'>
          <div className="breadCrum ms-2">
            <nav style={{ '--bs-breadcrumb-divider': "'>'" }} aria-label="breadcrumb">
              <ol class="breadcrumb ms-2">
                <li class="breadcrumb-item active heading-14 font-color" aria-current="page">Home</li>
                <li class="breadcrumb-item breadcrum-li heading-14" ><Link href="#" onClick={showName}>Request</Link></li>
              </ol>
            </nav>
          </div>

          <div className='d-flex g-1 for-media-query'>
            <form class="row  me-2">
              <div class="col-9 for-media-query-22">
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
                <Link type="submit" className="btn btn-primary mb-3 heading-1 remove-shadow button-bg-color heading-14" style={{ border: '1px solid #008479', lineHeight: '1.3', display: 'flex' }} onClick={showName}>
                  <svg width="40" height="14" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginTop: '2px' }}>
                    <path d="M4.57143 7.42857C4.57143 7.27702 4.63163 7.13167 4.7388 7.02451C4.84596 6.91735 4.9913 6.85714 5.14286 6.85714H8.57143C8.72298 6.85714 8.86833 6.91735 8.97549 7.02451C9.08265 7.13167 9.14286 7.27702 9.14286 7.42857C9.14286 7.58012 9.08265 7.72547 8.97549 7.83263C8.86833 7.9398 8.72298 8 8.57143 8H5.14286C4.9913 8 4.84596 7.9398 4.7388 7.83263C4.63163 7.72547 4.57143 7.58012 4.57143 7.42857ZM2.28571 4C2.28571 3.84845 2.34592 3.7031 2.45308 3.59594C2.56025 3.48878 2.70559 3.42857 2.85714 3.42857H10.8571C11.0087 3.42857 11.154 3.48878 11.2612 3.59594C11.3684 3.7031 11.4286 3.84845 11.4286 4C11.4286 4.15155 11.3684 4.2969 11.2612 4.40406C11.154 4.51122 11.0087 4.57143 10.8571 4.57143H2.85714C2.70559 4.57143 2.56025 4.51122 2.45308 4.40406C2.34592 4.2969 2.28571 4.15155 2.28571 4ZM0 0.571429C0 0.419876 0.060204 0.274531 0.167368 0.167368C0.274531 0.060204 0.419876 0 0.571429 0H13.1429C13.2944 0 13.4398 0.060204 13.5469 0.167368C13.6541 0.274531 13.7143 0.419876 13.7143 0.571429C13.7143 0.722981 13.6541 0.868326 13.5469 0.975489C13.4398 1.08265 13.2944 1.14286 13.1429 1.14286H0.571429C0.419876 1.14286 0.274531 1.08265 0.167368 0.975489C0.060204 0.868326 0 0.722981 0 0.571429Z" fill="white" />
                  </svg> &nbsp;
                  <p style={{ fontSize: '14px' }}>Filter</p>
                </Link>
              </div>
              {/* <div className="col-2 p-0 ps-2" >
                <Link type="submit" className="btn btn-primary mb-3 heading-1 remove-shadow button-bg-color heading-14" style={{ border: '1px solid #008479', lineHeight: '1.3', display: 'flex' }} onClick={MyClearFunc}>
                  <p style={{ fontSize: '14px' }}>Clear</p>
                </Link>
              </div> */}
            </form>
            <div className='me-2'>
              <div class="input-group mb-3 ">
                <input type="text" class="form-control form-focus font-color" style={{ height: '34px' }} placeholder="Search" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={(e) => setSearchKey(e.target.value)} />
                <span class="input-group-text button-bg-color button-color heading-14 font-color " style={{ cursor: 'pointer', height: "34px" }} id="basic-addon2" onClick={showName}>Search</span>
              </div>
            </div>
          </div>

        </div>
        <h5 className='ms-3 mb-3 margin-minus22 heading-16 for-margin-top' >Request Report</h5>

        <div className="main-content-conatainer pt-1 ">
          {/* ###### copy content till here for all component ######  */}

          <div className="table-container px-3 table-responsive">

            <table class="table table-sm  table-striped">
              <thead className='heading-16'>
                <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                  <th>#</th>
                  <th>Date  &nbsp;
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.4 3.05556H6L9 0L12 3.05556H9.6V10.3889H8.4V3.05556ZM0 7.94444H2.3994L2.4 0.611112H3.6V7.94444H6L3 11L0 7.94444Z" fill="black" />
                    </svg>
                  </th>
                  <th>Description</th>
                  <th>Email</th>
                  <th>Contact No</th>
                  <th>Status &nbsp;
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.4 3.05556H6L9 0L12 3.05556H9.6V10.3889H8.4V3.05556ZM0 7.94444H2.3994L2.4 0.611112H3.6V7.94444H6L3 11L0 7.94444Z" fill="black" />
                    </svg>
                  </th>
                  <th>Actions</th>
                </tr>
             
              </thead>

              <tbody className='heading-14 align-middle greyTextColor'>
                {
                  data?.map((item, index) => (
                    <tr key={item.id} className='heading-14 my-bg-color  align-middle'>
                      <td className='  greyText'>{index + 1}</td>
                      <td className='greyText'>{item?.reqDate ? item.reqDate.slice(0, 10) : ''} </td>

                      <td className='  greyText'> 
                        {(item?.reqDesc).length > 20 ? item.reqDesc.substring(0, 30) + '....' : item.reqDesc}
                        {(item?.reqDesc).length > 20 ? <button type="button" class="my-i-button" data-bs-toggle="tooltip" data-bs-placement="top" title={item.reqDesc}>
                          <Icon icon="mdi:show-outline" width="1.2em" height="1.2em" style={{ color: 'black' }} />
                        </button> : ''}
                      </td>

                      <td className='  greyText'>{item.reqEmail}</td>
                      <td className='  greyText'>{item.reqPhone}</td>
                      <td className='  ' ><p className={`${item.reqStatus === statuscheck ? 'completeStatus' : 'inProgressStatus'}`}>{item.reqStatus}</p></td>
                      <td className='  greyText'>
                        <div class="dropdown my-button-show">
                          <button class="btn btn-secondary dropdown-togg my-button-drop tableActionButtonBgColor text-color-000 heading-14" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Action &nbsp;
                            <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10.3331 0L11 0.754688L5.5 7L0 0.754688L0.663438 0L5.5 5.48698L10.3331 0Z" fill="black" />
                            </svg>
                          </button>
                          <ul class="dropdown-menu heading-14 anchor-color heading-14" >
                            <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop" aria-controls="staticBackdrop" onClick={(e) => GetByIdApi(item.reqId)}>Edit Request</Link></li>
                            <li><Link class="dropdown-item" data-bs-toggle="offcanvas" data-bs-target="#staticBackdrop9090" aria-controls="staticBackdrop" onClick={(e) => GetByIdApi(item.reqId)}>View Details</Link></li>
                            <li><a class="dropdown-item" href="#" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight2233" aria-controls="offcanvasRight2233" onClick={() => delValueUpdate(item.reqId)}>Delete</a></li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <Toaster />
            </table>
            {/* pagination */}
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
        <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop9090" aria-labelledby="staticBackdropLabel">


          {/* ########## after click ##########  */}

          {
            hide2 && (
              <>
                <div class="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                  </svg>
                  </Link>
                  <h5 class="offcanvas-title heading-16" id="offcanvasRightLabel">View Details</h5>
                </div>
                <div class="offcanvas-body">
                  <div className="inputs me-1">
                    <hr className='' style={{ marginTop: '-3px' }} />
                    <div class="mb-3 my-div-class">
                      <label for="exampleFormControlTextarea1" class="form-label label-color">Req. Message</label>
                      {/* <textarea class="form-control heading-14" id="exampleFormControlTextarea1"  placeholder=' Lorem Ipsumis simply dummy text ofthe printing and type setting industry.Lorem Ipsum has been the industrysstandard dummy text ever since the1500 when an unknown printer tooka galley of type and scrambled it to makea type specimen book  ' ></textarea> */}
                      <p className='heading-14'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.!
                        <br /> <span><Link href="" onClick={() => { Replyhandle() }}>Reply</Link></span>
                      </p>

                    </div>
                    <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                      <div>
                        <p className='ps-1 '>ID</p>
                      </div>
                      <div className='d-flex'>
                        <div className='my-td-style-green'><span>{reqstatus}</span></div> &nbsp; &nbsp;
                        <div><p>SCR152</p></div>
                      </div>
                    </div>
                    <hr className='' style={{ marginTop: '4px' }} />
                    <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                      <div>
                        <p className='ps-1'>Date</p>
                      </div>
                      <div className='d-flex'>
                        <div><p>{reqDate}</p></div>
                      </div>
                    </div>
                    <hr className='' style={{ marginTop: '4px' }} />
                    <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                      <div>
                        <p className='ps-1'>Email</p>
                      </div>
                      <div className='d-flex'>
                        <div><p>{reqemail}</p></div>
                      </div>
                    </div>
                    <hr className='' style={{ marginTop: '4px' }} />
                    <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                      <div>
                        <p className='ps-1'>Contact No</p>
                      </div>
                      <div className='d-flex'>
                        <div><p>{reqphone}</p></div>
                      </div>
                    </div>
                    <hr className='' style={{ marginTop: '4px' }} />
                    <div className='my-button11 '>
                      <button type="button" class="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Back</button>
                    </div>
                  </div>
                </div>
              </>



            )
          }
          {/* ################  then Again After click start ###############  */}
          {
            reply && (
              <>
                <div class="offcanvas-header">
                  <Link data-bs-dismiss="offcanvas" ><svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                  </svg>
                  </Link>
                  <h5 class="offcanvas-title heading-16" id="offcanvasRightLabel">Request View</h5>
                </div>
                <div className="offcanvas-body">
                  <hr className='' style={{ marginTop: '-3px' }} />
                  <div class="mb-3 my-div-class">
                    <label for="exampleFormControlTextarea1" class="form-label label-color">Req. Message</label>
                    <p className='heading-14'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.!
                      <textarea class="form-control form-focus heading-14 mt-3" id="exampleFormControlTextarea1" value={datamsg} onChange={(e) => setDatamsg(e.target.value)} rows="3" placeholder='Reply here....' ></textarea>

                      <div className='my-button22 '>
                        <button type="button" class="btn btn-outline-success" style={{ color: '#fff', backgroundColor: '#008479' }} onClick={(e) => PutDataApi(putstate)}>Send</button>
                        <button type="button" class="btn btn-outline-success" onClick={ChangeState}>Cancel</button>
                      </div>
                    </p>
                  </div>
                  <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                    <div>
                      <p className='ps-1 '>ID</p>
                    </div>
                    <div className='d-flex'>
                      <div className='my-td-style-green'><span>{reqstatus}</span></div> &nbsp; &nbsp;
                      <div><p>SCR152</p></div>
                    </div>
                  </div>
                  <hr className='' style={{ marginTop: '4px' }} />
                  <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                    <div>
                      <p className='ps-1'>Date</p>
                    </div>
                    <div className='d-flex'>
                      <div><p>{reqDate}</p></div>
                    </div>
                  </div>
                  <hr className='' style={{ marginTop: '4px' }} />
                  <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                    <div>
                      <p className='ps-1'>Email</p>
                    </div>
                    <div className='d-flex'>
                      <div><p>{reqemail}</p></div>
                    </div>
                  </div>
                  <hr className='' style={{ marginTop: '4px' }} />
                  <div className='d-flex justify-content-between heading-14 mt-4 my-grey'>
                    <div>
                      <p className='ps-1'>Contact No</p>
                    </div>
                    <div className='d-flex'>
                      <div><p>{reqphone}</p></div>
                    </div>
                  </div>
                  <hr className='' style={{ marginTop: '4px' }} />
                  <div className='my-button11 '>
                    <button type="button" class="btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Back</button>
                  </div>
                </div>
              </>

            )
          }

          {/* ################  then Again After click end ###############  */}

        </div>


        {
          show1 && (
            <div class="offcanvas offcanvas-end" data-bs-backdrop="static" tabindex="-1" id="staticBackdrop" aria-labelledby="staticBackdropLabel" ref={offcanvasRef2}>
              <div class="offcanvas-header">
                <Link data-bs-dismiss="offcanvas" ><svg width="28" height="15" viewBox="0 0 28 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.06 0.295798C8.15373 0.388761 8.22812 0.499362 8.27889 0.621222C8.32966 0.743081 8.3558 0.873786 8.3558 1.0058C8.3558 1.13781 8.32966 1.26852 8.27889 1.39038C8.22812 1.51223 8.15373 1.62284 8.06 1.7158L3.46 6.3158H27C27.2652 6.3158 27.5196 6.42115 27.7071 6.60869C27.8946 6.79623 28 7.05058 28 7.3158C28 7.58102 27.8946 7.83537 27.7071 8.0229C27.5196 8.21044 27.2652 8.3158 27 8.3158H3.48L8.06 12.8858C8.24625 13.0732 8.35079 13.3266 8.35079 13.5908C8.35079 13.855 8.24625 14.1084 8.06 14.2958C7.87264 14.482 7.61918 14.5866 7.355 14.5866C7.09081 14.5866 6.83736 14.482 6.65 14.2958L0.289999 7.9358C0.204397 7.85367 0.136286 7.75508 0.089756 7.64596C0.0432262 7.53683 0.0192413 7.41943 0.0192413 7.3008C0.0192413 7.18217 0.0432262 7.06476 0.089756 6.95564C0.136286 6.84652 0.204397 6.74793 0.289999 6.6658L6.64 0.295798C6.73296 0.20207 6.84356 0.127676 6.96542 0.0769072C7.08728 0.0261385 7.21799 0 7.35 0C7.48201 0 7.61272 0.0261385 7.73458 0.0769072C7.85643 0.127676 7.96704 0.20207 8.06 0.295798Z" fill="#008479" />
                </svg>
                </Link>
                <h5 class="offcanvas-title heading-16" id="offcanvasRightLabel">Request Edit</h5>
              </div>
              <hr className='' style={{ marginTop: '-3px' }} />
              <div class="offcanvas-body">
                <div className="inputs me-1">

                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label label-color ">Date</label>
                    <input type="text" class="form-control form-focus label-color " value={reqDate} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="01 Feb 2023" disabled />
                  </div>

                  <div class="mb-3">
                    <label for="exampleFormControlInput1" class="form-label label-color ">Email</label>
                    <input type="email" class="form-control form-focus input-bg label-color" value={reqemail} style={{ marginTop: '-4px' }} id="exampleFormControlInput1" placeholder="xyz12@gmail.com" disabled />
                  </div>

                  <div class="mb-3 my-div-class" >
                    <label for="exampleFormControlTextarea1" className="form-label label-color">Req. Message</label>
                    <textarea class="form-control form-focus heading-14  label-color" value={reqmsg} rows="2" id="exampleFormControlTextarea1" placeholder='Lorem Ipsumis simply dummy text ofthe printing and type setting industry.Lorem Ipsum has been the industrysstandard dummy text ever since the1500 when an unknown printer tooka galley of type and scrambled it to makea type specimen book' disabled></textarea>
                  </div>

                  <div>
                    <label for="exampleFormControlTextarea1" class="form-label label-color">Contact No</label>
                    <div class="input-group mb-3 cont-drop-btn">
                      <button class="btn btn-outline-secondary dropdown-toggle" style={{ border: '1px solid #ced4da' }} type="button" data-bs-toggle="dropdown" aria-expanded="false">+91</button>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                        <li><hr class="dropdown-divider" /> </li>
                        <li><a class="dropdown-item" href="#">Separated link</a></li>
                      </ul>
                      <input type="text" class="form-control form-focus" value={reqphone} onChange={(e) => handlepassword(e.target.value)} aria-label="Text input with dropdown button" />
                    </div>
                  </div>
                  <div>
                    {!isValidPassword && (
                      <p className='ms-1' style={{ color: 'red', fontSize: '14px', float: 'left', marginTop: '-12px' }}>
                        Atleast 10 integers required
                      </p>
                    )}
                    <p className='ms-1' style={{ color: 'red', float: 'left', fontSize: '14px', marginTop: '-12px' }}>{isValidPasswordRequired}</p>
                  </div>
                  <br />
                  <div >
                    <label for="exampleFormControlTextarea1" className="form-label label-color">Status</label>
                    <select class="form-select form-focus" value={reqstatus} onChange={(e) => handleStatusChange(e.target.value)} aria-label="Default select example">
                      <option selected disabled>{reqstatus}</option>
                      {/* <option value="NEW">New</option> */}
                      <option value="COMPLETE"  >Complete</option>
                      <option value="IN PROGRESS" >In Progress</option>
                      {/* <option >InProgress</option> */}
                    </select>
                  </div>
                  <div className='my-button11 '>
                    <button type="button" class="btn btn-outline-success" onClick={requestUpdateApi}>Update</button>
                    {/* UpdateHandleBtn */}
                    <button type="button" class=" my-cancel-button btn btn-outline-success" data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                  </div>
                </div>
              </div>
            </div>

          )
        }

        {/* {
            hidesuccess && (
              <div className="container-fluid">
                <div className="offcanvas-header p-0 pt-3">
                  <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
                  <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
                </div>
                <hr className='' />
                <div className="delete-section mt-5">
                  <div className="bg-container">
                    <div className="img-container22 pt-3">
                      <svg width="32" height="22" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      <button type="button" className="btn btn-outline-primary button11 mt-4 mb" data-bs-dismiss="offcanvas" aria-label="Close" style={{ fontSize: '14px' }} onClick={HandleUpdate}>Continue</button>
                    </div>

                  </div>
                </div>
              </div>

            )
          } */}

        {/* ########## after click ##########  */}

        {/* ########################## edit offcanvas  end  ################  */}

        {/* * ########################## delete offcanvas  ################  */}

       {
        showDelete && (
          <div className={`offcanvas offcanvas-end`} tabIndex="-1" id="offcanvasRight2233" aria-labelledby="offcanvasRightLabel" ref={offcanvasRef}>
          <div className="container-fluid">
            <div className="offcanvas-header p-0 pt-3">
              <Link data-bs-dismiss="offcanvas" className='ps-3'>
                <img src="./images/Vector (13).svg" alt="" />
              </Link>
              <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel">Delete Section</h5>
            </div>
            <hr />

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
                  <div className="sure-content mt-2">
                    <h4 className='heading-15'>Are you sure?</h4>
                    <p>This Action will be permanently <br /> delete the Profile Data</p>
                  </div>
                  <div className="form-check mt-1">
                    <input className="form-check-input my-red-tick" type="checkbox" onClick={(e) => setCheck(!check)} value="" id="flexCheckDefault" />
                    <label className="form-check-label agree" for="flexCheckDefault">
                      I Agree to delete the Profile Data
                    </label>
                  </div>
                  <div className="mt-4">
                    <button type="button" className="btn btn-outline-primary button00" style={{ backgroundColor: '#B50000', color: '#fff', borderColor: '#B50000' }} onClick={(e) => DeleteApi(delvalue)} disabled={check ? false : true}>Delete</button>
                    <button type="button" className="btn btn-outline-primary button00 ms-2" data-bs-dismiss="offcanvas" aria-label={showdelete === true ? 'Close' : ''}>Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
       }

        {/* ############## After click ##############  */}


        {/* * ########################## delete offcanvas  ################  end */}


      </div>
    </Container>
  )
}

export default ManageFaq




{/* <div>
          {isBackdropVisible && (
            <div className="offcanvas-backdrop fade show">
              
            </div>

          )}

        </div> */}

{/* {
       showdelete && (
       
       )
     } */}

{/* {
         hidedelete && (
           <div className="container-fluid">
             <div className="offcanvas-header p-0 pt-3">
               <Link data-bs-dismiss="offcanvas" className='ps-3'><img src="./images/Vector (13).svg" alt="" /></Link>
               <h5 className="offcanvas-title pe-3 heading-16" id="offcanvasRightLabel" >Successfull Message</h5>
             </div>
             <hr className='' />
             <div className="delete-section mt-5">
               <div className="bg-container">
                 <div className="img-container22 pt-3">
                   <svg width="32" height="22" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
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
       } */}
