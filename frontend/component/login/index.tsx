import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Container, TextField } from '@mui/material';
import { useCookies } from 'react-cookie';
import axios from 'axios';



const LoginForm = () => {

    const [cookies, setCookie] = useCookies();
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();



    const handleSubmit = async (e) => {
        e.preventDefault();
      
        const response = await axios.post('http://127.0.0.1:8000/api/login/', {
            username,
            password
        }).then((res) => {
            console.log(res);
            setCookie('User', res.data.Token.access,  {path: '/' })
            localStorage.setItem('Token', res.data.Token.access)
            setCookie('Role', res.data.role,  {path: '/' })
                localStorage.setItem('Token', res.data.rolr)
            if(res.ok) {
                const { role } = res.role;
                if(role == 'user') {
                    router.push('/UserDashboard');
                } else {
                    router.push('/StaffDashboard');
                }
                
            }}).catch((err) => {
                setError("Invalid Credentials");
                console.log(err);
                console.log("error");
                router.push('/login');
            })

        }
      
        useEffect(() => {
            window.scrollTo(0, 0);
          }, []);

          
      return (
        <Container maxWidth="sm">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <div className='email_box'>
              <TextField
                type="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                label="User Name"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className='pass_box'>
              <TextField
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                variant="outlined"
                fullWidth
              />
            </div>
            {error && (
              <Alert severity="error" sx={{ marginTop: '1rem' }}>
                {error}
              </Alert>
            )}
            <Button type="submit" variant="contained" color="primary" sx={{ marginTop: '1rem' }}>
              Login
            </Button>
          </form>
        </Container>
      );

}      

export default LoginForm;