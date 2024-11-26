import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllClassApi, getAllPromotedStudentsDataAPI, getAllSessionDataAPI } from '../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

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

const Promotion = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [SearchBtn, setSearchBtn] = useState(false);
    const [promotedStudents, setPromotedStudents] = useState([]);
    const [sessionData, setSessionData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allPrevSectionData, setAllPrevSectionData] = useState([]);
    const [allNextSectionData, setAllNextSectionData] = useState([]);
    const [prevClassId, setPrevClassId] = useState('')
    const [nextClassId, setNextClassId] = useState('')

    const [nextSession, setNextSession] = useState('')
    const [prevSectionId, setPrevSectionId] = useState('')
    const [nextSectionId, setNextSectionId] = useState('')

    useEffect(() => {
        getAllSession();
        getAllClassData();
    }, [token]);

    const getAllClassData = async () => {
        try {
            setloaderState(true)
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setAllClassData(response?.data?.classes);
                    // toast.success(response?.data?.message)
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch {
            console.log('Error while fetching data: ', error);
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
            setloaderState(true)
            var response = await getAllSessionDataAPI();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setSessionData(response?.data?.sessions);
                    // toast.success(response?.data?.message)
                }
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

    const handlePrevClassChange = (val) => {
        const classNoVal = parseInt(val);
        setPrevClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);

        if (selectedClass) {
            setAllPrevSectionData(selectedClass.section || []);
        } else {
            setAllPrevSectionData([]);
        }
    };

    const handleNextClassChange = (val) => {
        const classNoVal = parseInt(val);
        setNextClassId(classNoVal);
        const selectedClass = allClassData.find(c => c.classId === classNoVal);

        if (selectedClass) {
            setAllNextSectionData(selectedClass.section || []);
        } else {
            setAllNextSectionData([]);
        }
    };



    const getAllPromotedStudentsData = async () => {
        try {
            setSearchBtn(true)
            const response = await getAllPromotedStudentsDataAPI(nextSession, prevSectionId, nextSectionId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message);
                    setPromotedStudents(response?.data?.promotedStudent);
                }
                else {
                    toast.error(response?.data?.msg);
                }
            }
            else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Container>
                <div className="container-fluid">
                    <div className="row p-4">
                        <div className="row pb-3">
                            <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                                <ol className="breadcrumb mb-1">
                                    <li className="breadcrumb-item"><a href="/" className='bredcrumText text-decoration-none'>Home</a></li>
                                    <li className="breadcrumb-item"><a href="/examCategory" className='bredcrumText text-decoration-none'>Exam Category</a></li>
                                    <li className="breadcrumb-item active bredcrumActiveText" aria-current="page">Promotion</li>
                                </ol>
                            </nav>
                            <p className='font16 ps-0 fontWeight500'>Promotion</p>
                        </div>
                        <div className="row pb-3">
                            <div className="bg-white rounded-2 p-4">
                                <form className="row g-3">
                                    <div className="col-md-3 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Current session</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example">
                                            <option defaultValue>Select a Session</option>
                                            {sessionData?.map(option => (
                                                <option key={option.sessionId} value={option.sessionName} >
                                                    {option.sessionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Next session</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setNextSession(e.target.value)}>
                                            <option defaultValue>Select a Session</option>
                                            {sessionData?.map(option => (
                                                <option key={option.sessionId} value={option.sessionName} >
                                                    {option.sessionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Promoting from</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => handlePrevClassChange(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option) => (
                                                <option key={option.classId} value={option?.classId}>
                                                    {option?.classNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setPrevSectionId(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allPrevSectionData?.map(option => (
                                                <option key={option.classSecId} value={option.classSecId}>
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Promoting To</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => handleNextClassChange(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allClassData?.map((option) => (
                                                <option key={option.classId} value={option?.classId}>
                                                    {option?.classNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-12">
                                        <label htmlFor="inputEmail4" className="form-label font14">Section</label>
                                        <select className="form-select borderRadius5 font14" aria-label="Default select example" onChange={(e) => setNextSectionId(e.target.value)}>
                                            <option >--- Choose ---</option>
                                            {allNextSectionData?.map(option => (
                                                <option key={option.classSecId} value={option.classSecId}>
                                                    {option.sectionName}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <p className='text-center p-3'>
                                        <button type='button' className='btn addCategoryButtons2 text-white' onClick={getAllPromotedStudentsData}>Manage Promotion</button>
                                        <button type='button' className='btn cancelButtons ms-3'>Cancel</button>
                                    </p>
                                </form>
                                <div className="row">
                                    {SearchBtn
                                        ? 
                                        <>
                                        <div>
                                            <table className="table align-middle table-striped">
                                                <thead>
                                                    <tr>
                                                        <th className='text-center'><span className='font14'>#</span></th>
                                                        <th><span className='font14'>Student Id</span></th>
                                                        <th><span className='font14'>Student Name</span></th>
                                                        <th><span className='font14'>Class</span></th>
                                                        <th><span className='font14'>Section</span></th>
                                                        <th><span className='font14'>Status</span></th>
                                                        <th className='text-center'><span className='font14'>Action</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {promotedStudents.map((student, index) => (
                                                        <tr key={student.id} className='my-bg-color align-middle'>
                                                            <th className='text-center greyText'><h3>{index + 1}</h3></th>
                                                            <td className='greyText'><h3>{student.studentId}</h3></td>
                                                            <td className='greyText'><h3>{student.studentName}</h3></td>
                                                            <td className='greyText'><h3>{student.classNo}</h3></td>
                                                            <td className='greyText'><h3>{student.classSection}</h3></td>
                                                            <td className='greyText'><h3></h3></td>
                                                            <td className='text-center'>
                                                                <button className='btn addButtons text-white font14'>Promoted</button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>

                                            {/* <div className="d-flex">
                                                <p className='font14'>Showing {currentPage} of {totalPages} Pages</p>
                                                <div className="ms-auto">
                                                    <ReactPaginate
                                                        previousLabel={<Icon icon="tabler:chevrons-left" width="1.4em" height="1.4em" />}
                                                        nextLabel={<Icon icon="tabler:chevrons-right" width="1.4em" height="1.4em" />}
                                                        breakLabel={'...'} breakClassName={'break-me'} pageCount={totalPages} marginPagesDisplayed={2} pageRangeDisplayed={10}
                                                        onPageChange={handlePageClick} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'}
                                                    />
                                                </div>
                                            </div> */}
                                        </div>
                                        </>
                                :
                                <>
                                    <div className="d-flex justify-content-center p-5">
                                        <img src="./images/search.svg" alt="" className='img-fluid' />
                                    </div>
                                </>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster />
            </div>
        </Container >
        </>
    )
}

export default Promotion
