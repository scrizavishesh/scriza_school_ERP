import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { addNewFeeMasterApi, getAllFeeGroupApi, getAllFeeTypeApi } from '../../Utils/Apis';

const AddFeeMaster = () => {


    const handleFineTypeChange = () => {

    }

    return (
        <div className="container-fluid p-0">
            <div className="row">
                <form onSubmit={handleSubmit(AddNewFeeMaster)}>
                    <div className="mb-3">
                        <label htmlFor="inputEmail4" className="form-label font14">Fee Group</label>
                        <select id="feeGroup" className={`form-select font14 ${errors.feeGroup ? 'border-danger' : ''}`} {...register('feeGroup', { required: 'Fee Group is required *' })} >
                            <option value="">--- Select ---</option>
                            {FeeGroupData.map((option) => (
                                <option key={option.feeGroupId} value={option.feeGroupName}>{option.feeGroupName}</option>
                            ))}
                        </select>
                        {errors.feeGroup && <p className="font12 text-danger">{errors.feeGroup.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail4" className="form-label font14">Fee Type</label>
                        <select id="feeType" className={`form-select font14 ${errors.feeType ? 'border-danger' : ''}`} {...register('feeType', { required: 'Fee Type is required *' })} >
                            <option value="">--- Select ---</option>
                            {FeeTypeData.map((option) => (
                                <option key={option.feeTypeId} value={option.feeTypeCode}>{option.feeTypeName}</option>
                            ))}
                        </select>
                        {errors.feeType && <p className="font12 text-danger">{errors.feeType.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label font14">Due Date</label>
                        <input id="date" type="date" className={`form-control font14 ${errors.date ? 'border-danger' : ''}`} {...register('date', { required: 'Due Date is required *', validate: validateDate })} />
                        {errors.date && <p className="font12 text-danger">{errors.date.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail4" className="form-label font14">Amount</label>
                        <input id="amount" type="number" className={`form-control font14 ${errors.amount ? 'border-danger' : ''}`} placeholder='Enter Amount' {...register('amount', { required: 'Amount is required *', min: { value: 0, message: 'Amount cannot be negative' } })} />
                        {errors.amount && <p className="font12 text-danger">{errors.amount.message}</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputEmail4" className="form-label font14">Fine Type</label>
                        <div className="d-flex justify-content-between">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="" disabled readOnly />
                                <label className="form-check-label font14" htmlFor="exampleRadios3">
                                    None
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="Percentage" onChange={(e) => handleFineTypeChange(e.target.value)} />
                                <label className="form-check-label font14" htmlFor="exampleRadios1">
                                    Percentage
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="FixedAmount" onChange={(e) => handleFineTypeChange(e.target.value)} />
                                <label className="form-check-label font14" htmlFor="exampleRadios2">
                                    Fixed Amount
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label font14">Percentage</label>
                                <input id="percentage" type="number" className={`form-control font14 ${errors.percentage ? 'border-danger' : ''}`} placeholder="Enter Percentage" {...register('percentage', { required: 'Fee Type Name is required *' })} />
                                {errors.percentage && <p className="font12 text-danger">{errors.percentage.message}</p>}
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label font14">Fix Amount</label>
                                <input id="fineAmount" type="number" className={`form-control font14 ${errors.fineAmount ? 'border-danger' : ''}`} placeholder='Enter Fine Amount' {...register('fineAmount', { required: 'Amount are required *', min: { value: 0, message: 'Amount cannot be negative' } })} />
                                {errors.fineAmount && <p className="font12 text-danger">{errors.fineAmount.message}</p>}
                            </div>
                        </div>
                    </div>
                    <p className='text-center p-3'>
                        <button className='btn addButtons font14 text-white me-2' type='submit'>Add Fee Master</button>
                        <button className='btn cancelButtons font14' type='button' data-bs-dismiss="offcanvas" aria-label="Close">Cancel</button>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default AddFeeMaster