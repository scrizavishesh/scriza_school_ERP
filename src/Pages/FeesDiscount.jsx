import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import ViewAllFeeDiscount from '../Modals/FeeDiscount/ViewAllFeeDiscount';
import { DownloadFeeDiscountExcel, DownloadFeeDiscountPDF, addNewFeeDiscountApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { CSVLink } from 'react-csv';

const Container = styled.div`

  .blueText{
    color: var(--blueTextColor);
  }

  .form-control::placeholder, .form-control, .form-select{
    color: var(--greyState)
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .form-control, .form-select{
    border-radius: 5px !important;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .contbtn{
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }

  .mainBreadCrum{
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText{
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText{
    color: var(--breadCrumActiveTextColor);
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .ExportBtns{
    border-radius: 3px;
    border: 1.5px solid var(--fontControlBorder);
  }

  .form-check-input{
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
  }

  .form-check-input:checked{
    background-color: #008479;
  }

  .greenBgModal{
    background-color: var(--breadCrumActiveTextColor);
  }

  .greenText{
    color: var(--breadCrumActiveTextColor);
  }

  .form-select{
    color: var(--greyState);
    box-shadow: none;
  }
  
  .orangeText{
    color: var(--OrangeBtnColor);
  }

  .scrollBarHide::-webkit-scrollbar {
    display: none;
  }

  .infoIcon{
    cursor: pointer;
  }

  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .modalLightBorder{
    border-bottom: 1px solid var(--modalBorderColor);
  }

  .correvtSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -16% !important;
    background-color: #2BB673;
    width: 73px;
    height: 73px;
    align-items: center;
  }

  .deleteSVG{
    position: relative;
    width: fit-content ;
    margin-left: 43% !important;
    margin-bottom: -18% !important;
    background-color: #fff;
  }

  .greyText{
    color: var(--greyTextColor) !important;
  }
    
`;

const base64ToBlob = (base64Data, contentType) => {
  const byteCharacters = atob(base64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

const FeesDiscount = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [showGetByIdData, setShowGetByIdData] = useState(false);
  const [ViewFeeDiscountId, setViewFeeDiscountId] = useState('');
  const [reloadDiscounts, setReloadDiscounts] = useState(false);
  // CSV State
  const [csvData, setCSVData] = useState([])
  const [PDFResponse, setPDFResponse] = useState()
  const [searchInputVal, setSearchInputVal] = useState('');

  const [discountType, setDiscountType] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, reset } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    DownloadCSV();
    DownloadPDF();
  }, [token])

  // CSV Download
  const DownloadCSV = async () => {
    try {
      const response = await DownloadFeeDiscountExcel();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCSVData(rows);
        // setTableData(rows.slice(1));
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }

    }
  };

  // PDF Download Response
  const DownloadPDF = async () => {
    try {
      const response = await DownloadFeeDiscountPDF();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setPDFResponse(response?.data);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Handle PDF Download in Device
  const handleDownloadPdf = () => {
    const { pdf } = PDFResponse;
    const blob = base64ToBlob(pdf, 'application/pdf');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Fee Discount Data.pdf';
    link.click();
  };


  const AddNewFeeDiscount = async (data) => {
    try {
      const formData = new FormData();
      formData.append('feeDiscountName', data?.feeDiscountName);
      formData.append('feeDiscountCode', data?.feeDiscountCode);
      formData.append('feeDiscountDescription', data?.feeDiscountDescription);
      formData.append('percentage', data?.percentage);
      formData.append('discountValue', data?.discountValue);

      var response = await addNewFeeDiscountApi(formData);
      console.log(response);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setAddWarning(false);
          setloaderState(false);
          toast.success(response?.data?.message)
          setReloadDiscounts(true);
          const offcanvasElement = document.getElementById('addFeeDiscount');
          if (offcanvasElement) {
            let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (!offcanvas) {
              offcanvas = new bootstrap.Offcanvas(offcanvasElement);
            }
            offcanvas.hide();
          }
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }

    }
    catch {

    }
  }


  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      getAllStudentData();
    }
  };


  const dataHandle = () => {
    setShowGetByIdData(true)
  }

  const dataHandleState = () => {
    setShowGetByIdData(false)
  }

  const UpdatingViewId = (id) => {
    setViewFeeDiscountId(id)
  }


  return (
    <Container>
      {
        loaderState && (
          <DataLoader />
        )
      }
      <div className="container-fluid p-4">
        <div className="row pb-3 gap-xl-0 gap-3">
          <div className="col-xxl-4 col-xl-4 col-lg-12 col-sm-12 flex-frow-1 ">
            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
              <ol className="breadcrumb mb-1">
                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                <li className="breadcrumb-item"><a href="/collectFees" className='bredcrumText text-decoration-none'>Fee Collection</a></li>
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees Discount</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Fees Discount Details</p>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
            <div className="row gap-sm-0 gap-3">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12 text-end">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                    <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"Fee Discount Data.csv"}>
                      <span className='font14 textVerticalCenter'>
                        <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                        <span className='ms-1'>Export to CSV</span>
                      </span>
                    </CSVLink>
                  </div>
                  <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                    <button className="btn ps-2 pe-2 ExportBtns bg-white" type="button" onClick={handleDownloadPdf}>
                      <span className='font14 textVerticalCenter'>
                        <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                        <span className='ms-1'>Export to PDF</span>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-xl-7 col-lg-7 col-md-7 col-sm-6 col-12 text-end align-self-center">
                <div className="row gap-md-0 gap-sm-3">
                  <div className="col-md-7 col-sm-12 col-8 text-sm-end text-start ps-0 pe-0">
                    {/* <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                      <button className="btn searchButtons text-white " type="button"><span className='font14'>Search</span></button>
                    </form> */}
                    <div className="d-flex">
                      <input className="form-control formcontrolsearch font14" type="text" placeholder="Search" onChange={(e) => setSearchInputVal(e.target.value)} onKeyDown={handleKeyDown} />
                      <button className="btn searchhhButtons text-white font14" type="button" onClick={()=> setReloadDiscounts(true)}><h2>Search</h2></button>
                    </div>
                  </div>
                  <div className="col-md-5 col-sm-12 col-4">
                    <div className="row justify-content-end">
                      <button className="btn addButtons3 text-white font14 textVerticalCenter" type="button" data-bs-toggle="offcanvas" data-bs-target="#addFeeDiscount" aria-controls="addFeeDiscount">+ Add Fees Discount</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-3 overflow-scroll">
            {/* {showGetByIdData ? <ViewParticularFeeDiscount ViewFeeDiscountId={ViewFeeDiscountId} goData={dataHandleState} /> :  */}
            <ViewAllFeeDiscount goData={dataHandle} ViewId={UpdatingViewId} reloadDiscounts={reloadDiscounts} searchInputData={searchInputVal} />
            {/* } */}
          </div>
        </div>
      </div>


      {/* Add Fee Master */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFeeDiscount" aria-labelledby="addFeeDiscountLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Add Fees Discount</h2>
        </div>
        <div className="offcanvas-body p-3">
          <form action="" onSubmit={handleSubmit(AddNewFeeDiscount)}>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
              {/* <input type="text" className="form-control font14" id="exampleFormControlInput1" placeholder="Enter Name" /> */}
              <input id="feeDiscountName" type="text" className={`form-control font14 ${errors.feeDiscountName ? 'border-danger' : ''}`} placeholder="Enter Discount Name" {...register('feeDiscountName', { required: 'Discount Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Discount Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Discount Name'; } return true; } })} />
              {errors.feeDiscountName && <p className="font12 text-danger">{errors.feeDiscountName.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label font14">Discount Code</label>
              <input id="feeDiscountCode" type="text" className={`form-control font14 ${errors.feeDiscountCode ? 'border-danger' : ''}`} placeholder="Enter Discount Code" {...register('feeDiscountCode', { required: 'Discount Code is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Discount Code'; } return true; } })} />
              {errors.feeDiscountCode && <p className="font12 text-danger">{errors.feeDiscountCode.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail4" className="form-label font14">Discount Type</label>
              <div className="d-flex justify-content-between">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" defaultChecked disabled />
                  <label className="form-check-label font14" htmlFor="exampleRadios3">
                    None
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="percentageSelection" onChange={(e) => { setDiscountType(e.target.value), setValue('discountValue', 0) }} />
                  <label className="form-check-label font14" htmlFor="exampleRadios1">
                    Percentage
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="discountValueSelection" onChange={(e) => { setDiscountType(e.target.value), setValue('percentage', 0) }} />
                  <label className="form-check-label font14" htmlFor="exampleRadios2">
                    Amount
                  </label>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label font14">Percentage</label>
                  <input id="percentage" type="number" className={`form-control font14 ${errors.percentage ? 'border-danger' : ''}`} disabled={discountType === 'discountValueSelection' || discountType === '' ? true : false} placeholder='Enter Percentage' {...register('percentage', discountType === 'percentageSelection' ? { required: 'Percentage is required *', min: { value: 0, message: 'Percentage cannot be negative' } } : {})} />
                  {errors.percentage && <p className="font12 text-danger">{errors.percentage.message}</p>}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label font14">Amount</label>
                  <input id="discountValue" type="number" className={`form-control font14 ${errors.discountValue ? 'border-danger' : ''}`} disabled={discountType === 'percentageSelection' || discountType === '' ? true : false} placeholder='Enter Discount value' {...register('discountValue', discountType === 'discountValueSelection' ? { required: 'Discount value is required *', min: { value: 0, message: 'Discount value cannot be negative' } } : {})} />
                  {errors.discountValue && <p className="font12 text-danger">{errors.discountValue.message}</p>}
                </div>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
              <input id="feeDiscountDescription" type="text" className={`form-control font14 ${errors.feeDiscountDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('feeDiscountDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
              {errors.feeDiscountDescription && <p className="font12 text-danger">{errors.feeDiscountDescription.message}</p>}
            </div>
            <p className='text-center p-3'>
              <button className='btn addButtons2 font14 text-white me-2' type='submit'>Add Fee Discount</button>
              <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => reset()}>Cancel</button>
            </p>
          </form>
        </div>
      </div>

      <Toaster />
    </Container>
  )
}

export default FeesDiscount
