import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components'
import { addNewDropPointApi, getAllRouteApi } from '../Utils/Apis';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Container = styled.div`

  .mainBreadCrum{
    --bs-breadcrumb-divider: '>' !important;
  }

  .bredcrumText{
    color: var(--breadCrumTextColor);
  }

  .bredcrumActiveText{
    color: var(--breadCrumActiveTextColor);
  }

  .form-control::placeholder, .form-control , .form-select{
        color: var(--greyState)
    }

    .form-control , .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

  .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
      width: fit-content;
      border: 2px solid var(--BtnBorder);
      background-color: var(--breadCrumActiveTextColor)
  }

  .EyeViewBtnn, .EyeViewBtnn:active{
      width: fit-content;
      border: 2px solid var(--BtnBorder);
      background-color: var(--OrangeBtnColor)
  }

    
`;

const AddDropPoint = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  // loader State
  const [loaderState, setloaderState] = useState(false);
  // Variable states
  const [allRouteData, setAllRouteData] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    getAllRouteData();
  }, [token])

  const getAllRouteData = async () => {
    setloaderState(true)
    try {
      var response = await getAllRouteApi('', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setAllRouteData(response?.data?.routes);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message)
      }
    }
    catch (error) {
      setloaderState(false);
      console.error('Error during fetching routes:', error);
      if (error?.response?.data?.statusCode === 401){
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    }
  }

  const AddNewDropPoint = async (data) => {
    try {
      const formData = new FormData();
      formData.append("routeId", data?.routeId);
      formData.append("dropName", data?.dropName);
      var response = await addNewDropPointApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message)
          setTimeout(() => {
            navigate('/dropPoint');
          }, 1000);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message)
      }
    }
    catch (error) {
      setloaderState(false);
      console.error('Error during login:', error);
    }
  }

  const CancelButton = () => {
    navigate('/dropPoint')
  }

  return (
    <>
      <Container>
        <div className="container-fluid p-4">
          <div className="row">
            <div className="col-lg-7 col-md-8 col-sm-12 flex-grow-1">
              <div className="row ps-2">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                  <ol className="breadcrumb mb-1">
                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                    <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
                    <li className="breadcrumb-item"><a href="/dropPoint" className='bredcrumText text-decoration-none'>Drop Point</a></li>
                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Drop Point</li>
                  </ol>
                </nav>
                <p className='font14 ps-0 fontWeight500'>Add Drop Point</p>
              </div>
            </div>
          </div>
          <div className="row ps-2 pe-2 pt-3">
            <div className="bg-white cardradius p-3">
              <form className="row g-3" onSubmit={handleSubmit(AddNewDropPoint)}>
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="dropName" className="form-label font14">Route</label>
                  <select id="routeId" className={`form-select font14 ${errors.routeId ? 'border-danger' : ''}`} {...register('routeId', { required: 'Route selection is required *' })}>
                    <option value="">Select Route</option>
                    {allRouteData.map((route) => (
                      <option key={route.routeId} value={route.routeId}>{route.routeName}</option>
                    ))}
                  </select>
                  {errors.routeId && <p className="font12 text-danger">{errors.routeId.message}</p>}
                </div>
                <div className="col-md-6 col-sm-12 col-12">
                  <label htmlFor="dropName" className="form-label font14">Route</label>
                  <input id="dropName" type="text" className={`form-control font14 ${errors.dropName ? 'border-danger' : ''}`} placeholder="Enter Drop Point Name" {...register('dropName', { required: 'Drop Point Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Drop Point Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Drop Point Name'; } return true; } })} />
                  {errors.dropName && <p className="font12 text-danger">{errors.dropName.message}</p>}
                </div>
                <div className="row p-3">
                  <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn addCategoryButtons font16 text-white' type='submit' >Add Drop Point</button>
                  <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn cancelButtons font14 ms-2' type='button' onClick={CancelButton}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  )
}

export default AddDropPoint
