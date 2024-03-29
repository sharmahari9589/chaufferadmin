import React, { useEffect, useState } from "react";
import {
  Table,
  Pagination,
  Button,
  Modal,
  Form,
  Collapse,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import profileImg from "../../assets/images/profile-02.png";
import "./top-nav.css";
import Notification from "./Notification";
import { fetcUserProfile } from "../../routes/apiCalls/ApiCalls";
import Cookies from "js-cookie";
import axios from "axios"
import { base_url } from "../../routes/apiCalls/ApiCalls";
const TopNav = () => {
  const [show,setShow] = useState(false);
const[profile,setProfile] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetcUserProfile();
        setProfile(res.data.data);
      } catch (error) {
        console.error("Error fetching user profile data:", error);
      }
    };

    fetchData(); // Invoke the async function immediately
  }, []); 
    const handleToggle = () => {
      setShow(!show);
    };
    
    const [modal,setModal] = useState(false);

    const [data,setData] = useState([]);
const token = Cookies.get("token");
let headers  ={
  Authorization: `Bearer ${token}`
}
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your asynchronous code goes here
        // For example, you can make an API request using fetch or axios
        const response = await axios.get(`${base_url}/getNotification`,{headers});
        setData(response.data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData(); // Call the fetchData function
  
    // The empty dependency array [] ensures that this effect runs once after the initial render
  }, []);
  
 
  
  let myVal = data?.filter((a) => {
    // Assuming a.createdAt is a Date object
    const createdAtDate = new Date(a.createdAt);
    const currentDate = new Date();
  
    return (
      createdAtDate.getFullYear() === currentDate.getFullYear() &&
      createdAtDate.getMonth() === currentDate.getMonth() &&
      createdAtDate.getDate() === currentDate.getDate()
    );
  });
  


  return (
    <div className="top__nav">
      <div className="top__nav-wrapper">
        <div className="search__box">
          {/* <input type="text" placeholder="search or type" /> */}
          {/* <span>
            <i class="ri-search-line"></i>
          </span> */}
        </div>
        <div className="top__nav-right">
          <span className="notification" onClick={handleToggle}>
            <i class="ri-notification-3-line"></i>
            <span className="badge">{myVal?.length}</span>
          </span>
          <div className="profile">
            <Link to="/settings">
              <img src={`${base_url}/${profile?.imgPath}`} alt="" />
            </Link>
          </div>
        </div>
       
      </div>
      <Notification show={show}/>


    

    </div>
  );
};

export default TopNav;
