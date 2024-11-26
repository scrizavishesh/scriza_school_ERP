import React, { useState } from 'react'
import { addNewPackageApi } from '../Utils/Apis';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const AddPackage = ({ closingOfAddCanvas }) => {

    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [AddWarning, setAddWarning] = useState(true);
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });


    const AddNewPackage = async (data) => {
        setloaderState(true);
        try {
            const JSONdata = {
                "planName": data?.planName,
                "price": data?.price,
                "type": data?.type,
                "value": data?.value,
                "studentLimit": data?.studentLimit,
                "status": data?.status
            }
            var response = await addNewPackageApi(JSONdata);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    toast.success(response?.data?.message)
                    // setAddWarning(!AddWarning)
                    setTimeout(async () => {
                        await closingOfAddCanvas(true);
                    }, 2000);

                    // setTimeout(() => {
                    //     setAddWarning(true);
                    // }, 3000);
                }
                else{
                    setloaderState(false);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch {
            setloaderState(false);
            console.log('invalid')
        }
    }


    return (
        <div className="container-fluid">
            {loaderState && (<DataLoader />)}
            <div className="row">
                {AddWarning
                    ?
                    <>
                        <form className='p-3' onSubmit={handleSubmit(AddNewPackage)}>
                            <div className="row mb-3">
                                <label htmlFor="planName" className="form-label ps-0 font14">Package Name</label>
                                <input id="planName" type="text" className={`form-control font14 ${errors.planName ? 'border-danger' : ''}`} placeholder="Enter Plan Name" {...register('planName', { required: 'Plan Name is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Plan Name must start with an uppercase letter'; } if (value.length < 4) { return 'Minimum Length is 4'; } if (!/^[a-zA-Z\s'-]+$/.test(value)) { return 'Invalid Characters in Plan Name'; } return true; } })} />
                                {errors.planName && <p className="font12 text-danger">{errors.planName.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="price" className="form-label ps-0 font14">Price</label>
                                <input id="price" type="text" className={`form-control font14 ${errors.price ? 'border-danger' : ''}`} placeholder="Enter Price Value" {...register('price', { required: 'Price is required *', validate: value => { if (!/^\d+(\.\d{1,2})?$/.test(value)) { return 'Please enter a valid Price Value'; } return true; } })} />
                                {errors.price && <p className="font12 text-danger">{errors.price.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="type" className="form-label ps-0 font14">Interval</label>
                                <select id="type" className={`form-select font14 ${errors.type ? 'border-danger' : ''}`} {...register('type', { required: 'Interval is required *' })}>
                                    <option value="">Select Interval</option>
                                    <option value="YEARS">Years</option>
                                    <option value="MONTHS">Months</option>
                                    <option value="WEEKS">Weeks</option>
                                    <option value="DAYS">Days</option>
                                </select>
                                {errors.type && <p className="font12 text-danger">{errors.type.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="value" className="form-label ps-0 font14">Period</label>
                                <input id="value" type="text" className={`form-control font14 ${errors.value ? 'border-danger' : ''}`} placeholder="Enter Period Value" {...register('value', { required: 'Period is required *', validate: value => { if (!/^\d+(\.\d{1,2})?$/.test(value)) { return 'Please enter a valid Period Value'; } return true; } })} />
                                {errors.value && <p className="font12 text-danger">{errors.value.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="studentLimit" className="form-label ps-0 font14">Student Limit</label>
                                <input id="studentLimit" type="text" className={`form-control font14 ${errors.studentLimit ? 'border-danger' : ''}`} placeholder="Enter Student Limit" {...register('studentLimit', { required: 'Student Limit is required *', validate: value => { if (!/^\d+$/.test(value)) { return 'Please enter a valid Limit Value'; } return true; } })} />
                                {errors.studentLimit && <p className="font12 text-danger">{errors.studentLimit.message}</p>}
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="BundleName" className="form-label ps-0 font14">Status</label>
                                <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status is required *' })}>
                                    <option value="">Select Status</option>
                                    <option value={true}>Active</option>
                                    <option value={false}>InActive</option>
                                </select>
                                {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
                            </div>
                            <p className='text-center p-3'>
                                <button className='btn addButtons2 text-white' type='submit'>Add Package</button>
                                <button className='btn cancelButtons ms-3' type='button'>Cancel</button>
                            </p>
                        </form>
                    </>
                    :
                    <>
                        <div>
                            <p className='modalLightBorder p-2 mb-0'>School List</p>
                            <div className="mt-3  ">
                                <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
                                <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
                                    <p className='warningHeading'>Successful Updated</p>
                                    <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
                                </div>
                                <button className='btn contbtn continueButtons text-white' data-bs-dismiss="offcanvas" aria-label="Close">Success</button>
                            </div>
                        </div>
                    </>

                }

            </div>
        </div>
    )
}

export default AddPackage