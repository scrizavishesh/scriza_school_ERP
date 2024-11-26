import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { deletePlanApi, getAllActiveInActiveSpeFeatApi, getAllPlanApi, updateSpecialFeatureInSchoolApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { Icon } from '@iconify/react';
import AddPackage from '../Modals/AddPackage';
import UpdatePackage from '../Modals/UpdatePackage';

const ContainerCSS = styled.div`
  height: 92vh;
  overflow: scroll;
  
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }
  
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }


  .form-control, .form-select{
    box-shadow: none !important;
    border: 1px solid var(--greyInputborderColor);
  }

  .formdltcheck:checked{
    background-color: #B50000;
    border-color: #B50000;
  }

  .formEditSpecFeatcheck:checked{
    background-color: #00A67E;
    border-color: #00A67E;
  }

  .modalHighborder{
    border-bottom: 2px solid var(--modalBorderColor);
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
  
  .warningHeading{
    font-size: var(--font-size-20);
  }

  .warningText{
    font-size: var(--font-size-15);
    line-height: 22px;
    color: var(--greyInputTextColor) !important;
  }

  .textVerticalCenter{
    line-height: 22px;
  }
  
  .form-check-input{
    width: 18px;
    height: 18px;
  }

  .formcontrolinput{
    border-radius: 0px !important;
  }

  .contbtn{
    margin-left: 43% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -11px;
    /* margin-left: 0.4px; */
  }


  .form-control, .form-control::placeholder, .form-select{
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
    
  }

  .form-control, .form-select{
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus{
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }


`;

const Packages = () => {

  const navigate = useNavigate();

  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [AllPlan, setAllPlan] = useState([]);
  const [FeaturePackData, setFeaturePackData] = useState([]);
  const [allActiveInActiveSpeFeature, SetAllActiveInActiveSpeFeature] = useState([]);

  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [SpecialFeatureWarning, setSpecialFeatureWarning] = useState(true);
  const [UpdateSpecialFeatureWarning, setUpdateSpecialFeatureWarning] = useState(true);

  const [isCheckedFeature, setIsCheckedFeature] = useState([]);
  const [addFeature, setAddFeature] = useState([]);
  const [removeFeature, setRemoveFeature] = useState([]);
  const [currentSchoolPlanId, setCurrentSchoolPlanId] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [deletePlanId, setDeletePlanId] = useState(false);
  const [updatePlanId, setUpdatePlanId] = useState('');
  const [searchKeyData, setSearchKeyData] = useState('');

  const [addCanvasClosing, setAddCanvasClosing] = useState(false)
  const [editCanvasClosing, setEditCanvasClosing] = useState(false)

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);



  useEffect(() => {
    getAllPlans();
  }, [pageNo, addCanvasClosing, editCanvasClosing, DeleteWarning, SpecialFeatureWarning])

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getAllPlans = async () => {
    try {
      setloaderState(true);
      console.log(pageNo, 'current')
      var response = await getAllPlanApi(searchKeyData, pageNo, pageSize);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllPlan(response?.data?.plans);
          setCurrentPage(response?.data?.currentPage)
          setTotalPages(response?.data?.totalPages)
          setTotalItems(response?.data?.totalItems)

          if (DeleteWarning) {
            const offcanvasElement = document.getElementById('Delete_staticBackdrop');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
            }
          }

          if (SpecialFeatureWarning) {
            const offcanvasElement = document.getElementById('SpeFeature_staticBackdrop');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
            }
          }

          if (addCanvasClosing) {
            const offcanvasElement = document.getElementById('AddPackageCanvas');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
            }
          }

          if (editCanvasClosing) {
            const offcanvasElement = document.getElementById('Edit_staticBackdrop');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
            }
          }

          setTimeout(() => {
            setDeleteWarning(true);
            setSpecialFeatureWarning(true);
          }, 2000);
          // toast.success(response?.data?.message)
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const DeletePlanIdData = async (id) => {
    if (isChecked) {
      try {
        var response = await deletePlanApi(id);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            // setDeleteWarning(!DeleteWarning)
            toast.success(response?.data?.message)
            setTimeout(() => (
              getAllPlans()
            ), 1000);
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



  const getAllActiveInActiveSpeFeat = async () => {
    setUpdateSpecialFeatureWarning(false);
    try {
      var response = await getAllActiveInActiveSpeFeatApi(currentSchoolPlanId);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          console.log(response)
          SetAllActiveInActiveSpeFeature(response?.data?.features);
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log(error, 'catch 1')
    }
  }


  const getAllSpecialFeature = async (planIdd) => {
    try {
      setCurrentSchoolPlanId(planIdd);
      var response = await getAllActiveInActiveSpeFeatApi(planIdd);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          // toast.success(response?.data?.message)
          SetAllActiveInActiveSpeFeature(response?.data?.features);
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch {
      console.log(error)
    }
  }

  const UpdateFeatureInPlan = async () => {
    setloaderState(true)
    try {
      const data = {
        "addFeature": addFeature,
        "removeFeature": removeFeature
      }
      console.log('3rd', data)
      var response = await updateSpecialFeatureInSchoolApi(currentSchoolPlanId, data);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false)
          // setUpadteSpeFeature(response?.data?.addons);
          toast.success(response?.data?.message);
          setTimeout(async () => (
            await getAllPlans()
          ), 1200)
        }
        else {
          setloaderState(false)
          toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false)
        toast.error(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false)
      console.log(error, 'error while adding')
    }

  }

  const handleCheckboxChange = (featureId) => {
    setIsCheckedFeature((prev) => {
      const isChecked = prev.includes(featureId);

      if (isChecked) {
        setAddFeature((prev) => prev.filter((id) => id !== featureId));
        setRemoveFeature((prev) => [...new Set([...prev, featureId])]);
        return prev.filter((id) => id !== featureId);
      } else {
        setAddFeature((prev) => [...new Set([...prev, featureId])]);
        setRemoveFeature((prev) => prev.filter((id) => id !== featureId));
        return [...prev, featureId];
      }
    });
  };

  const handleClosingAddCanvas = () => {
    setAddCanvasClosing(true)
  }

  const handleClosingEditCanvas = () => {
    setEditCanvasClosing(true)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace'){
      getAllSchoolData();
    }
  };


  return (
    <>
      <ContainerCSS>
        {
          loaderState && (
            <DataLoader />
          )
        }
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-2">
            <div className="col-lg-7 col-md-4 col-sm-12 flex-grow-1">
              <div className="row">
                <nav className='breadcrumnav' aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                    <li className="breadcrumb-item active greenText" aria-current="page"><h2>Package</h2></li>
                  </ol>
                </nav>
              </div>
              <div className="row mb-3 for-margin-top"><h2>Manage Package</h2></div>
            </div>
            <div className="col-lg-5 col-md-8 col-sm-12 mb-lg-0 mb-md-0 mb-3">
              <div className="row">
                <div className="col-md-9 col-sm-6 col-8">
                  <div className="d-flex">
                    <input className="form-control formcontrolsearch" type="text" placeholder="Search" onChange={(e) => setSearchKeyData(e.target.value)} onKeyDown={handleKeyDown} />
                    <button className="btn searchButtons text-white" type="button" onClick={getAllPlans}><h2>Search</h2></button>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-4">
                  <div className="row">
                  <Link className="btn ps-0 pe-0 addButtons2 text-white" type="submit" data-bs-toggle="offcanvas" data-bs-target="#AddPackageCanvas" aria-controls="AddPackageCanvas"><h3 className='textVerticalCenter'>+ ADD Packages</h3></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row ps-2 pe-2">
            <div className=" cardradius bg-white p-3">  {/* overflow-scroll */}
              {AllPlan.length > 0 ?
                <>
                  <table className="table align-middle table-striped">
                    <thead>
                      <tr>
                        <th><h2>#</h2></th>
                        <th><h2>Package</h2></th>
                        <th><h2>Price <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Interval <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Period <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Student Limit <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Feature Details</h2></th>
                        <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th><h2>Action</h2></th>
                      </tr>
                    </thead>
                    <tbody>
                      {AllPlan.map((item, index) => (
                        <tr key={item.planId} className={`my-bg-color align-middle`}>
                          <th className='greyText'><h3>{index + 1}</h3></th>
                          <td className='greyText'><h3>{item.planName}</h3></td>
                          <td className='greyText'><h3>{item.price}</h3></td>
                          <td className='greyText'><h3>{item.type}</h3></td>
                          <td className='greyText'><h3>{item.value}</h3></td>
                          <td className='greyText'><h3>{item.studentLimit}</h3></td>
                          <td><h3>{(item.usedAddons).length > 0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#FeatureModal" style={{ cursor: 'pointer' }} onClick={(e) => setFeaturePackData(item.usedAddons)}>View Linked Features</span> : <span className='blueText text-decoration-none text-center'>---</span>}</h3></td>
                          <td>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                          <td>
                            <div className="dropdown dropdownbtn">
                              <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>Action</span>
                              </button>
                              <ul className="dropdown-menu" style={{ zIndex: '99999' }}>
                                <li>
                                  <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => setUpdatePlanId(item.planId)}>
                                    Edit Package
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#SpeFeature_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => getAllSpecialFeature(item.planId)}>
                                    Link Features
                                  </button>
                                </li>
                                <li>
                                  <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeletePlanId(item.planId)}>
                                    Delete
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex">
                    <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                    <div className="ms-auto">
                      <ReactPaginate previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />} nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />} breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10} onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'} />
                    </div>
                  </div>
                </>
                :
                <div className='h-100 text-center m-5'>
                  <img src='./images/search.svg' style={{ height: '40vh' }} />
                </div>
              }
            </div>
          </div>
          {/* <div className="row ps-2 pe-2">
            <div className="overflow-scroll cardradius bg-white p-3">
              <table className="table align-middle table-striped">
                <thead>
                  <tr>
                    <th><h2>#</h2></th>
                    <th><h2>Package</h2></th>
                    <th><h2>Price <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Interval <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Period <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Student Limit <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Feature Details</h2></th>
                    <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Action</h2></th>
                  </tr>
                </thead>
                <tbody>
                  {AllPlan.map((item, index) => (
                    <tr key={item.planId} className={`my-bg-color align-middle`}>
                      <th className='greyText'><h3>{index + 1}</h3></th>
                      <td className='greyText'><h3>{item.planName}</h3></td>
                      <td className='greyText'><h3>{item.price}</h3></td>
                      <td className='greyText'><h3>{item.type}</h3></td>
                      <td className='greyText'><h3>{item.value}</h3></td>
                      <td className='greyText'><h3>{item.studentLimit}</h3></td>
                      <td><h3>{(item.usedAddons).length > 0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#FeatureModal" style={{ cursor: 'pointer' }} onClick={(e) => setFeaturePackData(item.usedAddons)}>View Linked Features</span> : <span className='blueText text-decoration-none text-center'>---</span>}</h3></td>
                      <td>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                      <td>
                        <div className="dropdown dropdownbtn">
                          <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Action</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li>
                              <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => setUpdatePlanId(item.planId)}>
                                Edit Package
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#SpeFeature_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => getAllSpecialFeature(item.planId)}>
                                Link Features
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setDeletePlanId(item.planId)}>
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="d-flex">
                <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                <div className="ms-auto">
                  <ReactPaginate previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />} nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />} breakLabel={'...'} totalItems={totalItems} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10} onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'} />
                </div>
              </div>

            </div>
          </div> */}

          {/* Add Package */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="AddPackageCanvas" aria-labelledby="AddPackageCanvas">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Add Package</h2>
            </div>
            <div className="offcanvas-body p-1">
              {loaderState && (<DataLoader />)}
              <div style={{ zIndex: -1 }}>
                <AddPackage closingOfAddCanvas={handleClosingAddCanvas} />
              </div>
            </div>
          </div>

          {/* Edit Package */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Package</h2>
            </div>
            <div className="offcanvas-body p-0">
              {loaderState && (<DataLoader />)}
              <div style={{ zIndex: -1 }}>
                <UpdatePackage planId={updatePlanId} closingEditCanvas={handleClosingEditCanvas} />
              </div>
            </div>
          </div>

          {/* Delete Package */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header ps-0 modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <span className="offcanvas-title" id="staticBackdropLabel">Packages</span>
            </div>
            <div className="offcanvas-body p-0">
              {loaderState && (<DataLoader />)}
              <div style={{ zIndex: -1 }}>
                {DeleteWarning
                  ?
                  <>
                    <div className=''>
                      <p className='modalLightBorder p-2'>Packages</p>
                      <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                      <p className='text-center warningHeading'>Are you Sure?</p>
                      <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                      <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                      <p className='text-center p-3'>
                        <button className='btn deleteButtons text-white' onClick={() => DeletePlanIdData(deletePlanId)}>Delete</button>
                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </p>
                    </div>
                  </>
                  :
                  <>
                    <div >
                      <p className='border-bottom p-3'>Packages</p>
                      <div className="">
                        <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                        <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Deleted</p>
                          <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllPlans}>Continue</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>

          </div>

          {/* Add Feature to Package */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="SpeFeature_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Special Features Details</h2>
            </div>
            <div className="offcanvas-body p-0">
              {loaderState && (<DataLoader />)}
              <div style={{ zIndex: -1 }}>
                {SpecialFeatureWarning
                  ?

                  <>
                    {UpdateSpecialFeatureWarning ? (
                      <>
                        <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                        <div className="ps-3 pe-3">
                          <table className="table table-striped mt-2">
                            <thead>
                              <tr height='40px'>
                                <th><h2>Details</h2></th>
                                <td className='text-end'>
                                  <Link className='greenText text-decoration-none' onClick={getAllActiveInActiveSpeFeat}>
                                    <h2>Add Features</h2>
                                  </Link>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              {allActiveInActiveSpeFeature.map((item, index) => (
                                <tr height='40px' key={index}>
                                  <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
                                  <td className='text-end'>
                                    {item?.planStatus ? (
                                      <h3 className='p-1 pe-2'>
                                        <Icon icon="simple-icons:ticktick" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
                                      </h3>
                                    ) : (
                                      <h3 className='ps-3'>---</h3>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className='text-center p-3'>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Back</button>
                          </p>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                        <div className="ps-3 pe-3">
                          <table className="table table-striped mt-2">
                            <thead>
                              <tr height='40px'>
                                <th><h2>Details</h2></th>
                                <td className='greenText'></td>
                              </tr>
                            </thead>
                            <tbody>
                              {allActiveInActiveSpeFeature.map((item, index) => (
                                <tr height='40px' key={index}>
                                  <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
                                  <td className='text-end'>
                                    {item?.planStatus ? (
                                      <h3 className='p-1 pe-1'>
                                        <Icon icon="ion:checkbox" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
                                      </h3>
                                    ) : (
                                      <h3 onClick={() => handleCheckboxChange(item.planFeatureId)}>
                                        {isCheckedFeature.includes(item.planFeatureId) ? (
                                          <p className='p-1 pe-1'>
                                            <Icon icon="ion:checkbox" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
                                          </p>
                                        ) : (
                                          <Icon icon="bxs:checkbox" width="2.1em" height="2.1em" style={{ color: '#fff', cursor: 'pointer' }} />
                                        )}
                                      </h3>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <p className='text-center p-3'>
                            <button className='btn updateButtons text-white' onClick={UpdateFeatureInPlan}>Update</button>
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllPlans}>Cancel</button>
                          </p>
                        </div>
                      </>
                    )}
                  </>

                  :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>Special Features</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllPlans}>Continue</button>
                      </div>
                    </div>
                  </>

                }

              </div>
            </div>
          </div>

          {/* View Feature Package */}
          <div className="modal fade" id="FeatureModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header pb-2">
                  <h1 className="modal-title font16" id="exampleModalLabel">Special Features</h1>
                  <button type="button" className="btn-close btn-sm" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <table className="table align-middle">
                    <thead>
                      <tr>
                        <th className='font14'>S.No</th>
                        <th className='font14'>Feature Name</th>
                        <th className='font14'>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FeaturePackData.map((item, index) => (
                        <tr key={item.id} className=' align-middle'>
                          <td><span>{index + 1}.</span></td>
                          <td><span>{item.featureName}</span></td>
                          <td>{item.status ? <span className='activeText'>Active</span> : <span className='deactiveText'>InActive</span>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

        </div>
      </ContainerCSS>
    </>
  )
}

export default Packages
