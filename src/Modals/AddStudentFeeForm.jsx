import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { addNewFeeApi, getAllFeeDiscountApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import toast from 'react-hot-toast';

const AddStudentFeeForm = ({ AddFeeId, modalHideTrue }) => {

    const token = localStorage.getItem('token');

    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [FeeDiscountData, setFeeDiscountData] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        getAllFeeDiscountData()
    }, [token])

    const getAllFeeDiscountData = async () => {
        try {
            setloaderState(true);
            var response = await getAllFeeDiscountApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeDiscountData(response?.data?.feeDiscounts);
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
            console.log('Error Facing during Get All Fee Group API - ', error)
        }
    }

    const AddFee = async (data) => {
        try {
            const formData = new FormData();
            formData.append('date', data?.date);
            formData.append('paidAmount', data?.paidAmount);
            formData.append('discountCode', data?.discountCode);
            formData.append('fineAmount', data?.fineAmount);
            formData.append('paymentMode', data?.paymentMode);
            formData.append('note', data?.note);
            var response = await addNewFeeApi(AddFeeId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    setloaderState(false);
                    modalHideTrue(true)
                    setTimeout(() => {
                        reset();
                    }, 300);
                }
                else {
                    setloaderState(false);
                    // toast.error(response?.data?.message)
                }
            }

        }
        catch {

        }
    }



    return (
        <div className="container-fluid p-0">
        { loaderState && ( <DataLoader /> ) }
            <div className="row">
                <form className='pt-2' onSubmit={handleSubmit(AddFee)}>
                    <div className="mb-2">
                        <label htmlFor="inputEmail3" className="form-label font14">Date</label>
                        <input id="date" type="date" className={`form-control font14 ${errors.date ? 'border-danger' : ''}`} placeholder="Enter Date " {...register("date", { required: 'Date is required *' })} />
                        {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail3" className="form-label font14">Amount</label>
                        <input id="paidAmount" type="number" className={`form-control font14 ${errors.paidAmount ? 'border-danger' : ''}`} placeholder='Enter Paid Amount' {...register('paidAmount', { required: 'Paid Amount id required *', min: { value: 0, message: 'Amount cannot be negative' } })} />
                        {errors.paidAmount && <p className="font12 text-danger">{errors.paidAmount.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail3" className="form-label font14">Discount Group</label>
                        <select id="discountCode" className={`form-select font14 ${errors.discountCode ? 'border-danger' : ''}`} {...register('discountCode', { required: 'Discount Group is required *' })} >
                            <option value="" disabled selected>--- Select ---</option>
                            {FeeDiscountData.map((option) => (
                                <option key={option.feeDiscountId} value={option.feeDiscountCode}>{option.feeDiscountName}</option>
                            ))}
                        </select>
                        {errors.discountCode && <p className="font12 text-danger">{errors.discountCode.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail3" className="form-label font14">Fine</label>
                        <input id="fineAmount" type="number" className={`form-control font14 ${errors.fineAmount ? 'border-danger' : ''}`} placeholder='Enter Fine Amount' {...register('fineAmount', { required: 'Fine Amount are required *', min: { value: 0, message: 'Fine Amount cannot be negative' } })} />
                        {errors.fineAmount && <p className="font12 text-danger">{errors.fineAmount.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail3" className="form-label font14">Payment Mode</label>
                        <select id="paymentMode" className={`form-select font14 ${errors.paymentMode ? 'border-danger' : ''}`} {...register('paymentMode', { required: 'Payment Mode is required *' })} >
                            <option value="" disabled selected>--- Select ---</option>
                            <option value='Offline'>Offline</option>
                            <option value='Online'>Online</option>
                        </select>
                        {errors.paymentMode && <p className="font12 text-danger">{errors.paymentMode.message}</p>}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="inputEmail3" className="form-label font14">Note</label>
                        <input id="note" type="text" className={`form-control font14 ${errors.note ? 'border-danger' : ''}`} placeholder="Enter Note" {...register('note', { required: 'Note is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Note must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Note'; } return true; } })} />
                        {errors.note && <p className="font12 text-danger">{errors.note.message}</p>}
                    </div>
                    <p className='text-center p-4'>
                        <button className='btn printButtons text-white font14' type='submit'>Add Fee</button>
                        <button type="button" className="btn cancelButtons ms-2" data-bs-dismiss="modal">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default AddStudentFeeForm