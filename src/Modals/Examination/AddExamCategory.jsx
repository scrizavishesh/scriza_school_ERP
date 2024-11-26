import React, { useEffect, useState } from 'react'
import { addNewExamCategoryApi } from '../../Utils/Apis'
import toast from 'react-hot-toast'
import DataLoader from '../../Layouts/Loader';
import { useForm } from 'react-hook-form';

const AddExamCategory = ({ setAddedExam }) => {

    // loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    // Add new Exam category data
    const AddNewExamCategory = async (data) => {
        try {
            setloaderState(true);
            const formData = new FormData();
            formData.append('examCategoryName', data?.examCategoryName)
            var response = await addNewExamCategoryApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message);
                    setAddedExam(true)
                    setTimeout(() => {
                        setValue('examCategoryName', '')
                    }, 500);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message)
                    setAddedExam(false)
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message)
                setAddedExam(false)
            }
        } catch (error) {
            setloaderState(false);
            toast.error('Error during add:', error)
            setAddedExam(false)
        }
    }


    return (
        <div className="container-fluid p-0">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(AddNewExamCategory)}>
                    <div className="mb-3">
                        <label htmlFor="examCategoryName" className="form-label font14">Exam Category</label>
                        <input id="examCategoryName" type="text" className={`form-control font14 ${errors.examCategoryName ? 'border-danger' : ''}`} placeholder="Enter Exam Category Name" {...register('examCategoryName', { required: 'Exam Category Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Exam Category Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Exam Category Name'; } return true; } })} />
                        {errors.examCategoryName && <p className="font12 text-danger">{errors.examCategoryName.message}</p>}
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn updateCategoryButtons text-white' type='submit'>Create Category</button>
                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close" >Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default AddExamCategory