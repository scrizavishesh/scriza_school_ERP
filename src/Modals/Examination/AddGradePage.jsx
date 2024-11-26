import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addNewGradeApi } from '../../Utils/Apis';
import DataLoader from '../../Layouts/Loader';

const AddGradePage = ({ setAddValue }) => {

    // loader State
    const [loaderState, setloaderState] = useState(false);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    const AddNewGrades = async (data) => {
        setloaderState(true);
        try {
            const formData = new FormData();
            formData.append('grade', data?.grade);
            formData.append('gradePoint', data?.gradePoint);
            formData.append('marksFrom', data?.marksFrom);
            formData.append('marksUpTo', data?.marksUpTo);

            var response = await addNewGradeApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message);
                    setAddValue(true);
                    setTimeout(() => {
                        setValue('grade', '');
                        setValue('gradePoint', '');
                        setValue('marksFrom', '');
                        setValue('marksUpTo', '');
                    }, 700);
                } else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            } else {
                setloaderState(false);
                toast.error(response?.data?.message);
            }
        } catch (error) {
            setloaderState(false);
            console.error('Error during update:', error);
            toast.error('Error during update:', error);
        }
    };

    return (
        <div className="container-fluid p-0">
            {loaderState && (<DataLoader />)}
            <div className="row">
                <form onSubmit={handleSubmit(AddNewGrades)}>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label font14">Grade</label>
                        <input id="grade" type="text" className={`form-control font14 ${errors.grade ? 'border-danger' : ''}`} placeholder="Enter Grade" {...register('grade', { required: 'Grade is required *', validate: value => { const allowedGrades = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2', 'E', 'F']; if (!allowedGrades.includes(value)) { return 'Grade must be one of A1, A2, B1, B2, C1, C2, D1, D2, E, F'; } return true; } })} />
                        {errors.grade && <p className="font12 text-danger">{errors.grade.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="gradePoint" className="form-label font14">Grade Point</label>
                        <input id="gradePoint" type="number" className={`form-control font14 ${errors.gradePoint ? 'border-danger' : ''}`} placeholder="Enter Grade Point" {...register('gradePoint', { required: 'Grade Point is required *', min: { value: 0, message: 'Grade Point cannot be less than 0' }, max: { value: 10, message: 'Grade Point cannot be greater than 10' } })} />
                        {errors.gradePoint && <p className="font12 text-danger">{errors.gradePoint.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="marksFrom" className="form-label font14">Marks From</label>
                        <input id="marksFrom" type="number" className={`form-control font14 ${errors.marksFrom ? 'border-danger' : ''}`} placeholder="Enter Marks From" {...register('marksFrom', { required: 'Marks From is required *', validate: value => { if (isNaN(value)) { return 'Marks From must be a number'; } return true; } })} />
                        {errors.marksFrom && <p className="font12 text-danger">{errors.marksFrom.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="marksUpTo" className="form-label font14">Marks Up To</label>
                        <input id="marksUpTo" type="number" className={`form-control font14 ${errors.marksUpTo ? 'border-danger' : ''}`} placeholder="Enter Marks Up To" {...register('marksUpTo', { required: 'Marks Up To is required *', validate: value => { if (isNaN(value)) { return 'Marks Up To must be a number'; } return true; } })} />
                        {errors.marksUpTo && <p className="font12 text-danger">{errors.marksUpTo.message}</p>}
                    </div>

                    <p className='text-center p-3'>
                        <button className='btn updateCategoryButtons text-white' type='submit'>Create Grade</button>
                        <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AddGradePage;
