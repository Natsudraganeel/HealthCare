import {React,useContext} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
//import Signup from './components/signup';
import Home from './components/Home';
import About from './components/About';
//import Nutrient from './components/Nutrient';
import Doctors from './components/Doctors';

import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import PatientDashboard from './components/patientDashboard';
import DoctorDashboard from './components/doctordashboard';
import Signin from './components/Signin1';
import Signup from './components/Signup1';
import PatientForm from './components/PatientForm';
import DoctorForm from './components/DoctorForm';
import UserContextProvider from '../context/UserContextProvider';
import Forgot from './components/forgotPassword';
import Spinner from './components/spinner';
import OtpInput from './components/fresh';
import Changepassword from './components/Changepassword';
import PatientProvider from '../context/PatientcontextProvider';
import UpdatePatientForm from './components/Updatepatientform';
import UpdateDoctorForm from './components/UpdateDoctorform';
import Workout from './components/Workout';
import Nutrient from './components/Nutrient';
import DoctorProvider from '../context/DoctorContextProvider';

const App = () => {

  return (
    <>
      {/* <Navbar/> */}

      {/* <main>
        {/* <div id="home" >
          <Home/>
        </div>

        <div id="about" >
          <About/>
        </div>
        
        <div id="nutrition">
          <Nutrient/>
        </div>

        <div id="doctors">
          <Doctors/>
        </div>

        <div id="workout">
          <Workout/>
        </div> */}
      {/* <Dashboard/>; */}

      {/* <Signin/>; */}
      {/* <Signup/>;
        
      </main> */}
      
      <UserContextProvider>
  <DoctorProvider>
    <PatientProvider>
        <BrowserRouter>
          <Navbar />
          {/* <Alert alert={alert}/> */}
          <div className="main_container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              {/* <Route exact path='/about' element={<About />} /> */}
              <Route exact path='/changepassword' element={<Changepassword/>}></Route>
              <Route exact path='/signin' element={<Signin />} />
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/patient-form' element={<PatientForm />} />
              <Route exact path='/patient-dashboard' element={<PatientDashboard />} />
              <Route exact path='/doctor-dashboard' element={<DoctorDashboard />} />
              <Route exact path='/doctors' element={<Doctors />} />
              <Route exact path='/doctor-form' element={<DoctorForm />} />
              <Route exact path='/forget-password' element={<Forgot />} />
              <Route exact path='/spinner' element={<Spinner />} />
              <Route exact path='update-patient' element={<UpdatePatientForm/>}/>
<Route exact path="/about" element={<About/>}/>
<Route exact path="/workout" element={<Workout/>}/>
              <Route exact path="/nutrition" element={<Nutrient/>}/>
              <Route exact path="/update-doctor" element={<UpdateDoctorForm/>}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </PatientProvider>
        </DoctorProvider>
      </UserContextProvider>
    </>
  )
}

export default App;