import React, { useEffect, useState } from 'react'
import { getCbseExamDetailsByIdApi } from '../Utils/Apis';
import DataLoader from '../Layouts/Loader';

const CbseExamDetailsOfStudent = ({ StudentId }) => {

    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [cbseExamsData, setCbseExamsData] = useState([]);

    useEffect(() => {
        getCbseExamsByStudentId();
    }, [StudentId])

    const getCbseExamsByStudentId = async () => {
        try {
            setloaderState(true);
            var response = await getCbseExamDetailsByIdApi(StudentId);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false)
                    setCbseExamsData(response?.data?.marks)
                }
                else {
                    console.log('error')
                    setloaderState(false)
                    toast.error(response?.data?.message);
                }
            }
            else {
                console.log('error')
                setloaderState(false)
                toast.error(response?.data?.message);
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
        <div className="container-fluid">
            {loaderState && (<DataLoader />)}
            {cbseExamsData.length > 0 ?
                cbseExamsData.map((data) => (
                    <div className="row">
                        <h2 className='darkgreentext pt-3 pb-3 p-1'>{data?.category}</h2>
                        <table className="table align-middle table-striped">
                            <thead>
                                <tr>
                                    <th className=''><span className='font14'>#</span></th>
                                    <th><span className='font14'>Subject</span></th>
                                    <th className=' text-center'><span className='font14'>Max Marks</span></th>
                                    <th className=' text-center'><span className='font14'>Min Marks</span></th>
                                    <th className=' text-center'><span className='font14'>Marks Obtained</span></th>
                                    <th className=' text-center'><span className='font14'>Result</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                                {data?.subjects.map((subjects, index) => (
                                    <tr className='align-middle'>
                                        <th className='greyText'><h3>{index + 1}.</h3></th>
                                        <td className='greyText'><h3>{subjects?.subjectName}</h3></td>
                                        <td className='greyText text-center'><h3>{subjects?.aa}</h3></td>
                                        <td className='greyText text-center'><h3>{subjects?.aa}</h3></td>
                                        <td className='greyText text-center'><h3>{subjects?.gainMarks}</h3></td>
                                        <td className='greenText text-center'><h3>{subjects?.aa}</h3></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
                :
                <p className='font14 text-danger'>Marks Not Assigned Yet !!</p>
            }
        </div>
    )
}

export default CbseExamDetailsOfStudent
