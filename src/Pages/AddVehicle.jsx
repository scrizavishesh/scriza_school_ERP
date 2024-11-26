import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import { AddNewVehicleApi, getAllRouteApi, getDriverDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .ActiveState{
        cursor: pointer;
        color: #000;
        border-bottom: 3px solid orange;
    }

    .InActiveState{
        cursor: pointer;
        color: var(--greyState);
    }

    .form-control::placeholder, .form-control, .form-select{
        color: var(--greyState)
    }

    .form-control, .form-select{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .CancelBtnn, .CancelBtnn:active{
        border: 2px solid var(--BtnBorder);
    }
`;

const AddVehicle = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [allRouteData, setAllRouteData] = useState([]);
    const [driverData, setDriverData] = useState([]);

    const { register, handleSubmit, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });

    useEffect(() => {
        getAllRouteData();
        getAllDriverData();
    }, [token])

    const getAllRouteData = async () => {
        setloaderState(true)
        try {
            var response = await getAllRouteApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllRouteData(response?.data?.routes);
                }
                else {
                    setloaderState(false)
                    toast.error(response?.data?.message)
                }
            }
            else {
                setloaderState(false)
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false)
            console.log('Error facing in fetching Routes', error)
            if (error?.response?.data?.statusCode === 401){
              localStorage.removeItem('token')
              setTimeout(() => {
                navigate('/')
              }, 200);
            }
        }
    }

    const getAllDriverData = async () => {
        setloaderState(true)
        try {
            var response = await getDriverDataApi('', '', '');
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setDriverData(response?.data?.drivers);
                }
                else {
                    setloaderState(false)
                    toast.error(response?.data?.message)
                }
            }
            else {
                setloaderState(false)
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            setloaderState(false)
            console.log('Error facing in fetching Driver', error)
        }
    }

    const AddNewVehicle = async (data) => {
        try {
            setloaderState(true)
            const formData = new FormData();
            formData.append('vehicleNo', data?.vehicleNo),
                formData.append('vehicleModel', data?.vehicleModel),
                formData.append('chassisNo', data?.chassisNo),
                formData.append('driverId', data?.driverId),
                formData.append('totalSeat', data?.totalSeat),
                formData.append('routeId', data?.routeId)

            var response = await AddNewVehicleApi(formData);
            console.log(response, 'add vehicle');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    toast.success(response?.data?.message)
                    setTimeout(() => {
                        navigate('/vehicle');
                    }, 1000);
                }
                else {
                    toast.error(response?.data?.message, 'else 1');
                    setloaderState(false)
                }
            }
            else {
                toast.error(response?.data?.message, 'else 2');
                setloaderState(false)
            }
        }
        catch (error) {
            toast.error(error);
            console.log(error, 'catch error')
            setloaderState(false)
        }
    }

    const handleCancelBtn = async () => {
        navigate('/vehicle')
    }

    return (
        <>
            <Container>
                { loaderState && ( <DataLoader /> ) }
                <div className="container-fluid p-4">
                    <div className="row pb-3">
                        <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                            <ol className="breadcrumb mb-1">
                                <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                <li className="breadcrumb-item"><a href="/driver" className='bredcrumText text-decoration-none'>Transport</a></li>
                                <li className="breadcrumb-item"><a href="/vehicle" className='bredcrumText text-decoration-none'>Vehicle</a></li>
                                <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Add Vehicle</li>
                            </ol>
                        </nav>
                        <p className='font16 ps-0 fontWeight500'>Add Vehicle Form</p>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3" onSubmit={handleSubmit(AddNewVehicle)}>
                                <div className="col-md-6 col-sm-12 col-12">
                                    <label htmlFor="vehicleNo" className="form-label font14">Vehicle Number*</label>
                                    <input id="vehicleNo" type="text" className={`form-control font14 ${errors.vehicleNo ? 'border-danger' : ''}`} placeholder="Enter Vehicle Number" {...register('vehicleNo', {
                                        required: 'Vehicle Number is required *', pattern: { value: /^[A-Z]{2}\d{2}[A-Z]{2}\d{4}$/, message: 'Vehicle Number must follow the format (e.g., AB12CD3456)' }
                                        // validate: value => { if (!/^[A-Z0-9]+$/.test(value)) { return 'Vehicle Number can only contain uppercase letters and digits, no special characters or lowercase letters'; } return true; }
                                    })} />
                                    {errors.vehicleNo && <p className="font12 text-danger">{errors.vehicleNo.message}</p>}
                                </div>
                                <div className="col-md-6 col-sm-12 col-12">
                                    <label htmlFor="vehicleModel" className="form-label font14">Vehicle Model*</label>
                                    <input id="vehicleModel" type="text" className={`form-control font14 ${errors.vehicleModel ? 'border-danger' : ''}`} placeholder="Enter Vehicle Model" {...register('vehicleModel', { required: 'Vehicle Model is required *', validate: value => { if (!/^[A-Z][a-zA-Z0-9-]*$/.test(value)) { return 'Vehicle Model must start with an uppercase letter and can only contain letters, digits, and hyphens (-)'; } return true; } })} />
                                    {errors.vehicleModel && <p className="font12 text-danger">{errors.vehicleModel.message}</p>}
                                </div>
                                <div className="col-md-6 col-sm-12 col-12">
                                    <label htmlFor="chassisNo" className="form-label font14">Chassis Number*</label>
                                    <input id="chassisNo" type="text" className={`form-control font14 ${errors.chassisNo ? 'border-danger' : ''}`} placeholder="Enter Chassis Number" {...register('chassisNo', { required: 'Chassis Number is required *', min: { value: 10, message: 'Chassis Number must be of size 10' }, validate: value => { if (!/^[A-Z0-9]+$/.test(value)) { return 'Chassis Number can only contain uppercase letters and digits'; } return true; } })} />
                                    {errors.chassisNo && <p className="font12 text-danger">{errors.chassisNo.message}</p>}
                                </div>
                                <div className="col-md-6 col-sm-12 col-12">
                                    <label htmlFor="driverId" className="form-label font14">Assign Driver*</label>
                                    <select id="driverId" className={`form-select font14 ${errors.driverId ? 'border-danger' : ''}`} {...register('driverId', { required: 'Driver selection is required *' })}>
                                        <option value="">Select Driver</option>
                                        {driverData.map((driver) => (
                                            <option key={driver.driverId} value={driver.driverId}>{driver.driverName}</option>
                                        ))}
                                    </select>
                                    {errors.driverId && <p className="font12 text-danger">{errors.driverId.message}</p>}
                                </div>
                                <div className="col-md-6 col-sm-12 col-12">
                                    <label htmlFor="totalSeat" className="form-label font14">Seat Capacity*</label>
                                    <input id="totalSeat" type="number" className={`form-control font14 ${errors.totalSeat ? 'border-danger' : ''}`} placeholder="Enter Seat Capacity" {...register('totalSeat', { required: 'Seat Capacity is required *', min: { value: 10, message: 'Seat Capacity must be at least 10' } })} />
                                    {errors.totalSeat && <p className="font12 text-danger">{errors.totalSeat.message}</p>}
                                </div>
                                <div className="col-md-6 col-sm-12 col-12">
                                    <label htmlFor="routeId" className="form-label font14">Route*</label>
                                    <select id="routeId" className={`form-select font14 ${errors.routeId ? 'border-danger' : ''}`} {...register('routeId', { required: 'Route selection is required *' })}>
                                        <option value="">Select Route</option>
                                        {allRouteData.map((route) => (
                                            <option key={route.routeId} value={route.routeId}>{route.routeName}</option>
                                        ))}
                                    </select>
                                    {errors.routeId && <p className="font12 text-danger">{errors.routeId.message}</p>}
                                </div>
                                <div className="row p-5">
                                    <div className="col-md-6 col-sm-6 col-6 text-end">
                                        <button className="btn AddBtnn font16 text-white" type="submit">Add Vehicle</button>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-6 text-start">
                                        <button className="btn CancelBtnn font16" onClick={handleCancelBtn}>Cancel</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddVehicle
