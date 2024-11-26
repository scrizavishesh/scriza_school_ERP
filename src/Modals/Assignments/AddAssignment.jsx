import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getTeacherBySubjectApi, addSamplePaperApi, addNewAssignmentAPI } from '../../Utils/Apis';
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

const AddAssignment = ({ addedSuccess }) => {

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

    const AddAssignment = async (data) => {
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
            console.log(data?.file[0], 'fileeeeeeeeeeeee')

            var response = await addNewAssignmentAPI(formData);
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
                        <form className='p-3' onSubmit={handleSubmit(AddAssignment)}>
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
                                    <option value='Active'>Active</option>
                                    <option value='Draft'>Draft</option>
                                    <option value='Archives'>Archives</option>
                                </select>
                                {errors.status && <p className="font12 text-danger">{errors.status.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="file" className="form-label font14">Assignment Upload</label>
                                <input id="file" type="file" className={`form-control font14 ${errors.file ? 'border-danger' : ''}`} accept='.pdf, .docx, .png' {...register('file', { required: 'File is required *', validate: value => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; } })} />
                                {errors.file && <p className="font12 text-danger">{errors.file.message}</p>}
                            </div>
                            <p className='text-center p-3'>
                                <button className='btn updateCreateButtons text-white' type='submit'>Create</button>
                                <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default AddAssignment




























// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { addNewAssignmentAPI, addNewOfflineExamApi, getAllClassApi, getAllSubjectByClassApi, getExamCategoryDataApi, getRoomDataApi, getTeacherBySubjectApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';

// const Container = styled.div`
//     .form-select, .form-control::placeholder, .form-control{
//         color: var(--greyState);
//         box-shadow: none;
//         border-color: var(--greyState);
//     }

//     .table-striped>tbody>tr:nth-of-type(odd)>* {
//         --bs-table-bg-type: var(--tableGreyBackgroundColor);
//     }
    
//     .correvtSVG{
//         position: relative;
//         width: fit-content ;
//         margin-left: 43% !important;
//         margin-bottom: -16% !important;
//         background-color: #2BB673;
//         width: 73px;
//         height: 73px;
//         align-items: center;
//     }

//     .contbtn{
//         margin-left: 41% !important;
//         margin-top: -20% !important;
//     }

//     .greydiv{
//         background-color: #FBFBFB;
//     }

//     .scrollBarHide::-webkit-scrollbar {
//         display: none;
//     }


// `;

// const AddAssignment = () => {

//     const token = localStorage.getItem('token');
//     const [AddAssignment, setAddAssignment] = useState(true);

//     const [allClassData, setAllClassData] = useState([]);
//     const [allSectionData, setAllSectionData] = useState([]);
//     const [allSubjectData, setAllSubjectData] = useState([]);
//     const [allTeacherData, setAllTeacherData] = useState([]);

//     const [classId, setClassId] = useState('')
//     const [ClasssError, setClasssError] = useState('')

//     const [SectionId, setSectionId] = useState('')
//     const [SectionIdError, setSectionIdError] = useState('')

//     const [Subject, setSubject] = useState('')
//     const [SubjectError, setSubjectError] = useState('')

//     const [Teacher, setTeacher] = useState('')
//     const [TeacherError, setTeacherError] = useState('')

//     const [Statuus, setStatuus] = useState('')
//     const [StatuusError, setStatuusError] = useState('')

//     const [TotalMarks, setTotalMarks] = useState('')
//     const [TotalMarksError, setTotalMarksError] = useState('')

//     const [EndingDate, setEndingDate] = useState('')
//     const [EndingDateError, setEndingDateError] = useState('')

//     const [StartingDate, setStartingDate] = useState('')
//     const [StartingDateError, setStartingDateError] = useState('')

//     const [AssignmentUpload, setAssignmentUpload] = useState('')
//     const [AssignmentUploadError, setAssignmentUploadError] = useState('')

//     const [Title, setTitle] = useState('')
//     const [TitleError, setTitleError] = useState('')

//     const [refreshAdd, setRefreshAdd] = useState('')

//     useEffect(() => {
//         getAllClassData();
//     }, [token, refreshAdd])

//     useEffect(() => {
//         getAllTeacherData(Subject);
//     }, [Subject])

//     const PageRefreshOnAdd = () => {
//         setAddAssignment(!AddAssignment);
//         setRefreshAdd(!refreshAdd);
//     }

//     const getAllClassData = async () => {
//         try {
//             var response = await getAllClassApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllClassData(response?.data?.classes);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const getAllTeacherData = async (val) => {
//         try {
//             var response = await getTeacherBySubjectApi(classId, val);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllTeacherData(response?.data?.teacher);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (e) {
//             console.log(e)
//         }
//     }

//     const AddNewAssignment = async () => {
//         if (validateFields()) {
//             try {
//                 console.log(classId, 'classId')
//                 const formData = new FormData();
//                 formData.append('title', Title)
//                 formData.append('ClassId', classId)
//                 formData.append('sectionId', SectionId)
//                 formData.append('subjectId', Subject)
//                 formData.append('teacherId', Teacher)
//                 formData.append('totalMarks', TotalMarks)
//                 formData.append('status', Statuus)
//                 formData.append('startDate', StartingDate)
//                 formData.append('endDate', EndingDate)
//                 formData.append('file', AssignmentUpload)

//                 var response = await addNewAssignmentAPI(formData);
//                 if (response?.status === 200) {
//                     if (response?.data?.status === 'success') {
//                         toast.success(response?.data?.message)
//                         setAddAssignment(!AddAssignment);
//                     }
//                 }
//             }
//             catch (e) {
//                 console.log(e)
//             }
//         }
//     }

//     const textAlphaRegex = /^[A-Za-z0-9\s]+$/;

//     const validateTextFields = (value) => {
//         if (!value.trim()) {
//             return '*This Field is required';
//         } else if (!textAlphaRegex.test(value)) {
//             return 'Invalid characters in name !!';
//         }
//         return '';
//     };


//     const validateFields = () => {
//         let isValid = true;

//         if (!classId) {
//             setClasssError('* This Feild is required');
//             isValid = false;
//         } else {
//             setClasssError('');
//         }

//         if (!SectionId) {
//             setSectionIdError('* This Feild is required');
//             isValid = false;
//         } else {
//             setSectionIdError('');
//         }

//         if (!Subject) {
//             setSubjectError('* This Feild is required');
//             isValid = false;
//         } else {
//             setSubjectError('');
//         }

//         if (!Teacher) {
//             setTeacherError('* This Feild is required');
//             isValid = false;
//         } else {
//             setTeacherError('');
//         }

//         if (!StartingDate) {
//             setStartingDateError('* This Feild is required');
//             isValid = false;
//         } else {
//             setStartingDateError('');
//         }

//         if (!EndingDate) {
//             setEndingDateError('* This Feild is required');
//             isValid = false;
//         } else {
//             setEndingDateError('');
//         }

//         if (!TotalMarks) {
//             setTotalMarksError('* This Feild is required');
//             isValid = false;
//         } else {
//             setTotalMarksError('');
//         }

//         if (!AssignmentUpload) {
//             setAssignmentUploadError('* This Feild is required');
//             isValid = false;
//         } else {
//             setAssignmentUploadError('');
//         }

//         if (!Title) {
//             setTitleError('* This Feild is required');
//             isValid = false;
//         } else if (!textAlphaRegex.test(Title)) {
//             return 'Invalid characters in name !!';
//         } else {
//             setTitleError('');
//         }

//         return isValid;
//     }


//     const handleClassChange = (val) => {
//         const classNoVal = parseInt(val);
//         setClassId(classNoVal);
//         const selectedClass = allClassData.find(c => c.classId === classNoVal);

//         if (selectedClass) {
//             setAllSectionData(selectedClass.section || []);
//             setAllSubjectData(selectedClass.subjects || []);
//         } else {
//             setAllSectionData([]);
//             setAllSubjectData([]);
//         }
//     };


//     return (
//         <>
//             <Container>
//                 <div className="container-fluid ">
//                     <div className="row">
//                         {AddAssignment
//                             ?
//                             <>
//                                 <form className='p-3'>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Title</label>
//                                         <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TitleError ? 'border-1 border-danger' : ''}`} placeholder='Enter Title' value={Title} onChange={(e) => { setTitle(e.target.value), setTitleError(validateTextFields(e.target.value)) }} />
//                                         <span className='text-danger'>{TitleError}</span>
//                                     </div>


//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
//                                         <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={classId} onChange={(e) => handleClassChange(e.target.value)}>
//                                             <option>--- Choose ---</option>
//                                             {allClassData?.map((option) => (
//                                                 <option key={option.classId} value={option?.classId}>
//                                                     {option?.classNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{ClasssError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Section</label>
//                                         <select className={`form-select font14 ${SectionIdError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={SectionId} onChange={(e) => setSectionId(e.target.value)}>
//                                             <option>--- Choose ---</option>
//                                             {allSectionData?.map(option => (
//                                                 <option key={option.classSecId} value={option.classSecId}>
//                                                     {option.sectionName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SectionIdError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
//                                         <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e) => setSubject(e.target.value)}>
//                                             <option>--- Choose ---</option>
//                                             {allSubjectData?.map((option) => (
//                                                 <option key={option.subjectId} value={option.subjectId}>
//                                                     {option.subjectName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SubjectError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Teacher</label>
//                                         <select className={`form-select font14 ${TeacherError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Teacher} onChange={(e) => { setTeacher(e.target.value); setTeacherError(''); }}>
//                                             <option defaultValue value=''>--- Choose ---</option>
//                                             {allTeacherData.map(option => (
//                                                 <option key={option.staffId} value={option.staffId}>
//                                                     {option.staffName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{TeacherError}</span>
//                                     </div>

//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Total Marks</label>
//                                         <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TotalMarksError ? 'border-1 border-danger' : ''}`} placeholder='Enter Total Marks' onChange={(e) => { setTotalMarks(e.target.value), setTotalMarksError('') }} />
//                                         <span className='text-danger'>{TotalMarksError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Starting Date</label>
//                                         <input type="date" id="exampleInputEmail1" className={`form-control font14 ${StartingDateError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setStartingDate(e.target.value), setStartingDateError('') }} />
//                                         <span className='text-danger'>{StartingDateError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Ending Date</label>
//                                         <input type="date" id="exampleInputEmail1" className={`form-control font14 ${EndingDateError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setEndingDate(e.target.value), setEndingDateError('') }} />
//                                         <span className='text-danger'>{EndingDateError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputAdd1" className='form-label font14'>Status</label>
//                                         <select className={`form-select font14 ${StatuusError ? 'border-1 border-danger' : ''} `} aria-label="Default select example" onChange={(e) => setStatuus(e.target.value)}>
//                                             <option>--- Choose ---</option>
//                                             <option value='Active'>Active</option>
//                                             <option value='Draft'>Draft</option>
//                                             <option value='Archives'>Archives</option>
//                                         </select>
//                                         <span className='text-danger'>{StatuusError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Assignment Upload</label>
//                                         <input type="file" id="exampleInputEmail1" className={`form-control font14 ${AssignmentUploadError ? 'border-1 border-danger' : ''}`} onChange={(e) => { setAssignmentUpload(e.target.files[0]), setAssignmentUploadError('') }} />
//                                         <span className='text-danger'>{AssignmentUploadError}</span>
//                                     </div>
//                                     <p className='text-center p-3'>
//                                         <button className='btn updateCreateButtons text-white font14' type='button' onClick={AddNewAssignment}>Create</button>
//                                         <button className='btn cancelButtons ms-3 font14' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                     </p>
//                                 </form>
//                             </>
//                             :
//                             <>
//                                 <div>
//                                     <p className='modalLightBorder p-2 mb-0'>Student List</p>
//                                     <div className="mt-3  ">
//                                         <div className='correvtSVG p-3 pt-4 rounded-circle'><img src="./images/Correct.svg" alt="" /></div>
//                                         <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                             <p className='warningHeading'>Successful Updated</p>
//                                             <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                         </div>
//                                         <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnAdd}>Continue</button>
//                                     </div>
//                                 </div>
//                             </>
//                         }

//                     </div>
//                     <Toaster />
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default AddAssignment