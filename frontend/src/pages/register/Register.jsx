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
  const [hintError, setHintError] = useState(false);
  const[nameError,setNameError]=useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER",
    hint: "",
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
    var reg = /^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
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

  function handleHint(e) {
    const hint = e.target.value.toLowerCase();
    // console.log(hint)
    if (hint.length >= 3 && validHint(hint) && validColor(hint)) {
      setData({ ...data, hint: hint });
      setHintError(false);
    } else {
      setHintError(true);
    }
  }
  function validHint(hint) {
    const valid = /^[a-zA-Z]+$/;
    return valid.test(hint); //valid -> return true else false
  }

  function validColor(hint) {
    const validHint = [
      "black",
      "blue",
      "green",
      "red",
      "yellow",
      "purple",
      "brown",
      "white",
      "grey",
      "pink",
      "orange",
      "lavender",
    ];
    var result = validHint.includes(hint);
    return result;
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
          {/* <h1
            style={{
              color: "black",
              fontFamily: "var(--mainfont)",
            }}
          >
            Join Cinehub!
          </h1> */}
        </div>

        <div className="register_right">
          <div style={{ height: "80%", width: "70%" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mainfont)",
                  fontSize: "25px",
                  fontWeight: "bold",
                  color: "whitesmoke",
                }}
              >
                Welcome to CineHub! 🎬
              </span>
              <p
                style={{
                  fontFamily: "var(--mainfont)",
                  fontSize: "18px",
                  color: "whitesmoke",
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
                      marginRight: "-0.3rem",
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
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
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                    }}
                    className="register_input"
                    onChange={(e) => {
                      const value = e.target.value;
                      // Allow only letters and spaces
                      if (/^[a-zA-Z\s]*$/.test(value)) {
                        setData({ ...data, name: value });
                        setNameError(false);
                      }else{
                        setNameError(true);
                      }
                    }}
                    type="text"
                    required
                  />
                   {nameError && " Invalid name !! Please try again"}
                </div>

                <div className="register_input_container">
                  <label
                    style={{
                      marginRight: "1.8rem",
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Email
                  </label>

                  <input
                    style={{
                      width: "150px",
                      height: "35px",
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
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
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    htmlFor=""
                  >
                    Password
                  </label>

                  <input
                    style={{
                      width: "150px",
                      height: "35px",
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                    }}
                    className="register_input"
                    type="password"
                    onChange={handlePassword}
                    required
                  />
                </div>
                <hr
                  style={{
                    background: "black",
                    border: "none",
                    height: "2px",
                    marginRight: "1rem",
                  }}
                />

                <label
                  style={{
                    fontFamily: "var(--mainfont)",
                    fontSize: "18px",
                    color: "black",
                    fontWeight: "bold",
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
                    fontFamily: "var(--mainfont)",
                    fontSize: "18px",
                  }}
                  className="register_input"
                  type="text"
                  onChange={handleHint}
                  required
                />
                <hr
                  style={{
                    background: "black",
                    border: "none",
                    height: "2px",
                    marginRight: "1rem",
                  }}
                />
                <div
                  style={{
                    transform: "translate(130px)",
                  }}
                >
                  <button
                    disabled={emailError || nameError}
                    type="submit"
                    style={{
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                      color: "whitesmoke",
                      fontWeight: "bold",
                      background: "#254369",
                    }}
                    className="register_button"
                  >
                    Register
                  </button>
                </div>
                <div
                  style={{
                    color: "red",
                    fontFamily: "var(--mainfont)",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {emailError && " Invalid email !! Please try again"}
                </div>
                <div
                  style={{
                    color: "red",
                    fontFamily: "var(--mainfont)",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {passwordError && " Invalid password!! Please try again"}
                </div>

                <div
                  style={{
                    color: "red",
                    fontFamily: "var(--mainfont)",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  {hintError && " Invalid hint!! Please try again"}
                </div>

                <div>
                  <div
                    style={{
                      color: "black",
                      fontFamily: "var(--mainfont)",
                      fontSize: "15px",
                      marginBottom: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Have an account?{" "}
                    <Link
                      style={{
                        color: "whitesmoke",
                      }}
                      to="/"
                    >
                      Log in
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
