import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getFeeMasterByGroupNameApi } from '../../Utils/Apis';
import toast from 'react-hot-toast';
import DataLoader from '../../Layouts/Loader';

const Container = styled.div`

    .table thead tr{
        --bs-table-bg-type: #F2F3F6 !important;
    }

    .bg-yellow{
        background-color: var(--yellowtableBg);
    }

    .greenText{
        color: var(----greenTextColor);
    }

    .backBtn{
        border: 1px solid var(--viewBtn) !important;
        color: var(--breadCrumTextColor) !important;
    }

`;


const ViewParticularFeeMaster = ({ goData, getByIdGoupNameData }) => {

    const token = localStorage.getItem('token');
    //loader State
    const [loaderState, setloaderState] = useState(false);
    const [searchBtn, setSearchBtn] = useState(false);

    const GroupName = getByIdGoupNameData;
    const [FeeMasterDataByName, setFeeMasterDataByName] = useState([]);

    useEffect(() => {
        getFeeMasterById();
    }, [token, getByIdGoupNameData])

    const handlePage = () => {
        goData(false)
    }


    const getFeeMasterById = async () => {
        try {
            setloaderState(true);
            var response = await getFeeMasterByGroupNameApi(GroupName);
            console.log(response)
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setloaderState(false);
                    setFeeMasterDataByName(response?.data?.feeMaster)
                    toast.success(response?.data?.message);
                }
                else {
                    setloaderState(false);
                    toast.error(response?.data?.message);
                }
            }
            else {
                setloaderState(false);
                console.log(response?.data?.message);
            }
        }
        catch (error) {
            console.log('Error Facing during Get All Fee Type API - ', error)
        }
    }


    return (
        <Container className='container-fluid'>
            {
                loaderState && (
                    <DataLoader />
                )
            }
            <div className="row">
                <table className="table align-middle m-0">
                    <thead>
                        <tr>
                            <th className=''><span className='font14'>#</span></th>
                            <th><span className='font14'>Fee Group</span></th>
                            <th><span className='font14'>Fee Code</span></th>
                            <th><span className='font14'>Amount</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        {FeeMasterDataByName.map((item) => (
                            <tr className='align-middle'>
                                <th className='greyText'><h3>1.</h3></th>
                                <td className='greyText'><h3>{item.feeGroup}</h3></td>
                                <td className='greyText'>
                                    {(item.feeMasterList).map((itemm)=> (
                                        <p className='font14'>{itemm.feeTypeCode}</p>
                                    ))}
                                </td>
                                <td className=''>
                                    <span className='font14 greyText align-self-center'>3000</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="row bg-yellow p-3">
                <p className='font14 greenText'>Select Criteria</p>
                <form className='row pt-3' action="">
                    <div className="col-lg-7">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="row p-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Class</label>
                                    <select className="form-select font14" aria-label="Default select example">
                                        <option disabled>Select Class</option>
                                        <option value="1">1</option>
                                        <option defaultValue value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="row p-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Section</label>
                                    <select className="form-select font14" aria-label="Default select example">
                                        <option disabled>Select Section</option>
                                        <option defaultValue value="A">A</option>
                                        <option value="B">B</option>
                                        <option value="C">C</option>
                                        <option value="D">D</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="row p-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Category</label>
                                    <select className="form-select font14" aria-label="Default select example">
                                        <option disabled defaultValue>Select Category</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="row p-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">Gender</label>
                                    <select className="form-select font14" aria-label="Default select example">
                                        <option disabled defaultValue>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="row p-2">
                                    <label htmlFor="exampleFormControlInput1" className="form-label font14">RTE</label>
                                    <select className="form-select font14" aria-label="Default select example">
                                        <option disabled defaultValue>Select RTE</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <p className='text-center p-3'>
                    <button className='btn printButtons font14 text-white me-3' type='button' onClick={() => setSearchBtn(true)}>Search</button>
                    <button className='btn cancelButtons font14 bg-white' type='button' onClick={() => setSearchBtn(false)}>Cancel</button>
                </p>
            </div>
            <div className="row pt-4">
                <div className="d-flex justify-content-center">
                    <button className='btn backBtn p-2' type='button' onClick={handlePage}>
                        <div className="d-flex">
                            <Icon className='align-self-center' icon="weui:back-filled" width="1.3em" height="1.3em" style={{ color: '#134563' }} />
                            <span className='font14 align-self-center'>Back</span>
                        </div>
                    </button>
                </div>
            </div>
            {
                searchBtn
                    ?
                    <div className="row pt-3">
                        <p className='font14 greenText'>Assign Fees Group</p>
                        <div className="overflow-scroll p-2">
                            <table className="table align-middle m-0 table-striped">
                                <thead>
                                    <tr className='align-middle'>
                                        <th className=''>
                                            <div className="d-flex">
                                                <input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" />
                                                <span className='font14 align-self-center ms-2'>All</span>
                                            </div>
                                        </th>
                                        <th><span className='font14'>Admission No</span></th>
                                        <th><span className='font14'>Student Name</span></th>
                                        <th><span className='font14'>Class</span></th>
                                        <th><span className='font14'>Father Name</span></th>
                                        <th><span className='font14'>Category</span></th>
                                        <th><span className='font14'>Gender</span></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr></tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                    <tr className='align-middle'>
                                        <th className='greyText'><input className="form-check-input font14 align-self-center" type="checkbox" value="" id="flexCheckDefault" /></th>
                                        <td className='greyText'><h3>9610</h3></td>
                                        <td className='greyText'><h3>Vinay Singh</h3></td>
                                        <td className='greyText'><h3>2 (A)</h3></td>
                                        <td className='greyText'><h3>Dheeraj Sharma</h3></td>
                                        <td className='greyText'><h3>General</h3></td>
                                        <td className='greyText'><h3>Male</h3></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p className='text-center p-3'>
                            <button className='btn printButtons font14 text-white me-3' type='button'>Assign Fees</button>
                            <button className='btn cancelButtons font14 bg-white' type='button'>Cancel</button>
                        </p>
                    </div>
                    :
                    <></>

            }
        </Container>
    )
}

export default ViewParticularFeeMaster