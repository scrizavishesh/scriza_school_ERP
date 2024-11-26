import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import ViewAllFeeMaster from '../Modals/FeeMaster/ViewAllFeeMaster';
import toast, { Toaster } from 'react-hot-toast';
import { DownloadFeeMasterExcel, DownloadFeeMasterPDF, addNewFeeMasterApi, getAllFeeGroupApi, getAllFeeTypeApi } from '../Utils/Apis';
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
    border-radius: 5px;
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

const FeesMaster = () => {

  const token = localStorage.getItem('token');

  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [showGetByIdData, setShowGetByIdData] = useState(false);

  //Data States
  const [FeeGroupData, setFeeGroupData] = useState([]);
  const [FeeTypeData, setFeeTypeData] = useState([]);
  const [reloadMasters, setReloadMasters] = useState(false);
  const [masterType, setMasterType] = useState('');
  const [searchInputVal, setSearchInputVal] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    mode: 'onChange'
  });

  // CSV State
  const [csvData, setCSVData] = useState([])
  const [PDFResponse, setPDFResponse] = useState()

  const [getByIdGoupNameData, setGetByIdGoupNameData] = useState('')

  useEffect(() => {
    getAllFeeGroupData();
    getAllFeeTypeData();
    DownloadCSV();
    DownloadPDF();
  }, [token])

  // CSV Download
  const DownloadCSV = async () => {
    try {
      const response = await DownloadFeeMasterExcel();
      if (response?.status === 200) {
        const rows = response?.data?.split('\n').map(row => row.split(','));
        setCSVData(rows);
        // setTableData(rows.slice(1));
      }
    } catch (err) {
      console.log(err);
    }
  };

  // PDF Download Response
  const DownloadPDF = async () => {
    try {
      const response = await DownloadFeeMasterPDF();
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
    link.download = 'Fee Master Data.pdf';
    link.click();
  };

  const getAllFeeGroupData = async () => {
    try {
      setloaderState(true);
      var response = await getAllFeeGroupApi('', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setFeeGroupData(response?.data?.feeGroup);
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Fee Group API - ', error)
    }
  }

  const getAllFeeTypeData = async () => {
    try {
      setloaderState(true);
      var response = await getAllFeeTypeApi('', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setFeeTypeData(response?.data?.feeTypes);
          // toast.success(response.data.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
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
  }

  const AddNewFeeMaster = async (data) => {
    console.log(data)
    try {
      const formData = new FormData();
      formData.append('feeGroup',data?.feeGroup);
      formData.append('feeType',data?.feeType);
      formData.append('date',data?.date);
      formData.append('amount',data?.amount);
      formData.append('fineType',masterType);
      formData.append('percentage',data?.percentage);
      formData.append('fineValue',data?.fineValue);

      var response = await addNewFeeMasterApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          // toast.success(response?.data?.message)
          setReloadMasters(true)
          const offcanvasElement = document.getElementById('addFeeMaster');
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

  const validateDate = (value) => {
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(value).setHours(0, 0, 0, 0);
    return selectedDate >= today || 'Date cannot be in the past';
  };


  const dataHandle = () => {
    setShowGetByIdData(true)
  }

  const dataHandleState = () => {
    setShowGetByIdData(false)
  }

  // View All Fee Master
  const setGetIdData = (value) => {
    setGetByIdGoupNameData(value);
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      getAllStudentData();
    }
  };


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
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees Master</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Fees Master Details</p>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
            <div className="row gap-sm-0 gap-3">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12 text-end">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                    <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"Fee Master Data.csv"}>
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
                  <div className="col-md-8 col-sm-12 col-8 text-sm-end text-start ps-0">
                    {/* <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchInputVal(e.target.value)} />
                      <button className="btn searchhhButtons text-white " type="button"><span className='font14'>Search</span></button>
                    </form> */}
                    <div className="d-flex">
                      <input className="form-control formcontrolsearch font14" type="text" placeholder="Search" onChange={(e) => setSearchInputVal(e.target.value)} onKeyDown={handleKeyDown} />
                      <button className="btn searchhhButtons text-white font14" type="button" onClick={() => setReloadMasters(true)}><h2>Search</h2></button>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 col-4">
                    <div className="row justify-content-end">
                      <button className="btn addButtons2 text-white font14 textVerticalCenter" type="button" data-bs-toggle="offcanvas" data-bs-target="#addFeeMaster" aria-controls="addFeeMaster">+ Add Fees Master</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4 overflow-scroll">

            {/* {showGetByIdData ? <ViewParticularFeeMaster goData={dataHandleState} getByIdGoupNameData={getByIdGoupNameData} /> :  */}
            <ViewAllFeeMaster goData={dataHandle} setGroupName={setGetIdData} reloadMasters={reloadMasters} searchInputData={searchInputVal} />
            {/* } */}

          </div>
        </div>
      </div>


      {/* Add Fee Master */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFeeMaster" aria-labelledby="addFeeMasterLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="staticBackdropLabel">Add Fees Master</h2>
        </div>
        <div className="offcanvas-body p-3">
          <form onSubmit={handleSubmit(AddNewFeeMaster)}>
            <div className="mb-3">
              <label htmlFor="inputEmail4" className="form-label font14">Fee Group</label>
              <select id="feeGroup" className={`form-select font14 ${errors.feeGroup ? 'border-danger' : ''}`} {...register('feeGroup', { required: 'Fee Group is required *' })} >
                <option value="">--- Select ---</option>
                {FeeGroupData.map((option) => (
                  <option key={option.feeGroupId} value={option.feeGroupName}>{option.feeGroupName}</option>
                ))}
              </select>
              {errors.feeGroup && <p className="font12 text-danger">{errors.feeGroup.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail4" className="form-label font14">Fee Type</label>
              <select id="feeType" className={`form-select font14 ${errors.feeType ? 'border-danger' : ''}`} {...register('feeType', { required: 'Fee Type is required *' })} >
                <option value="">--- Select ---</option>
                {FeeTypeData.map((option) => (
                  <option key={option.feeTypeId} value={option.feeTypeCode}>{option.feeTypeName}</option>
                ))}
              </select>
              {errors.feeType && <p className="font12 text-danger">{errors.feeType.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label font14">Due Date</label>
              <input id="date" type="date" className={`form-control font14 ${errors.date ? 'border-danger' : ''}`} {...register('date', { required: 'Due Date is required *', validate: validateDate })} />
              {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail4" className="form-label font14">Amount</label>
              <input id="amount" type="number" className={`form-control font14 ${errors.amount ? 'border-danger' : ''}`} placeholder='Enter Amount' {...register('amount', { required: 'Amount is required *', min: { value: 0, message: 'Amount cannot be negative' } })} />
              {errors.amount && <p className="font12 text-danger">{errors.amount.message}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail4" className="form-label font14">Fine Type</label>
              <div className="d-flex justify-content-between">
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" defaultChecked disabled />
                  <label className="form-check-label font14" htmlFor="exampleRadios3">
                    None
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="percentage" onChange={(e) => { setMasterType(e.target.value), setValue('fineValue', 0) }} />
                  <label className="form-check-label font14" htmlFor="exampleRadios1">
                    Percentage
                  </label>
                </div>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="amount" onChange={(e) => { setMasterType(e.target.value), setValue('percentage', 0) }} />
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
                  <input id="percentage" type="number" className={`form-control font14 ${errors.percentage ? 'border-danger' : ''}`} disabled={masterType === 'amount' || masterType === '' ? true : false} placeholder='Enter Percentage' {...register('percentage', masterType === 'percentage' ? { required: 'Percentage is required *', min: { value: 0, message: 'Percentage cannot be negative' } } : {})} />
                  {errors.percentage && <p className="font12 text-danger">{errors.percentage.message}</p>}
                </div>
              </div>
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label font14">Amount</label>
                  <input id="fineValue" type="number" className={`form-control font14 ${errors.fineValue ? 'border-danger' : ''}`} disabled={masterType === 'percentage' || masterType === '' ? true : false} placeholder='Enter Master value' {...register('fineValue', masterType === 'amount' ? { required: 'Master value is required *', min: { value: 0, message: 'Master value cannot be negative' } } : {})} />
                  {errors.fineValue && <p className="font12 text-danger">{errors.fineValue.message}</p>}
                </div>
              </div>
            </div>
            <p className='text-center p-3'>
              <button className='btn addButtons font14 text-white me-2' type='submit'>Add Fee Master</button>
              <button className='btn cancelButtons font14' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
            </p>
          </form>
          {/* <div className="">
            <AddFeeMaster/>
          </div> */}
        </div>
      </div>

      <Toaster />
    </Container>
  )
}

export default FeesMaster
