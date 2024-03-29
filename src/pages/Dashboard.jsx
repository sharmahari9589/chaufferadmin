import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";

import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";

import recommendCarsData from "../assets/dummy-data/recommendCars";
import { getAllBookings, getCar, getCustomer, getVandor } from "../routes/apiCalls/ApiCalls";





const Dashboard = () => {
const [bookings,setBookings] = useState([]);
const [customer,setCustomer] = useState([]);
const [vandor,setVandor] = useState([]);
 const [car,setCar] = useState([]);
useEffect(()=>{

  async function fetchData(){
    let res = await getAllBookings();
   setBookings(res?.data?.data?.length)

   let resp = await getCustomer();
   setCustomer(resp?.data?.data?.length) 
   
   let response = await getVandor();
   setVandor(response?.data?.data?.length)

   let carResp = await getCar();
   setCar(carResp?.data?.data)
  }

fetchData()
},[])


const carObj = {
  title: "Total Cars Variants",
  totalNumber: 5,
  icon: "ri-police-car-line",
};

const tripObj = {
  title: "Total Bookings",
  totalNumber: bookings,
  icon: "ri-steering-2-line",
};

const clientObj = {
  title: "Total Customers",
  totalNumber: customer,
  icon: "ri-user-line",
};

const distanceObj = {
  title: "Total Vendors",
  totalNumber: vandor,
  icon: "ri-user-line",
};

  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={carObj} />
          <SingleCard item={tripObj} />
          <SingleCard item={clientObj} />
          <SingleCard item={distanceObj} />
        </div>

       

        <div className="dash-title">
          <h3 className="dash-title-text">Our Service Types</h3>

          <div className="recommend__cars-wrapper">
            {car?.map((item) => (
              <RecommendCarCard  item={item} key={item.id}  />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
