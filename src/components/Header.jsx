import {Box,Button} from "@mui/material"
import {Link} from "react-router-dom"

const Header = () => {
  return (
    <>
    <Box
    sx = {{
      width:"cover",
      height:100,
      display:"flex",
      justifyContent:"center",
      alignItems :"center",
      backgroundColor:   "rgba(30 58 138 / var(--tw-bg-opacity, 1))",
      position:"relative"

    }}
    
    >
      <Link
      to = "/"
      >
      <Button
      sx = {{
          variant:"contained",
      color:"primary",
      justifyContent:"start",
      position:"absolute",
      left:50,
      // color:"white",
      border:"1px solid white",
      borderRadius:"10%",
      opacity:"3"
      }}
      >Boards

      </Button>
      </Link>

      <img
      src = "https://trello.com/assets/d947df93bc055849898e.gif"
      alt = "trello-img"
      style = {{
          width:"100px",
          height:"auto",
          objectFit:"auto"

      }}
    
      />
      
    </Box>
     
    </>
  );
};

export default Header;
