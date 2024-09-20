import React, { useContext, useState } from 'react'

import { Route, Routes } from 'react-router-dom'
import Login from "./Components/LoginPage/login"
import Footer from './Components/Footer/Footer'
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import Sidebar from "./Components/sidebar/sidebar";
import { Storecontext } from "./Context/storecontext"; 

import Add from "./pages/add/Add";
import List from "./pages/list/List";

import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import Edit from './pages/Edit/Edit'

const App = () => {
  const { token } = useContext(Storecontext);
  const [showLogin, setShowLogin] = useState(false);
  const url = "http://localhost:4000";

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}

      <div className="App">
        <ToastContainer />
        <div>
        <Navbar setShowLogin={setShowLogin} />
    <div>
        {!token ? (
          <Home />
        ) : (
          <>
            <Header />
            <Sidebar />
         <Routes>
         
         <Route path="/Login" element={<Login setShowLogin={setShowLogin} />} />
         
         <Route path="/Add" element={<Add url={url} />} />
         <Route path="/List" element={<List url={url} />} />
         <Route path="/Edit" element={<Edit url={url} />} />
       </Routes>

            
          </>
        )}
        </div>

</div>

        
      </div>
  
    </>
  );
};

export default App;
