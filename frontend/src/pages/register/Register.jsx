/* The provided code is a React functional component named `Login`. It represents a login form UI.
Here's a breakdown of what the code is doing: */
import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
  });

  console.log(data);
  function handleEmail(e) {
    let email = e.target.value;
    if (validEmail(email)) {
      setData({ ...data, email: email });
      setEmailError(false); // Clear error if the email is valid
    } else {
      setEmailError(true); // Set error if the email is invalid
    }
    if (email.length === 0) {
      // Clear error if the input is empty
      setEmailError(false);
    }
  }

  function validEmail(email) {
    var reg = /^[a-zA-Z0-9_.]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
    return reg.test(email);
  }

  function handlePassword(e) {
    let password = e.target.value;
    if (validPasword(password)) {
      setData({ ...data, password: password });
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
    if (password.length == 0) {
      setPasswordError(false);
    }
  }
  function validPasword(password) {
    if (password.length >= 6) {
      return true;
    } else {
      return false;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/cinehub/user/registeruser.php", data)
      .then((response) => {
        alert(response.data.message);
        window.location.reload();
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
                      color: "black",
                    }}
                    htmlFor=""
                  >
                    Name
                  </label>

                  <input
                    style={{
                      width: "150px",
                      height: "35px",
                      marginLeft: "30px",
                      fontFamily: "'Lobster', cursive",
                    }}
                    className="register_input"
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    type="text"
                    required
                  />
                </div>

                <div className="register_input_container">
                  <label
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: "15px",
                      marginRight: "1.8rem",
                      color: "black",
                    }}
                    htmlFor=""
                  >
                    Email
                  </label>

                  <input
                    style={{
                      width: "150px",
                      height: "35px",
                      fontFamily: "'Lobster', cursive",
                    }}
                    className="register_input"
                    onChange={handleEmail}
                    type="text"
                    required
                  />
                </div>

                <div className="register_input_container">
                  <label
                    style={{
                      fontFamily: "'Lobster', cursive",
                      fontSize: "15px",
                      color: "black",
                    }}
                    htmlFor=""
                  >
                    Password
                  </label>

                  <input
                    style={{
                      width: "150px",
                      height: "35px",
                      fontFamily: "'Lobster', cursive",
                    }}
                    className="register_input"
                    type="password"
                    onChange={handlePassword}
                    required
                  />
                </div>
                <hr style={{background:"black",border:"none",height:"2px", marginRight:"1rem"  }} />

                <label
                  style={{
                    fontFamily: "'Lobster', cursive",
                    fontSize: "15px",
                    color: "black",
                  }}
                  htmlFor=""
                >
                  <span style={{ fontWeight: "bold" }}>
                    Recover Password-Hint:
                  </span>
                  <br />
                  <span>Your Favorite Color:</span>
                </label>
                <input
                  style={{
                    width: "150px",
                    height: "35px",
                    fontFamily: "'Lobster', cursive",
                  }}
                  className="register_input"
                  type="password"
                  onChange={handlePassword}
                  required
                />
                <hr style={{background:"black",border:"none",height:"2px", marginRight:"1rem"  }} />
                <div
                  style={{
                    transform: "translate(130px)",
                  }}
                >
                  <button
                    disabled={emailError}
                    type="submit"
                    style={{ fontFamily: "'Lobster', cursive" }}
                    className="register_button"
                  >
                    Register
                  </button>
                </div>
                <div style={{ color: "red", fontFamily: "cursive" }}>
                  {emailError && " Invalid email !! Please try again"}
                </div>
                <div style={{ color: "red", fontFamily: "cursive" }}>
                  {passwordError && " Invalid password!! Please try again"}
                </div>

                <div>
                  <div
                    style={{
                      color: "black",
                      marginTop: "20px",
                      fontFamily: "'Lobster', cursive",
                      fontSize: "12px",
                      marginBottom: "20px",
                    }}
                  >
                    Already have an account?{" "}
                    <Link style={{ color: "black" }} to="/">
                      Login
                    </Link>
                  </div>
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
