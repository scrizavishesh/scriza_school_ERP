import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import { AddUpdateMarksApi } from '../../Utils/Apis';
import toast, { Toaster } from 'react-hot-toast';

const Container = styled.div`
    
    .form-control::placeholder, .form-control{
        color: var(--greyState);
        box-shadow: none;
        border-color: var(--greyBorder);
    }

    .table-striped>tbody>tr:nth-of-type(odd)>* {
        --bs-table-bg-type: var(--tableGreyBackgroundColor);
    }
    
    .creamBg{
        border: 1px dashed var(--tableTopHeadingBorder);
        background-color: var(--tableTopHeadingBg);
    }

    .creamBgtext{
        color: var(--tableTopHeadText);
    }

    .tableHeading{
        background-color: var(--tableheadingbg) !important;
    }

    .heightOfTable{
        height: 37vh ;
        overflow: scroll;
    }

    .heightOfTable::-webkit-scrollbar {
        display: none;
    }


`;

const MarksTable = ({ marksData, className, sectionName, subjectName, sessionSelect, examCategorySelect, ReloadMarksData, totalMarksForExam }) => {

    const [Marks, setMarks] = useState('');
    const [Comments, setComments] = useState('');
    const [ExamCategory, setExamCategory] = useState('');
    const [ClassId, setClassId] = useState('');
    const [SectionId, setSectionId] = useState('');
    const [SubjectId, setSubjectId] = useState('');
    const [StudentId, setStudentId] = useState('');
    const [SessionName, setSessionName] = useState('');

    useEffect(() => {
        setMarksUpdateData(marksData)
    }, [marksData])

    const [MarksUpdateData, setMarksUpdateData] = useState([{
        gainMarks: '',
        comments: ''
    }])

    const handleCheckboxChange = async (i, e) => {
        const value = [...MarksUpdateData];
        value[i][e.target.name] = e.target.value;
        setMarksUpdateData(value);
    };

    const SaveOrUpdateMarksData = async (markId, examCategory, classId, sectionId, subjectId, studentId, sessionName) => {
        setExamCategory(examCategory);
        setClassId(classId);
        setSectionId(sectionId);
        setSubjectId(subjectId);
        setStudentId(studentId);
        setSessionName(sessionName);
        try {
            const formData = new FormData();
            formData.append('markId', markId)
            formData.append('categoryName', examCategory)
            formData.append('classId', classId)
            formData.append('sectionId', sectionId)
            formData.append('subjectId', subjectId)
            formData.append('studentId', studentId)
            formData.append('sessionName', sessionName)
            formData.append('marks', Marks)
            formData.append('comments', Comments)

            var response = await AddUpdateMarksApi(formData);
            if (response?.status === 200) {
                if (response?.data?.status === 'success') {
                    toast.success(response?.data?.message)
                    ReloadMarksData(true);
                }
                else{
                    toast.blank(response?.data?.message)
                }
            }
        }
        catch {

        }
    }

    console.log(totalMarksForExam)

    return (
        <>
            <Container>
                <div className="container-fluid pt-3">
                    <div className="row creamBg p-3 mb-4">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center ">
                                    <p className="m-0 text-wrap"><span className='creamBgtext font14'>Exam </span><span className='text-black font14 text-break'>- {examCategorySelect}</span></p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center ">
                                    <p className="m-0 text-wrap"><span className='creamBgtext font14'>Class </span><span className='text-black font14 text-break'>- {className}</span></p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center ">
                                    <p className="m-0 text-wrap"><span className='creamBgtext font14'>Section </span><span className='text-black font14 text-break'>- {sectionName}</span></p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center ">
                                    <p className="m-0 text-wrap"><span className='creamBgtext font14'>Total Marks </span><span className='text-black font14 text-break'>- {totalMarksForExam}</span></p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center ">
                                    <p className="m-0 text-wrap"><span className='creamBgtext font14'>Subject </span><span className='text-black font14 text-break'>- {subjectName}</span></p>
                                </div>
                                <div className="col-12 col-sm-6 col-md-2 mb-2 d-flex flex-column text-center ">
                                    <p className="m-0 text-wrap"><span className='creamBgtext font14'>Session </span><span className='text-black font14 text-break'>- {sessionSelect}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="overflow-scroll">
                        <table className="table align-middle table-striped">
                            <thead>
                                <tr>
                                    <th className='tableHeading text-center'><span className='font16'>#</span></th>
                                    <th className='tableHeading '><span className='font16'>Student Name</span></th>
                                    <th className='tableHeading '><span className='font16'>Mark</span></th>
                                    <th className='tableHeading '><span className='font16'>Grade Point</span></th>
                                    <th className='tableHeading '><span className='font16'>Comment</span></th>
                                    <th className='tableHeading text-center'><span className='font16'>Action</span></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                                {MarksUpdateData.map((item, index) => (
                                    <tr>
                                        <th className='text-center greyText'><span className='font14'>{index + 1}</span></th>
                                        <td className='greyText'>
                                            <span className='font14 align-self-center' name={item?.studentName}>{item?.studentName}</span>
                                        </td>
                                        <td className='greyText'>
                                            <input type="text" className="form-control font14" id="formControlInput1" value={item?.gainMarks} name='gainMarks' onChange={(e) => { setMarks(e.target.value), handleCheckboxChange(index, e) }} />
                                        </td>
                                        <td className='greyText'>
                                            <input type="text" className="form-control font14" id="formControlInput1" value={item?.gradePoints} name={item?.gradePoints} disabled />
                                        </td>
                                        <td className='greyText'>
                                            <input type="text" className="form-control font14" id="formControlInput1" value={item?.comments} name='comments' onChange={(e) => { setComments(e.target.value), handleCheckboxChange(index, e) }} />
                                        </td>
                                        <td className='text-center'>
                                            <button className='btn CorrectSignButtons'><Icon icon="charm:circle-tick" width="1.5em" height="1.5em" style={{ color: 'white' }} onClick={() => { SaveOrUpdateMarksData(item?.markId, item?.examCategory, item?.classId, item?.sectionId, item?.subjectId, item?.studentId, item?.sessionName) }} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Toaster />
                </div>
            </Container>
        </>
    )
}

export default MarksTable
