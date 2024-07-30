import axios from 'axios';
import React, { useState } from 'react'

const Checkbox = () => {

    const[data,setData] = useState({
        name:"Deadpool",
        description:"qwe",
        url:"qwe",
        image:"qwe",
        genre:[]
    });

    const  handleChange = (e)=>{
        const {checked,value} = e.target
        console.log(value)
        if(checked){
            if(checked){
                setData({...data, genre: [...data.genre, value]});
            }
            
            axios.post("",)
        }else{
            setData({...data,genre:data.genre.filter((i)=>i!==value)})
        }
    }

    const handleSubmit= (e)=>{
        e.preventDefault();
        axios.post("http://localhost/cinehub/movies/postmovies.php",data)
        .then((res)=>{
            console.log(res.data.message);
        })
        console.log(data)
    }
  return (
    <div>
       
        <h1>check box</h1>
      <form onSubmit={handleSubmit}>
        <div>
            <label htmlFor="">funny</label>
            <input onChange={handleChange}  value={"funny"} type="checkbox" />
        </div>
        <div>
            <label htmlFor="">thriller</label>
            <input  onChange={handleChange}   value={"thriller"} type="checkbox" />
        </div>
        <div>
            <label htmlFor="">action</label>
            <input  onChange={handleChange}  value={"action"} type="checkbox" />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Checkbox
