import React, { useEffect, useState } from 'react'
import { getSchoolDataApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import { Link, useNavigate } from 'react-router-dom';

const SchoolDashboard = () => {

    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('loggedInUserRole');

    //loader State
    const [loaderStatee, setloaderStatee] = useState(false);
    const [schoolData, setSchoolData] = useState([]);

    useEffect(() => {
        if (role === 'SUPERADMIN') {
            getAllSchoolData();
        }
    }, [token])

    const getAllSchoolData = async () => {
        try {
            setloaderStatee(true);
            const search = '';
            const page = '';
            const size = '';
            var response = await getSchoolDataApi(search, page, size);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setSchoolData(response?.data?.schools);
                    setloaderStatee(false);
                }
            }
            else {
                setloaderStatee(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderStatee(false);
            console.error('Error fetching student data:', error);
            if (error?.response?.data?.statusCode === 401) {
                localStorage.removeItem('token')
                setTimeout(() => {
                    navigate('/')
                }, 200);
            }
        }
    }



    return (
        <>
            {
                loaderStatee && (
                    <DataLoader />
                )
            }
            <div className="container-fluid">
                <div className="row">
                    <table className="table mt-2 mb-0">
                        <tbody>
                            {schoolData.slice(0, 8).map((item) => (
                                <tr key={item.id}>
                                    <td className='greyText'><h3>{item.schoolName}</h3></td>
                                    <td>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                                    <td className='text-end'><Link className='text-center text-black text-decoration-none viewDetailsButtons p-1' to={`/viewSchoolDetails/${item.schoolBusinessId}`}><span>View Details</span></Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default SchoolDashboard
