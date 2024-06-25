import React, { useState } from 'react'
import sharedContext from '../context/SharedContext';
import { useContext } from 'react';
import { MenuItem, Select, Autocomplete, TextField } from '@mui/material';
import baseurl from '../data/baseurl'
import Loader from './Loader';
import toast, { Toaster } from 'react-hot-toast'


function AddUser({ handleClose, AddRow }) {

    const { userRole, token, isSidenavOpen, setUserRole, setToken, setIsSidenavOpen, loader, setLoader } = useContext(sharedContext);
    const [message, setMessage] = useState('');

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        parentId: parseInt(sessionStorage.getItem('userId')),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoader(true)
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(formData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`${baseurl?.url}/api/user/create`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            
                if (!result.is_error ) {
                    toast.success('Added Successfully')
                    AddRow(result.user_details)
                    clearFields()
                    handleClose()
                    // window.location.reload()
                }
                setLoader(false)
            })
            .catch(error => {
                console.log('error', error)
                setLoader(false)
            });
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const optionColors = {
        AVAILABLE: '#27ae60',
        SOLD: '#e74c3c',
        TOKEN: '#f39c12',
        ADVANCE: '#3498db',
    };

    const handleAutocompleteChange = (fieldName, newValue) => {
        if(fieldName==='project_type'){
            setFormData({
                ...formData,
                [fieldName]: newValue,
                status:'',
                plot_number:'',
                villa_number:'',
                tower_number:'',
                flat_number:''
            })
        }
        else if(fieldName==='status'){
            setFormData({
                ...formData,
                [fieldName]: newValue,
                plot_number:'',
                villa_number:'',
                tower_number:'',
                flat_number:''
            })
        }
        else{

        setFormData({
            ...formData,
            [fieldName]: newValue,
        })
     }

    }

    const clearFields = () => {
        setFormData(
            {
                firstName: '',
                lastName: '',
                email: '',
                password: '',
            }
        );
    }




    return (
        <div className='AddProject__wrap'>
            <Loader />
            <div className='AddprojectCard'>
                <h2 className='font-bold'>New User</h2>
                <div>
                    <form onSubmit={handleSubmit} className='deatails__Box' >
                        <div className='fields__Box'>
                            <div className='deatails__Fld'>
                                <p>First Name</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.firstName}
                                    onChange={onChangeInput}
                                    placeholder='Enter First Name'
                                    required
                                    autoComplete="off"
                                    name='firstName'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Last Name</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.lastName}
                                    onChange={onChangeInput}
                                    placeholder='Enter Last Name'
                                    required
                                    autoComplete="off"
                                    name='lastName'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Email</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.email}
                                    onChange={onChangeInput}
                                    placeholder='Enter First Name'
                                    required
                                    autoComplete="off"
                                    name='email'
                                />
                            </div>
                            <div className='deatails__Fld'>
                                <p>Password</p>
                                <TextField className='text__Fld'
                                    status="text"
                                    value={formData.password}
                                    onChange={onChangeInput}
                                    placeholder='Enter First Name'
                                    required
                                    autoComplete="off"
                                    name='password'
                                />
                            </div>
                     
                  
                   
                       
                  
                        </div>
                        <div style={{ color: 'red' }}>{message}</div>
                        <div className='Btns__container'>
                       
                            <div className='sbt__Btn' type='submit'>
                                <button>Add </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddUser