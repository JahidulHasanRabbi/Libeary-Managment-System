import { useEffect, useState } from 'react';
import { Link, useFormAction, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from '@mui/material';
import { useCookies } from 'react-cookie';


const title = 'Login'

const Login = () => {
    const [cookies, setCookie] = useCookies(['user'])


    const [alert, setAlert] = useState(false)
    const navigate = useNavigate()

    const [user, setuser] = useState({
        email:"",
        password:"",
    });

    const handlechange = (e) => {
        const {name, value} = e.target;
        setuser((prev) => {
            return {...prev, [name]: value}
        })
    }

    const Loginhandler = async (e) => {
        e.preventDefault();
        const username = user.email
        const password = user.password

        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            username,
            password
        }).then(res => { 
            navigate('/account')
            console.log(res.data)
            setCookie('user', res.data.Token.access,  {path: '/' })
            localStorage.setItem('Token', res.data.Token.access)

            }).catch(err => {
                console.log(err)
                navigate('/login')
                setAlert(true)
            }
               
            )
    }
    
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  

    

    return (
        <>
        <div class="main-breadcrump">
            <div class="container-fluid">
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                <li class="breadcrumb-item" aria-current="page">{ title }</li>
            </ol>
            </div>
        </div>
        
        <div class="main_page">
            <div class="page-title">
                <div class="-title" style={{'margin-left': '20px'}}>
                    <h4>
                        <span style={{'font-size': '17px'}}>Customer Login</span>
                    </h4>
                </div>
            </div>

            <div class="row mx-auto">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div class="box  my-5">
                        <div class="box-body">
                            <div class="box-title">
                                <span>Register Customer</span>
                            </div>
                            {alert ? <Alert  variant="filled" severity='error'>
                                Wrong Email or Password!
                            </Alert> : <></> }

                            <form onSubmit={Loginhandler}  class="form-singin">
                                <div class="box-note">
                                <p>If you have an account, sign in with your email address.</p>
                                </div>
                            
                            <div class="form-login-group">
                                <label for="email" class="lable">
                                    <span>Email</span>
                                </label>
                            </div>
                            <div class="control">
                                <input 
                                    type="email" 
                                    name="email" 
                                    onChange={handlechange}
                                    id="inputemail" 
                                    class="form-control" 
                                    placeholder="Email Address" 
                                    required autofocus>

                                    </input>
                            </div>
                            
                            <div class="form-login-group">
                                <label for="password" class="lable">
                                    <span>Password</span>
                                </label>
                            </div>
                            
                            <div class="control">
                                <input type="password" 
                                    onChange={handlechange}
                                    name="password" 
                                    id="inputpassword" 
                                    class="form-control" 
                                    placeholder="Password" 
                                    required autofocus>

                                    </input>
                            </div>
                            
                            <div class="submite">
                                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Login</button>
                            </div>
                            
                            <div class="prinmary">
                                <div class="remind">
                                    <a href="forget.com">
                                        <p><span>Forgot Your Password?</span></p>
                                    </a>
                                </div>
                            </div>
                            
                            <div class="detail">
                                <p>
                                    <span>Or, login With</span>
                                </p>
                            </div>
                            
                            <div class="col">
                                <div class="text-uppercase">

                                    <a href="forget.com" class="facebook btn"><i class="fa fa-facebook fa-fw">
                                    </i> Login With Facebook
                                    </a>
                                </div>

                                <div class="text-uppercase">
                                    <a href="forget.com" class="google btn"><i class="fa fa-google fa-fw">
                                    </i> login with google
                                    </a>
                                </div>
                            </div>

                            <div class="form-login-group create-account text-uppercase">
                                
                                    <button  class="btn btn-primary text-uppercase" type="button">
                                        <Link class="btt-create" to="/register">Create an account</Link>
                                    </button>
                                
                            </div>
                            
                            </form>
            
                        </div>
                </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login