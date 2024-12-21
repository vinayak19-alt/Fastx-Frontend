import React, { useContext, useState } from 'react'
import './AddOperator.css'
import AuthContext from '../../context/AuthProvider';
import { useLocation, useNavigate } from 'react-router-dom';
import AdminService from '../../service/AdminService';
import { toast } from 'react-toastify';

export const AddOperatorComponent = () => {

    const [operatorName, setOperatorName] = useState('');
    const [age, setAge] = useState('');
    const [phone, setPhone] = useState('');
    const {auth} = useContext(AuthContext)
    const location = useLocation();
    const {operatorUsername, username}=location.state || {};
    const navigate = useNavigate();
    const notify = () => toast("Operator added successfully")

    const saveOperator = (e)=>{
        e.preventDefault()
        const operatorObj = {"operatorName":operatorName, "age":age, "username":operatorUsername, "phone":phone};
        console.log(operatorObj)
        AdminService.addOperator(operatorObj, auth.accessToken).then((response)=>{
            console.log("Response received from add Operator API ",response.data);
            notify();
            navigate('/get-operators', {state:{username:username}})
        }).catch((error)=>{
            console.log("Error thrown by add operator API ", error);
            toast.error("Can't add Operator. Please try again")
        })
    }

  return (
    <div id='background'>
        <section>
            <h2>Welcome to FastX</h2>
            <h4>Enter Operator Information</h4>
            <form>
                {/* Name and Age Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Enter your name" value={operatorName}
                            onChange={(e) => { setOperatorName(e.target.value) }} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="age">Age</label>
                        <input type="number" id="age" name="age" placeholder="Enter your age" value={age}
                            onChange={(e) => { setAge(e.target.value) }} required />
                    </div>
                </div>

                {/* Phone Number and Email Field */}
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder="Enter your phone number" value={phone}
                            onChange={(e) => { setPhone(e.target.value) }} required />
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className='btn btn-primary'
                onClick={(e)=>saveOperator(e)}>Submit</button>
            </form>
        </section>
    </div>
  )
}
