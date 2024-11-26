import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getTeacherBySubjectApi, addSamplePaperApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`

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

const AddSamplePaper = ({ addedSuccess }) => {

    const token = localStorage.getItem('token');
    const [AddSamplePaper, setAddSamplePaper] = useState(true);

    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [allTeacherData, setAllTeacherData] = useState([]);

    const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
        mode: 'onChange'
    });

    const classIdVal = watch('classId')
    const subjectIdVal = watch('subjectId')

    useEffect(() => {
        getAllClassData();
    }, [token])

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
                console.log(response?.data?.message);
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
                    // console.log(response?.data?.teacher, 'teacher');
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const handleClassChange = (value) => {
        const classIdVal = parseInt(value);
        setValue('classId', classIdVal);
        const selectedClass = allClassData.find(c => c.classId === classIdVal);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSectionData([]);
            setAllSubjectData([]);
        }
    }

    const AddNewSamplePaper = async (data) => {
        try {
            const formData = new FormData();
            formData.append('title', data?.title)
            formData.append('ClassId', data?.ClassId)
            formData.append('sectionId', data?.sectionId)
            formData.append('subjectId', data?.subjectId)
            formData.append('teacherId', data?.teacherId)
            formData.append('status', data?.status)
            formData.append('file', data?.file[0])

            var response = await addSamplePaperApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    setAddSamplePaper(!AddSamplePaper);
                    addedSuccess(true)
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        <form className='p-3' onSubmit={handleSubmit(AddNewSamplePaper)}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label font14">Title</label>
                                <input id="title" type="text" className={`form-control font14 ${errors.title ? 'border-danger' : ''}`} placeholder="Enter Title" {...register('title', { required: 'Title is required *', validate: value => { if (!/^[A-Z]/.test(value)) { return 'Title must start with an uppercase letter'; } if (value.length < 2) { return 'Minimum Length is 2'; } if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) { return 'Invalid Characters in Title'; } return true; } })} />
                                {errors.title && <p className="font12 text-danger">{errors.title.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ClassId" className="form-label font14">Class</label>
                                <select id="ClassId" className={`form-select font14 ${errors.ClassId ? 'border-danger' : ''}`} {...register('ClassId', { required: 'Class selection is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
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
                                <select id="sectionId" className={`form-select font14 ${errors.sectionId ? 'border-danger' : ''}`} {...register('sectionId', { required: 'Selection selection is required *' })}>
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
                                <select id="subjectId" className={`form-select font14 ${errors.subjectId ? 'border-danger' : ''}`} {...register('subjectId', { required: 'Subject selection is required *' })}>
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
                                <select id="teacherId" className={`form-select font14 ${errors.teacherId ? 'border-danger' : ''}`} {...register('teacherId', { required: 'Teacher selection is required *' })}>
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
                                <label htmlFor="status" className='form-label font14'>Status</label>
                                <select id="status" className={`form-select font14 ${errors.status ? 'border-danger' : ''}`} {...register('status', { required: 'Status selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    <option value='Active'>Active</option>
                                    <option value='Draft'>Draft</option>
                                    <option value='Archives'>Archives</option>
                                </select>
                                {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label font14">SamplePaper Upload</label>
                                <input id="file" type="file" className={`form-control font14 ${errors.file ? 'border-danger' : ''}`} placeholder="Enter Drop Point Name" accept='.pdf, .docx' {...register('file', { required: 'File is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                            </div>
                            <p className='text-center p-3'>
                                <button className='btn updateCreateButtons text-white' type='submit'>Create</button>
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

export default AddSamplePaper