import "./featuredProperties.css";
import {useState,useEffect} from 'react'
import useFetch from '../hooks/useFetch'
import axios from 'axios'

const FeaturedProperties = () => {
 const {data,loading,error}=useFetch('http://localhost:5000/api/hotels?featured=true&limit=4')
 console.log(data, 'properties');
  return (
    <div className="lContainers">
    <div className="pList">
      {loading ? ('loading'):(<div className='pList'>
        {data?.map((item)=>(
          <div className='pListItem' key={item._id}>
            <img src="https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
 alt='' className='fpImg'/>
            <div className='pListTitles'>
              <h1>{item.name}</h1>
              <h2>{item.city} </h2>
              <h2>Starting from ${item.cheapestPrice} </h2>

            </div>
            {item.rating && <div className='fpRating'>
              <button >
                {item.rating}
              </button>
            </div>

              }
          </div>
        ))}
      </div>)}
      </div>
      </div>
  );
};

export default FeaturedProperties;
