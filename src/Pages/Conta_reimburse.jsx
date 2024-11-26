import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserReimbirmntGetAllApi } from '../Utils/Apis'
import { Conatct_reimbursement_GetById } from '../Utils/Apis'


const Conta_reimburse = ({ data }) => {

  const staffId = data.data;

  const MyUserID = localStorage.getItem('MyUserID');

  const [forDelete, setForDelete] = useState(false)
  const [hide, setHide] = useState(false)
  const [show, setShow] = useState(true)
  const [searchKey, setSearchKey] = useState('')
  const [showdelete, setShowdelete] = useState(true)
  const [hidedelete, setHidedelete] = useState(false)
  const [IdForDelete, setIdForDelete] = useState()
  const [IdForUpdate, setIdForUpdate] = useState()
  const [showadd, setShowadd] = useState(true)
  const [hideedit, setHideedit] = useState(false)
  const [status, setStatus] = useState()
  const [updateStatus, setUpdateStatus] = useState()


  console.log('true false', status)
  const [loader, setLoader] = useState(false)

  const [reimbursemntt, setReimbursemntt] = useState()
  const [title, setTtile] = useState()
  const [AmountOP, setAmountOP] = useState()
  const [Amount, setAmount] = useState()


  const [isValidReimbursemnttRequired, setIsValidReimbursemnttRequired] = useState(false);
  const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
  const [isValidAmountOptionRequired, setIsValidAmountOptionRequired] = useState(false);
  const [isValidAmountRequired, setIsValidAmountRequired] = useState(false);

  // ###### validation ##########
  const [errors, setErrors] = useState({});

  const FuncValidation = () => {

    // reimbursemntt
    if (reimbursemntt === "" || !reimbursemntt) {
      setIsValidReimbursemnttRequired(true)
    }
    else {
    }
    // title 
    if (title === "" || !title) {
      setIsValidTitleRequired(true)
    }
    else {
    }
    // AmountOP
    if (AmountOP === "" || !AmountOP) {
      setIsValidAmountOptionRequired(true)
    }
    else {
    }
    // Amount
    if (Amount === "" || !Amount) {
      setIsValidAmountRequired(true)
    }
    else {
    }
    return errors;
  }
  // reimbursemntt
  const handleReimbursemntt = (e2) => {
    setReimbursemntt(e2)
    const noRegex = /^[A-Za-z\s]+$/;
    setIsValidReimbursemnttRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidReimbursemnttRequired(true)
    } else {
      setIsValidReimbursemnttRequired(false)
    }
  }
  // title 
  const handletitle = (e2) => {
    setTtile(e2);
    const nameRegex = /^[A-Za-z\s]+$/;
    setIsValidTitleRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidTitleRequired(true)
    } else {
      setIsValidTitleRequired(false)
    }
  }
  // AmountOption 
  const handleAmountOP = (e2) => {
    setAmountOP(e2)
    const noRegex = /^\d+(\.\d{1,2})?$/;
    setIsValidAmountOptionRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidAmountOptionRequired(true)
    } else {
      setIsValidAmountOptionRequired(false)
    }
  }
  // amount 
  const handleAmount = (e2) => {
    setAmount(e2)
    const noRegex = /^\d+(\.\d{1,2})?$/;
    setIsValidAmountRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidAmountRequired(true)
    } else {
      setIsValidAmountRequired(false)
    }
  }

  // ###### validation ##########


  // User post Api 
  const ContactDataApi = async () => {
    if (FuncValidation()) {
      const formData = new FormData()
      formData.append('reimbursementOption', reimbursemntt);
      formData.append('amountOption', AmountOP);
      formData.append('title', title);
      formData.append('amount', Amount);

      setLoader(true)
      try {
        const response = await UserReimbirmntGetAllApi(MyUserID, formData);
        console.log('my staff post api response in REIMBRMNGTTTT', response)
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setStatus(response?.data?.status)
          // setFunction(response?.data?.otherstaff?.staffStatus)

          setLoader(false)
        } else {
          toast.error(response?.data?.message);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    MyStaffGetById()
  }, [])

  // Staff Get by id
  const MyStaffGetById = async () => {
    // setIdForUpdate(id);
    setLoader(true);
    try {
      const response = await Conatct_reimbursement_GetById(MyUserID);
      console.log("my reimbursement get by id api is here______________ ", response);
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setUpdateStatus(response?.data?.status);

        setReimbursemntt(response?.data?.reimbursement?.reimbursementOption);
        setTtile(response?.data?.reimbursement?.title);
        setAmountOP(response?.data?.reimbursement?.amountOption);
        setAmount(response?.data?.reimbursement?.amount);

        setLoader(false);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container-fluid px-0 mt-3">
        <div className="table-container  table-responsive">

          <table className="table table-sm ">
            <thead className=''>
              <tr className='heading-16 text-color-000 ' style={{ fontWeight: '500' }}>
                <th className='tableGreyBackgroundColor ps-4 pb-2' style={{ width: '25%' }}>Title</th>
                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Amount </th>
                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Reimbursement Option</th>
                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Amount Option</th>
              </tr>
            </thead>
            <tbody className='heading-14 align-middle greyTextColor greyText'>
              {/* <tr className='heading-14 ' >
                <td className=' greyText pe-0 ' style={{ width: '25%' }}>table</td>
                <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
                <td className=' greyText pe-0' style={{ width: '25%' }}>table</td>
              </tr> */}
            </tbody>
            <Toaster />
          </table>
        </div>

        <div>
          <div className="row px-3">
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Reimbursement Option</label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={reimbursemntt} onChange={(e) => handleReimbursemntt(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Reimbursement" />
              </div>
              <div className='pt-1'>
                {isValidReimbursemnttRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Valid amount is required
                  </p>
                )}
              </div>

              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Title * </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={title} onChange={(e) => handletitle(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Title" />
              </div>
              <div className='pt-1'>
                {isValidTitleRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Valid title is required
                  </p>
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 ">
              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Amount Option </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={AmountOP} onChange={(e) => handleAmountOP(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter amount" />
              </div>
              <div className='pt-1'>
                {isValidAmountOptionRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Valid amount is required
                  </p>
                )}
              </div>

              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Amount  </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={Amount} onChange={(e) => handleAmount(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter amount" />
              </div>
              <div className='pt-1'>
                {isValidAmountRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Valid amount is required
                  </p>
                )}
              </div>
            </div>

          </div>

        </div>
        <div className="row mt-4 buttons-topss text-center">
          <div className='my-button11 heading-14'>
            {
              updateStatus === "success"
                ?
                <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" onClick={ContactDataApi}>Update</button>
                :
                <button type="button heading-14" class="btn btn-outline-success my-green heading-14 me-1" onClick={ContactDataApi}>Submit</button>

            }
            <button type="button" class="btn btn-outline-success heading-14">Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Conta_reimburse
