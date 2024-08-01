import React from "react";
import "./Addmovies.css";
import { useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const Addmovie = () => {
  const [submitBtn,setSubmitBtn] = useState(false)
  const[message,setMessage] = useState("processing please wait")
  const [data, setData] = useState({
    name: "",
    description: "",
    url: "qwe",
    image: "qwe",
    duration: "",
    releasedate: "",
    genre: [],
  });

  const [imageUpload, setImageUpload] = useState(null);
  const [videoUpload, setVideoUpload] = useState(null);
  console.log(videoUpload?.name)
  const [error, setError] = useState({
    hourErr: "",
    minuteErr: "",
  });

  const [genres, setGenres] = useState([
    "comedy",
    "thriller",
    "action",
    "romantic",
  ]);

  const [duration, setDuration] = useState({
    hour: "",
    minutes: "",
  });

  // console.log(duration);

  const handleChange = (e) => {
    const { checked, value } = e.target;
    console.log(value);
    if (checked) {
      setData({ ...data, genre: [...data.genre, value] });
    } else {
      setData({ ...data, genre: data.genre.filter((i) => i !== value) });
    }
  };
  console.log(data.genre);

  function handleHour(e) {
    const value = Number.parseInt(e.target.value);
    if (value <= 12 && value > -1) {
      setError({ ...error, hourErr: "" });
      setDuration({ ...duration, hour: value.toString() });
    } else {
      setError({ ...error, hourErr: "Invalid Hour input" });
      // setDuration({...duration,hour:""})
    }
  }

  function handleMinutes(e) {
    const value = Number.parseInt(e.target.value);
    if (value <= 59 && value > -1) {
      setError({ ...error, minuteErr: "" });
      setDuration({ ...duration, minutes: value.toString() });
    } else {
      setError({ ...error, minuteErr: "Invalid input in minute" });
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitBtn(true)
    const videoRef = ref(storage, `Movievideo/${videoUpload.name + v4()}`);
    const ImgRef = ref(storage, `Movieimage/${imageUpload.name + v4()}`);

    Promise.all([
      uploadBytes(videoRef, videoUpload),
      uploadBytes(ImgRef, imageUpload),
    ])
      .then(([videoSnapshot, imageSnapshot]) => {
        return Promise.all([
          getDownloadURL(videoSnapshot.ref),
          getDownloadURL(imageSnapshot.ref),
        ]);
      })
      .then(([videoURL, imageUrl]) => {
        return axios.post("http://localhost/cinehub/movies/postmovies.php", {
          ...data,
          image: imageUrl,
          url:videoURL,
          duration: `${duration?.hour}:${duration?.minutes}`,
        });
      }) .then((res) => {
        alert("Success!");
        setSubmitBtn(false)
        alert(res.data.status)
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
    // console.log(data);
  };

  return (
    <div className="addmovies_container">
      <div className="middle_container">
        <div
          style={{
            textAlign: "center",
            fontFamily: "cursive",
            marginTop: "20px",
          }}
        >
          <span>Add Movies form box !</span>
          {submitBtn && message}
        </div>

        <div className="addmoviesform_box">
          <form onSubmit={handleSubmit}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                onChange={(e) => setData({ ...data, name: e.target.value })}
                style={{ width: "200px" }}
                type="text"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <div
              class="mb-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label for="exampleInputEmail1" class="form-label">
                Description
              </label>
              <textarea
                onChange={(e) =>
                  setData({ ...data, description: e.target.value })
                }
                name=""
                id=""
              ></textarea>
            </div>

            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                URL
              </label>
              <input
                type="file"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) =>{
                  console.log(e.target.files[0])
                  setVideoUpload(e.target.files[0])
                  alert("Video hallyo hai")
                }}
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Image
              </label>
              <input
                type="file"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => setImageUpload(e.target.files[0])}
              />
            </div>

            <div>
              <div style={{ color: "red" }}>{error.hourErr}</div>
              <label htmlFor="">hour</label>
              <input type="number" onChange={handleHour} name="hour" id="" />
              <div style={{ color: "red" }}>{error.minuteErr}</div>
              <label htmlFor="">minutes</label>
              <input
                type="number"
                onChange={handleMinutes}
                name="minutes"
                id=""
              />
            </div>
            <div>
              <label htmlFor="">Release</label>
              <input
                type="date"
                onChange={(e) =>
                  setData({ ...data, releasedate: e.target.value })
                }
              />
            </div>
            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <h3>Choose genre</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  gap: "0px",
                }}
              >
                {genres.map((genre) => (
                  <>
                    <label htmlFor="">{genre}</label>
                    <input
                      onChange={handleChange}
                      value={genre}
                      type="checkbox"
                    />
                  </>
                ))}
              </div>
            </div>
            <button disabled={submitBtn} type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addmovie;
