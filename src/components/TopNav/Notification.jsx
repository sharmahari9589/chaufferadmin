import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./notification.css"
import axios from 'axios';
import Cookies from 'js-cookie';
import { base_url } from '../../routes/apiCalls/ApiCalls';
const Notification = (props) => {

const [data,setData] = useState([]);
const [modal,setModal] = useState(false);
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
 
  return (
    props.show && (
        <div className="dropdown">
         
         {data?.slice(0, 10).map((value) => (
  <ul key={value.id}>
    <li>
      <span>
        <i className="ri-notification-3-line" style={{ marginRight: 5 }}></i>
      </span>
      {value.notificationDescription}
    </li>
    {/* Add more items as needed */}
    <hr />
  </ul>
))}

           
        
        </div>
      )
      
  );
};

export default Notification;
