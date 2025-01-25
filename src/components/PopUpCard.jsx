import React, { useState } from "react";
import { Box, Typography, Input, Button } from "@mui/material";

const PopUpCard = () => {
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
      setBoardName("");
    } catch (error) {
      console.log("Error adding board", error);
    }
  };

  return (
    <>
      <Box
        sx={{
          width: 350,
          height: 400,
          backgroundColor: "#FFFFFF", // White background
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #87CEFA", // Light blue border for a soft touch
          borderRadius: "12px", // Rounded corners
          color: "#333", // Dark text for readability
          position: "relative",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Light shadow for a clean look
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
            color: "#87CEFA", // Matching the light blue color for consistency
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
            color: "#A5A5A5", // Light grey text for labels
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
            border: "1px solid #87CEFA", // Light blue border for input field
            color: "#333", // Dark text inside input
            "&::placeholder": {
              color: "#A5A5A5", // Placeholder text color
            },
            "& input": {
              color: "#333", // Text color inside input
              fontSize: "1rem",
            },
            backgroundColor: "#F0F8FF", // Light blue background for input
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
            backgroundColor: "#87CEFA", // Light blue button color
            width: "80%",
            padding: "12px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#4682B4", // Darker blue on hover
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
