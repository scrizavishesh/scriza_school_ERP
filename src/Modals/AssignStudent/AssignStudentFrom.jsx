import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getVehicleDataApi, getAllDropPointByVehicleApi, assignStudentApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
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

    .contbtn{
        margin-left: 41% !important;
        margin-top: -20% !important;
    }

    .greydiv{
        background-color: #FBFBFB;
    }

`;

const AssignStudentForm = ({ setAssignStudent, ReloadData }) => {

    const navigate = useNavigate('');
    const token = localStorage.getItem('token');
    // Data States
    const [VehicleData, setVehicleData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allStudentData, setAllStudentData] = useState([]);
    const [allDropData, setAllDropData] = useState([]);

    const { register, handleSubmit, formState: { errors }, setValue, watch, trigger } = useForm({
        mode: 'onChange'
    });
    
    const vehicleNo = watch("vehicleNo");

    useEffect(() => {
        getAllVehicleData();
        getAllClassData();
    }, [token])

    useEffect(() => {
        getAllDropPointData();
    }, [vehicleNo])

    const getAllVehicleData = async () => {
        try {
            var response = await getVehicleDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setVehicleData(response?.data?.vehicles);
                    // toast.success(response.data.message);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllClassData = async () => {
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                    // toast.success(response.data.message);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllDropPointData = async () => {
        try {
            var response = await getAllDropPointByVehicleApi(vehicleNo);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllDropData(response?.data?.drops);
                    // toast.success(response.data.msg);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }


    const AssignStudentData = async (data) => {
        try {
            const formData = new FormData();
            formData.append("vehicleNo", data?.vehicleNo);
            formData.append("classNo", data?.classNo);
            formData.append("sec", data?.sec);
            formData.append("studentId", data?.studentId);
            formData.append("dropId", data?.dropId);
            var response = await assignStudentApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    setAssignStudent(false)
                }
                else{
                    toast.error(response?.data?.message)
                }
            }
            else {
                toast.error(response?.data?.message)
            }
        }
        catch (error) {
            console.log('errrorrrrr')
        }
    }

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setValue('classNo',classNoVal, { shouldValidate: true });
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);
        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
        trigger('classNo');
    };

    const handleSectionChange = (val) => {
        const sectionNameVal = val;
        setValue('sec',sectionNameVal, { shouldValidate: true });
        const selectedSection = allSectionData.find(c => c.sectionName === sectionNameVal);
        if (selectedSection) {
            setAllStudentData(selectedSection.studentDTO || []);
        } else {
            setAllStudentData([]);
        }
        trigger('sec');
    };


    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row">
                        <form className='p-3' onSubmit={handleSubmit(AssignStudentData)}>
                            <div className="mb-3">
                                <label htmlFor="vehicleNo" className="form-label font14">Vehicle</label>
                                <select id="vehicleNo" className={`form-select font14 ${errors.vehicleNo ? 'border-danger' : ''}`} {...register('vehicleNo', { required: 'Vehicle selection is required *' })}>
                                    <option value=''>--- Select ---</option>
                                    {VehicleData?.map(option => (
                                        <option key={option.vehicleId} value={option.vehicleNumber}>
                                            {option.vehicleModel}
                                        </option>
                                    ))}
                                </select>
                                {errors.vehicleNo && <p className="font12 text-danger">{errors.vehicleNo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classNo" className="form-label font14">Class</label>
                                <select id="classNo" className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`} {...register('classNo', { required: 'Class selection is required *' })} onChange={(e)=> handleClassChange(e.target.value)}>
                                    <option value=''>--- Select ---</option>
                                    {allClassData?.map(option => (
                                        <option key={option.classId} value={option?.classNo}>
                                            {option.classNo}
                                        </option>
                                    ))}
                                </select>
                                {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sec" className="form-label font14">Section</label>
                                <select id="sec" className={`form-select font14 ${errors.sec ? 'border-danger' : ''}`} {...register('sec', { required: 'Section selection is required *' })} onChange={(e)=> handleSectionChange(e.target.value)}>
                                    <option value=''>--- Select ---</option>
                                    {allSectionData?.map(option => (
                                        <option key={option.classSecId} value={option?.sectionName}>
                                            {option.sectionName}
                                        </option>
                                    ))}
                                </select>
                                {errors.sec && <p className="font12 text-danger">{errors.sec.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="studentId" className="form-label font14">Student</label>
                                <select id="studentId" className={`form-select font14 ${errors.studentId ? 'border-danger' : ''}`} {...register('studentId', { required: 'Student selection is required *' })}>
                                    <option value=''>--- Select ---</option>
                                    {allStudentData?.map(option => (
                                        <option key={option.studentId} value={option.studentId}>
                                            {option.studentName}
                                        </option>
                                    ))}
                                </select>
                                {errors.studentId && <p className="font12 text-danger">{errors.studentId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="dropId" className="form-label font14">Drop Point</label>
                                <select id="dropId" className={`form-select font14 ${errors.dropId ? 'border-danger' : ''}`} {...register('dropId', { required: 'Drop selection is required *' })}>
                                    <option value=''>--- Select ---</option>
                                    {allDropData?.map(option => (
                                        <option key={option.dropId} value={option.dropId}>
                                            {option.stopName}
                                        </option>
                                    ))}
                                </select>
                                {errors.dropId && <p className="font12 text-danger">{errors.dropId.message}</p>}
                            </div>
                            <p className='text-center p-3'>
                                <button className='btn updateButtons text-white' type='submit'>Assign</button>
                                <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </form>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default AssignStudentForm