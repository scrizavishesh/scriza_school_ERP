import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { UserAllowanceGetAllApi } from '../Utils/Apis'
import { Conatct_allowance_getById } from '../Utils/Apis'
import { Conatct_allowance_PutApi } from '../Utils/Apis'

const Conta_allown = ({ data }) => {

  const { transferId, myUserId } = data;

  const staffId = transferId;
  const userId = myUserId;
  const MyUserID = localStorage.getItem('MyUserID');

  console.log('child to child data in state nowwwwww', staffId)

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


  const [allowance, setAllowance] = useState()
  const [title, setTtile] = useState()
  const [AmountOption, setAmountOption] = useState()
  const [Amount, setAmount] = useState()
  const [updateStatus, setUpdateStatus] = useState()

  console.log('true false', status)
  const [loader, setLoader] = useState(false)

  const [isValidAllowanceRequired, setIsValidAllowanceRequired] = useState(false);
  const [isValidTitleRequired, setIsValidTitleRequired] = useState(false);
  const [isValidAmountOptionRequired, setIsValidAmountOptionRequired] = useState(false);
  const [isValidAmountRequired, setIsValidAmountRequired] = useState(false);

  // ###### validation ##########
  const [errors, setErrors] = useState({});

  const FuncValidation = () => {

    // allowance
    if (allowance === "" || !allowance) {
      setIsValidAllowanceRequired(true)
    }
    else {
    }
    // title 
    if (title === "" || !title) {
      setIsValidTitleRequired(true)
    }
    else {
    }
    // AmountOption
    if (AmountOption === "" || !AmountOption) {
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

  // allowance
  const handleallowance = (e2) => {
    setAllowance(e2)
    const noRegex = /^[A-Za-z]+$/;
    setIsValidAllowanceRequired(noRegex.test(e2));
    if (e2 === "" || !noRegex.test(e2)) {
      setIsValidAllowanceRequired(true)
    } else {
      setIsValidAllowanceRequired(false)
    }
  }
  // title 
  const handletitle = (e2) => {
    setTtile(e2);
    const nameRegex = /^[A-Za-z]+$/;
    setIsValidTitleRequired(nameRegex.test(e2));
    if (e2 === "" || !nameRegex.test(e2)) {
      setIsValidTitleRequired(true)
    } else {
      setIsValidTitleRequired(false)
    }
  }
  // AmountOption 
  const handlehourHyRate = (e2) => {
    setAmountOption(e2)
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
      formData.append('allowanceOption', allowance);
      formData.append('amountOption', AmountOption);
      formData.append('title', title);
      formData.append('amount', Amount);

      setLoader(true)
      try {
        const response = await UserAllowanceGetAllApi(MyUserID, formData);
        // console.log('my staff post api response in ALLOWANCE', response)
        if (response?.data?.status === "success") {
          toast.success(response?.data?.message);
          setStatus(response?.data?.status)

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
      const response = await Conatct_allowance_getById(MyUserID);
      console.log("my allowance get by id api is here______________ ", response); 
      if (response?.status === 200) {
        // toast.success(response?.data?.msg);
        setUpdateStatus(response?.data?.status);

        setAllowance(response?.data?.allowance?.allowanceOption);
        setTtile(response?.data?.allowance?.title);
        setAmountOption(response?.data?.allowance?.amountOption);
        setAmount(response?.data?.allowance?.amount);
       

        // setRoleID(response?.data?.user?.staffGender);
        setLoader(false);
      } else {
        toast.error(response?.data?.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // allowance Put api
  const MyStaffePutApi = async () => {

    if (FuncValidation()) {
      const formData = new FormData();

      formData.append('allowanceOption', allowance);
      formData.append('amountOption', AmountOption);
      formData.append('title', title);
      formData.append('amount', Amount);
      setLoader(true);

      try {
        const response = await Conatct_allowance_PutApi(MyUserID, formData);
        console.log("My conatct in conatct put api 000000", response);
        if (response?.status === 200) {
          toast.success(response?.data?.message);
          setShow(false);
          // MyTeacherGetAllApi();
          setLoader(false);
        } else {
          toast.error(response?.data?.message);
          setShow(true);
        }
      } catch (error) {
        console.log(error);
      }
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
                <th className='tableGreyBackgroundColor p-2' style={{ width: '25%' }}>Allowance Option</th>
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
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color"> Allowance Option </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={ allowance} onChange={(e) => handleallowance(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter amount" />
              </div>
              <div className='pt-1'>
                {isValidAllowanceRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Valid allowance is required
                  </p>
                )}
              </div>
              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label    heading-14 label-color">Title * </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={ title} onChange={(e) => handletitle(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter Title" />
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
                <label for="exampleFormControlInput1" className="form-label  heading-14 label-color">Amount Option </label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={ AmountOption} onChange={(e) => handlehourHyRate(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter amount" />
              </div>
              <div className='pt-1'>
                {isValidAmountOptionRequired && (
                  <p className='ms-1' style={{ color: 'red', fontSize: '14px', marginTop: '-18px' }}>
                    Valid amount is required
                  </p>
                )}
              </div>
              <div className="mb-3  pt- for-media-margin">
                <label for="exampleFormControlInput1" className="form-label  heading-14 label-color">Amount</label>
                <input type="text" className="form-control form-focus-input form-control-sm heading-14 grey-input-text-color input-border-color" value={ Amount} onChange={(e) => handleAmount(e.target.value)} style={{ borderRadius: '5px', marginTop: '-5px' }} id="exampleFormControlInput12" placeholder="Enter amount" />
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

export default Conta_allown
