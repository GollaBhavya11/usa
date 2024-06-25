import React, { useState, useEffect } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Button, MenuItem, Select } from '@mui/material';
import { useContext } from 'react';
import sharedContext from '../context/SharedContext';
import AddUserDrawer from './AddUserDrawer';
import { Edit } from '@mui/icons-material';
// import OnboardingForm from './OnboardingForm';
// import Payroll from './Payroll';
import Loader from './Loader';
import baseurl from '../data/baseurl'

import Image from 'next/image';
import { useRouter } from 'next/router';
import Editicon from '../utils/editIcon.svg'
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
// import DoughnutChart from './DoughnutChart';
const MatEdit = ({ index, setCurrent, setOpenAddProjectDrawer, setEditRow }) => {

  const handleEditClick = () => {
    // some action
    setEditRow(index)
    setOpenAddProjectDrawer(true)
    setCurrent('edit')
  }

  return <div onClick={handleEditClick} name='edit'>
    {/* <Edit /> */}
    <Image
      alt="Editicon"
      src={Editicon}
      quality={100}

    />
  </div>

};
const Main = () => {
  const [current, setCurrent] = useState('');

  const { token, setToken, loader, setLoader, userRole, setUserRole, rows, setRows } = useContext(sharedContext);

  const columns = [

    {
      field: 'firstName',
      headerName: 'First Name',
      width: 160,
      align: 'center' ,
      headerAlign: 'center'
      // editable: false,
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center'
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      editable: false,
      align: 'center',
      headerAlign: 'center' 
    },
    {
      field: 'location',
      headerName: 'Location',
      type: 'text',
      width: 200,
      editable: false,
      align: 'center' ,
      headerAlign: 'center'
    },{
      field: 'phone',
      headerName: 'Phone',
      type: 'number',
      width: 200,
      editable: false,
      align: 'center' ,
      headerAlign: 'center'
    }

  ];







  useEffect(() => {
    if (token) {
      getUsers()
    }
  }, [token, setLoader, userRole])
  const getUsers= () => {
    setLoader(true)
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch(`${baseurl?.url}/api/user/list`, requestOptions)
      .then(response => response.json())
      .then(result => {
       
        if (result.status == 200) {
          if (userRole === "Admin") {
            const updatedList = result.users;
            // Update the state with the updated list.
            setRows(updatedList);
          }
        }
        setLoader(false)
      })
      .catch(error => {
        setLoader(false)
      });
  }



  const [isAddProjectDrawerOpen, setOpenAddProjectDrawer] = useState(false);

  const toggleAddUserDrawer = (event, open, button) => {
    console.log(button)
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      setOpenAddProjectDrawer(false)
      return;
    }
    setOpenAddProjectDrawer(open)
    setCurrent(button)








  };

  const AddRow = (item) => {
    setRows([...rows, item])
  }

  const SaveEditedRow = (item) => {
    const newRows = rows.map((each, i) => {
      if (item.project_id === each.project_id) {
        // Increment the clicked counter
        return item;
      } else {
        // The rest haven't changed
        return each;
      }
    });
    setRows(newRows);
  }

  const filteredColumns = userRole !== "SALES" && userRole !== "MANAGER" ? columns : columns.filter(column => column.field !== "actions");
  // /upload/bulkUpload

  const handleTemplateDownload = (event) => {
    console.log(event.target)
    const fileUrl = 'https://docs.google.com/spreadsheets/d/1zGpSLg7WLWvJSiIGIZLlZXE6EGYXuG6R/edit?usp=sharing&ouid=114833733009973655334&rtpof=true&sd=true';
    // console.log(TteData?.Document_submitted)
    const downloadLink = document.createElement('a');

    // Set the href attribute to the file URL
    downloadLink.href = fileUrl;

    // Set the download attribute to specify the filename
    downloadLink.download = 'template.xlsx';

    // Append the link element to the document body
    document.body.appendChild(downloadLink);
    downloadLink.target = '_blank'
    // Trigger a click event on the link element
    downloadLink.click();

    // Remove the link element from the document body
    document.body.removeChild(downloadLink);
  }

  return (
    <div className="p-4 mt-20 bg-grey-500">
      {/* Your Data Grid Table */}
      <Loader />
      <AddUserDrawer
        anchor="right"
        toggleDrawer={toggleAddUserDrawer}
        isOpen={isAddProjectDrawerOpen}
        current={current}
        AddRow={AddRow}
        getProjects={getUsers}
      />

      {userRole === "SUPERADMIN" && <div className='bg-white  m-4 p-4 rounded-md overview'>
        <div style={{ width: '16rem' }}>
          {/* <DoughnutChart chartData={doughnutData} textCenter={textCenter}
            options={
              {
                backgroundColor: [
                  '#629FF4',
                  '#817AF3',
                  '#DBA362CC'
                ],
                borderColor: 'transparent'
              }
            } /> */}
        </div>
      </div>}
      <div className='mainborder rounded-md'>
        <div className='flex justify-end'>
          {token  &&
            <div className='p-4 flex gap-6 items-center flex-wrap'>
              <span className='sbt__Btn ' style={{ backgroundColor: 'none' }} >
                <button style={{ width: 'max-content' }} onClick={(event) => toggleAddUserDrawer(event, true, 'add')} name="add">Add User</button>
              </span>
              
            
          
            </div>
          }
        </div>
         <Box sx={{ position: 'relative', width: '80%', height: '70vh', backgroundColor: 'white' }}>
            <DataGrid
            rows={(rows || []).map(row => ({
              ...row,
             }))}
            columns={columns}
            initialState={{
              ...rows.initialState,
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            getRowId={(row) => row.id}
            autoPageSize
            components={{
              Toolbar: GridToolbar,
            }}
            pageSizeOptions={[5, 10, 25]}
            checkboxSelection
            // disableRowSelectionOnClick
            disableSelectionOnClick
            sx={{
              fontWeight: 500,
            }}
            className='datagrid'
          />
        </Box>
  
      </div>
    </div>
  );
};

export default Main;