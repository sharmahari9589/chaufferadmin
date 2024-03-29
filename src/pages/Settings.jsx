import React, { useEffect, useState } from "react";
import "../styles/settings.css";
import {
  fetcUserProfile,
  resetPassword,
  updateProfile,
} from "../routes/apiCalls/ApiCalls";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { base_url } from "../routes/apiCalls/ApiCalls";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState([]);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  // useEffect(async () => {
  //   const res = await fetcUserProfile();
  //   setProfile(res.data.data);
  // }, []);

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
  }, []); // Empty dependency array ensures that useEffect runs only once on component mount

  useEffect(() => {
    const inputDate = new Date(profile?.dateOfBirth);
    const options = { day: "numeric", month: "short", year: "numeric" };

    const formattedDate = inputDate?.toLocaleDateString("en-US", options);
  }, [profile]);

  const inputDate = new Date(profile?.dateOfBirth);
  const options = { day: "numeric", month: "short", year: "numeric" };

  const formattedDate = inputDate?.toLocaleDateString("en-US", options);

  const onSubmit = async (data) => {
    const response = await updateProfile(data);
    if (response.data.status == true) {
      toast.success("Profile updated succesfully");
    }
    const res = await fetcUserProfile();
    setProfile(res.data.data);
  };

  const onPasswordSubmit = async (data) => {
    try {
      const res = await resetPassword(data);
      toast.success("Password changed succesfully");
      reset()
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  var currebtdate = profile.dateOfBirth;
  // Create a Date object from the input string
  var inputDateString = currebtdate;

  let formattedDateObject = inputDateString?.split("T")[0];
  // Display the formatted date

  const renderTabContent = () => {
    switch (activeTab) {
      case "myDetails":
        return (
          /* Content for Profile tab */
          <div className="settings">
            <div className="details__form">
              <p className="profile__desc">
                Update your photo and personal details here
              </p>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Full Name
                    </label>
                    <input
                      className="mt-3"
                      name="fullName"
                      type="text"
                      placeholder="Admin Verma"
                      defaultValue={profile.fullName}
                      {...register("fullName")}
                    />
                  </div>

                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Email
                    </label>
                    <input
                      className="mt-3"
                      type="text"
                      placeholder="Admin.verma@gmail.com"
                      {...register("email")}
                      defaultValue={profile.email}
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Address
                    </label>
                    <input
                      className="mt-3"
                      type="text"
                      placeholder="example@gmail.com"
                      defaultValue={profile.address}
                      {...register("address")}
                    />
                  </div>

                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      className="mt-3"
                      type="text"
                      placeholder="+49 666666"
                      defaultValue={profile.phone}
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Date Of Birth
                    </label>

                    <input
                      className="mt-3"
                      type="date"
                      defaultValue={formattedDateObject?.toString()}
                      {...register("dateOfBirth")}
                    />
                  </div>
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Postal-Code
                    </label>
                    <input
                      className="mt-3"
                      type="text"
                      placeholder="7777"
                      defaultValue={profile.zipCode}
                      {...register("zipCode")}
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Profile Picture
                    </label>
                    <p className="profile-img__desc">
                      This will be displayed in your profile
                    </p>
                    <input
                      type="file"
                      name="imgPath"
                      placeholder="choose file"
                      {...register("imgPath")}
                    />
                  </div>

                  <div className="profile__img-btns">
                    <button
                      style={{ marginTop: 70 }}
                      type="submit"
                      className=" btn btn-success"
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case "profile":
        return (
          /* Content for Profile tab */
          <div className="settings">
            <div className="details__form">
              <p className="profile__desc">This is about you....</p>
              <div className="profileImg">
                <img
                  src={`${base_url}/${profile?.imgPath}`}
                  style={{ borderRadius: "50%", width: 150, height: 150 }}
                  alt="profile img"
                />
              </div>
              <form>
                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Full Name
                    </label>
                    <p className="mt-3" style={{ color: "white" }}>
                      {profile?.fullName}
                    </p>
                  </div>
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Email
                    </label>
                    <p className="mt-3" style={{ color: "white" }}>
                      {profile?.email}
                    </p>
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Address
                    </label>
                    <p className="mt-3" style={{ color: "white" }}>
                      {profile?.address}
                    </p>
                  </div>

                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Phone
                    </label>
                    <p className="mt-3" style={{ color: "white" }}>
                      +49 {profile?.phone}
                    </p>
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Date Of Birth
                    </label>
                    <p className="mt-3" style={{ color: "white" }}>
                      {formattedDate}
                    </p>
                  </div>

                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Postal-Code
                    </label>
                    <p className="mt-3" style={{ color: "white" }}>
                      {profile.zipCode}
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      case "password":
        return (
          /* Content for Profile tab */
          <div className="settings">
            <div className="details__form">
              <p className="profile__desc">Reset your password</p>
              <form onSubmit={handleSubmit(onPasswordSubmit)}>
                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Current Password
                    </label>
                    <input
                      type="text"
                      placeholder="current password"
                      {...register("currentPassword")}
                      required
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      New Password
                    </label>
                    <input
                      type="text"
                      placeholder="new password"
                      {...register("newPassword")}
                      required
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div>
                    <label className="h4" style={{ color: "white" }}>
                      Confirm Password
                    </label>
                    <input
                      type="text"
                      placeholder="confirm password"
                      {...register("confirmPassword")}
                      required
                    />
                  </div>
                </div>

                <div className="form__group">
                  <div className="profile__img-btns">
                    <button className="btn btn-success" type="submit">
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="settings">
      <div className="settings__wrapper">
        <h2 className="settings__title">Settings</h2>

        <div className="settings__top">
          <button
            className={`setting__btn ${
              activeTab === "myDetails" && "active__btn"
            }`}
            onClick={() => handleTabChange("myDetails")}
          >
            Update Profile
          </button>
          <button
            className={`setting__btn ${
              activeTab === "profile" && "active__btn"
            }`}
            onClick={() => handleTabChange("profile")}
          >
            My Profile
          </button>
          <button
            className={`setting__btn ${
              activeTab === "password" && "active__btn"
            }`}
            onClick={() => handleTabChange("password")}
          >
            Reset Password
          </button>
        </div>

        {renderTabContent()}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Settings;
