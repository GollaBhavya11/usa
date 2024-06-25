import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select,Button } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast'
import { saveAs } from 'file-saver';
import BASEURL from '../data/baseurl';
function UploadData({ handleClose,getProjects }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen,setLoader } = useContext(sharedContext);

    const hiddenFileInput = React.useRef(null);
    const [fileErr,setFileErr]=React.useState(true);
    const [filename,setFileName]=React.useState();
    const [file,setFile]=useState();
    const handleClick = () => {
        
        hiddenFileInput?.current?.click();
  
    };
    const uploadDoc=(event)=>{
        setFileName(event.target?.files[0]?.name)
        setFile(event.target?.files[0])
        
    }
    const uploadFile=(event)=>{
        
        if(file){
            setLoader(true)
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${token}`);
            
            var formdata = new FormData();
            formdata.append("file", file,filename);
            
            var requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formdata,
                    redirect: 'follow'
            };
            
            fetch(`${BASEURL.url}/upload/bulkUpload`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        const failed=result?.data?.failure?.filter(each=>each?.project?.project_type!=='').map(each=> each?.project?.project_name+'-'+each?.project?.project_type+'-'+each?.project?.status+'-'+each?.project?.tower_number+'-'+each?.project?.flat_number+'-'+each?.project?.plot_number+'-'+each?.error+'\n')
                        setLoader(false)
                        const failureFile = new Blob(failed, { type: 'text/plain;charset=utf-8' });
                        saveAs(failureFile, 'failure.txt');
                        const success=result?.data?.success?.filter(each=>each?.project?.project_type!=='').map(each=> each?.project?.project_name+'-'+each?.project?.project_type+'-'+each?.project?.status+'-'+each?.project?.tower_number+'-'+each?.project?.flat_number+'-'+each?.project?.plot_number+' - '+'SUCCESSFULLY INSERTED\n')
                        setLoader(false)
                        const successFile = new Blob([success], { type: 'text/plain;charset=utf-8' });
                        saveAs(successFile, 'success.txt');
                        getProjects()
                        handleClose()
                        setFile('')
                        setFileName('')
                   })
                   
                    .catch(error =>{ console.log('error', error)
                setLoader(false)});
        }
       
    }
    return (
        <div className='ReceiptCard'>
            <Loader/>
            <h2>Upload CSV File</h2>
            <div className="upload-button" >
                                         
              <input
                  type="file"
                  style={{ display: "none" }}
                  ref={hiddenFileInput}
                 //  name={item}
                  onChange={(event) => uploadDoc(event)}
                  accept=".csv"
              />
              
             

              <div
                  id="outlined-basic"
                  variant="outlined"
                  className="upload-texts"
                  disabled
                  onClick={handleClick}
                   //   value={item?.upfilename}
                  
              >
                 <span className='p-2'>{filename ? filename :"Choose file"}</span>
                 <button
                    
                    // onClick={handleClick}
                  className='upload-browse'
                  
                >Browse files</button>
              </div>
              
        
                  </div>
                  <div className='Btns__container'>
                  <div className='sbt__Btn' onClick={uploadFile}>
                        <button>Upload</button>
                    </div>
                    </div>
                  {/* <Button onClick={uploadFile}>Upload</Button> */}
        </div>
    )
}

export default UploadData