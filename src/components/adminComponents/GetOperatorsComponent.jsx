import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AdminService from '../../service/AdminService';
import AuthContext from '../../context/AuthProvider';

export const GetOperatorsComponent = () => {

    const [operators, setOperators]=useState([]);
    const {auth} = useContext(AuthContext);
    const location = useLocation();
    const {username}= location.state || {};
    const [deleteStatus, setDeleteStatus] = useState(false)
    const navigate = useNavigate();

    const handleAddOperator = (e) =>{
        e.preventDefault();
        navigate("/register-operator", {state:{username:username}})
    }

    const handleDeleteOperator = (id)=>{
        console.log("delete operator button pressed")
        if(window.confirm("Are you sure you want to delete the Bus Operator")){
            AdminService.deleteOperator(id, auth.accessToken).then((response)=>{
                console.log("Response received by delete operator API ", response.data);
                setDeleteStatus(!deleteStatus);
            }).catch((error)=>{
                console.log("Error thrown by delete operator API ", error);
            })
        }
    }

    useEffect(()=>{
        AdminService.getAllOperators(auth.accessToken).then((response)=>{
            console.log("Response received from getAllOperators API ", response.data)
            setOperators(response.data);
        }).catch((error)=>{
            console.log("Error thrown by getAllOperators API ", error);
        })
    },[deleteStatus])

  return (
    <div className='container'>
        {console.log("App rendered")}
        <h2 className='text-center'>All Operators</h2>
        {/* <Link to="/register-operator" className='btn btn-primary'>Add Operator</Link> */}
        <table className='table table-success table-striped tabel-hover'>
            <thead>
                <tr>
                    <th>Operator ID</th>
                    <th>Username</th>
                    <th>Operator Name</th>
                    <th>Age</th>
                    <th>Phone Number</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {operators.map((operator, k) => (<tr key={k}>
                    <td>{operator.operatorId}</td>
                    <td>{operator.username}</td>
                    <td>{operator.operatorName}</td>
                    <td>{operator.age}</td>
                    <td>{operator.phone}</td>
                    <td className="action-cell">
                        <Link className='btn btn-info custom-btn' to={"/update-operator/"+operator.operatorId}>Update</Link>
                        <button className="btn btn-danger custom-btn" onClick={()=>{handleDeleteOperator(operator.operatorId)}}>Delete</button>
                    </td>
                </tr>))}
            </tbody>
        </table>
        <button className="btn btn-danger custom-btn addop-btn" onClick={(e)=>{handleAddOperator(e)}}>Add Operator</button>
    </div>
  )
}
