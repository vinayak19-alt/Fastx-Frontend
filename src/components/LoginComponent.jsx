import React, { useContext, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import UserService from '../service/UserService'
import AuthContext, { AuthProvider } from '../context/AuthProvider'


export const LoginComponent = () => {

    const {setAuth} = useContext(AuthContext)
    const navigate = useNavigate()
    const userRef = useRef()
    const errorRef = useRef()
    const [user, setUser] = useState('')
    const [password, setPassword]=useState('')
    const [errMsg, setErrMsg]=useState('')
    const [success, setSuccess]=useState(false)

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("Username received from form ", user + password)
        const loginData = {"username":user, "password":password}
        UserService.loginUser(loginData).then((response)=>{
            console.log("Response received from Login API ", response.data)
            const accessToken = response?.data?.accessToken
            const role= response?.data?.userDto.role
            const username = response?.data?.userDto.username
            console.log(accessToken, username, role)
            // setAuth({accessToken, username, role})
            setAuth(response.data)
            console.log("Got access token ", response.data.accessToken)
            navigate("/bus-search", {state:{username:user}})
        }).catch((error)=>{
            console.error('Error occurred while calling Login API:', error)
            if (!error?.response) {
                setErrMsg('No server response')
            } else if (error.response?.status === 401) {
                setErrMsg('Unauthorized: Incorrect username or password')
            } else {
                setErrMsg('Login failed')
            }
        })
    }

  return (
    <div id='background'>
        <section>
            <p ref={errorRef} className={errMsg?"errMsg":"offscreen"}
            aria-live='assertive'>
            {errMsg}
            </p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                {/* Username */}
                <label htmlFor="username" >Username</label>
                <input type="text" id='username' ref={userRef} autoComplete='off'
                value={user} required onChange={(e)=>{setUser(e.target.value)}}/>
                {/* Password */}
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e)=>{setPassword(e.target.value)}}
                value={password}/>
                <button>Sign In</button>
                <p>Need an account?<br />
                    <span className='line'>
                        <Link to="/register">Register</Link>
                    </span>
                </p>
            </form>
        </section>
    </div>
  )
}
