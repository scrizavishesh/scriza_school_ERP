import React, { useEffect, useState } from 'react'
import { getAllPlanApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';
import { useNavigate } from 'react-router-dom';

const PackageDashboard = () => {

    const token = localStorage.getItem('token');

    const navigate = useNavigate();

    //loader State
    const [loaderStateee, setloaderStateee] = useState(false);
    const [AllPlan, setAllPlan] = useState([]);

    useEffect(() => {
        getAllPlans();
    }, [token])

    const getAllPlans = async () => {
        try {
            setloaderStateee(true);
            const search = '';
            const page = '';
            const size = '';
            var response = await getAllPlanApi(search, page, size);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllPlan(response?.data?.plans);
                    setloaderStateee(false);
                }
            }
            else {
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            setloaderStateee(false);
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
                loaderStateee && (
                    <DataLoader />
                )
            }
            <div className="container-fluid">
                <div className="row">
                    <table className="table mt-2 mb-0">
                        <tbody>
                            {AllPlan.slice(0, 4).map((item) => (
                                <tr key={item.planId}>
                                    <td className='greyText'><h3>{item.planName}</h3></td>
                                    <td className='text-end'>{item.status ? <h3 className='activeText'> Active </h3> : <h3 className='deactiveText'> InActive </h3>}</td>
                                    <td className='text-end'><span className='text-center viewDetailsButtons p-1'>View Details</span></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default PackageDashboard
