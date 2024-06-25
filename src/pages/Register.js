import React, { useEffect, useState } from 'react'
import { isValid, isValidEmail, checkname } from '../validations/validators'
import { Box, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import BASEURL from '../data/baseurl';
import Loader from '../components/Loader';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';

import Image from 'next/image';
import Link from 'next/link';
function Register() {

  const { loader, setLoader } = useContext(sharedContext);
  const [formData, setFormData] = useState({
    name: "", email: "", role: "", password: ""
  })
  const router = useRouter()
  const [errors, setErrors] = useState({})
  const [serverErrors, setServerErrors] = useState({})
  const [buttonflag, setButtonFlag] = useState(false);
  const hangleGotoLogin = () => {
    router.push('/');
  }
  const onChangeInput = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((preState) => {
      return {
        ...preState,
        // [name]: type === "checkbox" ? checked : value
        [name]: value
      }
    })

    // if (!checkname(value)) {
    //   setErrors({
    //     ...errors,
    //     [name]: 'Name should only contain letters',
    //   });
    // }
    // else {
    //   setErrors({
    //     ...errors,
    //     [name]: '',
    //   });
    // }

    // setErrors(((preState) => {
    //   return {
    //     ...preState,
    //     [name]: ""
    //   }
    // }))
  }

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  useEffect(() => {
    buttonflag && validation();
  }, [formData.email])
  const validation = () => {
    var temp = {}
    let valid = true;

    if (!formData.email) {
      temp = { ...temp, email: "Required" };
      valid = false;
    } else if (!validateEmail(formData.email)) {
      temp = { ...temp, email: "Invalid Email" };
      valid = false;

    }
    if (!formData.password) {
      temp = { ...temp, password: "Required" };
      valid = false;
    } else if (formData.password < 8) {
      temp = { ...temp, email: "Must be at least 8 characters." };
      valid = false;

    }
    setErrors(temp)

    return valid;


  }
  const handleSubmit = (e) => {
    // try {
    e.preventDefault();
    // Handle login logic here

    //   const { name, email, role, password } = formData

    //   const credentials = { name, email, role, password }

    //   const errs = {}



    //   if (!isValid(credentials.email)) {
    //     errs.email = `please fill the email column`
    //   } else {
    //     if (!isValidEmail(credentials.email)) {
    //       errs.email = `invalid emailId`
    //     }
    //   }

    //   if (!isValid(credentials.role)) {
    //     errs.password = `please select the role`
    //   }

    //   if (!isValid(credentials.password)) {
    //     errs.password = `please fill the password column`
    //   }

    //   setErrors(errs)
    setButtonFlag(true)
    console.log(errors, validation())
    if (validation()) {
      setLoader(true)
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "firstName": formData?.firstName,
        "lastName": formData?.lastName,
        "email": formData?.email,
        "password": formData?.password,
        "parentId": 0
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch(`${BASEURL.url}/api/user/create`, requestOptions)
        .then(response => response.json())
        .then(result => {
          console.log(result)
          setLoader(false)
          hangleGotoLogin();
        })
        .catch(error => console.log('error', error));
    }
    // }
    // catch (err) {
    //   console.log(err.message)
    //   const errs = {}
    //   errs.message = err.response.data.msg
    //   setServerErrors(errs)
    // }
  };



  return (
    <>
        {/* <div className='logIn__wrap p-10'>
        <Loader />
        <div className='lg__Mn-cnt'>
          <div className='lg__Ttl'>
            <h2>Create an account</h2>
          </div>
          <div className='lg__Box'>
            <form onSubmit={handleSubmit}>
              <div className='lg__Fld'>
                <label>First Name*</label>
                <div className='input__Fld'>
                  <input
                    name='firstName'
                    type="text"
                    value={formData.firstName}
                    onChange={onChangeInput}
                    placeholder='Enter first name'
                    autoComplete="off"
                    required
                  //   error={Boolean(errors.name)}
                  //   helperText={errors.name}
                  />
                </div>
               
              </div>
              <div className='lg__Fld'>
                <label>Last Name*</label>
                <div className='input__Fld'>
                  <input
                    name='lastName'
                    type="text"
                    value={formData.lastName}
                    onChange={onChangeInput}
                    placeholder='Enter your Name'
                    autoComplete="off"
                    required
                  //   error={Boolean(errors.name)}
                  //   helperText={errors.name}
                  />
                </div>
             
              </div>
              <div className='lg__Fld'>
                <label>Email*</label>
                <div className='input__Fld'>
                  <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={onChangeInput}
                    placeholder='Enter your email'
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='errBlock' style={{ color: 'red' }}>
                  {(errors.email) ? <p> {errors.email}</p> : null}
                </div>
              </div>
              <div className='lg__Fld'>
                <label>Password*</label>
                <div className='input__Fld'>
                  <input
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={onChangeInput}
                    placeholder='Create a password'
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='errBlock' style={{ color: 'red' }}>
                  {(errors.password) ? <p> {errors.password}</p> : null}
                </div>
                <span className='info'>Must be at least 8 characters.</span>
              </div>
           
              <div className='sbt__Btn'>
                <button type="submit">Register</button>
              </div>
              <div className='ck__Act'>
                <p>Already have an account? <span onClick={hangleGotoLogin}>Log in</span></p>
              </div>
            </form>
          </div>
        </div>
      </div> */}
     <Box
      sx={{
        display: { xs: 'flex', lg: 'grid' },
        flexDirection: 'column',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column' }}>
        <Box sx={{ p: 3 }}>
          <Box  href='/' sx={{ display: 'inline-block', fontSize: 0 }}>
            {/* <DynamicLogo colorDark="light" colorLight="dark" height={32} width={122} /> */}
          </Box>
        </Box>
        <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center', p: 3 }}>
          <Box sx={{ maxWidth: '450px', width: '100%' }}>
            <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          Already have an account?{' '}
          <Link href='/' underline="hover" variant="subtitle2" className='font-bold text-secondary'>
            Sign in
          </Link>
        </Typography>
      </Stack>
          <form onSubmit={handleSubmit} className='pt-10'>
              <div className='lg__Fld'>
                <label>First Name*</label>
                <div className='input__Fld'>
                  <input
                    name='firstName'
                    type="text"
                    value={formData.firstName}
                    onChange={onChangeInput}
                    placeholder='Enter first name'
                    autoComplete="off"
                    required
                  //   error={Boolean(errors.name)}
                  //   helperText={errors.name}
                  />
                </div>
               
              </div>
              <div className='lg__Fld'>
                <label>Last Name*</label>
                <div className='input__Fld'>
                  <input
                    name='lastName'
                    type="text"
                    value={formData.lastName}
                    onChange={onChangeInput}
                    placeholder='Enter your Name'
                    autoComplete="off"
                    required
                  //   error={Boolean(errors.name)}
                  //   helperText={errors.name}
                  />
                </div>
             
              </div>
              <div className='lg__Fld'>
                <label>Email*</label>
                <div className='input__Fld'>
                  <input
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={onChangeInput}
                    placeholder='Enter your email'
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='errBlock' style={{ color: 'red' }}>
                  {(errors.email) ? <p> {errors.email}</p> : null}
                </div>
              </div>
              <div className='lg__Fld'>
                <label>Password*</label>
                <div className='input__Fld'>
                  <input
                    type="password"
                    name='password'
                    value={formData.password}
                    onChange={onChangeInput}
                    placeholder='Create a password'
                    autoComplete="off"
                    required
                  />
                </div>
                <div className='errBlock' style={{ color: 'red' }}>
                  {(errors.password) ? <p> {errors.password}</p> : null}
                </div>
                <span className='info'>Must be at least 8 characters.</span>
              </div>
           
              <div className='sbt__Btn '>
                <button type="submit " className='bg-secondary'>Register</button>
              </div>
             
            </form>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
          color: 'var(--mui-palette-common-white)',
          display: { xs: 'none', lg: 'flex' },
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Stack spacing={3}>
          {/* <Stack spacing={1}>
            {/* <Typography color="inherit" sx={{ fontSize: '24px', lineHeight: '32px', textAlign: 'center' }} variant="h1">
              Welcome to{' '}
              <Box component="span" sx={{ color: '#15b79e' }}>
                Devias Kit
              </Box>
            </Typography> 
            <Typography align="center" variant="subtitle1">
              A professional template that comes with ready-to-use MUI components.
            </Typography>
          </Stack> */}
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              component="img"
              alt="Widgets"
              src="/assets/auth-widgets.png"
              sx={{ height: 'auto', width: '100%', maxWidth: '600px' }}
            />
          </Box>
        </Stack>
      </Box>
    </Box>
    </>

  )
}

export default Register
