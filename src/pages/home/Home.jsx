import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Navbar from "../../components/navbar/Navbar";
import SearchHeader from "../../components/searchHeader/searchHeader";

import PropertyList from "../../components/propertyList/PropertyList";
import "./home.css";

const Home = () => {
  return (
    <div className='home'>
      <div>
      <Navbar />
      <Header/>
      <SearchHeader/>
      

      <div className="homeContainer">
        <Featured/>
        <div className='container-div'>

        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <hr className='bottom-nav'/>
         
        </div>
        
      </div>
      </div>
    </div>
  );
};

export default Home;
