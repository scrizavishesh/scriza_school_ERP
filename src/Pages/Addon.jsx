import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { deleteSpeFeaByidApi, getAllSpeFeatApi, getSpeFeaByIdApi, updateSpeFeaNameApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';

const ContainerCSS = styled.div`

.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  
  .table-striped>tbody>tr:nth-of-type(odd)>* {
      --bs-table-bg-type: var(--tableGreyBackgroundColor);
  }

  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .eventablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
  }

  .greyText{
    color: var(--greyInputTextColor);
  }

  .successText{
    color: var(--darkGreenBorderColor);
  }

  .form-control, .form-select{
    box-shadow: none !important;
    border: 1px solid var(--greyInputborderColor);
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

  .form-check-input{
    box-shadow: none ;
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
    margin-top: -6px;
  }


`;

const Addon = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [EditFeatureWarn, setEditFeatureWarn] = useState(true);
  
  const [EditFeatureId, setEditFeatureId] = useState('');
  const [deletFeatureId, setdeletFeatureId] = useState('');
  const [newFeatureName, setNewFeatureName] = useState('');
  const [newFeatureNameError, setNewFeatureNameError] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [allSpeFeature, setAllSpeFeature] = useState([]);
  const [searchKeyData, setSearchKeyData] = useState('');

  // Pagination

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);


  useEffect(() => {
    getAllSpecialFeature();
  }, [token, pageNo])

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getAllSpecialFeature = async () => {
    try {
      setloaderState(true);
      var response = await getAllSpeFeatApi(searchKeyData, pageNo, pageSize);
      console.log(response, 'feathdbfvghjendvfrd')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllSpeFeature(response?.data?.addons);
          setCurrentPage(response?.data?.currentPage)
          setTotalPages(response?.data?.totalPages)
          setTimeout(() => {
            setDeleteWarning(true);
            setEditFeatureWarn(true);
          }, 1200);
          // toast.success(response?.data?.message)
        }
        else{
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
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

  const UpdateSpeFeaName = async () => {
    try {
      console.log(EditFeatureId, 'feature Id')
      const data = {
        "featureName": newFeatureName
      }
      console.log(data)
      var response = await updateSpeFeaNameApi(EditFeatureId, data);
      if (response?.status === 200) {
        console.log('200')
        if (response?.data?.status === 'success') {
          console.log(response?.data?.message)
          // setEditFeatureWarn(!EditFeatureWarn)
          console.log('success')
          setTimeout(async () => {
            await getAllSpecialFeature();
            // After the table is updated, close the off-canvas
            const offcanvasElement = document.getElementById('Edit_Feature');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
              offcanvas.hide();
            }
          }, 1500);
        }
        else {
          console.log(response?.data?.message)
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch(error) {
      console.log(error)
    }
  }

  const getSpeFeatureById = async(id) => { 
    setEditFeatureId(id)
    try {
      var response = await getSpeFeaByIdApi(id);
      console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setNewFeatureName(response?.data?.features?.featureName);
        }
      }
      else {
        console.log(response?.data?.message);
      }
    }
    catch {

    }
  }

  const deleteSpeFeaById = async (speFeaID) => {
    if (isChecked) {
      try {
        var response = await deleteSpeFeaByidApi(speFeaID);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            // setDeleteWarning(!DeleteWarning)
            toast.success(response?.data?.message)
            setTimeout( async() => (
              await getAllSpecialFeature()
            ), 1000);


            // After the table is updated, close the off-canvas
            const offcanvasElement = document.getElementById('Delete_staticBackdrop');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            offcanvas.hide();
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

  const updatingFeatureName = (e) => {
    setNewFeatureName(e)
    setNewFeatureNameError(validateTextFields(e))
  }


  const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

  const validateTextFields = (value) => {
    if (!value.trim()) {
      return '*This Field is required';
    } else if (!textAlphaRegex.test(value)) {
      return 'Invalid characters in name !!';
    }
    return '';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace'){
      getAllSchoolData();
    }
  };



  return (
    <>
      <ContainerCSS>
        { loaderState && ( <DataLoader /> ) }
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-2">
            <div className="col-lg-7 col-md-4 col-sm-12 flex-grow-1">
              <div className="row">
                <nav className='breadcrumnav' aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                    <li className="breadcrumb-item active greenText" aria-current="page"><h2> Features</h2></li>
                  </ol>
                </nav>
              </div>
              <div className="row mb-3 for-margin-top"><h2>Manage Feature</h2></div>
            </div>
            <div className="col-lg-5 col-md-8 col-sm-12 mb-lg-0 mb-md-0 mb-3">
              <div className="row">
                <div className="col-md-9 col-sm-6 col-8">
                  <div className="d-flex">
                    <input className="form-control formcontrolsearch" type="text" placeholder="Search" onChange={(e) => setSearchKeyData(e.target.value)} onKeyDown={handleKeyDown} />
                    <button className="btn searchButtons text-white" type="button" onClick={getAllSpecialFeature}><h2>Search</h2></button>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-4">
                  <div className="row">
                  <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addAddons'><h2 className='textVerticalCenter'>+ ADD Feature</h2></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="row ps-2 pe-2">
            <div className="overflow-scroll cardradius bg-white p-3">
              {allSpeFeature.length > 0 ? 
                <>
                  <table className="table align-middle table-striped">
                    <thead>
                      <tr>
                        <th><h2>#</h2></th>
                        <th><h2>Feature Name</h2></th>
                        <th className='text-center'><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                        <th className='text-end'><h2>Action</h2></th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSpeFeature.map((item, index) => (
                        <tr key={item.planFeatureId}>
                          <th className='greyText'><h3>{index + 1}</h3></th>{/*  + (pageNo - 1) * pageSize */}
                          <td className='greyText'><h3>{item.featureName}</h3></td>
                          <td className='text-center'>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                          <td className='text-end'>
                            <div className="dropdown">
                              <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <span>Action</span>
                              </button>
                              <ul className="dropdown-menu">
                                <li className='p-0'>
                                  <button className="dropdown-item greyText font14" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_Feature" aria-controls="Edit_Feature" onClick={() => getSpeFeatureById(item?.planFeatureId)}>
                                    Edit Feature
                                  </button>
                                </li>
                                {/* <li className='p-1'>
                                  <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_feature" aria-controls="Edit_feature" onClick={(e) => getPermBySpeFeaId(item.planFeatureId, item.featureName)}>
                                    Edit Feature
                                  </button>
                                </li> */}
                                {/* <li className='p-1'>
                                  <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setdeletFeatureId(item.planFeatureId)}>
                                    Delete
                                  </button>
                                </li> */}
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
                      <ReactPaginate previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />} nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />} breakLabel={'...'}  breakClassName={'break-me'}  pageCount={totalPages}  marginPagesDisplayed={2}  pageRangeDisplayed={10} onPageChange={handlePageClick}  containerClassName={'pagination'}  subContainerClassName={'pages pagination'}  activeClassName={'active'} />
                    </div>
                  </div>
                </>
                : 
                <div className='h-100 text-center m-5'>
                  <img src='./images/search.svg' style={{height: '40vh'}}/>
                </div>
              }
            </div>
          </div>

          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_Feature" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Feature Name</h2>
            </div>
            <div className="offcanvas-body p-0">
              { loaderState && ( <DataLoader /> ) }
              <div style={{zIndex:-1}}>
                {EditFeatureWarn
                  ?
                  <>
                    <div className="p-3">
                      <form>
                        <div className="mb-3">
                          <label htmlFor="FeatureName" className="form-label greyText font14">Feature Name</label>
                          <input type="text" className={`form-control p-2 formcontrolinput ${newFeatureNameError ? 'border border-danger' : ''}`} id="FeatureName" value={newFeatureName} onChange={(e) => updatingFeatureName(e.target.value)} />
                          <span className='text-danger'>{newFeatureNameError}</span>
                        </div>
                      </form>
                      <p className='text-center p-3'>
                        <button className='btn updateButtons text-white' onClick={(e) => UpdateSpeFeaName(e)}>Update</button>
                        <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </p>
                    </div>
                  </>
                  :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>Feature Name</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSpecialFeature}>Success</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>
{/* 
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_feature" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Feature Name</h2>
            </div>
            <div className="offcanvas-body p-0">
              <div>
                {EditFeatureWarn
                  ?
                  <>
                    <div>
                      <div className="modalLightBorder d-flex p-2">
                        <div className="p-2"><h3 className='greyText'>Feature Name</h3></div>
                        <div className="ms-auto p-2"><h3 className='successText'>HR Management</h3></div>
                      </div>
                      <div className="p-3">
                        <h3 className='greyText'>Features</h3>
                        {PerDataBySpeFeaId.map((item) => (
                          <>
                            <div className="d-flex mt-3 border p-2">
                              <div className=" flex-grow-1"><h3>{item.perName}</h3></div>
                              <div className=""><h3 onClick={() => removePerBySpeFeaId(item.feaPerId)} style={{ cursor: 'pointer' }}><Icon icon="bitcoin-icons:cross-outline" width="1.5em" height="1.5em" style={{ color: 'black' }} /></h3></div>
                            </div>
                          </>
                        ))}
                        <p className='text-center p-3'>
                          <button className='btn updateButtons text-white' onClick={() => EditFeatureBtnClicked()}>Update</button>
                          <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                        </p>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>Feature Name</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshFeature}>Continue</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div> */}

          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header ps-0 modalHighborder p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <span className="offcanvas-title" id="staticBackdropLabel">School List</span>
            </div>
            <div className="offcanvas-body p-0">
            { loaderState && ( <DataLoader /> ) }
              <div style={{zIndex:-1}}>
                {DeleteWarning
                  ?
                  <>
                    <div className=''>
                      <p className='modalLightBorder p-2'>School List</p>
                      <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
                      <p className='text-center warningHeading'>Are you Sure?</p>
                      <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
                      <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                      <p className='text-center p-3'>
                        <button className='btn deleteButtons text-white' onClick={() => deleteSpeFeaById(deletFeatureId)}>Delete</button>
                        <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                      </p>
                    </div>
                  </>
                  :
                  <>
                    <div >
                      <p className='border-bottom p-3'>School List</p>
                      <div className="">
                        <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
                        <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Deleted</p>
                          <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSpecialFeature}>Success</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          <Toaster />
        </div>
      </ContainerCSS>
    </>
  )
}

export default Addon




















// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { Link } from 'react-router-dom';
// import { Icon } from '@iconify/react';
// import { deletePerByidApi, deleteSpeFeaByidApi, getAllSpeFeatApi, getPermBySpeFeaIdApi, updateSpeFeaNameApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import ReactPaginate from 'react-paginate';

// const ContainerCSS = styled.div`

//   height: 92vh;
//   overflow-y: scroll;
  
//   .table-striped>tbody>tr:nth-of-type(odd)>* {
//       --bs-table-bg-type: var(--tableGreyBackgroundColor);
//   }

//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

//   .eventablerow{
//     background-color: var(--tableGreyBackgroundColor) !important;
//   }

//   .greyText{
//     color: var(--greyInputTextColor);
//   }

//   .successText{
//     color: var(--darkGreenBorderColor);
//   }

//   .form-control, .form-select{
//     box-shadow: none !important;
//     border: 1px solid var(--greyInputborderColor);
//   }

//   .form-control, .form-control::placeholder, .form-select{
//     font-size: var(--font-size-14) !important;
//     color: var(--greyInputTextColor);
    
//   }

//   .form-control, .form-select{
//     background-color: #fff !important;
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }

//   .form-control:focus, .form-select:focus{
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }

//   .form-check-input{
//     box-shadow: none ;
//   }

//   .formdltcheck:checked{
//     background-color: #B50000;
//     border-color: #B50000;
//   }

//   .formEditSpecFeatcheck:checked{
//     background-color: #00A67E;
//     border-color: #00A67E;
//   }
  
//   .modalHighborder{
//     border-bottom: 2px solid var(--modalBorderColor);
//   }

//   .modalLightBorder{
//     border-bottom: 1px solid var(--modalBorderColor);
//   }

//   .correvtSVG{
//     position: relative;
//     width: fit-content ;
//     margin-left: 43% !important;
//     margin-bottom: -16% !important;
//     background-color: #2BB673;
//     width: 73px;
//     height: 73px;
//     align-items: center;
//   }

//   .deleteSVG{
//     position: relative;
//     width: fit-content ;
//     margin-left: 43% !important;
//     margin-bottom: -18% !important;
//     background-color: #fff;
//   }
  
//   .warningHeading{
//     font-size: var(--font-size-20);
//   }

//   .warningText{
//     font-size: var(--font-size-15);
//     line-height: 22px;
//     color: var(--greyInputTextColor) !important;
//   }

//   .textVerticalCenter{
//     line-height: 22px;
//   }
  
//   .form-check-input{
//     width: 18px;
//     height: 18px;
//   }

//   .formcontrolinput{
//     border-radius: 0px !important;
//   }

//   .contbtn{
//     margin-left: 43% !important;
//     margin-top: -20% !important;
//   }

//   .greydiv{
//     background-color: #FBFBFB;
//   }
//   .for-margin-top{
//     margin-top: -6px;
//   }


// `;

// const Addon = () => {

//   const token = localStorage.getItem('token');
//   //loader State
//   const [loaderState, setloaderState] = useState(false);
//   const [DeleteWarning, setDeleteWarning] = useState(true);
//   const [EditFeatureWarn, setEditFeatureWarn] = useState(true);
//   const [EditFeatureWarn, setEditFeatureWarn] = useState(true);
//   const [EditFeatureName, setEditFeatureName] = useState('');
//   const [EditFeatureId, setEditFeatureId] = useState('');
//   const [deletFeatureId, setdeletFeatureId] = useState('');
//   const [newFeatureName, setNewFeatureName] = useState('');
//   const [newFeatureNameError, setNewFeatureNameError] = useState('');
//   const [EditPerNameBySpeFeaId, setEditNamePerBySpeFeaId] = useState('');
//   const [PerDataBySpeFeaId, setPerDataBySpeFeaId] = useState([]);
//   const [isChecked, setIsChecked] = useState(false);
//   const [allSpeFeature, setAllSpeFeature] = useState([]);
//   const [refreshDelete, setRefreshDelete] = useState(false);
//   const [refreshUpdate, setRefreshUpdate] = useState(false);
//   const [refreshFeature, setRefreshFeature] = useState(false);
//   const [searchKeyData, setSearchKeyData] = useState('');
//   const [featureIdd, setFeatureIdd] = useState('');

//   // Pagination

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageNo, setPageNo] = useState(1);
//   const [pageSize, setPageSize] = useState(10);


//   useEffect(() => {
//     getAllSpecialFeature();
//   }, [token, refreshDelete, refreshUpdate, refreshFeature, PerDataBySpeFeaId, pageNo])

//   const handlePageClick = (event) => {
//     setPageNo(event.selected + 1); // as event start from 0 index
//   };

//   const PageRefreshOnDelete = () => {
//     setDeleteWarning(!DeleteWarning);
//     setRefreshDelete(!refreshDelete);
//   }

//   const PageRefreshOnUpdate = () => {
//     setEditFeatureWarn(!EditFeatureWarn)
//     setRefreshUpdate(!refreshUpdate);
//   }

//   const PageRefreshFeature = () => {
//     setEditFeatureWarn(!EditFeatureWarn);
//     setRefreshFeature(!refreshFeature);
//   }

//   const getAllSpecialFeature = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllSpeFeatApi(searchKeyData, pageNo, pageSize);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setAllSpeFeature(response?.data?.addons);
//           setCurrentPage(response?.data?.currentPage)
//           setTotalPages(response?.data?.totalPages)
//           // toast.success(response?.data?.message)
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch {

//     }
//   }

//   const getPermBySpeFeaId = async (FeatureId, FeatureName) => {
//     try {
//       console.log(FeatureId)
//       setFeatureIdd(FeatureId)
//       setEditNamePerBySpeFeaId(FeatureName);
//       var response = await getPermBySpeFeaIdApi(FeatureId);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setPerDataBySpeFeaId(response?.data?.permissions);
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch {

//     }
//   }

//   const UpdateSpeFeaName = async () => {
//     if (validateFields) {
//       try {
//         console.log(EditFeatureId, 'feature Id')
//         const data = {
//           "featureName": newFeatureName !== '' ? newFeatureName : EditFeatureName
//         }
//         console.log(data)
//         var response = await updateSpeFeaNameApi(EditFeatureId, data);
//         if (response?.status === 200) {
//           console.log('200')
//           if (response?.data?.status === 'success') {
//             console.log(response?.data?.message)
//             setEditFeatureWarn(!EditFeatureWarn)
//             console.log('success')
//             setTimeout(() => (
//               window.location.reload()
//             ), 1200);
//             // setPerDataBySpeFeaId(response?.data?.permissions)
//           }
//           else {
//             console.log(response?.data?.message)
//           }
//         }
//         else {
//           console.log(response?.data?.message);
//         }
//       }
//       catch {

//       }
//     }
//   }

//   const removePerBySpeFeaId = async (permId) => {
//     try {
//       var response = await deletePerByidApi(permId);
//       if (response?.status === 200) {
//         if (response.data.status === 'success') {
//           toast.success(response?.data?.message)
//           getPermBySpeFeaId(featureIdd);
//         }
//       }
//       else {
//         toast.error(response?.error);
//       }
//     }
//     catch (error) {
//       console.error('Error during login:', error);
//     }
//   }

//   const deleteSpeFeaById = async (speFeaID) => {
//     if (isChecked) {
//       try {
//         var response = await deleteSpeFeaByidApi(speFeaID);
//         if (response?.status === 200) {
//           if (response.data.status === 'success') {
//             setDeleteWarning(!DeleteWarning)
//             toast.success(response?.data?.message)
//             setTimeout(() => (
//               window.location.reload()
//             ), 1200);
//           }
//         }
//         else {
//           toast.error(response?.error);
//         }
//       }
//       catch (error) {
//         console.error('Error during login:', error);
//       }
//     }
//   }

//   const EditFeatureBtnClicked = () => {
//     setEditFeatureWarn(!EditFeatureWarn)
//   }

//   const updatingFeatureName = (e) => {
//     setNewFeatureName(e)
//     setNewFeatureNameError(validateTextFields(e))
//   }


//   const validateFields = () => {
//     let isValid = true;

//     if (!statuss) {
//       setStatusError('* Status is required');
//       isValid = false;
//     } else {
//       setStatusError('');
//     }

//     return isValid;
//   };

//   const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

//   const validateTextFields = (value) => {
//     if (!value.trim()) {
//       return '*This Field is required';
//     } else if (!textAlphaRegex.test(value)) {
//       return 'Invalid characters in name !!';
//     }
//     return '';
//   };


//   return (
//     <>
//       <ContainerCSS>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <div className="col-lg-7 col-md-8 col-sm-12 flex-frow-1">
//               <div className="row">
//                 <nav className='breadcrumnav' aria-label="breadcrumb">
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h3>Home &gt; </h3></Link></li>
//                     <li className="breadcrumb-item active greenText" aria-current="page"><h3> Features</h3></li>
//                   </ol>
//                 </nav>
//               </div>
//               <div className="row mb-3 for-margin-top"><h2>Manage Feature</h2></div>
//             </div>
//             <div className="col-lg-5 col-md-8 col-sm-12">
//               <div className="row">
//                 <div className="col-md-9 col-sm-6">
//                   <div className="row">
//                     <form className="d-flex h-100" role="search">
//                       <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchKeyData(e.target.value)} />
//                       <button className="btn searchButtons text-white" type="button" onClick={getAllSpecialFeature}><h2>Search</h2></button>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="col-md-3 col-sm-6 text-end">
//                   <div className="row">
//                     <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addAddons'><h2 className='textVerticalCenter'>+ ADD Feature</h2></Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row ps-2 pe-2">
//             <div className="overflow-scroll cardradius bg-white p-3">
//               <table className="table align-middle table-striped">
//                 <thead>

//                   <tr>
//                     <th><h2>#</h2></th>
//                     <th><h2>Feature Name</h2></th>
//                     {/* <th><h2>Feature</h2></th> */}
//                     <th className='text-center'><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
//                     <th className='text-end'><h2>Action</h2></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {allSpeFeature.map((item, index) => (
//                     <tr key={item.planFeatureId}>
//                       <th className='greyText'><h3>{index + 1}</h3></th>
//                       <td className='greyText'><h3>{item.featureName}</h3></td>
//                       {/* <td className='greyText'><h3>{item.feaPermission.map(permission => permission.perName).join(', ')}</h3></td> */}
//                       <td className='text-center'>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
//                       <td className='text-end'>
//                         <div className="dropdown">
//                           <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                             <span>Action</span>
//                           </button>
//                           <ul className="dropdown-menu">
//                             {/* <li className='p-1'>
//                                 <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_addon" aria-controls="Edit_addon">
//                                   Edit Addon
//                                 </button>
//                               </li> */}
//                             <li className='p-1'>
//                               <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_Feature" aria-controls="Edit_Feature" onClick={(e) => { setEditFeatureName(item.featureName), setEditFeatureId(item.planFeatureId) }}>
//                                 Edit Feature
//                               </button>
//                             </li>
//                             <li className='p-1'>
//                               <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_feature" aria-controls="Edit_feature" onClick={(e) => getPermBySpeFeaId(item.planFeatureId, item.featureName)}>
//                                 Edit Feature
//                               </button>
//                             </li>
//                             <li className='p-1'>
//                               {/* <button className="dropdown-item" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Delete</button> */}
//                               <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => setdeletFeatureId(item.planFeatureId)}>
//                                 Delete
//                               </button>
//                             </li>
//                           </ul>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>

//               <div className="d-flex">
//                 <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
//                 <div className="ms-auto">
//                   <ReactPaginate
//                     previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
//                     nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
//                     breakLabel={'...'} 
//                     breakClassName={'break-me'} 
//                     pageCount={totalPages} 
//                     marginPagesDisplayed={2} 
//                     pageRangeDisplayed={10}
//                     onPageChange={handlePageClick} 
//                     containerClassName={'pagination'} 
//                     subContainerClassName={'pages pagination'} 
//                     activeClassName={'active'}
//                   />
//                 </div>
//               </div>

//             </div>
//           </div>





//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* 
//           <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_addon" aria-labelledby="staticBackdropLabel">
//             <div className="offcanvas-header modalHighborder p-1">
//               <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                   <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                 </svg>
//               </Link>
//               <h2 className="offcanvas-title" id="staticBackdropLabel">School Edit</h2>
//             </div>
//             <div className="offcanvas-body p-0">
//               <div>
//                 {EditAddonWarn
//                   ? 
//                     <>
//                       <div>
//                         <div className="modalLightBorder d-flex p-2">
//                           <div className="p-2"><h3 className=''>Addon</h3></div>
//                           <div className="ms-auto p-2"><h3 className='orangeText'>HR Management</h3></div>
//                         </div>
//                         <div className="ps-3 pe-3">
//                           <table className="table mt-2">
//                             <thead>
//                               <tr height='40px'>
//                                 <th><small>Details</small></th>
//                                 <th className='text-primary'></th>
//                               </tr>
//                             </thead>
//                             <tbody>
//                             {allSpeFeature.map((item)=>(
//                               <tr height='40px'>
//                                 <td className='eventalerow'><small className='greyText ps-2'>{item.featureName}</small></td>
//                                 <td className='text-end '><small className='p-1 pe-2'><input className="form-check-input formEditSpecFeatcheck" type="checkbox" value="" id="flexCheckChecked"/></small></td>
//                               </tr>
//                             ))}
//                             </tbody>
//                           </table>
//                           <p className='text-center p-3'>
//                             <button className='btn updateButtons text-white' onClick={(e) => EditAddonBtnClicked(item.planFeatureId)}>Update</button>
//                             <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                           </p>
//                         </div>
//                       </div>
//                     </>
//                   :
//                     <>
//                       <div>
//                         <p className='modalLightBorder p-2 mb-0'>Addon</p>
//                         <div className="mt-3  ">
//                           <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                           <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                             <p className='warningHeading'>Successful Updated</p>
//                             <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                           </div>
//                             <button className='btn contbtn continueButtons text-white' onClick={PageRefreshOnUpdate}>Continue</button>
//                         </div>
//                       </div>
//                     </>
//                 }
//               </div>
//           </div>
//           </div> */}


//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}

//           <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_Feature" aria-labelledby="staticBackdropLabel">
//             <div className="offcanvas-header modalHighborder p-1">
//               <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                   <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                 </svg>
//               </Link>
//               <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Feature Name</h2>
//             </div>
//             <div className="offcanvas-body p-0">
//               <div>
//                 {EditFeatureWarn
//                   ?
//                   <>
//                     <div className="p-3">
//                       <form>
//                         <div className="mb-3">
//                           <label htmlFor="FeatureName" className="form-label greyText">Feature Name</label>
//                           <input type="text" className={`form-control p-2 formcontrolinput ${newFeatureNameError ? 'border border-danger' : ''}`} id="FeatureName" defaultValue={EditFeatureName} onChange={(e) => updatingFeatureName(e.target.value)} />
//                           <span className='text-danger'>{newFeatureNameError}</span>
//                         </div>
//                       </form>
//                       <p className='text-center p-3'>
//                         <button className='btn updateButtons text-white' onClick={(e) => UpdateSpeFeaName(e)}>Update</button>
//                         <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                       </p>
//                     </div>
//                   </>
//                   :
//                   <>
//                     <div>
//                       <p className='modalLightBorder p-2 mb-0'>Feature Name</p>
//                       <div className="mt-3  ">
//                         <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                         <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                           <p className='warningHeading'>Successful Updated</p>
//                           <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                         </div>
//                         <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnUpdate}>Continue</button>
//                       </div>
//                     </div>
//                   </>
//                 }
//               </div>
//             </div>
//           </div>


//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}

//           <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_feature" aria-labelledby="staticBackdropLabel">
//             <div className="offcanvas-header modalHighborder p-1">
//               <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                   <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                 </svg>
//               </Link>
//               <h2 className="offcanvas-title" id="staticBackdropLabel">Edit Feature Name</h2>
//             </div>
//             <div className="offcanvas-body p-0">
//               <div>
//                 {EditFeatureWarn
//                   ?
//                   <>
//                     <div>
//                       <div className="modalLightBorder d-flex p-2">
//                         <div className="p-2"><h3 className='greyText'>Feature Name</h3></div>
//                         <div className="ms-auto p-2"><h3 className='successText'>HR Management</h3></div>
//                       </div>
//                       <div className="p-3">
//                         <h3 className='greyText'>Features</h3>
//                         {PerDataBySpeFeaId.map((item) => (
//                           <>
//                             <div className="d-flex mt-3 border p-2">
//                               <div className=" flex-grow-1"><h3>{item.perName}</h3></div>
//                               <div className=""><h3 onClick={() => removePerBySpeFeaId(item.feaPerId)} style={{ cursor: 'pointer' }}><Icon icon="bitcoin-icons:cross-outline" width="1.5em" height="1.5em" style={{ color: 'black' }} /></h3></div>
//                             </div>
//                           </>
//                         ))}
//                         <p className='text-center p-3'>
//                           <button className='btn updateButtons text-white' onClick={() => EditFeatureBtnClicked()}>Update</button>
//                           <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                         </p>
//                       </div>
//                     </div>
//                   </>
//                   :
//                   <>
//                     <div>
//                       <p className='modalLightBorder p-2 mb-0'>Feature Name</p>
//                       <div className="mt-3  ">
//                         <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                         <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                           <p className='warningHeading'>Successful Updated</p>
//                           <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                         </div>
//                         <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshFeature}>Continue</button>
//                       </div>
//                     </div>
//                   </>
//                 }
//               </div>
//             </div>
//           </div>


//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}



//           <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Delete_staticBackdrop" aria-labelledby="staticBackdropLabel">
//             <div className="offcanvas-header ps-0 modalHighborder p-1">
//               <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                   <path fill="#B50000" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                 </svg>
//               </Link>
//               <span className="offcanvas-title" id="staticBackdropLabel">School List</span>
//             </div>
//             <div className="offcanvas-body p-0">
//               <div>
//                 {DeleteWarning
//                   ?
//                   <>
//                     <div className=''>
//                       <p className='modalLightBorder p-2'>School List</p>
//                       <p className='text-center p-3'> <img src="./images/errorI.svg" className='img-fluid' alt="" /></p>
//                       <p className='text-center warningHeading'>Are you Sure?</p>
//                       <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the Profile Data</p>
//                       <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
//                       <p className='text-center p-3'>
//                         <button className='btn deleteButtons text-white' onClick={() => deleteSpeFeaById(deletFeatureId)}>Delete</button>
//                         <button className='btn dltcancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                       </p>
//                     </div>
//                   </>
//                   :
//                   <>
//                     <div >
//                       <p className='border-bottom p-3'>School List</p>
//                       <div className="">
//                         <div className='deleteSVG border border-2 p-4 rounded-circle'><img src="./images/deleteicon.svg" alt="" /></div>
//                         <div className="deletetext border m-4 border-2 greydiv ms-5 rounded-3 text-center greyText p-5">
//                           <p className='warningHeading'>Successful Deleted</p>
//                           <p className='greyText warningText pt-2'>Your data has been<br />Successfully Delete</p>
//                         </div>
//                         <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnDelete}>Continue</button>
//                       </div>
//                     </div>
//                   </>
//                 }
//               </div>
//             </div>
//           </div>

//           <Toaster />
//         </div>
//       </ContainerCSS>
//     </>
//   )
// }

// export default Addon
