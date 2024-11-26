import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { getAllClassRoutineDataApi } from '../Utils/Apis';
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import DataLoader from '../Layouts/Loader';

const Container = styled.div`
    height: 92vh;
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

    .greenText{
        color: var(--greenTextColor);
    }

    .table td {
        border-right: 0.3px solid #dee2e6;
    }

    .table-striped>thead>tr>* {
        --bs-table-bg-type: #F2F3F6;
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: #FFF9F6;
    }

    .table-striped>tbody>tr>* {
       padding-top: 2%;
       padding-bottom: 2%;
    }

    
`;

const ClassRoutines = () => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const searchByKey = '';

    const [RoutineData, setRoutineData] = useState([]);

    useEffect(() => {
        getAllClassRoutine();
    }, [token]);

    const day = '';

    const getAllClassRoutine = async () => {
        try {
            setloaderState(true);
            var response = await getAllClassRoutineDataApi(day);
            console.log(response, 'holiday')
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setRoutineData(response?.data?.timetable)
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

    const handlePageClick = (event) => {
        setPageNo(event.selected + 1); // as event start from 0 index
    };



    return (

        <Container className="container-fluid p-4 overflow-scroll">
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row pb-3">
                <nav className='mainBreadCrum font14 ps-0' aria-label="breadcrumb">
                    <ol className="breadcrumb mb-1">
                        <li className="breadcrumb-item">
                            <Link to="/" className='align-self-center bredcrumText text-decoration-none font14'>Home</Link>
                            <Icon className='ms-2' icon="ep:arrow-right-bold" width="1em" height="1em" style={{ color: '#78788C' }} />
                        </li>
                        <li className="breadcrumb-item active bredcrumActiveText font14" aria-current="page">ClassRoutines</li>
                    </ol>
                </nav>
                <p className='font14 ps-0 fw-bolder'>ClassRoutines Details</p>
            </div>
            <div className="row p-3 bg-white borderRadius5 pb-5">
                <div className="col-12 p-0">
                    <div className="row pb-3">
                        <div className="col-4">
                            <p className='greenText'>Class Routine Details</p>
                        </div>
                        <div className="col-4 text-center">
                            <span className='fw-bolder'>
                                <Icon className='pointer' icon="mingcute:left-fill" width="2.5em" height="1.5em" style={{ color: '#000' }} />
                                20 May - 26 May
                                <Icon className='pointer' icon="mingcute:right-fill" width="2.5em" height="1.5em" style={{ color: '#000' }} />
                            </span>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
                <table className="table align-middle table-striped table-bordered">
                    <thead>
                        <tr>
                            {/* <td className='font14'>{RoutineData[0].timetable?.startHourTime}-{item?.endHourTime}</td> */}
                        </tr>
                        <tr>
                            <td className='font14'></td> {/* .slice(0, 5) */}
                            <td className='font14'>9 - 9.45 AM</td>
                            <td className='font14'>10 - 10.45 AM</td>
                            <td className='font14'>11 - 11.45 AM</td>
                            <td className='font14'>12 - 12.45 AM</td>
                            <td className='font14'>1 - 1.45 AM</td>
                            <td className='font14'>2 - 2.45 AM</td>
                            <td className='font14'>3 - 3.45 AM</td>
                            <td className='font14'>4 - 4.45 AM</td>
                        </tr>
                    </thead>

                    <tbody>
                        <tr></tr>
                        {RoutineData.map((item, index) => (
                            <tr key={index}>
                                <td className='font14'>{item?.day}</td>
                                {(item?.timetable).map((timeTable) => (
                                    <td className='font14'>
                                        <p className='text-center greyText'>Class - {timeTable.section}</p>
                                        <p className='text-center'>{timeTable.subject}</p>
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <Toaster />
            </div>
        </Container>

    )
}

export default ClassRoutines
