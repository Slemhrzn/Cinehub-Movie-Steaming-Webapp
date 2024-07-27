import React from "react";
import "./Addmovies.css";

const Addmovie = () => {
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
        </div>

        <div className="addmoviesform_box">
     
        <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Name</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>

  <div class="mb-3" style={{display:"flex",flexDirection:"column"}}>
    <label for="exampleInputEmail1" class="form-label">Name</label>
   <textarea name="" id=""></textarea>
    
  </div>
 
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">URL</label>
    <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Image</label>
    <input type="file" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Genre</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Cast</label>
    <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    
  </div>
  
  
 
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    
   
        </div>
      </div>
    </div>
  );
};

export default Addmovie;
