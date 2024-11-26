import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { addNewIssueItemApi, addNewItemApi, getAllItemCategoryApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ItemList from './ItemList';
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


const AddItem = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    mode: 'onChange'
  });

  const [Reload, setReload] = useState(false);
  const [ItemCategoryData, setItemCategoryData] = useState([]);
  const [ItemCategory, setItemCategory] = useState('');
  
  const itemCategoryIdVal = watch('itemCategoryId')

  useEffect(() => {
    getAllItemCategoryData();
  }, [token])

  const getAllItemCategoryData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemCategoryApi('', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemCategoryData(response?.data?.itemCategories);
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Get All Item API - ', error)
    }
  }

  const addNewItem = async (data) => {
    try {
      setloaderState(true)
      const JsonData = {
        "itemName": data?.itemName,
        "itemCategoryId": data?.itemCategoryId,
        "itemCategory": ItemCategory,
        "totalUnits": data?.totalUnits,
        "itemDescription": data?.itemDescription
      }
      var response = await addNewItemApi(JsonData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message);
          reset();
          setReload(true)
        }
        else {
          setloaderState(false);
          // toast.error(response?.data?.message);
        }
      }
      else {
        setloaderState(false);
        console.log(response?.data?.message);
      }
    }
    catch (error) {
      console.log('Error Facing during Add New Item API - ', error)
    }
  }

  const handleItemCategoryData = (value) => {
    setValue('itemCategoryId', value);
    const selectedCategory = ItemCategoryData.find((category) => category.id === parseInt(value));
    setItemCategory(selectedCategory ? selectedCategory.name : '');
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
              <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Item</li>
            </ol>
          </nav>
          <p className='font14 ps-0 fontWeight500'>Add Item</p>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <form className='row' onSubmit={handleSubmit(addNewItem)}>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item <span className='text-danger'>*</span></label>
                <input id="itemName" type="text" className={`form-control font14 ${errors.itemName ? 'border-danger' : ''}`} placeholder="Enter Item Name" {...register('itemName', { required: 'Item Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Item Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Item Name'; } return true; } })} />
                {errors.itemName && <p className="font12 text-danger">{errors.itemName.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                <select id='itemCategoryId' className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} value={itemCategoryIdVal} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleItemCategoryData(e.target.value)}>
                  <option value="">-- Select --</option>
                  {ItemCategoryData.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.itemCategoryId && <p className="font12 text-danger">{errors.itemCategoryId.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Unit <span className='text-danger'>*</span></label>
                <input id="totalUnits" type="number" className={`form-control font14 ${errors.totalUnits ? 'border-danger' : ''}`} {...register('totalUnits', { required: 'Unit is required *', min: { value: 0, message: 'Unit cannot be negative' } })} />
                {errors.totalUnits && <p className="font12 text-danger">{errors.totalUnits.message}</p>}
              </div>
              <div className="col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                <input id="itemDescription" type="text" className={`form-control font14 ${errors.itemDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('itemDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                {errors.itemDescription && <p className="font12 text-danger">{errors.itemDescription.message}</p>}
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' type='submit'>Add Item</button>
                <button className='btn cancelButtons font14' type='button'>Cancel</button>
              </p>
            </form>
            <ItemList Reload={Reload} />
          </div>
        </div>
        <Toaster />
      </div>
    </Container>


  )
}

export default AddItem
