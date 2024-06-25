// import { TextField } from '@mui/material'
import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import Loader from './Loader';
import baseurl from '../data/baseurl';
import { useRouter } from 'next/router';
// import logo from '../utils/Logo.png';
import Image from 'next/image';
// import lexoddLogo from '../utils/lexodd_logo.png';
import toast, { Toaster } from 'react-hot-toast'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
// import { Controller, useForm } from 'react-hook-form';
// import { z as zod } from 'zod';

// import { paths } from '../paths';
function Login() {
    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);
    const [error, setError] = useState('')
    const router = useRouter()
    const hangleGotoSignup = () => {
        router.push('/Register');
    }
    // const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState();
    const onChangeInput = (e) => {
        console.log(e.target.checked)
        switch (e.target.name) {
            //   case 'name': setName(e.target.value); break;
            case 'email': setEmail(e.target.value); break;
            case 'password': setPassword(e.target.value); break;
            case 'rememberMe': setRememberMe(e.target.checked); break;
        }
    }
    const handleSubmit = (e) => {
        console.log(`${baseurl.url}/auth/login`, email, password)
        e.preventDefault();
        setLoader(true)
     if(validation()){   var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "email": email,
            "password": password
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/api/user/login`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(result.status == 200 && result.is_error==false) {
                    toast.success('login Successfully')
                
                    setToken(result.token)
                    // handleClose()
                    sessionStorage.setItem('token', result.token)
                    sessionStorage.setItem('userId', result.user.id)
                    
                    sessionStorage.setItem('parentId', result.user.parentId)
                    router.push('/')
                    window.location.reload()
                }
                else{
                        setError(result.message)
                   
                }

                // location.reload()
                setLoader(false)

            })
            .catch(error => {
                console.log('error', error)
                setLoader(false)
            });}
    };
    const validation = () => {
        var temp = {}
        let valid = true;
            if (password.length<8) {
                // temp = { ...temp, 'password': "Password must be greater than 8 digits" };
                setError('Password must be greater than 8 digits')
                valid = false;
            }
        
        // setErrors(temp)
        console.log(temp)

        return valid
    }

    return (
        // <div className='login_page mt-10' >
        //     <div className='logIn__wrap'>
        //         <Loader />
        //         <div className='lg__Mn-cnt'>
        //             <div className='lg__Ttl'>
        //                 <h2>Log in to your account</h2>
        //                 <p>Welcome back! Please enter your details.</p>
        //             </div>
        //             <div className='lg__Box'>
        //                 <form onSubmit={handleSubmit}>
        //                     <div className='lg__Fld'>
        //                         <label>Email</label>
        //                         <div className='input__Fld'>
        //                             <input
        //                                 type="email"
        //                                 value={email}
        //                                 onChange={onChangeInput}
        //                                 placeholder='Enter your email'
        //                                 required
        //                                 autoComplete="off"
        //                                 name='email'
        //                             />
        //                         </div>
        //                     </div>
        //                     <div className='lg__Fld'>
        //                         <label>Password</label>
        //                         <div className='input__Fld'>
        //                             <input
        //                                 type="password"
        //                                 value={password}
        //                                 onChange={onChangeInput}
        //                                 required
        //                                 autoComplete="off"
        //                                 name='password'
        //                             />
        //                         </div>
        //                     </div>
        //                     {/* <div className='rem__Div'>
        //                         <div className='rm_Pass'>
        //                             <label>
        //                                 <input
        //                                     name='rememberMe'
        //                                     type="checkbox"
        //                                     checked={rememberMe}
        //                                     onChange={onChangeInput}
        //                                 />{' '}
        //                                 Remember me
        //                             </label>
        //                         </div>
        //                         <div className='frg__Pas'>
        //                             <span onClick={() => router.push('/ForgotPass')}>Forgot password</span>
        //                         </div>

        //                     </div> */}
        //                     <div >
        //                         <span style={{ color: 'red' }}>{error}</span>
        //                     </div>
        //                     <div className='sbt__Btn'>
        //                         <button type="submit">Sign in</button>
        //                     </div>
        //                     <div className='ck__Act'>
        //                         <p>Don’t have an account? <span onClick={hangleGotoSignup}>Sign up</span></p>
        //                     </div>
        //                 </form>
        //             </div>
        //         </div>
        //     </div>
          
        // </div>
        <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          Don&apos;t have an account?{' '}
          <Link href='/Register' underline="hover" variant="subtitle2">
            Sign up
          </Link>
        </Typography>
      </Stack>
                  <form onSubmit={handleSubmit}>
                         <div className='lg__Fld'>
                             <label>Email</label>
                          <div className='input__Fld'>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={onChangeInput}
                                        placeholder='Enter your email'
                                        required
                                        autoComplete="off"
                                        name='email'
                                    />
                                </div>
                            </div>
                            <div className='lg__Fld'>
                                <label>Password</label>
                                <div className='input__Fld'>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={onChangeInput}
                                        required
                                        autoComplete="off"
                                        name='password'
                                        placeholder='Password'
                                    />
                                </div>
                            </div>
                            {/* <div className='rem__Div'>
                                <div className='rm_Pass'>
                                    <label>
                                        <input
                                            name='rememberMe'
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={onChangeInput}
                                        />{' '}
                                        Remember me
                                    </label>
                                </div>
                                <div className='frg__Pas'>
                                    <span onClick={() => router.push('/ForgotPass')}>Forgot password</span>
                                </div>

                            </div> */}
                            <div >
                                <span style={{ color: 'red' }}>{error}</span>
                            </div>
                            <div className='sbt__Btn'>
                                <button type="submit">Sign in</button>
                            </div>
                            {/* <div className='ck__Act'>
                                <p>Don’t have an account? <span onClick={hangleGotoSignup}>Sign up</span></p>
                            </div> */}
                        </form>
      
    </Stack>
    )
}

export default Login
