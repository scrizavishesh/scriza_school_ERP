import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { addNewSpecialFeatureApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
  height: 92vh;
  
.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .headingbg{
    background-color: var(--headingBackgroundColor);
    border-radius: 5px;
  }

  .card{
    border: none;
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



const AddSpecialFeature = () => {

  const navigate = useNavigate();

  // const token = localStorage.getItem('token');

  const [FeatureName, setFeatureName] = useState('')
  const [FeatureNameError, setFeatureNameError] = useState('')

  const [statuss, setStatuss] = useState('')
  const [statussError, setStatussError] = useState('')

  const [IdentityName, setIdentityName] = useState('')
  const [IdentityNameError, setIdentityNameError] = useState('')

  const textAlphaRegex = /^[A-Za-z0-9\s]+$/;


  const handleFeatureNameChange = (e) => {
    const newValue = e.target.value;
    setFeatureName(newValue);
    setFeatureNameError(validateTextFields(newValue));
  };

  const handleStatusChange = (e) => {
    const newValue = e.target.value;
    setStatuss(newValue);
    setStatussError(validateTextFields(newValue));
  };

  const handleIdentityNameChange = (e) => {
    const newValue = e.target.value;
    setIdentityName(newValue);
    setIdentityNameError(validateTextFields(newValue));
  };


  const validateTextFields = (value) => {
    if (!value.trim()) {
      return '*This Field is required';
    } else if (!textAlphaRegex.test(value)) {
      return 'Invalid characters in name !!';
    }
    return '';
  };

  const validateFields = () => {
    let isValid = true;

    if (!IdentityName) {
      setIdentityNameError('* Identity Name is required');
      isValid = false;
    } else {
      setIdentityNameError('');
    }
    if (!FeatureName) {
      setFeatureNameError('* Feature Name is required');
      isValid = false;
    } else {
      setFeatureNameError('');
    }
    if (!statuss) {
      setStatussError('* Status is required');
      isValid = false;
    } else {
      setStatussError('');
    }

    return isValid;
  };


  const AddNewSpecialFeature = async () => {
    if (validateFields()) {
      if (FeatureNameError === '' && IdentityNameError === '' && statussError === '') {
        console.log('valid')
        try {
          const data = {
            "featureName": FeatureName,
            "featureIdentity": IdentityName,
            "status": statuss
          }
          console.log(data)
          var response = await addNewSpecialFeatureApi(data);
          if (response?.status === 200) {
            console.log(response)
            if (response?.data?.status === 'success') {
              toast.success(response?.data?.message)
              setTimeout(() => {
                navigate('/addons')
              }, 1000);
            }
          }
          else {
            console.log(response?.data?.message);
          }
        }
        catch {
          console.log('invalid')
        }
      }
    }
  }


  const handleCancel = () => {
    navigate('/addons');
  }


  return (
    <>
      <Container>
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-3">
              <nav className='breadcrumnav' aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item"><Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
                  <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Feature</h2></li>
                </ol>
              </nav>
              <h2>Add Feature</h2>
          </div>
          <div className="row mb-3"></div>
          <div className='cardradius bg-white p-3'>
            <form>
              <div className="row">
                <div className="col-md-4 col-sm-12">
                  <label htmlFor="BundleName" className="form-label greyText">Feature Name</label>
                  <input type="text" className={`form-control ${FeatureNameError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Feature Name' onChange={handleFeatureNameChange} />
                  <span className="text-danger">{FeatureNameError}</span>
                </div>
                <div className="col-md-4 col-sm-12">
                  <label htmlFor="BundleName" className="form-label greyText">Status</label>
                  <select className={`form-select ${statussError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleStatusChange}>
                    <option selected disabled value=''>-- Select --</option>
                    <option value='true'>Active</option>
                    <option value='false'>InActive</option>
                  </select>
                  <span className="text-danger">{statussError}</span>
                </div>
                <div className="col-md-4 col-sm-12">
                  <label htmlFor="BundleName" className="form-label greyText">Identity Name</label>
                  <input type="text" className={`form-control ${IdentityNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter Identity Name' onChange={handleIdentityNameChange} />
                  <span className="text-danger">{IdentityNameError}</span>
                </div>
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons text-white' onClick={AddNewSpecialFeature} type='button'>Add SpecialFeature</button>
                <button className='btn cancelButtons ms-3' onClick={handleCancel}  type='button'>Cancel</button>
              </p>
            </form>
          </div>
          <Toaster />
        </div>
      </Container>
    </>
  )
}

export default AddSpecialFeature





