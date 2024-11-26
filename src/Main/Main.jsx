import React from 'react'
import { Route, Routes } from 'react-router-dom'
import styled from 'styled-components';

// Super Admin
import AllSchools from '../Pages/AllSchools';
import ViewSchoolDetails from '../Pages/ViewSchoolDetails';
import AddSchool from '../Pages/AddSchool';
import Addon from '../Pages/Addon';
import AddAddon from '../Pages/AddAddon';
import Packages from '../Pages/Packages';
import Subscription from '../Pages/Subscription';
import Request from '../Pages/Request';
import SystemSetting from '../Pages/SystemSetting';
import WebsiteSetting from '../Pages/WebsiteSetting';
import ManageFaq2 from '../Pages/ManageFaq2';
import PaymentSetting from '../Pages/PaymentSetting';
import PageNotFound from '../Pages/PageNotFound';

// Admin 
import AdmissionForm from '../Pages/AdmissionForm'
import ExcelUpload from '../Pages/ExcelUpload'
import SingleStudentAdmission from '../Pages/SingleStudentAdmission'
import ExamCategory from '../Pages/ExamCategory'
import Grades from '../Pages/Grades'
import Marks from '../Pages/Marks'
import OfflineExam from '../Pages/OfflineExam'
import Promotion from '../Pages/Promotion'
import Marksheet from '../Pages/Marksheet'
import AddDriver from '../Pages/AddDriver'
import AddVehicle from '../Pages/AddVehicle'
import AssignStudent from '../Pages/AssignStudent'
import Driver from '../Pages/Driver'
import Vehicle from '../Pages/Vehicle'
import SamplePaper from '../Pages/SamplePaper'
import Assignment from '../Pages/Assignment'
import SchoolSetting from '../Pages/SchoolSetting'
import SessionManager from '../Pages/SessionManager'
import PaymentSettings from '../Pages/PaymentSettings'
import SettingsSubscription from '../Pages/SettingsSubscription'
import MyAccount from '../Pages/MyAccount'
import AddRoute from '../Pages/AddRoute'
import AddDropPoint from '../Pages/AddDropPoint'
import AllStudents from '../Pages/AllStudents'
import OpenAssignment from '../Modals/Assignments/OpenAssignment'
import SubmitAssignment from '../Modals/Assignments/SubmitAssignment'
import DropPoint from '../Pages/DropPoint'
import AllRoute from '../Pages/Route'
import CollectFees from '../Pages/CollectFees'
import SearchFeePayment from '../Pages/SearchFeePayment'
import SearchDueFees from '../Pages/SearchDueFees'
import FeesMaster from '../Pages/FeesMaster'
import FeesGroup from '../Pages/FeesGroup'
import FeesType from '../Pages/FeesType'
import FeesDiscount from '../Pages/FeesDiscount'
import CollectStudentFee from '../Pages/CollectStudentFee'
import StudentProfilePage from '../Pages/StudentProfilePage'
import ViewParticularFeeMaster from '../Modals/FeeMaster/ViewParticularFeeMaster'
import ViewAllFeeMaster from '../Modals/FeeMaster/ViewAllFeeMaster'
import AddItemStock from '../Pages/AddItemStock'
import AddItem from '../Pages/AddItem'
import IssueItem from '../Pages/IssueItem'
import AddIssueItem from '../Pages/AddIssueItem'
import SuperAdminDashboard from '../Pages/SuperAdminDashboard';
import AdminDashboard from '../Pages/AdminDashboard';

// Saqib

import Admin from '../Pages/Admin';
import AdAdminForm from '../Pages/AdAdminForm';
import Teacher from '../Pages/Teacher';
import Accountant from '../Pages/Accountant';
import Librarian from '../Pages/Librarian';
import Student from '../Pages/Student';
import OtherStaff from '../Pages/OtherStaff';
import TeacherPermission from '../Pages/TeacherPermission';
import TeacherPermission22 from '../Pages/TeacherPermission22';
import DailyAttendance from '../Pages/DailyAttendance';
import ClassList from '../Pages/ClassList';
import ClassRoutine from '../Pages/ClassRoutine';
import Subject from '../Pages/Subject';
import Gradebooks from '../Pages/Gradebooks';
import Syllabus from '../Pages/Syllabus';
import ClassRoom from '../Pages/ClassRoom';
import Departments from '../Pages/Departments';
import UserRole from '../Pages/RolePermission';
import UserList from '../Pages/UserList';
import TakeAttendance from '../Pages/TakeAttendance';
import Leave from '../Pages/Leave';
import StateTable_1 from '../Pages/StateTable_1';
import Payroll from '../Pages/Payroll';
import PayRoll_Create from '../Pages/PayRoll_Create';
import SmsSetting from '../Pages/SmsSetting';
import SmsSettingState1 from '../Pages/SmsSettingState1';
import SmsSettingState2 from '../Pages/SmsSettingState2';
import SmsSettingState3 from '../Pages/SmsSettingState3';
import SmsSender from '../Pages/SmsSender';
import BookListManager from '../Pages/BookListManager';
import BookIssueReport from '../Pages/BookIssueReport';
import Holiday from '../Pages/Holiday';
import Notice from '../Pages/Notice';
import NoticeViewPage from '../Pages/NoticeViewPage';
import Event from '../Pages/Event';
import Login from '../Pages/Event';
import Section from '../Pages/Section';
import RolePermisGetAll from '../Pages/RolePermisGetAll';
import OnlineCourse from '../Pages/OnlineCourse';
import AssignLeave from '../Pages/AssignLeave';
import LeaveStatus from '../Pages/LeaveStatus';
import AssignSubjectTeacher from '../Pages/AssignSubjectTeacher';
import AssignClassTeacher from '../Pages/AssignClassTeacher';
import Discount from '../Pages/Discount';
import Fee from '../Pages/Fee';
import Fee_collection from '../Pages/Fee_collection';
import ManageInvoice from '../Pages/ManageInvoice';
import Due_invoice from '../Pages/Due_invoice';
import Income from '../Pages/Income';
import Income_category from '../Pages/Income_category';
import Expense from '../Pages/Expense';
import Expense_category from '../Pages/Expense_category';
import MainUserForm from '../Pages/MainUserForm';
import User_Contact from '../Pages/User_Contact';
import User_Per_info from '../Pages/User_Per_info';
import Item_category from '../Pages/Item_category';
import Item_store from '../Pages/Item_store';
import Item_supplier from '../Pages/Item_supplier';

// Parent

import ParentDashboardPage_P from '../Pages/ParentDashboardPage_P'
import ProfilePage_P from '../Pages/ProfilePage_P';
import Event_P from '../Pages/Event_P';
import Holiday_P from '../Pages/Holiday_P';
import Notice_P from '../Pages/Notice_P';
import SamplePaper_P from '../Pages/SamplePaper_P';
import Assignment_P from '../Pages/Assignment_P';
import Teacher_P from '../Pages/Teacher_P';
import OnlineCourse_P from '../Pages/OnlineCourse_P';
import Fees_P from '../Pages/Fees_P';
import OfflineExams_P from '../Pages/OfflineExams_P';
import Marks_P from '../Pages/Marks_P';
import Grades_P from '../Pages/Grades_P';
import OfflinePayment_P from '../Pages/OfflinePayment_P';

// Student

import ProfilePage_S from '../Pages/ProfilePage_S';
import Dashboard_S from '../Pages/DashboardPage_S'
import ClassRoutines_S from '../Pages/ClassRoutines_S';
import Subject_S from '../Pages/Subject_S';
import DailyAttendance_S from '../Pages/DailyAttendance_S';

// Teacher

import DailyAttendance_T from '../Pages/DailyAttendance_T';
import ClassRoutine_T from '../Pages/ClassRoutine_T';
import Leave_T from '../Pages/Leave_T';
import Payroll_T from '../Pages/Payroll_T';
import Holiday_T from '../Pages/Holiday_T';
import Notice_T from '../Pages/Notice_T';
import Event_T from '../Pages/Event_T';
import OnlineCourse_T from '../Pages/OnlineCourse_T';
import AssignLeave_T from '../Pages/AssignLeave_T';
import OfflineExam_T from '../Pages/OfflineExam_T';
import Marks_T from '../Pages/Marks_T';
import AssignmentTea_T from '../Pages/AssignmentTea_T';
import Assign_publish_T from '../Pages/Assign_publish_T';
import Assign_archieves_T from '../Pages/Assign_archieves_T';
import Assign_draft_T from '../Pages/Assign_draft_T';
import Sample_paper_T from '../Pages/Sample_paper_T';
import Profile_T from '../Pages/Profile_T';
import TeacherDashboardPage from '../Pages/TeacherDashboard';


const Container = styled.div`
  height: 90vh;
  overflow: scroll;

  .mainScroll::-webkit-scrollbar {
    display: none;
  }

`;

const Main = () => {


  const role = localStorage.getItem('loggedInUserRole');

  return (
    <>
      <Container className='mainScroll'>
        <Routes>
          {role === 'SUPERADMIN' && <Route path='/' element={<SuperAdminDashboard />} />}
          {role === 'ADMIN' && <Route path='/' element={<AdminDashboard />} />}
          {role === 'PARENT' && <Route path='/' element={<ParentDashboardPage_P />} />}
          {role === 'STUDENT' && <Route path='/' element={<Dashboard_S />} />}
          {role === 'USER' && <Route path='/' element={<TeacherDashboardPage />} />}
            {/* :
            role === 'ADMIN'
              ?
              <Route path='/' element={<AdminDashboard />} />
              :
              <></>
          } */}

          {/* Super Admin Routes */}
          <Route path="/allSchoolsPage" element={<AllSchools />} />
          <Route path="/viewSchoolDetails/:schoolId" element={<ViewSchoolDetails />} />
          <Route path="/addSchoolsPage" element={<AddSchool />} />
          <Route path="/addons" element={<Addon />} />
          <Route path="/addAddons" element={<AddAddon />} />
          <Route path="/allPackagesPage" element={<Packages />} />
          <Route path="/subscriptionPage" element={<Subscription />} />
          <Route path="/requestPage" element={<Request />} />
          <Route path="/systemSettingPage" element={<SystemSetting />} />
          <Route path="/websiteSettingPage" element={<WebsiteSetting />} />
          <Route path="/manageFaqPage" element={<ManageFaq2 />} />
          <Route path="/paymentSettingPage" element={<PaymentSetting />} />

          {/* Admin Routes */}
          <Route path='/admissionForm' element={<AdmissionForm />} />
          <Route path='/excelUpload' element={<ExcelUpload />} />
          <Route path='/singleStudentAdmission' element={<SingleStudentAdmission />} />
          <Route path='/allStudent' element={<AllStudents />} />
          <Route path='/examCategory' element={<ExamCategory />} />
          <Route path='/grades' element={<Grades />} />
          <Route path='/marks' element={<Marks />} />
          <Route path='/offlineExam' element={<OfflineExam />} />
          <Route path='/marksheet' element={<Marksheet />} />
          <Route path='/promotion' element={<Promotion />} />
          <Route path='/addDriver' element={<AddDriver />} />
          <Route path='/addVehicle' element={<AddVehicle />} />
          <Route path='/assignStudent' element={<AssignStudent />} />
          <Route path='/driver' element={<Driver />} />
          <Route path='/vehicle' element={<Vehicle />} />
          <Route path='/route' element={<AllRoute />} />
          <Route path='/dropPoint' element={<DropPoint />} />
          <Route path='/addRoute' element={<AddRoute />} />
          <Route path='/addDropPoint' element={<AddDropPoint />} />
          <Route path='/samplePaper' element={<SamplePaper />} />
          <Route path='/assignment' element={<Assignment />} />
          <Route path='/schoolSetting' element={<SchoolSetting />} />
          <Route path='/sessionManager' element={<SessionManager />} />
          <Route path='/paymentSettings' element={<PaymentSettings />} />
          <Route path='/subscription' element={<SettingsSubscription />} />
          <Route path='/myAccount' element={<MyAccount />} />
          <Route path='/assignment/openAssignment/:id' element={<OpenAssignment />} />
          <Route path='/assignment/submitAssignment/:id' element={<SubmitAssignment />} />
          <Route path='/collectFees' element={<CollectFees />} />
          <Route path='/collectStudentFee/:id' element={<CollectStudentFee />} />
          <Route path='/studentProfilePage/:id' element={<StudentProfilePage />} />
          <Route path='/searchFeePayment' element={<SearchFeePayment />} />
          <Route path='/searchDueFees' element={<SearchDueFees />} />
          <Route path='/feesMaster' element={<FeesMaster />} />
          <Route path='/viewParticularFeeMaster' element={<ViewParticularFeeMaster />} />
          <Route path='/viewAllFeeMaster' element={<ViewAllFeeMaster />} />
          <Route path='/feesGroup' element={<FeesGroup />} />
          <Route path='/feesType' element={<FeesType />} />
          <Route path='/feesDiscount' element={<FeesDiscount />} />
          <Route path='/issueItem' element={<IssueItem />} />
          <Route path='/addIssueItem' element={<AddIssueItem />} />
          <Route path='/addItemStock' element={<AddItemStock />} />
          <Route path='/addItem' element={<AddItem />} />

          {/* Saqib Routes */}
          <Route exact path='/admin' element={<Admin />} />
          <Route exact path='/addadminform' element={<AdAdminForm />} />
          <Route exact path='/teacher' element={<Teacher />} />
          <Route exact path='/accountant' element={<Accountant />} />
          <Route exact path='/librarian' element={<Librarian />} />
          <Route exact path='/student' element={<Student />} />
          <Route exact path='/other_staff' element={<OtherStaff />} />
          <Route exact path='/teacherpermission' element={<TeacherPermission />} />
          <Route exact path='/teacherpermission22' element={<TeacherPermission22 />} />
          <Route exact path='/dailyattendance' element={<DailyAttendance />} />
          <Route exact path='/classlist' element={<ClassList />} />
          <Route exact path='/classroutine' element={<ClassRoutine />} />
          <Route exact path='/subject' element={<Subject />} />
          <Route exact path='/gradebooks' element={<Gradebooks />} />
          <Route exact path='/syllabus' element={<Syllabus />} />
          <Route exact path='/Classroom' element={<ClassRoom />} />
          <Route exact path='/Department' element={<Departments />} />
          <Route exact path='/userrole' element={<UserRole />} />
          <Route exact path='/userlist' element={<UserList />} />
          <Route exact path='/takeattendance' element={<TakeAttendance />} />
          <Route exact path='/leave' element={<Leave />} />
          <Route exact path='/statetable1' element={<StateTable_1 />} />
          <Route exact path='/payroll' element={<Payroll />} />
          <Route exact path='/payrollcreate' element={<PayRoll_Create />} />
          <Route exact path='/smssetting' element={<SmsSetting />} />
          <Route exact path='/smssettingstate1' element={<SmsSettingState1 />} />
          <Route exact path='/smssettingstate2' element={<SmsSettingState2 />} />
          <Route exact path='/smssettingstate3' element={<SmsSettingState3 />} />
          <Route exact path='/smssender' element={<SmsSender />} />
          <Route exact path='/booklistmanager' element={<BookListManager />} />
          <Route exact path='/bookissuereport' element={<BookIssueReport />} />
          <Route exact path='/holiday' element={<Holiday />} />
          <Route exact path='/notice' element={<Notice />} />
          <Route exact path='/noticeview' element={<NoticeViewPage />} />
          <Route exact path='/event' element={<Event />} />
          <Route exact path='/' element={<Login />} />
          <Route exact path='/section' element={<Section />} />
          <Route exact path='/rolepermissiongetall' element={<RolePermisGetAll />} />
          <Route exact path='/onlinecourse' element={<OnlineCourse />} />
          <Route exact path='/assignleave' element={<AssignLeave />} />
          <Route exact path='/leavestatus' element={<LeaveStatus />} />
          <Route exact path='/assignsubjectteacher' element={<AssignSubjectTeacher />} />
          <Route exact path='/assignclassteacher' element={<AssignClassTeacher />} />
          <Route exact path='/discount' element={<Discount />} />
          <Route exact path='/fee' element={<Fee />} />
          <Route exact path='/feecollection' element={<Fee_collection />} />
          <Route exact path='/manageinvoice' element={<ManageInvoice />} />
          <Route exact path='/dueinvoisce' element={<Due_invoice />} />
          <Route exact path='/income' element={<Income />} />
          <Route exact path='/incomecategory' element={<Income_category />} />
          <Route exact path='/expense' element={<Expense />} />
          <Route exact path='/expensecategory' element={<Expense_category />} />
          {/* <Route exact path='/mainuserform' element={<MainUserForm/>}/> */}
          <Route exact path='/mainuserform/:id' element={<MainUserForm />} />
          <Route exact path='/usercontact' element={<User_Contact />} />
          <Route exact path='/userperinfo' element={<User_Per_info />} />
          <Route exact path='/itemcategory' element={<Item_category />} />
          <Route exact path='/itemstore' element={<Item_store />} />
          <Route exact path='/itemsupplier' element={<Item_supplier />} />

          {/* Parent */}
          <Route path='/grades_P' element={<Grades_P />} />
          <Route path='/marks_P' element={<Marks_P />} />
          <Route path='/offlineExam_P' element={<OfflineExams_P />} />
          <Route path='/Fees_P' element={<Fees_P />} />
          <Route path='/offlinePaymentForm/:id' element={<OfflinePayment_P />} />
          <Route path='/OnlineCourse_P' element={<OnlineCourse_P />} />
          <Route path='/teacher_P' element={<Teacher_P />} />
          <Route path='/Assignments_P' element={<Assignment_P />} />
          <Route path='/SamplePaper_P' element={<SamplePaper_P />} />
          <Route path='/Holiday_P' element={<Holiday_P />} />
          <Route path='/Notice_P' element={<Notice_P />} />
          <Route path='/Event_P' element={<Event_P />} />
          <Route path='/Profile' element={<ProfilePage_P />} />

          {/* Student */}
          <Route path='/Subject_S' element={<Subject_S />} />
          <Route path='/ClassRoutines_S' element={<ClassRoutines_S />} />
          <Route path='/DailyAttendance_S' element={<DailyAttendance_S />} />
          <Route path='/Profile_S' element={<ProfilePage_S />} />

          {/* Teacher */}
          <Route exact path='/dailyattendance_T' element={<DailyAttendance_T />} />
          <Route exact path='/classroutine_T' element={<ClassRoutine_T />} />
          <Route exact path='/leave_T' element={<Leave_T />} />
          <Route exact path='/payroll_T' element={<Payroll_T />}/>
          <Route exact path='/holiday_T' element={<Holiday_T />} />
          <Route exact path='/notice_T' element={<Notice_T />} />
          <Route exact path='/event_T' element={<Event_T />} />
          <Route exact path='/onlinecourse_T' element={<OnlineCourse_T />} />
          <Route exact path='/assignleave_T' element={<AssignLeave_T />} />
          <Route exact path='/offlineexam_T' element={<OfflineExam_T />} />
          <Route exact path='/marks_T' element={<Marks_T />} />
          <Route exact path='/assignmenttea_T' element={<AssignmentTea_T />} />
          <Route exact path='/assignpublsih_T' element={<Assign_publish_T />} />
          <Route exact path='/assignarchieves_T' element={<Assign_archieves_T />} />
          <Route exact path='/assigndraft_T' element={<Assign_draft_T />} />
          <Route exact path='/samplepaper_T' element={<Sample_paper_T />} />
          <Route exact path='/profile_T' element={<Profile_T />} />

          {/* Not Found */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Container>
    </>
  )
}

export default Main
