
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
import Stack from '@mui/material/Stack';
import BASEURL from '../data/baseurl';
import toast, { Toaster } from 'react-hot-toast'
import { Rating, TextField } from '@mui/material';

export default function Feedback() {
  const [form, setForm]=React.useState(
    {
      summary:"",
      rating:null,
      areasOfImprovement :""
  }
  )
  const  handleChange=(e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  const submitFeedback=()=>{

    const myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem("token")}`);
myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
    "summary":form?.summary,
    "rating":form?.rating,
    "areasOfImprovement":form?.areasOfImprovement
});
console.log('submitting ',raw)

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch( `${BASEURL.url}/api/feedback/create`, requestOptions)
  .then((response) => response.json())
  .then((result) => {
    if(result.is_error){
      toast.error(result.message);
    }
    else{
      toast.success(result.message);
      console.log('feedback submitted successfully')
      console.log(result)
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
      <Card className='rounded-2xl border shadow md:w-[50%]'>
        <CardHeader subheader="please fill the feedback form" title="Feedback" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
          <FormControl fullWidth>
            <Rating
                name="simple-controlled"
                size='large'
                value={form?.rating}
                onChange={(event, newValue) => {
                    setForm({...form,'rating':newValue});
                }}
                />
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Summary</InputLabel>
              <OutlinedInput label="Summary" name="summary" type="text" onChange={handleChange}  value={form?.summary}/>
            </FormControl>
           
            <FormControl fullWidth>
              {/* <InputLabel  >Areas Of Improvement</InputLabel> */}
              <TextField label="Areas Of Improvement" name="areasOfImprovement" type="text" rows={4} onChange={handleChange} multiline value={form?.areasOfImprovement}/>
            </FormControl>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" onClick={submitFeedback}>Submit</Button>
        </CardActions>
      </Card>
    </form>
  );
}
