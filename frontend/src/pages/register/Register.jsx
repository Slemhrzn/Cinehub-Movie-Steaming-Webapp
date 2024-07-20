/* The provided code is a React functional component named `Login`. It represents a login form UI.
Here's a breakdown of what the code is doing: */
import React, { useState } from "react";
import "./Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  console.log("Username: " + data.username);
  console.log("password: " + data.password);

  const hanleSubmit = (e) => {
    e.preventDefault();
    if (data.username === "admin" && data.password === "admin") {
      alert("Login success");
      navigate("/homepage");
    }
    console.log(data);
  };
  return (
    <div className="register_container">
      <div className="register_box">
        <div className="register_left">
          <h1>Welcome back!</h1>
        </div>
        <div className="register_right">
          <div style={{height:"80%", width:"70%"}}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px",marginBottom:"20px" }}
            >
              <h2 style={{ fontFamily: "'Lobster', cursive" }}>Login</h2>
              <p style={{ fontFamily: "'Lobster', cursive", fontSize: "12px" }}>
                Welcome back! Please login to your account.
              </p>
            </div>
            <div className="register_form_box">
              <form onSubmit={hanleSubmit}>
                <div style={{marginBottom:"20px"}} >
                  <label htmlFor="">Username</label>
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
                    <label htmlFor="">Password</label>
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
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "80px",
                  }}
                >
                  <div>
                    <input type="checkbox" name="" id="" />
                    Remember me
                  </div>
                  <div>Forgot password?</div>
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
                    className="register_button"
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
