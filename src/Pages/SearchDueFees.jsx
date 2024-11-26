import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { DownloadDueFeesExcel, DownloadDueFeesPDF, getAllClassApi, getAllFeeMasterApi, getAllOfflineExamApi, getDueFeesApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { CSVLink } from 'react-csv';
import AddStudentFeeForm from '../Modals/AddStudentFeeForm';

const Container = styled.div`
  .css-13cymwt-control, .css-t3ipsp-control {
    min-height: 35px !important;
  }

  .css-1jqq78o-placeholder {
    color: var(--greyState) !important;
  }

  .css-tj5bde-Svg{
    fill: #000;
  }

  .css-1u9des2-indicatorSeparator{
    display: none !important;
  }

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
    border-radius: 5px !important;
    box-shadow: none !important;
    border: 1px solid var(--fontControlBorder);
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

const SelectContainer = styled.div`
  font-size: var(--font14) !important;
  box-shadow: none !important;
  .select__control {
    border-color: var(--fontControlBorder);
    &:hover {
      border-color: var(--fontControlBorder);
    }
    &--is-focused {
      border-color: var(--fontControlBorder);
      box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
  }
  .select__menu {
    z-index: 1000;
  }
  
  .select__option--is-selected {
    box-shadow: none !important;
    background-color: #007bff;
  }

  .select__control--is-focused {
    box-shadow: none !important;
  }

  .css-1xc3v61-indicatorContainer, .css-15lsz6c-indicatorContainer {
    padding: 4px;
    color: hsl(0, 0%, 80%) !important;
  }

  .css-19bb58m{
    margin: 0;
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


const SearchDueFees = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('')
  const [SearchBtn, setSearchBtn] = useState('')
  const [allClassData, setAllClassData] = useState([]);
  const [allSectionData, setAllSectionData] = useState([]);
  const [FeeMasterData, setFeeMasterData] = useState([])
  const [dueFeesData, setDueFeesData] = useState([])
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [AddFeeId, setAddFeeId] = useState('')
  const [FeeName, setFeeName] = useState('')
  const [modalHideVal, setModalHideVal] = useState(false);


  // CSV State
  const [csvData, setCSVData] = useState([])
  const [PDFResponse, setPDFResponse] = useState()
  const [allowCsvPdf, setAllowCsvPdf] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    mode: 'onChange'
  });

  const feeCodeData = watch('feeCode')
  const classData = watch('classNo')
  const sectionData = watch('section')

  useEffect(() => {
    getAllClassData();
    getAllFeeMasterData();
    if (allowCsvPdf) {
      DownloadCSV();
      DownloadPDF();
    }
  }, [token, pageNo, allowCsvPdf])

  // CSV Download
  const DownloadCSV = async () => {
    try {
      const response = await DownloadDueFeesExcel(feeCodeData, classData, sectionData);
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
      const response = await DownloadDueFeesPDF(feeCodeData, classData, sectionData);
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
    link.download = 'Due Fees Data.pdf';
    link.click();
  };

  const handleModalHideVal = () => {
    setModalHideVal(true)
  }

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getPendingFeeData = async (data) => {
    console.log(data)
    try {
      setloaderState(true);

      var response = await getDueFeesApi(data?.feeCode, data?.classNo, data?.section);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setSearchBtn(true);
          setloaderState(false);
          setAllowCsvPdf(true)
          setDueFeesData(response?.data?.feePaid);
        }
        else {
          setSearchBtn(false);
          setloaderState(false);
        }
      }
      else {
        setSearchBtn(false);
        setloaderState(false);
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      setSearchBtn(false);
      setloaderState(false);
      console.log(error)
    }
  }

  const getAllFeeMasterData = async () => {
    try {
      setloaderState(true);
      var response = await getAllFeeMasterApi('', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          const formattedData = transformData(response?.data?.feeMaster);
          setFeeMasterData(formattedData);
        } else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      } else {
        setloaderState(false);
        console.log(response?.data?.msg);
      }
    } catch (error) {
      console.log('Error Facing during Get All Fee Group API - ', error);
      setloaderState(false);
    }
  };

  const getAllClassData = async () => {
    try {
      setloaderState(true);
      var response = await getAllClassApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllClassData(response?.data?.classes);
        }
      }
      else {
        console.log(response?.data?.msg);
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

  const transformData = (feeMaster) => {
    let options = [];
    feeMaster.forEach((group) => {
      let groupOptions = group.feeMasterList.map((item) => ({
        label: item.feeTypeCode,
        value: item.feeMasterId,
      }));
      options.push({
        label: group.feeGroup,
        options: groupOptions,
      });
    });
    return options;
  };

  const handleFeeCodeChange = (selectedOptions) => {
    let feeCodeArr = selectedOptions.map((item) => {
      return item.label;
    })
    setValue('feeCode', feeCodeArr)

  };

  const handleClassChange = (val) => {
    const classIdVal = parseInt(val);
    setValue('classNo', classIdVal);
    const selectedClass = allClassData.find(c => c.classId === classIdVal);
    if (selectedClass) {
      setAllSectionData(selectedClass.section || []);
    } else {
      setAllSectionData([]);
    }
  };



  return (
    <>
      <Container>
        {
          loaderState && (
            <DataLoader />
          )
        }
        <div className="container-fluid p-4">
          <div className="row pb-3 gap-xl-0 gap-3">
            <div className="col-xxl-9 col-xl-8 col-lg-7 col-sm-7 flex-frow-1 ">
              <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                <ol className="breadcrumb mb-1">
                  <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                  <li className="breadcrumb-item"><a href="/collectFees" className='bredcrumText text-decoration-none'>Fee Collection</a></li>
                  <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Search Due Fees</li>
                </ol>
              </nav>
              <p className='font14 ps-0 fontWeight500'>Search Due Fees</p>
            </div>
            <div className="col-xxl-3 col-xl-4 col-lg-4 col-sm-4 pe-0">
              <div className="row">
                <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                  {allowCsvPdf ? (
                    <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" data={csvData} filename={"Due Fees Data.csv"}>
                      <span className='font14 textVerticalCenter'>
                        <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                        <span className='ms-1'>Export to CSV</span>
                      </span>
                    </CSVLink>
                  ) : (
                    <button className="btn ps-2 pe-2 ExportBtns bg-white" disabled>
                      <span className='font14 textVerticalCenter'>
                        <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                        <span className='ms-1'>Export to CSV</span>
                      </span>
                    </button>
                  )}


                  {/* <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} disabled={!allowCsvPdf} filename={"Due Fees Data.csv"}>
                    <span className='font14 textVerticalCenter'>
                      <Icon icon="fa-solid:file-csv" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                      <span className='ms-1'>Export to CSV</span>
                    </span>
                  </CSVLink> */}
                </div>
                <div className="col-lg-6 col-sm-6 col-4 text-md-center text-sm-end text-start ps-0 align-self-center">
                  <button className="btn ps-2 pe-2 ExportBtns bg-white" type="button" disabled={!allowCsvPdf} onClick={handleDownloadPdf}>
                    <span className='font14 textVerticalCenter'>
                      <Icon icon="fluent:document-pdf-24-filled" width="1.4em" height="1.4em" style={{ color: "#008479" }} />
                      <span className='ms-1'>Export to PDF</span>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row pb-3">
            <div className="bg-white rounded-2 p-4">
              <form className="row g-3" onSubmit={handleSubmit(getPendingFeeData)}>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">Fee Group</label>
                  <SelectContainer>
                    <div className="mb-3">
                      <Select id="feeCode" isMulti options={FeeMasterData} classNamePrefix="select" {...register('feeCode')} onChange={handleFeeCodeChange} placeholder="--- Select ---" isLoading={loaderState} />
                    </div>
                  </SelectContainer>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                  <select id='classNo' className="form-select font14" aria-label="Default select example" {...register('classNo')} onChange={(e) => handleClassChange(e.target.value)}>
                    <option value=''>--- Select ---</option>
                    {allClassData?.map(option => (<option key={option.classId} value={option?.classId}> {option.classNo} </option>))}
                  </select>
                </div>
                <div className="col-md-4 col-sm-6 col-12">
                  <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                  <select id='section' className="form-select font14" aria-label="Default select example" {...register('section')} onChange={(e) => setValue('section', e.target.value)}>
                    <option value=''>--- Select ---</option>
                    {allSectionData?.map(option => (<option key={option.sectionId} value={option.sectionId}> {option.sectionName} </option>))}
                  </select>
                </div>
                <p className='text-center p-3'>
                  <button type='submit' className='btn addCategoryButtons text-white' disabled={classData === '' || sectionData === '' || feeCodeData === '' ? true : false} >Search</button>
                  <button type='button' className='btn cancelButtons ms-3' onClick={() => { setValue('classNo', ''), setValue('section', ''), setValue('feeCode', ''), getPendingFeeData(), setAllowCsvPdf(false) }}>Cancel</button>
                </p>
              </form>
              <div className="row">
                {SearchBtn
                  ?
                  <>
                    <div className="row">
                      <div className="overflow-scroll">
                        <table className="table align-middle table-striped">
                          <thead>
                            <tr>
                              <th className=''><span className='font14'>Admission No</span></th>
                              <th><span className='font14'>Student Name</span></th>
                              <th><span className='font14'>Fee Group</span></th>
                              <th><span className='font14'>Amount </span></th>
                              <th><span className='font14'>Paid</span></th>
                              <th><span className='font14'>Discount</span></th>
                              <th><span className='font14'>Fine</span></th>
                              <th><span className='font14'>Balance</span></th>
                              <th className='text-center'><span className='font14'>Action</span></th>
                            </tr>
                          </thead>
                          <tbody>
                            {dueFeesData.map((item) => (
                              <tr className='align-middle'>
                                <th className='greyText'><h3>{item?.studentId}</h3></th>
                                <th className='greyText'><h3>{item?.studentName}</h3></th>
                                <th className='greyText'><h3>{item?.feeGroup.split('_').join(' ')}</h3></th>
                                <th className='greyText'><h3>{item?.amount}</h3></th>
                                <th className='greyText'><h3>{item?.paid}</h3></th>
                                <th className='greyText'><h3>{item?.discount}</h3></th>
                                <td className='greyText'><h3>{item?.fineAmount}</h3></td>
                                <th className='greyText'><h3>{item?.balance}</h3></th>
                                <td className='text-end'>
                                  <button className="btn-sm actionButtons text-black font14" type="button" data-bs-toggle="modal" data-bs-target="#AddFee" onClick={() => { setAddFeeId(item.feePaidId), setFeeName(item.feeGroup.split('_').join(' ')) }}>
                                    Add Fee
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        <div className="d-flex">
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

                  </>
                  :
                  <>
                    <div className="d-flex justify-content-center p-5">
                      <img src="./images/search.svg" alt="" className='img-fluid' />
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
        </div>

        <div className="modal modal-md fade" id="AddFee" tabIndex="-1" aria-labelledby="AddFeeLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ps-3 pe-3">
              <div className="modal-header ps-0 pe-0">
                <span className="modal-title font16" id="AddFeeLabel">{FeeName}</span>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body p-1">
                <AddStudentFeeForm AddFeeId={AddFeeId} modalHideTrue={handleModalHideVal} />
              </div>
            </div>
          </div>
        </div>

      </Container>
    </>
  )
}

export default SearchDueFees
