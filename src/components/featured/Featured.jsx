import "./featured.css";
import useFetch from '../hooks/useFetch'
import {useState, useEffect} from 'react'
import axios from 'axios'
const Featured = () => {
 const [data,setData]=useState([])
 const [loading,setLoading]=useState(false);
 const [error, setError]=useState('') 

const fetchData= async ()=>{
  try{
  const res=  await axios.get("http://localhost:5000/api/hotels/countByCity?cities=berlin,london,paris")
  setData(res?.data)
console.log(res?.data)
  }catch(error){
      setError(error)
       }
      }
useEffect(()=>{
  fetchData();
  console.log(data)
},[])
 


  return (
    <div className="featured">
      {loading ? (<h3>Loading.. </h3>): (<>
        <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>Berlin</h1>
          <h2>{data[0]} Properties</h2>
        </div>
      </div>
      
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/690334.webp?k=b99df435f06a15a1568ddd5f55d239507c0156985577681ab91274f917af6dbb&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1>London</h1>
          <h2>{data[1]} Properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img
          src="https://cf.bstatic.com/xdata/images/city/max500/689422.webp?k=2595c93e7e067b9ba95f90713f80ba6e5fa88a66e6e55600bd27a5128808fdf2&o="
          alt=""
          className="featuredImg"
        />
        <div className="featuredTitles">
          <h1> Paris</h1>
          
          <h2>{data[2]} Properties</h2>
        </div>
      </div>
   
      </>)}
    </div>
  );
};

export default Featured;
