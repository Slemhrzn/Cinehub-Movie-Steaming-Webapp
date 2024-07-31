/* The provided code is a React functional component named `Login`. It represents a login form UI.
Here's a breakdown of what the code is doing: */
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [user,setUser] = useState({});
  console.log(user)
  

  const hanleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    axios.post("http://localhost/cinehub/user/loginuser.php",data)
    .then(response=>{
      console.log(response.data.message)
      setUser(response.data.message)
      
      let role = response.data.message.role
      if(role === "USER"){
        navigate("/homepage")
      }
      else if(role === "ADMIN"){
        navigate("/admin")
      }else{
        alert(response.data.message)
      }
      localStorage.setItem("user",JSON.stringify(response.data.message))
      // console.log(response.data)
    })
    

    }
    // console.log(data);
  return (
    <div className="login_container">
      <div className="login_box">

        <div className="login_left">
          <h1>Welcome back!</h1>
        </div>

        <div className="login_right">
          <div style={{height:"80%" , width:"70%"}}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <h2 style={{ fontFamily: "'Lobster', cursive" }}>Login</h2>
              <p style={{ fontFamily: "'Lobster', cursive", fontSize: "12px",marginBottom:"20px" }}>
                Welcome back! Please login to your account.
              </p>
            </div>

            <div className="login_form_box">
              <form onSubmit={hanleSubmit}>
                <div style={{marginBottom:"20px",  fontFamily: "'Lobster', cursive", fontSize:"15px", color:"white"}}>
                  <label htmlFor="">Email</label>
                  <div>
                    <input style={{borderRadius:"10px",border:"2px solid black",width:"150px" }}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      type="text"
                      
                    />
                  </div>
                </div>

                <div style={{marginBottom:"20px"}}>
                  <div style={{ fontFamily: "'Lobster', cursive", fontSize:"15px", color:"white"}}>
                    <label htmlFor="">Password</label>
                  </div>
                  <input style={{borderRadius:"10px",border:"2px solid black", width:"150px"}}
                    type="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    name=""
                    id=""
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "80px",
                  }}
                >

                  {/* <div style={{ fontFamily: "'Lobster', cursive", fontSize:"14px" }}>
                    <input type="checkbox" name="" id="" />
                    Remember me
                  </div>
                  <div  style={{ fontFamily: "'Lobster', cursive", fontSize:"14px" }}>Forgot password?</div> */}
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{ fontFamily: "'Lobster', cursive" }}
                    className="login_button"
                  >
                    Login
                  </button>
                </div>
                
                <div>
                    <p style={{color:"black", marginTop:"20px",fontFamily: "'Lobster', cursive",fontSize:"12px"}}>New User? <Link style={{color:"whitesmoke"}} to={'/register'}>Register now !</Link></p>
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
