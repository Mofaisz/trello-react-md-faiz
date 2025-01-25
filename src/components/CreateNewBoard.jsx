import React from 'react'
import {Box,Dialog,Typography} from "@mui/material"
import Card from "@mui/material/Card"
import CardContent from '@mui/material/CardContent';
import {useState} from "react"
import PopUpCard from './PopUpCard';


const CreateNewBoard = () => {

    
    const [openPopUp,setOpenPopUp] = useState(false)

    const handleOpenPopUp = () =>{
        setOpenPopUp(true)
    }

    const handleClosePopUp = () =>{
        setOpenPopUp(false)
    }





  return (
   <>
    <Box>
    <Card

        onClick = {handleOpenPopUp}
        // key = {}
        sx = {{
       
            padding:2,
           
            cursor:"pointer",
            width:200,
            height:100,
            // mr:5,
            backgroundColor: "grey",
            textContent:"center",
            display:"flex",
            justifyContent:"left",
            position:"relative"
        }}
        
        >
          <CardContent
          sx = {{
          
                   
                  
          }}
          >

            <Typography
            sx = {{
              color:"white",
              position:"absolute",


            }}
            >
               Create New Board +
            </Typography>
            </CardContent>
        </Card>
        <Dialog open = {openPopUp} onClose={handleClosePopUp}>
            <PopUpCard/>
        </Dialog>
    </Box>
   </>
  )
}

export default CreateNewBoard
