import { Box, Button, Input, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

const AddListDetail = ({ addNewListCallback }) => {
  const { id } = useParams();
  const [name, setName] = useState("");

  const addList = async () => {
    try {
      const response = await fetch(
        `https://api.trello.com/1/lists?name=${name}&idBoard=${id}&key=64c5013bf72bd59f0dc898487333530e&token=ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const newList = await response.json();
      setName(""); 
      addNewListCallback(newList); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "4px",
          justifyContent: "center",
          alignItems: "center",
          width: 300,
          height: 150,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          color: "black",
          position: "relative",
          borderRadius: 10,
        }}
      >
        <Input
          type="text"
          sx={{
            marginBottom: 10,
            color: "white",
            border: "0.5px solid white",
            position: "absolute",
            top: 40,
          }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Add board name here"
        />
        <Button
          variant="contained"
          disableElevation
          disableFocusRipple
          color="primary"
          onClick={addList}
          style={{ marginLeft: "10px" }}
          sx={{
            position: "absolute",
            top: 90,
            width: 100,
            borderRadius: 100,
            backgroundColor: "rgba(135, 206, 770, 0.5);",
            '&:hover': {
              backgroundColor: "rgba(0, 0, 139, 0.8)", // Slightly darker background on hover
              transform: "scale(1.05)", // Slightly enlarge the button on hover
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)", // Add a shadow on hover
            }
          }}
        >
          Add List
        </Button>
      </Box>
    </div>
  );
};

export default AddListDetail;
