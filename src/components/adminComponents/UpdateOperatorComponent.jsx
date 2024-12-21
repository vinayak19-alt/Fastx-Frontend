import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import AdminService from '../../service/AdminService';
import AuthContext from '../../context/AuthProvider';
import { toast } from 'react-toastify';

export const UpdateOperatorComponent = () => {

    const [operatorName, setOperatorName]=useState('');
    const [age, setAge]=useState('');
    const [phone, setPhone]=useState('');
    const {operatorId} = useParams();
    const location = useLocation();
    const {username} = location.state || {};
    const {auth}=useContext(AuthContext);
    const navigate = useNavigate();
    const notify = () => toast("Operator updated successfully");

    const updateOperator = (e)=>{
        e.preventDefault();
        const obj = {"operatorName":operatorName, "age":age, "phone":phone}
        console.log("update button pressed");
        AdminService.updateOperator(operatorId, obj, auth.accessToken).then((response)=>{
            console.log("Response received from update operator API ", response.data);
            notify();
            navigate("/get-operators", {state:{username:username}})
        }).catch((error)=>{
            console.log("Error thrown by update operator API ", error);
            toast.error("Could not update Operator. Please try again")
        })
    }

    useEffect(()=>{
        console.log("Useeffect insode update operator invoked")
        AdminService.getOperatorById(operatorId, auth.accessToken).then((response)=>{
            console.log("Response received from getoperatorbyd API ", response.data)
            const operator = response.data;
            setOperatorName(operator.operatorName);
            setAge(operator.age);
            setPhone(operator.phone);
        })
    },[operatorId])

  return (
    <div id='background'>
        <section>
            <h4>Update Operator Information</h4>
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
                onClick={(e)=>updateOperator(e)}>Update</button>
                <Link to='/get-operators' className="btn btn-danger">Cancel</Link>
            </form>
        </section>
    </div>
  )
}
