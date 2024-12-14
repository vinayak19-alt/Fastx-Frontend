import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RegisterComponent } from './components/RegisterComponent';
import { SaveUserComponent } from './components/SaveUserComponent';
import { LoginComponent } from './components/LoginComponent';
import RequireAuth from './components/RequireAuth';
import { BusSearch } from './components/BusSearch';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element={<RegisterComponent/>}/>
          <Route path='/register' element={<RegisterComponent/>}/>
          <Route path='/add-info' element={<SaveUserComponent/>}/>
          <Route path='/login' element={<LoginComponent/>}/>
          <Route element={<RequireAuth/>}>
            <Route path='/bus-search' element={<BusSearch/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
