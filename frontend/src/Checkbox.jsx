import axios from 'axios';
import React, { useState } from 'react'

const Checkbox = () => {

    const[data,setData] = useState({
        name:"new",
        description:"qwe",
        url:"qwe",
        image:"qwe",
        duration:"",
        releasedate:"",
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
        // setData({...data,)
        axios.post("http://localhost/cinehub/movies/postmovies.php",{...data,duration:`${duration?.hours}:${duration?.minute}`})
        .then((res)=>{
            console.log(res.data.message);
        })
        console.log(data)
    }

    const options = Array.from({ length: 60 }, (_, i) => i);

    const[duration,setDuration] = useState({
        hours:"",
        minute:""
    })
    console.log(duration)

 


  return (
    <div>
       
        <h1>check box</h1>
      <form onSubmit={handleSubmit}>
        {/* <div>
            <label htmlFor="">Duration</label>
            <input type="time"  step="60" onChange={e=> setData({...data,duration: e.target.value})} />
        </div> */}


         <div>
            <label htmlFor="">hour</label>
            <select onChange={e=> setDuration({...duration,hours:e.target.value})} name="hour">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
            </select>


            <label htmlFor="">Minues</label>
            <select onChange={e=>setDuration({...duration,minute:e.target.value})} name="minute" id="">
            {options.map((i)=>(
                <option value={i}>{i}</option>
            ))}

            </select>
        </div>

        <div>
            <label htmlFor="">Release</label>
            <input type="date" onChange={e=> setData({...data,releasedate: e.target.value})} />
        </div>
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
