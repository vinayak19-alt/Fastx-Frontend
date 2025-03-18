import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import './register.css'
import UserService from '../service/UserService'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const USER_REGEX=/^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PSWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
export const RegisterComponent = () => {
    //allows to focus on user input when component loads
    const userRef = useRef()
    //allows to focus on error
    const errorRef = useRef()
    //user input
    const [user, setUser]=useState('')
    const [validName, setValidName]=useState(false)
    const [userFocus, setUserFocus]=useState(false)
    //password
    const [password, setPassword]=useState('')
    const [validPassword, setValidPassword]=useState(false)
    const [passwordFocus, setPasswordFocus]=useState(false)
    //confirm password
    const [matchPassword, setMatchPassword]=useState('')
    const [validMatch, setValidMatch]=useState(false)
    const [matchFocus, setMatchFocus]=useState(false)
    //errors
    const [errMsg, setErrMsg]=useState('')
    const [success, setSuccess]=useState(false)

    const navigate = useNavigate()
    const notify = () => toast("You are registered successfully!")

    const saveUserRegistration = (e)=>{
        e.preventDefault()
        const userData={
            "username":user,
            "password":password,
            "role":"User"
        }
        UserService.registerUser(userData).then((response)=>{
            console.log("Response received from Register API ", response.data)
            setSuccess(true)
            notify();
            navigate("/add-info", {state:{username:user}})
        }).catch((error)=>{
            console.log("Error received from Register API ", error)
            if(!error?.response){
                setErrMsg("No server response")
            }else if(error.response?.status===409){
                setErrMsg("Username taken")
            }else{
                setErrMsg("Registration failed")
            }
        })
    }

    //first useEffect
    useEffect(()=>{
        //set focus on user input
        console.log("First useEffect() invoked.. focus set on user input")
        userRef.current.focus()
    },[])
    //validate username
    useEffect(()=>{
        const result = USER_REGEX.test(user)
        console.log("Second useEffect() invoked.. result of REGEX on username ", result)
        setValidName(result)
    },[user])
    //validates password and checks if it matches to matchPassword
    useEffect(()=>{
        const result = PSWD_REGEX.test(password)
        console.log("Third useEffect() invoked.. result of regex test on password")
        setValidPassword(result)
        console.log("ValidPassword state variable gets the value of regex test ", result)
        const matchResult = password === matchPassword
        setValidMatch(matchResult)
        console.log("ValidMatch state variable gets the value of regex test ", matchResult)
    },[password, matchPassword])
    useEffect(()=>{
        console.log("Fourth useEffect() invoked..")
        setErrMsg('')
    },[user, password, matchPassword])


  return (
    <div id='background'>
        <section>
            <p ref={errorRef} className={errMsg?"errmsg":"offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <form>
                {/* Username */}
                <label htmlFor="username">
                    Username
                    <span className={validName?"valid":"hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || user?"hide":"invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input type="text" placeholder='Enter username' id='username' ref={userRef} autoComplete='off'
                onChange={(e)=>{setUser(e.target.value)}} required aria-invalid={validName?"false":"true"}
                aria-describedby='uidnote' onFocus={()=>{setUserFocus(true)}}
                onBlur={()=>{setUserFocus(false)}}
                />
                <p id='uidnote' className={userFocus && user && !validName?"instructions":"offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    4 to 24 characters.<br/>
                    Must begin with a letter<br/>
                    Letters, numbers, underscore, hyphen allowed
                </p>
                {/* Password */}
                <label htmlFor="password">
                    Password
                    <FontAwesomeIcon icon={faCheck} className={validPassword?"valid":"hide"}/>
                    <FontAwesomeIcon icon={faTimes} className={validPassword || password?"hide":"invalid"}/>
                </label>
                <input type="password" id='password' placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)}
                value={password} required aria-invalid={validPassword?"false":"true"}
                aria-describedby='pwdnote' onFocus={()=>{setPasswordFocus(true)}}
                onBlur={()=>{setPasswordFocus(false)}}/>
                <p id='pwdnote' className={passwordFocus && !validPassword?"instructions":"offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters<br/>
                    Must include uppercase, lowercase letters, a number and a special symbol<br/>
                    Allowed special characters :
                    <span aria-label='exclamation-mark'>!</span>
                    <span aria-label='at-symbol'>@</span>
                    <span aria-label='hashtag'>#</span>
                    <span aria-label='dollar-sign'>$</span>
                    <span aria-label='percent'>%</span>
                </p>
                {/* Confirm Password */}
                <label htmlFor="confirm-pwd">
                    Confirm Password
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPassword?"valid":"hide"}/>
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPassword?"hide":"invalid"}/>
                </label>
                <input type="password" id='confirm-pwd' placeholder='Confirm Password' onChange={(e)=>{setMatchPassword(e.target.value)}}
                value={matchPassword} required aria-invalid={validMatch?"false":"true"} 
                aria-describedby='confirmnote' onFocus={()=>{setMatchFocus(true)}}
                onBlur={()=>{setMatchFocus(false)}}/>
                <p id='confirmnote' className={matchFocus && !validMatch?"instructions":"offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    Must match the first password input field
                </p>
                <br />
                <button disabled={!validName||!validPassword||!validMatch?true:false}
                onClick={(e)=>{saveUserRegistration(e)}}>Sign Up</button>
            </form>
            <p>
            Already Registered?<br/>
                <span className='line'>
                    <Link to="/login">Sign In</Link>
                </span>
            </p>
        </section>
    </div>
  )
}
