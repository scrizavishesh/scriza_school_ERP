import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import DataLoader from '../../Layouts/Loader';
import { getFeeTypeByIdApi, updateFeeTypeByIdApi } from '../../Utils/Apis';

const EditFeeType = ({ editId, editedSuccess }) => {

    // loader State
    const [loaderState, setloaderState] = useState(false);

    const [OriginalFeeTypeName, setOriginalFeeTypeName] = useState('');
    const [OriginalFeeTypeCode, setOriginalFeeTypeCode] = useState('');
    const [OriginalFeeTypeDescription, setOriginalFeeTypeDescription] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });

    const feeTypeNameVal = watch('feeTypeName')
    const feeTypeCodeVal = watch('feeTypeCode')
    const descriptionVal = watch('description')

    useEffect(() => {
        getFeeTypeDataById()
    }, [editId])


    const getFeeTypeDataById = async () => {
        try {
            setloaderState(true);
            var response = await getFeeTypeByIdApi(editId);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setValue('feeTypeName', response?.data?.feeType?.feeTypeName)
                    setValue('feeTypeCode', response?.data?.feeType?.feeTypeCode)
                    setValue('description', response?.data?.feeType?.description)
                    setOriginalFeeTypeName(response?.data?.feeType?.feeTypeName)
                    setOriginalFeeTypeCode(response?.data?.feeType?.feeTypeCode)
                    setOriginalFeeTypeDescription(response?.data?.feeType?.description)
                    toast.success(response?.data?.message);
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
            console.log('Error Facing during Get All Fee Type API - ', error)
        }
    }

    const updateFeeType = async (data) => {
        try {
            const formData = new FormData();
            if (data?.feeTypeName !== OriginalFeeTypeName) {
                formData.append('feeTypeName', data?.feeTypeName);
            }
            if (data?.feeTypeCode !== OriginalFeeTypeCode) {
                formData.append('feeTypeCode', data?.feeTypeCode);
            }
            if (data?.description !== OriginalFeeTypeDescription) {
                formData.append('description', data?.description);
            }

            var response = await updateFeeTypeByIdApi(editId, formData);
            console.log(response);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    editedSuccess(true);
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
            console.log('Error facing while adding fee type', error)
        }
    }


    return (
        <div className="container-fluid p-0">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(updateFeeType)}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
                        <input id="feeTypeName" type="text" className={`form-control font14 ${errors.feeTypeName ? 'border-danger' : ''}`} placeholder="Enter Fee Type Name" {...register('feeTypeName', { required: 'Fee Type Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Fee Type Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Fee Type Name'; } return true; } })} />
                        {errors.feeTypeName && <p className="font12 text-danger">{errors.feeTypeName.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Fees Code*</label>
                        <input id="feeTypeCode" type="text" className={`form-control font14 ${errors.feeTypeCode ? 'border-danger' : ''}`} placeholder="Enter Fee Type Code" {...register('feeTypeCode', { required: 'Fee Type Code is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Fee Type Code'; } return true; } })} />
                        {errors.feeTypeCode && <p className="font12 text-danger">{errors.feeTypeCode.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label font14">Description</label>
                        <input id="description" type="text" className={`form-control font14 ${errors.description ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('description', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                        {errors.description && <p className="font12 text-danger">{errors.description.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons font14 text-white me-2' type='submit' disabled={OriginalFeeTypeName === feeTypeNameVal && OriginalFeeTypeCode === feeTypeCodeVal && OriginalFeeTypeDescription === descriptionVal ? true : false} >Update Fee Type</button>
                        <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default EditFeeType