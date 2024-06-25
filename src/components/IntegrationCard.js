import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Clock as ClockIcon } from '@phosphor-icons/react/dist/ssr/Clock';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { UploadFile } from '@mui/icons-material';
import { Button, Input } from '@mui/material';
import BASEURL from '../data/baseurl'
import { saveAs } from 'file-saver';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


export default function IntegrationCard({ integration }) {
  const inputRef = React.useRef(null);
  const router=useRouter()
  const [file, setFile] = React.useState(null);
  const handleFileUpload=(e)=>{
    console.log('Uploading file',e.target.name)
    inputRef?.current?.click();
  }
  const uploadDoc=(event)=>{
    setFile(event.target?.files[0])
    uploadFile(event);
}
const uploadFile=(event)=>{
    
    if(event.target?.files[0]){
    
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${sessionStorage.getItem('token')}`);
        

        const formdata = new FormData();
          formdata.append("company", event.target.name);

        formdata.append("csvFile", event.target?.files[0],event.target?.files[0].name);
        
        var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: formdata,
                redirect: 'follow'
        };
        
        fetch(`${BASEURL.url}/api/transactions/upload_csv`, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    if(!result.is_error){
                      toast.success(result.message)
                      router.push('/')
                    }else{
                      toast.error(result.message)
                    }
                  })
               
                .catch(error =>{ console.log('error', error)
            // setLoader(false)
          });
    }
   
}
const handleTemplateDownload = (event) => {
  console.log(event.target)
  const fileUrl = 'https://docs.google.com/spreadsheets/d/1ZbMRYhYazivxooB97YdCNBibEkVEiGoI6mKepIcP8K0/edit?usp=sharing';
  // console.log(TteData?.Document_submitted)
  const downloadLink = document.createElement('a');

  // Set the href attribute to the file URL
  downloadLink.href = fileUrl;

  // Set the download attribute to specify the filename
  downloadLink.download = `${event.target.name}.xlsx`;

  // Append the link element to the document body
  document.body.appendChild(downloadLink);
  downloadLink.target = '_blank'
  // Trigger a click event on the link element
  downloadLink.click();

  // Remove the link element from the document body
  document.body.removeChild(downloadLink);
}
  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }} className='rounded-3xl'>
      <CardContent sx={{ flex: '1 1 auto' }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar src={integration.logo} variant="square" />
          </Box>
          <Stack spacing={1}>
            <Typography align="center" variant="h5">
              {integration.title}
            </Typography>
            <Typography align="center" className="text-sm">
              {integration.description}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
      <Divider />
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
        
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1}>
          <DownloadIcon fontSize="var(--icon-fontSize-sm)" />
          <Typography color="text.secondary" display="inline" variant="body2" name={integration?.id} onClick={handleTemplateDownload} className='cursor-pointer'>
             Download Template
          </Typography>
        </Stack>
          
        <Stack sx={{ alignItems: 'center' }} direction="row" spacing={1} >
          <input type='file' className='hidden' ref={inputRef}
          onChange={(event) => uploadDoc(event)}
          name={integration.id}
           accept=".csv"
          />

          {/* <UploadFile fontSize="var(--icon-fontSize-sm)" /> */}
          <Button  onClick={handleFileUpload} className='capitalize' name={integration.id}>
            Upload
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
