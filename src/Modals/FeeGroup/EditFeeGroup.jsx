import React, { useEffect, useState } from 'react'
import DataLoader from '../../Layouts/Loader';
import toast from 'react-hot-toast';
import { getFeeGroupByIdApi, updateFeeGroupByIdApi } from '../../Utils/Apis';
import { useForm } from 'react-hook-form';

const EditFeeGroup = ({ EditId , editedSuccess }) => {

    // loader State
    const [loaderState, setloaderState] = useState(false);
    const [OriginalFeeGroupName, setOriginalFeeGroupName] = useState('');
    const [OriginalFeeGroupDescription, setOriginalFeeGroupDescription] = useState('');

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });

    const feeGroupNameVal = watch('feeGroupName')
    const descriptionVal = watch('description')

    useEffect(() => {
        getFeeGroupDataById();
    }, [EditId])
    

    const getFeeGroupDataById = async () => {
        try {
            setloaderState(true);
            var response = await getFeeGroupByIdApi(EditId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setValue('feeGroupName',response?.data?.feeGroup?.feeGroupName)
                    setValue('description',response?.data?.feeGroup?.feeDescription)
                    setOriginalFeeGroupName(response?.data?.feeGroup?.feeGroupName)
                    setOriginalFeeGroupDescription(response?.data?.feeGroup?.feeDescription)
                    // toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    // toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get Fee Group By Id API - ', error)
        }
    }

    const updateFeeGroupById = async (data) => {
        try {
            const formData = new FormData();
            if (data?.feeGroupName !== OriginalFeeGroupName) {
                formData.append('feeGroupName', data?.feeGroupName);
            }
            if (data?.description !== OriginalFeeGroupDescription) {
                formData.append('description', data?.description);
            }

            var response = await updateFeeGroupByIdApi(EditId, formData);
            console.log(response);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    editedSuccess(true)
                }
                else {
                    setloaderState(false);
                    // toast.error(response?.data?.message)
                }
            }
            else {
                setloaderState(false);
                // console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Update Fee Group By Id API - ', error)
        }
    }


    return (
        <div className="container-fluid p-0">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(updateFeeGroupById)}>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Name</label>
                        <input id="feeGroupName" type="text" className={`form-control font14 ${errors.feeGroupName ? 'border-danger' : ''}`} placeholder="Enter Fee Group Name" {...register('feeGroupName', { required: 'Fee Group Name is required *', validate: value => { if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Fee Group Name'; } return true; } })} />
                        {errors.feeGroupName && <p className="font12 text-danger">{errors.feeGroupName.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label font14">Description</label>
                        <input id="description" type="text" className={`form-control font14 ${errors.description ? 'border-danger' : ''}`} placeholder="Enter Description" {...register('description', { required: 'Description is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Description must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Description'; } return true; } })} />
                        {errors.description && <p className="font12 text-danger">{errors.description.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons2 font14 text-white me-2' type='submit' disabled={OriginalFeeGroupName === feeGroupNameVal && OriginalFeeGroupDescription === descriptionVal ? true : false} >Update Fee Group</button>
                        <button className='btn cancelButtons font14' data-bs-dismiss="offcanvas" aria-label="Close" type='button'>Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default EditFeeGroup