import React, { useEffect, useState,useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import HashLoader from './HashLoaderCom';
import { TeacherClassGetApi } from '../Utils/Apis'
import { TeacherSectionRoomByIdGetApi } from '../Utils/Apis'
import { TeacherSubjectByClassIdInSyllabusGetAllApi } from '../Utils/Apis'
import { AssignmentPostApi } from '../Utils/Apis'
import { TeacherGetTeacherGetAll } from '../Utils/Apis'

const Add_assign_offcnvs = () => {

    const [Add, setAdd] = useState(true)
    const [hide, setHide] = useState(false)
    const [show, setShow] = useState(true)

    const [loader, setLoader] = useState(false)
    const [searchKey, setsearchKey] = useState('')
    const [editshow, setEditshow] = useState(true)
    const [edithide, setEdithide] = useState(false)
    const [showdelete, setShowdelete] = useState(true)
    const [hidedelete, setHidedelete] = useState(false)
    const [forDelete, setForDelete] = useState(false)
    const [IdForDelete, setIdForDelete] = useState()
    console.log('id for delete', IdForDelete)

    const [IdForUpdate, setIdForUpdate] = useState()

    const [title, setTitle] = useState()
    const [classId, setClassId] = useState()
    const [classNo, setClassNo] = useState()
    const [sectionId, setSectionId] = useState()
    const [subjectId, setSubjectId] = useState()
    console.log('classs idddd', classId)
    console.log('classs no', classNo)
    console.log('subject idddd', subjectId)

    const [teacher, setTeacher] = useState()
    const [totalMarks, setTotalMarks] = useState()
    const [startDay, setStartDay] = useState()
    const [endDay, setEndDay] = useState()
    const [assignmentUpload, setAssignmentUpload] = useState()
    const [status, setStatus] = useState()
    const [classData, setClassdata] = useState([])
    const [sectionData, setSectionData] = useState([])
    const [subjectData, setSubjectData] = useState([])
    const [teacherData, setTeachertData] = useState([])

    const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
    const [isValidMarksRequired, setIsValidMarksRequired] = useState(false);
    const [isValidStartDateRequired, setIsValidStartDateRequired] = useState(false);
    const [isValidEndDayDateRequired, setIsValidEndDayDateRequired] = useState(false);

    useEffect(() => {
        UpdatClassGetApi()
    }, [])

    useEffect(() => {

        if (subjectId) {
            MyTeacherByClassIdGetApi(subjectId)
        }
    }, [subjectId])

    // ###### validation ##########
    const [errors, setErrors] = useState({});


    const FuncValidation = () => {
        let isValid = true;

        // title
        if (!title || title === "" || !/^[A-Za-z\s]+$/.test(title)) {
            setIsValidTitleRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // marks 
        if (!totalMarks || totalMarks === "" || !/^[0-9]+$/.test(totalMarks)) {
            setIsValidMarksRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // start date 
        if (!startDay || startDay === "" || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(startDay)) {
            setIsValidStartDateRequired(true)
            isValid = false;
            setLoader(false)
        }
        else {
        }
        // end date 
        if (!endDay || endDay === "" || !/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(endDay)) {
            setIsValidEndDayDateRequired(true)

            isValid = false;
            setLoader(false)
        }
        else {
        }
        return isValid;
    }

    // title
    const handleTitle = (e2) => {
        setTitle(e2);
        const nameRegex = /^[A-Za-z\s]+$/;
        setIsValidTitleRequired(nameRegex.test(e2));
        if (e2 === "" || !nameRegex.test(e2)) {
            setIsValidTitleRequired(true)
        } else {
            setIsValidTitleRequired(false)
        }
    }
    // marks 
    const handleMarks = (e2) => {
        setTotalMarks(e2)
        const noRegex = /^[0-9]+$/;
        setIsValidMarksRequired(noRegex.test(e2));

        if (e2 === "" || !noRegex.test(e2)) {
            setIsValidMarksRequired(true)
        } else {
            setIsValidMarksRequired(false)
        }
    }
    // start date 
    const handleStartDate = (e2) => {
        setStartDay(e2)
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        setIsValidStartDateRequired(dateRegex.test(e2));
        if (e2 === "" || !dateRegex.test(e2)) {
            setIsValidStartDateRequired(true)
        } else {
            setIsValidStartDateRequired(false)
        }
    }
    // end date 
    const handleEndDate = (e2) => {
        setEndDay(e2)
        const dateRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
        setIsValidEndDayDateRequired(dateRegex.test(e2));
        if (e2 === "" || !dateRegex.test(e2)) {
            setIsValidEndDayDateRequired(true)
        } else {
            setIsValidEndDayDateRequired(false)
        }
    }
    // ###### validation ##########


    const handle = (event) => {
        const value = event.target.value;
        const [val1, val2] = value.split(',');
        setClassId(parseInt(val1))
        const num = val2.trim()
        setClassNo(num)
        // console.log(val1, 'classsssssssssss')
        MySectionGetApi(val1)
        MySubjectByClassIdGetApi(val1)
    }
    // Get All Api from class list page for id 
    const UpdatClassGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherClassGetApi();
            console.log('class-get-all-api in Assignment', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setClassdata(response?.data?.classes)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Section Get All Api from section page for id 
    const MySectionGetApi = async (id) => {
        console.log(id, 'id in section')
        setLoader(true)
        try {
            const response = await TeacherSectionRoomByIdGetApi(id);
            console.log('SECTION-get-all-api', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.message)
                setSectionData(response?.data?.allSections)
                setLoader(false)
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Subject by class id From class get all api 
    const MySubjectByClassIdGetApi = async (id) => {
        console.log(id, 'id in subject')
        setLoader(true)
        try {
            const response = await TeacherSubjectByClassIdInSyllabusGetAllApi(id);
            console.log('Subject-get-all-api in Assignment', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setSubjectData(response?.data?.subjects)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    // Teacher by class id and subject id From get all api 
    const MyTeacherByClassIdGetApi = async () => {
        setLoader(true)
        try {
            const response = await TeacherGetTeacherGetAll(classId, subjectId);
            console.log('Teacher-get-all-api in Assignment', response);
            if (response?.status === 200) {
                // toast.success(response?.data?.classes?.message)
                setTeachertData(response?.data?.teacher)
                setLoader(false)
            } else {
                toast.error(response?.data?.classes?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }

    const offcanvasRef = useRef(null);

    // post Api 
    const AssignmntDataApi = async () => {
        if (FuncValidation()) {
            setLoader(true)
            {
                const formData = new FormData()
                formData.append('title', title);
                formData.append('ClassId', classId);
                formData.append('subjectId', subjectId);
                formData.append('teacherId', teacher);
                formData.append('totalMarks', totalMarks);
                formData.append('startDate', startDay);
                formData.append('endDate', endDay);
                formData.append('status', status);
                formData.append('sectionId', sectionId);
                formData.append('file', assignmentUpload);
                try {
                    const response = await AssignmentPostApi(formData);
                    console.log('response of assignmnt data post api', response)
                    if (response?.data?.status === "success") {
                        toast.success(response?.data?.message);
                        // MyBookIssueGetApi()
                        setAdd(false)
                        setLoader(false)
                        setTimeout(()=>{
                            Func()
                        },0.5)
                    } else {
                        toast.error(response?.data?.message);
                        setAdd(true)
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } 
    }
    const Func = () =>{
        setTimeout(true)
        // onClick={() => setTimeout(() => { setAdd(true) }, 1000)}
    }
    return (
        <div className="container-fluid">
            <div className="row">
                {Add
                    ?
                    <>
                        <div className="offcanvas-body pt-0  px-0">
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Title</label>
                                <input type="email" class="form-control form-control-sm" onChange={(e) => handleTitle(e.target.value)} id="exampleFormControlInput1" placeholder="Select Title" />
                            </div>
                            <div className='pt-1'>
                                {isValidTitleRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Valid title is required
                                    </p>
                                )}
                            </div>

                            <div className="mb-1  ">
                                <label for="exampleFormControlInput1" className="form-label  heading-16">Class</label>
                                <select class="form-select  form-select-sm form-focus  label-color" onChange={handle} aria-label="Default select example">
                                    <option selected>--Choose--</option>
                                    {
                                        classData.map(item => (
                                            <option value={`${item.classId}, ${item.classNo}`}>{item.classNo}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-1  ">
                                <label for="exampleFormControlInput1" className="form-label   heading-16">Section</label>
                                <select class="form-select  form-select-sm form-focus   label-color" onChange={(e) => setSectionId(e.target.value)} aria-label="Default select example">
                                    <option selected>--Choose--</option>
                                    {
                                        sectionData.map(item =>
                                            <option value={item.sectionId}>{item.sectionName}</option>
                                        )
                                    }

                                </select>
                            </div>
                            <div className="mb-1  ">
                                <label for="exampleFormControlInput1" className="form-label  heading-16">Subject</label>
                                <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setSubjectId(e.target.value)} aria-label="Default select example">
                                    <option selected>--Choose--</option>
                                    {
                                        subjectData.map(item =>
                                            <option value={item.subjectId}>{item.subjectName}</option>
                                        )
                                    }

                                </select>
                            </div>
                            <div className="mb-1  ">
                                <label for="exampleFormControlInput1" className="form-label  heading-16">Teacher</label>
                                <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setTeacher(e.target.value)} aria-label="Default select example">
                                    <option selected>--Choose--</option>
                                    {
                                        teacherData.map(item =>
                                            <option value={item.subjectId}>{item.staffName}</option>
                                        )
                                    }
                                </select>
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Total Marks</label>
                                <input type="email" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => handleMarks(e.target.value)} placeholder="Select Title" />
                            </div>
                            <div className='pt-1'>
                                {isValidMarksRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Valid marks is required
                                    </p>
                                )}
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Start Day</label>
                                <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => handleStartDate(e.target.value)} placeholder="Select Class" />
                            </div>
                            <div className='pt-1'>
                                {isValidStartDateRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Valid start date is required
                                    </p>
                                )}
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label heading-16">End Day</label>
                                <input type="date" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => handleEndDate(e.target.value)} placeholder="Select Class" />
                            </div>
                            <div className='pt-1'>
                                {isValidEndDayDateRequired && (
                                    <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                                        Valid end date is required
                                    </p>
                                )}
                            </div>
                            <div class="mb-3">
                                <label for="exampleFormControlInput1" class="form-label heading-16">Assignment Upload </label>
                                <input type="file" class="form-control form-control-sm" id="exampleFormControlInput1" onChange={(e) => setAssignmentUpload(e.target.files[0])} placeholder="Select Class" accept='.jpg, .png, .jpeg' />
                            </div>
                            <div className="mb-1  ">
                                <label for="exampleFormControlInput1" className="form-label  heading-16">Status</label>
                                <select class="form-select  form-select-sm form-focus  label-color" onChange={(e) => setStatus(e.target.value)} aria-label="Default select example">
                                    <option selected>--Choose--</option>
                                    <option value="active">Active</option>
                                    <option value="draft">Draft</option>
                                    <option value="archives">Archives</option>

                                </select>
                            </div>
                            <div className='my-button11 '>
                                <button type="button" className="btn btn-outline-success heading-16 btn-bgAndColor" onClick={AssignmntDataApi}>Add Assignment</button>
                                <button type="button" className="btn btn-outline-success heading-16">Cancel</button>
                            </div>
                        </div>

                    </>
                    :
                    <div className="delete-section  mt-5">
                        <div className="bg-container">
                            <div className="img-container">
                                <img src="./images/XMLID_1_.png" alt="" />
                            </div>
                            <div className="content mt-5">
                                <p >Successful Added</p>
                                <hr style={{ width: '' }} />
                                <p className='mb-5' style={{ color: '#ADADBD', fontSize: '14px' }}>Your Changes has been <br /> Successfully Saved</p>
                            </div>
                            <div className='button-position'>
                                <button type="button" data-bs-dismiss="offcanvas" className="btn btn-outline-primary button11 mt-4 mb" style={{ fontSize: '14px' }} >Continue</button>
                            </div>

                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default Add_assign_offcnvs
