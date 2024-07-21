import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./components/pages/Authentication/TeacherLogin";
import LoginAdmin from "./components/pages/Authentication/AdminLogin";
import config from 'config';
import BlogView from "./components/pages/Blog/BlogView";
import PendingBlog from "./components/pages/Blog/PendingBlog";
import AddBlog from "./components/pages/Blog/AddBlog";
import EditBlog from "./components/pages/Blog/EditBlog";
import BlankPage from "./components/pages/Blank/BlankPage";
import BasicTable from "./components/pages/Table/BasicTable";
import DataTable from "./components/pages/Table/DataTable";
import Students from "./components/pages/Students/StudentsList";
import Admins from "./components/pages/Admins/AdminsList";
import AddAdmin from "./components/pages/Admins/AddAdmin";
import InvoiceGrid from "./components/pages/Invoice/InvoiceGrid";
import AddInvoice from "./components/pages/Invoice/AddInvoice";
import EditInvoice from "./components/pages/Invoice/EditInvoice";
import ViewInvoice from "./components/pages/Invoice/ViewInvoice";
import InvoiceSettings from "./components/pages/Invoice/InvoiceSettings";
import InvoiceList from "./components/pages/Invoice/InvoiceList";
import Register from "./components/pages/Authentication/Register";
import ForgotPassword from "./components/pages/Authentication/ForgotPassword";
import AdminDashboard from "./components/pages/Dashboard/AdminDashboard";
import Blogdetails from "./components/pages/Blog/Blogdetails";
import Profile from "./components/pages/Blog/Profile";
import TaxSetting from "./components/pages/Invoice/TaxSetting";
import BankSetting from "./components/pages/Invoice/BankSetting";
import Inbox from "./components/Header/Inbox ";
import Compose from "./components/Header/Compose";
import StudentsDashboard from "./components/pages/Dashboard/StudentsDashboard";
import TeacherDashboard from "./components/pages/Dashboard/TeacherDashboard";
import StudentsView from "./components/pages/Students/StudentsView";
import EditStudent from "./components/pages/Students/UpdateStudent";
import StudentGrid from "./components/pages/Students/StudentGrid";
import InvoicePaid from "./components/pages/Invoice/InvoicePaid";
import InvoiceOverdue from "./components/pages/Invoice/InvoiceOverdue";
import InvoiceDraft from "./components/pages/Invoice/InvoiceDraft";
import InvoiceRecurring from "./components/pages/Invoice/InvoiceRecurring";
import InvoiceCancelled from "./components/pages/Invoice/InvoiceCancelled";
import TeachersList from "./components/pages/Teachers/TeachersList";
import TeachersProfile from "./components/pages/Teachers/TeachersProfile";
import TeachersAdd from "./components/pages/Teachers/TeachersAdd";
import TeachersEdit from "./components/pages/Teachers/TeachersEdit";
import TeachersGrid from "./components/pages/Teachers/TeachersGrid";
import DepartmentList from "./components/pages/Department/DepartmentList";
import AddDepartment from "./components/pages/Department/AddDepartment";
import EditDepartment from "./components/pages/Department/EditDepartment";
import SubjectList from "./components/pages/Subject/SubjectList";
import AddSubject from "./components/pages/Subject/AddSubject";
import EditSubject from "./components/pages/Subject/EditSubject";
// Settings
import GendralSettings from "./components/pages/Settings/GendralSettings";
import Localization from "./components/pages/Settings/Localization";
import PaymentSettings from "./components/pages/Settings/PaymentSettings";
import EmailSettings from "./components/pages/Settings/EmailSettings";
import SocialSettings from "./components/pages/Settings/SocialSettings";
import SocialLinks from "./components/pages/Settings/SocialLinks";
import Seo from "./components/pages/Settings/Seo";
import OtherSettings from "./components/pages/Settings/OtherSettings";
// Library
import LibraryList from "./components/pages/Library/LibraryList";
import AddBook from "./components/pages/Library/AddBook";
import FeesCollection from "./components/pages/Accounts/FeesCollection";
import Expenses from "./components/pages/Accounts/Expenses";
import Salary from "./components/pages/Accounts/Salary";
import AddFeesCollection from "./components/pages/Accounts/AddFeesCollection";
import AddExpenses from "./components/pages/Accounts/AddExpenses";
import AddSalary from "./components/pages/Accounts/AddSalary";
import Holiday from "./components/pages/Holiday/Holiday";
import AddHoliday from "./components/pages/Holiday/AddHoliday";
import Fees from "./components/pages/Fees/Fees";
import AddFees from "./components/pages/Fees/AddFees";
import EditFees from "./components/pages/Fees/EditFees";
import Exam from "./components/pages/Exam List/Exam";
import AddExam from "./components/pages/Exam List/AddExam";
import EditExam from "./components/pages/Exam List/EditExam";
import TimeTable from "./components/pages/Time Table/TimeTable";
import AddTimeTable from "./components/pages/Time Table/AddTimeTable";
import EditTimeTable from "./components/pages/Time Table/EditTimeTable";
import EditBook from "./components/pages/Library/EditBook";
import Sports from "./components/pages/Sports/Sports";
import AddSports from "./components/pages/Sports/AddSports";
import EditSports from "./components/pages/Sports/EditSports";
import Hostel from "./components/pages/Hostel/Hostel";
import AddHostel from "./components/pages/Hostel/AddHostel";
import EditHostel from "./components/pages/Hostel/EditHostel";
import Transport from "./components/pages/Transports/Transport";
import AddTransport from "./components/pages/Transports/AddTransport";
import EditTransport from "./components/pages/Transports/EditTransport";
import Event from "./components/pages/Events/Event";
import AddEvent from "./components/pages/Events/AddEvent";
import BasicTables from "./components/pages/Table/BasicTable";
import DataTables from "./components/pages/Table/DataTable";
import BasicInputs from "./components/pages/Forms/BasicInputs";
import FormInputGroups from "./components/pages/Forms/FormInputGroups";
import FormMask from "./components/pages/Forms/FormMask";
import FormValidation from "./components/pages/Forms/FormValidation";
import HorizontalForm from "./components/pages/Forms/HorizontalForm";
import VerticalForm from "./components/pages/Forms/VerticalForm";
import FeatherIcons from "./components/pages/Icons/Feather";
import FlagIcons from "./components/pages/Icons/Flag";
import FontawesomeIcons from "./components/pages/Icons/Font-awesome";
import IonicIcons from "./components/pages/Icons/Ionic";
import MaterialIcons from "./components/pages/Icons/Material";
import PE7Icons from "./components/pages/Icons/Pe7";
import SimplelineIcons from "./components/pages/Icons/Simpleline";
import ThemifyIcons from "./components/pages/Icons/Themify";
import WeatherIcons from "./components/pages/Icons/Weather";
import TypiconIcons from "./components/pages/Icons/Typicon";
import Ribbon from "./components/pages/Elements/Ribbon";
import Rating from "./components/pages/Elements/Rating";
import Texteditor from "./components/pages/Elements/Texteditor";
import Counter from "./components/pages/Elements/Counter";
import Scrollbar from "./components/pages/Elements/ScrollBar";
import Notification from "./components/pages/Elements/Notification";
import Stickynote from "./components/pages/Elements/StickyNote";
import Timeline from "./components/pages/Elements/TimeLine";
import Formwizard from "./components/pages/Elements/FormWizard";
import HorizontalTimeLine from "./components/pages/Elements/HorizontalTimeLine";
import ApexCharts from "./components/pages/Charts/ApexChart";
import ChartJs from "./components/pages/Charts/ChartJs";
import MorrisCharts from "./components/pages/Charts/MorrisChart";
import FlotCharts from "./components/pages/Charts/FlotChart";
import PeityChart from "./components/pages/Charts/PeityChart";
import C3Charts from "./components/pages/Charts/C3Chart";
import ClipBoard from "./components/pages/Elements/ClipBoard";
import UiTooltip from "./components/pages/Base UI/Tooltip";
import Toastr from "./components/pages/Base UI/Toast";
import Spinner from "./components/pages/Base UI/Spinner";
import PopOver from "./components/pages/Base UI/PopOver";
import LightBox from "./components/pages/Base UI/LightBox";
import Cards from "./components/pages/Base UI/Cards";
import Pagination from "./components/pages/Base UI/Pagination";
import Tableavatar from "./components/pages/Base UI/Avatar";
import Tabs from "./components/pages/Base UI/Tabs";
import Typography from "./components/pages/Base UI/Typography";
import Progressbar from "./components/pages/Base UI/ProgressBar";
import Buttons from "./components/pages/Base UI/Buttons";
import Video from "./components/pages/Base UI/Video";
import Sweetalert from "./components/pages/Base UI/SweetAlert";
import Images from "./components/pages/Base UI/Images";
import Grid from "./components/pages/Base UI/Grid";
import ButtonGroup from "./components/pages/Base UI/ButtonGroup";
import Badge from "./components/pages/Base UI/Badge";
import Accordion from "./components/pages/Base UI/Accordion";
import Alert from "./components/pages/Base UI/Alert";
import PlaceHolder from "./components/pages/Base UI/PlaceHolder";
import OffCanvas from "./components/pages/Base UI/OffCanvas";
import Modal from "./components/pages/Base UI/Modal";
import Media from "./components/pages/Base UI/Media";
import Carousel from "./components/pages/Base UI/Carousel";
import BreadCrumbs from "./components/pages/Base UI/BreadCrumbs";
import Error404 from "./components/pages/Authentication/Error-404";
import RangeSlider from "./components/pages/Base UI/RangeSlider";
import DragDrop from "./components/pages/Elements/Drag&Drop";
import Dropdown from "./components/pages/Base UI/DropDown";
import EditEvent from "./components/pages/Events/EditEvent";
import RequireAuth from "./utils/RequireAuth";
import RequirePermission from "./utils/RequierPermission";
import EditAdmin from "./components/pages/Admins/EditAdmin";
import RolesList from "./components/pages/Roles/RolesList";
import AddRole from "./components/pages/Roles/AddRole";
import ListFaculties from "./components/pages/Faculties/ListFaculties";
import AddFaculty from "./components/pages/Faculties/AddFaculty";
import UpdateFaculty from "./components/pages/Faculties/UpdateFaculty";
import FacultyDashboard from "./components/pages/Faculty/FacultyDashboard";
import ListExams from "./components/pages/Exams/ListExams";
import StudentsList from "./components/pages/Students/StudentsList";
import ListAssignments from "./components/pages/Assignments/AssignmentsList";
import ListCourses from "./components/pages/Courses/CoursesList";
import Header from "./components/Header/Header";
import Layout from "./Layout";
import Page404 from "./errorpage/Page404";
import DepartmentsList from "./components/pages/Departments/DipartmentsList";
import AddTeacher from "./components/pages/Teachers/TeachersAdd";
import EditTeacher from "./components/pages/Teachers/TeachersEdit";
import AddCourse from "./components/pages/Courses/AddCourse";
import UpdateCourse from "./components/pages/Courses/UpdateCourse";
import GroupsList from "./components/pages/Groups/GroupsList";
import AddGroup from "./components/pages/Groups/AddGroup";
import UpdateGroup from "./components/pages/Groups/UpdateGroup";
import AddStudent from "./components/pages/Students/AddStudent";
import UpdateStudent from "./components/pages/Students/UpdateStudent";
import UpdateDepartment from "./components/pages/Departments/UpdateDepartment";
import TeachersRolesList from "./components/pages/Teachers/Roles/RolesList";
import AddTeacherRole from "./components/pages/Teachers/Roles/AddRole";
import UpdateTeacherRole from "./components/pages/Teachers/Roles/UpdateRole";
import ListCategory from "./components/pages/Courses/Categories/ListCategories";
import AddCategory from "./components/pages/Courses/Categories/AddCategory";
import UpdateCategory from "./components/pages/Courses/Categories/UpdateCategory";
import ListLessons from "./components/pages/Courses/Categories/Lessons/ListLessons";
import AddLesson from "./components/pages/Courses/Categories/Lessons/AddLesson";
import UpdateLesson from "./components/pages/Courses/Categories/Lessons/UpdateLessons";
import ListLessonContents from "./components/pages/Courses/Categories/Lessons/LessonContent/ViewAllContent";
import AddLessonContent from "./components/pages/Courses/Categories/Lessons/LessonContent/AddLessonContent";
import UpdateLessonContent from "./components/pages/Courses/Categories/Lessons/LessonContent/UpdateLessonContent";



const AppContainer = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/404" element={<Page404 />} />
      <Route path="/" element={<Layout />}>
        <Route element={<RequireAuth allowedRole="admin" />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route element={<RequirePermission allowedPermission={"view_any_admin"} />}>
            <Route path="/admins/view" element={<Admins />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_admin" />}>
            <Route path="/admins/create" element={<AddAdmin />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_admin" />}>
            <Route path="/admins/edit/:id" element={<EditAdmin />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_role" />}>
            <Route path="/admins/roles" element={<RolesList />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_role" />}>
            <Route path="/admins/roles/create" element={<AddRole />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_faculty" />}>
            <Route path="/admin/all-faculties" element={<ListFaculties />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_faculty" />}>
            <Route path="/admin/faculties/create" element={<AddFaculty />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_faculty" />}>
            <Route path="/admin/faculties/edit/:id" element={<UpdateFaculty />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_faculty" />}>
            <Route path="/admin/faculties/:id/dashboard" element={<FacultyDashboard />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_faculty" />}>
            <Route path="/admin/faculties/:id/exams" element={<ListExams />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_student" />}>
            <Route path="/admin/faculties/:id/students" element={<StudentsList />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_student" />}>
            <Route path="/admin/faculties/:id/students/create" element={<AddStudent />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_student" />}>
            <Route path="/admin/faculties/:id/students/:studentId/edit" element={<UpdateStudent />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_faculty" />}>
            <Route path="/admin/faculties/:id/assignments" element={<ListAssignments />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_faculty" />}>
            <Route path="/admin/faculties/:id/courses" element={<ListCourses />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_department" />}>
            <Route path="/admin/faculties/:id/departments" element={<DepartmentsList />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_department" />}>
            <Route path="/admins/teachers" element={<TeachersList />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_department" />}>
            <Route path="/admins/teachers/create" element={<AddTeacher />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_department" />}>
            <Route path="/admins/teachers/edit/:id" element={<EditTeacher />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_course" />}>
            <Route path="/admin/faculties/:id/courses/create" element={<AddCourse />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_department" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/edit" element={<UpdateCourse />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_department" />}>
            <Route path="/admin/faculties/:id/departments/create" element={<AddDepartment />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_department" />}>
            <Route path="/admin/faculties/:id/departments/:departmentId/edit" element={<UpdateDepartment />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_group" />}>
            <Route path="/admin/faculties/:id/groups" element={<GroupsList />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_group" />}>
            <Route path="/admin/faculties/:id/groups/create" element={<AddGroup />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_group" />}>
            <Route path="/admin/faculties/:id/groups/:groupId/edit" element={<UpdateGroup />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_role" />}>
            <Route path="/admins/teachers/roles" element={<TeachersRolesList />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_role" />}>
            <Route path="/admins/teachers/roles/create" element={<AddTeacherRole />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_role" />}>
            <Route path="/admins/teachers/roles/:id/edit" element={<UpdateTeacherRole />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_course_content_category" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories" element={<ListCategory />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_course_content_category" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/create" element={<AddCategory />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_course_content_category" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/edit" element={<UpdateCategory />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="view_any_lesson" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/lessons" element={<ListLessons />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="create_lesson" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/lessons/create" element={<AddLesson />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_lesson" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/lessons/:lessonId/edit" element={<UpdateLesson />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_lesson" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/lessons/:lessonId/lesson-content" element={<ListLessonContents />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_lesson" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/lessons/:lessonId/lesson-content/create" element={<AddLessonContent />} />
          </Route>
          <Route element={<RequirePermission allowedPermission="edit_lesson" />}>
            <Route path="/admin/faculties/:id/courses/:courseId/categories/:categoryId/lessons/:lessonId/lesson-content/:contentId/edit" element={<UpdateLessonContent />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppContainer;

