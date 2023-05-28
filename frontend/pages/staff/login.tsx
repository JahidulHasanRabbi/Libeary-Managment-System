import { useState } from 'react';
import { Cookies } from 'react-cookie';


const login = () => {

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
}