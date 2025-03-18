import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterComponent } from './components/RegisterComponent';
import { SaveUserComponent } from './components/SaveUserComponent';
import { LoginComponent } from './components/LoginComponent';
import RequireAuth from './components/RequireAuth';
import { BusSearch } from './components/BusSearch';
import SelectBusComponent from './components/SelectBusComponent';
import { SelectSeatsComponent } from './components/SelectSeatsComponent';
import { MyBookingsComponent } from './components/MyBookingsComponent';
import { BookingSuccessComponent } from './components/BookingSuccessComponent';
import { BusOperatorDashboardComponent } from './components/busOperatorComponents/BusOperatorDashboardComponent';
import { AddBusComponent } from './components/busOperatorComponents/AddBusComponent';
import { GetAllRoutesComponent } from './components/busOperatorComponents/GetAllRoutesComponent';
import { AddRouteComponent } from './components/busOperatorComponents/AddRouteComponent';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { BusForOperator } from './components/busOperatorComponents/BusForOperator';
import { BookingsForBusComponent } from './components/busOperatorComponents/BookingsForBusComponent';
import { AdminDashboardComponent } from './components/adminComponents/AdminDashboardComponent';
import { GetOperatorsComponent } from './components/adminComponents/GetOperatorsComponent';
import { GetUsersComponent } from './components/adminComponents/GetUsersComponent';
import { RegisterOperatorComponent } from './components/adminComponents/RegisterOperatorComponent';
import { AddOperatorComponent } from './components/adminComponents/AddOperatorComponent';
import { UpdateOperatorComponent } from './components/adminComponents/UpdateOperatorComponent';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes>
          <Route index element={<RegisterComponent/>}/>
          <Route path='/register' element={<RegisterComponent/>}/>
          <Route path='/add-info' element={<SaveUserComponent/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          <Route path='/welcome' element={<LandingPage/>}/>
          <Route element={<RequireAuth/>}>
            <Route path='/bus-search' element={<BusSearch/>}/>
            <Route path='/select-bus' element={<SelectBusComponent/>}/>
            <Route path='/select-seats' element={<SelectSeatsComponent/>}/>
            <Route path='/my-bookings' element={<MyBookingsComponent/>}/>
            <Route path='/success' element={<BookingSuccessComponent/>}/>
            <Route path='/operator-dashboard' element={<BusOperatorDashboardComponent/>}/>
            <Route path='/add-bus' element={<AddBusComponent/>}/>
            <Route path='/add-route' element={<AddRouteComponent/>}/>
            <Route path='/get-routes' element={<GetAllRoutesComponent/>}/>
            <Route path='/get-buses' element={<BusForOperator/>}/>
            <Route path='/bus-for-operator' element={<BusForOperator/>}/>
            <Route path='/bookings-for-bus' element={<BookingsForBusComponent/>}/>
            <Route path='/admin-dashboard' element={<AdminDashboardComponent/>}/>
            <Route path='/get-users' element={<GetUsersComponent/>}/>
            <Route path='/get-operators' element={<GetOperatorsComponent/>}/>
            <Route path='/register-operator' element={<RegisterOperatorComponent/>}/>
            <Route path='/add-operator-info' element={<AddOperatorComponent/>}/>
            <Route path='/update-operator/:operatorId' element={<UpdateOperatorComponent/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
