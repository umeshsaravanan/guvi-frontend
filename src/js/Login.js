import { React, useState } from 'react'
import '../css/Login.css'
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri';

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [isLoggedin, setIsLoggedin] = useState(true)
  const [error, setError] = useState('')
  const [confPassword, setConfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleClick = () => {
    setIsLoggedin(true)
    setError(null)
  }
  const handleCreateClick = () => {
    setIsLoggedin(false)
    setError(null)
  }

  const handleSignin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password === confPassword) {
        setError("");
        Axios.post(`${process.env.REACT_APP_BACKEND_URL}/add`, {
            userName: username,
            Email: email,
            Password: password
        })
        .then((response) => {
          if(response.status === 201)
            setIsLoggedin(true);
          else  
            setError(response.data); 
          setIsLoading(false);
        })
        .catch((error) => {
            if (error.response) {
                if (error.response.status === 400) {
                    setError(error.response.data.error);
                } else {
                    setError("Error during registration. Please try again.");
                }
            } else {
                setError("Network error. Please try again.");
            }
            setIsLoading(false);
        });
    } else {
        setError("Both passwords must match");
        setIsLoading(false);
    }
};



  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    Axios.post(`${process.env.REACT_APP_BACKEND_URL}/verify`, {
      userName: username,
      Password: password
    })
      .then((response) => {
        if (response.data.message === "Valid User") {
          navigate(`/${response.data.id}`);
        }
        else{
          setError("Invalid Credentials...");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
  }

  return (
    <div className='login bg-dark d-flex align-items-center justify-content-center'>
      {!isLoggedin && <form className='sign_in col-lg-5 col-md-8 col-sm-10 col-11 mx-auto' onSubmit={handleSignin}>
        <div className='form-group mb-2'>
          <label className='form-label' htmlFor='username'>Username</label>
          <input className="form-control" type='username' value={username} name='username' onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='form-group mb-2'>
          <label className='form-label' htmlFor='email'>Email</label>
          <input className="form-control" type='email' value={email} name='email' onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='form-group mb-2'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <div className='password-input d-flex'>
            <input
              className='form-control flex-grow-1'
              type={showPassword ? 'text' : 'password'}
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='eye-icon bg-primary col-1 d-flex align-items-center justify-content-center' onClick={togglePasswordVisibility}>
              {!showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
            </span>
          </div>
        </div>

        <div className='form-group mb-2'>
          <label className='form-label' htmlFor='conformpassword'>
            Confirm Password
          </label>
          <div className='password-input d-flex'>
            <input
              className='form-control flex-grow-1'
              type={showConfPassword ? 'text' : 'password'}
              value={confPassword}
              name='conformpassword'
              onChange={(e) => setConfPassword(e.target.value)}
            />
            <span className='eye-icon bg-primary col-1 d-flex align-items-center justify-content-center' onClick={toggleConfPasswordVisibility}>
              {!showConfPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
            </span>
          </div>
        </div>
        <button type='submit' className='btn btn-primary d-block my-3 mx-auto col-6 '>
        {isLoading ? "Loading..." : "sign in"}</button>
        <p>Already have an account? <span onClick={handleClick}>click here</span></p>
        {error && <p className='text-danger d-6'>{error}</p>}
      </form>}
      {isLoggedin && <form onSubmit={handleLogin} className='log_in col-lg-5 col-md-8 col-sm-10 col-11 mx-auto'>
        <div className='form-group mb-2'>
          <label className='form-label' htmlFor='username'>UserName</label>
          <input className="form-control" type='text' value={username} name='username' onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='form-group mb-2'>
          <label className='form-label' htmlFor='password'>
            Password
          </label>
          <div className='password-input d-flex'>
            <input
              className='form-control flex-grow-1'
              type={showPassword ? 'text' : 'password'}
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className='eye-icon bg-primary col-1 d-flex align-items-center justify-content-center' onClick={togglePasswordVisibility}>
              {!showPassword ? <RiEyeCloseFill /> : <RiEyeFill />}
            </span>
          </div>
        </div>
        <button className='btn btn-primary d-block my-3 mx-auto col-6' onSubmit={() => handleLogin()}>
        {isLoading ? "Loading..." : "Log in"}</button>
        <p>Don't have an account? <span onClick={handleCreateClick}>Create Now</span></p>
        {error && <p className='text-danger d-6'>{error}</p>}
      </form>
      }
    </div>
  )

}

export default Login
