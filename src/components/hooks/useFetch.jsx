import {useState,useEffect} from 'react'
import axios from 'axios'
const useFetch =(url)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const [error,setError]=useState('')

    useEffect(()=>{
       
        setLoading(true)
        const fetchData= async ()=>{
            try{
            const res=  await axios.get(url)
            setData(res?.data)
         console.log(res?.data)
            }catch(error){
                setError(error)
                 }
                 setLoading(false) 
            };
          
        
       fetchData() 
    },[url]) 

    const reFetch= async ()=>{
        setLoading(true)
        try{
            const res=  await axios.get(url)
            setData(res?.data)
         console.log(res?.data)
            }catch(error){
                console.log(error)
                 }
    setLoading(false) 

    }
return {data,loading,error,reFetch}
    
}

export default useFetch
