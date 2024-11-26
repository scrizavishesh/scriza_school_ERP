import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import toast, { Toaster } from 'react-hot-toast';
import { deleteSchoolApi, getAllActiveInActiveSpeFeatApi, getAllPlanApi, getSchoolDataApi, getSchoolDataByIdApi, updateSchoolApi, updateSpecialFeatureInSchoolApi } from '../Utils/Apis';
import { Icon } from '@iconify/react';
import DataLoader from '../Layouts/Loader';
import ReactPaginate from 'react-paginate';
import { useForm } from 'react-hook-form';

const Container = styled.div`
  
  .scrollHide::-webkit-scrollbar{
    display: none !important;
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

  .oddModaltablerow{
    background-color: var(--tableGreyBackgroundColor) !important;
    border-bottom: 1.5px solid var(--darkGreenBorderColor);
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
    margin-left: 41% !important;
    margin-top: -20% !important;
  }

  .greydiv{
    background-color: #FBFBFB;
  }
  .for-margin-top{
    margin-top: -11px;
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
    color: var(--greyInputTextColor) !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile{
    color: Black;
  }


`;

const AllSchools = () => {

  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  const [schoolData, setSchoolData] = useState([]);
  //loader State
  const [loaderState, setloaderState] = useState(false);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageNo, setPageNo] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [getSchoolIdDataName, setgetSchoolIdDataName] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [deleteSchoolId, setDeleteSchoolId] = useState(false);
  const [allActiveInActiveSpeFeature, SetAllActiveInActiveSpeFeature] = useState([]);
  const [allPlans, setAllPlan] = useState([])
  const [viewFeaturesData, setViewFeaturesData] = useState([])
  const [DeleteWarning, setDeleteWarning] = useState(true);
  const [EditWarning, setEditWarning] = useState(true);
  const [SpecialFeatureWarning, setSpecialFeatureWarning] = useState(true);
  const [UpdateSpecialFeatureWarning, setUpdateSpecialFeatureWarning] = useState(true);
  const [updateSchoolId, setupdateSchoolId] = useState('')
  const [searchKeyData, setSearchKeyData] = useState('');
  const [isCheckedFeature, setIsCheckedFeature] = useState([]);
  const [addFeature, setAddFeature] = useState([]);
  const [removeFeature, setRemoveFeature] = useState([]);
  const [currentSchoolPlanId, setCurrentSchoolPlanId] = useState();
  
  // form validate
  const { register, handleSubmit, formState: { errors }, setValue, values } = useForm({
    mode: 'onChange'
  });

  // const [schoolPhoneById, setSchoolPhoneById] = useState('')

  useEffect(() => {
    getAllSchoolData();
    getAllPlans();

    // if(schoolPhoneById){
    //   setValue( 'schoolPhone', schoolPhoneById )
    // }

  }, [token, currentPage, pageNo])

  const handlePageClick = (event) => {
    setPageNo(event.selected + 1); // as event start from 0 index
  };

  const getAllSchoolData = async () => {
    try {
      setloaderState(true);
      var response = await getSchoolDataApi(searchKeyData, pageNo, pageSize);
      // console.log(response)
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setSchoolData(response?.data?.schools);
          setCurrentPage(response?.data?.currentPage)
          setTotalPages(response?.data?.totalPages)
          setTimeout(() => {
            setDeleteWarning(true);
            setEditWarning(true);
            setUpdateSpecialFeatureWarning(true);
            setSpecialFeatureWarning(true);
          }, 1200);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        console.log(response.data.message)
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

  const getAllPlans = async () => {
    setloaderState(true);
    try {
      const searchKey = ''
      const pageNo = 1
      const size = 10
      var response = await getAllPlanApi(searchKey, pageNo, size);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllPlan(response?.data?.plans);
        }
        else{
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message)
      }
    }
    catch(error) {
      setloaderState(false);
      toast.error(error)
    }
  }

  const getSchoolDataById = async (id) => {
    try {
      setloaderState(true);
      setupdateSchoolId(id)
      var response = await getSchoolDataByIdApi(id);
      // console.log(response, 'school get by id')
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setgetSchoolIdDataName(response?.data?.school?.schoolName);
          setValue('schoolAddress', response?.data?.school?.schoolAddress);
          setValue('schoolPhone', response?.data?.school?.schoolPhone);
          setValue('planId', response?.data?.school?.plans?.planId);
          setValue('status', response?.data?.school?.status);
          // toast.success(response?.data?.message)
          setloaderState(false);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        console.log(response.data.message)
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
    }
  }

  const UpdateFeatureInPlan = async () => {
    setloaderState(true);
    try {
      const data = {
        "addFeature": addFeature,
        "removeFeature": removeFeature
      }
      var response = await updateSpecialFeatureInSchoolApi(currentSchoolPlanId, data);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          // setSpecialFeatureWarning(false);
          setTimeout(async () => {
            await getAllSchoolData();
            // After the table is updated, close the off-canvas
            // const offcanvasElement = document.getElementById('Edit_staticBackdrop');
            // const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            // if (offcanvas) {
            //   offcanvas.hide();
            // }

            const offcanvasElement = document.getElementById('SpeFeature_staticBackdrop');
            if (offcanvasElement) {
              let offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
              if (!offcanvas) {
                offcanvas = new bootstrap.Offcanvas(offcanvasElement);
              }
              offcanvas.hide();
            }

          }, 1500);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        console.log(response.data.message)
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
    }
  }


  const UpdateSchoolByID = async (values) => {
    setloaderState(true);
    try {
      const formData = new FormData();
      formData.append("schoolAddress", values.schoolAddress),
      formData.append("schoolPhone", values.schoolPhone),
      formData.append("planId", values.planId),
      formData.append("status", values.status)
      var response = await updateSchoolApi(updateSchoolId, formData);
      if (response?.status === 200) {
        if (response.data.status === 'success') {
          // setEditWarning(!EditWarning);
          toast.success(response?.data?.message)
          setTimeout(async () => {
            await getAllSchoolData();
            // After the table is updated, close the off-canvas
            const offcanvasElement = document.getElementById('Edit_staticBackdrop');
            const offcanvas = bootstrap.Offcanvas.getInstance(offcanvasElement);
            if (offcanvas) {
              offcanvas.hide();
            }
          }, 1500);
        }
        else {
          setloaderState(false);
        }
      }
      else {
        setloaderState(false);
        console.log(response.data.message)
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error)
    }
  }

  const DeleteSchoolIdData = async (schoolId) => {
    setloaderState(true);
    if (isChecked) {
      try {
        var response = await deleteSchoolApi(schoolId);
        if (response?.status === 200) {
          if (response.data.status === 'success') {
            // setDeleteWarning(!DeleteWarning)
            setloaderState(false);
            toast.success(response?.data?.message)
            setTimeout(() => (
              getAllSchoolData()
            ), 1000);
          }
          else {
            setloaderState(false);
            toast.error(response?.data?.message);
          }
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message);
        }
      }
      catch (error) {
        setloaderState(false);
        console.error('Error during login:', error);
      }
    }
    else {
      setloaderState(false);
      toast.error('Please Agree First !!')
    }
  }


  const getAllActiveInActiveSpeFeat = async () => {
    setloaderState(true);
    setUpdateSpecialFeatureWarning(false);
    try {
      var response = await getAllActiveInActiveSpeFeatApi(currentSchoolPlanId);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          SetAllActiveInActiveSpeFeature(response?.data?.features);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      setloaderState(false);
      console.log(error, 'catch 1')
    }
  }


  const getAllSpecialFeature = async (planIdd) => {
    setloaderState(true);
    try {
      setCurrentSchoolPlanId(planIdd);
      var response = await getAllActiveInActiveSpeFeatApi(planIdd);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          // toast.success(response?.data?.message)
          SetAllActiveInActiveSpeFeature(response?.data?.features);
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

  const handleKeyDown = (e) => {
    if (e.key === 'Backspace'){
      getAllSchoolData();
    }
  };

  return (
    <>
      <Container className='scrollHide'>
        { loaderState && ( <DataLoader /> ) }
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-2">
            <div className="col-lg-7 col-md-4 col-sm-12 flex-grow-1">
              <div className="row">
                <nav className='breadcrumnav' aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                    <li className="breadcrumb-item active greenText" aria-current="page"><h2> Schools</h2></li>
                  </ol>
                </nav>
              </div>
              <div className="row mb-3 for-margin-top"><h2>School List</h2></div>
            </div>
            <div className="col-lg-5 col-md-8 col-sm-12 mb-lg-0 mb-md-0 mb-3">
              <div className="row">
                <div className="col-md-9 col-sm-6 col-8">
                  <div className="d-flex">
                    <input className="form-control formcontrolsearch" type="text" placeholder="Search" onChange={(e) => setSearchKeyData(e.target.value)} onKeyDown={handleKeyDown} />
                    <button className="btn searchButtons text-white" type="button" onClick={getAllSchoolData}><h2>Search</h2></button>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-4">
                  <div className="row">
                    <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addSchoolsPage'><h2 className='textVerticalCenter'>+ ADD Schools</h2></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* School Data Table */}
          
          <div className="row ps-2 pe-2">
            <div className="overflow-scroll cardradius bg-white p-3">
              <table className="table align-middle overflow-scroll table-striped">
                <thead>
                  <tr>
                    <th><h2>#</h2></th>
                    <th><h2>School name</h2></th>
                    <th><h2>Address</h2></th>
                    <th><h2>Phone</h2></th>
                    <th><h2>Package <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th className='bolddText'><h2>Spe. Features</h2></th>
                    <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
                    <th><h2>Action</h2></th>
                  </tr>
                </thead>
                <tbody>
                  {schoolData.map((item, index) => (
                    <tr key={item.id} className='my-bg-color align-middle'>
                      <th className='greyText'><h3>{index + 1}</h3></th>
                      <td className='greyText'><h3>{item.schoolName}</h3></td>
                      <td className='greyText'><h3>{item.schoolAddress}</h3></td>
                      <td className='greyText'><h3>{item.schoolPhone}</h3></td>
                      <td className='greyText'><h3>{item.plans.planName}</h3></td>
                      <td><h3>{(item.plans.usedAddons).length > 0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#specialFeaturesModal" style={{ cursor: 'pointer' }} onClick={(e) => setViewFeaturesData(item.plans.usedAddons)}>View Features</span> : <span className='blueText text-decoration-none text-center' style={{ cursor: 'pointer' }}>---</span>}</h3></td>
                      <td>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                      <td>
                        <div className="dropdown dropdownbtn">
                          <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <span>Action</span>
                          </button>
                          <ul className="dropdown-menu">
                            <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getSchoolDataById(item.schoolBusinessId)}> Edit </button> </li>
                            <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#SpeFeature_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => getAllSpecialFeature(item.plans.planId)}> Spe. Features </button> </li>
                            {/* <li> <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.schoolBusinessId)}> Delete </button> </li> */}
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

          {/* Edit School */}
          <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
            <div className="offcanvas-header border-bottom border-2 p-1">
              <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
                  <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
                </svg>
              </Link>
              <h2 className="offcanvas-title" id="staticBackdropLabel">School Edit</h2>
            </div>
            <div className="offcanvas-body p-0">
            { loaderState && ( <DataLoader /> ) }
              <div style={{zIndex:-1}}>
                {EditWarning
                  ?
                  <>
                    <div>
                      <p className='modalLightBorder orangeText p-2'>{getSchoolIdDataName}</p>
                      <div className="p-3">
                        <form onSubmit={handleSubmit(UpdateSchoolByID)}>
                          <div className="mb-3">
                            <label htmlFor="exampleInputAdd1" className='form-label font14'>Address</label>
                            <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="Enter School Address"
                              {...register('schoolAddress', {
                                required: 'School Address is required *',
                                minLength: { value: 5, message: 'Minimum length is 5 characters !!' }
                              })}
                            />
                            {errors.schoolAddress && <p className="pt-2 font12 text-danger">{errors.schoolAddress.message}</p>}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputphone1" className='form-label font14'>Phone Number</label>
                            <input id="schoolPhone" type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number"
                              {...register('schoolPhone', {
                                required: 'School Phone Number is required',
                                validate: value => {
                                  if (!/^[6-9][0-9]{3}/.test(value)) {
                                    return 'Phone number must start with digits between 6 and 9';
                                  }
                                  if (!/^[0-9]*$/.test(value)) {
                                    return 'Invalid character in phone number. Please enter only digits';
                                  }
                                  if (value.length < 10) {
                                    return 'Phone number must be of minimum 10 digits';
                                  }
                                  if (value.length > 10) {
                                    return 'Phone number can be of maximum 10 digits';
                                  }
                                  return true;
                                }
                              })}
                            />
                            {/* <PhoneInput country={'in'} inputProps={{ name: 'schoolPhone', required: true, autoFocus: true, id:'schoolPhone' }} containerClass='react-tel-input' placeholder="Enter Phone Number"
                              inputStyle={{ width: '100%', backgroundColor: '#fff', color: '#000', borderColor: '#dee2e6', borderRadius: '0px', paddingLeft: '14%', paddingTop: '1.8px', paddingBottom: '1.8px', fontSize: '14px', }}
                              buttonStyle={{ borderColor: '#dee2e6', borderRight: 'none' }}
                              dropdownStyle={{ fontSize: '14px' }} 
                              value={schoolPhoneById}                             
                              onChange={(value) => {register('schoolPhone').onChange(value); setSchoolPhoneById(value)}}
                            /> */}
                            {errors.schoolPhone && <p className="pt-2 font12 text-danger">{errors.schoolPhone.message}</p>}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className='form-label font14'>Package</label>
                            <select id="planId" className={`form-select font14 ${errors.planId ? 'border-danger' : ''}`} {...register('planId', { required: 'Package selection is required' })} >
                              <option value="">Select Package</option>
                              {allPlans.map((plan) => (<option key={plan.planId} value={plan.planId}> {plan.planName} </option>))}
                            </select>
                            {errors.planId && <p className="pt-2 font12 text-danger">{errors.planId.message}</p>}
                          </div>
                          <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className='form-label font14'>Status</label>
                            <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status selection is required' })} >
                              <option value="">Select Status</option>
                              <option value={true}>Active</option>
                              <option value={false}>Inactive</option>
                            </select>
                            {errors.status && <p className="pt-2 font12 text-danger">{errors.status.message}</p>}
                          </div>
                        <p className='text-center p-3'>
                          <button className='btn updateButtons text-white' type='submit' >Update</button>
                          <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSchoolData}>Cancel</button>
                        </p>
                        </form>
                      </div>
                    </div>
                  </>
                  :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>School List</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Success</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          {/* Edit Special Feature */}
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
            { loaderState && ( <DataLoader /> ) }
              <div style={{zIndex:-1}}>
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
                            <button className='btn cancelButtons ms-3' onClick={getAllSchoolData}>Back</button>
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
                            <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSchoolData}>Cancel</button>
                          </p>
                        </div>
                      </>
                    )}
                  </>
                  :
                  <>
                    <div>
                      <p className='modalLightBorder p-2 mb-0'>School List</p>
                      <div className="mt-3  ">
                        <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                        <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                          <p className='warningHeading'>Successful Updated</p>
                          <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                        </div>
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSchoolData}>Continue</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          {/* Delete */}
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
                      <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the School Data</p>
                      <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
                      <p className='text-center p-3'>
                        <button className='btn deleteButtons text-white' onClick={() => DeleteSchoolIdData(deleteSchoolId)}>Delete</button>
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
                        <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Success</button>
                      </div>
                    </div>
                  </>
                }
              </div>
            </div>
          </div>

          {/* Display Special Features */}
          <div className="modal fade" id="specialFeaturesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">Special Features</h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                      {viewFeaturesData.map((item, index) => (
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

          <Toaster />
        </div>
      </Container>
    </>
  )
}

export default AllSchools

















                  {/* <div className="row">
                    <form className="d-flex" role="search">
                      <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchKeyData(e.target.value)} />
                      <button className="btn searchButtons text-white" type="button" onClick={getAllSchoolData}><h2>Search</h2></button>
                    </form>
                  </div> */}
  
// const [newValue, setNewValue] = useState('');

// const handleKeyDown = (e) => {
//   if (e.key === 'Backspace' || searchKeyData.length === 1 ) {
//     // const previousValue = searchKeyData;
//     // setNewValue(previousValue.slice(0, -1))
//     // console.log('Before backspace:', previousValue);
//     // console.log('After backspace:', previousValue.slice(0, -1));
//     // console.log('Character removed:', previousValue[previousValue.length - 1]);
    
//     getAllSchoolData();
//   }
// };

// const handleInputChange = async(val) => {
//   const value = val;
//   setSearchKeyData(value);
//   console.log(value, 'value in search input in onchange')
  
//   if (value === '' && newValue === '') {
//     console.log('Input cleared, fetching all school data1');
//     await getAllSchoolData();
//     console.log('Input cleared, fetching all school data2');
//   }
// };






























// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import styled from 'styled-components'
// import toast, { Toaster } from 'react-hot-toast';
// import { deleteSchoolApi, getAllActiveInActiveSpeFeatApi, getAllPlanApi, getSchoolDataApi, getSchoolDataByIdApi, updateSchoolApi, updateSpecialFeatureInSchoolApi } from '../Utils/Apis';
// import { Icon } from '@iconify/react';
// import DataLoader from '../Layouts/Loader';
// import ReactPaginate from 'react-paginate';
// import { useForm } from 'react-hook-form';
// //phone input
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// const Container = styled.div`
//   height: 92vh;
//   /* overflow: scroll; */
  
//   .scrollHide::-webkit-scrollbar{
//     display: none !important;
//   }

//   .table-striped>tbody>tr:nth-of-type(odd)>* {
//     --bs-table-bg-type: var(--tableGreyBackgroundColor);
//   }

//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

//   .eventablerow{
//     background-color: var(--tableGreyBackgroundColor) !important;
//   }

//   .oddModaltablerow{
//     background-color: var(--tableGreyBackgroundColor) !important;
//     border-bottom: 1.5px solid var(--darkGreenBorderColor);
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
//     margin-left: 41% !important;
//     margin-top: -20% !important;
//   }

//   .greydiv{
//     background-color: #FBFBFB;
//   }
//   .for-margin-top{
//     margin-top: -11px;
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
//     color: var(--greyInputTextColor) !important;
//     border-color: var(--greyInputborderColor);
//   }

//   .formcontrolFile{
//     color: Black;
//   }


// `;

// const AllSchools = () => {

//   const token = localStorage.getItem('token');
//   const [schoolData, setSchoolData] = useState([]);

//   //loader State
//   const [loaderState, setloaderState] = useState(false);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [pageNo, setPageNo] = useState(1);
//   const [pageSize, setPageSize] = useState(10);

//   // const [searchKeyData, setSearchKeyData] = useState('');

//   const { register, handleSubmit, formState: { errors }, setValue } = useForm({
//     mode: 'onChange'
//   });

//   const [getSchoolIdDataName, setgetSchoolIdDataName] = useState([]);
//   const [getSchoolIdDataAddress, setgetSchoolIdDataAddress] = useState([]);
//   const [getSchoolIdDataPhone, setgetSchoolIdDataPhone] = useState([]);
//   const [getSchoolIdDataPackage, setgetSchoolIdDataPackage] = useState([]);
//   const [getSchoolIdDataPackageId, setgetSchoolIdDataPackageId] = useState('');
//   const [getSchoolIdDataStatuus, setgetSchoolIdDataStatuus] = useState('');

//   const [updateFeatureId, setUpdateFeatureId] = useState([]);

//   const [isChecked, setIsChecked] = useState(false);
//   const [deleteSchoolId, setDeleteSchoolId] = useState(false);
//   const [allActiveInActiveSpeFeature, SetAllActiveInActiveSpeFeature] = useState([]);
//   const [allPlans, setAllPlan] = useState([])
//   const [viewFeaturesData, setViewFeaturesData] = useState([])

//   // const [isCheckedFeature, setIsCheckedFeature] = useState(false);

//   const [DeleteWarning, setDeleteWarning] = useState(true);
//   const [EditWarning, setEditWarning] = useState(true);
//   const [SpecialFeatureWarning, setSpecialFeatureWarning] = useState(true);
//   const [UpdateSpecialFeatureWarning, setUpdateSpecialFeatureWarning] = useState(true);

//   const [statussError, setStatusError] = useState('')
//   const [addressError, setAddressError] = useState('')
//   const [PhoneError, setPhoneError] = useState('')
//   const [packaageError, setPackageError] = useState('')

//   const [updateSchoolId, setupdateSchoolId] = useState('')

//   const [upadteSpeFeature, setUpadteSpeFeature] = useState('')

//   const [refreshPage, setRefreshPage] = useState(false);
//   const [refreshDelete, setRefreshDelete] = useState(false);
//   const [refreshUpdate, setRefreshUpdate] = useState(false);
//   const [refreshSpeFeaUpdate, setRefreshSpeFeaUpdate] = useState(false);

//   const [searchKeyData, setSearchKeyData] = useState('');
//   const [isCheckedFeature, setIsCheckedFeature] = useState([]);
//   const [addFeature, setAddFeature] = useState([]);
//   const [removeFeature, setRemoveFeature] = useState([]);
//   const [currentSchoolPlanId, setCurrentSchoolPlanId] = useState();


//   useEffect(() => {
//     getAllSchoolData();
//     // getAllPlans();
//   }, [token, refreshDelete, refreshUpdate, refreshPage, currentPage, pageNo])//, schoolData, allPlans

//   const handlePageClick = (event) => {
//     setPageNo(event.selected + 1); // as event start from 0 index
//   };

//   const DeleteBtnClicked = (id) => {
//     setDeleteSchoolId(id)
//   }

//   const getAllSchoolData = async () => {
//     try {
//       setloaderState(true);
//       var response = await getSchoolDataApi(searchKeyData, pageNo, pageSize);
//       console.log(response)
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setSchoolData(response?.data?.schools);
//           setCurrentPage(response?.data?.currentPage)
//           setTotalPages(response?.data?.totalPages)
//           setDeleteWarning(true);
//           setEditWarning(true);
//           setUpdateSpecialFeatureWarning(true);
//           // toast.success(response.data.message)
//         }
//         else {
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response.data.message)
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log(error)
//     }
//   }

//   const UpdateFeatureInPlan = async () => {
//     try {
//       const data = {
//         "addFeature": addFeature,
//         "removeFeature": removeFeature
//       }
//       console.log('3rd', data)
//       var response = await updateSpecialFeatureInSchoolApi(currentSchoolPlanId, data);
//       console.log(response)
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setUpadteSpeFeature(response?.data?.addons);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response.data.message)
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log(error)
//     }
//   }

//   const getSchoolDataById = async (id) => {
//     try {
//       setloaderState(true);
//       setupdateSchoolId(id)
//       var response = await getSchoolDataByIdApi(id);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setgetSchoolIdDataName(response?.data?.school?.schoolName);
//           setgetSchoolIdDataAddress(response?.data?.school?.schoolAddress);
//           setgetSchoolIdDataPhone(response?.data?.school?.schoolPhone);
//           setgetSchoolIdDataPackage(response?.data?.school?.plans?.planName);
//           setgetSchoolIdDataPackageId(response?.data?.school?.plans?.planId);
//           setgetSchoolIdDataStatuus(response?.data?.school?.status);
//           // setSpeFeaDataBySchoolId(response?.data?.school?.plans?.usedAddons)

//           setgetSchoolIdDataName(response?.data?.school?.schoolName);
//           setValue('schoolAddress', response?.data?.school?.schoolAddress);
//           setValue('schoolPhone', response?.data?.school?.schoolPhone);
//           setValue('', response?.data?.school?.plans?.planName);
//           setValue('selectPackage', response?.data?.school?.plans?.planId);
//           setValue('status', response?.data?.school?.status);
//           // setSpeFeaDataBySchoolId('' , response?.data?.school?.plans?.usedAddons)




//           toast.success(response?.data?.message)
//           setloaderState(false);
//         }
//         else {
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response.data.message)
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log(error)
//     }
//   }

//   const UpdateSchoolByID = async () => {
//     try {
//       const formData = new FormData();
//       formData.append("schoolAddress", getSchoolIdDataAddress),
//         formData.append("schoolPhone", parseInt(getSchoolIdDataPhone)),
//         formData.append("planId", parseInt(getSchoolIdDataPackageId)),
//         formData.append("status", getSchoolIdDataStatuus)
//       var response = await updateSchoolApi(updateSchoolId, formData);

//       if (response?.status === 200) {
//         if (response.data.status === 'success') {
//           setEditWarning(!EditWarning);
//           toast.success(response?.data?.message)
//           setTimeout(() => (
//             window.location.reload()
//           ), 1200);
//         }
//         else {
//           setloaderState(false);
//         }
//       }
//       else {
//         setloaderState(false);
//         console.log(response.data.message)
//       }
//     }
//     catch (error) {
//       setloaderState(false);
//       console.log(error)
//     }
//   }

//   const DeleteSchoolIdData = async (schoolId) => {
//     if (isChecked) {
//       try {
//         var response = await deleteSchoolApi(schoolId);
//         if (response?.status === 200) {
//           if (response.data.status === 'success') {
//             setDeleteWarning(!DeleteWarning)
//             toast.success(response?.data?.message)
//             setTimeout(() => (
//               window.location.reload()
//             ), 1000);

//           }
//           else {
//             toast.error(response?.data?.message);
//           }
//         }
//         else {
//           toast.error(response?.data?.message);
//         }
//       }
//       catch (error) {
//         console.error('Error during login:', error);
//       }
//     }
//     else {
//       toast.error('Please Agree First !!')
//     }
//   }


//   const getAllActiveInActiveSpeFeat = async () => {
//     setUpdateSpecialFeatureWarning(false);
//     try {
//       var response = await getAllActiveInActiveSpeFeatApi(currentSchoolPlanId);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           console.log(response?.data?.planName)
//           SetAllActiveInActiveSpeFeature(response?.data?.features);
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log(error, 'catch 1')
//     }
//   }


//   const getAllSpecialFeature = async (planIdd) => {
//     try {
//       setCurrentSchoolPlanId(planIdd);
//       var response = await getAllActiveInActiveSpeFeatApi(planIdd);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           toast.success(response?.data?.message)
//           SetAllActiveInActiveSpeFeature(response?.data?.features);
//         }
//       }
//       else {
//         console.log(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log(error)
//     }
//   }

//   const getAllPlans = async () => {
//     try {
//       const searchKey = ''
//       const pageNo = 1
//       const size = 10
//       var response = await getAllPlanApi(searchKey, pageNo, size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllPlan(response?.data?.plans);
//           // toast.success(response?.data?.message)
//         }
//         else{
//           toast.error(response?.data?.message)
//         }
//       }
//       else {
//         toast.error(response?.data?.message)
//       }
//     }
//     catch {
//       toast.error(error)
//     }
//   }


//   const handleCheckboxChange = (featureId) => {
//     setIsCheckedFeature((prev) => {
//       const isChecked = prev.includes(featureId);

//       if (isChecked) {
//         setAddFeature((prev) => prev.filter((id) => id !== featureId));
//         setRemoveFeature((prev) => [...new Set([...prev, featureId])]);
//         return prev.filter((id) => id !== featureId);
//       } else {
//         setAddFeature((prev) => [...new Set([...prev, featureId])]);
//         setRemoveFeature((prev) => prev.filter((id) => id !== featureId));
//         return [...prev, featureId];
//       }
//     });
//   };




//   const handleAddressChange = (e) => {
//     const newValue = e.target.value;
//     setgetSchoolIdDataAddress(newValue);
//     setAddressError(validateTextFields(newValue))
//   };

//   const handlePhoneChange = (e) => {
//     const newValue = e.target.value;
//     setgetSchoolIdDataPhone(newValue);
//     setPhoneError(validatePhone(newValue))
//   };

//   const handlePackageChange = (e) => {
//     const newValue = e;
//     setgetSchoolIdDataPackageId(newValue);
//     setPackageError(validateNum(newValue))
//   };

//   const handleStatusChange = (e) => {
//     const newValue = e;
//     setgetSchoolIdDataStatuus(newValue);
//     setStatusError(validateTextFields(newValue))
//   };

//   const PhoneRegex = /^[6-9]\d{9}$/;
//   const NumRegex = /^[0-9]/;
//   const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

//   const validatePhone = (value) => {
//     if (!value.trim()) {
//       return '*Phone is required';
//     } else if (!PhoneRegex.test(value)) {
//       return 'Invalid phone format !!';
//     }
//     return '';
//   };

//   const validateNum = (value) => {
//     if (!value.trim()) {
//       return '*PlanId is required';
//     } else if (!NumRegex.test(value)) {
//       return 'Invalid phone format !!';
//     }
//     return '';
//   };

//   const validateTextFields = (value) => {
//     if (!value.trim()) {
//       return '*This Field is required';
//     } else if (!textAlphaRegex.test(value)) {
//       return 'Invalid characters in name !!';
//     }
//     return '';
//   };

//   const validateFields = () => {
//     let isValid = true;

//     if (getSchoolIdDataStatuus === '') {
//       setStatusError('* Status is required');
//       isValid = false;
//     } else {
//       setStatusError('');
//     }
//     if (getSchoolIdDataAddress === '') {
//       setAddressError('* Address is required');
//       isValid = false;
//     } else {
//       setAddressError('');
//     }
//     if (getSchoolIdDataPhone === '') {
//       setPhoneError('* Phone is required');
//       isValid = false;
//     } else {
//       setPhoneError('');
//     }
//     if (getSchoolIdDataPackageId === '') {
//       setPackageError('* Package is required');
//       isValid = false;
//     } else {
//       setPackageError('');
//     }

//     return isValid;
//   };

//   return (
//     <>
//       <Container className='scrollHide'>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-2">
//             <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
//               <div className="row">
//                 <nav className='breadcrumnav' aria-label="breadcrumb">
//                   <ol className="breadcrumb">
//                     <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
//                     <li className="breadcrumb-item active greenText" aria-current="page"><h2> Schools</h2></li>
//                   </ol>
//                 </nav>
//               </div>
//             </div>
//             <div className="col-lg-5 col-md-8 col-sm-12">
//               <div className="row">
//                 <div className="col-md-9 col-sm-6">
//                   <div className="row">
//                     <form className="d-flex" role="search">
//                       <input className="form-control formcontrolsearch" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchKeyData(e.target.value)} />
//                       <button className="btn searchButtons text-white" type="button" onClick={getAllSchoolData}><h2>Search</h2></button>
//                     </form>
//                   </div>
//                 </div>
//                 <div className="col-md-3 col-sm-6 text-end">
//                   <div className="row">
//                     <Link className="btn ps-0 pe-0 addButtons text-white" type="submit" to='/addSchoolsPage'><h2 className='textVerticalCenter'>+ ADD Schools</h2></Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="row mb-3 for-margin-top"><h2>School List</h2></div>
//           <div className="row ps-2 pe-2">
//             <div className=" cardradius bg-white p-3">
//               <table className="table align-middle overflow-scroll table-striped">
//                 <thead>
//                   <tr>
//                     <th><h2>#</h2></th>
//                     <th><h2>School name</h2></th>
//                     <th><h2>Address</h2></th>
//                     <th><h2>Phone</h2></th>
//                     <th><h2>Package <img src="./images/StatusArrow.svg" alt="" /></h2></th>
//                     <th className='bolddText'><h2>Spe. Features</h2></th>
//                     <th><h2>Status <img src="./images/StatusArrow.svg" alt="" /></h2></th>
//                     <th><h2>Action</h2></th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {schoolData.map((item, index) => (
//                     <tr key={item.id} className='my-bg-color align-middle'>
//                       <th className='greyText'><h3>{index + 1}</h3></th>
//                       <td className='greyText'><h3>{item.schoolName}</h3></td>
//                       <td className='greyText'><h3>{item.schoolAddress}</h3></td>
//                       <td className='greyText'><h3>{item.schoolPhone}</h3></td>
//                       <td className='greyText'><h3>{item.plans.planName}</h3></td>
//                       <td><h3>{(item.plans.usedAddons).length > 0 ? <span className='blueText text-decoration-none' data-bs-toggle="modal" data-bs-target="#specialFeaturesModal" style={{ cursor: 'pointer' }} onClick={(e) => setViewFeaturesData(item.plans.usedAddons)}>View Features</span> : <span className='blueText text-decoration-none text-center' style={{ cursor: 'pointer' }}>---</span>}</h3></td>
//                       <td>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
//                       <td>
//                         <div className="dropdown dropdownbtn">
//                           <button className="btn btn-sm actionButtons dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
//                             <span>Action</span>
//                           </button>
//                           <ul className="dropdown-menu">
//                             <li>
//                               <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Edit_staticBackdrop" aria-controls="Edit_staticBackdrop" onClick={() => getSchoolDataById(item.schoolBusinessId)}>
//                                 Edit
//                               </button>
//                             </li>
//                             <li>
//                               <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#SpeFeature_staticBackdrop" aria-controls="SpeFeature_staticBackdrop" onClick={() => getAllSpecialFeature(item.plans.planId)}>
//                                 Spe. Features
//                               </button>
//                             </li>
//                             <li>
//                               <button className="dropdown-item greyText" type="button" data-bs-toggle="offcanvas" data-bs-target="#Delete_staticBackdrop" aria-controls="Delete_staticBackdrop" onClick={() => DeleteBtnClicked(item.schoolBusinessId)}>
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
//                     breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
//                     onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
//                   />
//                 </div>
//               </div>

//             </div>
//           </div>



//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}



//           <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="Edit_staticBackdrop" aria-labelledby="staticBackdropLabel">
//             <div className="offcanvas-header border-bottom border-2 p-1">
//               <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                   <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                 </svg>
//               </Link>
//               <h2 className="offcanvas-title" id="staticBackdropLabel">School Edit</h2>
//             </div>
//             <div className="offcanvas-body p-0">
//               <div>
//                 {EditWarning
//                   ?
//                   <>
//                     <div>
//                       <p className='modalLightBorder orangeText p-2'>{getSchoolIdDataName}</p>
//                       <div className="p-3">
//                         <form onSubmit={handleSubmit(UpdateSchoolByID)}>
//                           <div className="mb-3">
//                             <label htmlFor="exampleInputAdd1" className='form-label font14'>Address</label>
//                             {/* <input type="address" className={`form-control p-2 formcontrolinput ${addressError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" rows={2} value={getSchoolIdDataAddress} onChange={handleAddressChange} /> */}
//                             {/* <textarea type="address" className={`form-control p-2 formcontrolinput ${addressError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="AddHelp" rows={2} value={getSchoolIdDataAddress} onChange={handleAddressChange}></textarea> */}
//                             <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="Enter School Address"
//                               {...register('schoolAddress', {
//                                 required: 'School Address is required *',
//                                 minLength: { value: 5, message: 'Minimum length is 5 characters !!' }
//                               })}
//                             />
//                             {errors.schoolAddress && <p className=" pt-2 font12 text-danger">{errors.schoolAddress.message}</p>}
//                             {/* <span className='text-danger'>{addressError}</span> */}
//                           </div>
//                           <div className="mb-3">
//                             <label htmlFor="exampleInputphone1" className='form-label font14'>Phone Number</label>
//                             {/* <input type="tel" className={`form-control p-2 formcontrolinput ${PhoneError ? 'border-1 border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="phoneHelp" value={getSchoolIdDataPhone} onChange={handlePhoneChange} /> */}
//                             <PhoneInput country={'in'} inputProps={{ name: 'schoolPhone', required: true, autoFocus: true, }} containerClass='react-tel-input' placeholder="Enter Phone Number"
//                               inputStyle={{ width: '100%', backgroundColor: '#fff', color: '#000', borderColor: '#dee2e6', borderRadius: '0px', paddingLeft: '14%', paddingTop: '1.8px', paddingBottom: '1.8px', fontSize: '14px', }}
//                               buttonStyle={{ borderColor: '#dee2e6', borderRight: 'none' }}
//                               dropdownStyle={{ fontSize: '14px', }}
//                               onChange={(value) => register('schoolPhone').onChange(value)}
//                             />
//                             {errors.schoolPhone && <p className="pt-2 font12 text-danger">{errors.schoolPhone.message}</p>}
//                             {/* <span className='text-danger'>{PhoneError}</span> */}
//                           </div>
//                           <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className='form-label font14'>Package</label>
//                             <select id="planId" className={`form-select font14 ${errors.planId ? 'border-danger' : ''}`} {...register('planId', { required: 'Package selection is required' })} >
//                               <option value="">Select Package</option>
//                               {allPlans.map((plan) => (<option key={plan.planId} value={plan.planId}> {plan.planName} </option>))}
//                             </select>
//                             {errors.planId && <p className="pt-2 font12 text-danger">{errors.planId.message}</p>}
//                             {/* <span className='text-danger'>{packaageError}</span> */}
//                           </div>
//                           <div className="mb-3">
//                             <label htmlFor="exampleInputEmail1" className='form-label font14'>Status</label>
//                             <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status selection is required' })} >
//                               <option value="">Select Status</option>
//                               <option value={true}>Active</option>
//                               <option value={false}>Inactive</option>
//                             </select>
//                             {errors.status && <p className="pt-2 font12 text-danger">{errors.status.message}</p>}
//                             {/* <select value={getSchoolIdDataStatuus} className={`form-select p-2 formcontrolinput ${statussError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" onChange={(e) => handleStatusChange(e.target.value)}>
//                               <option value={true}>Active</option>
//                               <option value={false}>Inactive</option>
//                             </select>
//                             <span className='text-danger'>{statussError}</span> */}
//                           </div>
//                         </form>
//                         <p className='text-center p-3'>
//                           <button className='btn updateButtons text-white' type='submit' >Update</button>
//                           <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSchoolData}>Cancel</button>
//                         </p>
//                       </div>
//                     </div>
//                   </>
//                   :
//                   <>
//                     <div>
//                       <p className='modalLightBorder p-2 mb-0'>School List</p>
//                       <div className="mt-3  ">
//                         <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                         <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                           <p className='warningHeading'>Successful Updated</p>
//                           <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                         </div>
//                         <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Success</button>
//                       </div>
//                     </div>
//                   </>
//                 }
//               </div>
//             </div>
//           </div>



//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}



//           <div className="offcanvas offcanvas-end p-2" data-bs-backdrop="static" tabIndex="-1" id="SpeFeature_staticBackdrop" aria-labelledby="staticBackdropLabel">
//             <div className="offcanvas-header modalHighborder p-1">
//               <Link type="button" data-bs-dismiss="offcanvas" aria-label="Close">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 16 16">
//                   <path fill="#008479" fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8" />
//                 </svg>
//               </Link>
//               <h2 className="offcanvas-title" id="staticBackdropLabel">Special Features Details</h2>
//             </div>
//             <div className="offcanvas-body p-0">
//               <div>
//                 {SpecialFeatureWarning
//                   ?

//                   <>
//                     {UpdateSpecialFeatureWarning ? (
//                       <>
//                         <p className='modalLightBorder p-2 mb-0'>Special Features</p>
//                         <div className="ps-3 pe-3">
//                           <table className="table table-striped mt-2">
//                             <thead>
//                               <tr height='40px'>
//                                 <th><h2>Details</h2></th>
//                                 <td className='text-end'>
//                                   <Link className='greenText text-decoration-none' onClick={getAllActiveInActiveSpeFeat}>
//                                     <h2>Add Features</h2>
//                                   </Link>
//                                 </td>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {allActiveInActiveSpeFeature.map((item, index) => (
//                                 <tr height='40px' key={index}>
//                                   <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
//                                   <td className='text-end'>
//                                     {item?.planStatus ? (
//                                       <h3 className='p-1 pe-2'>
//                                         <Icon icon="simple-icons:ticktick" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
//                                       </h3>
//                                     ) : (
//                                       <h3 className='ps-3'>---</h3>
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                           <p className='text-center p-3'>
//                             <button className='btn cancelButtons ms-3' onClick={getAllSchoolData}>Back</button>
//                           </p>
//                         </div>
//                       </>
//                     ) : (
//                       <>
//                         <p className='modalLightBorder p-2 mb-0'>Special Features</p>
//                         <div className="ps-3 pe-3">
//                           <table className="table table-striped mt-2">
//                             <thead>
//                               <tr height='40px'>
//                                 <th><h2>Details</h2></th>
//                                 <td className='greenText'></td>
//                               </tr>
//                             </thead>
//                             <tbody>
//                               {allActiveInActiveSpeFeature.map((item, index) => (
//                                 <tr height='40px' key={index}>
//                                   <td><h3 className='greyText ps-2'>{item?.featureName}</h3></td>
//                                   <td className='text-end'>
//                                     {item?.planStatus ? (
//                                       <h3 className='p-1 pe-1'>
//                                         <Icon icon="ion:checkbox" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
//                                       </h3>
//                                     ) : (
//                                       <h3 onClick={() => handleCheckboxChange(item.planFeatureId)}>
//                                         {isCheckedFeature.includes(item.planFeatureId) ? (
//                                           <p className='p-1 pe-1'>
//                                             <Icon icon="ion:checkbox" width="1.5em" height="1.5em" style={{ color: '#00A67E', cursor: 'pointer' }} />
//                                           </p>
//                                         ) : (
//                                           <Icon icon="bxs:checkbox" width="2.1em" height="2.1em" style={{ color: '#fff', cursor: 'pointer' }} />
//                                         )}
//                                       </h3>
//                                     )}
//                                   </td>
//                                 </tr>
//                               ))}
//                             </tbody>
//                           </table>
//                           <p className='text-center p-3'>
//                             <button className='btn updateButtons text-white' onClick={UpdateFeatureInPlan}>Update</button>
//                             <button className='btn cancelButtons ms-3' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSchoolData}>Cancel</button>
//                           </p>
//                         </div>
//                       </>
//                     )}
//                   </>

//                   :
//                   <>
//                     <div>
//                       <p className='modalLightBorder p-2 mb-0'>School List</p>
//                       <div className="mt-3  ">
//                         <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                         <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                           <p className='warningHeading'>Successful Updated</p>
//                           <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                         </div>
//                         <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" onClick={getAllSchoolData}>Continue</button>
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
//                       <p className='text-center greyText warningText pt-2'>This Action will be permanently delete<br />the School Data</p>
//                       <p className='text-center warningText p-2'><input className="form-check-input formdltcheck me-2" type="checkbox" value="" id="flexCheckChecked" onChange={(e) => setIsChecked(e.target.checked)} />I Agree to delete the Profile Data</p>
//                       <p className='text-center p-3'>
//                         <button className='btn deleteButtons text-white' onClick={() => DeleteSchoolIdData(deleteSchoolId)}>Delete</button>
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
//                         <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close" >Success</button>
//                       </div>
//                     </div>
//                   </>
//                 }
//               </div>
//             </div>
//           </div>



//           {/* ***********************************************************************************************************************************************************************************/}
//           {/* ***********************************************************************************************************************************************************************************/}


//           <div className="modal fade" id="specialFeaturesModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//             <div className="modal-dialog modal-dialog-centered modal-lg">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h1 className="modal-title fs-5" id="exampleModalLabel">Special Features</h1>
//                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                 </div>
//                 <div className="modal-body">
//                   <table className="table align-middle">
//                     <thead>
//                       <tr>
//                         <th>S.No</th>
//                         <th>Feature Name</th>
//                         <th>Status</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {viewFeaturesData.map((item, index) => (
//                         <tr key={index} className=' align-middle'>
//                           <td>{index + 1}.</td>
//                           <td>{item.featureName}</td>
//                           <td>{item.status ? <span className='activeText'>Active</span> : <span className='deactiveText'>InActive</span>}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>


//           <Toaster />
//         </div>
//       </Container>
//     </>
//   )
// }

// export default AllSchools
