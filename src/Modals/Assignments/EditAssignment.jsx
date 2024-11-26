import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getTeacherBySubjectApi, addSamplePaperApi, addNewAssignmentAPI, getAssignmentByIdDataApi, EditNewAssignmentAPI } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`

    .formimagetext{
        border-radius: 5px 0px 0px 5px;
    }
    
    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
    }

    .form-select.border-danger {
        border-color: #dc3545 !important;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
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

    .scrollBarHide::-webkit-scrollbar {
        display: none;
    }


`;

const EditAssignment = ({ EditItemId, editedSuccess }) => {

    const token = localStorage.getItem('token');
    const [AddSamplePaper, setAddSamplePaper] = useState(true);

    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allTeacherData, setAllTeacherData] = useState([]);

    const [fileVal, setFileVal] = useState('')

    // Chnage type of input State
    const [changeImageType, setChangeImageType] = useState(true)

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });

    const classIdVal = watch('ClassId')
    const sectionIdVal = watch('sectionId')
    const subjectIdVal = watch('subjectId')
    const teacherIdVal = watch('teacherId')

    useEffect(() => {
        getAllClassData();
        getAssignmentById()
    }, [token, EditItemId])

    useEffect(() => {
        handleClassChange(classIdVal);
    }, [classIdVal])

    useEffect(() => {
        getAllTeacherData(subjectIdVal);
    }, [subjectIdVal])

    const getAllClassData = async () => {
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllTeacherData = async (val) => {
        try {
            var response = await getTeacherBySubjectApi(classIdVal, val);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllTeacherData(response?.data?.teacher);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch {

        }
    }

    const handleClassChange = (value) => {
        // setLoaderState(true);
        setValue('ClassId', value);
        const selectedClass = allClassData.find(c => c.classId === value)

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
            // setLoaderState(false)
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
            // setLoaderState(false)
        }
    }

    const getAssignmentById = async () => {
        try {
            var response = await getAssignmentByIdDataApi(EditItemId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setValue('title', response?.data?.Assignment?.title);
                    setValue('ClassId', response?.data?.Assignment?.classId);
                    setValue('sectionId', response?.data?.Assignment?.sectionId);
                    setValue('subjectId', response?.data?.Assignment?.subjectId);
                    setValue('teacherId', response?.data?.Assignment?.teacherId);
                    setValue('totalMarks', response?.data?.Assignment?.totalMarks);
                    setValue('startDate', response?.data?.Assignment?.startDate);
                    setValue('endDate', response?.data?.Assignment?.endDate);
                    setValue('status', response?.data?.Assignment?.status);
                    setValue('file', response?.data?.Assignment?.assignmentPath);
                    setFileVal(response?.data?.Assignment?.assignmentPath);
                    // toast.success(response?.data?.message);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        }
        catch (e) {
            // console.log(e);
        }
    }

    const UpdateAssignment = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data?.title)
            formData.append('ClassId', data?.ClassId)
            formData.append('sectionId', data?.sectionId)
            formData.append('subjectId', data?.subjectId)
            formData.append('teacherId', data?.teacherId)
            formData.append('totalMarks', data?.totalMarks)
            formData.append('status', data?.status)
            formData.append('startDate', data?.startDate)
            formData.append('endDate', data?.endDate)
            formData.append('file', data?.file[0])

            var response = await EditNewAssignmentAPI(EditItemId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    setAddSamplePaper(!AddSamplePaper);
                    editedSuccess(true)
                }
            }
        }
        catch (error) {
            // console.log(error)
        }
    }

    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        <form className='p-3' onSubmit={handleSubmit(UpdateAssignment)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label font14">Title</label>
                                <input id="title" type="text" className={`form-control font14 ${errors.title ? 'border-danger' : ''}`} placeholder="Enter Title" {...register('title', { required: 'Title is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Title must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Title'; } return true; } })} />
                                {errors.title && <p className="font12 text-danger">{errors.title.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ClassId" className="form-label font14">Class</label>
                                <select id="ClassId" className={`form-select font14 ${errors.ClassId ? 'border-danger' : ''}`} value={classIdVal} {...register('ClassId', { required: 'Class selection is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
                                    <option value="">-- Select --</option>
                                    {allClassData?.map((option) => (
                                        <option key={option.classId} value={option?.classId}>
                                            {option?.classNo}
                                        </option>
                                    ))}
                                </select>
                                {errors.ClassId && <p className="font12 text-danger">{errors.ClassId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sectionId" className="form-label font14">Section</label>
                                <select id="sectionId" className={`form-select font14 ${errors.sectionId ? 'border-danger' : ''}`} value={sectionIdVal} {...register('sectionId', { required: 'Selection selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allSectionData?.map(option => (
                                        <option key={option.classSecId} value={option.classSecId}>
                                            {option.sectionName}
                                        </option>
                                    ))}
                                </select>
                                {errors.sectionId && <p className="font12 text-danger">{errors.sectionId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subjectId" className="form-label font14">Subject</label>
                                <select id="subjectId" className={`form-select font14 ${errors.subjectId ? 'border-danger' : ''}`} value={subjectIdVal} {...register('subjectId', { required: 'Subject selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allSubjectData?.map((option) => (
                                        <option key={option.subjectId} value={option.subjectId}>
                                            {option.subjectName}
                                        </option>
                                    ))}
                                </select>
                                {errors.subjectId && <p className="font12 text-danger">{errors.subjectId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="teacherId" className="form-label font14">Teacher</label>
                                <select id="teacherId" className={`form-select font14 ${errors.teacherId ? 'border-danger' : ''}`} value={teacherIdVal} {...register('teacherId', { required: 'Teacher selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allTeacherData.map(option => (
                                        <option key={option.staffId} value={option.staffId}>
                                            {option.staffName}
                                        </option>
                                    ))}
                                </select>
                                {errors.teacherId && <p className="font12 text-danger">{errors.teacherId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="totalMarks" className="form-label font14">Total Marks</label>
                                <input id="totalMarks" type="number" className={`form-control font14 ${errors.totalMarks ? 'border-danger' : ''}`} {...register('totalMarks', { required: 'Total Marks are required *', min: { value: 0, message: 'Marks cannot be negative' } })} />
                                {errors.totalMarks && <p className="font12 text-danger">{errors.totalMarks.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label font14">Starting Date</label>
                                <input id="startDate" type="date" className={`form-control font14 ${errors.startDate ? 'border-danger' : ''}`} {...register('startDate', { required: 'Starting Time is required *' })} />
                                {errors.startDate && <p className="font12 text-danger">{errors.startDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label font14">Ending Date</label>
                                <input id="endDate" type="date" className={`form-control font14 ${errors.endDate ? 'border-danger' : ''}`} {...register('endDate', { required: 'Ending Time is required *' })} />
                                {errors.endDate && <p className="font12 text-danger">{errors.endDate.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="status" className='form-label font14'>Status</label>
                                <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    <option value='ACTIVE'>Active</option>
                                    <option value='DRAFT'>Draft</option>
                                    <option value='ARCHIVES'>Archives</option>
                                </select>
                                {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="file" className="form-label font14">Assignment Upload</label>
                                <input id="file" type="file" className={`form-control font14 ${errors.file ? 'border-danger' : ''}`} accept='.jpg, .jpeg, .png' {...register('file', { required: 'File is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label font14">Assignment Upload</label>
                                <div className="d-flex bg-white">
                                    {fileVal !== null && changeImageType ?
                                        <input id="file" type="text" className='form-control formimagetext font14' value={fileVal.split('/').pop()} disabled />
                                        :
                                        <input id="file" type="file" className={`form-control formimagetext font14 ${errors.file ? 'border-danger' : ''}`} accept='.pdf, .docs' {...register('file', { required: 'Admin Image is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                    }
                                    <div className='formcontrolButtonborder p-1 ps-3 pe-3 text-center'>
                                        <span className="text-white font14 align-self-center" onClick={() => setChangeImageType(!changeImageType)}>
                                            {fileVal !== null && changeImageType ? 'Edit' : 'View'}
                                        </span>
                                    </div>
                                </div>
                                {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                            </div>
                            <p className='text-center p-3'>
                                <button className='btn updateCreateButtons text-white' type='submit'>Update</button>
                                <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EditAssignment
