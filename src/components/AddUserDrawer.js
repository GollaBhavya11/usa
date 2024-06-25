
import React, { useState, useEffect } from "react";

import Box from "@mui/material/Box";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "@mui/material";
import Addproject from "./AddUser";

// import Register from "./Register";

const AddUserDrawer = ({ anchor, toggleDrawer, isOpen, paper, AddRow, current, editRow, setEditRow, SaveEditedRow, data, receiptsList, setReceiptsList ,getProjects}) => {


    const handleClose = (event) => {
        toggleDrawer(anchor, false, event)
    };


    const descriptionElementRef = React.useRef(null);

    React.useEffect(() => {
        if (isOpen) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [isOpen]);


    const getComponent=()=>{
       
        switch(current)
        {
            case 'add':return <Addproject
                handleClose={handleClose}
                AddRow={AddRow}
            />
   
        }
    
    }
    return (
        <Dialog
            open={isOpen}
            onClose={(event) => toggleDrawer(anchor, false, event)}
            // scroll={paper}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{ style: { borderRadius: '10px' } }}
        >

            <DialogContent dividers={true} sx={{ padding: 0 }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>

                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        sx={{ padding: '28px' }}
                    >
                        <Box role="presentation">
                                {getComponent()}
                        </Box>

                    </DialogContentText>
                </div>
            </DialogContent>



        </Dialog>

    );
}
export default AddUserDrawer;