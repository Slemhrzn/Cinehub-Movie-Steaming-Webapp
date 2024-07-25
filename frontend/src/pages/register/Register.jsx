/* The provided code is a React functional component named `Login`. It represents a login form UI.
Here's a breakdown of what the code is doing: */
import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/cinehub/user/registeruser.php", data)
      .then((response) => {
        alert(response.data.message);
        console.log(response.data.message);
      });
  };
  return (
    <div className="register_container">
      <div className="register_box">
        <div className="register_left">
          <h1 style={{ color: "black" }}>Join Cinehub!</h1>
        </div>

        <div className="register_right">
          <div style={{ height: "80%", width: "70%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <h2 style={{ fontFamily: "'Lobster', cursive" }}>Register</h2>
              <p
                style={{
                  fontFamily: "'Lobster', cursive",
                  fontSize: "12px",
                }}
              >
                Hello there! Please register to create an account.
              </p>
            </div>

            <div className="register_form_box">
              <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                <div className="register_input_container">
                  <label
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: "15px",
                      marginRight: "-0.3rem",
                      color:"black",
                      
                    }}
                    htmlFor=""
                  >
                    Name
                  </label>

                  <input
                    style={{ width: "150px",  height:"35px",   marginLeft: "30px"}}
                    className="register_input"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    type="text"
                  />
                </div>

                <div className="register_input_container">
                  <label
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: "15px",
                      marginRight: "1.8rem",
                      color:"black"
                    }}
                    htmlFor=""
                  >
                    Email
                  </label>

                  <input
                    style={{ width: "150px" ,height:"35px" }}
                    className="register_input"
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                    type="text"
                  />
                </div>

                <div className="register_input_container">
                  <label
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: "15px",
                      color:"black"
                    }}
                    htmlFor=""
                  >
                    Password
                  </label>

                  <input
                    style={{ width: "150px" ,height:"35px" }}
                    className="register_input"
                    type="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
                </div>
                <div className="register_input_container">
                  <label
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: "15px",
                      color:"black"
                    }}
                    htmlFor=""
                  >
                    <div>Confirm</div> <div>Password</div>
                  </label>

                  <input
                    style={{ width: "150px" ,height:"35px" }}
                    className="register_input"
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
                    alignItems: "center",
                    justifyContent: "center",
                   
                  }}
                >
                  <button
                    type="submit"
                    style={{ fontFamily: "'Lobster', cursive" }}
                    className="register_button"
                  >
                    Register
                  </button>
                </div>

                <div>
                  <p
                    style={{
                      color: "black",
                      marginTop: "20px",
                      fontFamily: "'Lobster', cursive",
                      fontSize: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    Thank you for registering !
                  </p>
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
