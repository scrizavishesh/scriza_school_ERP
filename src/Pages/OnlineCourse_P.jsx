import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import DataLoader from '../Layouts/Loader';
import { getOnlineCoursesDataApi } from '../Utils/Apis';

const Container = styled.div`

    .subjectName{
        background-color: #E1EDEB;
        padding: 0.7rem;
    }

    .cards{
        border : 1px solid var(--cardsBorder);
        background-color: #fff;
        border-radius: var(--borderRadius10px);
    }

    .mainBreadCrum{
        --bs-breadcrumb-divider: none !important;
    }

    .bredcrumText{
        color: var(--breadCrumTextColor);
    }

    .bredcrumActiveText{
        color: var(--breadCrumActiveTextColor);
    }

    .greyText{
        color: var(--greyTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .card{
        padding: 0%;
        border: 1px solid ;
    }

    .card-header {
        background-color: white !important;
        border-bottom: none !important;
    }

    .subjectButton{
        background-color: var(--borderSidebar);
    }

    .continueLesson{
        background-color: var(--greenTextColor);
        border-radius: var(--borderRadius17px);
    }

`;

const OnlineCourse = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);

    const [AssignmentData, setAssignmentData] = useState([]);


    useEffect(() => {
        getAllOnlineCourse();
    }, [token]);

    const getAllOnlineCourse = async () => {
        try {
            setloaderState(true);
            var response = await getOnlineCoursesDataApi();
            console.log(response, 'OnlineCourses')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setAssignmentData(response?.data?.courses)
                    // toast.success(response.data.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.msg);
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



    return (

        <Container className="container-fluid p-3 overflow-scroll">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row pb-2 ps-3 pt-2">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">Online Course</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>Online Course Details</p>
            </div>
            <div className="row">
                {AssignmentData.map((course) => (
                    <div className="col-sm-6 col-12">
                        <div className="row p-2">
                            <div className="col-12 cards h-100 overflow-hidden">
                                <div className="row">
                                    <div className="d-flex p-0">
                                        <div className="flex-grow-1 p-2 ps-3 align-self-center">
                                            <p className='font14 align-self-center'>{course?.courseName}</p>
                                        </div>
                                        <div className="align-self-center">
                                            <span className='font14 subjectName'>{course?.courseName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="row pt-3">
                                    <img className='img-fluid' src={course?.courseImage} alt={course?.courseName} />
                                </div>
                                <div className="row p-4">
                                    <p className='text-center'>
                                        <Link className='btn continueLesson ps-3 pe-3 text-white font12' to={course?.courseFile} target='_blank' rel="noopener noreferrer">Continue Lesson</Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Container>

    )
}

export default OnlineCourse