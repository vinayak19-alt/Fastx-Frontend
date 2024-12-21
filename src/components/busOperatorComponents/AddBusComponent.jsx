import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import BusOperatorService from '../../service/BusOperatorService';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AddBusComponent = () => {

    const [busNumber, setBusNumber]=useState('');
    const [busType, setBusType]=useState('');
    const [seats, setSeats]=useState('');
    const navigate = useNavigate();
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    const {username} = location.state || {};
    const notify = () => toast("Bus added successfully")

    const saveBus = (e) =>{
        e.preventDefault()
        const busObj = {busNumber, busType, seats};
        console.log(auth.accessToken);
        BusOperatorService.addBus(username, busObj, auth.accessToken).then((response)=>{
            console.log("Response receibed from Add bus API ", response.data);
            notify();
            console.log("bus saved")
            navigate("/add-route", {state:{busNumber:busNumber, username:username, seats:seats}})
        }).catch((error)=>{
            toast.error("Failed to add bus please try again")
            console.log("Error thrown by add bus API ", error);
        })
    }

  return (
    <div id='background'>
        <section>
            <h2>Please enter the Bus information</h2>
            <form>
                {/* Name and Age Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="busNumber">Bus Number</label>
                        <input type="text" id="busNumber" name="busNumber" placeholder="Enter the Bus Number" value={busNumber}
                            onChange={(e) => { setBusNumber(e.target.value) }} required />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" placeholder="Enter your age" value={age}
                            onChange={(e) => { setAge(e.target.value) }} required />
                    </div> */}
                </div>

                {/* Gender Field */}
                <div className="form-group centered">
                    <label htmlFor="busType">Bus Type</label>
                    <select id="busType" name="busType" value={busType} onChange={(e) => { setBusType(e.target.value) }} required>
                        <option value="" disabled>Select the Bus Type</option>
                        <option value="AC-LUXURY">AC-LUXURY</option>
                        <option value="AC">AC</option>
                        <option value="NON-AC">NON-AC</option>
                    </select>
                </div>

                {/* Phone Number and Email Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="seats">No. of seats</label>
                        <input type="number" id="seats" name="seats" placeholder="Enter the number of seats" value={seats}
                            onChange={(e) => { setSeats(e.target.value) }} required />
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={email}
                            onChange={(e) => { setEmail(e.target.value) }} required />
                    </div> */}
                </div>

                {/* Submit Button */}
                <button type="submit" className='btn btn-primary'
                onClick={(e) =>{saveBus(e)}}>Submit</button>
            </form>
        </section>
    </div>
  )
}
