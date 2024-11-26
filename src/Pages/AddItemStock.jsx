import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import styled from 'styled-components'
import { addNewItemStockApi, getAllItemApi, getAllItemCategoryApi, getAllItemStoreApi, getAllItemSupplierApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import ItemStockList from './ItemStockList';
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


const AddItemStock = () => {

  const token = localStorage.getItem('token');
  //loader State
  const [loaderState, setloaderState] = useState(false);
  const [Reload, setReload] = useState(false);
  const [ItemData, setItemData] = useState([]);
  const [ItemStoreData, setItemStoreData] = useState([]);
  const [ItemSupplierData, setItemSupplierData] = useState([]);
  const [ItemCategoryData, setItemCategoryData] = useState([]);
  
  const [ItemCategory, setItemCategory] = useState('');
  const [Supplier, setSupplier] = useState('');
  const [Store, setStore] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
    mode: 'onChange'
  });

  const itemCategoryIdVal = watch('itemCategoryId')
  const supplierIdVal = watch('supplierId')
  const storeIdVal = watch('storeId')

  useEffect(() => {
    getAllItemData();
    getAllItemStoreData();
    getAllItemCategoryData();
    getAllItemSupplierData();
  }, [token, Reload])

  const getAllItemData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemApi('', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemData(response?.data?.items);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'item');
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
          toast.error(response?.data?.message, 'category');
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

  const getAllItemSupplierData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemSupplierApi('', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemSupplierData(response?.data?.itemSuppliers);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'supplier');
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

  const getAllItemStoreData = async () => {
    try {
      setloaderState(true);
      var response = await getAllItemStoreApi('', '');
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          setItemStoreData(response?.data?.itemStores);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'store');
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

  const addNewItemStock = async (data) => {
    try {
      setloaderState(true)
      const formData = new FormData();
      formData.append('itemId', data?.itemId)
      formData.append('itemCategory', ItemCategory)
      formData.append('itemCategoryId', data?.itemCategoryId)
      formData.append('supplierName', Supplier)
      formData.append('supplierId', data?.supplierId)
      formData.append('storeName', Store)
      formData.append('storeId', data?.storeId)
      formData.append('itemQuantity', data?.itemQuantity)
      formData.append('purchasePrice', data?.purchasePrice)
      formData.append('dateCreated', data?.dateCreated)
      formData.append('document', data?.document[0])
      formData.append('itemDescription', data?.itemDescription)
      var response = await addNewItemStockApi(formData);
      if (response?.status === 200) {
        if (response?.data?.status === 'success') {
          setloaderState(false);
          toast.success(response?.data?.message)
          reset();
          setReload(true);
        }
        else {
          setloaderState(false);
          toast.error(response?.data?.message, 'add');
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

  const handleItemStoreData = (value) => {
    setValue('storeId', value);
    const selectedStore = ItemStoreData.find((store) => store.id === parseInt(value));
    setStore(selectedStore ? selectedStore.storeName : '');
  };

  const handleItemSupplierData = (value) => {
    setValue('supplierId', value);
    const selectedSupplier = ItemSupplierData.find((supplier) => supplier.supplierId === parseInt(value));
    setSupplier(selectedSupplier ? selectedSupplier.supplierName : '');
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
              <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Item Stock</li>
            </ol>
          </nav>
          <p className='font14 ps-0 fontWeight500'>Add Item Stock</p>
        </div>
        <div className="row pb-3">
          <div className="bg-white rounded-2 p-4">
            <form className='row' action="" onSubmit={handleSubmit(addNewItemStock)}>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="itemCategoryId" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                <select id='itemCategoryId' className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} value={itemCategoryIdVal} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleItemCategoryData(e.target.value)}>
                  <option value="">-- Select --</option>
                  {ItemCategoryData.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
                {errors.itemCategoryId && <p className="text-danger">{errors.itemCategoryId.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="itemId" className="form-label font14">Item <span className='text-danger'>*</span></label>
                <select id="itemId" className={`form-select font14 ${errors.itemId ? 'border-danger' : ''}`} {...register('itemId', { required: 'Item is required *' })} >
                  <option value="">--- Select ---</option>
                  {ItemData.map((option) => (
                    <option key={option.id} value={option?.id}>{option.itemName}</option>
                  ))}
                </select>
                {errors.itemId && <p className="font12 text-danger">{errors.itemId.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="supplierId" className="form-label font14">Supplier <span className='text-danger'>*</span></label>
                <select id="supplierId" className={`form-select font14 ${errors.supplierId ? 'border-danger' : ''}`} value={supplierIdVal} {...register('supplierId', { required: 'Item Supplier is required *' })} onChange={(e) => handleItemSupplierData(e.target.value)}>
                  <option value="">--- Select ---</option>
                  {ItemSupplierData.map((option) => (
                    <option key={option.supplierId} value={option?.supplierId}>{option.supplierName}</option>
                  ))}
                </select>
                {errors.supplierId && <p className="font12 text-danger">{errors.supplierId.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="storeId" className="form-label font14">Store <span className='text-danger'>*</span></label>
                <select id="storeId" className={`form-select font14 ${errors.storeId ? 'border-danger' : ''}`} value={storeIdVal} {...register('storeId', { required: 'Item Store is required *' })} onChange={(e) => handleItemStoreData(e.target.value)}>
                  <option value="">--- Select ---</option>
                  {ItemStoreData.map((option) => (
                    <option key={option.id} value={option?.id}>{option.storeName}</option>
                  ))}
                </select>
                {errors.storeId && <p className="font12 text-danger">{errors.storeId.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
                <input id="itemQuantity" type="number" className={`form-control font14 ${errors.itemQuantity ? 'border-danger' : ''}`} {...register('itemQuantity', { required: 'Quantity is required *', min: { value: 0, message: 'Quantity cannot be negative' } })} />
                {errors.itemQuantity && <p className="font12 text-danger">{errors.itemQuantity.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Purchase Price <span className='text-danger'>*</span></label>
                <input id="purchasePrice" type="number" className={`form-control font14 ${errors.purchasePrice ? 'border-danger' : ''}`} {...register('purchasePrice', { required: 'Purchase Price is required *', min: { value: 0, message: 'Purchase Price cannot be negative' } })} />
                {errors.purchasePrice && <p className="font12 text-danger">{errors.purchasePrice.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Date</label>
                <input id="dateCreated" type="date" className={`form-control font14 ${errors.dateCreated ? 'border-danger' : ''}`} {...register('dateCreated', { required: 'Date Created is required *' })} />
                {errors.dateCreated && <p className="font12 text-danger">{errors.dateCreated.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Attach Document  <span className='text-danger'>*</span></label>
                <input id="document" type="file" className={`form-control font14 ${errors.document ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' onChange={(e) => { const files = e.target.files; setValue('document', files[0]); }}  {...register('document', { required: 'Item Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                {errors.document && <p className="font12 text-danger">{errors.document.message}</p>}
              </div>
              <div className="col-md-4 col-sm-6 col-12 mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                <input id="itemDescription" type="text" className={`form-control font14 ${errors.itemDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('itemDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                {errors.itemDescription && <p className="font12 text-danger">{errors.itemDescription.message}</p>}
              </div>
              <p className='text-center p-3'>
                <button className='btn addButtons font14 text-white me-2' type='submit' >Add Item Stock</button>
                <Link className='btn cancelButtons font14' to='/issueItem'>Cancel</Link>
              </p>
            </form>
            <ItemStockList Reload={Reload} />
          </div>
        </div>
      </div>
    </Container>


  )
}

export default AddItemStock
