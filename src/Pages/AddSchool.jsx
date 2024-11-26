
// correct code with validation

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import { useForm } from 'react-hook-form';
//phone input
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Container = styled.div`

.table-striped>tbody>tr:nth-of-type(odd)>* {
    --bs-table-bg-type: var(--tableGreyBackgroundColor);
}
  .breadcrumb-item::before {
    content: var(--bs-breadcrumb-divider, "");
  }

  .headingbg {
    background-color: var(--headingBackgroundColor);
    border-radius: 5px;
  }

  .card {
    border: none;
  }

  .form-control, .form-control::placeholder, .form-select {
    font-size: var(--font-size-14) !important;
    color: var(--greyInputTextColor);
  }

  .form-control, .form-select {
    background-color: #fff !important;
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .form-control:focus, .form-select:focus {
    box-shadow: none !important;
    border-color: var(--greyInputborderColor);
  }

  .formcontrolFile {
    color: Black;
  }

  .text-danger {
    color: #dc3545;
    font-size: 0.875em;
    margin-top: 0.25rem;
  }

`;

const CollapsedContainer = styled.div`
  .collapse {
    transition: height 0.3s ease;
  }
`;

const AddSchool = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [loaderState, setLoaderState] = useState(false);
  const [schoolFormOpen, setSchoolFormOpen] = useState(true);
  const [adminInfoOpen, setAdminInfoOpen] = useState(false);
  const [allPlans, setAllPlan] = useState([]);

  const { register, handleSubmit, formState: { errors } } = useForm({
    mode: 'onChange'
  });

  useEffect(() => {
    getAllPlans();
  }, [token]);

  const getAllPlans = async () => {
    setLoaderState(true);
    try {
      const response = await getAllPlanApi('', '', '');
      if (response?.status === 200 && response?.data?.status === 'success') {
        setLoaderState(false);
        setAllPlan(response?.data?.plans);
      } else {
        setLoaderState(false);
        toast.error(response?.data.message);
      }
    }
    catch (error) {
      // setloaderState(false);
      console.error('Error fetching student data:', error);
      if (error?.response?.data?.statusCode === 401) {
        localStorage.removeItem('token')
        setTimeout(() => {
          navigate('/')
        }, 200);
      }
    
    } finally {
      setLoaderState(false);
    }
  };

  const toggleSchoolForm = () => {
    setSchoolFormOpen(!schoolFormOpen);
    setAdminInfoOpen(false);
  };

  const toggleAdminInfo = () => {
    setAdminInfoOpen(!adminInfoOpen);
    setSchoolFormOpen(false);
  };

  const addNewSchool = async (data) => {
    setLoaderState(true);
    try {
      const formData = new FormData();
      formData.append('schoolName', data?.schoolName);
      formData.append('schoolAddress', data?.schoolAddress);
      formData.append('schoolEmail', data?.schoolEmail);
      formData.append('schoolPhone', data?.schoolPhone);
      formData.append('planId', data?.planId);
      formData.append('schoolDis', data?.schoolDis);
      formData.append('schoolLogo', data?.schoolLogo);
      formData.append('adminName', data?.adminName);
      formData.append('gender', data?.gender);
      formData.append('adminAddress', data?.adminAddress);
      formData.append('adminPhone', data?.adminPhone);
      formData.append('adminEmail', data?.adminEmail);
      formData.append('adminPhoto', data?.adminPhoto[0]);
      // for (const key in data) {
      //   formData.append(key, data[key]);
      // }
      const response = await addNewSchoolApi(formData);
      if (response?.status === 200){
        if (response?.data?.status === 'success') {
          toast.success(response?.data?.message)
          setTimeout(() => {
            navigate('/allSchoolsPage')
          }, 2000);
        } else {
          toast.error(response?.data.message, 'else1');
        }
      } else {
        toast.error(response?.data.message, 'else2');
      }
    } catch (error) {
      toast.error('Error adding school', error);
    } finally {
      setLoaderState(false);
    }
  };

  return (
    <>
      <Container>
        {loaderState && <DataLoader />}
        <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
          <div className="row pt-2 pb-3">
            <nav className='breadcrumnav' aria-label="breadcrumb">
              <ol className="breadcrumb mb-2">
                <li className="breadcrumb-item">
                  <Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
                </li>
                <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
              </ol>
            </nav>
            <h2>Add School</h2>
          </div>
          <form onSubmit={handleSubmit(addNewSchool)}>
          <div className="row ps-2 pe-2">
            <div className="bg-white cardradius p-3">
              {/* School Form Collapse */}
              <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`}>
                <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
                  School Form
                </h2>
                <span className='text-end' onClick={toggleSchoolForm} style={{cursor: 'pointer'}}>
                  {schoolFormOpen ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
                </span>
              </div>
              <CollapsedContainer>
                <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
                  <div className="p-3">
                      <div className="row">
                        {/* School Fields */}
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolName" className="form-label font14">School Name</label>
                          <input id="schoolName" type="text" className={`form-control font14 ${errors.schoolName ? 'border-danger' : ''}`} placeholder="School Name" {...register('schoolName', { required: 'School Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'School Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in School Name'; } return true; } } )} />
                          {errors.schoolName && <p className="font12 text-danger">{errors.schoolName.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolAddress" className="form-label font14">School Address</label>
                          <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="School Address" {...register("schoolAddress", { required: 'School Address is required *', validate: value => { if (!/^[A-Za-z]/.test(value)) { return 'School Name must start with a Character'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'School Address must contain only letters, digits, and spaces'; } return true; } })} />
                          {errors.schoolAddress && <p className="font12 text-danger">{errors.schoolAddress.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolEmail" className="form-label font14">School Email</label>
                          <input id="schoolEmail" type="email" className={`form-control font14 ${errors.schoolEmail ? 'border-danger' : ''}`} placeholder="School Email" {...register('schoolEmail', { required: 'School Email is required *', validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                          {errors.schoolEmail && <p className="font12 text-danger">{errors.schoolEmail.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolPhone" className="form-label font14">School Phone</label>
                          <input id="schoolPhone" type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number" {...register('schoolPhone', { required: 'School Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                          {errors.schoolPhone && <p className="font12 text-danger">{errors.schoolPhone.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="planId" className="form-label font14">School Package</label>
                          <select id="planId" className={`form-select font14 ${errors.planId ? 'border-danger' : ''}`} {...register('planId', { required: 'Package selection is required *' })} >
                            <option value="">Select Package</option>
                            {allPlans.map((plan) => ( <option key={plan.planId} value={plan.planId}> {plan.planName} </option> ))}
                          </select>
                          {errors.planId && <p className="font12 text-danger">{errors.planId.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolDis" className="form-label font14">School Description</label>
                          <input id="schoolDis" type="text" className={`form-control font14 ${errors.schoolDis ? 'border-danger' : ''}`} placeholder="School Description" {...register('schoolDis', { required: 'School Description is required *', validate: value => { if (!/^[A-Za-z]/.test(value)) { return 'School Description must start with a Character'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s,.'-]+$/.test(value)) { return 'School Description must contain only letters, and spaces'; } return true; } })} />
                          {errors.schoolDis && <p className="font12 text-danger">{errors.schoolDis.message}</p>}
                        </div>
                        <div className="col-md-6 mb-3">
                          <label htmlFor="schoolLogo" className="form-label font14">School Logo</label>
                          <input id="schoolLogo" type="file" className={`form-control font14 ${errors.schoolLogo ? 'border-danger' : ''}`} accept="image/*" {...register('schoolLogo', { required: 'School Logo is required *', validate: (value) => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; }, })} />
                          {errors.schoolLogo && <p className="font12 text-danger">{errors.schoolLogo.message}</p>}
                        </div>
                      </div>
                  </div>
                </div>
              </CollapsedContainer>

              {/* Admin Form Collapse */}
              <div className={`d-inline-flex gap-1 p-2 col-12 mt-3 headingbg ${adminInfoOpen ? 'active' : ''}`}>
                <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdminFormCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdminFormCollapse">
                  Admin Form
                </h2>
                <span className='text-end' onClick={toggleAdminInfo} style={{cursor: 'pointer'}}>
                  {adminInfoOpen ? 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
                </span>
              </div>
              <CollapsedContainer>
                <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdminFormCollapse">
                  <div className="p-3">
                    <div className="row">

                      {/* Admin Fields */}
                      <div className="col-md-6 mb-3">
                        <label htmlFor="adminName" className="form-label font14">Admin Name</label>
                        <input id="adminName" type="text" className={`form-control font14 ${errors.adminName ? 'border-danger' : ''}`} placeholder="Admin Name" {...register('adminName', { required: 'Admin Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Admin Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Admin Name'; } return true; } } )} />
                        {errors.adminName && <p className="font12 text-danger">{errors.adminName.message}</p>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="gender" className="form-label font14">Gender</label>
                        <select id="gender" className={`form-select font14 ${errors.gender ? 'border-danger' : ''}`} {...register('gender', { required: 'Admin Gender is required *' })}>
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="font12 text-danger">{errors.gender.message}</p>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="adminAddress" className="form-label font14">Admin Address</label>
                        <input id="adminAddress" type="text" className={`form-control font14 ${errors.adminAddress ? 'border-danger' : ''}`} placeholder="Admin Address" {...register("adminAddress", { required: 'Admin Address is required *', validate: value => { if (!/^[A-Za-z]/.test(value)) { return 'Admin Name must start with a Character'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s,.'-]+$/.test(value)) { return 'Admin Address must contain only letters, numbers, and spaces'; } return true; } })} />
                        {errors.adminAddress && <p className="font12 text-danger">{errors.adminAddress.message}</p>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="adminPhone" className="form-label font14">Admin Phone Number</label>
                        <input id="adminPhone" type="tel" className={`form-control font14 ${errors.adminPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number" {...register('adminPhone', { required: 'Admin Phone Number is required *', validate: value => { if (!/^[6-9][0-9]{3}/.test(value)) { return 'Phone number must start with digits between 6 and 9'; } if (!/^[0-9]*$/.test(value)) { return 'Invalid character in phone number. Please enter only digits'; } if (value.length < 10) { return 'Phone number must be of minimum 10 digits'; } if (value.length > 10) { return 'Phone number can be of maximum 10 digits'; } return true; } })} />
                        {errors.adminPhone && <p className="font12 text-danger">{errors.adminPhone.message}</p>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="adminEmail" className="form-label font14">Admin Email</label>
                        <input id="adminEmail" type="email" className={`form-control font14 ${errors.adminEmail ? 'border-danger' : ''}`} placeholder="Enter Admin Email" {...register('adminEmail', { required: 'Admin Email is required *', validate: value => { if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) { return 'Not a valid email format'; } return true; } })} />
                        {errors.adminEmail && <p className="font12 text-danger">{errors.adminEmail.message}</p>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="adminPhoto" className="form-label font14">Photo</label>
                        <input id="adminPhoto" type="file" className={`form-control font14 ${errors.adminPhoto ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('adminPhoto', { required: 'Photo is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                        {errors.adminPhoto && <p className="font12 text-danger">{errors.adminPhoto.message}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </CollapsedContainer>
              <div className="d-flex justify-content-center mt-3 mb-3">
                <button className='me-2 btn addButtons text-white' type="submit">Submit</button>
                <button className='ms-2 btn cancelButtons text-black' type="button">Cancel</button>
              </div>
            </div>
          </div>
          </form>
        </div>
      </Container>
    </>
  );
};

export default AddSchool;














































// // correct code with validation

// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import { useForm } from 'react-hook-form';
// //phone input
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';

// const Container = styled.div`

//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

//   .headingbg {
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }

//   .card {
//     border: none;
//   }

//   .form-control, .form-control::placeholder, .form-select {
//     font-size: var(--font-size-14) !important;
//     color: var(--greyInputTextColor);
//   }

//   .form-control, .form-select {
//     background-color: #fff !important;
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }

//   .form-control:focus, .form-select:focus {
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }

//   .formcontrolFile {
//     color: Black;
//   }

//   .text-danger {
//     color: #dc3545;
//     font-size: 0.875em;
//     margin-top: 0.25rem;
//   }

// `;

// const CollapsedContainer = styled.div`
//   .collapse {
//     transition: height 0.3s ease;
//   }
// `;

// const AddSchool = () => {

//   const navigate = useNavigate();
//   const token = localStorage.getItem('token');
//   const [loaderState, setLoaderState] = useState(false);
//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);
//   const [allPlans, setAllPlan] = useState([]);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     mode: 'onChange'
//   });

//   useEffect(() => {
//     getAllPlans();
//   }, [token]);

//   const getAllPlans = async () => {
//     setLoaderState(true);
//     try {
//       const response = await getAllPlanApi('', '', '');
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setLoaderState(false);
//         setAllPlan(response?.data?.plans);
//       } else {
//         setLoaderState(false);
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       setLoaderState(false);
//       console.error('Error during update:', error);
//       toast.error('Error fetching plans');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//     setAdminInfoOpen(false);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//     setSchoolFormOpen(false);
//   };

//   const addNewSchool = async (data) => {
//     setLoaderState(true);
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }

//       const response = await addNewSchoolApi(formData);
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setTimeout(() => navigate('/allSchoolsPage'), 1000);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during submission:', error);
//       toast.error('Error adding school');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   return (
//     <>
//       <Container>
//         {loaderState && <DataLoader />}
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-2 pb-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb mb-2">
//                 <li className="breadcrumb-item">
//                   <Link to="/" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
//                 </li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//             <h2>Add School</h2>
//           </div>
//           <form onSubmit={handleSubmit(addNewSchool)}>
//           <div className="row ps-2 pe-2">
//             <div className="bg-white cardradius p-3">
//               {/* School Form Collapse */}
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   School Form
//                 </h2>
//                 <span className='text-end' onClick={toggleSchoolForm} style={{cursor: 'pointer'}}>
//                   {schoolFormOpen ? 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="p-3">
//                       <div className="row">
//                         {/* School Fields */}
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolName" className="form-label font14">School Name</label>
//                           <input id="schoolName" type="text" className={`form-control font14 ${errors.schoolName ? 'border-danger' : ''}`} placeholder="School Name" {...register('schoolName', { required: 'School Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'School Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in School Name'; } return true; } } )} />
//                           {errors.schoolName && <p className="font12 text-danger">{errors.schoolName.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolAddress" className="form-label font14">School Address</label>
//                           <input id="schoolAddress" type="text" className={`form-control font14 ${errors.schoolAddress ? 'border-danger' : ''}`} placeholder="School Address" {...register("schoolAddress" , { required: 'School Address is required *', validate: value => { if(value.length < 4) { return 'Minimum Length is 4'; } if(/^[a-zA-Z0-9\s,.'-]+$/.test(value) ) { return 'School Address must contain only letters, and spaces'; } return true; }})} />
//                           {errors.schoolAddress && <p className="font12 text-danger">{errors.schoolAddress.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolEmail" className="form-label font14">School Email</label>
//                           <input id="schoolEmail" type="email" className={`form-control font14 ${errors.schoolEmail ? 'border-danger' : ''}`} placeholder="School Email" {...register('schoolEmail', { required: 'School Email is required *', validate: value => { if(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{4,}$/.test(value)) {return 'Not a valid email format' ;} return true; }})} />
//                           {errors.schoolEmail && <p className="font12 text-danger">{errors.schoolEmail.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolPhone" className="form-label font14">School Phone</label>
//                           {/* <input id="schoolPhone" type="text" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="School Phone" {...register('schoolPhone', { required: 'School Phone is required', pattern: { value: /^[0-9]+$/, message: 'School Phone must contain only digits', }, })} /> */}
//                           {/* <PhoneInput country={'in'} inputProps={{ name: 'schoolPhone', required: true, autoFocus: true, }} containerClass={`react-tel-input ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number"
//                             inputStyle={{ width:'100%', backgroundColor: '#fff', color: '#000', borderColor: '#dee2e6', borderRadius: '8px', paddingLeft: '9%', paddingTop: '1.8px', paddingBottom: '1.8px', fontSize: '14px', }}
//                             buttonStyle={{ borderColor: '#dee2e6', borderRight: 'none' }}
//                             dropdownStyle={{ fontSize: '14px', }}
//                             onChange={(value) => register('schoolPhone').onChange(value)}
//                           /> */}
//                           <input id="schoolPhone" type="tel" className={`form-control font14 ${errors.schoolPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number"
//                               {...register('schoolPhone', {
//                                 required: 'School Phone Number is required',
//                                 validate: value => {
//                                   if (!/^[6-9][0-9]{3}/.test(value)) {
//                                     return 'Phone number must start with digits between 6 and 9';
//                                   }
//                                   if (!/^[0-9]*$/.test(value)) {
//                                     return 'Invalid character in phone number. Please enter only digits';
//                                   }
//                                   if (value.length < 10) {
//                                     return 'Phone number must be of minimum 10 digits';
//                                   }
//                                   if (value.length > 10) {
//                                     return 'Phone number can be of maximum 10 digits';
//                                   }
//                                   return true;
//                                 }
//                               })}
//                             />
//                           {errors.schoolPhone && <p className="text-danger">{errors.schoolPhone.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolPackage" className="form-label font14">School Package</label>
//                           <select id="schoolPackage" className={`form-select font14 ${errors.schoolPackage ? 'border-danger' : ''}`} {...register('schoolPackage', { required: 'Package selection is required' })} >
//                             <option value="">Select Package</option>
//                             {allPlans.map((plan) => ( <option key={plan.planId} value={plan.planId}> {plan.planName} </option> ))}
//                           </select>
//                           {errors.schoolPackage && <p className="text-danger">{errors.schoolPackage.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolDescription" className="form-label font14">School Description</label>
//                           <input id="schoolDescription" type="text" className={`form-control font14 ${errors.schoolDescription ? 'border-danger' : ''}`} placeholder="School Description" {...register('schoolDescription', { required: 'School Description is required' })} />
//                           {errors.schoolDescription && <p className="text-danger">{errors.schoolDescription.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolLogo" className="form-label font14">School Logo</label>
//                           <input id="schoolLogo" type="file" className={`form-control font14 ${errors.schoolLogo ? 'border-danger' : ''}`} accept="image/*" {...register('schoolLogo', { required: 'School Logo is required', validate: (value) => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; }, })} />
//                           {errors.schoolLogo && <p className="text-danger">{errors.schoolLogo.message}</p>}
//                         </div>
//                       </div>
//                   </div>
//                 </div>
//               </CollapsedContainer>

//               {/* Admin Form Collapse */}
//               <div className={`d-inline-flex gap-1 p-2 col-12 mt-3 headingbg ${adminInfoOpen ? 'active' : ''}`}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdminFormCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdminFormCollapse">
//                   Admin Form
//                 </h2>
//                 <span className='text-end' onClick={toggleAdminInfo} style={{cursor: 'pointer'}}>
//                   {adminInfoOpen ? 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdminFormCollapse">
//                   <div className="p-3">
//                     <div className="row">


//                       {/* Admin Fields */}
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminName" className="form-label font14">Admin Name</label>
//                         <input id="adminName" type="text" className={`form-control font14 ${errors.adminName ? 'border-danger' : ''}`} placeholder="Enter Admin Name"
//                           {...register('adminName', { required: 'Admin Name is required', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Admin Name must start with an uppercase letter'; } if (value.length < 3) { return 'Minimum length is 3'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid characters in Admin Name'; } return true; } })}
//                         />
//                         {errors.adminName && <p className="text-danger">{errors.adminName.message}</p>}
//                       </div>

//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminGender" className="form-label font14">Gender</label>
//                         <select id="adminGender" className={`form-select font14 ${errors.adminGender ? 'border-danger' : ''}`}
//                           {...register('adminGender', { required: 'Gender is required' })}>
//                           <option value="">Select Gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                         {errors.adminGender && <p className="text-danger">{errors.adminGender.message}</p>}
//                       </div>

//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminAddress" className="form-label font14">Admin Address</label>
//                         <input id="adminAddress" type="text" className={`form-control font14 ${errors.adminAddress ? 'border-danger' : ''}`} placeholder="Enter Admin Address"
//                           {...register('adminAddress', {
//                             required: 'Admin Address is required',
//                             minLength: { value: 5, message: 'Minimum length is 5 characters' }
//                           })}
//                         />
//                         {errors.adminAddress && <p className="text-danger">{errors.adminAddress.message}</p>}
//                       </div>

//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminPhone" className="form-label font14">Admin Phone Number</label>
//                         <PhoneInput country={'in'} inputProps={{ name: 'adminPhone', required: true, autoFocus: true, }} containerClass={`react-tel-input ${errors.adminPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number"
//                           inputStyle={{ width:'100%', backgroundColor: '#fff', color: '#000', borderColor: '#dee2e6', borderRadius: '8px', paddingLeft: '9%', paddingTop: '1.8px', paddingBottom: '1.8px', fontSize: '14px', }}
//                           buttonStyle={{ borderColor: '#dee2e6', borderRight: 'none' }}
//                           dropdownStyle={{ fontSize: '14px', }}
//                           onChange={(value) => register('adminPhone').onChange(value)}
//                         />
//                         {errors.adminPhone && ( <p className="text-danger"> {errors.adminPhone.message}. Example: 9876543210 </p> )}

//                         {/* <input id="adminPhone" type="text" className={`form-control font14 ${errors.adminPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number"
//                           {...register('adminPhone', {
//                             required: 'Admin Phone Number is required',
//                             validate: value => {
//                               if (!/^[6-9][0-9]{3}/.test(value)) {
//                                 return 'Phone number must start with digits between 6 and 9';
//                               }
//                               if (!/^[0-9]*$/.test(value)) {
//                                 return 'Invalid character in phone number. Please enter only digits';
//                               }
//                               if (value.length < 10) {
//                                 return 'Phone number must be of minimum 10 digits';
//                               }
//                               if (value.length > 10) {
//                                 return 'Phone number can be of maximum 10 digits';
//                               }
//                               return true;
//                             }
//                           })}
//                         />
//                         {errors.adminPhone && <p className="text-danger">{errors.adminPhone.message}</p>} */}
//                       </div>

//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminEmail" className="form-label font14">Admin Email</label>
//                         <input id="adminEmail" type="email" className={`form-control font14 ${errors.adminEmail ? 'border-danger' : ''}`} placeholder="Enter Admin Email"
//                           {...register('adminEmail', {
//                             required: 'Admin Email is required',
//                             pattern: {
//                               value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                               message: 'Invalid email format'
//                             }
//                           })}
//                         />
//                         {errors.adminEmail && <p className="text-danger">{errors.adminEmail.message}</p>}
//                       </div>

//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminPhoto" className="form-label font14">Photo</label>
//                         <input id="adminPhoto" type="file" className={`form-control font14 ${errors.adminPhoto ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png'
//                           {...register('adminPhoto', {
//                             required: 'Photo is required',
//                             validate: value => {
//                               if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) {
//                                 return 'File size must be between 10 KB to 200 KB';
//                               }
//                               return true;
//                             }
//                           })}
//                         />
//                         {errors.adminPhoto && <p className="text-danger">{errors.adminPhoto.message}</p>}
//                       </div>




//                       {/* <div className="col-md-6 mb-3">
//                         <label htmlFor="adminName" className="form-label font14">Admin Name</label>
//                         <input id="adminName" type="text" className={`form-control font14 ${errors.adminName ? 'border-danger' : ''}`} placeholder="Enter Admin Name" {...register('adminName', { required: 'Admin Name is required' })} />
//                         {errors.adminName && <p className="text-danger">{errors.adminName.message}</p>}
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminGender" className="form-label font14">Gender</label>
//                         <select id="adminGender" className={`form-select font14 ${errors.adminGender ? 'border-danger' : ''}`} {...register('adminGender', { required: 'Gender is required' })} >
//                           <option value="">Select Gender</option>
//                           <option value="male">Male</option>
//                           <option value="female">Female</option>
//                           <option value="other">Other</option>
//                         </select>
//                         {errors.adminGender && <p className="text-danger">{errors.adminGender.message}</p>}
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminAddress" className="form-label font14">Admin Address</label>
//                         <input id="adminAddress" type="text" className={`form-control font14 ${errors.adminAddress ? 'border-danger' : ''}`} placeholder="Enter Admin Address" {...register('adminAddress', { required: 'Admin Address is required' })} />
//                         {errors.adminAddress && <p className="text-danger">{errors.adminAddress.message}</p>}
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminPhone" className="form-label font14">Admin Phone Number</label>
//                         <input id="adminPhone" type="text" className={`form-control font14 ${errors.adminPhone ? 'border-danger' : ''}`} placeholder="Enter Phone Number" {...register('adminPhone', { required: 'Admin Phone Number is required', pattern: { value: /^[0-9]+$/, message: 'Admin Phone Number must contain only digits', }, })} />
//                         {errors.adminPhone && <p className="text-danger">{errors.adminPhone.message}</p>}
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminEmail" className="form-label font14">Admin Email</label>
//                         <input id="adminEmail" type="email" className={`form-control font14 ${errors.adminEmail ? 'border-danger' : ''}`} placeholder="Enter Admin Email" {...register('adminEmail', { required: 'Admin Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email format', }, })} />
//                         {errors.adminEmail && <p className="text-danger">{errors.adminEmail.message}</p>}
//                       </div>
//                       <div className="col-md-6 mb-3">
//                         <label htmlFor="adminPhoto" className="form-label font14">Photo</label>
//                         <input id="adminPhoto" type="file" className={`form-control font14 ${errors.adminPhoto ? 'border-danger' : ''}`} accept="image/*" {...register('adminPhoto', { required: 'Photo is required', validate: (value) => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; }, })} />
//                         {errors.adminPhoto && <p className="text-danger">{errors.adminPhoto.message}</p>}
//                       </div> */}
//                     </div>
//                   </div>
//                 </div>
//               </CollapsedContainer>

//               <div className="d-flex justify-content-center mt-3 mb-3">
//                 <button className='me-2 btn addButtons text-white' type="submit">Submit</button>
//                 <button className='ms-2 btn cancelButtons text-black' type="button">Cancel</button>
//               </div>

//             </div>
//           </div>
//           </form>
//         </div>
//         <Toaster/>
//       </Container>
//     </>
//   );
// };

// export default AddSchool;

























// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const Container = styled.div`
//   height: 92vh;
//   overflow: scroll;
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }
//   .headingbg {
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }
//   .card {
//     border: none;
//   }
//   .form-control, .form-control::placeholder, .form-select {
//     font-size: var(--font-size-14) !important;
//     color: var(--greyInputTextColor);
//   }
//   .form-control, .form-select {
//     background-color: #fff !important;
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }
//   .form-control:focus, .form-select:focus {
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }
//   .formcontrolFile {
//     color: Black;
//   }
//   .text-danger {
//     color: #dc3545;
//     font-size: 0.875em;
//     margin-top: 0.25rem;
//   }
// `;

// const CollapsedContainer = styled.div`
//   .collapse {
//     transition: height 0.3s ease;
//   }
// `;

// const schema = yup.object().shape({
//   schoolName: yup.string().required('School Name is required'),
//   schoolAddress: yup.string().required('School Address is required'),
//   schoolEmail: yup.string().email('Invalid email format').required('School Email is required'),
//   schoolPhone: yup.string().required('School Phone is required'),
//   schoolPackage: yup.string().required('Package selection is required'),
//   schoolDescription: yup.string().required('School Description is required'),
//   schoolLogo: yup.mixed().required('School Logo is required').test('fileSize', 'File size must be between 10 KB to 200 KB', value => value && value.size >= 10240 && value.size <= 204800),
//   adminName: yup.string().required('Admin Name is required'),
//   adminAddress: yup.string().required('Admin Address is required'),
//   adminEmail: yup.string().email('Invalid email format').required('Admin Email is required'),
//   adminPhone: yup.string().required('Admin Phone is required'),
//   adminGender: yup.string().required('Admin Gender is required'),
//   adminPhoto: yup.mixed().required('Admin Photo is required').test('fileSize', 'File size must be between 10 KB to 200 KB', value => value && value.size >= 10240 && value.size <= 204800),
// });

// const AddSchool = () => {
//   const token = localStorage.getItem('token');
//   const [loaderState, setLoaderState] = useState(false);
//   const navigate = useNavigate();
//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);
//   const [allPlans, setAllPlan] = useState([]);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     mode: 'onChange'
//   });

//   useEffect(() => {
//     getAllPlans();
//   }, [token]);

//   const getAllPlans = async () => {
//     setLoaderState(true);
//     try {
//       const response = await getAllPlanApi('', '', '');
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setAllPlan(response?.data?.plans);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//       toast.error('Error fetching plans');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//   };

//   const addNewSchool = async (data) => {
//     setLoaderState(true);
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }

//       const response = await addNewSchoolApi(formData);
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setTimeout(() => navigate('/allSchoolsPage'), 1000);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during submission:', error);
//       toast.error('Error adding school');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   return (
//     <>
//       <Container>
//         { loaderState && <DataLoader /> }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
//                 </li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//           </div>
//           <div className="row mb-3"><h2>Add School</h2></div>
//           <form onSubmit={handleSubmit(addNewSchool)}>
//           <div className="row ps-2 pe-2">
//             <div className="bg-white cardradius p-3">
//               {/* School Form Collapse */}
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`} onClick={toggleSchoolForm}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   School Form
//                 </h2>
//                 <span className='text-end'>
//                   {schoolFormOpen ? 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="p-3">
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolName" className="form-label">School Name</label>
//                           <input
//                             id="schoolName"
//                             type="text"
//                             className="form-control"
//                             placeholder="School Name"
//                             {...register('schoolName')}
//                           />
//                           {errors.schoolName && <p className="text-danger">{errors.schoolName.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolAddress" className="form-label">School Address</label>
//                           <input
//                             id="schoolAddress"
//                             type="text"
//                             className="form-control"
//                             placeholder="School Address"
//                             {...register('schoolAddress')}
//                           />
//                           {errors.schoolAddress && <p className="text-danger">{errors.schoolAddress.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolEmail" className="form-label">School Email</label>
//                           <input
//                             id="schoolEmail"
//                             type="email"
//                             className="form-control"
//                             placeholder="School Email"
//                             {...register('schoolEmail')}
//                           />
//                           {errors.schoolEmail && <p className="text-danger">{errors.schoolEmail.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolPhone" className="form-label">School Phone</label>
//                           <input
//                             id="schoolPhone"
//                             type="text"
//                             className="form-control"
//                             placeholder="School Phone"
//                             {...register('schoolPhone')}
//                           />
//                           {errors.schoolPhone && <p className="text-danger">{errors.schoolPhone.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolPackage" className="form-label">School Package</label>
//                           <select
//                             id="schoolPackage"
//                             className="form-select"
//                             {...register('schoolPackage')}
//                           >
//                             <option value="">Select Package</option>
//                             {allPlans.map(plan => (
//                               <option key={plan.id} value={plan.id}>{plan.name}</option>
//                             ))}
//                           </select>
//                           {errors.schoolPackage && <p className="text-danger">{errors.schoolPackage.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolDescription" className="form-label">School Description</label>
//                           <textarea
//                             id="schoolDescription"
//                             className="form-control"
//                             placeholder="School Description"
//                             {...register('schoolDescription')}
//                           />
//                           {errors.schoolDescription && <p className="text-danger">{errors.schoolDescription.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolLogo" className="form-label">School Logo</label>
//                           <input
//                             id="schoolLogo"
//                             type="file"
//                             className="form-control"
//                             accept="image/*"
//                             {...register('schoolLogo')}
//                           />
//                           {errors.schoolLogo && <p className="text-danger">{errors.schoolLogo.message}</p>}
//                         </div>
//                       </div>
//                   </div>
//                 </div>
//               </CollapsedContainer>
//             </div>
//           </div>
//           <div className="row mt-3 ps-2 pe-2">
//             <div className="bg-white cardradius p-3">
//               {/* Admin Info Collapse */}
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${adminInfoOpen ? 'active' : ''}`} onClick={toggleAdminInfo}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdminInfoCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdminInfoCollapse">
//                   Admin Info
//                 </h2>
//                 <span className='text-end'>
//                   {adminInfoOpen ? 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdminInfoCollapse">
//                   <div className="p-3">
//                     {/* <form onSubmit={handleSubmit(onSubmit)}> */}
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminName" className="form-label">Admin Name</label>
//                           <input
//                             id="adminName"
//                             type="text"
//                             className="form-control"
//                             placeholder="Admin Name"
//                             {...register('adminName')}
//                           />
//                           {errors.adminName && <p className="text-danger">{errors.adminName.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminAddress" className="form-label">Admin Address</label>
//                           <input
//                             id="adminAddress"
//                             type="text"
//                             className="form-control"
//                             placeholder="Admin Address"
//                             {...register('adminAddress')}
//                           />
//                           {errors.adminAddress && <p className="text-danger">{errors.adminAddress.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminEmail" className="form-label">Admin Email</label>
//                           <input
//                             id="adminEmail"
//                             type="email"
//                             className="form-control"
//                             placeholder="Admin Email"
//                             {...register('adminEmail')}
//                           />
//                           {errors.adminEmail && <p className="text-danger">{errors.adminEmail.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminPhone" className="form-label">Admin Phone</label>
//                           <input
//                             id="adminPhone"
//                             type="text"
//                             className="form-control"
//                             placeholder="Admin Phone"
//                             {...register('adminPhone')}
//                           />
//                           {errors.adminPhone && <p className="text-danger">{errors.adminPhone.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminGender" className="form-label">Admin Gender</label>
//                           <select
//                             id="adminGender"
//                             className="form-select"
//                             {...register('adminGender')}
//                           >
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                           </select>
//                           {errors.adminGender && <p className="text-danger">{errors.adminGender.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminPhoto" className="form-label">Admin Photo</label>
//                           <input
//                             id="adminPhoto"
//                             type="file"
//                             className="form-control"
//                             accept="image/*"
//                             {...register('adminPhoto')}
//                           />
//                           {errors.adminPhoto && <p className="text-danger">{errors.adminPhoto.message}</p>}
//                         </div>
//                         <p className="text-center mt-3">
//                           <button className='me-2 btn addButtons text-white' type='submit' >Submit</button>
//                           <button className='ms-2 btn cancelButtons text-black' type='button' >Cancel</button>
//                         </p>
//                         {/* <div className="col-12 text-center mb-3">
//                         </div> */}
//                       </div>
//                   </div>
//                 </div>
//               </CollapsedContainer>
//             </div>
//           </div>
//           </form>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AddSchool;




















// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const Container = styled.div`
//   height: 92vh;
//   overflow: scroll;
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }
//   .headingbg {
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }
//   .card {
//     border: none;
//   }
//   .form-control, .form-control::placeholder, .form-select {
//     font-size: var(--font-size-14) !important;
//     color: var(--greyInputTextColor);
//   }
//   .form-control, .form-select {
//     background-color: #fff !important;
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }
//   .form-control:focus, .form-select:focus {
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }
//   .formcontrolFile {
//     color: Black;
//   }
//   .text-danger {
//     color: #dc3545;
//     font-size: 0.875em;
//     margin-top: 0.25rem;
//   }
// `;

// const CollapsedContainer = styled.div`
//   .collapse {
//     transition: height 0.3s ease;
//   }
// `;

// const schema = yup.object().shape({
//   schoolName: yup.string().required('School Name is required'),
//   schoolAddress: yup.string().required('School Address is required'),
//   schoolEmail: yup.string().email('Invalid email format').required('School Email is required'),
//   schoolPhone: yup.string().required('School Phone is required'),
//   schoolPackage: yup.string().required('Package selection is required'),
//   schoolDescription: yup.string().required('School Description is required'),
//   schoolLogo: yup.mixed().required('School Logo is required').test('fileSize', 'File size must be between 10 KB to 200 KB', value => value && value.size >= 10240 && value.size <= 204800),
//   adminName: yup.string().required('Admin Name is required'),
//   adminAddress: yup.string().required('Admin Address is required'),
//   adminEmail: yup.string().email('Invalid email format').required('Admin Email is required'),
//   adminPhone: yup.string().required('Admin Phone is required'),
//   adminGender: yup.string().required('Admin Gender is required'),
//   adminPhoto: yup.mixed().required('Admin Photo is required').test('fileSize', 'File size must be between 10 KB to 200 KB', value => value && value.size >= 10240 && value.size <= 204800),
// });

// const AddSchool = () => {
//   const token = localStorage.getItem('token');
//   const [loaderState, setLoaderState] = useState(false);
//   const navigate = useNavigate();
//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);
//   const [allPlans, setAllPlan] = useState([]);

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     mode: 'onChange'
//   });

//   useEffect(() => {
//     getAllPlans();
//   }, [token]);

//   const getAllPlans = async () => {
//     setLoaderState(true);
//     try {
//       const response = await getAllPlanApi('', '', '');
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setAllPlan(response?.data?.plans);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//       toast.error('Error fetching plans');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//     setAdminInfoOpen(false);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//     setSchoolFormOpen(false);
//   };

//   const onSubmit = async (data) => {
//     setLoaderState(true);
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }

//       const response = await addNewSchoolApi(formData);
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setTimeout(() => navigate('/allSchoolsPage'), 1000);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during submission:', error);
//       toast.error('Error adding school');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   return (
//     <>
//       <Container>
//         { loaderState && <DataLoader /> }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
//                 </li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//           </div>
//           <div className="row mb-3"><h2>Add School</h2></div>
//           <div className="row ps-2 pe-2">
//             <div className="bg-white cardradius p-3">
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`} onClick={toggleSchoolForm}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   School Form
//                 </h2>
//                 <span className='text-end'>
//                   {schoolFormOpen ? 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="p-3">
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                       <div className="row">
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolName" className="form-label">School Name</label>
//                           <input
//                             id="schoolName"
//                             type="text"
//                             className="form-control"
//                             placeholder="School Name"
//                             {...register('schoolName')}
//                           />
//                           {errors.schoolName && <p className="text-danger">{errors.schoolName.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolAddress" className="form-label">School Address</label>
//                           <input
//                             id="schoolAddress"
//                             type="text"
//                             className="form-control"
//                             placeholder="School Address"
//                             {...register('schoolAddress')}
//                           />
//                           {errors.schoolAddress && <p className="text-danger">{errors.schoolAddress.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolEmail" className="form-label">School Email</label>
//                           <input
//                             id="schoolEmail"
//                             type="email"
//                             className="form-control"
//                             placeholder="School Email"
//                             {...register('schoolEmail')}
//                           />
//                           {errors.schoolEmail && <p className="text-danger">{errors.schoolEmail.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolPhone" className="form-label">School Phone</label>
//                           <input
//                             id="schoolPhone"
//                             type="text"
//                             className="form-control"
//                             placeholder="School Phone"
//                             {...register('schoolPhone')}
//                           />
//                           {errors.schoolPhone && <p className="text-danger">{errors.schoolPhone.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolPackage" className="form-label">School Package</label>
//                           <select
//                             id="schoolPackage"
//                             className="form-select"
//                             {...register('schoolPackage')}
//                           >
//                             <option value="">Select Package</option>
//                             {allPlans.map(plan => (
//                               <option key={plan.id} value={plan.id}>{plan.name}</option>
//                             ))}
//                           </select>
//                           {errors.schoolPackage && <p className="text-danger">{errors.schoolPackage.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolDescription" className="form-label">School Description</label>
//                           <textarea
//                             id="schoolDescription"
//                             className="form-control"
//                             placeholder="School Description"
//                             {...register('schoolDescription')}
//                           />
//                           {errors.schoolDescription && <p className="text-danger">{errors.schoolDescription.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="schoolLogo" className="form-label">School Logo</label>
//                           <input
//                             id="schoolLogo"
//                             type="file"
//                             className="form-control"
//                             accept="image/*"
//                             {...register('schoolLogo')}
//                           />
//                           {errors.schoolLogo && <p className="text-danger">{errors.schoolLogo.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminName" className="form-label">Admin Name</label>
//                           <input
//                             id="adminName"
//                             type="text"
//                             className="form-control"
//                             placeholder="Admin Name"
//                             {...register('adminName')}
//                           />
//                           {errors.adminName && <p className="text-danger">{errors.adminName.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminAddress" className="form-label">Admin Address</label>
//                           <input
//                             id="adminAddress"
//                             type="text"
//                             className="form-control"
//                             placeholder="Admin Address"
//                             {...register('adminAddress')}
//                           />
//                           {errors.adminAddress && <p className="text-danger">{errors.adminAddress.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminEmail" className="form-label">Admin Email</label>
//                           <input
//                             id="adminEmail"
//                             type="email"
//                             className="form-control"
//                             placeholder="Admin Email"
//                             {...register('adminEmail')}
//                           />
//                           {errors.adminEmail && <p className="text-danger">{errors.adminEmail.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminPhone" className="form-label">Admin Phone</label>
//                           <input
//                             id="adminPhone"
//                             type="text"
//                             className="form-control"
//                             placeholder="Admin Phone"
//                             {...register('adminPhone')}
//                           />
//                           {errors.adminPhone && <p className="text-danger">{errors.adminPhone.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminGender" className="form-label">Admin Gender</label>
//                           <select
//                             id="adminGender"
//                             className="form-select"
//                             {...register('adminGender')}
//                           >
//                             <option value="">Select Gender</option>
//                             <option value="male">Male</option>
//                             <option value="female">Female</option>
//                           </select>
//                           {errors.adminGender && <p className="text-danger">{errors.adminGender.message}</p>}
//                         </div>
//                         <div className="col-md-6 mb-3">
//                           <label htmlFor="adminPhoto" className="form-label">Admin Photo</label>
//                           <input
//                             id="adminPhoto"
//                             type="file"
//                             className="form-control"
//                             accept="image/*"
//                             {...register('adminPhoto')}
//                           />
//                           {errors.adminPhoto && <p className="text-danger">{errors.adminPhoto.message}</p>}
//                         </div>
//                         <div className="col-12 text-center mb-3">
//                           <button type="submit" className="btn btn-primary">Submit</button>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </CollapsedContainer>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AddSchool;























// import React, { useEffect, useState } from 'react';
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import { useForm, Controller } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const Container = styled.div`
//   height: 92vh;
//   overflow: scroll;
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }
//   .headingbg {
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }
//   .card {
//     border: none;
//   }
//   .form-control, .form-control::placeholder, .form-select {
//     font-size: var(--font-size-14) !important;
//     color: var(--greyInputTextColor);
//   }
//   .form-control, .form-select {
//     background-color: #fff !important;
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }
//   .form-control:focus, .form-select:focus {
//     box-shadow: none !important;
//     border-color: var(--greyInputborderColor);
//   }
//   .formcontrolFile {
//     color: Black;
//   }
//   .text-danger {
//     color: #dc3545;
//     font-size: 0.875em;
//     margin-top: 0.25rem;
//   }
// `;

// const CollapsedContainer = styled.div`
//   .collapse {
//     transition: height 0.3s ease;
//   }
// `;

// const schema = yup.object().shape({
//   schoolName: yup.string().required('School Name is required'),
//   schoolAddress: yup.string().required('School Address is required'),
//   schoolEmail: yup.string().email('Invalid email format').required('School Email is required'),
//   schoolPhone: yup.string().required('School Phone is required'),
//   schoolPackage: yup.string().required('Package selection is required'),
//   schoolDescription: yup.string().required('School Description is required'),
//   schoolLogo: yup.mixed().required('School Logo is required').test('fileSize', 'File size must be between 10 KB to 200 KB', value => value && value.size >= 10240 && value.size <= 204800),
//   adminName: yup.string().required('Admin Name is required'),
//   adminAddress: yup.string().required('Admin Address is required'),
//   adminEmail: yup.string().email('Invalid email format').required('Admin Email is required'),
//   adminPhone: yup.string().required('Admin Phone is required'),
//   adminGender: yup.string().required('Admin Gender is required'),
//   adminPhoto: yup.mixed().required('Admin Photo is required').test('fileSize', 'File size must be between 10 KB to 200 KB', value => value && value.size >= 10240 && value.size <= 204800),
// });

// const AddSchool = () => {
//   const token = localStorage.getItem('token');
//   const [loaderState, setLoaderState] = useState(false);
//   const navigate = useNavigate();
//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);
//   const [allPlans, setAllPlan] = useState([]);

//   const { control, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//     mode: 'onChange'
//   });

//   useEffect(() => {
//     getAllPlans();
//   }, [token]);

//   const getAllPlans = async () => {
//     setLoaderState(true);
//     try {
//       const response = await getAllPlanApi('', '', '');
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setAllPlan(response?.data?.plans);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during update:', error);
//       toast.error('Error fetching plans');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//     setAdminInfoOpen(false);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//     setSchoolFormOpen(false);
//   };

//   const onSubmit = async (data) => {
//     setLoaderState(true);
//     try {
//       const formData = new FormData();
//       for (const key in data) {
//         formData.append(key, data[key]);
//       }

//       const response = await addNewSchoolApi(formData);
//       if (response?.status === 200 && response?.data?.status === 'success') {
//         setTimeout(() => navigate('/allSchoolsPage'), 1000);
//       } else {
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       console.error('Error during submission:', error);
//       toast.error('Error adding school');
//     } finally {
//       setLoaderState(false);
//     }
//   };

//   return (
//     <>
//       <Container>
//         { loaderState && <DataLoader /> }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item">
//                   <Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link>
//                 </li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//           </div>
//           <div className="row mb-3"><h2>Add School</h2></div>
//           <div className="row ps-2 pe-2">
//             <div className="bg-white cardradius p-3">
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`} onClick={toggleSchoolForm}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   School Form
//                 </h2>
//                 <span className='text-end'>
//                   {schoolFormOpen ? 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : 
//                     <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="card card-body">
//                     <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolName"
//                           control={control}
//                           render={({ field }) => <input type="text" className="form-control" placeholder="School Name" {...field} />}
//                         />
//                         {errors.schoolName && <p className="text-danger">{errors.schoolName.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolAddress"
//                           control={control}
//                           render={({ field }) => <input type="text" className="form-control" placeholder="School Address" {...field} />}
//                         />
//                         {errors.schoolAddress && <p className="text-danger">{errors.schoolAddress.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolEmail"
//                           control={control}
//                           render={({ field }) => <input type="email" className="form-control" placeholder="School Email" {...field} />}
//                         />
//                         {errors.schoolEmail && <p className="text-danger">{errors.schoolEmail.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolPhone"
//                           control={control}
//                           render={({ field }) => <input type="text" className="form-control" placeholder="School Phone" {...field} />}
//                         />
//                         {errors.schoolPhone && <p className="text-danger">{errors.schoolPhone.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolPackage"
//                           control={control}
//                           render={({ field }) => (
//                             <select className="form-select" {...field}>
//                               <option value="">Select Package</option>
//                               {allPlans.map(plan => (
//                                 <option key={plan.id} value={plan.id}>{plan.name}</option>
//                               ))}
//                             </select>
//                           )}
//                         />
//                         {errors.schoolPackage && <p className="text-danger">{errors.schoolPackage.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolDescription"
//                           control={control}
//                           render={({ field }) => <textarea className="form-control" placeholder="School Description" {...field} />}
//                         />
//                         {errors.schoolDescription && <p className="text-danger">{errors.schoolDescription.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="schoolLogo"
//                           control={control}
//                           render={({ field }) => <input type="file" className="form-control" accept="image/*" {...field} />}
//                         />
//                         {errors.schoolLogo && <p className="text-danger">{errors.schoolLogo.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="adminName"
//                           control={control}
//                           render={({ field }) => <input type="text" className="form-control" placeholder="Admin Name" {...field} />}
//                         />
//                         {errors.adminName && <p className="text-danger">{errors.adminName.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="adminAddress"
//                           control={control}
//                           render={({ field }) => <input type="text" className="form-control" placeholder="Admin Address" {...field} />}
//                         />
//                         {errors.adminAddress && <p className="text-danger">{errors.adminAddress.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="adminEmail"
//                           control={control}
//                           render={({ field }) => <input type="email" className="form-control" placeholder="Admin Email" {...field} />}
//                         />
//                         {errors.adminEmail && <p className="text-danger">{errors.adminEmail.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="adminPhone"
//                           control={control}
//                           render={({ field }) => <input type="text" className="form-control" placeholder="Admin Phone" {...field} />}
//                         />
//                         {errors.adminPhone && <p className="text-danger">{errors.adminPhone.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="adminGender"
//                           control={control}
//                           render={({ field }) => (
//                             <select className="form-select" {...field}>
//                               <option value="">Select Gender</option>
//                               <option value="male">Male</option>
//                               <option value="female">Female</option>
//                             </select>
//                           )}
//                         />
//                         {errors.adminGender && <p className="text-danger">{errors.adminGender.message}</p>}
//                       </div>
//                       <div className="col-md-6">
//                         <Controller
//                           name="adminPhoto"
//                           control={control}
//                           render={({ field }) => <input type="file" className="form-control" accept="image/*" {...field} />}
//                         />
//                         {errors.adminPhoto && <p className="text-danger">{errors.adminPhoto.message}</p>}
//                       </div>
//                       <div className="col-12 text-center">
//                         <button type="submit" className="btn btn-primary">Submit</button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </CollapsedContainer>
//             </div>
//           </div>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default AddSchool;

























// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';

// const Container = styled.div`
//   height: 92vh;
//   overflow: scroll;
  
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

//   .headingbg{
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }

//   .card{
//     border: none;
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

//   .formcontrolFile{
//     color: Black;
//   }

// `;

// const CollapsedContainer = styled.div`

//   .collapse{
//     transition: height 0.3s ease;
//   }

// `;


// const AddSchool = () => {

//   const token = localStorage.getItem('token');

//   //loader State
//   const [loaderState, setloaderState] = useState(false);

//   const navigate = useNavigate();

//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);

//   const [schoolName, setSchoolName] = useState('')
//   const [schoolNameError, setSchoolNameError] = useState('')

//   const [schoolAddress, setSchoolAddress] = useState('')
//   const [schoolAddressError, setSchoolAddressError] = useState('')

//   const [schoolPhone, setSchoolPhone] = useState('')
//   const [schoolPhoneError, setSchoolPhoneError] = useState('')

//   // const [schoolId, setSchoolId] = useState('')
//   // const [schoolIdError, setSchoolIdError] = useState('')

//   const [schoolEmail, setSchoolEmail] = useState('')
//   const [schoolEmailError, setSchoolEmailError] = useState('')

//   const [schoolPackage, setSchoolPackage] = useState('')
//   const [schoolPackageError, setSchoolPackageError] = useState('')

//   const [schoolLogo, setSchoolLogo] = useState('')
//   const [schoolLogoError, setSchoolLogoError] = useState('')

//   const [schoolDescription, setSchoolDescription] = useState('')
//   const [schoolDescriptionError, setSchoolDescriptionError] = useState('')

//   const [adminName, setAdminName] = useState('')
//   const [adminNameError, setAdminNameError] = useState('')

//   const [adminAddress, setAdminAddress] = useState('')
//   const [adminAddressError, setAdminAddressError] = useState('')

//   const [adminEmail, setAdminEmail] = useState('')
//   const [adminEmailError, setAdminEmailError] = useState('')

//   const [adminPhone, setAdminPhone] = useState('')
//   const [adminPhoneError, setAdminPhoneError] = useState('')

//   const [adminGender, setAdminGender] = useState('')
//   const [adminGenderError, setAdminGenderError] = useState('')

//   const [adminPhoto, setAdminPhoto] = useState('')
//   const [adminPhotoError, setAdminPhotoError] = useState('')

//   const [allPlans, setAllPlan] = useState([])

//   useEffect(() => {
//     getAllPlans();
//   }, [token])


//   const getAllPlans = async () => {
//     setloaderState(true)
//     try {
//       const searchKey = ''
//       const page = ''
//       const size = ''
//       var response = await getAllPlanApi(searchKey, page, size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllPlan(response?.data?.plans);
//           setloaderState(false)
//         }
//         else {
//           setloaderState(false)
//           toast.error(response?.data.message);
//         }
//       }
//       else {
//         setloaderState(false)
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       setloaderState(false)
//       console.error('Error during update:', error);
//     }
//   }

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//     setAdminInfoOpen(false);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//     setSchoolFormOpen(false);
//   };


//   // *********************************************************************************
//   //                        Change in inputs
//   // *********************************************************************************

//   const handleSchoolNameChange = (e) => {
//     const newName = e.target.value;
//     setSchoolName(newName);
//     setSchoolNameError(validateName(newName));
//   };

//   const handleSchoolEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setSchoolEmail(newEmail);
//     setSchoolEmailError(validateEmail(newEmail));
//   };

//   const handleSchoolPhoneChange = (e) => {
//     const newPhone = e.target.value;
//     setSchoolPhone(newPhone);
//     setSchoolPhoneError(validatePhone(newPhone));
//   };

//   const handleSchoolAddressChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolAddress(newInputValue);
//     setSchoolAddressError(validateTextFields(newInputValue));
//   };

//   const handleSchoolDescriptionChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolDescription(newInputValue);
//     setSchoolDescriptionError(validateTextFields(newInputValue));
//   };

//   const handleSchoolPackageChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolPackage(newInputValue);
//     setSchoolPackageError(validateTextFields(newInputValue));
//   };

//   // const handleSchoolIdChange = (e) => {
//   //   const newInputValue = e.target.value;
//   //   setSchoolId(newInputValue);
//   //   setSchoolIdError(validateTextFields(newInputValue));
//   // };

//   const handleSchoolLogoChange = (e) => {
//     const file = e.target.files[0];
//     setSchoolLogo(file);
//     setSchoolLogoError(validateImage(file));
//   };

//   const handleAdminNameChange = (e) => {
//     const newName = e.target.value;
//     setAdminName(newName);
//     setAdminNameError(validateName(newName));
//   };

//   const handleAdminEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setAdminEmail(newEmail);
//     setAdminEmailError(validateEmail(newEmail));
//   };

//   const handleAdminPhoneChange = (e) => {
//     const newPhone = e.target.value;
//     setAdminPhone(newPhone);
//     setAdminPhoneError(validatePhone(newPhone));
//   };

//   const handleAdminAddressChange = (e) => {
//     const newInputValue = e.target.value;
//     setAdminAddress(newInputValue);
//     setAdminAddressError(validateTextFields(newInputValue));
//   };

//   const handleAdminGender = (e) => {
//     setAdminGender(e.target.value)
//     setAdminGenderError('')
//   }

//   const handleAdminPhotoChange = (e) => {
//     const file = e.target.files[0];
//     setAdminPhoto(file);
//     setAdminPhotoError(validateImage(file));
//   };

//   const validateImage = (value) => {
//     if (!value) {
//       return 'No file selected';
//     }
//     if (value.size < 10240 || value.size > 204800) {
//       const sizeInKB = (value.size / 1024).toFixed(2);
//       return `* File size must be between 10 KB to 200 KB ( Current Size - ${sizeInKB} KB)`;
//     }
//     return '';
//   };


//   // *********************************************************************************
//   //                        Validation of all inputs
//   // *********************************************************************************

//   const nameRegex = /^[A-Za-z\s]+$/;
//   const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
//   const PhoneRegex = /^[6-9]\d{9}$/;
//   const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

//   const validateName = (value) => {
//     if (!value.trim()) {
//       return '*Name is required';
//     } else if (!nameRegex.test(value)) {
//       return 'Invalid characters !!';
//     }
//     return '';
//   };

//   const validateEmail = (value) => {
//     if (!value.trim()) {
//       return '*Email is required';
//     } else if (!emailRegex.test(value)) {
//       return 'Invalid email format !!';
//     }
//     return '';
//   };

//   const validatePhone = (value) => {
//     if (!value.trim()) {
//       return '*Phone is required';
//     } else if (!PhoneRegex.test(value)) {
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

//     if (!schoolName) {
//       setSchoolNameError('* School Name is required');
//       isValid = false;
//     } else {
//       setSchoolNameError('');
//     }
//     if (!schoolAddress) {
//       setSchoolAddressError('* School Address is required');
//       isValid = false;
//     } else {
//       setSchoolAddressError('');
//     }
//     if (!schoolPhone) {
//       setSchoolPhoneError('* School Phone is required');
//       isValid = false;
//     } else {
//       setSchoolPhoneError('');
//     }
//     // if (!schoolId) {
//     //   setSchoolIdError('* School ID is required');
//     //   isValid = false;
//     // } else {
//     //   setSchoolIdError('');
//     // }
//     if (!schoolEmail) {
//       setSchoolEmailError('* School Email is required');
//       isValid = false;
//     } else {
//       setSchoolEmailError('');
//     }
//     if (!schoolPackage) {
//       setSchoolPackageError('* School Package is required');
//       isValid = false;
//     } else {
//       setSchoolPackageError('');
//     }
//     if (!schoolLogo) {
//       setSchoolLogoError('* School Logo is required');
//       isValid = false;
//     } else {
//       setSchoolLogoError('');
//     }
//     if (!schoolDescription) {
//       setSchoolDescriptionError('* School Description is required');
//       isValid = false;
//     } else {
//       setSchoolDescriptionError('');
//     }
//     if (!adminName) {
//       setAdminNameError('* Admin Name is required');
//       isValid = false;
//     } else {
//       setAdminNameError('');
//     }
//     if (!adminAddress) {
//       setAdminAddressError('* Admin Address is required');
//       isValid = false;
//     } else {
//       setAdminAddressError('');
//     }
//     if (!adminEmail) {
//       setAdminEmailError('* Admin Email is required');
//       isValid = false;
//     } else {
//       setAdminEmailError('');
//     }
//     if (!adminPhone) {
//       setAdminPhoneError('* Admin Phone is required');
//       isValid = false;
//     } else {
//       setAdminPhoneError('');
//     }
//     if (!adminGender) {
//       setAdminGenderError('* Admin Gender is required');
//       isValid = false;
//     } else {
//       setAdminGenderError('');
//     }
//     if (!adminPhoto) {
//       setAdminPhotoError('* Admin Photo is required');
//       isValid = false;
//     } else {
//       setAdminPhotoError('');
//     }

//     return isValid;
//   };

//   // *********************************************************************************
//   //                        Validation of all inputs
//   // *********************************************************************************


//   const AddNewSchool = async () => {
//     if (validateFields()) {
//       setloaderState(true)
//       try {
//         const formData = new FormData();
//         formData.append("schoolName", schoolName);
//         formData.append("schoolAddress", schoolAddress);
//         formData.append("schoolPhone", schoolPhone);
//         // formData.append("schoolId", schoolId);
//         formData.append("schoolEmail", schoolEmail);
//         formData.append("planId", schoolPackage);
//         formData.append("schoolImage", schoolLogo);
//         formData.append("schoolDis", schoolDescription);
//         formData.append("adminName", adminName);
//         formData.append("adminAddress", adminAddress);
//         formData.append("adminEmail", adminEmail);
//         formData.append("adminPhone", adminPhone);
//         formData.append("gender", adminGender);
//         formData.append("adminImage", adminPhoto);
//         formData.append("adminPassword", 'admin12');
//         formData.append("schoolPassword", 'school12');

//         var response = await addNewSchoolApi(formData);
//         if (response?.status === 200) {
//           console.log(response)
//           if (response?.data?.status === 'success') {
//             // toast.success(response?.data?.message)
//             setloaderState(false)
//             setTimeout(() => {
//               navigate('/allSchoolsPage')
//             }, 1000)
//           }
//           else {
//             setloaderState(false)
//             toast.error(response?.data.message);
//           }
//         }
//         else {
//           setloaderState(false)
//           toast.error(response?.data.message);
//         }
//       } catch (error) {
//         setloaderState(false)
//         console.error('Error during update:', error);
//       }
//     }
//     else {
//       toast.error('Please Validate All Fields Correctly')
//     }
//   }


//   return (
//     <>
//       <Container>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//           </div>
//           <div className="row mb-3"><h2>Add School</h2></div>
//           <div className="row ps-2 pe-2 ">
//             <div className="bg-white cardradius p-3">
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`} onClick={toggleSchoolForm}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 36 36">
//                     <path fill="black" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z" className="clr-i-outline clr-i-outline-path-1" />
//                     <path fill="black" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z" className="clr-i-outline clr-i-outline-path-2" />
//                     <path fill="black" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49" className="clr-i-outline clr-i-outline-path-3" />
//                     <path fill="black" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79" className="clr-i-outline clr-i-outline-path-4" />
//                     <path fill="black" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" className="clr-i-outline clr-i-outline-path-5" />
//                     <path fill="black" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" className="clr-i-outline clr-i-outline-path-6" />
//                     <path fill="none" d="M0 0h36v36H0z" />
//                   </svg>
//                   School Form
//                 </h2>
//                 <span className='text-end'>
//                   {schoolFormOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="card card-body">
//                     <form className="row g-3">
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Name*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" onChange={handleSchoolNameChange} placeholder='Enter School Name' />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolNameError}</span>
//                         </div>
//                       </div>
//                       {/* <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Id*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolIdError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Id' onChange={handleSchoolIdChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolIdError}</span>
//                         </div>
//                       </div> */}
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlAdd" className="form-label"><h3>School Address*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolAddressError ? 'border-1 border-danger' : ''} `} id="inputSchlAdd" placeholder='Enter Address Detail' onChange={handleSchoolAddressChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolAddressError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlEmail" className="form-label"><h3>School Email*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolEmailError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Email Id' onChange={handleSchoolEmailChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolEmailError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlPhone" className="form-label"><h3>School Phone*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolPhoneError ? 'border-1 border-danger' : ''} `} id="inputSchlPhone" placeholder='Enter Phone Number' onChange={handleSchoolPhoneChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolPhoneError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>Choose Package*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           {/* <input type="select" className={`form-control ${schoolPackageError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Select Package' onChange={handleSchoolPackageChange} /> */}
//                           <select className={`form-select ${schoolPackageError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleSchoolPackageChange}>
//                             <option >--- Choose ---</option>
//                             {allPlans?.map(option => (
//                               <option key={option.planId} value={option.planId}>
//                                 {option.planName}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolPackageError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Description*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolDescriptionError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Info' onChange={handleSchoolDescriptionChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolDescriptionError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="formFile" className="form-label"><h3>School Logo*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="file" accept='.jpg, .jpeg, .png' className={`form-control formcontrolFile ${schoolLogoError ? 'border-1 border-danger' : ''} `} id="formFile" onChange={(e) => handleSchoolLogoChange(e)} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolLogoError}</span>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </CollapsedContainer>



//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg mt-3 ${adminInfoOpen ? 'active' : ''}`} onClick={toggleAdminInfo}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdimnInfoCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdimnInfoCollapse">
//                   <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 16 16">
//                     <path fill="black" fillRule="evenodd" d="M10.5 5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m.514 2.63a4 4 0 1 0-6.028 0A4.002 4.002 0 0 0 2 11.5V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.5a4.002 4.002 0 0 0-2.986-3.87M8 9H6a2.5 2.5 0 0 0-2.5 2.5V13a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.5A2.5 2.5 0 0 0 10 9z" clipRule="evenodd" />
//                   </svg>
//                   Admin Info
//                 </h2>
//                 <span className='text-end'>
//                   {adminInfoOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdimnInfoCollapse">
//                 <div className="card card-body">
//                   <form className="row g-3">
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlName" className="form-label"><h3>Admin Name*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Name' onChange={handleAdminNameChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminNameError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlName" className="form-label"><h3>Gender*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <select className={`form-select font14 ${adminGenderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleAdminGender(e)}>
//                           <option >--- Choose ---</option>
//                           <option value='Male'>Male</option>
//                           <option value='Female'>Female</option>
//                         </select>
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminGenderError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlAdd" className="form-label"><h3>Admin Address*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminAddressError ? 'border-1 border-danger' : ''} `} id="inputSchlAdd" placeholder='Enter Admin Address' onChange={handleAdminAddressChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminAddressError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlPhone" className="form-label"><h3>Admin Phone Number*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminPhoneError ? 'border-1 border-danger' : ''} `} id="inputSchlPhone" placeholder='Enter Phone Number' onChange={handleAdminPhoneChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminPhoneError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlEmail" className="form-label"><h3>Admin Email*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminEmailError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Admin Email' onChange={handleAdminEmailChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminEmailError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="formFile1" className="form-label"><h3>Photo*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="file" accept='.jpg, .jpeg, .png' className={`form-control formcontrolFile ${adminPhotoError ? 'border-1 border-danger' : ''} `} id="formFile1" placeholder='' onChange={handleAdminPhotoChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminPhotoError}</span>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               <p className="text-center mt-3">
//                 <button className='me-2 btn addButtons text-white' onClick={AddNewSchool}>Submit</button>
//                 <button className='ms-2 btn cancelButtons text-black'>Cancel</button>
//               </p>
//             </div>
//           </div>
//           <Toaster />
//         </div>
//       </Container>
//     </>
//   )
// }

// export default AddSchool





















///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////
///////////////////////////////////////////        NORMAL CODE        ///////////////////////////////////////////



// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';

// const Container = styled.div`
//   height: 92vh;
//   overflow: scroll;
  
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

//   .headingbg{
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }

//   .card{
//     border: none;
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

//   .formcontrolFile{
//     color: Black;
//   }

// `;

// const CollapsedContainer = styled.div`

//   .collapse{
//     transition: height 0.3s ease;
//   }

// `;


// const AddSchool = () => {

//   const token = localStorage.getItem('token');

//   //loader State
//   const [loaderState, setloaderState] = useState(false);

//   const navigate = useNavigate();

//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);

//   const [schoolName, setSchoolName] = useState('')
//   const [schoolNameError, setSchoolNameError] = useState('')

//   const [schoolAddress, setSchoolAddress] = useState('')
//   const [schoolAddressError, setSchoolAddressError] = useState('')

//   const [schoolPhone, setSchoolPhone] = useState('')
//   const [schoolPhoneError, setSchoolPhoneError] = useState('')

//   // const [schoolId, setSchoolId] = useState('')
//   // const [schoolIdError, setSchoolIdError] = useState('')

//   const [schoolEmail, setSchoolEmail] = useState('')
//   const [schoolEmailError, setSchoolEmailError] = useState('')

//   const [schoolPackage, setSchoolPackage] = useState('')
//   const [schoolPackageError, setSchoolPackageError] = useState('')

//   const [schoolLogo, setSchoolLogo] = useState('')
//   const [schoolLogoError, setSchoolLogoError] = useState('')

//   const [schoolDescription, setSchoolDescription] = useState('')
//   const [schoolDescriptionError, setSchoolDescriptionError] = useState('')

//   const [adminName, setAdminName] = useState('')
//   const [adminNameError, setAdminNameError] = useState('')

//   const [adminAddress, setAdminAddress] = useState('')
//   const [adminAddressError, setAdminAddressError] = useState('')

//   const [adminEmail, setAdminEmail] = useState('')
//   const [adminEmailError, setAdminEmailError] = useState('')

//   const [adminPhone, setAdminPhone] = useState('')
//   const [adminPhoneError, setAdminPhoneError] = useState('')

//   const [adminGender, setAdminGender] = useState('')
//   const [adminGenderError, setAdminGenderError] = useState('')

//   const [adminPhoto, setAdminPhoto] = useState('')
//   const [adminPhotoError, setAdminPhotoError] = useState('')

//   const [allPlans, setAllPlan] = useState([])

//   useEffect(() => {
//     getAllPlans();
//   }, [token])


//   const getAllPlans = async () => {
//     setloaderState(true)
//     try {
//       const searchKey = ''
//       const page = ''
//       const size = ''
//       var response = await getAllPlanApi(searchKey, page, size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllPlan(response?.data?.plans);
//           setloaderState(false)
//         }
//         else {
//           setloaderState(false)
//           toast.error(response?.data.message);
//         }
//       }
//       else {
//         setloaderState(false)
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       setloaderState(false)
//       console.error('Error during update:', error);
//     }
//   }

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//     setAdminInfoOpen(false);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//     setSchoolFormOpen(false);
//   };


//   // *********************************************************************************
//   //                        Change in inputs
//   // *********************************************************************************

//   const handleSchoolNameChange = (e) => {
//     const newName = e.target.value;
//     setSchoolName(newName);
//     setSchoolNameError(validateName(newName));
//   };

//   const handleSchoolEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setSchoolEmail(newEmail);
//     setSchoolEmailError(validateEmail(newEmail));
//   };

//   const handleSchoolPhoneChange = (e) => {
//     const newPhone = e.target.value;
//     setSchoolPhone(newPhone);
//     setSchoolPhoneError(validatePhone(newPhone));
//   };

//   const handleSchoolAddressChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolAddress(newInputValue);
//     setSchoolAddressError(validateTextFields(newInputValue));
//   };

//   const handleSchoolDescriptionChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolDescription(newInputValue);
//     setSchoolDescriptionError(validateTextFields(newInputValue));
//   };

//   const handleSchoolPackageChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolPackage(newInputValue);
//     setSchoolPackageError(validateTextFields(newInputValue));
//   };

//   // const handleSchoolIdChange = (e) => {
//   //   const newInputValue = e.target.value;
//   //   setSchoolId(newInputValue);
//   //   setSchoolIdError(validateTextFields(newInputValue));
//   // };

//   const handleSchoolLogoChange = (e) => {
//     const file = e.target.files[0];
//     setSchoolLogo(file);
//     setSchoolLogoError(validateImage(file));
//   };

//   const handleAdminNameChange = (e) => {
//     const newName = e.target.value;
//     setAdminName(newName);
//     setAdminNameError(validateName(newName));
//   };

//   const handleAdminEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setAdminEmail(newEmail);
//     setAdminEmailError(validateEmail(newEmail));
//   };

//   const handleAdminPhoneChange = (e) => {
//     const newPhone = e.target.value;
//     setAdminPhone(newPhone);
//     setAdminPhoneError(validatePhone(newPhone));
//   };

//   const handleAdminAddressChange = (e) => {
//     const newInputValue = e.target.value;
//     setAdminAddress(newInputValue);
//     setAdminAddressError(validateTextFields(newInputValue));
//   };

//   const handleAdminGender = (e) => {
//     setAdminGender(e.target.value)
//     setAdminGenderError('')
//   }

//   const handleAdminPhotoChange = (e) => {
//     const file = e.target.files[0];
//     setAdminPhoto(file);
//     setAdminPhotoError(validateImage(file));
//   };

//   const validateImage = (value) => {
//     if (!value) {
//       return 'No file selected';
//     }
//     if (value.size < 10240 || value.size > 204800) {
//       const sizeInKB = (value.size / 1024).toFixed(2);
//       return `* File size must be between 10 KB to 200 KB ( Current Size - ${sizeInKB} KB)`;
//     }
//     return '';
//   };


//   // *********************************************************************************
//   //                        Validation of all inputs
//   // *********************************************************************************

//   const nameRegex = /^[A-Za-z\s]+$/;
//   const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
//   const PhoneRegex = /^[6-9]\d{9}$/;
//   const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

//   const validateName = (value) => {
//     if (!value.trim()) {
//       return '*Name is required';
//     } else if (!nameRegex.test(value)) {
//       return 'Invalid characters !!';
//     }
//     return '';
//   };

//   const validateEmail = (value) => {
//     if (!value.trim()) {
//       return '*Email is required';
//     } else if (!emailRegex.test(value)) {
//       return 'Invalid email format !!';
//     }
//     return '';
//   };

//   const validatePhone = (value) => {
//     if (!value.trim()) {
//       return '*Phone is required';
//     } else if (!PhoneRegex.test(value)) {
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

//     if (!schoolName) {
//       setSchoolNameError('* School Name is required');
//       isValid = false;
//     } else {
//       setSchoolNameError('');
//     }
//     if (!schoolAddress) {
//       setSchoolAddressError('* School Address is required');
//       isValid = false;
//     } else {
//       setSchoolAddressError('');
//     }
//     if (!schoolPhone) {
//       setSchoolPhoneError('* School Phone is required');
//       isValid = false;
//     } else {
//       setSchoolPhoneError('');
//     }
//     // if (!schoolId) {
//     //   setSchoolIdError('* School ID is required');
//     //   isValid = false;
//     // } else {
//     //   setSchoolIdError('');
//     // }
//     if (!schoolEmail) {
//       setSchoolEmailError('* School Email is required');
//       isValid = false;
//     } else {
//       setSchoolEmailError('');
//     }
//     if (!schoolPackage) {
//       setSchoolPackageError('* School Package is required');
//       isValid = false;
//     } else {
//       setSchoolPackageError('');
//     }
//     if (!schoolLogo) {
//       setSchoolLogoError('* School Logo is required');
//       isValid = false;
//     } else {
//       setSchoolLogoError('');
//     }
//     if (!schoolDescription) {
//       setSchoolDescriptionError('* School Description is required');
//       isValid = false;
//     } else {
//       setSchoolDescriptionError('');
//     }
//     if (!adminName) {
//       setAdminNameError('* Admin Name is required');
//       isValid = false;
//     } else {
//       setAdminNameError('');
//     }
//     if (!adminAddress) {
//       setAdminAddressError('* Admin Address is required');
//       isValid = false;
//     } else {
//       setAdminAddressError('');
//     }
//     if (!adminEmail) {
//       setAdminEmailError('* Admin Email is required');
//       isValid = false;
//     } else {
//       setAdminEmailError('');
//     }
//     if (!adminPhone) {
//       setAdminPhoneError('* Admin Phone is required');
//       isValid = false;
//     } else {
//       setAdminPhoneError('');
//     }
//     if (!adminGender) {
//       setAdminGenderError('* Admin Gender is required');
//       isValid = false;
//     } else {
//       setAdminGenderError('');
//     }
//     if (!adminPhoto) {
//       setAdminPhotoError('* Admin Photo is required');
//       isValid = false;
//     } else {
//       setAdminPhotoError('');
//     }

//     return isValid;
//   };

//   // *********************************************************************************
//   //                        Validation of all inputs
//   // *********************************************************************************


//   const AddNewSchool = async () => {
//     if (validateFields()) {
//       setloaderState(true)
//       try {
//         const formData = new FormData();
//         formData.append("schoolName", schoolName);
//         formData.append("schoolAddress", schoolAddress);
//         formData.append("schoolPhone", schoolPhone);
//         // formData.append("schoolId", schoolId);
//         formData.append("schoolEmail", schoolEmail);
//         formData.append("planId", schoolPackage);
//         formData.append("schoolImage", schoolLogo);
//         formData.append("schoolDis", schoolDescription);
//         formData.append("adminName", adminName);
//         formData.append("adminAddress", adminAddress);
//         formData.append("adminEmail", adminEmail);
//         formData.append("adminPhone", adminPhone);
//         formData.append("gender", adminGender);
//         formData.append("adminImage", adminPhoto);
//         formData.append("adminPassword", 'admin12');
//         formData.append("schoolPassword", 'school12');

//         var response = await addNewSchoolApi(formData);
//         if (response?.status === 200) {
//           console.log(response)
//           if (response?.data?.status === 'success') {
//             // toast.success(response?.data?.message)
//             setloaderState(false)
//             setTimeout(() => {
//               navigate('/allSchoolsPage')
//             }, 1000)
//           }
//           else {
//             setloaderState(false)
//             toast.error(response?.data.message);
//           }
//         }
//         else {
//           setloaderState(false)
//           toast.error(response?.data.message);
//         }
//       } catch (error) {
//         setloaderState(false)
//         console.error('Error during update:', error);
//       }
//     }
//     else {
//       toast.error('Please Validate All Fields Correctly')
//     }
//   }


//   return (
//     <>
//       <Container>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//           </div>
//           <div className="row mb-3"><h2>Add School</h2></div>
//           <div className="row ps-2 pe-2 ">
//             <div className="bg-white cardradius p-3">
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`} onClick={toggleSchoolForm}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 36 36">
//                     <path fill="black" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z" className="clr-i-outline clr-i-outline-path-1" />
//                     <path fill="black" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z" className="clr-i-outline clr-i-outline-path-2" />
//                     <path fill="black" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49" className="clr-i-outline clr-i-outline-path-3" />
//                     <path fill="black" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79" className="clr-i-outline clr-i-outline-path-4" />
//                     <path fill="black" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" className="clr-i-outline clr-i-outline-path-5" />
//                     <path fill="black" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" className="clr-i-outline clr-i-outline-path-6" />
//                     <path fill="none" d="M0 0h36v36H0z" />
//                   </svg>
//                   School Form
//                 </h2>
//                 <span className='text-end'>
//                   {schoolFormOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="card card-body">
//                     <form className="row g-3">
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Name*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" onChange={handleSchoolNameChange} placeholder='Enter School Name' />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolNameError}</span>
//                         </div>
//                       </div>
//                       {/* <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Id*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolIdError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Id' onChange={handleSchoolIdChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolIdError}</span>
//                         </div>
//                       </div> */}
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlAdd" className="form-label"><h3>School Address*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolAddressError ? 'border-1 border-danger' : ''} `} id="inputSchlAdd" placeholder='Enter Address Detail' onChange={handleSchoolAddressChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolAddressError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlEmail" className="form-label"><h3>School Email*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolEmailError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Email Id' onChange={handleSchoolEmailChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolEmailError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlPhone" className="form-label"><h3>School Phone*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolPhoneError ? 'border-1 border-danger' : ''} `} id="inputSchlPhone" placeholder='Enter Phone Number' onChange={handleSchoolPhoneChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolPhoneError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>Choose Package*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           {/* <input type="select" className={`form-control ${schoolPackageError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Select Package' onChange={handleSchoolPackageChange} /> */}
//                           <select className={`form-select ${schoolPackageError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleSchoolPackageChange}>
//                             <option >--- Choose ---</option>
//                             {allPlans?.map(option => (
//                               <option key={option.planId} value={option.planId}>
//                                 {option.planName}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolPackageError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Description*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolDescriptionError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Info' onChange={handleSchoolDescriptionChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolDescriptionError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="formFile" className="form-label"><h3>School Logo*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="file" accept='.jpg, .jpeg, .png' className={`form-control formcontrolFile ${schoolLogoError ? 'border-1 border-danger' : ''} `} id="formFile" onChange={(e) => handleSchoolLogoChange(e)} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolLogoError}</span>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </CollapsedContainer>



//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg mt-3 ${adminInfoOpen ? 'active' : ''}`} onClick={toggleAdminInfo}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdimnInfoCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdimnInfoCollapse">
//                   <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 16 16">
//                     <path fill="black" fillRule="evenodd" d="M10.5 5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m.514 2.63a4 4 0 1 0-6.028 0A4.002 4.002 0 0 0 2 11.5V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.5a4.002 4.002 0 0 0-2.986-3.87M8 9H6a2.5 2.5 0 0 0-2.5 2.5V13a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.5A2.5 2.5 0 0 0 10 9z" clipRule="evenodd" />
//                   </svg>
//                   Admin Info
//                 </h2>
//                 <span className='text-end'>
//                   {adminInfoOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdimnInfoCollapse">
//                 <div className="card card-body">
//                   <form className="row g-3">
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlName" className="form-label"><h3>Admin Name*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Name' onChange={handleAdminNameChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminNameError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlName" className="form-label"><h3>Gender*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <select className={`form-select font14 ${adminGenderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleAdminGender(e)}>
//                           <option >--- Choose ---</option>
//                           <option value='Male'>Male</option>
//                           <option value='Female'>Female</option>
//                         </select>
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminGenderError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlAdd" className="form-label"><h3>Admin Address*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminAddressError ? 'border-1 border-danger' : ''} `} id="inputSchlAdd" placeholder='Enter Admin Address' onChange={handleAdminAddressChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminAddressError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlPhone" className="form-label"><h3>Admin Phone Number*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminPhoneError ? 'border-1 border-danger' : ''} `} id="inputSchlPhone" placeholder='Enter Phone Number' onChange={handleAdminPhoneChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminPhoneError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlEmail" className="form-label"><h3>Admin Email*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminEmailError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Admin Email' onChange={handleAdminEmailChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminEmailError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="formFile1" className="form-label"><h3>Photo*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="file" accept='.jpg, .jpeg, .png' className={`form-control formcontrolFile ${adminPhotoError ? 'border-1 border-danger' : ''} `} id="formFile1" placeholder='' onChange={handleAdminPhotoChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminPhotoError}</span>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               <p className="text-center mt-3">
//                 <button className='me-2 btn addButtons text-white' onClick={AddNewSchool}>Submit</button>
//                 <button className='ms-2 btn cancelButtons text-black'>Cancel</button>
//               </p>
//             </div>
//           </div>
//           <Toaster />
//         </div>
//       </Container>
//     </>
//   )
// }

// export default AddSchool






















// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components';
// import { Link, useNavigate } from 'react-router-dom';
// import { addNewSchoolApi, getAllPlanApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';

// const Container = styled.div`
//   height: 92vh;
//   overflow: scroll;
  
//   .breadcrumb-item::before {
//     content: var(--bs-breadcrumb-divider, "");
//   }

//   .headingbg{
//     background-color: var(--headingBackgroundColor);
//     border-radius: 5px;
//   }

//   .card{
//     border: none;
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

//   .formcontrolFile{
//     color: Black;
//   }

// `;

// const CollapsedContainer = styled.div`

//   .collapse{
//     transition: height 0.3s ease;
//   }

// `;


// const AddSchool = () => {

//   const token = localStorage.getItem('token');

//   //loader State
//   const [loaderState, setloaderState] = useState(false);

//   const navigate = useNavigate();

//   const [schoolFormOpen, setSchoolFormOpen] = useState(true);
//   const [adminInfoOpen, setAdminInfoOpen] = useState(false);

//   const [schoolName, setSchoolName] = useState('')
//   const [schoolNameError, setSchoolNameError] = useState('')

//   const [schoolAddress, setSchoolAddress] = useState('')
//   const [schoolAddressError, setSchoolAddressError] = useState('')

//   const [schoolPhone, setSchoolPhone] = useState('')
//   const [schoolPhoneError, setSchoolPhoneError] = useState('')

//   // const [schoolId, setSchoolId] = useState('')
//   // const [schoolIdError, setSchoolIdError] = useState('')

//   const [schoolEmail, setSchoolEmail] = useState('')
//   const [schoolEmailError, setSchoolEmailError] = useState('')

//   const [schoolPackage, setSchoolPackage] = useState('')
//   const [schoolPackageError, setSchoolPackageError] = useState('')

//   const [schoolLogo, setSchoolLogo] = useState('')
//   const [schoolLogoError, setSchoolLogoError] = useState('')

//   const [schoolDescription, setSchoolDescription] = useState('')
//   const [schoolDescriptionError, setSchoolDescriptionError] = useState('')

//   const [adminName, setAdminName] = useState('')
//   const [adminNameError, setAdminNameError] = useState('')

//   const [adminAddress, setAdminAddress] = useState('')
//   const [adminAddressError, setAdminAddressError] = useState('')

//   const [adminEmail, setAdminEmail] = useState('')
//   const [adminEmailError, setAdminEmailError] = useState('')

//   const [adminPhone, setAdminPhone] = useState('')
//   const [adminPhoneError, setAdminPhoneError] = useState('')

//   const [adminGender, setAdminGender] = useState('')
//   const [adminGenderError, setAdminGenderError] = useState('')

//   const [adminPhoto, setAdminPhoto] = useState('')
//   const [adminPhotoError, setAdminPhotoError] = useState('')

//   const [allPlans, setAllPlan] = useState([])

//   useEffect(() => {
//     getAllPlans();
//   }, [token])


//   const getAllPlans = async () => {
//     setloaderState(true)
//     try {
//       const searchKey = ''
//       const page = ''
//       const size = ''
//       var response = await getAllPlanApi(searchKey, page, size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setAllPlan(response?.data?.plans);
//           setloaderState(false)
//         }
//         else {
//           setloaderState(false)
//           toast.error(response?.data.message);
//         }
//       }
//       else {
//         setloaderState(false)
//         toast.error(response?.data.message);
//       }
//     } catch (error) {
//       setloaderState(false)
//       console.error('Error during update:', error);
//     }
//   }

//   const toggleSchoolForm = () => {
//     setSchoolFormOpen(!schoolFormOpen);
//     setAdminInfoOpen(false);
//   };

//   const toggleAdminInfo = () => {
//     setAdminInfoOpen(!adminInfoOpen);
//     setSchoolFormOpen(false);
//   };


//   // *********************************************************************************
//   //                        Change in inputs
//   // *********************************************************************************

//   const handleSchoolNameChange = (e) => {
//     const newName = e.target.value;
//     setSchoolName(newName);
//     setSchoolNameError(validateName(newName));
//   };

//   const handleSchoolEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setSchoolEmail(newEmail);
//     setSchoolEmailError(validateEmail(newEmail));
//   };

//   const handleSchoolPhoneChange = (e) => {
//     const newPhone = e.target.value;
//     setSchoolPhone(newPhone);
//     setSchoolPhoneError(validatePhone(newPhone));
//   };

//   const handleSchoolAddressChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolAddress(newInputValue);
//     setSchoolAddressError(validateTextFields(newInputValue));
//   };

//   const handleSchoolDescriptionChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolDescription(newInputValue);
//     setSchoolDescriptionError(validateTextFields(newInputValue));
//   };

//   const handleSchoolPackageChange = (e) => {
//     const newInputValue = e.target.value;
//     setSchoolPackage(newInputValue);
//     setSchoolPackageError(validateTextFields(newInputValue));
//   };

//   // const handleSchoolIdChange = (e) => {
//   //   const newInputValue = e.target.value;
//   //   setSchoolId(newInputValue);
//   //   setSchoolIdError(validateTextFields(newInputValue));
//   // };

//   const handleSchoolLogoChange = (e) => {
//     const file = e.target.files[0];
//     setSchoolLogo(file);
//     setSchoolLogoError(validateImage(file));
//   };

//   const handleAdminNameChange = (e) => {
//     const newName = e.target.value;
//     setAdminName(newName);
//     setAdminNameError(validateName(newName));
//   };

//   const handleAdminEmailChange = (e) => {
//     const newEmail = e.target.value;
//     setAdminEmail(newEmail);
//     setAdminEmailError(validateEmail(newEmail));
//   };

//   const handleAdminPhoneChange = (e) => {
//     const newPhone = e.target.value;
//     setAdminPhone(newPhone);
//     setAdminPhoneError(validatePhone(newPhone));
//   };

//   const handleAdminAddressChange = (e) => {
//     const newInputValue = e.target.value;
//     setAdminAddress(newInputValue);
//     setAdminAddressError(validateTextFields(newInputValue));
//   };

//   const handleAdminGender = (e) => {
//     setAdminGender(e.target.value)
//     setAdminGenderError('')
//   }

//   const handleAdminPhotoChange = (e) => {
//     const file = e.target.files[0];
//     setAdminPhoto(file);
//     setAdminPhotoError(validateImage(file));
//   };

//   const validateImage = (value) => {
//     if (!value) {
//       return 'No file selected';
//     }
//     if (value.size < 10240 || value.size > 204800) {
//       const sizeInKB = (value.size / 1024).toFixed(2);
//       return `* File size must be between 10 KB to 200 KB ( Current Size - ${sizeInKB} KB)`;
//     }
//     return '';
//   };


//   // *********************************************************************************
//   //                        Validation of all inputs
//   // *********************************************************************************

//   const nameRegex = /^[A-Za-z\s]+$/;
//   const emailRegex = /^[A-Za-z0-9._]{3,}@[A-Za-z]{3,8}[.]{1}[A-Za-z.]{2,6}$/;
//   const PhoneRegex = /^[6-9]\d{9}$/;
//   const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

//   const validateName = (value) => {
//     if (!value.trim()) {
//       return '*Name is required';
//     } else if (!nameRegex.test(value)) {
//       return 'Invalid characters !!';
//     }
//     return '';
//   };

//   const validateEmail = (value) => {
//     if (!value.trim()) {
//       return '*Email is required';
//     } else if (!emailRegex.test(value)) {
//       return 'Invalid email format !!';
//     }
//     return '';
//   };

//   const validatePhone = (value) => {
//     if (!value.trim()) {
//       return '*Phone is required';
//     } else if (!PhoneRegex.test(value)) {
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

//     if (!schoolName) {
//       setSchoolNameError('* School Name is required');
//       isValid = false;
//     } else {
//       setSchoolNameError('');
//     }
//     if (!schoolAddress) {
//       setSchoolAddressError('* School Address is required');
//       isValid = false;
//     } else {
//       setSchoolAddressError('');
//     }
//     if (!schoolPhone) {
//       setSchoolPhoneError('* School Phone is required');
//       isValid = false;
//     } else {
//       setSchoolPhoneError('');
//     }
//     // if (!schoolId) {
//     //   setSchoolIdError('* School ID is required');
//     //   isValid = false;
//     // } else {
//     //   setSchoolIdError('');
//     // }
//     if (!schoolEmail) {
//       setSchoolEmailError('* School Email is required');
//       isValid = false;
//     } else {
//       setSchoolEmailError('');
//     }
//     if (!schoolPackage) {
//       setSchoolPackageError('* School Package is required');
//       isValid = false;
//     } else {
//       setSchoolPackageError('');
//     }
//     if (!schoolLogo) {
//       setSchoolLogoError('* School Logo is required');
//       isValid = false;
//     } else {
//       setSchoolLogoError('');
//     }
//     if (!schoolDescription) {
//       setSchoolDescriptionError('* School Description is required');
//       isValid = false;
//     } else {
//       setSchoolDescriptionError('');
//     }
//     if (!adminName) {
//       setAdminNameError('* Admin Name is required');
//       isValid = false;
//     } else {
//       setAdminNameError('');
//     }
//     if (!adminAddress) {
//       setAdminAddressError('* Admin Address is required');
//       isValid = false;
//     } else {
//       setAdminAddressError('');
//     }
//     if (!adminEmail) {
//       setAdminEmailError('* Admin Email is required');
//       isValid = false;
//     } else {
//       setAdminEmailError('');
//     }
//     if (!adminPhone) {
//       setAdminPhoneError('* Admin Phone is required');
//       isValid = false;
//     } else {
//       setAdminPhoneError('');
//     }
//     if (!adminGender) {
//       setAdminGenderError('* Admin Gender is required');
//       isValid = false;
//     } else {
//       setAdminGenderError('');
//     }
//     if (!adminPhoto) {
//       setAdminPhotoError('* Admin Photo is required');
//       isValid = false;
//     } else {
//       setAdminPhotoError('');
//     }

//     return isValid;
//   };

//   // *********************************************************************************
//   //                        Validation of all inputs
//   // *********************************************************************************


//   const AddNewSchool = async () => {
//     if (validateFields()) {
//       setloaderState(true)
//       try {
//         const formData = new FormData();
//         formData.append("schoolName", schoolName);
//         formData.append("schoolAddress", schoolAddress);
//         formData.append("schoolPhone", schoolPhone);
//         // formData.append("schoolId", schoolId);
//         formData.append("schoolEmail", schoolEmail);
//         formData.append("planId", schoolPackage);
//         formData.append("schoolImage", schoolLogo);
//         formData.append("schoolDis", schoolDescription);
//         formData.append("adminName", adminName);
//         formData.append("adminAddress", adminAddress);
//         formData.append("adminEmail", adminEmail);
//         formData.append("adminPhone", adminPhone);
//         formData.append("gender", adminGender);
//         formData.append("adminImage", adminPhoto);
//         formData.append("adminPassword", 'admin12');
//         formData.append("schoolPassword", 'school12');

//         var response = await addNewSchoolApi(formData);
//         if (response?.status === 200) {
//           console.log(response)
//           if (response?.data?.status === 'success') {
//             // toast.success(response?.data?.message)
//             setloaderState(false)
//             setTimeout(() => {
//               navigate('/allSchoolsPage')
//             }, 1000)
//           }
//           else {
//             setloaderState(false)
//             toast.error(response?.data.message);
//           }
//         }
//         else {
//           setloaderState(false)
//           toast.error(response?.data.message);
//         }
//       } catch (error) {
//         setloaderState(false)
//         console.error('Error during update:', error);
//       }
//     }
//     else {
//       toast.error('Please Validate All Fields Correctly')
//     }
//   }


//   return (
//     <>
//       <Container>
//         {
//           loaderState && (
//             <DataLoader />
//           )
//         }
//         <div className="container-fluid ps-3 pe-3 pt-2 pb-2">
//           <div className="row pt-3">
//             <nav className='breadcrumnav' aria-label="breadcrumb">
//               <ol className="breadcrumb">
//                 <li className="breadcrumb-item"><Link to="#" className='greyText text-decoration-none'><h2>Home &gt; </h2></Link></li>
//                 <li className="breadcrumb-item active greenText" aria-current="page"><h2> Add Schools</h2></li>
//               </ol>
//             </nav>
//           </div>
//           <div className="row mb-3"><h2>Add School</h2></div>
//           <div className="row ps-2 pe-2 ">
//             <div className="bg-white cardradius p-3">
//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg ${schoolFormOpen ? 'active' : ''}`} onClick={toggleSchoolForm}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#SchoolFormCollapse" role="button" aria-expanded={schoolFormOpen} aria-controls="SchoolFormCollapse">
//                   <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 36 36">
//                     <path fill="black" d="M21 12H7a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1M8 10h12V7.94H8Z" className="clr-i-outline clr-i-outline-path-1" />
//                     <path fill="black" d="M21 14.08H7a1 1 0 0 0-1 1V19a1 1 0 0 0 1 1h11.36L22 16.3v-1.22a1 1 0 0 0-1-1M20 18H8v-2h12Z" className="clr-i-outline clr-i-outline-path-2" />
//                     <path fill="black" d="M11.06 31.51v-.06l.32-1.39H4V4h20v10.25l2-1.89V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v28a1 1 0 0 0 1 1h8a3.44 3.44 0 0 1 .06-.49" className="clr-i-outline clr-i-outline-path-3" />
//                     <path fill="black" d="m22 19.17l-.78.79a1 1 0 0 0 .78-.79" className="clr-i-outline clr-i-outline-path-4" />
//                     <path fill="black" d="M6 26.94a1 1 0 0 0 1 1h4.84l.3-1.3l.13-.55v-.05H8V24h6.34l2-2H7a1 1 0 0 0-1 1Z" className="clr-i-outline clr-i-outline-path-5" />
//                     <path fill="black" d="m33.49 16.67l-3.37-3.37a1.61 1.61 0 0 0-2.28 0L14.13 27.09L13 31.9a1.61 1.61 0 0 0 1.26 1.9a1.55 1.55 0 0 0 .31 0a1.15 1.15 0 0 0 .37 0l4.85-1.07L33.49 19a1.6 1.6 0 0 0 0-2.27ZM18.77 30.91l-3.66.81l.89-3.63L26.28 17.7l2.82 2.82Zm11.46-11.52l-2.82-2.82L29 15l2.84 2.84Z" className="clr-i-outline clr-i-outline-path-6" />
//                     <path fill="none" d="M0 0h36v36H0z" />
//                   </svg>
//                   School Form
//                 </h2>
//                 <span className='text-end'>
//                   {schoolFormOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <CollapsedContainer>
//                 <div className={`collapse ${schoolFormOpen ? 'show' : ''}`} id="SchoolFormCollapse">
//                   <div className="card card-body">
//                     <form className="row g-3">
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Name*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" onChange={handleSchoolNameChange} placeholder='Enter School Name' />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolNameError}</span>
//                         </div>
//                       </div>
//                       {/* <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Id*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolIdError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Id' onChange={handleSchoolIdChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolIdError}</span>
//                         </div>
//                       </div> */}
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlAdd" className="form-label"><h3>School Address*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolAddressError ? 'border-1 border-danger' : ''} `} id="inputSchlAdd" placeholder='Enter Address Detail' onChange={handleSchoolAddressChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolAddressError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlEmail" className="form-label"><h3>School Email*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolEmailError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Email Id' onChange={handleSchoolEmailChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolEmailError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlPhone" className="form-label"><h3>School Phone*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolPhoneError ? 'border-1 border-danger' : ''} `} id="inputSchlPhone" placeholder='Enter Phone Number' onChange={handleSchoolPhoneChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolPhoneError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>Choose Package*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           {/* <input type="select" className={`form-control ${schoolPackageError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Select Package' onChange={handleSchoolPackageChange} /> */}
//                           <select className={`form-select ${schoolPackageError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={handleSchoolPackageChange}>
//                             <option >--- Choose ---</option>
//                             {allPlans?.map(option => (
//                               <option key={option.planId} value={option.planId}>
//                                 {option.planName}
//                               </option>
//                             ))}
//                           </select>
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolPackageError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="inputSchlName" className="form-label"><h3>School Description*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="text" className={`form-control ${schoolDescriptionError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Info' onChange={handleSchoolDescriptionChange} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolDescriptionError}</span>
//                         </div>
//                       </div>
//                       <div className="col-md-6">
//                         <div className="col-md-12">
//                           <label htmlFor="formFile" className="form-label"><h3>School Logo*</h3></label>
//                         </div>
//                         <div className="col-md-12">
//                           <input type="file" accept='.jpg, .jpeg, .png' className={`form-control formcontrolFile ${schoolLogoError ? 'border-1 border-danger' : ''} `} id="formFile" onChange={(e) => handleSchoolLogoChange(e)} />
//                         </div>
//                         <div className="col-md-12">
//                           <span className="text-danger">{schoolLogoError}</span>
//                         </div>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               </CollapsedContainer>



//               <div className={`d-inline-flex gap-1 p-2 col-12 headingbg mt-3 ${adminInfoOpen ? 'active' : ''}`} onClick={toggleAdminInfo}>
//                 <h2 className="flex-grow-1" data-bs-toggle="collapse" to="#AdimnInfoCollapse" role="button" aria-expanded={adminInfoOpen} aria-controls="AdimnInfoCollapse">
//                   <svg className='me-1' xmlns="http://www.w3.org/2000/svg" width="1.7em" height="1.7em" viewBox="0 0 16 16">
//                     <path fill="black" fillRule="evenodd" d="M10.5 5a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0m.514 2.63a4 4 0 1 0-6.028 0A4.002 4.002 0 0 0 2 11.5V13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1.5a4.002 4.002 0 0 0-2.986-3.87M8 9H6a2.5 2.5 0 0 0-2.5 2.5V13a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-1.5A2.5 2.5 0 0 0 10 9z" clipRule="evenodd" />
//                   </svg>
//                   Admin Info
//                 </h2>
//                 <span className='text-end'>
//                   {adminInfoOpen ? <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 32 32"><path fill="black" d="M16 3C8.832 3 3 8.832 3 16s5.832 13 13 13s13-5.832 13-13S23.168 3 16 3m0 2c6.087 0 11 4.913 11 11s-4.913 11-11 11S5 22.087 5 16S9.913 5 16 5m-6 10v2h12v-2z" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 1024 1024"><path fill="black" d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512c282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0m0 961.008c-247.024 0-448-201.984-448-449.01c0-247.024 200.976-448 448-448s448 200.977 448 448s-200.976 449.01-448 449.01M736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32" /></svg>}
//                 </span>
//               </div>
//               <div className={`collapse ${adminInfoOpen ? 'show' : ''}`} id="AdimnInfoCollapse">
//                 <div className="card card-body">
//                   <form className="row g-3">
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlName" className="form-label"><h3>Admin Name*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminNameError ? 'border-1 border-danger' : ''} `} id="inputSchlName" placeholder='Enter School Name' onChange={handleAdminNameChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminNameError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlName" className="form-label"><h3>Gender*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <select className={`form-select font14 ${adminGenderError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => handleAdminGender(e)}>
//                           <option >--- Choose ---</option>
//                           <option value='Male'>Male</option>
//                           <option value='Female'>Female</option>
//                         </select>
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminGenderError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlAdd" className="form-label"><h3>Admin Address*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminAddressError ? 'border-1 border-danger' : ''} `} id="inputSchlAdd" placeholder='Enter Admin Address' onChange={handleAdminAddressChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminAddressError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlPhone" className="form-label"><h3>Admin Phone Number*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminPhoneError ? 'border-1 border-danger' : ''} `} id="inputSchlPhone" placeholder='Enter Phone Number' onChange={handleAdminPhoneChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminPhoneError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="inputSchlEmail" className="form-label"><h3>Admin Email*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="text" className={`form-control ${adminEmailError ? 'border-1 border-danger' : ''} `} id="inputSchlEmail" placeholder='Enter Admin Email' onChange={handleAdminEmailChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminEmailError}</span>
//                       </div>
//                     </div>
//                     <div className="col-md-6">
//                       <div className="col-md-12">
//                         <label htmlFor="formFile1" className="form-label"><h3>Photo*</h3></label>
//                       </div>
//                       <div className="col-md-12">
//                         <input type="file" accept='.jpg, .jpeg, .png' className={`form-control formcontrolFile ${adminPhotoError ? 'border-1 border-danger' : ''} `} id="formFile1" placeholder='' onChange={handleAdminPhotoChange} />
//                       </div>
//                       <div className="col-md-12">
//                         <span className="text-danger">{adminPhotoError}</span>
//                       </div>
//                     </div>
//                   </form>
//                 </div>
//               </div>

//               <p className="text-center mt-3">
//                 <button className='me-2 btn addButtons text-white' onClick={AddNewSchool}>Submit</button>
//                 <button className='ms-2 btn cancelButtons text-black'>Cancel</button>
//               </p>
//             </div>
//           </div>
//           <Toaster />
//         </div>
//       </Container>
//     </>
//   )
// }

// export default AddSchool
