import axios from "axios";

import Cookies from "js-cookie";

export const base_url = "https://backend.exactlane.com/api/v1";
// read token


// Example: Reading a cookie named "token"
let token = Cookies.get("token");

// Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

// read token

export const headers = {
  Authorization: `Bearer ${token}`,
};

export const header = {
  Authorization: `Bearer ${token}`,
};
// authentication ==================================================================================

export const fetcUserProfile = async () => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(`${base_url}/get-profile`, { headers });
  return res;
};

export const forgetPassword = async (data) => {
  let body = {
    email: data?.email,
  };
  const res = await axios.post(`${base_url}/forget-password`, body, {
    headers,
  });
  return res;
};

export const verifyOtp = async (data) => {
  let body = {
    email: data?.email,
    otp: data?.otpNumber,
  };
  const res = await axios.post(`${base_url}/verify-otp`, body, { headers });
  return res;
};

export const changePassword = async (data) => {
  let body = {
    email: data?.email,
    otp: data?.otp,
    password: data?.password,
    confirmPassword: data?.confirmPassword,
  };
  const res = await axios.post(`${base_url}/change-password`, body, {
    headers,
  });
  return res;
};

export const updateProfile = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const formData = new FormData();
  formData.append("fullName", value.fullName);
  formData.append("email", value.email);
  formData.append("phone", value.phone);
  formData.append("address", value.address);
  formData.append("zipCode", value.zipCode);
  formData.append("dateOfBirth", value.dateOfBirth);
  formData.append("imgPth", value.imgPath[0]);

  const res = await axios.post(
    `${base_url}/update-profile`,
    formData, // Move the request body here
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res;
};

export const loginUser = async (value) => {
  const body = {
    email: value.email,
    password: value.password,
  };
  const res = await axios.post(`${base_url}/login`, body);
  var tokenValue = res.data.token; // Replace with your actual token value
  setCookie("token", tokenValue, 12);

  return res;
};

function setCookie(name, value, hoursToExpire) {
  var expirationDate = new Date();
  expirationDate.setTime(
    expirationDate.getTime() + hoursToExpire * 60 * 60 * 1000
  );

  var cookieString =
    name +
    "=" +
    encodeURIComponent(value) +
    "; expires=" +
    expirationDate.toUTCString() +
    "; path=/";

  document.cookie = cookieString;
}

export const resetPassword = async (value) => {
  const body = {
    currentPassword: value.currentPassword,
    newPassword: value.newPassword,
    confirmPassword: value.confirmPassword,
  };
  const res = await axios.post(`${base_url}/reset-password`, body, { headers });

  return res;
};

// authentication ==================================================================================

// vandoes managment -------------------------------------------------------------------------

export const craeteVandor = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = {
    name: value.fullName,
    email: value.email,
    address: value.address,
    zipCode: value.zipCode,
    phone: value.phone,
    companyName: value.companyName,
    additonalInfo:value.additonalInfo
  };
  const res = await axios.post(`${base_url}/create-vandor`, body, { headers });

  return res;
};

export const getVandor = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(`${base_url}/get-vandor`, { headers });

  return res;
};

export const getVandorByName = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(`${base_url}/get-vandor-name?search=${value}`, {
    headers,
  });

  return res;
};

export const updateVandor = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.post(
    `${base_url}/update-vandor`,
    { value },
    { headers }
  );
  return res;
};

export const deleteVandor = async (id) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.delete(`${base_url}/delete-vandor/${id}`, {
    headers,
  });

  return res;
};

export const verifyVandor = async (id) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(`${base_url}/verify-vandor/${id}`, { headers });

  return res;
};
// vandoes managment -------------------------------------------------------------------------

// car managment -------------------------------------------------------------------------

export const getCar = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.get(`${base_url}/get-all-cars`, { headers });

  return res;
};

export const updateCar = async (value, myImg) => {
  let token = Cookies.get("token");
  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found
  // read token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const formData = new FormData();
  formData.append('vehicleType', value.vehicleType);
  formData.append('basePrice', value.basePrice);
  formData.append('hourlyPrice', value.hourlyPrice);
  formData.append('distancePrice', value.distancePrice);
  formData.append('margin', value.margin);
  formData.append('vat', value.vat);
  formData.append('minimumDistancePerHour', value.minimumDistancePerHour);
  formData.append('carImg', myImg);
  formData.append('_id', value?._id);
  const res = await axios.post(
    `${base_url}/update-car`,
    formData,
    { headers }
  );
  return res;
};

export const deleteCar = async (id) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.delete(`${base_url}/delete-car/${id}`, { headers });

  return res;
};

export const craeteCar = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const formData = new FormData();
  formData.append('vehicleType', value.vehicleType);
  formData.append('basePrice', value.basePrice);
  formData.append('hourlyPrice', value.hourlyPrice);
  formData.append('distancePrice', value.distancePrice);
  formData.append('margin', value.margin);
  formData.append('vat', value.vat);
  formData.append('minimumDistancePerHour', value.minimumDistancePerHour);
  formData.append('carImg ', value?.carImg[0]);

  const res = await axios.post(`${base_url}/save-car`, formData, { headers });

  return res;
};
// car managment -------------------------------------------------------------------------

// user managment -------------------------------------------------------------------------

export const getCustomer = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await axios.get(`${base_url}/get-all-user`, { headers });
  return res;
};

export const updateCustomer = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await axios.post(
    `${base_url}//update-user`,
    { value },
    { headers }
  );
  return res;
};

export const deleteCustomer = async (id) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await axios.delete(`${base_url}/delete-user/${id}`, { headers });

  return res;
};

// user managment -------------------------------------------------------------------------

// booking mananagment =======================================================================

export const allotBooking = async (bookId, vandorId, data) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const formData = new FormData();
  formData.append("allocateChaufferName", data?.chaufferName);
  formData.append("allocatedChaufferMobile", data?.chaufferNumber);
  formData.append("allocateVandorId", vandorId);
  formData.append("extraAmount", data?.extraAmount);
  formData.append("ChauuferDl", data?.chaufferLiscence[0]);

  const res = await axios.post(
    `${base_url}/allot-booking/${bookId}`,
    formData,
    { headers }
  );
  return res;
};

export const addExtraamount = async (bookId, data) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const body = {
    extraAmount: data?.extraAmount,
    reasonExtra: data?.reasonExtra,
  };

  const res = await axios.post(
    `${base_url}/extra-amount-booking/${bookId}`,
    body,
    { headers }
  );
  return res;
};

export const getAllBookings = async (value) => {
  let token = Cookies.get("token");

  // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

  // read token

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await axios.get(`${base_url}/get-booking`, { headers });
  return res;
};

// booking mananagment =======================================================================

// payment managment =======================================================
export const refund = async (bookId, data, id) => {
  let transactionId = id;

  let amount = data?.amount;
  let resaon = data?.reason
  const apiUrl = `https://api.sumup.com/v0.1/me/refund/${transactionId}`;

  // Replace 'your_access_token' with your SumUp API access token
  const accessToken = "sup_sk_T8xVXpu0hIJKqUfazCZ19ayDzz9PNd3yG";

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  };

  //

  let response = await axios.post(apiUrl, { amount: amount }, { headers });
  if (response.status == 204) {
    let token = Cookies.get("token");

    // Now, 'tokenValue' will contain the value of the "token" cookie, or null if the cookie is not found

    // read token

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const body = {
      amount: data?.amount,
      resaon : data?.reason
    };
    const res = await axios.post(`${base_url}/refund-payment/${bookId}`, body, {
      headers,
    });
    return res;
  }
};

// payment managment =======================================================
