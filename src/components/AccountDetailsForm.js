'use client';

import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Unstable_Grid2';
import BASEURL from '../data/baseurl';
import toast from 'react-hot-toast';


export function AccountDetailsForm({userDetails:user,setUserDetails}) {
  const [state, setState] = React.useState(user);
  React.useEffect(()=>{
    setState(user)
  },[user])
  const handleChange = (event) => {
    setState({...state, [event.target.name]: event.target.value });
  };
  const updateprofile=()=>{
    const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "firstName": state?.firstName,
  "lastName": state?.lastName,
  "phone": state?.phone,
  "location": state?.location
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch(`${BASEURL.url}/api/user/update_user`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    console.log(result)
    if(!result.error){
      setUserDetails(state)
      toast.success(result.message)
    }
  })
  .catch((error) => console.error(error));
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <Card className='rounded-3xl border'>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>First name</InputLabel>
                <OutlinedInput  label="First name" name="firstName" value={state?.firstName?state?.firstName:''} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Last name</InputLabel>
                <OutlinedInput  label="Last name" name="lastName" value={state?.lastName?state?.lastName:''} onChange={handleChange} />
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput  label="Email address" name="email" value={state?.email?state?.email:''} onChange={handleChange} readOnly/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Phone number</InputLabel>
                <OutlinedInput label="Phone number" name="phone" type="number" value={state?.phone?state?.phone:''} onChange={handleChange}/>
              </FormControl>
            </Grid>
            <Grid md={6} xs={12}>
              <FormControl fullWidth>
                <InputLabel>Location</InputLabel>
                <OutlinedInput label="Location" name="location" value={state?.location?state?.location:''} onChange={handleChange}/>

              </FormControl>
            </Grid>
          
          </Grid>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={updateprofile}>Save details</Button>
        </CardActions>
      </Card>
    </form>
  );
}
