import React, { useEffect, useState } from 'react'
import { getAllItemApi, getAllItemCategoryApi, getAllItemStoreApi, getAllItemSupplierApi, getItemStockByIdApi, updateItemStockByIdApi } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';
import { useForm } from 'react-hook-form';

const EditItemStock = ({ EditId, closeCanvas }) => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    // const [Reload, setReload] = useState(false);
    const [ItemData, setItemData] = useState([]);
    const [ItemStoreData, setItemStoreData] = useState([]);
    const [ItemSupplierData, setItemSupplierData] = useState([]);
    const [ItemCategoryData, setItemCategoryData] = useState([]);

    const [ItemCategory, setItemCategory] = useState('');
    const [Supplier, setSupplier] = useState('');
    const [Store, setStore] = useState('');

    const [fileVal, setFileVal] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)


    const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm({
        mode: 'onChange'
    });

    const itemCategoryIdVal = watch('itemCategoryId')
    const supplierIdVal = watch('supplierId')
    const storeIdVal = watch('storeId')

    useEffect(() => {
        if (token) {
            getAllItemData();
            getAllItemStoreData();
            getAllItemCategoryData();
            getAllItemSupplierData();
        }
        if (EditId) {
            getItemStockDataById();
        }
    }, [token, EditId])

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

    const getItemStockDataById = async () => {
        try {
            setloaderState(true);
            var response = await getItemStockByIdApi(EditId);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setValue('itemId', response?.data?.itemStock?.itemId)
                    setValue('itemCategoryId', response?.data?.itemStock?.itemCategoryId)
                    setItemCategory(response?.data?.itemStock?.itemCategory)
                    setValue('supplierId', response?.data?.itemStock?.supplierId)
                    setSupplier(response?.data?.itemStock?.supplierName)
                    setValue('storeId', response?.data?.itemStock?.storeId)
                    setStore(response?.data?.itemStock?.storeName)
                    setValue('purchasePrice', response?.data?.itemStock?.purchasePrice)
                    setValue('dateCreated', response?.data?.itemStock?.dateCreated)
                    setValue('itemQuantity', response?.data?.itemStock?.itemQuantity)
                    setValue('itemDescription', response?.data?.itemStock?.itemDescription)
                    setValue('document', response?.data?.itemStock?.documentPath)
                    setFileVal(response?.data?.itemStock?.documentPath)
                    console.log(response?.data?.itemStock?.documentPath)
                    // toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message, 'get by id');
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            // console.log('Error Facing during Get Item By Id API - ', error)
        }
    }

    const updateItemStock = async (data) => {
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

            var response = await updateItemStockByIdApi(EditId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    closeCanvas(true);
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
        <div className="container-fluid">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(updateItemStock)}>
                    <div className="col-12 mb-3">
                        <label htmlFor="itemCategoryId" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
                        <select id='itemCategoryId' className={`form-select font14 ${errors.itemCategoryId ? 'border-danger' : ''}`} value={itemCategoryIdVal} {...register('itemCategoryId', { required: 'Item Category selection is required *' })} onChange={(e) => handleItemCategoryData(e.target.value)}>
                            <option value="">-- Select --</option>
                            {ItemCategoryData.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                        {errors.itemCategoryId && <p className="text-danger">{errors.itemCategoryId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="itemId" className="form-label font14">Item <span className='text-danger'>*</span></label>
                        <select id="itemId" className={`form-select font14 ${errors.itemId ? 'border-danger' : ''}`} {...register('itemId', { required: 'Item is required *' })} >
                            <option value="">--- Select ---</option>
                            {ItemData.map((option) => (
                                <option key={option.id} value={option?.id}>{option.itemName}</option>
                            ))}
                        </select>
                        {errors.itemId && <p className="font12 text-danger">{errors.itemId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="supplierId" className="form-label font14">Supplier <span className='text-danger'>*</span></label>
                        <select id="supplierId" className={`form-select font14 ${errors.supplierId ? 'border-danger' : ''}`} value={supplierIdVal} {...register('supplierId', { required: 'Item Supplier is required *' })} onChange={(e) => handleItemSupplierData(e.target.value)}>
                            <option value="">--- Select ---</option>
                            {ItemSupplierData.map((option) => (
                                <option key={option.supplierId} value={option?.supplierId}>{option.supplierName}</option>
                            ))}
                        </select>
                        {errors.supplierId && <p className="font12 text-danger">{errors.supplierId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="storeId" className="form-label font14">Store <span className='text-danger'>*</span></label>
                        <select id="storeId" className={`form-select font14 ${errors.storeId ? 'border-danger' : ''}`} value={storeIdVal} {...register('storeId', { required: 'Item Store is required *' })} onChange={(e) => handleItemStoreData(e.target.value)}>
                            <option value="">--- Select ---</option>
                            {ItemStoreData.map((option) => (
                                <option key={option.id} value={option?.id}>{option.storeName}</option>
                            ))}
                        </select>
                        {errors.storeId && <p className="font12 text-danger">{errors.storeId.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
                        <input id="itemQuantity" type="number" className={`form-control font14 ${errors.itemQuantity ? 'border-danger' : ''}`} {...register('itemQuantity', { required: 'Quantity is required *', min: { value: 0, message: 'Quantity cannot be negative' } })} />
                        {errors.itemQuantity && <p className="font12 text-danger">{errors.itemQuantity.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Purchase Price <span className='text-danger'>*</span></label>
                        <input id="purchasePrice" type="number" className={`form-control font14 ${errors.purchasePrice ? 'border-danger' : ''}`} {...register('purchasePrice', { required: 'Purchase Price is required *', min: { value: 0, message: 'Purchase Price cannot be negative' } })} />
                        {errors.purchasePrice && <p className="font12 text-danger">{errors.purchasePrice.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Date</label>
                        <input id="dateCreated" type="date" className={`form-control font14 ${errors.dateCreated ? 'border-danger' : ''}`} {...register('dateCreated', { required: 'Date Created is required *' })} />
                        {errors.dateCreated && <p className="font12 text-danger">{errors.dateCreated.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Description</label>
                        <input id="itemDescription" type="text" className={`form-control font14 ${errors.itemDescription ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('itemDescription', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                        {errors.itemDescription && <p className="font12 text-danger">{errors.itemDescription.message}</p>}
                    </div>
                    <div className="col-12 mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Attach Document  <span className='text-danger'>*</span></label>
                        <div className="d-flex bg-white">
                            {fileVal !== null && changeImageType ?
                                <input id="document" type="text" className='form-control formimagetext font14' value={fileVal.split('/').pop()} disabled />
                                :
                                <input id="document" type="file" className={`form-control formimagetext font14 ${errors.document ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('document', { required: 'Admin Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                            }
                            <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                    {fileVal !== null && changeImageType ? 'Edit' : 'View'}
                                </span>
                            </div>
                        </div>
                        {errors.document && <p className="font12 text-danger">{errors.document.message}</p>}
                        {/* <input id="document" type="document" className={`form-control font14 ${errors.document ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' onChange={(e) => { const files = e.target.files; setValue('document', files[0]); }}  {...register('document', { required: 'Item Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                        {errors.document && <p className="font12 text-danger">{errors.document.message}</p>} */}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons2 font14 text-white me-2' type='submit' >Update Item Stock</button>
                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </p>
                </form>
            </div>
        </div>


    )
}

export default EditItemStock













































// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { getAllItemApi, getAllItemCategoryApi, getAllItemStoreApi, getAllItemSupplierApi, getItemStockByIdApi, updateItemStockByIdApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';

// const Container = styled.div`
//     .form-select{
//         color: var(--greyState);
//         box-shadow: none;
//         border-color: var(--greyState);
//     }

//     .correvtSVG{
//         position: relative;
//         width: fit-content ;
//         margin-left: 43% !important;
//         margin-bottom: -16% !important;
//         background-color: #2BB673;
//         width: 73px;
//         height: 73px;
//         align-items: center;
//     }

//     .contbtn{
//         margin-left: 41% !important;
//         margin-top: -20% !important;
//     }

//     .greydiv{
//         background-color: #FBFBFB;
//     }

// `;

// const EditItemStock = ({ EditId , ReloadData}) => {

//     const token = localStorage.getItem('token');
//     //loader State
//     const [loaderState, setloaderState] = useState(false);
//     const [ItemData, setItemData] = useState([]);
//     const [ItemStoreData, setItemStoreData] = useState([]);
//     const [ItemSupplierData, setItemSupplierData] = useState([]);
//     const [ItemCategoryData, setItemCategoryData] = useState([]);
//     const [EditWarning, setEditWarning] = useState(true)
//     const [ItemCategory, setItemCategory] = useState('');
//     const [ItemCategoryId, setItemCategoryId] = useState(0);
//     const [ItemSupplier, setItemSupplier] = useState('');
//     const [ItemSupplierId, setItemSupplierId] = useState(0);
//     const [ItemStore, setItemStore] = useState('');
//     const [ItemStoreId, setItemStoreId] = useState(0);
//     const [ItemQuantity, setItemQuantity] = useState(0);
//     const [ItemDateCreated, setItemDateCreated] = useState();
//     const [ItemPurchasePrice, setItemPurchasePrice] = useState(0);
//     const [ItemId, setItemId] = useState(0);
//     const [ItemName, setItemName] = useState('');
//     const [ItemDescription, setItemDescription] = useState('');
//     const [ItemDocument, setItemDocument] = useState('');
//     const [changeImageType, setChangeImageType] = useState(true)

//     useEffect(() => {
//         getAllItemData();
//         getAllItemSupplierData();
//         getAllItemStoreData();
//         getAllItemCategoryData();
//         getItemStockDataById()
//     }, [EditId, token])

//     const getAllItemData = async () => {
//         try {
//             setloaderState(true);
//             var response = await getAllItemApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setItemData(response?.data?.items);
//                 }
//                 else {
//                     setloaderState(false);
//                     toast.error(response?.data?.message, 'item');
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log('Error Facing during Get All Item API - ', error)
//         }
//     }

//     const getAllItemCategoryData = async () => {
//         try {
//             setloaderState(true);
//             var response = await getAllItemCategoryApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setItemCategoryData(response?.data?.itemCategories);
//                 }
//                 else {
//                     setloaderState(false);
//                     toast.error(response?.data?.message, 'category');
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log('Error Facing during Get All Item API - ', error)
//         }
//     }

//     const getAllItemSupplierData = async () => {
//         try {
//             setloaderState(true);
//             var response = await getAllItemSupplierApi();
//             console.log(response)
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setItemSupplierData(response?.data?.itemSuppliers);
//                 }
//                 else {
//                     setloaderState(false);
//                     toast.error(response?.data?.message, 'supplier');
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log('Error Facing during Get All Item API - ', error)
//         }
//     }

//     const getAllItemStoreData = async () => {
//         try {
//             setloaderState(true);
//             var response = await getAllItemStoreApi();
//             console.log(response)
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setItemStoreData(response?.data?.itemStores);
//                 }
//                 else {
//                     setloaderState(false);
//                     toast.error(response?.data?.message, 'store');
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log('Error Facing during Get All Item API - ', error)
//         }
//     }

//     const getItemStockDataById = async () => {
//         try {
//             setloaderState(true);
//             var response = await getItemStockByIdApi(EditId);
//             console.log(response)
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setItemId(response?.data?.itemStock?.itemId)
//                     setItemName(response?.data?.itemStock?.itemName)
//                     setItemCategoryId(response?.data?.itemStock?.itemCategoryId)
//                     setItemCategory(response?.data?.itemStock?.itemCategory)
//                     setItemSupplierId(response?.data?.itemStock?.supplierId)
//                     setItemSupplier(response?.data?.itemStock?.supplierName)
//                     setItemStoreId(response?.data?.itemStock?.storeId)
//                     setItemStore(response?.data?.itemStock?.storeName)
//                     setItemPurchasePrice(response?.data?.itemStock?.purchasePrice)
//                     setItemDateCreated(response?.data?.itemStock?.dateCreated)
//                     setItemQuantity(response?.data?.itemStock?.itemQuantity)
//                     setItemDescription(response?.data?.itemStock?.itemDescription)
//                     setItemDocument(response?.data?.itemStock?.documentPath)
//                     toast.success(response?.data?.message);
//                 }
//                 else {
//                     setloaderState(false);
//                     toast.error(response?.data?.message, 'add');
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 // console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             // console.log('Error Facing during Get Item By Id API - ', error)
//         }
//     }

//     const handleItemData = (value) => {
//         const [val1, val2] = value.split(',');
//         setItemId(val1);
//         setItemName(val2);
//     }

//     const handleItemCategoryData = (value) => {
//         const [val1, val2] = value.split(',');
//         setItemCategoryId(val1);
//         setItemCategory(val2);
//     }

//     const handleItemSupplierData = (value) => {
//         const [val1, val2] = value.split(',');
//         setItemSupplierId(val1);
//         setItemSupplier(val2);
//     }

//     const handleItemStoreData = (value) => {
//         const [val1, val2] = value.split(',');
//         setItemStoreId(val1);
//         setItemStore(val2);
//     }

//     const updateItemStockDataById = async () => {
//         try {
//             console.log(EditId, 'EditId')
//             setloaderState(true);
//             const formData = new FormData();
//             formData.append('itemId', ItemId)
//             formData.append('itemCategory', ItemCategory)
//             formData.append('itemCategoryId', ItemCategoryId)
//             formData.append('supplierName', ItemSupplier)
//             formData.append('supplierId', ItemSupplierId)
//             formData.append('storeName', ItemStore)
//             formData.append('storeId', ItemStoreId)
//             formData.append('itemQuantity', ItemQuantity)
//             formData.append('purchasePrice', ItemPurchasePrice)
//             formData.append('dateCreated', ItemDateCreated)
//             formData.append('document', ItemDocument)
//             formData.append('itemDescription', ItemDescription)
//             var response = await updateItemStockByIdApi(EditId,formData);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setloaderState(false);
//                     setEditWarning(false)
//                     toast.success(response?.data?.message);
//                 }
//                 else {
//                     setloaderState(false);
//                     toast.error(response?.data?.message, 'update');
//                 }
//             }
//             else {
//                 setloaderState(false);
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log('Error Facing during Get Item By Id API - ', error)
//         }
//     }

//         return (
//             <>
//                 <Container>
//                     <div className="container-fluid">
//                         <div className="row">
//                             {EditWarning
//                                 ?
//                                 <>
//                                     <form className=''>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Item Category <span className='text-danger'>*</span></label>
//                                             <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemCategoryId},${ItemCategory}`} onChange={(e) => handleItemCategoryData(e.target.value)}>
//                                                 <option  value='' >--- Select ---</option>
//                                                 {ItemCategoryData.map((option) => (
//                                                     <option key={option.id} value={`${option?.id},${option?.name}`}>{option.name}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Item <span className='text-danger'>*</span></label>
//                                             <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemId},${ItemName}`} onChange={(e) => handleItemData(e.target.value)}>
//                                                 <option  value='' >--- Select ---</option>
//                                                 {ItemData.map((option) => (
//                                                     <option key={option.id} value={`${option?.id},${option?.itemName}`}>{option.itemName}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Supplier</label>
//                                             <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemSupplierId},${ItemSupplier}`} onChange={(e) => handleItemSupplierData(e.target.value)}>
//                                                 <option  value='' >--- Select ---</option>
//                                                 {ItemSupplierData.map((option) => (
//                                                     <option key={option.supplierId} value={`${option?.supplierId},${option?.supplierName}`}>{option.supplierName}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Store</label>
//                                             <select className={`form-select font14  `} aria-label="Default select example" value={`${ItemStoreId},${ItemStore}`} onChange={(e) => handleItemStoreData(e.target.value)}>
//                                                 <option  value='' >--- Select ---</option>
//                                                 {ItemStoreData.map((option) => (
//                                                     <option key={option.id} value={`${option?.id},${option?.storeName}`}>{option.storeName}</option>
//                                                 ))}
//                                             </select>
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Quantity <span className='text-danger'>*</span></label>
//                                             <input type="text" className="form-control font14" id="exampleFormControlInput1" value={ItemQuantity} placeholder="Enter User Type" onChange={(e) => setItemQuantity(e.target.value)} />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Purchase Price ($)</label>
//                                             <input type="text" className="form-control font14" id="exampleFormControlInput1" value={ItemPurchasePrice} placeholder="Enter User Type" onChange={(e) => setItemPurchasePrice(e.target.value)} />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Date <span className='text-danger'>*</span></label>
//                                             <input type="date" className="form-control font14" id="exampleFormControlInput1" value={ItemDateCreated} placeholder="Enter User Type" onChange={(e) => setItemDateCreated(e.target.value)} />
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Attach Document </label>
//                                             {/* <input type="document" className="form-control font14" id="exampleFormControlInput1" value={ItemDocument} placeholder="Enter User Type" /> */}
//                                             <div className="d-flex bg-white">
//                                                 {ItemDocument && changeImageType ? (
//                                                     <input type='text' className={`form-control font14 formcontrolImageborder `} id="validationDefault02" value={ItemDocument.split('/').pop()} readOnly />
//                                                 ) : (
//                                                     <input type='document' className={`form-control font14 formcontrolImageborder `} accept="image/png, image/jpg, image/svg, image/jpeg" id="validationDefault02" onChange={(e) => setItemDocument(e.target.files[0])} />
//                                                 )}
//                                                 <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
//                                                     <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
//                                                         {ItemDocument && changeImageType ? 'Edit' : 'View'}
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div className="mb-3">
//                                             <label htmlFor="exampleInputEmail1" className="form-label font14">Description </label>
//                                             <input type="text" className="form-control font14" id="exampleFormControlInput1" value={ItemDescription} placeholder="Enter User Type" onChange={(e) => setItemDescription(e.target.value)} />
//                                         </div>
//                                         <p className='text-center p-3'>
//                                             <button className='btn updateButtons text-white' type='button' onClick={updateItemStockDataById}>Save</button>
//                                             <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                         </p>
//                                     </form>
//                                 </>
//                                 :
//                                 <>
//                                     <div>
//                                         <p className="modalLightBorder p-2 mb-0">Vehicle List</p>
//                                         <div className="mt-3">
//                                             <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                                             <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                                 <p className='warningHeading'>Successful Updated</p>
//                                                 <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                             </div>
//                                             <button className="btn contbtn continueButtons text-white" data-bs-dismiss="offcanvas" aria-label="Close" onClick={ReloadData}>Continue</button>
//                                         </div>
//                                     </div>
//                                 </>
//                             }

//                         </div>
//                         <Toaster />
//                     </div>
//                 </Container>
//             </>
//         )
//     }

//     export default EditItemStock