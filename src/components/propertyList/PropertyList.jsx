import "./propertyList.css";
import useFetch from '../hooks/useFetch'

const PropertyList = () => {

const images= [
  "https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o="
,
"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
,"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-apartments_300/9f60235dc09a3ac3f0a93adbc901c61ecd1ce72e.jpg"
,"https://cf.bstatic.com/static/img/theme-index/carousel_320x240/card-image-villas_300/dd0d7f8202676306a661aa4f0cf1ffab31286211.jpg"
,
]
console.log(error);
  return (
    <div className='lContainerf'>
    <div className="pList">
      {loading ? ('loading'):(<div className='pList'>
        {data.length > 0 && images.map && images.map((img,i)=>(
          <div className='pListItem' key={i}>
            <img src={img} alt='' className='pListImg'/>
            <div className='pListTitles'>
              <h1>{data[i].type}</h1>
              <h2>{data[i].count} {data[i].type}</h2>
            </div>
          </div>
        ))}
      </div>)}
      </div>
      </div>
      ) 
};

export default PropertyList;
