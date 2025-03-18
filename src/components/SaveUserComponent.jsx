import React, { useState } from 'react'
import './SaveUser.css'
import UserService from '../service/UserService'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const SaveUserComponent = () => {
    const location = useLocation();
    const {username} = location.state || {};
    const [name, setName]=useState('')
    const [age, setAge]=useState('')
    const [gender, setGender]=useState('')
    const [phone, setPhone]=useState('')
    const [email, setEmail]=useState('')
    const navigate = useNavigate()
    const notify = () => toast("You have added the information successfully")

    const saveUser = (e) =>{
        e.preventDefault()
        const userInfo = {name, age, gender, phone, username, email}
        UserService.saveUserInfo(userInfo).then((response)=>{
            console.log("Response recived from SaveUser API ", response.data)
            notify();
            navigate("/login")
        }).catch((error)=>{
            console.log("Error thrown by SaveUser API ",error)
            toast.error("Some error ocurred, Please try again")
        })
    }
  return (
    <div id='background'>
        <section>
            <h2>Welcome to FastX</h2>
            <h4>Enter User Information</h4>
            <form>
                {/* Name and Age Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" value={name}
                            onChange={(e) => { setName(e.target.value) }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" placeholder="Enter your age" value={age}
                            onChange={(e) => { setAge(e.target.value) }} required />
                    </div>
                </div>

                {/* Gender Field */}
                <div className="form-group centered">
                    <label htmlFor="gender">Gender</label>
                    <select id="gender" name="gender" value={gender} onChange={(e) => { setGender(e.target.value) }} required>
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                {/* Phone Number and Email Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={phone}
                            onChange={(e) => { setPhone(e.target.value) }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Enter your email" value={email}
                            onChange={(e) => { setEmail(e.target.value) }} required />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className='btn btn-primary'
                onClick={(e)=>saveUser(e)}>Submit</button>
            </form>
        </section>
    </div>
  )
}
