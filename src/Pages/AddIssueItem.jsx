import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { addNewIssueItemApi, getAllItemApi, getAllItemCategoryApi, getAllRolesApi, getDataByRoleIdApi, getStudentDataApi } from '../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import { useForm } from 'react-hook-form';

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

const AddIssueItem = () => {

  const navigate = useNavigate('')
  const token = localStorage.getItem('token');
  // loader State
  const [loaderState, setloaderState] = useState(false);
  // data states
  const [RolesData, setRolesData] = useState([]);
  const [StudentsData, setStudentsData] = useState([]);
  const [DataByRoleId, setDataByRoleId] = useState([]);
  const [ItemData, setItemData] = useState([]);
  const [itemCategoryData, setitemCategoryData] = useState([]);
  // Watch data states
  const [itemName, setitemName] = useState('');
  const [itemCategory, setitemCategory] = useState('');
  const [issuedByName, setissuedByName] = useState('');
  const [issuedToName, setissuedToName] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    mode: 'onChange'
  });
  
  const issueToIdWatch = watch('issueToId');
  const issueByIdWatch = watch('issueById');
  const itemCategoryIdWatch = watch('itemCategoryId');
  const itemIdWatch = watch('itemId');

  
  useEffect(() => {
    getAllRoles();
    getAllStudents();
    getAllItemData();
    getAllItemCategoryData();
  }, [token])

  const getAllItemData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemApi('', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemData(response?.data?.items);
          // toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'itemsss');
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message, 'itemsss');
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllRoles = async () => {
    try {
      setloaderState(true);
      var response = await getAllRolesApi();
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setRolesData(response?.data?.roles);
          // toast.success(response?.data?.message);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'rolessssss');
        }
      }
      else {
        setloaderState(false);
        toast.error(response?.data?.message, 'rolessssss');
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllDataByRoleId = async (id) => {
    try {
      setloaderState(true);
      var response = await getDataByRoleIdApi(id, '', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setDataByRoleId(response?.data?.AllRoles);
          // toast.success(response?.data?.message);
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
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllStudents = async () => {
    try {
      setloaderState(true);
      var response = await getStudentDataApi('', '', '', '', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setStudentsData(response?.data?.students);
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
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const getAllItemCategoryData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemCategoryApi('','');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setitemCategoryData(response?.data?.itemCategories);
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
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const addNewIssueItem = async (data) => {
    setloaderState(true);
    try {
      const JsonData = {
        "itemId": itemIdWatch,
        "itemName": itemName,
        "itemCategoryId": itemCategoryIdWatch,
        "itemCategory": itemCategory,
        "issuedById": issueByIdWatch,
        "issuedByName": issuedByName,
        "issuedToId": issueToIdWatch,
        "issuedToName": issuedToName,
        "note": data?.note,
        "itemQuantity": data?.itemQuantity,
        "status": false,
        "issueDate": data?.issueDate,
        "returnDate": data?.returnDate

        // itemId: "1"
        // itemName: "Item 1"
        // itemCategoryId: "1"


        // issuedByName: "Garima"
        
        // issuedToName: "Samridhi"
        // note: "Nothing"
        // itemQuantity: "2"

        // issueDate: "2024-10-08"
        // returnDate: "2024-10-12"
      }
      var response = await addNewIssueItemApi(JsonData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setTimeout(() => {
            navigate('/issueItem')
          }, 1500)
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message)
        }
      }

    }
    catch (error) {
      console.log('Error while issuing item - ', error)
    }
  }

  const handleIssueToData = (value) => {
    setValue('issueToId', value);
    const selectedStudent = StudentsData.find((student) => student.id === parseInt(value));
    setissuedToName(selectedStudent ? selectedStudent.studentName : '');
  };

  const handleIssueByData = (value) => {
    setValue('issueById', value);
    const selectedStaff = DataByRoleId.find((staff) => staff.id === parseInt(value));
    setissuedByName(selectedStaff ? selectedStaff.staffName : '');
  };

  const handleItemData = (value) => {
    setValue('itemId', value);
    const selectedItem = ItemData.find((item) => item.id === parseInt(value));
    setitemName(selectedItem ? selectedItem.itemName : '');
  };

  const handleitemCategoryData = (value) => {
    setValue('itemCategoryId', value);
    const selectedCategory = itemCategoryData.find((category) => category.id === parseInt(value));
    setitemCategory(selectedCategory ? selectedCategory.name : '');
  };

  const handleUserType = (value) => {
    setValue('userType', value);
    getAllDataByRoleId(value);
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
          <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
            <ol className="breadcrumb mb-1">
              <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
              <li className="breadcrumb-item"><a href="/issueItem" className='bredcrumText text-decoration-none'>Inventory</a></li>
              <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Issue Item</li>
            </ol>
          </nav>
          <p className='font14 ps-0 fontWeight500'>Issue Item</p>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <form className='row' action="" onSubmit={handleSubmit(addNewIssueItem)}>
              <div className="col-md-4 mb-3">
                <label className="form-label font14">User Type <span className="text-danger">*</span></label>
                <select id='userType' className={`form-select font14 ${errors.userType ? 'border-danger' : ''}`} {...register('userType', { required: 'User Type selection is required *' })} onChange={(e) => handleUserType(e.target.value)}>
                  <option value="">-- Select --</option>
                  {RolesData.map((role) => (
                    <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
                  ))}
                </select>
                {errors.userType && <p className="text-danger">{errors.userType.message}</p>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label font14">Issue To <span className="text-danger">*</span></label>
                <select id='issueToId' className={`form-select font14 ${errors.issueToId ? 'border-danger' : ''}`} {...register('issueToId', { required: 'Issue To selection is required *' })} onChange={(e) => handleIssueToData(e.target.value)}>
                  <option value="">-- Select --</option>
                  {StudentsData.map((student) => (
                    <option key={student.id} value={student.id}>{student.studentName}</option>
                  ))}
                </select>
                {errors.issueToId && <p className="text-danger">{errors.issueToId.message}</p>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label font14">Issue By <span className="text-danger">*</span></label>
                <select id='issueById' className={`form-select font14 ${errors.issueById ? 'border-danger' : ''}`} {...register('issueById', { required: 'Issue By selection is required *' })} onChange={(e) => handleIssueByData(e.target.value)}>
                  <option value="">-- Select --</option>
                  {DataByRoleId.map((staff) => (
                    <option key={staff.id} value={staff.id}>{staff.staffName}</option>
                  ))}
                </select>
                {errors.issueById && <p className="text-danger">{errors.issueById.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue Date</label>
                <input id="issueDate" type="date" className={`form-control font14 ${errors.issueDate ? 'border-danger' : ''}`} {...register('issueDate', { required: 'Issue date is required *' })} />
                {errors.issueDate && <p className="font12 text-danger">{errors.issueDate.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Return Date</label>
                <input id="returnDate" type="date" className={`form-control font14 ${errors.returnDate ? 'border-danger' : ''}`} {...register('returnDate', { required: 'Return Date is required *' })} />
                {errors.returnDate && <p className="font12 text-danger">{errors.returnDate.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Note</label>
                <input id="note" type="text" className={`form-control font14 ${errors.note ? 'border-danger' : ''}`} placeholder="Enter Note" {...register('note', { required: 'Note is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Note must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Note'; } return true; } })} />
                {errors.note && <p className="font12 text-danger">{errors.note.message}</p>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label font14">Item Category <span className="text-danger">*</span></label>
                <select id='itemCategoryId' className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleitemCategoryData(e.target.value)}>
                  <option value="">-- Select --</option>
                  {itemCategoryData.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.itemCategoryId && <p className="text-danger">{errors.itemCategoryId.message}</p>}
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label font14">Item <span className="text-danger">*</span></label>
                <select id='itemId' className={`form-select font14 ${errors.itemId ? 'border-danger' : ''}`} {...register('itemId', { required: 'Item selection is required *' })} onChange={(e) => handleItemData(e.target.value)}>
                  <option value="">-- Select --</option>
                  {ItemData.map((item) => (
                    <option key={item.id} value={item.id}>{item.itemName}</option>
                  ))}
                </select>
                {errors.itemId && <p className="text-danger">{errors.itemId.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
                <input id="itemQuantity" type="number" className={`form-control font14 ${errors.itemQuantity ? 'border-danger' : ''}`} {...register('itemQuantity', { required: 'Quantity is required *', min: { value: 0, message: 'Quantity cannot be negative' } })} />
                {errors.itemQuantity && <p className="font12 text-danger">{errors.itemQuantity.message}</p>}
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' type='submit'>Add Issue Item</button>
                <Link className='btn cancelButtons font14' to='/issueItem' type='button'>Cancel</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </Container>


  )
}

export default AddIssueItem



























// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import styled from 'styled-components'
// import { addNewIssueItemApi, getAllItemApi, getAllItemCategoryApi, getAllRolesApi, getDataByRoleIdApi, getStudentDataApi } from '../Utils/Apis';
// import toast from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';
// import { useForm } from 'react-hook-form';

// const Container = styled.div`

//   .blueText{
//     color: var(--blueTextColor);
//   }

//   .form-control::placeholder, .form-control, .form-select{
//     color: var(--greyState)
//   }

//   .formdltcheck:checked{
//     background-color: #B50000;
//     border-color: #B50000;
//   }

//   .form-control, .form-select{
//     border-radius: 5px !important;
//     box-shadow: none !important;
//     border: 1px solid var(--fontControlBorder);
//   }

//   .contbtn{
//     margin-left: 41% !important;
//     margin-top: -20% !important;
//   }

//   .greydiv{
//     background-color: #FBFBFB;
//   }

//   .mainBreadCrum{
//     --bs-breadcrumb-divider: '>' !important;
//   }

//   .bredcrumText{
//     color: var(--breadCrumTextColor);
//   }

//   .bredcrumActiveText{
//     color: var(--breadCrumActiveTextColor);
//   }

//   .eventablerow{
//     background-color: var(--tableGreyBackgroundColor) !important;
//   }

//   .ExportBtns{
//     border-radius: 3px;
//     border: 1.5px solid var(--fontControlBorder);
//   }

//   .form-check-input{
//     border-radius: 5px !important;
//     box-shadow: none !important;
//     border: 1px solid var(--fontControlBorder);
//   }

//   .greenBgModal{
//     background-color: var(--breadCrumActiveTextColor);
//   }

//   .greenText{
//     color: var(--breadCrumActiveTextColor);
//   }

//   .form-select{
//     color: var(--greyState);
//     box-shadow: none;
//   }
  
//   .orangeText{
//     color: var(--OrangeBtnColor);
//   }

//   .scrollBarHide::-webkit-scrollbar {
//     display: none;
//   }

//   .infoIcon{
//     cursor: pointer;
//   }

//   .modalHighborder{
//     border-bottom: 2px solid var(--modalBorderColor);
//   }

//   .formdltcheck:checked{
//     background-color: #B50000;
//     border-color: #B50000;
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

//   .greyText{
//     color: var(--greyTextColor) !important;
//   }
    
// `;

// const AddIssueItem = () => {

//   const navigate = useNavigate('')
//   const token = localStorage.getItem('token');
//   // loader State
//   const [loaderState, setloaderState] = useState(false);
//   // data states
//   const [RolesData, setRolesData] = useState([]);
//   const [StudentsData, setStudentsData] = useState([]);
//   const [DataByRoleId, setDataByRoleId] = useState([]);
//   const [ItemData, setItemData] = useState([]);
//   const [ItemCategoryData, setItemCategoryData] = useState([]);
//   // Watch data states
//   const [ItemName, setItemName] = useState('');
//   const [ItemCategory, setItemCategory] = useState('');
//   const [IssuedByNameUser, setIssuedByNameUser] = useState('');
//   const [IssuedToName, setIssuedToName] = useState('');

//   const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
//     mode: 'onChange'
//   });
  
//   const issueToIdWatch = watch('issueToId');
//   const issueByIdWatch = watch('issueById');
//   const itemCategoryIdWatch = watch('itemCategoryId');
//   const itemIdWatch = watch('itemId');

//   useEffect(() => {
//     getAllRoles();
//     getAllStudents();
//     getAllItemData();
//     getAllItemCategoryData();
//   }, [token])

//   const getAllItemData = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllItemApi('', '');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setItemData(response?.data?.items);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message, 'itemsss');
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message, 'itemsss');
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllRoles = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllRolesApi();
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setRolesData(response?.data?.roles);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message, 'rolessssss');
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message, 'rolessssss');
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllDataByRoleId = async (id) => {
//     try {
//       setloaderState(true);
//       var response = await getDataByRoleIdApi(id, '', '', '');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setDataByRoleId(response?.data?.AllRoles);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllStudents = async () => {
//     try {
//       setloaderState(true);
//       var response = await getStudentDataApi('', '', '', '', '');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setStudentsData(response?.data?.students);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllItemCategoryData = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllItemCategoryApi('','');
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setItemCategoryData(response?.data?.itemCategories);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const addNewIssueItem = async () => {
//     setloaderState(true);
//     try {
//       const data = {
//         // "itemId": ItemId,
//         // "itemName": ItemName,
//         // "itemCategoryId": ItemCategoryId,
//         // "itemCategory": ItemCategory,
//         // "issuedById": IssuedById,
//         // "IssuedByNameUser": IssuedByNameUser,
//         // "issuedToId": IssuedToId,
//         // "issuedToName": IssuedToName,
//         // "note": Note,
//         // "itemQuantity": ItemQuantity,
//         // "status": Status,
//         // "issueDate": IssueDate,
//         // "returnDate": ReturnDate
//       }
//       var response = await addNewIssueItemApi(data);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setTimeout(() => {
//             navigate('/issueItem')
//           }, 1500)
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message)
//         }
//       }

//     }
//     catch (error) {
//       console.log('Error while issuing item - ', error)
//     }
//   }

//   const handleIssueToData = (value) => {
//     const [val1, val2] = value.split(',');
//     setValue('issueToId', val1);
//     setIssuedToName(val2);
//   }

//   const handleIssueByData = (value) => {
//     const [val1, val] = value.split(',');
//     setValue('issueById', val1);
//     setIssuedByNameUser(val);
//   }

//   const handleItemData = (value) => {
//     const [val1, val2] = value.split(',');
//     setValue('itemId',val1);
//     setItemName(val2);
//   }

//   const handleItemCategoryData = (value) => {
//     const [val1, val2] = value.split(',');
//     setValue('itemCategoryId', val1);
//     setItemCategory(val2);
//   }

//   const handleUserType = (val) => {
//     setValue('userType', val);
//     getAllDataByRoleId(val)
//   }


//   return (
//     <Container>
//       {
//         loaderState && (
//           <DataLoader />
//         )
//       }
//       <div className="container-fluid p-4">
//         <div className="row pb-3 gap-xl-0 gap-3">
//           <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
//             <ol className="breadcrumb mb-1">
//               <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
//               <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Inventory</a></li>
//               <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Issue Item</li>
//             </ol>
//           </nav>
//           <p className='font14 ps-0 fontWeight500'>Issue Item</p>
//         </div>
//         <div className="row pb-3">
//           <div className="bg-white rounded-2 p-4">
//             <form className='row' action="" onSubmit={handleSubmit(addNewIssueItem)}>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">User Type <span className='text-danger'>*</span></label>
//                 <select id="userType" className={`form-select font14 ${errors.userType ? 'border-danger' : ''}`} {...register('userType', { required: 'User Type selection is required *' })} onChange={(e) => handleUserType(e.target.value)}>
//                   <option value="">-- Select --</option>
//                   {RolesData.map((option) => (
//                     <option key={option.roleId} value={option?.roleId}>{option.roleName}</option>
//                   ))}
//                 </select>
//                 {errors.userType && <p className="font12 text-danger">{errors.userType.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue To <span className='text-danger'>*</span></label>
//                 <select id="issueToId" name="issueToId"  className={`form-select font14 ${errors.issueToId ? 'border-danger' : ''}`} value={`${issueToIdWatch},${IssuedToName}`} {...register('issueToId', { required: 'Issue To selection is required *' })} onChange={(e) => handleIssueToData(e.target.value)}>
//                   <option value="">-- Select --</option>
//                   {StudentsData.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.studentName}`}>{option.studentName}</option>
//                   ))}
//                 </select>
//                 {errors.issueToId && <p className="font12 text-danger">{errors.issueToId.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue By <span className='text-danger'>*</span></label>
//                 <select id="issueById" name="issueById" className={`form-select font14 ${errors.issueById ? 'border-danger' : ''}`} value={`${issueByIdWatch},${IssuedByNameUser}`} {...register('issueById', { required: 'Issue By selection is required *' })} onChange={(e) => handleIssueByData(e.target.value)}>
//                   <option value="">-- Select --</option>
//                   {DataByRoleId.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.staffName}`}>{option.staffName}</option>
//                   ))}
//                 </select>
//                 {errors.issueById && <p className="font12 text-danger">{errors.issueById.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue Date</label>
//                 <input id="issueDate" type="date" className={`form-control font14 ${errors.issueDate ? 'border-danger' : ''}`} {...register('issueDate', { required: 'Issue date is required *' })} />
//                 {errors.issueDate && <p className="font12 text-danger">{errors.issueDate.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Return Date</label>
//                 <input id="returnDate" type="date" className={`form-control font14 ${errors.returnDate ? 'border-danger' : ''}`} {...register('returnDate', { required: 'Return Date is required *' })} />
//                 {errors.returnDate && <p className="font12 text-danger">{errors.returnDate.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Note</label>
//                 <input id="note" type="text" className={`form-control font14 ${errors.note ? 'border-danger' : ''}`} placeholder="Enter Note" {...register('note', { required: 'Note is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Note must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Note'; } return true; } })} />
//                 {errors.note && <p className="font12 text-danger">{errors.note.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
//                 <select id="itemCategoryId" className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} value={`${itemCategoryIdWatch},${ItemCategory}`} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleItemCategoryData(e.target.value)}>
//                   <option value="">-- Select --</option>
//                   {ItemCategoryData.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.name}`}>{option.name}</option>
//                   ))}
//                 </select>
//                 {errors.itemCategoryId && <p className="font12 text-danger">{errors.itemCategoryId.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
//                 <select id="itemId" className={`form-select font14 ${errors.itemId ? 'border-danger' : ''}`} value={`${itemIdWatch},${ItemName}`} {...register('itemId', { required: 'Item selection is required *' })} onChange={(e) => handleItemData(e.target.value)}>
//                   <option value="">-- Select --</option>
//                   {ItemData.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.itemName}`}>{option.itemName}</option>
//                   ))}
//                 </select>
//                 {errors.itemId && <p className="font12 text-danger">{errors.itemId.message}</p>}
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
//                 <input id="quantity" type="number" className={`form-control font14 ${errors.quantity ? 'border-danger' : ''}`} {...register('quantity', { required: 'Quantity is required *', min: { value: 0, message: 'Quantity cannot be negative' } })} />
//                 {errors.quantity && <p className="font12 text-danger">{errors.quantity.message}</p>}
//               </div>
//               <p className='text-center p-3'>
//                 <button className='btn addButtons font14 text-white me-2' type='submit'>Add Issue Item</button>
//                 <Link className='btn cancelButtons font14' to='/issueItem' type='button'>Cancel</Link>
//               </p>
//             </form>
//           </div>
//         </div>
//       </div>
//     </Container>


//   )
// }

// export default AddIssueItem

























// import React, { useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom';
// import { Icon } from '@iconify/react';
// import styled from 'styled-components'
// import { addNewIssueItemApi, getAllItemApi, getAllItemCategoryApi, getAllRolesApi, getDataByRoleIdApi, getStudentDataApi } from '../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../Layouts/Loader';

// const Container = styled.div`

//   .blueText{
//     color: var(--blueTextColor);
//   }

//   .form-control::placeholder, .form-control, .form-select{
//     color: var(--greyState)
//   }

//   .formdltcheck:checked{
//     background-color: #B50000;
//     border-color: #B50000;
//   }

//   .form-control, .form-select{
//     border-radius: 5px !important;
//     box-shadow: none !important;
//     border: 1px solid var(--fontControlBorder);
//   }

//   .contbtn{
//     margin-left: 41% !important;
//     margin-top: -20% !important;
//   }

//   .greydiv{
//     background-color: #FBFBFB;
//   }

//   .mainBreadCrum{
//     --bs-breadcrumb-divider: '>' !important;
//   }

//   .bredcrumText{
//     color: var(--breadCrumTextColor);
//   }

//   .bredcrumActiveText{
//     color: var(--breadCrumActiveTextColor);
//   }

//   .eventablerow{
//     background-color: var(--tableGreyBackgroundColor) !important;
//   }

//   .ExportBtns{
//     border-radius: 3px;
//     border: 1.5px solid var(--fontControlBorder);
//   }

//   .form-check-input{
//     border-radius: 5px !important;
//     box-shadow: none !important;
//     border: 1px solid var(--fontControlBorder);
//   }

//   .greenBgModal{
//     background-color: var(--breadCrumActiveTextColor);
//   }

//   .greenText{
//     color: var(--breadCrumActiveTextColor);
//   }

//   .form-select{
//     color: var(--greyState);
//     box-shadow: none;
//   }
  
//   .orangeText{
//     color: var(--OrangeBtnColor);
//   }

//   .scrollBarHide::-webkit-scrollbar {
//     display: none;
//   }

//   .infoIcon{
//     cursor: pointer;
//   }

//   .modalHighborder{
//     border-bottom: 2px solid var(--modalBorderColor);
//   }

//   .formdltcheck:checked{
//     background-color: #B50000;
//     border-color: #B50000;
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

//   .greyText{
//     color: var(--greyTextColor) !important;
//   }
    
// `;

// const AddIssueItem = () => {

//   const navigate = useNavigate('')
//   const token = localStorage.getItem('token');
//   //loader State
//   const [loaderState, setloaderState] = useState(false);
//   const [RolesData, setRolesData] = useState([]);
//   const [StudentsData, setStudentsData] = useState([]);
//   const [DataByRoleId, setDataByRoleId] = useState([]);
//   const [ItemData, setItemData] = useState([]);
//   const [ItemCategoryData, setItemCategoryData] = useState([]);
//   const [UserTypeId, setUserTypeId] = useState(0);
//   const [ItemId, setItemId] = useState(0);
//   const [ItemName, setItemName] = useState('');
//   const [Note, setNote] = useState('');
//   const [ItemCategoryId, setItemCategoryId] = useState(0);
//   const [ItemCategory, setItemCategory] = useState('');
//   const [IssuedById, setIssuedById] = useState(0);
//   const [IssuedByNameUser, setIssuedByNameUser] = useState('');
//   const [IssuedToId, setIssuedToId] = useState(0);
//   const [IssuedToName, setIssuedToName] = useState('');
//   const [ItemQuantity, setItemQuantity] = useState(0);
//   const [Status, setStatus] = useState('');
//   const [IssueDate, setIssueDate] = useState('');
//   const [ReturnDate, setReturnDate] = useState('');

//   useEffect(() => {
//     getAllRoles();
//     getAllStudents();
//     getAllItemData();
//     getAllItemCategoryData();
//   }, [token])

//   const getAllItemData = async () => {
//     try {
//       setloaderState(true);
//       const page='';
//       const size='';
//       var response = await getAllItemApi(page , size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setItemData(response?.data?.items);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message, 'itemsss');
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message, 'itemsss');
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllRoles = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllRolesApi();
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setRolesData(response?.data?.roles);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message, 'rolessssss');
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message, 'rolessssss');
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllDataByRoleId = async (id) => {
//     try {
//       setloaderState(true);
//       const search='';
//       const page='';
//       const size='';
//       var response = await getDataByRoleIdApi(id, search,page,size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setDataByRoleId(response?.data?.AllRoles);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllStudents = async () => {
//     try {
//       setloaderState(true);
//       const classNo = '';
//       const classSec = '';
//       const search = '';
//       const page = '';
//       const size = '';
//       var response = await getStudentDataApi(classNo, classSec, search, page, size);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setStudentsData(response?.data?.students);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const getAllItemCategoryData = async () => {
//     try {
//       setloaderState(true);
//       var response = await getAllItemCategoryApi();
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           setItemCategoryData(response?.data?.itemCategories);
//           // toast.success(response?.data?.message);
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message);
//         }
//       }
//       else {
//         setloaderState(false);
//         toast.error(response?.data?.message);
//       }
//     }
//     catch (error) {
//       console.log('Error Facing during Get All Item API - ', error)
//     }
//   }

//   const addNewIssueItem = async () => {
//     setloaderState(true);
//     try {
//       const data = {
//         "itemId": ItemId,
//         "itemName": ItemName,
//         "itemCategoryId": ItemCategoryId,
//         "itemCategory": ItemCategory,
//         "issuedById": IssuedById,
//         "IssuedByNameUser": IssuedByNameUser,
//         "issuedToId": IssuedToId,
//         "issuedToName": IssuedToName,
//         "note": Note,
//         "itemQuantity": ItemQuantity,
//         "status": Status,
//         "issueDate": IssueDate,
//         "returnDate": ReturnDate
//       }
//       var response = await addNewIssueItemApi(data);
//       if (response?.status === 200) {
//         if (response?.data?.status === 'success') {
//           setloaderState(false);
//           // toast.success(response?.data?.message)
//           setTimeout(()=> {
//             navigate('/issueItem')
//           }, 1500)
//         }
//         else {
//           setloaderState(false);
//           toast.error(response?.data?.message)
//         }
//       }

//     }
//     catch(error) {
//       console.log('Error while issuing item - ', error)
//     }
//   }

//   const handleIssueToData = (value) => {
//     const [val1, val2] = value.split(',');
//     setIssuedToId(val1);
//     setIssuedToName(val2);
//   }

//   const handleIssueByData = (value) => {
//     const [val1, val2] = value.split(',');
//     setIssuedById(val1);
//     setIssuedByNameUser(val2);
//   }

//   const handleItemData = (value) => {
//     const [val1, val2] = value.split(',');
//     setItemId(val1);
//     setItemName(val2);
//   }

//   const handleItemCategoryData = (value) => {
//     const [val1, val2] = value.split(',');
//     setItemCategoryId(val1);
//     setItemCategory(val2);
//   }

//   const handleUserType = (val) => {
//     setUserTypeId(val);
//     getAllDataByRoleId(val)
//   }

//   return (
//     <Container>
//       {
//         loaderState && (
//           <DataLoader />
//         )
//       }
//       <div className="container-fluid p-4">
//         <div className="row pb-3 gap-xl-0 gap-3">
//           <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
//             <ol className="breadcrumb mb-1">
//               <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
//               <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Inventory</a></li>
//               <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Issue Item</li>
//             </ol>
//           </nav>
//           <p className='font14 ps-0 fontWeight500'>Issue Item</p>
//         </div>
//         <div className="row pb-3">
//           <div className="bg-white rounded-2 p-4">
//             <form className='row' action="">
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">User Type <span className='text-danger'>*</span></label>
//                 <select className={`form-select font14  `} aria-label="Default select example" value={UserTypeId} onChange={(e) => handleUserType(e.target.value)}>
//                   <option selected value='' >--- Select ---</option>
//                   {RolesData.map((option) => (
//                     <option key={option.roleId} value={option?.roleId}>{option.roleName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue To <span className='text-danger'>*</span></label>
//                 <select className={`form-select font14  `} aria-label="Default select example" value={`${IssuedToId},${IssuedToName}`} onChange={(e) => handleIssueToData(e.target.value)}>
//                   <option selected value='' >--- Select ---</option>
//                   {StudentsData.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.studentName}`}>{option.studentName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue By <span className='text-danger'>*</span></label>
//                 <select className={`form-select font14  `} aria-label="Default select example" value={`${IssuedById},${IssuedByNameUser}`} onChange={(e) => handleIssueByData(e.target.value)}>
//                   <option selected >--- Select ---</option>
//                   {DataByRoleId.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.staffName}`}>{option.staffName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Issue Date</label>
//                 <input type="date" className="form-control font14" id="exampleFormControlInput1" value={IssueDate} placeholder="Enter Name" onChange={(e)=> setIssueDate(e.target.value)}/>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Return Date</label>
//                 <input type="date" className="form-control font14" id="exampleFormControlInput1" value={ReturnDate} placeholder="Enter Name" onChange={(e)=> setReturnDate(e.target.value)}/>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Note</label>
//                 <input type="email" className="form-control font14" id="exampleFormControlInput1" value={Note} placeholder="Text...." onChange={(e)=> setNote(e.target.value)}/>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
//                 <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemCategoryId},${ItemCategory}`} onChange={(e) => handleItemCategoryData(e.target.value)}>
//                   <option selected value='' >--- Select ---</option>
//                   {ItemCategoryData.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.name}`}>{option.name}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
//                 <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemId},${ItemName}`} onChange={(e) => handleItemData(e.target.value)}>
//                   <option selected value='' >--- Select ---</option>
//                   {ItemData.map((option) => (
//                     <option key={option.id} value={`${option?.id}, ${option?.itemName}`}>{option.itemName}</option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-4 col-sm-6 col-12 mb-3">
//                 <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
//                 <input type="number" className="form-control font14" id="exampleFormControlInput1" value={ItemQuantity} placeholder="0" onChange={(e)=> setItemQuantity(e.target.value)}/>
//               </div>
//             </form>
//             <p className='text-center p-3'>
//               <button className='btn addButtons font14 text-white me-2' onClick={addNewIssueItem}>Add Issue Item</button>
//               <Link className='btn cancelButtons font14' to='/issueItem'>Cancel</Link>
//             </p>
//           </div>
//         </div>
//         <Toaster/>
//       </div>
//     </Container>


//   )
// }

// export default AddIssueItem
