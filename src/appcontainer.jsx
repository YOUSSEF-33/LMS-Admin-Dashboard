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
import AddStudent from "./components/pages/Students/AddStudent";
import EditStudent from "./components/pages/Students/EditStudent";
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

const AppContainer = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login-admin" element={<LoginAdmin />} />

      <Route element={<RequireAuth allowedRole="admin" />}>
        <Route element={<RequirePermission allowedPermission={"view_any_admin"} />}>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/admins" element={<Admins />} />
        </Route>
      </Route>

      <Route path="/teacherdashboard" element={<TeacherDashboard />} />
      <Route path="/studentdashboard" element={<StudentsDashboard />} />

      <Route path="/blog" element={<BlogView />} />
      <Route path="/pendingblog" element={<PendingBlog />} />
      <Route path="/addblog" element={<AddBlog />} />
      <Route path="/editblog" element={<EditBlog />} />
      <Route path="/blogdetails" element={<Blogdetails />} />
      <Route path="/profile" element={<Profile />} />

      <Route path="/blankpage" element={<BlankPage />} />
      <Route path="/basictable" element={<BasicTable />} />
      <Route path="/datatable" element={<DataTable />} />

      <Route path="/students" element={<Students />} />
      <Route path="/studentsview" element={<StudentsView />} />
      <Route path="/addstudent" element={<AddStudent />} />
      <Route path="/editstudent" element={<EditStudent />} />
      <Route path="/studentgrid" element={<StudentGrid />} />

      <Route path="/invoicegrid" element={<InvoiceGrid />} />
      <Route path="/invoicepaid" element={<InvoicePaid />} />
      <Route path="/invoiceoverdue" element={<InvoiceOverdue />} />
      <Route path="/invoicedraft" element={<InvoiceDraft />} />
      <Route path="/invoicerecurring" element={<InvoiceRecurring />} />
      <Route path="/invoicecancelled" element={<InvoiceCancelled />} />
      <Route path="/addinvoice" element={<AddInvoice />} />
      <Route path="/editinvoice" element={<EditInvoice />} />
      <Route path="/viewinvoice" element={<ViewInvoice />} />
      <Route path="/invoicesetting" element={<InvoiceSettings />} />
      <Route path="/invoicelist" element={<InvoiceList />} />
      <Route path="/taxsetting" element={<TaxSetting />} />
      <Route path="/banksetting" element={<BankSetting />} />

      <Route path="/inbox" element={<Inbox />} />
      <Route path="/compose" element={<Compose />} />

      {/* Settings */}
      <Route path="/generalsettings" element={<GendralSettings />} />
      <Route path="/localization" element={<Localization />} />
      <Route path="/paymentsettings" element={<PaymentSettings />} />
      <Route path="/emailsettings" element={<EmailSettings />} />
      <Route path="/socialsettings" element={<SocialSettings />} />
      <Route path="/sociallinks" element={<SocialLinks />} />
      <Route path="/seo" element={<Seo />} />
      <Route path="/othersettings" element={<OtherSettings />} />

      <Route path="/librarylist" element={<LibraryList />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/editbook" element={<EditBook />} />

      <Route path="/teacherslist" element={<TeachersList />} />
      <Route path="/teachersprofile" element={<TeachersProfile />} />
      <Route path="/addteacher" element={<TeachersAdd />} />
      <Route path="/editteacher" element={<TeachersEdit />} />
      <Route path="/teachersgrid" element={<TeachersGrid />} />

      <Route path="/department" element={<DepartmentList />} />
      <Route path="/adddepartment" element={<AddDepartment />} />
      <Route path="/editdepartment" element={<EditDepartment />} />

      <Route path="/subject" element={<SubjectList />} />
      <Route path="/addsubject" element={<AddSubject />} />
      <Route path="/editsubject" element={<EditSubject />} />

      <Route path="/feescollection" element={<FeesCollection />} />
      <Route path="/addfeescollection" element={<AddFeesCollection />} />
      <Route path="/expenses" element={<Expenses />} />
      <Route path="/addexpenses" element={<AddExpenses />} />
      <Route path="/salary" element={<Salary />} />
      <Route path="/addsalary" element={<AddSalary />} />

      <Route path="/holiday" element={<Holiday />} />
      <Route path="/addholiday" element={<AddHoliday />} />

      <Route path="/fees" element={<Fees />} />
      <Route path="/addfees" element={<AddFees />} />
      <Route path="/editfees" element={<EditFees />} />

      <Route path="/exam" element={<Exam />} />
      <Route path="/addexam" element={<AddExam />} />
      <Route path="/editexam" element={<EditExam />} />

      <Route path="/timetable" element={<TimeTable />} />
      <Route path="/addtimetable" element={<AddTimeTable />} />
      <Route path="/edittimetable" element={<EditTimeTable />} />

      <Route path="/sports" element={<Sports />} />
      <Route path="/addsports" element={<AddSports />} />
      <Route path="/editsports" element={<EditSports />} />

      <Route path="/hostel" element={<Hostel />} />
      <Route path="/addhostel" element={<AddHostel />} />
      <Route path="/edithostel" element={<EditHostel />} />

      <Route path="/transport" element={<Transport />} />
      <Route path="/addtransport" element={<AddTransport />} />
      <Route path="/edittransport" element={<EditTransport />} />

      <Route path="/event" element={<Event />} />
      <Route path="/addevent" element={<AddEvent />} />
      <Route path="/editevent" element={<EditEvent />} />

      <Route path="/basictable" element={<BasicTables />} />
      <Route path="/datatable" element={<DataTables />} />

      <Route path="/basicinput" element={<BasicInputs />} />
      <Route path="/forminputgroup" element={<FormInputGroups />} />
      <Route path="/formmask" element={<FormMask />} />
      <Route path="/formvalidation" element={<FormValidation />} />
      <Route path="/horizontalform" element={<HorizontalForm />} />
      <Route path="/verticalform" element={<VerticalForm />} />

      <Route path="/feathericons" element={<FeatherIcons />} />
      <Route path="/flagicons" element={<FlagIcons />} />
      <Route path="/fontawesomeicons" element={<FontawesomeIcons />} />
      <Route path="/iconicicons" element={<IonicIcons />} />
      <Route path="/materialicons" element={<MaterialIcons />} />
      <Route path="/flagicons" element={<FlagIcons />} />
      <Route path="/pe7icons" element={<PE7Icons />} />
      <Route path="/simplelineicons" element={<SimplelineIcons />} />
      <Route path="/themifyicons" element={<ThemifyIcons />} />
      <Route path="/weathericons" element={<WeatherIcons />} />
      <Route path="/typiconicons" element={<TypiconIcons />} />

      <Route path="/ribbon" element={<Ribbon />} />
      <Route path="/dragdrop" element={<DragDrop />} />
      <Route path="/clipboard" element={<ClipBoard />} />
      <Route path="/rating" element={<Rating />} />
      <Route path="/texteditor" element={<Texteditor />} />
      <Route path="/counter" element={<Counter />} />
      <Route path="/scrollbar" element={<Scrollbar />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/stickynote" element={<Stickynote />} />
      <Route path="/timeline" element={<Timeline />} />
      <Route path="/horizontaltimeline" element={<HorizontalTimeLine />} />
      <Route path="/formwizard" element={<Formwizard />} />

      <Route path="/apexchart" element={<ApexCharts />} />
      <Route path="/chartjs" element={<ChartJs />} />
      <Route path="/morrischart" element={<MorrisCharts />} />
      <Route path="/flotchart" element={<FlotCharts />} />
      <Route path="/peitychart" element={<PeityChart />} />
      <Route path="/c3chart" element={<C3Charts />} />

      <Route path="/tooltip" element={<UiTooltip />} />
      <Route path="/toast" element={<Toastr />} />
      <Route path="/spinner" element={<Spinner />} />
      <Route path="/popover" element={<PopOver />} />
      <Route path="/rangeslider" element={<RangeSlider />} />
      <Route path="/lightbox" element={<LightBox />} />
      <Route path="/cards" element={<Cards />} />
      <Route path="/dropdown" element={<Dropdown />} />
      <Route path="/pagination" element={<Pagination />} />
      <Route path="/avatar" element={<Tableavatar />} />
      <Route path="/tabs" element={<Tabs />} />
      <Route path="/typography" element={<Typography />} />
      <Route path="/progressbar" element={<Progressbar />} />
      <Route path="/buttons" element={<Buttons />} />
      <Route path="/video" element={<Video />} />
      <Route path="/sweetalert" element={<Sweetalert />} />
      <Route path="/images" element={<Images />} />
      <Route path="/grid" element={<Grid />} />
      <Route path="/buttongroup" element={<ButtonGroup />} />
      <Route path="/badge" element={<Badge />} />
      <Route path="/accordion" element={<Accordion />} />
      <Route path="/alert" element={<Alert />} />
      <Route path="/placeholder" element={<PlaceHolder />} />
      <Route path="/offcanvas" element={<OffCanvas />} />
      <Route path="/media" element={<Media />} />
      <Route path="/carousel" element={<Carousel />} />
      <Route path="/breadcrumbs" element={<BreadCrumbs />} />
      <Route path="/modal" element={<Modal />} />
    </Routes>
  );
};

export default AppContainer;
