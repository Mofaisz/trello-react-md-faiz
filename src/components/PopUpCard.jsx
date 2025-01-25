import React, { useState } from "react";
import { Box, Typography, Input, Button } from "@mui/material";

const PopUpCard = ({ handleClosePopUp }) => {
  // Accept handleClosePopUp as a prop
  const [boardName, setBoardName] = useState("");

  const addBoard = async () => {
    try {
      let data = await fetch(
        `https://api.trello.com/1/boards/?name=${boardName}
                &key=${"64c5013bf72bd59f0dc898487333530e"}&token=${"ATTA3220119c87da18a6bf18e6bd67a5dab42ff0a1451f506301cc67d751157d16554A112D9C"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      let jsonData = await data.json();
      setBoardName(""); // Clear the board name after submission
      handleClosePopUp(); // Close the pop-up after successful board creation
    } catch (error) {
      console.log("Error adding board", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 300,
          height: 350,
          backgroundColor: "#FFFFFF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "50px",
          color: "#333",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            position: "absolute",
            top: 20,
            fontWeight: "600",
            fontSize: "1.3rem",
            textAlign: "center",
            color: "#87CEFA",
          }}
        >
          Create a Board
        </Typography>

        <Typography
          sx={{
            position: "absolute",
            left: 50,
            top: 100,
            fontSize: "1rem",
            fontWeight: "500",
            color: "#A5A5A5",
          }}
        >
          Board Title
        </Typography>

        <Input
          type="text"
          placeholder="Add board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          sx={{
            width: "80%",
            padding: "10px",
            marginTop: "30px",
            borderRadius: "8px",
            border: "1px solid #87CEFA",
            color: "#333",
            "&::placeholder": {
              color: "#A5A5A5",
            },
            "& input": {
              color: "#333",
              fontSize: "1rem",
            },
            backgroundColor: "#F0F8FF",
          }}
        />

        <Button
          variant="contained"
          disableElevation
          disableFocusRipple
          color="primary"
          onClick={addBoard}
          sx={{
            position: "absolute",
            bottom: 30,
            backgroundColor: "#87CEFA",
            width: "80%",
            padding: "12px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 139, 0.8)",
              transform: "scale(1.05)",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
            },
          }}
        >
          Add Board
        </Button>
      </Box>
    </>
  );
};

export default PopUpCard;
