import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthProvider';
import { useLocation } from 'react-router-dom';
import AdminService from '../../service/AdminService';
import './GetUsers.css'

export const GetUsersComponent = () => {

    const [users, setUsers]=useState([]);
    const [deleteStatus, setDeleteStatus]=useState(false);
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    const {username} = location.state || {};

    const handleDeleteUser = (id)=>{
        console.log("Delete button pressed")
        if(window.confirm("Are you sure you want to delete this user?")){
            AdminService.deleteUser(id, auth.accessToken).then((response)=>{
                console.log("Response received from delete user API ", response.data)
                setDeleteStatus(!deleteStatus);
            }).catch((error)=>{
                console.log("Error thrown by delete user API ", error);
            })
        }
    }

    useEffect(()=>{
        console.log("useEffect inside getUsers triggerred")
        AdminService.getAllUsers(auth.accessToken).then((response)=>{
            console.log("Response received from getAllUsers API ", response.data);
            setUsers(response.data);
        }).catch((error)=>{
            console.log("Error thrown by getAllUsers API ", error);
        })
    },[deleteStatus])

  return (
    <div className='container'>
        {console.log("App rendered")}
        <h2 className='text-center'>All Users</h2>
        {/* <Link to="/addEmployee" className='btn btn-primary'>Add Employee</Link> */}
        <table className='table table-success table-striped tabel-hover'>
            <thead>
                <tr>
                    <th>User ID</th>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, k) => (<tr key={k}>
                    <td>{user.userId}</td>
                    <td>{user.username}</td>
                    <td>{user.name}</td>
                    <td>{user.age}</td>
                    <td>{user.gender}</td>
                    <td>{user.phone}</td>
                    <td>{user.email}</td>
                    <td className="action-cell">
                        <button className="btn btn-danger custom-btn" onClick={()=>{handleDeleteUser(user.userId)}}>Delete</button>
                    </td>
                </tr>))}
            </tbody>
        </table>
    </div>
  )
}
