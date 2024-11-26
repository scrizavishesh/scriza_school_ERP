import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { CSVLink } from 'react-csv';
import { AddStudentByCSVApi, DownloadStudentExcelForm, getAllClassApi } from '../Utils/Apis';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    .form-control::placeholder, .form-control{
        color: var(--greyState)
    }

    .form-control{
        border-radius: 5px !important;
        box-shadow: none !important;
        border: 1px solid var(--fontControlBorder);
    }

    .AddBtnn, .AddBtnn:visited, .AddBtnn:active{
        width: fit-content;
        border: 2px solid var(--BtnBorder);
        background-color: var(--breadCrumActiveTextColor)
    }

    .EyeViewBtnn, .EyeViewBtnn:active{
        width: fit-content;
        border: 2px solid var(--BtnBorder);
        background-color: var(--OrangeBtnColor)
    }

    
`;


const ExcelUpload = () => {

    const navigate = useNavigate('')
    const [csvData, setCsvData] = useState([]);
    const [allClassData, setAllClassData] = useState([]);
    const [allSectionData, setAllSectionData] = useState([]);
    // const [classNo, setClassNo] = useState();

    const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
        mode: 'onChange'
    });


    useEffect(() => {
        Download_Slip();
        getAllClassData()
    }, [])

    const handleClassChange = (val) => {
        const classNoVal = parseInt(val);
        setValue('classNo', classNoVal);
        const selectedClass = allClassData.find(c => c.classNo === classNoVal);

        if (selectedClass) {
            setAllSectionData(selectedClass.section || []);
        } else {
            setAllSectionData([]);
        }
    };

    const getAllClassData = async () => {
        try {
            var response = await getAllClassApi();
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    setAllClassData(response?.data?.classes);
                }
                else {
                    toast.error(response.data.message)
                }
            }
            else {
                toast.error(response.data.message)
            }
        }
        catch (error) {
            toast.error(response.data.message)
            console.log(error, 'error')
        }
    }

    const Download_Slip = async () => {
        try {
            const response = await DownloadStudentExcelForm();
            if (response?.status === 200) {
                const rows = response?.data?.split('\n').map(row => row.split(','));
                setCsvData(rows);
                // setTableData(rows.slice(1));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const AddStudentByCSV = async (data) => {
        try{
        const formData = new FormData();
        formData.append('csvFile', data.csvFile[0]);

        const response = await AddStudentByCSVApi(data.classNo, data.sectionName, formData);
        console.log(response, 'response');
        if (response?.status === 200) {
            toast.success(response?.data?.message)
            navigate('/allStudent')
        }
    }
        catch (err) {
        console.log(err);
    }
}

return (
    <>
        <Container>
            <div className="container-fluid">
                <div className="row">
                    <div className="pt-3">
                        <CSVLink className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 text-white' data={csvData} filename={"orders.csv"}>
                            Generate CSV File
                        </CSVLink>
                        {/* <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 text-white'>Generate CSV File</button> */}
                        <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn EyeViewBtnn font16 ms-2' data-bs-toggle="modal" data-bs-target="#abc">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1.6em" height="1.6em" viewBox="0 0 16 16"><g fill="white"><path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0" /><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7a3.5 3.5 0 0 0 0 7" /></g></svg>
                        </button>
                    </div>
                    <form className="row g-3 m-0" onSubmit={handleSubmit(AddStudentByCSV)}>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="classNo" className="form-label font14">Class</label>
                            <select id="classNo" className={`form-select font14 ${errors.classNo ? 'border-danger' : ''}`} {...register('classNo', { required: 'Class is required *' })} onChange={(e) => handleClassChange(e.target.value)}>
                                <option value="">Select Class</option>
                                {allClassData.map((classs) => (<option key={classs.classId} value={classs.classNo}> {classs.classNo} </option>))}
                            </select>
                            {errors.classNo && <p className="font12 text-danger">{errors.classNo.message}</p>}
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <label htmlFor="sectionName" className="form-label font14">Section</label>
                            <select id="sectionName" className={`form-select font14 ${errors.sectionName ? 'border-danger' : ''}`} {...register('sectionName', { required: 'Section is required *' })} >
                                <option value="">Select Section</option>
                                {allSectionData.map((section) => (<option key={section.classSecId} value={section.sectionName}> {section.sectionName} </option>))}
                            </select>
                            {errors.sectionName && <p className="font12 text-danger">{errors.sectionName.message}</p>}
                        </div>
                        <div className="col-md-12 col-sm-12 col-12">
                            <label htmlFor="csvFile" className="form-label font14">Upload CSV</label>
                            <input id="csvFile" type="file" className={`form-control font14 ${errors.csvFile ? 'border-danger' : ''}`} accept=".csv" onChange={(e) => setValue('csvFile', e.target.files)} {...register('csvFile', { required: 'CSV File is required *' })} />
                            {errors.csvFile && <p className="font12 text-danger">{errors.csvFile.message}</p>}
                        </div>
                        <button className='col-lg-2 col-md-3 col-sm-4 col-6 btn AddBtnn font16 text-white' type='submit'>+ Add Student</button>
                    </form>
                </div>
            </div>

            {/* Sample Modal Data Modal For View CSV Format */}
            <div className="modal modal-lg fade" id="abc" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title greyTextt fontWeight700 font16" id="exampleModalLabel">CSV Format</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body p-0">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th className='font14 fontWeight600'>S.No</th>
                                        <th className='font14 fontWeight600'>Student Name</th>
                                        <th className='font14 fontWeight600'>Father Name</th>
                                        <th className='font14 fontWeight600'>Student Email</th>
                                        <th className='font14 fontWeight600'>Student Phone</th>
                                        <th className='font14 fontWeight600'>Blood Group</th>
                                        <th className='font14 fontWeight600'>Gender</th>
                                        <th className='font14 fontWeight600'>Birthday</th>
                                        <th className='font14 fontWeight600'>Address</th>
                                        <th className='font14 fontWeight600'>Parent's Email</th>
                                        <th className='font14 fontWeight600'>Parent Phone</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className='font12'>1</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                    <tr>
                                        <td className='font12'>2</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                    <tr>
                                        <td className='font12'>3</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                        <td className='font12'>xxx</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </Container>
    </>
)
}

export default ExcelUpload

// , validate: (value) => { if (value.length > 0 && (value[0].size < 10240 || value[0].size > 204800)) { return 'File size must be between 10 KB to 200 KB'; } return true; }, 






















{/* <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Class*</label> // classNo
                                <input type="text" className="form-control font14" id="validationDefault02" placeholder="Select Class" required />
                            </div>
                            <div className="col-md-6 col-sm-12 col-12">
                                <label htmlFor="validationDefault01" className="form-label font14">Section*</label> // sectionName
                                <input type="text" className="form-control font14" id="validationDefault01" placeholder="Select Section" required />
                            </div>
                            <div className="col-md-12 col-sm-12 col-12">
                                <label htmlFor="validationDefault02" className="form-label font14">Upload CSV*</label> // csvFile
                                <input type="file" className="form-control font14" id="validationDefault02" placeholder="Select Class" required />
                            </div> */}
