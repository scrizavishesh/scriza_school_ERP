import axios from 'axios'
const token = `Bearer ${localStorage.getItem('token')}`;
const forgetTooken = `Bearer ${localStorage.getItem('forgteToken')}`;
// const token = localStorage.getItem('token');

// const Domain= 'http://192.168.20.109:5000';
const Domain= 'https://www.auth.edu2all.in';
// const Domain= 'http://auth.edu2all.in:5000';

// // ***************************************************************************************
//                             // Login  //
// // ***************************************************************************************


// export const loginApi = async(data) => {
//     var res = await axios.post(`${Domain}/login/all`,data);
//     if (res) {
//         return res;
//     }else{
//        return [];
//     }
// }

// export const logoutApi = async() => {
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.delete(`${Domain}/login/logout`);
//     if (res) {
//         return res;
//     }else{
//        return [];
//     }
// }

// // ***************************************************************************************
//                             // Forget Password  //
// // ***************************************************************************************


// export const getOTPByMailApi = async(mail) => {
//     var res = await axios.post(`${Domain}/login/getOtp?email=${mail}`);
//     if (res) {
//         return res;
//     }else{
//        return [];
//     }
// }


// export const verifyOTPApi = async(OTP) => {
//     console.log(OTP);
//     axios.defaults.headers.common["Authorization"] = forgetTooken;
//     var res = await axios.post(`${Domain}/login/verify-otp?OTP=${OTP}`);
//     if (res) {
//         return res;
//     }else{
//        return [];
//     }
// }

// export const setPassApi = async(newpass) => {
//     axios.defaults.headers.common["Authorization"] = forgetTooken;
//     var res = await axios.post(`${Domain}/login/setPassword?password=${newpass}`);
//     if (res) {
//         return res;
//     }else{
//        return [];
//     }
// }

// ***************************************************************************************
                            // Dashboard  //
// ***************************************************************************************




export const getSuperAdminProfileApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getSuperAdmin`);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const getAdminProfileApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getAdminById`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getTeacherProfileApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/otherStaff/getUserByToken`);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const getParentProfileApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getParentByStudent`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getStudentProfileApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getByStdId`);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const getDashDataApi = async() => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getDashData`);

    if (res) {
        return res;
    }else{
       return [];
    }
}



// ***************************************************************************************
                            // School  //
// ***************************************************************************************


export const getSchoolDataApi = async(searchKeyData, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getAllSchool?searchKey=${searchKeyData}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const getSchoolDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getSchoolById?schoolBusinessId=${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewSchoolApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/sch/addSchool`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateSchoolApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/sch/editBySuperAdmin/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deleteSchoolApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/sch/deleteById?schoolId=${id}`);
    if (res) {
        return res;
    }else{
        return [];
    }
}

export const updateSpecialFeatureInSchoolApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/plan/addFeaByPlanId/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}


// ***************************************************************************************
                            // Plan // Package  //
// ***************************************************************************************


export const getAllPlanApi = async(searchKeyData, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getAllPlan?searchKey=${searchKeyData}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getPlanByIdApi = async(id) => {
    console.log(id, 'iddddd')
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getById?planId=${id}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updatePlanApi = async (id,data) => {
    console.log(data, 'data')
    console.log(id, 'id')
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/plan/editById/${id}`, data);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deletePlanApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/plan/deleteById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewPackageApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/plan/addPlans`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

// ***************************************************************************************
                            // Special Features  //
// ***************************************************************************************


export const getPlanInFeatureApi = async(planId, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/addFeaByPlanId/${planId}`, data);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getAllSpeFeatApi = async(searchKeyData, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getAllFeatures?searchKey=${searchKeyData}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}



export const getAllActiveInActiveSpeFeatApi = async(planIdd) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getActiveUnActiveByPlan?planId=${planIdd}`);

    if (res) {
        console.log(res)
        return res;
    }else{
        console.log(res)
       return [];
    }
}

export const getSpeFeaByIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/fea/getByFeaId/${id}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const getPermBySpeFeaIdApi = async(id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/per/getAllPerByFeaId?featureId=${id}`);

    if (res) {
        return res;
    }else{
       return [];
    }
}

export const updateSpeFeaNameApi = async(id , data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/fea/editByFeaId/${id}`, data);

    if (res) {
        return res;
    }else{
       return [];
    }
}


export const addNewSpecialFeatureApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/fea/addFeature`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const addNewFeaPerApi = async (data, id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/per/addPermission/${id}`, data );
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deletePerByidApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/per/deleteById?permissionId=${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}

export const deleteSpeFeaByidApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/fea/deleteById/${id}`);
    if (res) {
        return res;
    }else{
       return [];
    }
}













// ***************************************************************************************************************************

        // Saqib Code 

// ***************************************************************************************************************************


// import axios from 'axios'
// const token = ` Bearer ${localStorage.getItem('token')}`;
// console.log('my-token',token)

// const Domain= 'http://auth.edu2all.in:5000';
// const Domain= 'http://192.168.20.109:5000';
// const newngrok2= 'https://ab50-122-176-144-184.ngrok-free.app';

// ***************************************************************************************
                            // Login  //
// ***************************************************************************************


// export const loginApi = async(data) => {

//     let res = await axios.post(`${Domain}/login/all`,data);

//     if (res) {
//         return res;
//     }else{
//        return [];
//     }
// }

// ################### Subscription Apis start ####################### 

// GetAll 

export const GetApi = async(searchKey,pageNo,pageSize,startDate,endDate) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/subs/getAllSubs?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&startDate=${startDate}&lastDate=${endDate}`)

//    console.log('my-response', res)
   if(res) {
    return res;
   }
   else{
    return []
   }
}
// delete Api 

export const SubscriptionDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/subs/deleteById/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Get By id 

export const SubscriptionGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/subs/getBySubsId/${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Put Api 

export const SubscriptionPutApi = async(id,datares) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/subs/editBySubsId/${id}`,datares)
   
   // console.log('my-response-get-by-id-suscription', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}
// Get data Api from Plan modules __________

export const PlanGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/plan/getAllPlan?pageNo=1&pageSize=4`)
   
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// ################### Subcription Apis  end  ####################### 




// ################### Request Apis ####################### 

// Get all api 
export const RequestGetApi = async(searchKey,pageNo,pageSize,startDate,endDate) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/request/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&startDate=${startDate}&lastDate=${endDate}`)
   // console.log(res2)
   if(res) {
    return res;
   }
   else{
    return []
   }
}

// resqust delete api 
export const RequestDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/request/delete?reqId=${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Get by id 
export const RequestGetByIdApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.get(`${Domain}/request/getRequests?reqId=${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// Put Data Api 
export const RequestPutApi = async(id,datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.put(`${Domain}/request/viewId/${id}`, datares)
   console.log('my-response-get-by-id', res2)

   if(res2) {
    return res2;
   }
   else{
    return []
   }
}

// request update
export const RequestUpdatePutApi = async(datares) =>{
   axios.defaults.headers.common["Authorization"] = token;
  const res2= await axios.put(`${Domain}/request/update`, datares)
  console.log('my-response-get-by-id', res2)

  if(res2) {
   return res2;
  }
  else{
   return []
  }
}


// ################### Request Apis end  ####################### 








// ################### specialfeature and addon Apis start  ####################### 

// GetAll 

export const SpecialFeaGetApi = async() =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res= await axios.get(`${Domain}/fea/getAllFeatures`)
   
//    console.log('my-response', res)

   if(res) {
    return res;
   }
   else{
    return []
   }
}

// delete Api 

export const SpecialFeaDeleteApi = async(id) =>{
    axios.defaults.headers.common["Authorization"] = token;
   const res2= await axios.delete(`${Domain}/fea/deleteById?feaId=${id}`)
   if(res2) {
    return res2;
   }
   else{
    return []
   }
}



// ################### specialfeature and addon Apis end  ####################### 














//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












// import axios from 'axios'
// const token = `Bearer ${localStorage.getItem('token')}`;
// const forgetTooken = `Bearer ${localStorage.getItem('forgetToken')}`;
// const token = localStorage.getItem('token');

// const Domain= 'http://192.168.20.109:5000'; // Girjesh
// const Domain= 'http://192.168.20.151:5001'; // Aniket
// const Domain = 'https://www.auth.edu2all.in';
// const Domain= 'http://auth.edu2all.in:5000';

// ******************************************************************************************************
// Login  //
// ******************************************************************************************************


export const loginApi = async (data) => {
    var res = await axios.post(`${Domain}/login/all`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const logoutApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/login/logout`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Forget Password  //
// ******************************************************************************************************


export const getOTPByMailApi = async (mail) => {
    var res = await axios.post(`${Domain}/login/getOtp?email=${mail}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const verifyOTPApi = async (OTP) => {
    // axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/verify-otp?OTP=${OTP}`
        , {},
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': forgetTooken
            }
        });
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const setPassApi = async (newpass) => {
    axios.defaults.headers.common["Authorization"] = forgetTooken;
    var res = await axios.post(`${Domain}/login/setPassword?password=${newpass}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
// Dashboard  //
// ******************************************************************************************************




export const getAdminDashDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getDashboardData`);

    if (res) {
        return res;
    } else {
        return [];
    }
}



export const getAttendanceGraphDataApi = async (graphKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/attendance/stuAttendanceGraph?graphKey=${graphKey}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Student  //
// ******************************************************************************************************


export const getStudentDataApi = async (classNo, classSec, searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getAllScClSec?classNo=${classNo}&classSec=${classSec}&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}



export const getStudentDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/getStudentById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const addNewStudentApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/regStudent`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateStudentApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/updateStudent/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteStudentApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/student/deleteByStId/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const DownloadStudentExcelForm = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/emptyCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const AddStudentByCSVApi = async (classNo, sectionName, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/student/importStudentCSV?classNo=${classNo}&sectionName=${sectionName}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const DownloadStudentFeeDataCSV = async (studentId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/csv/${studentId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadStudentFeeDataPDF = async (studentId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/pdf/${studentId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// Assign Student  //
// ******************************************************************************************************

export const getAssignStudentDataApi = async (searchKey, pageNo, pageSize) => {

    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getAllAssignStudent?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const unAssignStudentApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/unAssignStudent`, data);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const assignStudentApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/assignStudent`, data);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadVehicleStudentsPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehicleStudentPDF`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadVehicleStudentsExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehicleStudentCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Room  //
// ******************************************************************************************************

export const getRoomDataApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/room/getAllRoomBySchId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
// Vehicle  //
// ******************************************************************************************************

export const getVehicleDataApi = async (searchKey, pageNo, pageSize) => {

    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getAllVehByScId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const AddNewVehicleApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/vehicle/addVehicle`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteVehicleApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/vehicle/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



export const getVehicleDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/getVehicleById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateVehicleDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/vehicle/updateVehicle/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadVehicleExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehicleStudentCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadVehiclePDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/vehicle/vehiclePDF`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Driver  //
// ******************************************************************************************************

export const getDriverDataApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/getAllDriver?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadDriverPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverPDF`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadDriverExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewDriverApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/drivers/addDriver`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getDriverDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/getDriverById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateDriverDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/drivers/updateDriver/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteDriverApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/drivers/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Route  //
// ******************************************************************************************************

export const getAllRouteApi = async (search, page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/route/getAllRoutByScId?searchKey=${search}&page=${page}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewRouteApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/route/addRoute`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getRouteCSVDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getRouteDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/route/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateRouteDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/route/updateById/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteRouteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/route/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const DownloadRouteExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Drop Point  //
// ******************************************************************************************************


export const addNewDropPointApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/drop/addDrop`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getAllDropPointByVehicleApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getAllDropByVehicle?vehicleNo=${data}`, data);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getAllDropPointApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getAllSch?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getDropPointCSVDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drivers/driverCSV`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getDropPointDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/drop/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateDropPointDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/drop/editDrop/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteDropPointApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/drop/deleteDrop/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Class  //
// ******************************************************************************************************



export const getAllClassApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/class/getAllClassBySchId`);

    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Section  //
// ******************************************************************************************************



export const getAllSectionApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/section/getAllSecByStudent`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getAllSectionByClassApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/section/getByClassId?classNo=${data}`,);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Subject  //
// ******************************************************************************************************


export const getAllSubjectApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubjectBySchId`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getAllSubjectByClassApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Teacher By Subject  //
// ******************************************************************************************************



export const getTeacherBySubjectApi = async (id1, id2) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${id1}&subjectId=${id2}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
// Session  //
// ******************************************************************************************************



export const getAllSessionDataAPI = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/session/getAllSessionBySchId`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteSessionApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/session/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const activeSessionDataApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/activeSession/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const addNewSessionApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/session/addSession`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getSessionDataByIdAPI = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/session/getSessionById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const updateSessionApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/session/editSession/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Grade  //
// ******************************************************************************************************

export const getGradeDataApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/grades/getAllCategory?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewGradeApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/grades/addGrade`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getGradeDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/grades/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateGradeByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/grades/modify${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteGradeApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/grades/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// ExamCategory  //
// ******************************************************************************************************

export const getExamCategoryDataApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_category/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewExamCategoryApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/exam_category/add`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getExamCategoryDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_category/getOne/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateExamCategoryDataApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/exam_category/modify/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteExamCategoryApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/exam_category/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}





// ******************************************************************************************************
// Marksheet  //
// ******************************************************************************************************

export const getAllMarksheetDataAPI = async (sectionId, classId, categoryName, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/markSheet/search?sectionId=${sectionId}&classId=${classId}&categoryName=${categoryName}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Promotion  //
// ******************************************************************************************************

export const getAllPromotedStudentsDataAPI = async (nextSession, prevSectionId, nextSectionId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/promotion/promoteAll?nextSession=${nextSession}&prevSectionId=${prevSectionId}&nextSectionId=${nextSectionId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}





// ******************************************************************************************************
// SamplePaper  //
// ******************************************************************************************************

export const getSearhSamplePaperDataApi = async (id1, id2, id3, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/search-paper?classId=${id1}&sectionId=${id2}&subjectId=${id3}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getDownloadSamplePaperDataApi = async (id, BlobData) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/download-sample/${id}`, BlobData);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const deleteSamplePaperApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/samplePaper/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addSamplePaperApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/samplePaper/create`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateSamplePaperApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/samplePaper/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadSamplePaperPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Admin Account  //
// ******************************************************************************************************

export const AdminAccountApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/settings/updateAdmin`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getAdminDataAPI = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/admin/getAdminById`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getSamplePaperByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadSamplePaperExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Assignment  //
// ******************************************************************************************************

export const getSearhAssignmentDataApi = async (searchKey, id1, id2, id3, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/search-Assignment?searchKey=${searchKey}&classId=${id1}&sectionId=${id2}&subjectId=${id3}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getAssignmentByIdDataApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getAllSubmissionsByAssignmentIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/submission/getAll/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getDownloadAssignmentDataApi = async (id, BlobData) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/download-Assignment/${id}`, BlobData);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const deleteAssignmentApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/assignment/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



export const addNewAssignmentAPI = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/assignment/create`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const EditNewAssignmentAPI = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/assignment/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadAssignmentExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadAssignmentPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Marks  //
// ******************************************************************************************************



export const getAllMarksApi = async (classId, sectionId, subjectId, sessionName, examCategory) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/all?classId=${classId}&sectionId=${sectionId}&subjectId=${subjectId}&sessionName=${sessionName}&examCategory=${examCategory}`,);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const AddUpdateMarksApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/marks/assign`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Offline Exam  //
// ******************************************************************************************************



export const getAllOfflineExamApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getSearchOfflineExamApi = async (data, data2) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/search-exam?classId=${data}&subjectId=${data2}`,);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const deleteOfflineExamApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/exam_details/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getOfflineExamDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/getOne/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewOfflineExamApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/exam_details/register`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateOfflineExamApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/exam_details/modify/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// Subscription  //
// ******************************************************************************************************


export const getSubscriptionByIdApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subs/getBySchoolId`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateSubscriptionApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/settings/upgradeSubs/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getAllPlansApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/plan/getAllPlan`);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// School Data  //
// ******************************************************************************************************



export const getSchoolDataByIdAPI = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/sch/getSchoolByAdmin`,);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateSchoolDataByIdAPI = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/settings/editById`, data);

    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// Dashboard Data  //
// ******************************************************************************************************



export const getAllNoticeApi = async (searchKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/allNotice?searchKey=${searchKey}`,);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getAllEventsApi = async (searchKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?searchKey=${searchKey}`,);

    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Fee Type  //
// ******************************************************************************************************


export const getAllFeeTypeApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/type/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewFeeTypeApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/type/addFeeType`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeTypeByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/type/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateFeeTypeByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/type/updateById/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteFeeTypeByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/type/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeTypeExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/type/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeTypePDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/type/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// Fee Group  //
// ******************************************************************************************************


export const getAllFeeGroupApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewFeeGroupApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/group/addGroup`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeGroupByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateFeeGroupByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/group/updateFeeGroup/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteFeeGroupByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/group/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeGroupExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeGroupPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/group/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Fee Master  //
// ******************************************************************************************************


export const getAllFeeMasterApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewFeeMasterApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/master/add`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const addNewFeeApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/feePay/updateById/${id}`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeByPaymentIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByPaymentId?paymentId=${id}`);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeMasterByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getFeeMasterByGroupNameApi = async (groupName) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/getByGroupName/${groupName}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateFeeMasterByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/master/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteFeeMasterByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/master/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteFeeMasterByGroupNameApi = async (name) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/master/deleteByGroupName/${name}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeMasterExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeMasterPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/master/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Fee Discount  //
// ******************************************************************************************************


export const getAllFeeDiscountApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewFeeDiscountApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/discount/add`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getFeeDiscountByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/getById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateFeeDiscountByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/discount/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteFeeDiscountByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/discount/deleteById/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeDiscountExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadFeeDiscountPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/discount/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Collect Fees  //
// ******************************************************************************************************


export const getCollectedStudentsFeeApi = async (classId, classSectionId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByClassSec?classId=${classId}&classSectionId=${classSectionId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getCollectedStudentFeeByIdApi = async (studentId, size, page) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByStId/${studentId}?size=${size}&page=${page}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getExamDetailsByIdApi = async (studentId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-all-marks?studentId=${studentId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getCbseExamDetailsByIdApi = async (studentId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-cbse?studentId=${studentId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getDueFeesApi = async (feeCode, classNo, section) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getPendingFee?feeCode=${feeCode}&classNo=${classNo}&section=${section}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadDueFeesExcel = async (feeCode, classNo, section) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getPendingFeeCSV?feeCode=${feeCode}&classNo=${classNo}&section=${section}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadDueFeesPDF = async (feeCode, classNo, section) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getPendingFeePDF?feeCode=${feeCode}&classNo=${classNo}&section=${section}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}






// ******************************************************************************************************
// Issue Item Inventory  //
// ******************************************************************************************************


export const getAllIssueItemApi = async (searchByKey, page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/getAll?searchKey=${searchByKey}&page=${page}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewIssueItemApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/itemIssue/issue`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const DownloadIssueItemExcel = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/csv`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadIssueItemPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/pdf`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const returnItemApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/itemIssue/oneClickReturn/${id}`);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getIssueItemByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemIssue/getOne/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateIssueItemByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/group/updateFeeGroup/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteIssueItemByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/itemIssue/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Item Inventory  //
// ******************************************************************************************************


export const getAllItemApi = async (page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/item/getAll?page=${page}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewItemApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/item/add`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getItemByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/item/getOne/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateItemByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/item/modify/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteItemByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/item/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// export const DownloadItemExcel = async () => {
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.get(`${Domain}/assignment/csv`);
//     if (res) {
//         return res;
//     }else{
//         return [];
//     }
// }

// export const DownloadItemPDF = async () => {
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.get(`${Domain}/assignment/pdf`);
//     if (res) {
//         return res;
//     }else{
//         return [];
//     }
// }



// ******************************************************************************************************
// Item Stock Inventory  //
// ******************************************************************************************************


export const getAllItemStockApi = async (page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemStock/getAll?page=${page}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const addNewItemStockApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/itemStock/add`, data);
    if (res) {
        return res;
        FeeType
        return [];
    }
}

export const getItemStockByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemStock/getOne/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateItemStockByIdApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/itemStock/update/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const deleteItemStockByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.delete(`${Domain}/itemStock/delete/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

// export const DownloadItemStockExcel = async () => {
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.get(`${Domain}/assignment/csv`);
//     if (res) {
//         return res;
//     }else{
//         return [];
//     }
// }

// export const DownloadItemStockPDF = async () => {
//     axios.defaults.headers.common["Authorization"] = token;
//     var res = await axios.get(`${Domain}/assignment/pdf`);
//     if (res) {
//         return res;
//     }else{
//         return [];
//     }
// }






// ******************************************************************************************************
// Item Category Inventory  //
// ******************************************************************************************************


export const getAllItemCategoryApi = async (page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemCategory/getAll?page${page}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Item Supplier Inventory  //
// ******************************************************************************************************


export const getAllItemSupplierApi = async (page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemSupplier/getAll?page${page}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Item Store Inventory  //
// ******************************************************************************************************


export const getAllItemStoreApi = async (page, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/itemStore/getAll?page${page}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// All Roles  //
// ******************************************************************************************************


export const getAllRolesApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/role/getRoleBySch`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// All Data By Role Id  //
// ******************************************************************************************************


export const getDataByRoleIdApi = async (id, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${id}?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Holiday  //
// ******************************************************************************************************


export const getAllHolidayDataApi = async (searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}




// Saqib


// ########################## Human Resources API start ###########################

// post api 
export const PostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/role/addRole`, formData)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// GetAll Api 
export const RolePermissionGetApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/role/getRoleBySch`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


//  Get All Api of special feature get from addon page in super admin panel
export const SpeFeaGetAllApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/fea/getFeaByRoleId`)
    // const res= await axios.get(`${Domain}/fea/getAllFeatures`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// delete Api 

export const RolePermDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/role/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Get by Id 

export const RolePerGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/role/getByRoleId/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Put Data Api 
export const RolePerPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/role/editById/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}



// ########################## Human Resources API end ########################### 



// ########################## Class API start ########################### 

// post Api 
export const ClassPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/class/addClass`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}

// GetAll Api 
export const ClassGetApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/class/getClassAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    //    console.log('my-response', res)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// delete Api 

export const ClassDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/class/deleteById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}



// Get By id 

export const ClassGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/class/getClassById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Put Data Api 
export const ClassPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/class/updateClassById/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// ########################## Class API end ########################### 


// ########################## Class Room API start ########################### 


// Post Api 

export const ClassRoomPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/room/addRoom`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}

// GetAll Api 
export const ClassRoomGetApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/room/getAllRoomBySchId?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    //    console.log('my-response', res)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get By id 

export const ClassRoomGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/room/getRoomById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// delete Api 

export const classRoomDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/room/deleteById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Put Data Api 
export const ClassRoomPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/room/updateRoomById/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Class Room API end ########################### 





// ########################## Section API end ########################### 

// Post Api with Get all Api of class and Get all api of room

export const SectionPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/section/addSecInClass`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}

// NullGetAll Api from room page for room id

export const NullRoomGetApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/room/getAllNullRoom`)
    //    console.log('my-response', res)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Sectionn Get All Api 
export const SectionRoomGetApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getAllSecBySchool?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)

    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Sectionn Delete Api 
export const SectionDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/section/deleteSection/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Get By id 

export const SectionGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/section/getBySectionId/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


// Put Data Api 
export const SectionPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    // const res2= await axios.put(`${Domain}/section/updateSection/${id}`,datares)
    const res2 = await axios.put(`${Domain}/section/updateSec/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


// Section Get by class Id All Api 

export const SectionRoomByIdGetApi = async (Class) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${Class}`,)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Section API end ########################### 





// ########################## Event  API start ########################### 

// Event post Api 
export const EventPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/events/addEvents`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Event Get All Api 

export const EventGetAllApi = async (key, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/events/allEvents?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Event Delete Api 
export const EventDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/events/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


// Event get by id 
export const EventGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/findEvents/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}



// Event Put Data Api 
export const EventPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/events/modify/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Event CSV 
export const EventCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/csv`)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Event API end ########################### 





// ########################## Notice API start ########################### 

// Event post Api 
export const NoticePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/notice/addNotice`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}


// Notice Get All Api 

export const NoticeGetAllApi = async (key, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/notice/allNotice?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Notice Delete Api 
export const NoticeDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/notice/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Notice get by id 
export const NoticeGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/notice/findNotice/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Notice Put Data Api 
export const NoticePutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/notice/modify/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Notice CSV 
export const NoticeCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/notice/csv`)
    console.log('my-response-get-by-id', res2)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Notice API end ########################### 





// ########################## Holiday API start ########################### 

// Holiday post Api 
export const HolidayPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/holiday/addHoliday`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Holiday Get All Api 
export const HolidayGetAllApi = async (key, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/holiday/all?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Holiday Delete Api 
export const HolidayDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/holiday/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Holiday get by id 
export const HolidayGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/find/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


// Holiday Put Data Api 
export const HolidayPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/holiday/modify/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Holiday CSV
export const HolidayCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/csv`,)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Holiday PDF
export const HolidayPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/pdf`,)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Holiday API end ########################### 






// ########################## Staff  API start ########################### 


// Staff  post Api 
export const StaffPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/otherStaff/addStaff`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}


// Teacher  Get All Api 
export const TeacherGetAllApi = async (roleId, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${roleId}?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    //  const res= await axios.get(`${Domain}/otherStaff/getStaffBySchId/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Staff Delete Api 
export const StaffDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/otherStaff/deleteStaff/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Staff Get by user Id 

export const StaffGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getUser/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// staff Put Data Api 
export const StaffPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/otherStaff/editStaff/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
//  /otherStaff/getUser/{userId}
// ########################## Staff API end ########################### 







// ########################## Book manager list API start ########################### 

//  post Api 
export const BookManagerPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/books/add`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Library  Get All Api 
export const BookManagerGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/allBooks?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const BookManagerDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/books/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
//  Get by user Id 

export const BookmanGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/books/getBook/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Book Manager Put Data Api 
export const BookManPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/books/modifyBook/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Book Manager CSV
export const BookManCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/books/csv`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Book Manager PDF
export const BookManPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/books/pdf`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Book manager list API end ########################### 


// ########################## Book issue report API start ########################### 

//  post Api 
export const BookIssuePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/transaction/issue-book`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//   Get All Api 
export const bookIssueGetAllApi = async (startDate, endDate, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/transaction/book-transactions?startDate=${startDate}&endDate=${endDate}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const IssueBookDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/transaction/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 
export const IssueBookGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/transaction/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Book Issue Put Data Api 
export const IssueBookPutApi = async (id, PuData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/transaction/update/${id}`, PuData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Book issue report API end ########################### 





// ########################## Student apsi start  ########################### 


// Student  Get All Api 
export const studentGetAllApi = async (searchKey, classNo, sectionName) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/student/getAllScClSec?searchKey=${searchKey}&classNo=${classNo}&classSec=${sectionName}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// ########################## Student apsi  end ########################### 


// ########################## Online Course API start ########################### 

//  post Api 
export const OnlinePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/courses/add`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get All Api 
export const OnlineCourseGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getAllCourses?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Delete Api 
export const OnlineDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/courses/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 
export const OnlineGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getCourses/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const OnlinePutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/courses/update/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Online Course API end ########################### 




// ########################## Human resources Leave API start ########################### 

//  post Api 
export const LeavePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leaveType/create`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Get All Api 
export const LeaveGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveType/getAll?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const LeaveDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/leaveType/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 
export const LeaveGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveType/get/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const LeavePutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/leaveType/edit/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// -----------------------------------------
// Assign leave Apis 

//  post Api 
export const AssignLeavePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leaveUser/add`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Get All Api 
export const AssignLeaveGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveUser/getUsers?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Delete api
export const LeaveAssignDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/leaveUser/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Delete leave type api
export const LeaveAssignDeleteTypeApi = async (id, roleId) => {
    // console.log('my leave type in apis page',datares)
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/leaveUser/deleteLeaveType/${id}?leaveType=${roleId}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


//  Get by user Id 
export const AssignLeaveGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveUser/getById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// -----------------------------------------
// leave status 

//  post Api 
export const LeaveStatusPostApi = async (id, status) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leave/acknowledge/${id}?status=${status}`,)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get All Api 
export const LeaveStatusGetAllApi = async (pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leave/new-applied?page=${pageNo}&size=${pageSize}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Human resources Leave API end ########################### 

// ########################## Subject API start ########################### 

//  post Api 
export const SubjectPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/subject/addSubject`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// subject Get All Api 
export const SubjectGetAllApi = async (searchKey, classIdForSearch, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectBySchId?searchKey=${searchKey}&classNo=${classIdForSearch}&page=${pageNo}&size=${pageSize}`,)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const SubjectDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/subject/deleteById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 
export const SubjectGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getSubjectById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


//  Put Data Api 
export const SubjectPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/subject/updateSubById/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
export const Download_CSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/departments/allDepartCSV`)
    // console.log('my-response-get-by-id', res2)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Subject API end ########################### 




// ########################## Department API start ########################### 
//  post Api 
export const DepartmentPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/departments/add`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Department Get All Api 
export const DepartmentGetAllApi = async (key, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/departments/all?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const DepartmentDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/departments/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 
export const DepartmentGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/departments/getById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const DepartmentPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/departments/modify/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Search by class id 

// Department Get All Api 
export const DepartmentSearchGetAllApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ########################## Department API end ########################### 



// ########################## Syllabus API Start ########################### 

//  post Api 
export const SyllabusPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/syllabus/addSyllabus`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// this section api use for section by class id for section 
export const SyllabusSectionGetAllApi = async (classId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${classId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get subject by class id in syllabus 
export const SubjectByClassIdInSyllabusGetAllApi = async (classId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${classId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Get all api syllabus 
export const SyllabusGetAllApi = async (key, classId, sectionId, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.get(`${Domain}/syllabus/getAllSyllabus`)
    const res = await axios.get(`${Domain}/syllabus/getByClassSection?searchKey=${key}&classId=${classId}&classSecId=${sectionId}&pageNo=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const SyllabusDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/syllabus/deleteById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 

export const SyllbusGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/syllabus/getSyllabusById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const SyllabusPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/syllabus/updateById/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Download file apis 
export const SyllabusFileDownloadGetAllApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/syllabus/downloadSyllabus/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Syllabus API end ########################### 




// ########################## Academics API start ########################### 

// Class Routine 


// Get all teacher by sybject id api syllabus 
export const AllTeacherBySubjectId = async (classId, subjectId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  post Api 
export const ClassRoitinePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.post(`${Domain}/routine/addRoutine`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get all api 
export const ClassRoutineGetAll = async (searchKey, classNo, sectionName) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getBySchClassId?searchKey=${searchKey}&classNo=${classNo}&section=${sectionName}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  ClassRoutine CSV
export const ClassRoutineCSV = async (classNo, sectionName) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getCSV?classNo=${classNo}&section=${sectionName}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// get all api by search class and section 
export const ClassRoutineBySearchGetAll = async (classNo, section) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getBySchClassId?classNo=${classNo}&section=${section}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}




// Assign Subject and teacher start

//  post Api 
export const AssignTeaSubPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/subject/setSubjectTeacher`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// subject and teacher Get all api  
export const AssignGetAllApi = async (classId, subjectId, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}&pageNo=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Delete Api 
export const AssignDeleteDeleteApi = async (subjectIdForDelete, staffIdForDelete) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/subject/removeSubjectTeacher?subjectId=${subjectIdForDelete}&teacherId=${staffIdForDelete}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Assign Subject and teacher end

// ########################## Academics API end ########################### 



// ########################## Daily attendace API start ########################### 

export const DailyAttendancehGetAll = async (sectionId, date) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-date?sectionId=${sectionId}&date=${date}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  post Api 
export const DailyAttendancePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/attendance/create`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Put Data Api 
export const MyDailyAttendancePutApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/attendance/update`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

export const DailyAttendancehGetAllBymonth = async (sectionId2, month, year, search, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-month?sectionId=${sectionId2}&month=${month}&year=${year}&searchKey=${search}&page=${pageNo}&size=${pageSize}`,)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ########################## Daily attendace API end ########################### 

// ########################## Assign Class teacher APIs start ########################### 

// get all api by search class and section 
export const GeyAllTeacherLightWeightGetAll = async (classNo, section) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getAllStaff-light`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  post Api 
export const AssignClassTreachPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/section/assignClassTeacher`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  assign get all api
export const AssignClassTeacherGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/section-classTeacher-getAll?searchKey=${searchKey}&pageNo=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


//  Delete Api 
export const AssignDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/section/removeClassTeacher/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Get by id
export const AssignClassTeacherGetByIdAllApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/sectionClassTeacherGetById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const AssignClassTeacherPutApi = async (section, teacher) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/section/editClassTeacher?sectionId=${section}&staffId=${teacher}`)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// CSV 
// export const ClassTeacherCSV = async() =>{
//    axios.defaults.headers.common["Authorization"] = token;
//    const res2= await axios.get(`${Domain}/class/classTeacherCSV`)
//    if(res2) {
//     return res2;
//    }
//    else{
//     return []
//    }
// }

// ########################## Assign Class teacher APIs end ########################### 





// ########################## StaffAttendance APIs start ########################### 

export const StaffAttendanceGetAllApi = async (date, roleid) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/staffAttendance/search-date?roleId=${roleid}&date=${date}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  post Api 
export const TakeAttendancePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/staffAttendance/create`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Put Data Api 
export const SatffAttendancePutApi = async (data) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/staffAttendance/update`, data)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

export const AttendanceGetAllBymonth = async (roleid, month, year, search) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/staffAttendance/search-month?roleId=${roleid}&month=${month}&year=${year}&searchKey=${search}&page=${1}&size=${10}`,)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const AttendanceCSV = async (roleid, month, year) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/staffAttendance/csv?roleId=${roleid}&month=${month}&year=${year}`,)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ########################## StaffAttendance APIs end ########################### 




// ########################## Income category APIs start ########################### 

//  post Api 
export const IncomeCategoryPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/account-category/create`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


//  Income get all api
export const IncomeCategorygetAllApi = async (income, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/account-category/getAllByType?type=${income}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const IncomeCategoryDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/account-category/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Get by id
export const IncomeCategoryGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/account-category/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const IncomeCategoryPutApi = async (id, formData) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/account-category/modify/${id}`, formData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// ########################## Income category APIs end ########################### 





// ########################## Expense category APIs start ########################### 
//  post Api 
export const ExpenseCategoryPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/account-category/create`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Expense get all api
export const ExpenseCategorygetAllApi = async (expense, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/account-category/getAllByType?type=${expense}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const ExpenseCategoryDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/account-category/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Get by id
export const ExpenseCategoryGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/account-category/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const ExpenseCategoryPutApi = async (id, formData) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/account-category/modify/${id}`, formData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Expense category APIs end ########################### 


// ########################## Income APIs end ########################### 

//  post Api 
export const IncomePostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/income-expense/addTransaction`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  income get all api
export const IncomeAllApi = async (income, startDate, endDate, categoryId, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/income-expense/getAllByType?type=${income}&startDate=${startDate}&endDate=${endDate}&categoryId=${categoryId}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    //   ,startDate,endDate,categoryId
    //   &categoryId=${categoryId}&startDate=${startDate}&endDate=${endDate}
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Delete Api 
export const IncomeDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/income-expense/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Get by id
export const IncomeGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/income-expense/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Put Data Api 
export const incomePutApi = async (id, formData) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/income-expense/modify/${id}`, formData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }

}


// ########################## Income APIs end ########################### 




// ########################## Expense APIs start ########################### 

//  post Api 
export const ExpensePostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/income-expense/addTransaction`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  income get all api
export const ExpenseAllApi = async (expense, searchKey, pageNo, pageSize, startDate, endDate, categoryId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/income-expense/getAllByType?type=${expense}&categoryId=${categoryId}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}&startDate=${startDate}&endDate=${endDate}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Delete Api 
export const ExpenseDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/income-expense/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Get by id
export const ExpenseGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/income-expense/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const ExpensePutApi = async (id, formData) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/income-expense/modify/${id}`, formData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }

}
// ########################## Expense APIs end ########################### 



// ########################## Payroll APIs start ########################### 

//  Post 
export const PayrollPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/payroll/create`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get all 
export const PayrollGetAllApi = async (month, year) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/payroll/view?month=${month}&year=${year}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

export const ContractGetAllApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/contact/getByStaffId/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// ########################## Payroll APIs end ########################### 


// ########################## user contact APIs start ########################### 

export const UserContactGetAllApi = async (MyUserID, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/contact/saveOrUpdateContract/${MyUserID}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const UserAllowanceGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/allowance/saveOrUpdateAllowance/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const UserCommissionGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/commissions/saveOrUpdateCommission/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const UserStueGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/statutory/saveOrUpdateStatutory/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const UserReimbirmntGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/reimb/saveOrUpdateReimbursement/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// personal post api 
export const SocialGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/social/saveOrUpdateSocial/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const BankGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/bank/updateDetails/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const EmergencyGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/emergency/saveOrUpdateCon/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const UpdateImageGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/otherStaff/editStaff/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const DocumntGetAllApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/document/addDocument/${id}`,formData)
    const res = await axios.post(`${Domain}/document/saveOrUpdateDocument/${id}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Conatct_conat_ById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/contact/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Conatct_conat_PutApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/contact/updateContract/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

export const Conatct_allowance_getById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/allowance/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Conatct_allowance_PutApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/allowance/updateAllowance/${id}`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

export const Conatct_comission_GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/commissions/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Conatct_statuary_GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/statutory/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Conatct_reimbursement_GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/reimb/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const personal_info_Social__GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/social/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const personal_Bank_details__GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/bank/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const personal_Emergeny__GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/emergency/getByStaffId/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Profile_picture__GetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getUser/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Profile_picture_PutApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/otherStaff/editStaff/${id}`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const Documents_getById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/document/getByUser/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ____________________________________________

// ########################## user contact APIs end ########################### 



// ########################## Item category APIs start ########################### 



//  post Api 

export const ItemCategoryPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemCategory/add`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const ItemCategoryGetAllApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/getAll`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const ItemCategoryDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemCategory/delete/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get by id 
export const ItemCategoryGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemCategory/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// put api 
export const ItemCategoryUpdateApi = async (IdForUpdate, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemCategory/modify/${IdForUpdate}`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Item category APIs end ########################### 



// ########################## Item store APIs start ########################### 


//  post Api 

export const ItemStorePostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemStore/add`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get all 

export const ItemStoreGetAllApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemStore/getAll`,)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// delete api 
export const ItemStoreDeleetApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemStore/delete/${id}`,)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get by id api 
export const ItemStoreGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemStore/getOne/${id}`,)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// put id api 
export const ItemUpdatedApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemStore/modify${id}`,)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Item store APIs end ########################### 




// ########################## Item Supplier APIs start ########################### 

//  post Api 
export const ItemSupplierPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/itemSupplier/add`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get all api 
export const ItemSupplierGetAllApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemSupplier/getAll`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// delete api 
export const ItemSupplierDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/itemSupplier/delete/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get by api 
export const ItemSupplierGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/itemSupplier/getOne/${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// update api 
export const ItemSupplierUpdateApi = async (id, formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/itemSupplier/modify/${id}`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Item Supplier APIs end ########################### 


// ###############  CSV ####################

// Daily attendance CSV 
export const OtherStaffCSV = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/staffExportCSV?id=${id}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Daily attendance CSV 
export const DailyAttendanceCSV = async (sectionId, month, year) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/getCSV?sectionId=${sectionId}&month=${month}&year=${year}`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////
// PARENT
/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////



// ******************************************************************************************************
// Dashboard  //
// ******************************************************************************************************


export const getFeeDashDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/dashboard/getFeeDasByParent`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getFeeDataByIdApi = async (feeId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByFeeId/${feeId}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Holiday  //
// ******************************************************************************************************


export const getAllHolidayDataApiByStu = async (searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
// Notice  //
// ******************************************************************************************************


export const getAllNoticeDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/allNotice?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


export const getNoticeDataByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/notice/findNotice/${id}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Event  //
// ******************************************************************************************************


export const getAllEventDataApi = async (searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Assignments  //
// ******************************************************************************************************


export const getAllAssignmentsDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/stu-get-assignment?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// SamplePaper  //
// ******************************************************************************************************


export const getAllSamplePaperDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/stu-get-samplePaper?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const getDownloadSamplePaperDataApiByStu = async (id, BlobData) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/samplePaper/download-sample/${id}`, BlobData);
    if (res) {
        return res;
    } else {
        return [];
    }
}




// ******************************************************************************************************
// Grade  //
// ******************************************************************************************************


export const getAllGradeDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/grades/stu-get-grade?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// OfflineExams  //
// ******************************************************************************************************


export const getAllOfflineExamsDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/exam_details/stu-exam-details?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Marks  //
// ******************************************************************************************************


export const getAllMarksDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/marks/stu-get-marks?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
// Teachers  //
// ******************************************************************************************************


export const getAllTeachersDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getByTeaByStd?page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Fees  //
// ******************************************************************************************************




export const getCollectedStudentFeeByStuIdApi = async (id, searchByKey, size, page) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/getByStudent?searchKey=${searchByKey}&size=${size}&page=${page}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



export const getFeePaidByParentApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/payByParents/${id}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const AddNewOfflinePaymentApi = async (id, data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/offline/payment/${id}`, data);
    if (res) {
        return res;
    } else {
        return [];
    }
}


export const DownloadStudentFeeDataCSVById = async (studentId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/csv/${studentId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}

export const DownloadStudentFeeDataPDFById = async (studentId) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/feePay/pdf/${studentId}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Online Course  //
// ******************************************************************************************************


export const getOnlineCoursesDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/courses/stu-get-onlineCourse`);

    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Student Profile  //
// ******************************************************************************************************


export const getStudentProfileDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/student/studentData`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const updateStudentProfileDataApi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/student/updateByStudent`, data);

    if (res) {
        return res;
    } else {
        return [];
    }
}

export const AddNewOfflinePaymentAPi = async (data) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.put(`${Domain}/student/updateByStudent`, data);

    if (res) {
        return res;
    } else {
        return [];
    }
}








// ******************************************************************************************************
// Subject  //
// ******************************************************************************************************


export const getAllSubjectDataApi = async (pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/subject/getBySubByStd?page=${pageNo}&size=${size}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}



// ******************************************************************************************************
// Attendance  //
// ******************************************************************************************************


export const getAllStudentAttendanceApi = async (month, year) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/attendance/getStudentAttendance?&month=${month}&year=${year}`);
    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// ClassRoutine  //
// ******************************************************************************************************


export const getAllClassRoutineDataApi = async (day) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/routine/getByStudent?day=${day}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
        // TEACHER 
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////



// ########################## Human Resources API start ###########################


// post Api 
export const TeacherClassPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/class/addClass`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}

// GetAll Api 
export const TeacherClassGetApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/class/getAllClassBySchId`)
    //    console.log('my-response', res)

    if (res) {
        return res;
    }
    else {
        return []
    }
}
// delete Api 

export const TeacherClassDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/class/deleteById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}



// Get By id 

export const TeacherClassGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/class/getClassById/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Put Data Api 
export const TeacherClassPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/class/updateClassById/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  post Api 
export const TeacherLeaveStatusPostApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leave/acknowledge/${id}`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// Get All Api 
export const TeacherLeaveStatusGetAllApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leave/new-applied`)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// GetAll Api 
export const TeacherClassRoomGetApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/room/getAllRoomBySchId`)
    //    console.log('my-response', res)

    if (res) {
        return res;
    }
    else {
        return []
    }
}



// Section Get by class Id All Api 

export const TeacherSectionRoomByIdGetApi = async (Class) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${Class}`,)

    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Section API end ########################### 





// ########################## Event  API start ########################### 

// Event post Api 
export const TeacherEventPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/events/addEvents`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}

// Event Get All Api 

export const TeacherEventGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/events/allEvents?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Event CSV 
export const TeacherEventCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/csv`)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Event Delete Api 
export const TeacherEventDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/events/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


// Event get by id 
export const TeacherEventGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/events/findEvents/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}



// Event Put Data Api 
export const TeacherEventPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/events/modify/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Event API end ########################### 





// ########################## Notice API start ########################### 

// Event post Api 
export const TeacherNoticePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/notice/addNotice`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }

}


// Event Get All Api 

export const TeacherNoticeGetAllApi = async (key, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/notice/allNotice?searchKey=${key}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Notice CSV 
export const TeacherNoticeCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/notice/csv`)
    console.log('my-response-get-by-id', res2)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Notice Delete Api 
export const TeacherNoticeDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/notice/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Notice get by id 
export const TeacherNoticeGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/notice/findNotice/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Notice Put Data Api 
export const TeacherNoticePutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/notice/modify/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Notice API end ########################### 





// ########################## Holiday API start ########################### 

// Holiday post Api 
export const TeacherHolidayPostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/holiday/addHoliday`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Holiday Get All Api 
export const TeacherHolidayGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/holiday/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Holiday CSV
export const TeacherHolidayCSV = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/csv`,)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Holiday PDF
export const TeacherHolidayPDF = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/pdf`,)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// Holiday Delete Api 
export const TeacherHolidayDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/holiday/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Holiday get by id 
export const TeacherHolidayGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/holiday/find/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}


// Holiday Put Data Api 
export const TeacherHolidayPutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/holiday/modify/${id}`, datares)
    console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Holiday API end ########################### 







// Teacher  Get All Api 
export const TeacherGetAllByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getStaffByRoleType/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}




// ########################## Student apsi  end ########################### 


// ########################## Online Course API start ########################### 

//  post Api 
export const TeacherOnlinePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/courses/add`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get All Api 
export const TeacherOnlineCourseGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getAllCourses?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Delete Api 
export const TeacherOnlineDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/courses/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

//  Get by user Id 
export const TeacherOnlineGetById = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/courses/getCourses/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const TeacherOnlinePutApi = async (id, datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/courses/update/${id}`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}
// ########################## Online Course API end ########################### 






// this section api use for section by class id for section 
export const TeacherSyllabusSectionGetAllApi = async (classId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/section/getByClassId?classId=${classId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get subject by class id in syllabus 
export const TeacherSubjectByClassIdInSyllabusGetAllApi = async (classId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubByClassId/${classId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}





// ########################## Academics API start ########################### 

// Class Routine 


// Get all teacher by sybject id api syllabus 
export const TeacherAllTeacherBySubjectId = async (classId, subjectId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  post Api 
export const TeacherClassRoitinePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    //   const res= await axios.post(`${girjeshServer}/routine/addRoutine`,datares)
    const res = await axios.post(`${Domain}/routine/addRoutine`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get all api 
export const TeacherClassRoutineGetAll = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/routine/getByTeacher`)
    //   const res= await axios.get(`${Domain}/routine/getAllRoute`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// export const ClassRoutineBySearchGetAll = async(classNo, section) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/routine/getBySchClassId?classNo=${classNo}&section=${section}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }

// export const AssignTeaSubPostApi = async(datares) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${Domain}/subject/setSubjectTeacher`,datares)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }  
// }

// export const AssignGetAllApi = async(classId,subjectId) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }
// export const AssignDeleteDeleteApi = async(subjectIdForDelete, staffIdForDelete) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res2= await axios.delete(`${Domain}/subject/removeSubjectTeacher?subjectId=${subjectIdForDelete}&teacherId=${staffIdForDelete}`)
//   if(res2) {
//    return res2;
//   }
//   else{
//    return []
//   }
// }

// Assign Subject and teacher end

// ########################## Academics API end ########################### 



// ########################## Daily attendace API start ########################### 

export const TeacherDailyAttendancehGetAll = async (sectionId, date) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-date?sectionId=${sectionId}&date=${date}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  post Api 
export const TeacherDailyAttendancePostApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/attendance/create`, datares)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Put Data Api 
export const TeacherMyDailyAttendancePutApi = async (datares) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/attendance/update`, datares)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

export const TeacherDailyAttendancehGetAllBymonth = async (sectionId2, month, year, search, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/search-month?sectionId=${sectionId2}&month=${month}&year=${year}&searchKey=${search}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
export const TeacherDailyAttendancehCSVBymonth = async (sectionId2, month, year) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/attendance/getCSV?sectionId=${sectionId2}&month=${month}&year=${year}`,)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ########################## Daily attendace API end ########################### 

// ########################## Assign Class teacher APIs start ########################### 

// get all api by search class and section 
// export const GeyAllTeacherLightWeightGetAll = async(classNo, section) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/otherStaff/getAllStaff-light`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }



// export const AssignClassTreachPostApi = async(datares) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${Domain}/section/assignClassTeacher`,datares)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }  
// }
// export const AssignClassTeacherGetAllApi = async() =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/section/section-classTeacher-getAll`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }


// export const AssignDeleteApi = async(id) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res2= await axios.delete(`${Domain}/section/removeClassTeacher/${id}`)
//   if(res2) {
//    return res2;
//   }
//   else{
//    return []
//   }
// }
// export const AssignClassTeacherGetByIdAllApi = async(id) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/section/sectionClassTeacherGetById/${id}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }

// export const AssignClassTeacherPutApi = async(section, teacher) =>{

//    axios.defaults.headers.common["Authorization"] = token;
//    const res2= await axios.put(`${Domain}/section/editClassTeacher?sectionId=${section}&staffId=${teacher}`)

//    if(res2) {
//     return res2;
//    }
//    else{
//     return []
//    }
// }

// ########################## Assign Class teacher APIs end ########################### 





// ########################## StaffAttendance APIs start ########################### 

// export const StaffAttendanceGetAllApi = async(date,roleid) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/staffAttendance/search-date?roleId=${roleid}&date=${date}`)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }
// export const TakeAttendancePostApi = async(datares) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.post(`${Domain}/staffAttendance/create`,datares)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }  
// }
// export const SatffAttendancePutApi = async(data) =>{

//    axios.defaults.headers.common["Authorization"] = token;
//    const res2= await axios.put(`${Domain}/staffAttendance/update`, data)

//    if(res2) {
//     return res2;
//    }
//    else{
//     return []
//    }
// }

// export const AttendanceGetAllBymonth = async(roleid,month,year,search) =>{
//    axios.defaults.headers.common["Authorization"] = token;
//   const res= await axios.get(`${Domain}/staffAttendance/search-month?roleId=${roleid}&month=${month}&year=${year}&searchKey=${search}&page=${1}&size=${10}`,)
//   if(res) {
//    return res;
//   }
//   else{
//    return []
//   }
// }
// ########################## StaffAttendance APIs end ########################### 




// ########################## Income category APIs start ########################### 

// ########################## Income category APIs end ########################### 





// ########################## Expense category APIs start ########################### 

// ########################## Expense category APIs end ########################### 




// ########################## Income APIs end ########################### 




// ########################## Expense APIs start ########################### 

// ########################## Expense APIs end ########################### 


// ########################## Exam Category APIs start ########################### 


//  Exam category get all api
export const TeacherExamcategoryGetAll = async (searchKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/exam_category/all?searchKey=${searchKey}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ########################## Exam Category APIs end ########################### 


// ##########################  Session  APIs start ########################### 

//  Session category get all api
export const TeacherSessionyGetAll = async (searchKey) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/session/getAllSessionBySchId?searchKey=${searchKey}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ##########################  Session  APIs end ########################### 


// ##########################  Marks  APIs start ########################### 

export const TeacherMarksGetAll = async (classId, sectionId, subjectId, sessionName, examCategory, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/marks/all?classId=${classId}&sectionId=${sectionId}&sessionName=${sessionName}&subjectId=${subjectId}&examCategory=${examCategory}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`,)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  post Api 
export const TeacherMarksPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/marks/assign`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// ##########################  Marks  APIs end ########################### 


// ##########################  Offline exam  APIs start ########################### 

export const TeacherOfflineExamGetAll = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/exam_details/all?searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  post Api 
export const TeacherOfflinePostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/exam_details/register`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Delete Api 
export const TeacherOfflineDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.delete(`${Domain}/exam_details/delete/${id}`)
    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// Get by id
export const TeacherOfflineGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/exam_details/getOne/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const TeacherOfflinePutApi = async (id, formData) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/exam_details/modify/${id}`, formData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }

}

// ##########################  Offline exam  APIs end ########################### 




// ##########################  Assignemnt exam  APIs start ########################### 


//  post Api 
export const AssignmentPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/assignment/create`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Teacher get with class id and subject id all api
export const TeacherGetTeacherGetAll = async (classId, subjectId) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/subject/getAllSubjectTeacher?classId=${classId}&subjectId=${subjectId}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Assignmnt get all api
export const TeacherAssignmntGetAllApi = async (sectioId, subjectId, searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/assignment/search-Assignment?sectionId=${sectioId}&subjectId=${subjectId}&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get by id
export const TeacherAssignmntGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/assignment/getById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}


// ##########################  Assignemnt exam  APIs end ########################### 





// ##########################  Sample Paper exam  APIs start ########################### 

//  post Api 
export const TeacherSamplePaperPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/samplePaper/create`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
//  Assignmnt get all api
export const TeacherSampleGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/samplePaper/getAll?searchkey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// delete 
export const TeacherSampleDeleteApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.delete(`${Domain}/samplePaper/delete/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// get by id 
export const TeacherSampleGetByIdApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/samplePaper/getById/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

//  Put Data Api 
export const TeacherSamplePutApi = async (IdForUpdate, formData) => {

    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.put(`${Domain}/samplePaper/update/${IdForUpdate}`, formData)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }

}
// Sample PDF
export const TeacherSamplePDF = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res2 = await axios.get(`${Domain}/samplePaper/download-sample/${id}`)
    // console.log('my-response-get-by-id', res2)

    if (res2) {
        return res2;
    }
    else {
        return []
    }
}

// ##########################  Sample Paper exam  APIs end ########################### 





// ##########################  payroll  APIs start ########################### 


//  Payroll get all api

export const TeacherPayGetAllApi = async (pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/payroll/getByStaff?page=${pageNo}&size=${pageSize}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get by ud 
export const TeacherPayGetByIdAllApi = async (id) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/payroll/viewPayStaff/${id}`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// ##########################  payroll  APIs end ########################### 


// ##########################  Profile  APIs start ########################### 

// Get All api 
export const TeacherProfileByIdAllApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/otherStaff/getUserByToken`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// put api 
export const TeacherProfileUpdateAllApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.put(`${Domain}/otherStaff/updateByUser`, formData)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ##########################  Profile  APIs end ########################### 



// ##########################  Leave in teacher  APIs start ########################### 
//  post Api 
export const TeacherLeaveTeacherPostApi = async (formData) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.post(`${Domain}/leave/add`, formData)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// Get All type api 
export const TeacherLeaveTeacherAllApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leaveType/getAll`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}
// Get All api 
export const TeacherLeaveTeacherGetAllApi = async (searchKey, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    const res = await axios.get(`${Domain}/leave/user-readAll?&searchKey=${searchKey}&page=${pageNo}&size=${pageSize}`)
    // const res= await axios.get(`${Domain}/leave/user-readAll`)
    // console.log('my-response', res)
    if (res) {
        return res;
    }
    else {
        return []
    }
}

// ##########################  Leave in teacher  APIs end ########################### 


// --- Garim api dashboard --- 


// ******************************************************************************************************
// Holiday  //
// ******************************************************************************************************


export const TeachergetAllHolidayDataApi = async (searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/holiday/all?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Event  //
// ******************************************************************************************************


export const TeachergetAllEventDataApi = async (searchKey, pageNo, size) => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/events/allEvents?&searchKey=${searchKey}&page=${pageNo}&size=${size}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}


// ******************************************************************************************************
// Assignments  //
// ******************************************************************************************************


export const TeachergetAllAssignmentsDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/assignment/tea-get-assignment`);
    // var res = await axios.get(`${Domain}/assignment/stu-get-assignment`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

// ******************************************************************************************************
// ClassRoutine  //
// ******************************************************************************************************


export const TeachergetAllClassRoutineDataApi = async (timeTableDay) => {
    axios.defaults.headers.common["Authorization"] = token;
    // var res = await axios.get(`${Domain}/routine/getByTeacher?day=${'tuesday'}`);
    var res = await axios.get(`${Domain}/routine/getByTeacher?day=${timeTableDay}`);

    if (res) {
        return res;
    } else {
        return [];
    }
}
export const TeachergetAllLeaveOfTeacherDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/leave/tea-leaveReport`);

    if (res) {
        return res;
    } else {
        return [];
    }
}
export const TeachergetAllDashboardAttendanceDataApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.get(`${Domain}/staffAttendance/checkInTimeInfo`);

    if (res) {
        return res;
    } else {
        return [];
    }
}

// --- Garim api dashboard --- 


// ##########################  Submission in teacher  APIs end ########################### 



// ##########################  attendance in teacher  APIs start ########################### 

export const TeacherAttendanceTeacherGetAllApi = async (data1, pageNo, pageSize) => {
    axios.defaults.headers.common["Authorization"] = token;
    // var res = await axios.get(`${Domain}/staffAttendance/attendanceReport`);
    var res = await axios.get(`${Domain}/staffAttendance/attendanceReport?page=${pageNo}&size=${pageSize}`, data1);

    if (res) {
        return res;
    } else {
        return [];
    }
}

// check-in post
export const TeacherAttendanceCheckInApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/staffAttendance/checkIn`);

    if (res) {
        return res;
    } else {
        return [];
    }
}
// check-out post
export const TeacherAttendanceCheckOutApi = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    var res = await axios.post(`${Domain}/staffAttendance/checkOut`);

    if (res) {
        return res;
    } else {
        return [];
    }
}
