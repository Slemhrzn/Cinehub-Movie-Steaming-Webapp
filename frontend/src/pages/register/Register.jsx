import React, { useState } from "react";
import "./Register.css";

const Register = () => {
    const [data, setData] = useState({

    });
    const hanleSubmit=()=>{

    }
  return (
    <div className="register_container">
      <div className="register_box">
        <div className="register_left">
          <h1 style={{ fontFamily: "'Lobster', cursive" , color: "black"}}>Register now !</h1>
        </div>
        <div className="register_right">
            <div>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <h2 style={{color:"whitesmoke"}}>Register</h2>
                <p style={{color:"whitesmoke"}}>Hey there! Please register to create an account.</p>
                </div>
            <div className="register_form">
            <form onSubmit={hanleSubmit}>
                <div>
                  <label style={{color:"whitesmoke"}} htmlFor="">Username</label>
                  <div>
                    <input
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label style={{color:"whitesmoke"}} htmlFor="">Password</label>
                  </div>
                  <input
                    type="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    name=""
                    id=""
                  />
                </div>
                <div>
                  <div>
                    <label style={{color:"whitesmoke"}} htmlFor="">Email</label>
                  </div>
                  <input
                    type="email"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    name=""
                    id=""
                  />
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
                    Register
                  </button>
                </div>
              </form>
               
            </div>
            </div>

          
        </div>
      </div>
    </div>
  );
};

export default Register;
