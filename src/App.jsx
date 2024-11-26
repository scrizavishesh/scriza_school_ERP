import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import DashboardLayout from './Dashboard/DashboardLayout';
import WithoutAuth from './Main/WithoutAuth';
import Prefix from './Main/Prefix';

function App() {

  const token = localStorage.getItem('token');
  const subscriptionVal = localStorage.getItem('subscription');
  return (
    <>
      {token
        ?
        <BrowserRouter>
          {subscriptionVal === 'setPrefix'
            ?
            <Prefix />
            :
            <DashboardLayout />
          }
        </BrowserRouter>
        :
        <BrowserRouter>
          <WithoutAuth />
        </BrowserRouter>
      }
    </>
  );
}

export default App;








// import React, { useEffect } from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import DashboardLayout from './Dashboard/SuperAdminLayout';
// import WithoutAuth from './Main/WithoutAuth';

// function App() {
  
//     const token = localStorage.getItem('token');
  
  

//   return (
//     <>
      
//       {token 
//         ? 
//           <BrowserRouter>
//             <DashboardLayout />
//           </BrowserRouter>
//         :
//           <BrowserRouter>
//             <WithoutAuth />
//           </BrowserRouter>
          
//         }
//     </>
//   );
// }

// export default App;
