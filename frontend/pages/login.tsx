import { useState } from 'react';
import { useRouter } from 'next/router';
import { Alert, Button, Container, TextField } from '@mui/material';
import LoginForm from '@/component/login';
import Navbar from '@/component/navbar';



const Login = () => {
    return (
    <div>
        <Navbar />
        <LoginForm />
    </div>
    )
}

export default Login