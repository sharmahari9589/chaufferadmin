import React from "react";
import { base_url } from "../../routes/apiCalls/ApiCalls";
import {useNavigate} from "react-router-dom";
const RecommendCarCard = (props) => {
  const { vehicleType, hourlyPrice, carImg, distancePrice, basePrice } = props.item;
  const navigate =  useNavigate()
  return (
    <div className="recommend__car-card" onClick={()=>{navigate(`/cars`)}}>
      <div className="recommend__car-top">
        <h5>
          <span>
            <i class="ri-police-car-line"></i>
          </span>
          {basePrice} $ Base Price
        </h5>
      </div>

      <div className="recommend__car-img">
        <img src={`${base_url}/${carImg}`} alt="" />
      </div>
      <div className="recommend__car-bottom">
        <h4>{vehicleType}</h4>
        <div className="recommend__car-other">
          <div className="recommend__icons">
            <p>
              <i class="ri-timer-flash-line"></i>
              ${hourlyPrice}/h
            </p>
            {/* <p>
              <i class="ri-settings-2-line"></i>
            </p> */}
            {/* <p>
              <i class="ri-timer-flash-line"></i>
            </p> */}
          </div>
          <p> <i class="ri-creative-commons-nc-line" style={{marginRight:7}}></i>
          <span>${distancePrice}/km</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecommendCarCard;
