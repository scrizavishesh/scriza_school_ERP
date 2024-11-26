import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { DownloadFeeGroupExcel, DownloadFeeGroupPDF, deleteFeeGroupByIdApi, getAllFeeGroupApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import AddFeeGroup from '../Modals/FeeGroup/AddFeeGroup';
import EditFeeGroup from '../Modals/FeeGroup/EditFeeGroup';
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
    border-radius: 5px ;
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

const FeesGroup = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [searchByKey, setSearchByKey] = useState('');
  const [feeGroupData, setFeeGroupData] = useState([]);
  const [closeAddCanvas, setCloseAddCanvas] = useState('');
  const [closeEditCanvas, setCloseEditCanvas] = useState('');

  const [DelFeeGroupIdData, setDelFeeGroupIdData] = useState();
  const [EditFeeGroupIdData, setEditFeeGroupIdData] = useState();
  const [isChecked, setIsChecked] = useState(false);
  // CSV State
  const [csvData, setCSVData] = useState([])
  const [PDFResponse, setPDFResponse] = useState()

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    getAllFeeGroupData();
    if (token) {
      DownloadCSV();
      DownloadPDF();
    }
  }, [token, pageNo, pageSize, closeAddCanvas, closeEditCanvas])

  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    const tooltipList = tooltipTriggerList.map(tooltipTriggerEl => new window.bootstrap.Tooltip(tooltipTriggerEl));
    return () => {
      tooltipList.forEach(tooltip => tooltip.dispose());
    };
  }, [feeGroupData]);

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace') {
      getAllStudentData();
    }
  };

  // CSV Download
  const DownloadCSV = async () => {
    try {
      const response = await DownloadFeeGroupExcel();
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
      const response = await DownloadFeeGroupPDF();
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
    link.download = 'Fee Group Data.pdf';
    link.click();
  };

  const handleCloseAddCanvas = () => {
    setCloseAddCanvas(true);
  }

  const handleCloseEditCanvas = () => {
    setCloseEditCanvas(true);
  }

  const getAllFeeGroupData = async () => {
    try {
      setloaderState(true);
      var response = await getAllFeeGroupApi(searchByKey, pageNo, pageSize);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setFeeGroupData(response?.data?.feeGroup);
          setTotalPages(response?.data?.totalPages);
          setCurrentPage(response?.data?.currentPage);


          if (closeAddCanvas) {
            const offcanvasElement = document.getElementById('addFeeGroup');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
              setCloseAddCanvas(false)
            }
          }

          if (closeEditCanvas) {
            const offcanvasElement = document.getElementById('editFeeGroup');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
              setCloseEditCanvas(false)
            }
          }

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

  const DeleteFeeGroupById = async (id) => {
    if (isChecked) {
      try {
        var response = await deleteFeeGroupByIdApi(id);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            toast.success(response?.data?.message)
            getAllFeeGroupData();
            const offcanvasElement = document.getElementById('deleteFeeGroup');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
              setCloseEditCanvas(false)
            }
          }
        }
        else {
          toast.error(response?.error);
        }
      }
      catch (error) {
        console.error('Error during login:', error);
      }
    }
  }

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
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
                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Fees Group</li>
              </ol>
            </nav>
            <p className='font14 ps-0 fontWeight500'>Fees Group Details</p>
          </div>
          <div className="col-xxl-8 col-xl-8 col-lg-12 col-sm-12 pe-0">
            <div className="row gap-sm-0 gap-3">
              <div className="col-xl-5 col-lg-5 col-md-5 col-sm-6 col-12 text-end">
                <div className="row">
                  <div className="col-lg-6 col-sm-6 col-4 text-sm-end text-start ps-0 align-self-center">
                    <CSVLink className="btn ps-2 pe-2 ExportBtns bg-white" type="submit" data={csvData} filename={"Fee Group Data.csv"}>
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
                      <input className="form-control formcontrolsearch font14" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchByKey(e.target.value)} />
                      <button className="btn searchhhButtons text-white " type="button"><span className='font14' onClick={getAllFeeGroupData}>Search</span></button>
                    </form> */}
                    <div className="d-flex">
                      <input className="form-control formcontrolsearch font14" type="text" placeholder="Search" onChange={(e) => setSearchByKey(e.target.value)} onKeyDown={handleKeyDown} />
                      <button className="btn searchhhButtons text-white font14" type="button" onClick={getAllFeeGroupData}><h2>Search</h2></button>
                    </div>
                  </div>
                  <div className="col-md-4 col-sm-12 col-4">
                    <div className="row justify-content-end">
                      <button className="btn addButtons2 text-white font14 textVerticalCenter" type="button" data-bs-toggle="offcanvas" data-bs-target="#addFeeGroup" aria-controls="addFeeGroup">+ Add Fees Group</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <table className="table align-middle table-striped">
              <thead>
                <tr>
                  <th className=''><span className='font14'>#</span></th>
                  <th><span className='font14'>Name</span></th>
                  <th><span className='font14'>Description</span></th>
                  <th className='text-center'><span className='font14'>Action</span></th>
                </tr>
              </thead>
              <tbody>
                {feeGroupData
                  ?
                  feeGroupData.map((item, index) => (
                    <tr key={item.feeGroupId} className='align-middle'>
                      <td className='greyText font14'>{index + 1}</td>
                      <td className='greyText font14'>{item.feeGroupName}</td>
                      <td className='greyText font14'>
                        {(item?.feeDescription).length > 100
                          ?
                          <>
                            <span className='me-2'>
                              {item.feeDescription.substring(0, 120) + "....."}
                            </span>
                            <button className='btn p-0' type='button' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title={item.feeDescription}>
                              <Icon className='' icon="ph:info-fill" width="1.5em" height="1.5em" style={{ color: '#C1C1C1' }} />
                            </button>
                          </>
                          :
                          item.feeDescription
                        }
                      </td>
                      <td className='text-end'>
                        <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#editFeeGroup" aria-controls="editFeeGroup" onClick={() => setEditFeeGroupIdData(item?.feeGroupId)}>
                          <Icon icon="carbon:edit" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                        </button>
                        <button className='btn ps-1 pe-1 text-black text-decoration-none' type='button' data-bs-toggle="offcanvas" data-bs-target="#deleteFeeGroup" aria-controls="deleteFeeGroup" onClick={() => setDelFeeGroupIdData(item?.feeGroupId)}>
                          <Icon icon="mi:delete" width="1.5em" height="1.5em" style={{ color: '#8F8F8F' }} />
                        </button>
                      </td>
                    </tr>
                  ))
                  :
                  <p className='text-danger font14'>No Data Found</p>
                }
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
      </div>


      {/* Add Fee Group */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="addFeeGroup" aria-labelledby="addFeeGroupLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="addFeeGroupLabel">Add Fees Group</h2>
        </div>
        <div className="offcanvas-body p-3">
          {loaderState && (<DataLoader />)}
          <div className="" style={{ zIndex: -1 }}>
            <AddFeeGroup addedSuccess={handleCloseAddCanvas} />
          </div>
        </div>
      </div>


      {/* Edit Fee Group */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="editFeeGroup" aria-labelledby="editFeeGroupLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="editFeeGroupLabel">Edit Fees Group</h2>
        </div>
        <div className="offcanvas-body p-3">
          {loaderState && (<DataLoader />)}
          <div className="" style={{ zIndex: -1 }}>
            <EditFeeGroup EditId={EditFeeGroupIdData} editedSuccess={handleCloseEditCanvas} />
          </div>
        </div>
      </div>


      {/* Delete Fee Group */}
      <div className="offcanvas offcanvas-end p-2" tabIndex="-1" id="deleteFeeGroup" aria-labelledby="deleteFeeGroupeLabel">
        <div className="offcanvas-header border-bottom border-2 p-2">
          <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
              <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
            </svg>
          </Link>
          <h2 className="offcanvas-title" id="deleteFeeGroupeLabel">Delete Fees Group</h2>
        </div>
        <div className="offcanvas-body p-3">
          {loaderState && (<DataLoader />)}
          <div className="" style={{ zIndex: -1 }}>
            <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
            <p className='text-center warningHeading'>Are you Sure?</p>
            <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
            <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" checked={isChecked} id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
            <p className='text-center p-3'>
              <button className='btn deleteButtons text-white' onClick={() => DeleteFeeGroupById(DelFeeGroupIdData)}>Delete</button>
              <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={() => setTimeout(() => { setIsChecked(false) }, 3000)}>Cancel</button>
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default FeesGroup
