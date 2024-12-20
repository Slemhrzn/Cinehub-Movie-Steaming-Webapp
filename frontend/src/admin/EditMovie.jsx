import React, { useEffect } from "react";
import "./Addmovies.css";
import { useState } from "react";
import axios from "axios";
import { storage } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { ProgressBar } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
const EditMovie = () => {

  const navigate = useNavigate()
  const user = localStorage.getItem("user");
  if(!user){
    navigate("/")
  }
  const [data, setData] = useState({
    name: "",
    description: "",
    url: "",
    image: "",
    duration: "",
    releasedate: "",
    genre: [],
  });

  const [imageUpload, setImageUpload] = useState(null);
  const [videoUpload, setVideoUpload] = useState(null);

  console.log(data);
  const { id } = useParams();
  console.log(id);

  console.log(imageUpload);
  console.log(videoUpload);

  useEffect(() => {
    axios
      .get(`http://localhost/cinehub/movies/getmoviesbyId.php?id=${id}`)
      .then((res) => {
        console.log(res.data.message);
        setData({
          name: res.data.message.name,
          description: res.data.message.description,
          url: res.data.message.url,
          image: res.data.message.image,
          duration: res.data.message.duration,
          releasedate: res.data.message.releasedate,
          genre: JSON.parse(res.data.message.genre),
        });
      });
  }, []);

  // console.log(data?.genre);
  //   console.log(JSON.parse(data.genre))

  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [urlError, setUrlError] = useState(false);
  const [genreError, setGenreError] = useState(false);
  const [hourError, setHourError] = useState(false);
  const [minutesError, setMinutesError] = useState(false);
  const [postingButton, setPostingButton] = useState(false);
  const [releaseError, setReleaseError] = useState(false);

  // console.log(nameError);
  // console.log(descriptionError);
  // console.log(imageError);
  // console.log(urlError);
  // console.log(genreError);
  // console.log(hourError);
  // console.log(minutesError);
  // console.log(postingButton);
  // console.log(releaseError);

  // console.log(videoUpload?.name);
  const [error, setError] = useState({
    hourErr: "",
    minuteErr: "",
  });

  const [genres, setGenres] = useState([
    "Comedy",
    "Thriller",
    "Action",
    "Romantic",
    "Drama",
    "Horror",
  ]);

  const [duration, setDuration] = useState({
    hour: "",
    minutes: "",
  });

  // console.log(duration);

  const handleChange = (e) => {
    const { checked, value } = e.target;

    // Ensure genre is always an array
    const currentGenres = Array.isArray(data.genre) ? data.genre : [];

    if (checked) {
      setData({ ...data, genre: [...currentGenres, value] }); // Add the checked genre
    } else {
      setData({ ...data, genre: currentGenres.filter((i) => i !== value) }); // Remove the unchecked genre
    }
  };

  function handleHour(e) {
    const value = Number.parseInt(e.target.value);
    if (value <= 12 && value > -1) {
      setHourError(false);

      setDuration({ ...duration, hour: value.toString() });
    } else {
      setHourError(true);

      // setDuration({...duration,hour:""})
    }
  }

  function handleMinutes(e) {
    const value = Number.parseInt(e.target.value);
    if (value <= 59 && value > -1) {
      setMinutesError(false);
      setDuration({ ...duration, minutes: value.toString() });
    } else {
      setMinutesError(true);
    }
  }

  function handleName(e) {
    let name = e.target.value;
    console.log(name.length);
    if (name.length >= 0) {
      setData({ ...data, name: name });
      setNameError(false);
    } else {
      setNameError(true);
    }
  }

  function handleDescription(e) {
    let des = e.target.value;
    console.log(des);

    setData({ ...data, description: des });
    setDescriptionError(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Submiting");
    setPostingButton(true);
    // if (data.name.length <= 0) {
    //   setNameError(true);
    //   setPostingButton(false);
    //   return;
    // }

    // if (data.description.length < 10) {
    //   setPostingButton(false);
    //   setDescriptionError(true);
    //   return;
    // }

    // if (imageUpload == null) {
    //   setPostingButton(false);
    //   setImageError(true);
    //   return;
    // }
    // if (videoUpload == null) {
    //   // console.log(videoUpload);
    //   setPostingButton(false);
    //   setUrlError(true);
    //   return;
    // }

    // if (duration.hour <= 0 && duration.hour < 13) {
    //   setHourError(true);
    //   setPostingButton(false);
    //   return;
    // }

    // if (duration.minutes < 0 && duration.minutes > 60) {
    //   setPostingButton(false);
    //   setMinutesError(true);
    //   return;
    // }

    // if (data.releasedate <= 0) {
    //   setPostingButton(false);
    //   setReleaseError(true);
    //   return;
    // }

    // if (data?.genre?.length == 0) {
    //   setPostingButton(false);
    //   setGenreError(true);
    //   return;
    // }

    console.log(imageUpload);
    console.log(videoUpload);
    if (imageUpload == null && videoUpload == null) {
      axios
        .post("http://localhost/cinehub/movies/editmovie.php?id=" + id, {
          ...data,
          duration: `${duration?.hour}:${duration?.minutes}`,
        })
        .then((res) => {
          console.log(res);
          alert(res.data.status);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    } else {
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
          return axios.post(
            "http://localhost/cinehub/movies/editmovie.php?id=" + id,
            {
              ...data,
              image: imageUrl,
              url: videoURL,
              duration: `${duration?.hour}:${duration?.minutes}`,
            }
          );
        })
        .then((res) => {
          alert("Success!");
          setPostingButton(false);
          alert(res.data.status);
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
    // console.log(data);
  };

  const [selectedDate, setSelectedDate] = useState("");

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="addmovies_container">
      <div className="middle_container">
        <div
          style={{
            textAlign: "center",
            fontFamily: "var(--mainfont)",
            fontSize:"22px",
            marginTop: "20px",
            color:"whitesmoke"
          }}
        >
          <span style={{ fontWeight: "bold" }}>Edit Movies form box !</span>
        </div>

        <div className="addmoviesform_box">
          <form
            style={{
              fontSize: "18px",
              fontFamily: "var(--mainfont)",
              fontWeight:"bold",
              color:"whitesmoke",
              marginTop: "20px",
            }}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Name
              </label>
              <input
                required
                onChange={handleName}
                style={{ width: "200px" }}
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={data.name}
              />
            </div>
            <div style={{ color: "red" }}>
              {" "}
              {nameError && "Please fil the name !"}{" "}
            </div>

            <div
              className="mb-3"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <label for="exampleInputEmail1" className="form-label">
                Description
              </label>
              <textarea
                value={data.description}
                required
                onChange={handleDescription}
                name=""
                id=""
              ></textarea>
            </div>
            <div style={{ color: "red" }}>
              {" "}
              {descriptionError && "Please fill the description !"}{" "}
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Video
              </label>
              <input
                type="file"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  const allowExtention = ["mp4"];
                  const extention = e.target.files[0].name.split(".").pop();
                  console.log(extention);
                  if (allowExtention?.includes(extention)) {
                    setUrlError(false);
                   // alert("valid file extention");
                    setVideoUpload(e.target.files[0]);
                  } else {
                    alert("Invalid file extention");
                    setVideoUpload(null);
                    setUrlError(true);
                  }
                }}
              />
            </div>
            <div style={{ color: "red" }}>
              {urlError && "PLease upload  the video !!"}
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Image
              </label>
              <input
                type="file"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  const allowExtention = ["png", "jpg", "jpeg", "gif", "jfif"];
                  const extention = e.target.files[0].name.split(".").pop();
                  console.log(extention);
                  if (allowExtention?.includes(extention)) {
                    //alert("valid file extention");
                    setImageError(false);
                    setImageUpload(e.target.files[0]);
                  } else {
                    alert("Invalid file extention");
                    setImageError(true);
                    setImageUpload(null);
                  }
                }}
              />
            </div>
            <div style={{ color: "red" }}>
              {imageError && "PLease upload  image !!"}
            </div>

            <div>
              <label style={{ marginRight: "45px" }} htmlFor="">
                Hour
              </label>
              <input
                style={{
                  marginBottom: "20px",
                  width: "70px",
                  height: "30px",
                  border: "none",
                  borderRadius: "5px",
                  padding: "7px",
                }}
                type="number"
                onChange={handleHour}
                name="hour"
                id=""
                placeholder={data.duration.split(":")[0]}
              />
              <div style={{ color: "red" }}>{hourError && "Invalid hour"}</div>

              <label style={{ marginRight: "25px" }} htmlFor="">
                Minutes
              </label>
              <input
                style={{
                  width: "70px",
                  height: "30px",
                  border: "none",
                  borderRadius: "5px",
                  padding: "7px",
                }}
                type="number"
                onChange={handleMinutes}
                name="minutes"
                id=""
                placeholder={data.duration.split(":")[1]}
              />
            </div>
            <div style={{ color: "red" }}>
              {minutesError && "Invalid minutes format"}
            </div>

            <div>
              <label
                htmlFor=""
                style={{
                  fontSize: "18px",
                  fontFamily: "var(--mainfont)",
                  fontWeight:"bold",
                  marginTop: "20px",
                  marginRight: "30px",
                }}
              >
                Release
              </label>
              <input
                style={{
                  height: "30px",
                  border: "none",
                  borderRadius: "5px",
                  padding: "7px",
                }}
                type="date"
                id="date-input"
                value={data.releasedate}
                onChange={(e) => {
                  setReleaseError(false);
                  setData({ ...data, releasedate: e.target.value });
                }}
                max={today} // Set the max attribute to today's date
              />
            </div>
            <div style={{ color: "red" }}>
              {releaseError && " Please enter release date"}
            </div>

            <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
              <h3
                style={{
                  fontSize: "20px",
                  fontFamily: "var(--mainfont)",
                  fontWeight:"bold",
                  marginTop: "20px",
                 
                }}
              >
                Choose genre
              </h3>
              <div>
                {genres.map((genre) => (
                  <>
                    <label htmlFor="">{genre}</label>
                    <input
                      style={{ marginRight: "20px",fontWeight:"normal" }}
                      onChange={handleChange}
                      type="checkbox"
                      value={genre} // Add the value attribute here

                      checked={
                        Array.isArray(data.genre)
                          ? data.genre.includes(genre)
                          : false
                      }
                    />
                  </>
                ))}
              </div>
            </div>
            <div style={{ color: "red" }}>
              {genreError && "Select atleast one genre"}
            </div>
            <button style={{fontSize:"18px",fontWeight:"bold"}}
              disabled={
                postingButton ||
                descriptionError ||
                nameError ||
                imageError ||
                urlError ||
                hourError ||
                minutesError
              }
              type="submit"
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
