import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { addNewOfflineExamApi, getAllClassApi, getExamCategoryDataApi, getOfflineExamDataByIdApi, getRoomDataApi, updateOfflineExamApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';

const Container = styled.div`
    .form-select, .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyState);
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

const EditExam = ({ EditId, offlineUpdateState }) => {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        mode: 'onChange'
    });

    const token = localStorage.getItem('token');
    const [allRoomData, setAllRoomData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSubjectData, setAllSubjectData] = useState([]);
    const [ExamCategoryData, setExamCategoryData] = useState([]);
    
    const classsId = watch('classId');

    useEffect(() => {
        if(EditId){
            getOfflineExamDataById(EditId)
        }
        getAllRoomData();
        getAllClassData();
        getAllExamCategoryData();

        if(classsId){
            handleClassChange(classsId);
        }
    }, [token, EditId, classsId])


    const getOfflineExamDataById = async (EditId) => {
        try {
            var response = await getOfflineExamDataByIdApi(EditId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setValue('categoryId', response?.data?.examDetails?.examCategoryId);
                    setValue('classId', response?.data?.examDetails?.classId);
                    setValue('subjectId', response?.data?.examDetails?.subjectId);
                    setValue('roomId', response?.data?.examDetails?.roomNumber);
                    setValue('date', response?.data?.examDetails?.date);
                    setValue('startingTime', response?.data?.examDetails?.startingTime);
                    setValue('endingTime', response?.data?.examDetails?.endingTime);
                    setValue('totalMarks', response?.data?.examDetails?.totalMarks);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {

        }
    }

    const getAllExamCategoryData = async () => {
        try {
            var response = await getExamCategoryDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setExamCategoryData(response?.data?.categories);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch(error) {
            console.log('Error while fetching exam category data: ', error);
        }
    }

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
        catch(error) {
            console.log('Error while fetching class data: ', error);
        }
    }

    const getAllRoomData = async () => {
        try {
            var response = await getRoomDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllRoomData(response?.data?.rooms);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch(error) {
            console.log('Error while fetching room data: ', error);
        }
    }

    const AddNewOfflineExam = async (data) => {
        try {
            const formData = new FormData();
            formData.append('categoryId', data?.categoryId)
            formData.append('classId', data?.classId)
            formData.append('subjectId', data?.subjectId)
            formData.append('roomId', data?.roomId)
            formData.append('date', data?.date)
            formData.append('startingTime', data?.startingTime)
            formData.append('endingTime', data?.endingTime)
            formData.append('totalMarks', data?.totalMarks)

            var response = await updateOfflineExamApi(EditId, formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    offlineUpdateState(true);
                }
                else {
                    toast.error(response?.data?.message)
                }
            }
            else {
                toast.error(response?.data?.message)
            }
        }
        catch(error) {
            console.log('Error while adding new data: ', error);
        }
    }

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setValue('classId',classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);

        if (selectedClass) {
            setAllSubjectData(selectedClass.subjects || []);
        } else {
            setAllSubjectData([]);
        }
    };
    
    const validateDate = (value) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        return selectedDate >= today || 'Date cannot be in the past';
    };

    return (
        <>
            <Container>
                <div className="container-fluid ">
                    <div className="row">
                        <form className='p-3' onSubmit={handleSubmit(AddNewOfflineExam)}>
                            <div className="mb-3">
                                <label htmlFor="categoryId" className="form-label font14">Exam Name</label>
                                <select id="categoryId" className={`form-select font14 ${errors.categoryId ? 'border-danger' : ''}`} {...register('categoryId', { required: 'Exam Category selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {ExamCategoryData.map((examCategory) => (
                                        <option key={examCategory.categoryId} value={examCategory.categoryId}>{examCategory.examCategoryName}</option>
                                    ))}
                                </select>
                                {errors.categoryId && <p className="font12 text-danger">{errors.categoryId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="classId" className="form-label font14">Class</label>
                                <select id="classId" className={`form-select font14 ${errors.classId ? 'border-danger' : ''}`} {...register('classId', { required: 'Class selection is required *' })} onChange={(e)=> handleClassChange(e.target.value)}>
                                    <option value="">-- Select --</option>
                                    {allClassData.map((clas) => (
                                        <option key={clas.classId} value={clas.classId}>{clas.classNo}</option>
                                    ))}
                                </select>
                                {errors.classId && <p className="font12 text-danger">{errors.classId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subjectId" className="form-label font14">Subject</label>
                                <select id="subjectId" className={`form-select font14 ${errors.subjectId ? 'border-danger' : ''}`} {...register('subjectId', { required: 'Subject selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allSubjectData.map((subject) => (
                                        <option key={subject.subjectId} value={subject.subjectId}>{subject.subjectName}</option>
                                    ))}
                                </select>
                                {errors.subjectId && <p className="font12 text-danger">{errors.subjectId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="roomId" className="form-label font14">Class Room</label>
                                <select id="roomId" className={`form-select font14 ${errors.roomId ? 'border-danger' : ''}`} {...register('roomId', { required: 'Room selection is required *' })}>
                                    <option value="">-- Select --</option>
                                    {allRoomData.map((room) => (
                                        <option key={room.roomId} value={room.roomId}>{room.roomNo}</option>
                                    ))}
                                </select>
                                {errors.roomId && <p className="font12 text-danger">{errors.roomId.message}</p>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date" className="form-label font14">Date</label>
                                <input id="date" type="date" className={`form-control font14 ${errors.date ? 'border-danger' : ''}`} {...register('date', { required: 'Date is required *', validate: validateDate })} />
                                {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="startingTime" className="form-label font14">Starting Time</label>
                                <input id="startingTime" type="time" className={`form-control font14 ${errors.startingTime ? 'border-danger' : ''}`} {...register('startingTime', { required: 'Starting Time is required *' })} />
                                {errors.startingTime && <p className="font12 text-danger">{errors.startingTime.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="endingTime" className="form-label font14">Ending Time</label>
                                <input id="endingTime" type="time" className={`form-control font14 ${errors.endingTime ? 'border-danger' : ''}`} {...register('endingTime', { required: 'Ending Time is required *' })} />
                                {errors.endingTime && <p className="font12 text-danger">{errors.endingTime.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="totalMarks" className="form-label font14">Total Marks</label>
                                <input id="totalMarks" type="number" className={`form-control font14 ${errors.totalMarks ? 'border-danger' : ''}`} {...register('totalMarks', { required: 'Total Marks are required *', min: { value: 0, message: 'Marks cannot be negative' } })} />
                                {errors.totalMarks && <p className="font12 text-danger">{errors.totalMarks.message}</p>}
                            </div>
                            <p className='text-center p-3'>
                                <button className='btn addButtons text-white' type='submit'>Update Exam</button>
                                <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                            </p>
                        </form>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default EditExam











































// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { getAllClassApi, getExamCategoryDataApi, getOfflineExamDataByIdApi, getRoomDataApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../../Layouts/Loader';

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

// const EditExam = ({ EditId, offlineExamState }) => {

//     const today = new Date().toISOString().split("T")[0];

//     const token = localStorage.getItem('token');
//     const [EditExam, setEditExam] = useState(true);

//     // Loader State
//     const [loaderState, setloaderState] = useState(false);
//     const [allRoomData, setAllRoomData] = useState([]);
//     const [allClassData, setAllClassData] = useState([]);
//     const [allSubjectData, setAllSubjectData] = useState([]);
//     const [ExamCategoryData, setExamCategoryData] = useState([]);
//     const [Categories, setCategories] = useState('')
//     const [CategoriesError, setCategoriesError] = useState('')

//     const [ClassId, setClassId] = useState('');
//     const [ClasssError, setClasssError] = useState('')

//     const [Subject, setSubject] = useState('')
//     const [SubjectError, setSubjectError] = useState('')

//     const [RoomNo, setRoomNo] = useState('')
//     const [RoomNoError, setRoomNoError] = useState('')

//     const [Daate, setDaate] = useState('')
//     const [DaateError, setDaateError] = useState('')

//     const [StartingTime, setStartingTime] = useState('')
//     const [StartingTimeError, setStartingTimeError] = useState('')

//     const [EndingTime, setEndingTime] = useState('')
//     const [EndingTimeError, setEndingTimeError] = useState('')

//     const [TotalMarks, setTotalMarks] = useState('')
//     const [TotalMarksError, setTotalMarksError] = useState('')

//     const searchVal = '';
//     const pageNoVal = '';
//     const sizeVal = '';

//     const handleDataStateChange = () => {
//         offlineExamState(true);
//         setEditExam(!EditExam);

//     };

//     useEffect(() => {
//         getAllRoomData();
//         getAllClassData();
//         getAllExamCategoryData();
//         getOfflineExamDataById();
//     }, [token, EditId])

//     useEffect(() => {
//         handleClassChange(ClassId);
//     }, [ClassId])


//     const getOfflineExamDataById = async () => {
//         try {
//             var response = await getOfflineExamDataByIdApi(EditId);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setCategories(response?.data?.examDetails?.examCategoryId);
//                     setClassId(response?.data?.examDetails?.classId);
//                     setSubject(response?.data?.examDetails?.subjectId);
//                     setRoomNo(response?.data?.examDetails?.roomNumber);
//                     setDaate(response?.data?.examDetails?.date);
//                     setStartingTime(response?.data?.examDetails?.startingTime);
//                     setEndingTime(response?.data?.examDetails?.endingTime);
//                     setTotalMarks(response?.data?.examDetails?.totalMarks);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const getAllExamCategoryData = async () => {
//         try {
//             var response = await getExamCategoryDataApi(searchVal, pageNoVal, sizeVal);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setExamCategoryData(response?.data?.categories);
//                     setloaderState(false)
//                 }
//                 else{
//                     toast.error(response?.data?.message);
//                     setloaderState(false)
//                 }
//             }
//             else{
//                 toast.error(response?.data?.message);
//                 setloaderState(false)
//             }
//         }
//         catch(error) {
//             console.log(error, 'catch error')
//             setloaderState(false)
//         }
//     }

//     const getAllClassData = async () => {
//         try {
//             var response = await getAllClassApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllClassData(response?.data?.classes);
//                     setloaderState(false)
//                 }
//                 else{
//                     toast.error(response?.data?.message, 'else 1');
//                     setloaderState(false)
//                 }
//             }
//             else{
//                 toast.error(response?.data?.message, 'else 2');
//                 setloaderState(false)
//             }
//         }
//         catch(error) { 
//             toast.error(error);
//             console.log(error, 'catch error')
//             setloaderState(false)
//         }
//     }

//     const getAllRoomData = async () => {
//         try {
//             setloaderState(true);
//             var response = await getRoomDataApi(searchVal, pageNoVal, sizeVal);
//             // console.log('4e5r6t7yuijokliyutyrtedfghj')
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllRoomData(response?.data?.rooms);
//                     setloaderState(false)
//                 }
//                 else{
//                     toast.error(response?.data?.message, 'else 1');
//                     setloaderState(false)
//                 }
//             }
//             else{
//                 toast.error(response?.data?.message, 'else 2');
//                 setloaderState(false)
//             }
//         }
//         catch(error) { 
//             toast.error(error);
//             console.log(error, 'catch error')
//             setloaderState(false)
//         }
//     }

//     const handleTotalMarksChange = (value) => {
//         setTotalMarks(value);
//         setTotalMarksError(validateMark(value))
//     }

//     const validateMark = (value) => {
//         const markRegex = /^(0[1-9]|[1-9][0-9]|[1-4][0-9]{2}|500)$/;
//         if (!value.trim()) {
//             return '*Total Marks is required';
//         } else if (!markRegex.test(value)) {
//             return 'Invalid characters in name !!';
//         }
//         return '';
//     };

//     const handleCategoriesChange = (value) => { 
//         setCategories(value);
//         setCategoriesError(validateCategories(value))
//     }

//     const validateCategories = (value) => {
//         if (!value || value == '') {
//             return '* Exam Category is required';
//         }
//         return '';
//     };

//     const handleClassChange = (value) => {
//         setloaderState(true)
//         const classIdVal = value;
//         setClassId(classIdVal);
//         const selectedClass = allClassData.find(c => c.classId === classIdVal);
//         if (selectedClass) {
//             setAllSubjectData(selectedClass.subjects || []);
//         } else {
//             setAllSubjectData([]);
//         }
//         setClasssError(validateClass(value))
//         setloaderState(false)
//     }

//     const validateClass = (value) => {
//         if (!value || value == '') {
//             return '* Class is required';
//         }
//         return '';
//     };

//     const handleSubjectChange = (value) => { 
//         setSubject(value);
//         setSubjectError(validateSubject(value))
//     }

//     const validateSubject = (value) => {
//         if (!value || value == '') {
//             return '* Subject is required';
//         }
//         return '';
//     };

//     const handleClassRoomChange = (value) => { 
//         setRoomNo(value);
//         setRoomNoError(validateClassRoom(value))
//     }

//     const validateClassRoom = (value) => {
//         if (!value || value == '') {
//             return '* Class Room is required';
//         }
//         return '';
//     };

//     const handleDateeChange = (value) => { 
//         console.log(value)
//         setDaate(value);
//         setDaateError(validateDate(value))
//     }

//     const validateDate = (value) => {
//         if (!value || value == '') {
//             return '* Date is required';
//         }
//         return '';
//     };

//     const handleStartTimeChange = (value) => { 
//         setStartingTime(value);
//         setStartingTimeError(validateStartTime(value))
//     }

//     const validateStartTime = (value) => {
//         if (!value || value == '') {
//             return '* Start Time is required';
//         }
//         return '';
//     };

//     const handleEndTimeChange = (value) => { 
//         setEndingTime(value);
//         setEndingTimeError(validateEndTime(value))
//     }

//     const validateEndTime = (value) => {
//         if (!value || value == '') {
//             return '* End Time is required';
//         }
//         return '';
//     };

//     const validateFields = () => {
//         let isValid = true;

//         const getByIdCategoriesErrorNew = validateCategories(Categories)
//         if (getByIdCategoriesErrorNew) {
//             setCategoriesError(getByIdCategoriesErrorNew);
//             isValid = false;
//         } else {
//             setCategoriesError('');
//         }

//         const getByIdClassIdErrorNew = validateClass(ClassId)
//         if (getByIdClassIdErrorNew) {
//             setClasssError(getByIdClassIdErrorNew);
//             isValid = false;
//         } else {
//             setClasssError('');
//         }

//         const getByIdSubjectErrorNew = validateSubject(Subject)
//         if (getByIdSubjectErrorNew) {
//             setSubjectError(getByIdSubjectErrorNew);
//             isValid = false;
//         } else {
//             setSubjectError('');
//         }

//         const getByIdRoomNoErrorNew = validateClassRoom(RoomNo)
//         if (getByIdRoomNoErrorNew) {
//             setRoomNoError(getByIdRoomNoErrorNew);
//             isValid = false;
//         } else {
//             setRoomNoError('');
//         }

//         const getByIdDaateErrorNew = validateDate(Daate)
//         if (getByIdDaateErrorNew) {
//             setDaateError(getByIdDaateErrorNew);
//             isValid = false;
//         } else {
//             setDaateError('');
//         }

//         const getByIdStartingTimeErrorNew = validateStartTime(StartingTime)
//         if (getByIdStartingTimeErrorNew) {
//             setStartingTimeError(getByIdStartingTimeErrorNew);
//             isValid = false;
//         } else {
//             setStartingTimeError('');
//         }

//         const getByIdEndingTimeErrorNew = validateEndTime(EndingTime)
//         if (getByIdEndingTimeErrorNew) {
//             setEndingTimeError(getByIdEndingTimeErrorNew);
//             isValid = false;
//         } else {
//             setEndingTimeError('');
//         }

//         const getByIdTotalMarksErrorNew = validateMark(TotalMarks)
//         if (getByIdTotalMarksErrorNew) {
//             setTotalMarksError(getByIdTotalMarksErrorNew);
//             isValid = false;
//         } else {
//             setTotalMarksError('');
//         }

//         return isValid;
//     }

//     const UpdateOfflineExam = async () => {
//         if (validateFields()) {
//             try {
//                 const formData = new FormData();
//                 formData.append('categoryId', Categories)
//                 formData.append('classId', Classs)
//                 formData.append('subjectId', Subject)
//                 formData.append('roomId', RoomNo)
//                 formData.append('date', Daate)
//                 formData.append('startingTime', StartingTime)
//                 formData.append('endingTime', EndingTime)
//                 formData.append('totalMarks', TotalMarks)

//                 var response = await updateOfflineExamApi(EditId, formData);
//                 console.log(response, 'offline exam')
//                 if (response?.status === 200) {
//                     if (response?.data?.status === 'success') {
//                         toast.success(response?.data?.message)
//                         console.log(response, 'res after success');
//                         setEditExam(!EditExam)
//                     }
//                 }
//             }
//             catch {

//             }
//         }
//     }


//     return (
//         <>
//             <Container>
//                 {
//                     loaderState && (
//                         <DataLoader />
//                     )
//                 }
//                 <div className="container-fluid ">
//                     <div className="row">
//                         {EditExam
//                             ?
//                             <>
//                                 <form className='p-3'>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Exam Name</label>
//                                         <select className={`form-select font14 ${CategoriesError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Categories} onChange={(e) => handleCategoriesChange(e.target.value)}>
//                                             <option value=''>--- Choose ---</option>
//                                             {ExamCategoryData?.map(option => (
//                                                 <option key={option.categoryId} value={option?.categoryId}>
//                                                     {option.examCategoryName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{CategoriesError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
//                                         <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={ClassId} onChange={(e)=> handleClassChange(e.target.value)}>
//                                             <option value=''>--- Choose ---</option>
//                                             {allClassData?.map((option, index) => (
//                                                 <option key={option.classId} value={option.classId}>
//                                                     {option.classNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{ClasssError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
//                                         <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e) => handleSubjectChange(e.target.value)}>
//                                             <option value=''>--- Choose ---</option>
//                                             {allSubjectData?.map(option => (
//                                                 <option key={option.subjectId} value={option.subjectId} >
//                                                     {option.subjectName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SubjectError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class Room</label>
//                                         <select className={`form-select font14 ${RoomNoError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={RoomNo} onChange={(e) => handleClassRoomChange(e.target.value)}>
//                                             <option value=''>--- Choose ---</option>
//                                             {allRoomData?.map(option => (
//                                                 <option key={option.roomId} value={option?.roomId}>
//                                                     {option.roomNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{RoomNoError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Date</label>
//                                         <input type="date" id="exampleInputEmail1" className={`form-control font14 ${DaateError ? 'border-1 border-danger' : ''}`} min={today} value={Daate} onChange={(e) => handleDateeChange(e.target.value)} />
//                                         <span className='text-danger'>{DaateError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Starting Time</label>
//                                         <input type="time" id="exampleInputEmail1" className={`form-control font14 ${StartingTimeError ? 'border-1 border-danger' : ''}`} value={StartingTime} onChange={(e) => handleStartTimeChange(e.target.value)} />
//                                         <span className='text-danger'>{StartingTimeError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Ending Time</label>
//                                         <input type="time" id="exampleInputEmail1" className={`form-control font14 ${EndingTimeError ? 'border-1 border-danger' : ''}`} value={EndingTime} onChange={(e) => handleEndTimeChange(e.target.value)} />
//                                         <span className='text-danger'>{EndingTimeError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Total Marks</label>
//                                         <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TotalMarksError ? 'border-1 border-danger' : ''}`} value={TotalMarks} placeholder='Enter Total Marks' onChange={(e) =>  handleTotalMarksChange(e.target.value)} />
//                                         <span className='text-danger'>{TotalMarksError}</span>
//                                     </div>
//                                     <p className='text-center p-3'>
//                                         <button className='btn addButtons text-white' type='button' onClick={UpdateOfflineExam}>Create Exam</button>
//                                         <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                     </p>
//                                 </form>
//                             </>
//                             :
//                             <>
//                                 <div className="mt-3">
//                                     <div className='correvtSVG p-3 pt-4 rounded-circle'>
//                                         <img src="./images/Correct.svg" alt="" />
//                                     </div>
//                                     <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                         <p className='warningHeading'>Successful Updated</p>
//                                         <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                     </div>
//                                     <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={handleDataStateChange}>Continue</button>
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

// export default EditExam
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { getAllClassApi, getExamCategoryDataApi, getOfflineExamDataByIdApi, getRoomDataApi, updateOfflineExamApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../../Layouts/Loader';

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

// const EditExam = ({ EditId }) => {

//     const token = localStorage.getItem('token');
//     //loader State
//     const [loaderState, setloaderState] = useState(false);
//     const [EditExam, setEditExam] = useState(true);

//     const [allRoomData, setAllRoomData] = useState([]);
//     const [allClassData, setAllClassData] = useState([]);
//     const [allSubjectData, setAllSubjectData] = useState([]);
//     const [ExamCategoryData, setExamCategoryData] = useState([]);

//     const [Categories, setCategories] = useState('')
//     const [CategoriesError, setCategoriesError] = useState('')

//     const [Classs, setClasss] = useState('')
//     const [ClasssError, setClasssError] = useState('')

//     const [Subject, setSubject] = useState('')
//     const [SubjectError, setSubjectError] = useState('')

//     const [RoomNo, setRoomNo] = useState('')
//     const [RoomNoError, setRoomNoError] = useState('')

//     const [Daate, setDaate] = useState('')
//     const [DaateError, setDaateError] = useState('')

//     const [StartingTime, setStartingTime] = useState('')
//     const [StartingTimeError, setStartingTimeError] = useState('')

//     const [EndingTime, setEndingTime] = useState('')
//     const [EndingTimeError, setEndingTimeError] = useState('')

//     const [TotalMarks, setTotalMarks] = useState('')
//     const [TotalMarksError, setTotalMarksError] = useState('')

//     const [refreshEdit, setRefreshEdit] = useState('')


//     useEffect(() => {
//         getAllRoomData();
//         getAllClassData();
//         getAllExamCategoryData();
//         getOfflineExamDataById();({ EditId })
//     }, [token, EditId, refreshEdit])

//     useEffect(() => {
//         handleClassChange(Classs);
//     }, [Classs]);

//     const getAllExamCategoryData = async () => {
//         try {
//             const searchKey = '';
//             var response = await getExamCategoryDataApi(searchKey);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setExamCategoryData(response?.data?.categories);
//                     toast.success(response.data.message);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch { }
//     }

//     const getAllClassData = async () => {
//         setloaderState(true);
//         try {
//             var response = await getAllClassApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllClassData(response?.data?.classes);
//                     setloaderState(false);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const getAllRoomData = async () => {
//         try {
//             const searchKey = '';
//             const page = '';
//             const size = '';
//             var response = await getRoomDataApi(searchKey, page,size);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllRoomData(response?.data?.rooms);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }


//     const UpdateOfflineExam = async () => {
//         if (validateFields()) {
//             try {
//                 const formData = new FormData();
//                 formData.append('categoryId', Categories)
//                 formData.append('classId', Classs)
//                 formData.append('subjectId', Subject)
//                 console.log('subjectId', Subject)
//                 formData.append('roomId', RoomNo)
//                 formData.append('date', Daate)
//                 formData.append('startingTime', StartingTime)
//                 formData.append('endingTime', EndingTime)
//                 formData.append('totalMarks', TotalMarks)

//                 var response = await updateOfflineExamApi(EditId, formData);
//                 console.log(response, 'offline exam')
//                 if (response?.status === 200) {
//                     if (response?.data?.status === 'success') {
//                         toast.success(response?.data?.message)
//                         console.log(response, 'res after success');
//                         setEditExam(!EditExam)
//                     }
//                 }
//             }
//             catch {

//             }
//         }
//     }

//     const markRegex = /^(10|[1-9][0-9]|[1-4][0-9]{2}|500)$/;

//     const validateMark = (value) => {
//         if (!value.trim()) {
//             return '*This Field is required';
//         } else if (!markRegex.test(value)) {
//             return 'Invalid characters in name !!';
//         }
//         return '';
//     };


//     const validateFields = () => {
//         let isValid = true;

//         if (!Categories) {
//             setCategoriesError('* This Feild is required');
//             isValid = false;
//         } else {
//             setCategoriesError('');
//         }

//         if (!Classs) {
//             setClasssError('* This Feild is required');
//             isValid = false;
//         } else {
//             setClasssError('');
//         }

//         if (!Subject) {
//             setSubjectError('* This Feild is required');
//             isValid = false;
//         } else {
//             setSubjectError('');
//         }

//         if (!RoomNo) {
//             setRoomNoError('* This Feild is required');
//             isValid = false;
//         } else {
//             setRoomNoError('');
//         }

//         if (!Daate) {
//             setDaateError('* This Feild is required');
//             isValid = false;
//         } else {
//             setDaateError('');
//         }

//         if (!StartingTime) {
//             setStartingTimeError('* This Feild is required');
//             isValid = false;
//         } else {
//             setStartingTimeError('');
//         }

//         if (!EndingTime) {
//             setEndingTimeError('* This Feild is required');
//             isValid = false;
//         } else {
//             setEndingTimeError('');
//         }

//         if (!TotalMarks) {
//             setTotalMarksError('* This Feild is required');
//             isValid = false;
//         } else {
//             setTotalMarksError('');
//         }

//         return isValid;
//     }

//     const PageRefreshOnEdit = () => {
//         setEditExam(!EditExam);
//         setRefreshEdit(!refreshEdit);
//     }

//     const handleClassChange = (val) => {
//         setloaderState(true)
//         const classNoVal = parseInt(val);
//         setClasss(classNoVal);
//         const selectedClass = allClassData.find(c => c.classId === classNoVal);

//         if (selectedClass) {
//             setAllSubjectData(selectedClass.subjects || []);
//             setloaderState(false)

//         } else {
//             setAllSubjectData([]);
//             setloaderState(false)
//         }
//         // setSubject('')
//     };
    

//     return (
//         <>
//             <Container>
//                 {
//                     loaderState && (
//                         <DataLoader />
//                     )
//                 }
//                 <div className="container-fluid ">
//                     <div className="row">
//                         {EditExam
//                             ?
//                             <>
//                                 <form className='p-3'>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Exam Name</label>
//                                         <select className={`form-select font14 ${CategoriesError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Categories} onChange={(e) => setCategories(e.target.value)}>
//                                             <option >--- Choose ---</option>
//                                             {ExamCategoryData?.map(option => (
//                                                 <option key={option.categoryId} value={option?.categoryId}>
//                                                     {option.examCategoryName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{CategoriesError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class</label>
//                                         <select className={`form-select font14 ${ClasssError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Classs} onChange={(e) => handleClassChange(e.target.value)}>
//                                             <option >--- Choose ---</option>
//                                             {allClassData?.map((option, index) => (
//                                                 <option key={option.classId} value={option?.classId}>
//                                                     {option?.classNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{ClasssError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Subject</label>
//                                         <select className={`form-select font14 ${SubjectError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={Subject} onChange={(e) => { setSubject(e.target.value), setSubjectError('') }}>
//                                             <option >--- Choose ---</option>
//                                             {allSubjectData?.map((option) => (
//                                                 <option key={option.subjectId} value={option.subjectId}>
//                                                     {option.subjectName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{SubjectError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Class Room</label>
//                                         <select className={`form-select font14 ${RoomNoError ? 'border-1 border-danger' : ''}`} aria-label="Default select example" value={RoomNo} onChange={(e) => { setRoomNo(e.target.value), setRoomNoError('') }}>
//                                             <option >--- Choose ---</option>
//                                             {allRoomData?.map(option => (
//                                                 <option key={option.roomId} value={option?.roomNo}>
//                                                     {option.roomNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         <span className='text-danger'>{RoomNoError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Date</label>
//                                         <input type="date" id="exampleInputEmail1" className={`form-control font14 ${DaateError ? 'border-1 border-danger' : ''}`} value={Daate} onChange={(e) => { setDaate(e.target.value), setDaateError('') }} />
//                                         <span className='text-danger'>{DaateError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Starting Time</label>
//                                         <input type="time" id="exampleInputEmail1" className={`form-control font14 ${StartingTimeError ? 'border-1 border-danger' : ''}`} value={StartingTime} onChange={(e) => { setStartingTime(e.target.value), setStartingTimeError('') }} />
//                                         <span className='text-danger'>{StartingTimeError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Ending Time</label>
//                                         <input type="time" id="exampleInputEmail1" className={`form-control font14 ${EndingTimeError ? 'border-1 border-danger' : ''}`} value={EndingTime} onChange={(e) => { setEndingTime(e.target.value), setEndingTimeError('') }} />
//                                         <span className='text-danger'>{EndingTimeError}</span>
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="exampleInputEmail1" className="form-label font14">Total Marks</label>
//                                         <input type="text" id="exampleInputEmail1" className={`form-control font14 ${TotalMarksError ? 'border-1 border-danger' : ''}`} placeholder='Enter Total Marks' value={TotalMarks} onChange={(e) => { setTotalMarks(e.target.value), setTotalMarksError(validateMark(e.target.value)) }} />
//                                         <span className='text-danger'>{TotalMarksError}</span>
//                                     </div>
//                                     <p className='text-center p-3'>
//                                         <button className='btn addButtons2 text-white' type='button' onClick={UpdateOfflineExam}>Update Exam</button>
//                                         <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                     </p>
//                                 </form>
//                             </>
//                             :
//                             <>
//                                 <div className="mt-3">
//                                     <div className='correvtSVG p-3 pt-4 rounded-circle'>
//                                         <img src="./images/Correct.svg" alt="" />
//                                     </div>
//                                     <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                         <p className='warningHeading'>Successful Updated</p>
//                                         <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                     </div>
//                                     <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={PageRefreshOnEdit}>Continue</button>
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

// export default EditExam
























// import React, { useEffect, useState } from 'react'
// import styled from 'styled-components'
// import { getAllClassApi, getExamCategoryDataApi, getOfflineExamDataByIdApi, getRoomDataApi, updateOfflineExamApi } from '../../Utils/Apis';
// import toast, { Toaster } from 'react-hot-toast';
// import DataLoader from '../../Layouts/Loader';
// import { useFormik } from 'formik';
// import { editExamSchema } from '../../Schema/validationSchema'

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

// const EditExam = ({ EditId, Reload }) => {

//     const [initialValues, setInitialValues] = useState({
//         examCategory: '',
//         classId: '',
//         subjectId: '',
//         roomNo: '',
//         examDate: '',
//         StartingTime: '',
//         EndingTime: '',
//         TotalMarks: ''
//     })

//     // const initialValues = {
//     //     examCategory: '',
//     //     classId: '',
//     //     subjectId: '',
//     //     roomNo: '',
//     //     examDate: '',
//     //     StartingTime: '',
//     //     EndingTime: '',
//     //     TotalMarks: ''
//     // }

//     const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
//         initialValues: initialValues,
//         validationSchema: editExamSchema,
//         onSubmit: (values) => {
//             console.log(values)
//             UpdateOfflineExam();
//         }
//     })


//     const token = localStorage.getItem('token');
//     //loader State
//     const [loaderState, setloaderState] = useState(false);
//     const [EditExam, setEditExam] = useState(true);

//     const [allRoomData, setAllRoomData] = useState([]);
//     const [allClassData, setAllClassData] = useState([]);
//     const [allSubjectData, setAllSubjectData] = useState([]);
//     const [ExamCategoryData, setExamCategoryData] = useState([]);

//     useEffect(() => {
//         getAllRoomData();
//         getAllClassData();
//         getAllExamCategoryData();
//         getOfflineExamDataById();
//     }, [token, EditId])

//     useEffect(() => {
//         handleClassChange(values.classId);
//     }, [values.classId]);

//     const getOfflineExamDataById = async () => {
//         setloaderState(true);
//         try {
//             var response = await getOfflineExamDataByIdApi(EditId);
//             if (response?.status === 200) {
//                 console.log(response, 'ressssssssssssssssss get by id data')
//                 if (response?.data?.status === 'success') {
//                     values.examCategory = response?.data?.examDetails?.examCategoryId ;
//                     values.classId = response?.data?.examDetails?.classId ;
//                     values.subjectId = response?.data?.examDetails?.subjectId ;
//                     values.roomNo = response?.data?.examDetails?.roomNumber ;
//                     values.examDate = response?.data?.examDetails?.date ;
//                     values.StartingTime = response?.data?.examDetails?.startingTime ;
//                     values.EndingTime = response?.data?.examDetails?.endingTime ;
//                     values.TotalMarks = response?.data?.examDetails?.totalMarks ;
//                     toast.success(response?.data?.message);
//                 }
                
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch (error) {
//             console.log(error)
//         }
//     }

//     const getAllExamCategoryData = async () => {
//         try {
//             const searchKey = '';
//             var response = await getExamCategoryDataApi(searchKey);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setExamCategoryData(response?.data?.categories);
//                     toast.success(response.data.message);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch { }
//     }

//     const getAllClassData = async () => {
//         setloaderState(true);
//         try {
//             var response = await getAllClassApi();
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllClassData(response?.data?.classes);
//                     setloaderState(false);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }

//     const getAllRoomData = async () => {
//         try {
//             const searchKey = '';
//             const page = '';
//             const size = '';
//             var response = await getRoomDataApi(searchKey, page, size);
//             if (response?.status === 200) {
//                 if (response?.data?.status === 'success') {
//                     setAllRoomData(response?.data?.rooms);
//                 }
//             }
//             else {
//                 console.log(response?.data?.message);
//             }
//         }
//         catch {

//         }
//     }


//     const UpdateOfflineExam = async () => {
//         if (validateFields()) {
//             try {
//                 const formData = new FormData();
//                 formData.append('categoryId', values.examCategory)
//                 formData.append('classId', values.classId)
//                 formData.append('subjectId', values.subjectId)
//                 formData.append('roomId', values.roomNo)
//                 formData.append('date', values.examDate)
//                 formData.append('startingTime', values.StartingTime)
//                 formData.append('endingTime', values.EndingTime)
//                 formData.append('totalMarks', values.TotalMarks)

//                 var response = await updateOfflineExamApi(EditId, formData);
//                 console.log(response, 'offline exam')
//                 if (response?.status === 200) {
//                     if (response?.data?.status === 'success') {
//                         toast.success(response?.data?.message)
//                         console.log(response, 'res after success');
//                         setEditExam(!EditExam)
//                     }
//                 }
//             }
//             catch {

//             }
//         }
//     }

//     const handleClassChange = (val) => {
//         setloaderState(true)
//         const classNoVal = parseInt(val);
//         values.classId = classNoVal ;
//         const selectedClass = allClassData.find(c => c.classId === classNoVal);

//         if (selectedClass) {
//             setAllSubjectData(selectedClass.subjects || []);
//             setloaderState(false)

//         } else {
//             setAllSubjectData([]);
//             setloaderState(false)
//         }
//         setloaderState(false)
//     };


//     return (
//         <>
//             <Container>
//                 {
//                     loaderState && (
//                         <DataLoader />
//                     )
//                 }
//                 <div className="container-fluid ">
//                     <div className="row">
//                         {EditExam
//                             ?
//                             <>
//                                 <form className='p-3' onSubmit={handleSubmit}>
//                                     <div className="mb-3">
//                                         <label htmlFor="examCategory" className="form-label font14">Exam Name</label>
//                                         <select className={`form-select font14 ${errors.examCategory && touched.examCategory ? 'border-1 border-danger' : ''}`} aria-label="Default select example" name='examCategory' id='examCategory' value={values.examCategory} onChange={(e)=> handleChange(e)} onBlur={handleBlur}>
//                                             <option >--- Choose ---</option>
//                                             {ExamCategoryData?.map(option => (
//                                                 <option key={option.categoryId} value={option?.categoryId}>
//                                                     {option.examCategoryName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {errors.examCategory && touched.examCategory
//                                             ?
//                                             (
//                                                 <p>{errors.examCategory}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="classId" className="form-label font14">Class</label>
//                                         <select className={`form-select font14 ${errors.classId && touched.classId ? 'border-1 border-danger' : ''}`} aria-label="Default select example" name='classId' id='classId' value={values.classId} onChange={handleClassChange} onBlur={handleBlur}>
//                                             <option >--- Choose ---</option>
//                                             {allClassData?.map((option, index) => (
//                                                 <option key={option.classId} value={option?.classId}>
//                                                     {option?.classNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {errors.classId && touched.classId
//                                             ?
//                                             (
//                                                 <p>{errors.classId}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="subjectId" className="form-label font14">Subject</label>
//                                         <select className={`form-select font14 ${errors.subjectId && touched.subjectId ? 'border-1 border-danger' : ''}`} aria-label="Default select example" name='subjectId' id='subjectId' value={values.subjectId} onChange={(e)=> handleChange(e)} onBlur={handleBlur}>
//                                             <option >--- Choose ---</option>
//                                             {allSubjectData?.map((option) => (
//                                                 <option key={option.subjectId} value={option.subjectId}>
//                                                     {option.subjectName}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {errors.subjectId && touched.subjectId
//                                             ?
//                                             (
//                                                 <p>{errors.subjectId}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="roomNo" className="form-label font14">Class Room</label>
//                                         <select className={`form-select font14 ${errors.roomNo && touched.roomNo ? 'border-1 border-danger' : ''}`} aria-label="Default select example" name='roomNo' id='roomNo' value={values.roomNo} onChange={(e)=> handleChange(e)} onBlur={handleBlur}>
//                                             <option >--- Choose ---</option>
//                                             {allRoomData?.map(option => (
//                                                 <option key={option.roomId} value={option?.roomNo}>
//                                                     {option.roomNo}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                         {errors.roomNo && touched.roomNo
//                                             ?
//                                             (
//                                                 <p>{errors.roomNo}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="examDate" className="form-label font14">Date</label>
//                                         <input type="date" className={`form-control font14 ${errors.examDate && touched.examDate ? 'border-1 border-danger' : ''}`} name='examDate' id='examDate' value={values.examDate} onChange={(e)=> handleChange(e)} onBlur={handleBlur} />
//                                         {errors.examDate && touched.examDate
//                                             ?
//                                             (
//                                                 <p>{errors.examDate}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="StartingTime" className="form-label font14">Starting Time</label>
//                                         <input type="time" className={`form-control font14 ${errors.StartingTime && touched.StartingTime ? 'border-1 border-danger' : ''}`} name='StartingTime' id='StartingTime' value={values.StartingTime} onChange={(e)=> handleChange(e)} onBlur={handleBlur} />
//                                         {errors.StartingTime && touched.StartingTime
//                                             ?
//                                             (
//                                                 <p>{errors.StartingTime}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="EndingTime" className="form-label font14">Ending Time</label>
//                                         <input type="time" className={`form-control font14 ${errors.EndingTime && touched.EndingTime ? 'border-1 border-danger' : ''}`} name='EndingTime' id='EndingTime' value={values.EndingTime} onChange={(e)=> handleChange(e)} onBlur={handleBlur} />
//                                         {errors.EndingTime && touched.EndingTime
//                                             ?
//                                             (
//                                                 <p>{errors.EndingTime}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <div className="mb-3">
//                                         <label htmlFor="TotalMarks" className="form-label font14">Total Marks</label>
//                                         <input type="text" className={`form-control font14 ${errors.TotalMarks && touched.TotalMarks ? 'border-1 border-danger' : ''}`} name='TotalMarks' id='TotalMarks' placeholder='Enter Total Marks' value={values.TotalMarks} onChange={(e)=> handleChange(e)} onBlur={handleBlur} />
//                                         {errors.TotalMarks && touched.TotalMarks
//                                             ?
//                                             (
//                                                 <p>{errors.TotalMarks}</p>
//                                             )
//                                             : null
//                                         }
//                                     </div>
//                                     <p className='text-center p-3'>
//                                         <button className='btn addButtons2 text-white' type='button' onClick={UpdateOfflineExam}>Update Exam</button>
//                                         <button className='btn cancelButtons ms-3' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
//                                     </p>
//                                 </form>
//                             </>
//                             :
//                             <>
//                                 <div className="mt-3">
//                                     <div className='correvtSVG p-3 pt-4 rounded-circle'>
//                                         <img src="./images/Correct.svg" alt="" />
//                                     </div>
//                                     <div className="updatetext border m-4 border-2  ms-5 greydiv rounded-3 text-center greyText p-5">
//                                         <p className='warningHeading'>Successful Updated</p>
//                                         <p className='greyText warningText pt-2'>Your Changes has been<br />Successfully Saved</p>
//                                     </div>
//                                     <button className='btn contbtn continueButtons text-white' type='button' data-bs-dismiss="offcanvas" aria-label="Close" onClick={Reload}>Continue</button>
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

// export default EditExam