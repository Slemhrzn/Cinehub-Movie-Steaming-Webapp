/* The provided code is a React functional component named `Login`. It represents a login form UI.
Here's a breakdown of what the code is doing: */
import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import Spline from "@splinetool/react-spline";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState({});
  console.log(user);

  const hanleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    axios
      .post("http://localhost/cinehub/user/loginuser.php", data)
      .then((response) => {
        console.log(response.data.message);
        setUser(response.data.message);

        let role = response.data.message.role;
        if (role === "USER") {
          navigate("/homepage");
        } else if (role === "ADMIN") {
          navigate("/admin");
        } else {
          alert(response.data.message);
        }
        localStorage.setItem("user", JSON.stringify(response.data.message));
        // console.log(response.data)
      });
  };

  function checkEmailExist(e) {
    const email = data.email;
    if (email.length <= 0) {
      alert("Enter Email");
      return;
    }

    axios
      .post("http://localhost/cinehub/user/getuser.php", { email })
      .then((res) => {
        const result = res.data.message;
        if (result == true) {
          const hint = prompt("Enter your favourite color:");
          const obj = {
            email: email,
            hint: hint,
          };
          axios
            .post("http://localhost/cinehub/user/getcolor.php", obj)
            .then((res) => {
              const result = res.data.message;
              if (result == true) {
                const newPassword = prompt("Enter Your New Password");
                const obj = {
                  email: email,
                  password: newPassword,
                };
                axios
                  .post(
                    "http://localhost/cinehub/user/postNewPassword.php",
                    obj
                  )
                  .then((res) => {
                    const result = res.data.message;
                    console.log(result);
                    if (result == true) {
                      alert("Password Updated");
                      window.location.reload(true);
                    } else {
                      alert("Something went wrong");
                    }
                  });
              } else {
                alert("Invalid Hint");
              }
            })
            .catch((err) => console.log(err));
        } else {
          alert("Email does not exist");
        }
      })
      .catch((err) => console.log(err));

    console.log(res);

    // alert(email)
  }

  // console.log(data);
  return (
    <div className="login_container">
      <div className="login_box">
        <div className="login_left">
          <span>Welcome to CineHub! 
            <br />Let's Explore the Best Films Together!</span>
          
        </div>

        <div className="login_right">
          <div
            style={{
              height: "80%",
              width: "70%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--mainfont)",
                  color: "whitesmoke",
                  fontWeight: "bold",
                }}
              >
                Welcome!
              </h2>
              <p
                style={{
                  fontFamily: "var(--mainfont)",
                  fontSize: "20px",
                  marginBottom: "20px",
                  color: "whitesmoke ",
                }}
              >
                Glad to See You ! Access Your Account
              </p>
            </div>

            <div className="login_form_box">
              <form onSubmit={hanleSubmit}>
                <div
                  style={{
                    marginBottom: "20px",
                    fontFamily: "var(--mainfont)",
                    fontSize: "18px",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  <label htmlFor="">Email</label>
                  <div>
                    <input
                      style={{
                        borderRadius: "10px",
                        border: "2px solid black",
                        width: "150px",
                      }}
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      type="text"
                      required
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "20px" }}>
                  <div
                    style={{
                      fontFamily: "var(--mainfont)",
                      fontSize: "18px",
                      color: "black",
                      fontWeight:"bold"
                    }}
                  >
                    <label htmlFor="">Password</label>
                  </div>
                  <input
                    style={{
                      borderRadius: "10px",
                      border: "2px solid black",
                      width: "150px",
                    }}
                    type="password"
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                    name=""
                    id=""
                    required
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "80px",
                  }}
                ></div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <button
                    style={{
                      fontFamily: "var(--mainfont)",
                      fontSize:"18px",
                      background: "#254369",
                      color: "white",
                      fontWeight:"bold"
                    }}
                    className="login_button"
                  >
                    Login
                  </button>
                </div>

                <div
                  onClick={checkEmailExist}
                  style={{
                    fontFamily: "Garamond",
                    fontWeight: "bold",
                    fontSize: "15px",
                    color: "black",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                >
                  Forgot password?{" "}
                </div>

                <div>
                  <p
                    style={{
                      color: "black",
                      marginTop: "20px",
                      fontFamily: "var(--mainfont)",
                      fontSize: "15px",
                      fontWeight:"bold"
                    }}
                  >
                    New User?{" "}
                    <Link style={{ color: "whitesmoke" }} to={"/register"}>
                      Register now !
                    </Link>
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

export default Login;
