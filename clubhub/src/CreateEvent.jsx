import React, { useState } from 'react';
import axios from 'axios';
import {addEvent} from "./redux/eventSlice"
import{useDispatch} from "react-redux"
import Events from "./events"
const CreateEvent= () => {
  const [userData, setUserData] = useState({
    eventName: '',
    clubName: '',
    venue: '',
    capacity: '',
    date: '',
    time: '',
    // image: null,
    // imagePreview: null,
  });
const dispatch=useDispatch()
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];
//     console.log(selectedImage)
//     setUserData({
//       ...userData,
//       image: selectedImage,
//       imagePreview: URL.createObjectURL(selectedImage),
//     });
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const eventData = {
        eventName: userData.eventName,
        clubName: userData.clubName,
        venue: userData.venue,
        capacity: userData.capacity,
        date: userData.date,
        time: userData.time,
        // image: userData.image,
      };

      await axios.post('http://localhost:3002/create', eventData)
      .then(res=>{
        dispatch(addEvent(res.data))
        console.log(res)})
      .catch(err=>console.log(err))
      // Handle success, redirect, or show a success message
    } catch (error) {
      console.error('Error:', error);
      // Handle error
    }
    setUserData({
      eventName: '',
      clubName: '',
      venue: '',
      capacity: '',
      date: '',
      time: '',
  
    });
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      {/* Event Name */}
      <input
        type="text"
        name="eventName"
        value={userData.eventName}
        onChange={handleInputChange}
        placeholder="Event Name"
        required
      />
      {/* Club Name */}
      <input
        type="text"
        name="clubName"
        value={userData.clubName}
        onChange={handleInputChange}
        placeholder="Club Name"
        required
      />
      {/* Avenue */}
      <input
        type="text"
        name="venue"
        value={userData.venue}
        onChange={handleInputChange}
        placeholder="Venue"
        required
      />
      {/* Capacity */}
      <input
        type="number"
        name="capacity"
        value={userData.capacity}
        onChange={handleInputChange}
        placeholder="Capacity"
        required
      />
      {/* Date */}
      <input
        type="date"
        name="date"
        value={userData.date}
        onChange={handleInputChange}
        required
      />
      {/* Time */}
      <input
        type="time"
        name="time"
        value={userData.time}
        onChange={handleInputChange}
        required
      />
    
      {/* <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
   
      {userData.imagePreview && (
        <img
          src={userData.imagePreview}
          alt="Event Preview"
          style={{ width: '200px', height: 'auto' }}
        />
      )} */}
      {/* Submit Button */}
      <button type="submit">Create Event</button>
    </form>
    <Events/></>
  );
};

export default CreateEvent;
