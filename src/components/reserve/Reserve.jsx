import "./Reserve.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons"
import useFetch from  '../../components/hooks/useFetch'
import {useState,useContext} from 'react'

import {SearchContext} from '../../context/searchContext'
import { useNavigate} from 'react-router-dom'
import axios from 'axios'

const Reserve=({setOpen, hotelId,hotelTitle})=>{
    const [selectedRooms, setSelectedRooms]=useState([])

    const {dates}=useContext(SearchContext)
    const {data,loading,error} =useFetch(`http://localhost:5000/api/hotels/room/${hotelId}`)
    console.log(hotelTitle, 'hotel from reserve component');
const navigate=useNavigate()
const getDatesInRange=(startDate,endDate)=>{
 const start =new Date(startDate)
const end =new Date(endDate)
const date= new Date(start.getTime())
let dates=[]
while(date <= end){
    dates.push(new Date(date).getTime())
    date.setDate(date.getDate()+1)
}
return dates
  } 
const allDates=getDatesInRange(dates[0].startDate,dates[0].endDate)
console.log(allDates)

const isAvailable =(roomNumber)=>{
    const isFound= roomNumber.unavailableDates.some((date)=>
        allDates.includes(new Date(date).getTime())
    );
    return !isFound
    };
const handleSelect=(e)=>{
const checked=e.target.checked
const value=e.target.value
setSelectedRooms(checked ? [...selectedRooms, value]: selectedRooms.filter((item)=>item !==value
))

}
const handleClick = async()=>{
try{
    await Promise.all(selectedRooms.map((roomId)=> {
        const res=axios.put(`http://localhost:5000/api/rooms/availability/${roomId}`,{dates:allDates})
        return res.data
    }))
    setOpen(false)
    navigate('/')
}
catch(err){
console.log(err)
}
}

console.log(selectedRooms)
    return(
    
        <>
    
    <div className="reserve">
            <div className="reserves">
            <div className="rContainer">
                <FontAwesomeIcon className="rClose" 
                onClick={()=>setOpen(false)}
                icon={faCircleXmark}/>
                <span>Select your room</span>
                {data?.map((item) => (
    <div className="rItem" key={item?._id}>
        <div className="rItemInfo">
            <div className="rTitle">{item?.title}</div>
            <div className="rDesc">{item?.desc}</div>
            <div className="rMax">Max people: <b>{item?.maxPeople}</b></div>
            <div className="rDesc">{item?.price}</div>

        </div>

        <div className="rSelectRoom">
            {item?.roomNumbers?.map((roomNumber)=>(
                <div className='room'>
                <label>{roomNumber.number }</label>
                <input type='checkbox' value={roomNumber._id}
                 onChange={handleSelect}
                disabled={!isAvailable(roomNumber)}
                 />
                </div>))}
            </div>

    </div>
))}
            </div>
<button onClick={handleClick} className='rButton' >Reserve Now </button>
            </div>

    </div>
    
    </>
    )
}

export default Reserve