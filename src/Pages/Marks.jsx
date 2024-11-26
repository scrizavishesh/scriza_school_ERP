import React, { Suspense, lazy, useEffect, useState } from 'react'
import styled from 'styled-components'
// import MarksTable from '../../Modals/Marks/MarksTable';
import { getAllClassApi, getAllMarksApi, getAllSessionDataAPI, getExamCategoryDataApi } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const MarksTable = lazy(() => import('../Modals/Marks/MarksTable'));

const Container = styled.div`
    .form-select{
        color: var(--greyState);
        box-shadow: none;
    }
    
    .mainBreadCrum{
        --bs-breadcrumb-divider: '>' !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

`;

const Marks = () => {

    //loader State
    const [loaderState, setloaderState] = useState(false);

    const token = localStorage.getItem('token');
    const [SearchBtn, setSearchBtn] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [indexxx, setIndexxx] = useState('');
    const [classId, setClassId] = useState('');
    const [sectionId, setSectionId] = useState('');
    const [subjectId, setSubjectId] = useState('');

    const [marksData, setMarksData] = useState([]);
    const [totalMarksForExam, setTotalMarksForExam] = useState(0);
    // console.log(marksData[0], 'Marks')
    const [sessionData, setSessionData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [ExamCategoryData, setExamCategoryData] = useState([]);

    const [className, setClassName] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [sectionName, setSectionName] = useState('')
    const [sessionSelect, setSessionSelect] = useState('');
    const [examCategorySelect, setExamCategorySelect] = useState('');

    const [reloadMarks, setReloadMarks] = useState(false)

    useEffect(() => {
        getAllSession();
        getAllClassData();
        getAllExamCategoryData();

        if (reloadMarks) {
            getAllMarksData();
        }

    }, [reloadMarks]);

    const handleReloadMarksData = () => {
        setReloadMarks(true)
    }

    const getAllClassData = async () => {
        setloaderState(true)
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllClassData(response?.data?.classes);
                }
            }
            else {
                setloaderState(false)
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            console.log(error)
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }

        }
    }

    const getAllSession = async () => {
        try {
            var response = await getAllSessionDataAPI();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSessionData(response?.data?.sessions);
                    // toast.success(response?.data?.message)
                    // setTotalItems(10);
                }
            }
        }
        catch (error) {
            console.log('Error During Get Session', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
    }


    const getAllExamCategoryData = async () => {
        setloaderState(true);
        try {
            var response = await getExamCategoryDataApi('', '', '');
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setExamCategoryData(response?.data?.categories);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderState(false);
            console.log(error)
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }

        }
    }

    const getAllMarksData = async () => {
        try {
            setIsSearched(true);
            setloaderState(true);
            var response = await getAllMarksApi(classId, sectionId, subjectId, sessionSelect, examCategorySelect);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setMarksData(response?.data?.marks);
                    setTotalMarksForExam(response?.data?.totalMarks)
                    // setReloadMarks(false)
                }
                else {
                    setloaderState(false);
                }
            }
            else {
                setloaderState(false);
                toast.error(response?.data?.message);
            }
        }
        catch (e) {
            console.log('Error during data get', e)
            setloaderState(false);
        }
    }


    const handleChange = (e) => {
        const value = e.target.value;
        const [val1, val2, val3] = value.split(',');
        setIndexxx(val1);
        setClassId(val2);
        setClassName(val3)
    }

    const handleSection = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setSectionId(val1);
        setSectionName(val2);
    }

    const handleSubject = (e) => {
        const value = e.target.value;
        const [val1, val2] = value.split(',');
        setSubjectId(val1);
        setSubjectName(val2);
    }

    const handleCancelSearch = () => {
        setClassId('');
        setSectionId('');
        setSubjectId('');
        setSessionSelect('');
        setExamCategorySelect('');
        setIsSearched(false);
    }


    return (
        <>
            <Container className='h-100 overflow-scroll'>
                {
                    loaderState && (
                        <DataLoader />
                    )
                }
                <div className="container-fluid p-4">
                    <div className="row pb-3 gap-xl-0 gap-3">
                        <div className="col-xxl-4 col-xl-3 col-lg-12 col-sm-12 flex-frow-1 ">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/examCategory" className='bredcrumText text-decoration-none'>Examination</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Marks</li>
                                </ol>
                            </nav>
                            <p className='font14 ps-0 fontWeight500'>Manage Marks</p>
                        </div>
                    </div>
                    <div className="row pb-3">
                        <div className="bg-white rounded-2 p-4">
                            <form className="row g-3">
                                <div className="col-lg-7 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Exam Category</label>
                                            <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setExamCategorySelect(e.target.value)}>
                                                <option defaultValue>Select a Exam Category</option>
                                                {ExamCategoryData?.map((option) => (
                                                    <option key={option.categoryId} value={option?.examCategoryName}>
                                                        {option.examCategoryName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Class</label>
                                            <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={handleChange}>
                                                <option >--- Choose ---</option>
                                                {allClassData?.map((option, index) => (
                                                    <option key={option.classId} value={`${index}, ${option?.classId}, ${option.classNo}`}>
                                                        {option.classNo}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                            <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={handleSection}>
                                                <option >--- Choose ---</option>
                                                {allClassData[indexxx]?.section?.map(option => (
                                                    <option key={option.classSecId} value={`${option?.classSecId}, ${option.sectionName}`} >
                                                        {option.sectionName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-md-12 col-sm-12 col-12">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Subject</label>
                                            <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={handleSubject}>
                                                <option >--- Choose ---</option>
                                                {allClassData[indexxx]?.subjects?.map(option => (
                                                    <option key={option.subjectId} value={`${option?.subjectId}, ${option.subjectName}`} >
                                                        {option.subjectName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-lg-6 col-md-4 col-sm-6 col-12">
                                            <label htmlFor="inputEmail4" className="form-label font14">Session</label>
                                            <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setSessionSelect(e.target.value)}>
                                                <option defaultValue>Select a Session</option>
                                                {sessionData?.map(option => (
                                                    <option key={option.sessionId} value={option.sessionName} >
                                                        {option.sessionName}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <p className='text-center p-3'>
                                    <button type='button' className='btn updateButtons text-white' onClick={getAllMarksData}>Search</button>
                                    <button type='button' className='btn cancelButtons ms-3' onClick={handleCancelSearch}>Cancel</button>
                                </p>
                            </form>
                            <div className="row">
                                {!isSearched ? (
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="./images/search.svg" alt="Search" className='img-fluid' />
                                    </div>
                                ) : (
                                    <Suspense fallback={<DataLoader />}>
                                        {marksData.length > 0 && (
                                            <MarksTable
                                                marksData={marksData}
                                                subjectName={subjectName}
                                                className={className}
                                                sectionName={sectionName}
                                                sessionSelect={sessionSelect}
                                                examCategorySelect={examCategorySelect}
                                                ReloadMarksData={handleReloadMarksData}
                                                totalMarksForExam={totalMarksForExam}
                                            />
                                        )}
                                    </Suspense>

                                )}
                            </div>
                            {/* <MarksTable marksData={marksData} className={className} sectionName={sectionName} subjectName={subjectName} sessionSelect={sessionSelect} examCategorySelect={examCategorySelect} /> */}
                        </div>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default Marks
