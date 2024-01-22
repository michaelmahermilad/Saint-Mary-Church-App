
import { Navigate, Routes } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import User from "./Pages/User";
import "./App.css";
import Attendance from "./Pages/Attendance";
import Attendance1 from "./Pages/Attendance1";
import Qr from "./Pages/Qr";
import { useEffect } from "react";
function App() {
 
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />}></Route>;
          <Route
            path="/activities"
            element={
              localStorage.getItem("go") == "7777777" ? (
                <Services />
              ) : (
                <Navigate replace to="/" />
              )
            }
          ></Route>
          ;
          <Route
            path="/user/:displayName"
            // the matching param will be available to the loader

            // and the action
            element={
             
                <User />
              
            }
          ></Route>

          ;
          <Route
            path="/user/:displayName/QR"
            // the matching param will be available to the loader

            // and the action
            element={
                 <Attendance1 />
              
            }
          ></Route>
          <Route
            path="/attendance"
            // the matching param will be available to the loader

            // and the action
            element={
                 <Attendance />
             
            }
          ></Route>
             <Route
            path="/:date/:name/:duration/:score"
            // the matching param will be available to the loader

            // and the action
            element={
                 <Qr />
            
            }
          ></Route>
          <Route
            path=":Page"
            element={
              
                <User />
            
            }
          ></Route>
          ;
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
