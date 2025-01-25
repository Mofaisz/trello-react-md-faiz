import { useState, useEffect } from "react";
import {Box,Typography} from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Link} from "react-router-dom"
import CreateNewBoard from "./CreateNewBoard";
// import BoardDetail from "./BoardDetail";




const Board = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    let api1 = async () => {
      try {
        const data = await fetch(
          "https://api.trello.com/1/members/me/boards?key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C"
        );
        let jsonData = await data.json();
        setBoard(jsonData);
        //  console.log(jsonData)
      } catch (err) {
        console.log(err);
      }
    };
    api1();
  }, [board]);

  console.log(board);
 
  return(
    <>
    <Box
    sx = {{
     width:100,
      display:"flex",
      justifyContent:"center",
      textContent:"center"
      
    }}
    >
     <Typography
      sx = {{
        fontSize:30,
        fontFamily:"sans-serif",
        // fontWeight:"bold",
        ml:10
      }}
     >
      Boards
      </Typography> 
    </Box>
     <Box
    sx = {{
      display:"flex",
      flexWrap : "wrap",
      gap:5,
      ml:5
    }}
   >
   { board.map((value) =>(
     <>

        <Link to={`/${value.id}`}>
        <Card
        key = {value.id}
        sx = {{
       
            padding:2,
           
         
            width:200,
            height:100,
            // mr:5,
            backgroundImage: `url(${value.prefs.backgroundImage || "https://images.unsplash.com/photo-1737044280473-06976eb5fda5?ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzM3NDMyNjE1fA&ixlib=rb-4.0.3&w=2560&h=2048&q=90"})`,            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: "black",
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
                {value.name|| "no name"}
            </Typography>
            </CardContent>
        </Card>
        </Link>
        
        </>

        ))}
        <CreateNewBoard/>


         </Box> 
    
    </>
  )
 
};

export default Board;
